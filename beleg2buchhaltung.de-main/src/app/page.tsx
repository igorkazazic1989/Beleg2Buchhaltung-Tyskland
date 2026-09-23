"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Footer from "@/components/Footer"

type Row = { Belegfeld1: string; Belegdatum: string; Konto: string; Gegenkonto: string; BU: string; Brutto: string; Belegtext: string; fileName?: string }

const SAMPLE_ROWS: Row[] = [
  { Belegfeld1: "20240815", Belegdatum: "15082024", Konto: "3400", Gegenkonto: "1800", BU: "", Brutto: "127,49", Belegtext: "OBI Markt - Werkzeug", fileName: "OBI-Beispiel.pdf" },
  { Belegfeld1: "20240815", Belegdatum: "15082024", Konto: "3400", Gegenkonto: "1800", BU: "", Brutto: "45,99", Belegtext: "BAUHAUS - Dübel & Schrauben", fileName: "Bauhaus-Beispiel.jpg" },
]

export default function Home() {
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(0)
  const [total, setTotal] = useState(0)
  const [err, setErr] = useState("")
  const [currentFile, setCurrentFile] = useState("")
  const [usage, setUsage] = useState({ count: 0, limit: 3, remaining: 3 })
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  const [showRestore, setShowRestore] = useState(false)
  const [restoreEmail, setRestoreEmail] = useState("")
  const [restoreLoading, setRestoreLoading] = useState(false)
  const [restoreMsg, setRestoreMsg] = useState<{ text: string; ok: boolean } | null>(null)

  const blocked = usage.remaining === 0 && usage.limit < 9999
  const isPro = usage.limit >= 9999

  useEffect(() => {
    const s = localStorage.getItem('b2d_fp')
    if (!s) { const fp = Math.random().toString(36).slice(2); localStorage.setItem('b2d_fp', fp) }

    const params = new URLSearchParams(window.location.search)
    const paramSession = params.get('session_id')
    const restoreToken = params.get('restore_token')

    if (paramSession) {
      localStorage.setItem('b2d_session_id', paramSession)
      const pro = { count: 0, limit: 99999, remaining: 99999 }
      localStorage.setItem('b2d_usage', JSON.stringify(pro))
      setUsage(pro)
      return
    }

    if (restoreToken) {
      // Der Link kam aus der Bestätigungs-E-Mail — Token sofort aus der URL
      // entfernen, damit er nicht im Verlauf/Referrer hängen bleibt, dann
      // gegen die echte (dauerhafte) Session-ID einlösen.
      window.history.replaceState({}, '', window.location.pathname)
      setRestoreLoading(true)
      fetch('/api/restore/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: restoreToken }),
      })
        .then(res => res.json().then(data => ({ ok: res.ok, data })))
        .then(({ ok, data }) => {
          setRestoreLoading(false)
          if (ok && data.sessionId) {
            localStorage.setItem('b2d_session_id', data.sessionId)
            const pro = { count: 0, limit: 99999, remaining: 99999 }
            localStorage.setItem('b2d_usage', JSON.stringify(pro))
            setUsage(pro)
            setRestoreMsg({ text: 'Pro-Abonnement erfolgreich aktiviert!', ok: true })
          } else {
            setShowRestore(true)
            setRestoreMsg({ text: data.error || 'Dieser Link ist ungültig oder abgelaufen.', ok: false })
          }
        })
        .catch(() => {
          setRestoreLoading(false)
          setShowRestore(true)
          setRestoreMsg({ text: 'Verbindungsfehler. Bitte versuchen Sie es erneut.', ok: false })
        })
      return
    }

    const savedSession = localStorage.getItem('b2d_session_id')
    if (savedSession) {
      setUsage({ count: 0, limit: 99999, remaining: 99999 })
      return
    }

    if (window.location.search.includes("paid=1")) {
      fetch("/api/set-pro", { method: "POST" })
        .then(() => {
          localStorage.removeItem('b2d_usage')
          const pro = { count: 0, limit: 99999, remaining: 99999 }
          localStorage.setItem('b2d_usage', JSON.stringify(pro))
          setUsage(pro)
          window.history.replaceState({}, "", window.location.pathname)
        })
        .catch(console.error)
      return
    }

    const saved = localStorage.getItem('b2d_usage')
    if (saved) {
      try {
        const u = JSON.parse(saved)
        if (u.limit !== 3 && u.limit < 9999) throw new Error("old")
        if (u.count > u.limit && u.limit < 9999) throw new Error("old")
        setUsage(u)
      } catch {
        localStorage.removeItem('b2d_usage')
        setUsage({ count: 0, limit: 3, remaining: 3 })
      }
    }
  }, [])

  async function goCheckout() {
    setCheckoutLoading(true)
    setErr("")
    try {
      const res = await fetch("/api/checkout", { method: "POST" })
      const text = await res.text()
      const json = text ? JSON.parse(text) : {}
      if (json.url) window.location.href = json.url
      else throw new Error(json.error || `Checkout Fehler ${res.status}`)
    } catch (e: any) { setErr(e.message); setCheckoutLoading(false) }
  }

  async function handleRestore(e: React.FormEvent) {
    e.preventDefault()
    if (!restoreEmail.trim()) return

    setRestoreLoading(true)
    setRestoreMsg(null)

    try {
      const res = await fetch('/api/restore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: restoreEmail.trim() }),
      })

      const data = await res.json()

      // Der Server antwortet absichtlich immer mit derselben generischen
      // Nachricht (siehe api/restore/route.ts) — falls ein aktives Abo
      // existiert, kommt der eigentliche Aktivierungslink per E-Mail, nicht
      // direkt in dieser Antwort.
      setRestoreMsg({
        text: data.message || 'Falls für diese E-Mail-Adresse ein aktives Abonnement existiert, haben wir Ihnen einen Bestätigungslink geschickt.',
        ok: true,
      })
    } catch {
      setRestoreMsg({ text: 'Verbindungsfehler. Bitte versuchen Sie es erneut.', ok: false })
    } finally {
      setRestoreLoading(false)
    }
  }

  async function handleFiles(files: FileList) {
    if (blocked) { await goCheckout(); return }
    const arr = Array.from(files).slice(0, isPro ? 50 : 3)
    setTotal(arr.length); setLoading(1); setCurrentFile(arr[0]?.name || ""); setRows([]); setErr("")
    const all: Row[] = []; const fp = localStorage.getItem('b2d_fp') || ""
    const sid = localStorage.getItem('b2d_session_id') || ""

    for (let i = 0; i < arr.length; i++) {
      setLoading(i + 1); setCurrentFile(arr[i].name)
      const fd = new FormData(); fd.append("file", arr[i])

      const headers: Record<string, string> = { "x-fingerprint": fp }
      if (sid) {
        headers["x-session-id"] = sid
      }

      try {
        const res = await fetch("/api/analyze", { method: "POST", body: fd, headers })
        const rawText = await res.text()
        const data = rawText ? JSON.parse(rawText) : {}

        if (res.status === 402) {
          if (data.usage) { setUsage(data.usage); localStorage.setItem('b2d_usage', JSON.stringify(data.usage)) }
          setLoading(0); if (all.length > 0) setRows([...all]); await goCheckout(); return
        }

        if (data.usage) { setUsage(data.usage); localStorage.setItem('b2d_usage', JSON.stringify(data.usage)) }

        if (!res.ok) {
          if (data.error === 'LIMIT_REACHED' || data.error === 'FREE_LIMIT_REACHED') {
            const b = { count: 3, limit: 3, remaining: 0 }; setUsage(b); localStorage.setItem('b2d_usage', JSON.stringify(b))
            setLoading(0); if (all.length > 0) setRows([...all]); await goCheckout(); return
          }
          setErr(data.error || "Fehler " + res.status); break
        }

        if (data.rows) data.rows.forEach((r: Row) => all.push({ ...r, fileName: arr[i].name }))
      } catch (e: any) { setErr(e.message); break }
      setRows([...all])
    }
    setLoading(0); setCurrentFile("")
  }

  function downloadCSV() {
    const header = ["EXTF", "700", "21", "Belegfeld1", "Belegdatum", "Konto", "Gegenkonto", "BU", "Brutto", "Belegtext"]
    const lines = [header.join(";")]; rows.forEach(r => lines.push(["EXTF", "700", "21", r.Belegfeld1, r.Belegdatum, r.Konto, r.Gegenkonto, r.BU, r.Brutto, r.Belegtext].join(";")))
    const blob = new Blob([lines.join("\n")], { type: "text/csv" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `DATEV-${rows.length}.csv`; a.click()
  }

  const Table = () => (
    <div className="mt-6 border rounded-2xl bg-white overflow-hidden">
      <div className="p-4 flex justify-between items-center border-b">
        <div><b>{rows.length} Belege erkannt</b><div className="text-xs text-zinc-500">Bereit für DATEV Import</div></div>
        <button onClick={downloadCSV} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold">CSV herunterladen</button>
      </div>
      <div className="max-h-72 overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 sticky top-0"><tr><th className="p-3 text-left">Datum</th><th className="p-3 text-left">Lieferant</th><th className="p-3 text-center">BU</th><th className="p-3 text-right">Brutto</th></tr></thead>
          <tbody>{rows.map((r, i) => <tr key={i} className="border-t hover:bg-zinc-50"><td className="p-3 font-mono text-xs">{r.Belegdatum}</td><td className="p-3 max-w- truncate" title={r.Belegtext}>{r.Belegtext}</td><td className="p-3 text-center text-xs">{r.BU || "-"}</td><td className="p-3 text-right font-medium">{r.Brutto || "—"}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl flex justify-between items-center p-4">
          <Link href="/" className="font-black tracking-tight">beleg2buchhaltung.de</Link>
          <div className="flex gap-3 items-center">
            <div className={`text-xs px-3 py-1 rounded-full font-medium ${isPro ? "bg-emerald-100 text-emerald-800 font-semibold" : "bg-zinc-100"}`}>
              {isPro ? "PRO Unlimited aktiv" : `${usage.count}/${usage.limit} gratis • ${usage.remaining} übrig`}
            </div>
          </div>
        </div>
      </header>
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-12 pb-8 md:pt-20 grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <div className="text-left">
            <div className="inline-flex text-xs font-semibold bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full">✓ OBI • Bauhaus • Hornbach • Hagebau • Toom • Globus • IKEA • 5.127 Belege verarbeitet</div>
            <h1 className="mt-4 text-4xl md:text-5xl font-black leading-[0.95] tracking-tight">Baumarkt-Beleg<br />in 5 Sekunden zu<br /><span className="bg-yellow-200 px-2">DATEV-CSV</span></h1>
            <p className="mt-4 text-zinc-600 leading-relaxed">Schluss mit Abtippen. Unsere KI liest <b>Datum, Brutto, 19% USt, Lieferant</b> – fertig für <b>DATEV Unternehmen Online & Belegtransfer</b>. SKR03/04, Konto 3400 automatisch.</p>

            <div className="mt-6 inline-flex items-baseline gap-2 bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-3">
              <span className="text-3xl font-black tracking-tight">€19</span>
              <span className="text-sm text-zinc-500">/Monat, monatlich kündbar</span>
              <span className="mx-2 text-zinc-300">•</span>
              <span className="text-sm font-semibold text-green-700">3 Belege gratis testen</span>
            </div>
          </div>
          <div className="border-2 border-dashed rounded-3xl p-7 bg-zinc-50/70 shadow-sm" onDragOver={e => { if (!blocked) e.preventDefault() }} onDrop={e => { e.preventDefault(); if (blocked) { goCheckout(); return } if (e.dataTransfer.files) handleFiles(e.dataTransfer.files) }}>
            
            {isPro && (
              <div className="mb-4 text-xs bg-emerald-50 border border-emerald-200 text-emerald-800 p-2.5 rounded-xl text-center">
                ✨ <strong>PRO Unlimited aktiv:</strong> Speichern Sie diese URL als Lesezeichen, um jederzeit von jedem Gerät direkt auf Ihren Pro-Zugang zuzugreifen.
              </div>
            )}

            {blocked ? (
              <div>
                <div className="p-5 bg-black text-white rounded-2xl text-left">
                  <div className="font-bold text-lg">3/3 gratis verbraucht</div>
                  <div className="text-sm text-zinc-300 mt-1">Unlimited für €19/Monat – unbegrenzt, monatlich kündbar.</div>
                  
                  <button onClick={goCheckout} disabled={checkoutLoading} className="mt-4 bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold w-full hover:bg-zinc-100 disabled:opacity-50">
                    {checkoutLoading ? "Weiter zu Stripe..." : "Jetzt für €19 freischalten →"}
                  </button>

                  <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed">
                    <strong className="text-zinc-200">Kein Passwort nötig – Sofortzugriff:</strong> Direkt nach dem Checkout freigeschaltet. Kein lästiges Erstellen von Benutzerkonten.
                  </p>

                  {err && <div className="mt-3 text-xs bg-red-500/20 text-red-200 border border-red-500/30 p-2 rounded-lg">{err}</div>}
                </div>
                {rows.length > 0 && <Table />}
              </div>
            ) : (
              <>
                <div className="text-center">
                  <div className="font-bold">PDF, JPG, PNG hier ablegen oder klicken</div>
                  <div className="text-xs text-zinc-500 mt-1">{isPro ? "Bis zu 50 Belege auf einmal • Auch Handy-Fotos" : "Max 3 Belege pro Durchlauf • Auch Handy-Fotos"}</div>
                  <label className={`mt-5 inline-block px-8 py-3.5 rounded-full font-semibold cursor-pointer ${loading > 0 ? 'bg-zinc-400 text-white' : 'bg-black text-white hover:bg-zinc-800'}`}>
                    {loading > 0 ? `Analysiert... ${loading}/${total}` : 'Dateien wählen'}
                    <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={e => { if (e.target.files) handleFiles(e.target.files) }} disabled={loading > 0} />
                  </label>
                  {loading > 0 && (
                    <div className="mt-6 p-4 bg-black text-white rounded-2xl text-left animate-pulse">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <div>
                          <div className="font-bold text-sm">KI analysiert... {loading}/{total}</div>
                          <div className="text-xs text-zinc-400 truncate max-w-">{currentFile}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {err && <div className="mt-4 bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-sm">Fehler: {err}</div>}
                </div>
                {rows.length > 0 && <Table />}
              </>
            )}

            {!isPro && (
              <div className="mt-6 pt-4 border-t border-zinc-200/80 text-center">
                {!showRestore ? (
                  <button
                    type="button"
                    onClick={() => setShowRestore(true)}
                    className="text-xs text-zinc-500 hover:text-black underline transition"
                  >
                    Bereits Pro-Kunde? Abonnement wiederherstellen
                  </button>
                ) : (
                  <form onSubmit={handleRestore} className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 mt-2 w-full max-w-md mx-auto">
                    <input
                      type="email"
                      required
                      placeholder="Stripe E-Mail-Adresse"
                      value={restoreEmail}
                      onChange={e => setRestoreEmail(e.target.value)}
                      className="px-3 py-1.5 text-xs border border-zinc-300 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black w-full sm:w-56"
                    />
                    <button
                      type="submit"
                      disabled={restoreLoading}
                      className="px-4 py-1.5 text-xs font-semibold text-white bg-black hover:bg-zinc-800 rounded-lg transition disabled:opacity-50 whitespace-nowrap w-full sm:w-auto"
                    >
                      {restoreLoading ? "Prüfe..." : "Aktivieren"}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setShowRestore(false); setRestoreMsg(null) }}
                      className="text-xs text-zinc-400 hover:text-zinc-600 px-1"
                    >
                      Abbrechen
                    </button>
                  </form>
                )}

                {restoreMsg && (
                  <p className={`text-xs mt-2.5 ${restoreMsg.ok ? "text-emerald-600 font-semibold" : "text-red-600"}`}>
                    {restoreMsg.text}
                  </p>
                )}
              </div>
            )}

          </div>
        </section>

        <section className="max-w-3xl mx-auto px-6 py-16 border-t">
          <h2 className="text-2xl font-black tracking-tight">FAQ</h2>
          <div className="mt-8 space-y-8">
            <div>
              <h3 className="font-semibold">Wie importiere ich OBI / Bauhaus Belege in DATEV?</h3>
              <p className="mt-2 text-sm text-zinc-600 leading-6">Beleg hochladen, unsere KI liest Datum, Brutto, 19% USt und Lieferant. Du bekommst eine DATEV-CSV für Belegtransfer und DATEV Unternehmen Online. Konto 3400 (SKR03) bzw. 4400 (SKR04) wird automatisch gesetzt.</p>
            </div>
            <div>
              <h3 className="font-semibold">Funktioniert das mit DATEV Unternehmen Online?</h3>
              <p className="mt-2 text-sm text-zinc-600 leading-6">Ja. Die CSV ist im Format EXTF 700/21 für DATEV Belegtransfer optimiert. Dein Steuerberater kann direkt importieren.</p>
            </div>
            <div>
              <h3 className="font-semibold">Welche Baumärkte werden unterstützt?</h3>
              <p className="mt-2 text-sm text-zinc-600 leading-6">OBI, Bauhaus, Hornbach, Hagebau, Toom, Globus, IKEA und alle anderen mit 19% USt. Trainiert mit 5.127 echten Belegen.</p>
            </div>
            <div>
              <h3 className="font-semibold">Wie greife ich von einem anderen PC oder Browser auf meinen Pro-Zugang zu?</h3>
              <p className="mt-2 text-sm text-zinc-600 leading-6">Klicken Sie einfach unter der Upload-Box auf „Abonnement wiederherstellen" und geben Sie Ihre E-Mail-Adresse ein. Sie erhalten einen Bestätigungslink per E-Mail – ein Klick darauf aktiviert Ihren Pro-Zugang auf dem neuen Gerät, ganz ohne Passwort.</p>
            </div>
            <div>
              <h3 className="font-semibold">Gibt es ein Limit für verarbeitete Belege im Pro-Tarif?</h3>
              <p className="mt-2 text-sm text-zinc-600 leading-6">Für reguläre Einzelunternehmen und Handwerksbetriebe ist die Nutzung im Alltag unbegrenzt. Zum Schutz vor automatisierter Überlastung und zur Sicherung maximaler Servergeschwindigkeit gilt eine großzügige <b>Fair-Use-Policy von 500 Belegen pro Monat</b>. Benötigt Ihre Kanzlei oder Ihr Betrieb ein höheres Kontingent, kontaktieren Sie uns bitte kurz per E-Mail.</p>
            </div>
            <div>
              <h3 className="font-semibold">Wie kann ich mein Monatsabo kündigen oder Rechnungen einsehen?</h3>
              <p className="mt-2 text-sm text-zinc-600 leading-6">
                Jederzeit mit einem Klick über unser{' '}
                <a 
                  href="https://billing.stripe.com/p/login/fZu7sN0QD9d64p6ckq7IY00" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-black font-semibold underline hover:text-zinc-700"
                >
                  Stripe Kundenportal
                </a>
                . Geben Sie dort einfach Ihre E-Mail-Adresse ein, um Rechnungen herunterzuladen oder Ihr Abonnement mit einem Klick zu beenden (alternativ direkt über den Link in jeder Rechnungs-E-Mail von Stripe).
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Ist das DSGVO-konform? Was passiert mit meinen Daten?</h3>
              <p className="mt-2 text-sm text-zinc-600 leading-6">
                Die Belegerkennung erfolgt über einen professionellen KI-Dienstleister auf Basis eines
                Auftragsverarbeitungsvertrags (AVV) nach Art. 28 DSGVO mit Standardvertragsklauseln.
                Das hochgeladene PDF/Bild wird sofort nach der Umwandlung gelöscht und niemals dauerhaft
                gespeichert. Keine Weitergabe an Dritte. Details siehe Datenschutz und Impressum.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Welches Konto für Baumarkt-Belege?</h3>
              <p className="mt-2 text-sm text-zinc-600 leading-6">Standard: 3400 (SKR03) für Baumaterial. 19% USt wird korrekt aufgeschlüsselt. Auch Mischbelege mit 7% und 19% werden erkannt. <b>Automatische GWG-Erkennung:</b> Werkzeuge, Maschinen und Geräte unter 800 € netto werden automatisch auf Konto 4855 gebucht.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
