'use client'
import { useState, useEffect } from 'react'
import { kategorisiereBeleg } from '@/lib/gwg'
import { generateEXTF } from '@/lib/datev'
import { GWGBadge } from './GWGBadge'

export default function UploadZone() {
  const [usage, setUsage] = useState({ count: 0, limit: 3, remaining: 3 })
  const [blocked, setBlocked] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)

  // Återställning av Pro-prenumeration
  const [showRestore, setShowRestore] = useState(false)
  const [restoreEmail, setRestoreEmail] = useState('')
  const [restoreLoading, setRestoreLoading] = useState(false)
  const [restoreMsg, setRestoreMsg] = useState<{ text: string; ok: boolean } | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // 1. Manuell återställning via ?reset i URL
    if (window.location.search.includes('reset')) {
      localStorage.clear()
      fetch('/api/reset', { method: 'POST' }).finally(() => { window.location.href = '/' })
      return
    }

    // 2. Fånga upp session_id från URL och spara i localStorage
    const params = new URLSearchParams(window.location.search)
    const paramSession = params.get('session_id')
    if (paramSession) {
      localStorage.setItem('b2d_session_id', paramSession)
      setSessionId(paramSession)
    } else {
      const saved = localStorage.getItem('b2d_session_id')
      if (saved) setSessionId(saved)
    }
  }, [])

  const getFingerprint = () => {
    let fp = localStorage.getItem('b2d_fp_v2')
    if (!fp) { fp = 'igor-' + Date.now(); localStorage.setItem('b2d_fp_v2', fp) }
    return fp
  }

  const upload = async (file: File) => {
    const fp = getFingerprint()
    const savedSession = sessionId || (typeof window !== 'undefined' ? localStorage.getItem('b2d_session_id') : null)

    const fd = new FormData()
    fd.append('file', file)

    const headers: Record<string, string> = {
      'x-fingerprint': fp,
    }

    // Skicka med kundens unika sessionsnyckel om den finns
    if (savedSession) {
      headers['x-session-id'] = savedSession
    }

    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers,
      body: fd,
    })

    const data = await res.json()

    // 402 = FREE_LIMIT_REACHED från backend, 429 = Rate limit
    if (res.status === 402 || res.status === 429) {
      setBlocked(true)
      return
    }

    setResult(data)
    if (data.usage) {
      setUsage(data.usage)
    }
  }

  const handleReset = async () => {
    localStorage.clear()
    await fetch('/api/reset', { method: 'POST' })
    setBlocked(false)
    setUsage({ count: 0, limit: 3, remaining: 3 })
    location.reload()
  }

  const handleRestore = async (e: React.FormEvent) => {
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

      if (res.ok && data.sessionId) {
        localStorage.setItem('b2d_session_id', data.sessionId)
        setSessionId(data.sessionId)
        setBlocked(false)
        setRestoreMsg({ text: 'Pro-Abonnement erfolgreich aktiviert!', ok: true })
        setTimeout(() => {
          window.location.href = `/?session_id=${data.sessionId}`
        }, 800)
      } else {
        setRestoreMsg({ text: data.error || 'Kein aktives Abonnement gefunden.', ok: false })
      }
    } catch {
      setRestoreMsg({ text: 'Verbindungsfehler. Bitte versuchen Sie es erneut.', ok: false })
    } finally {
      setRestoreLoading(false)
    }
  }

  const getLineItems = () => {
    if (!result) return []
    const raw = result.lineItems || result.positionen || result.items || result.data?.positionen || []
    if (Array.isArray(raw) && raw.length > 0) {
      return raw.map((p: any) => ({
        netto: Number(p.netto || p.net || p.brutto / 1.19),
        beschreibung: String(p.beschreibung || p.text || 'Position'),
      })).filter((x: any) => x.netto > 0)
    }
    const brutto = Number(result.brutto || result.data?.brutto || 46.6)
    const netto = Number(result.netto || brutto / 1.19)
    return [{ netto, beschreibung: result.lieferant || result.haendler || 'BAU- & GARTENMARKT GRUENLAND GmbH' }]
  }

  const lineItems = getLineItems()
  const mitGWG = lineItems.length ? kategorisiereBeleg(lineItems) : []
  const extf = mitGWG.length ? generateEXTF('BG-8821', '28.07.2026', 'BAU- & GARTENMARKT GRUENLAND GmbH', mitGWG) : ''

  const isPro = usage.limit > 3 || Boolean(sessionId)

  return (
    <div className="mx-auto max-w-2xl border-2 border-dashed rounded-2xl p-8 text-center">
      <div className="text-xs font-mono mb-2">
        {isPro ? (
          <span className="bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full">
            PRO AKTIV {usage.count > 0 ? `(${usage.count} Belege analysiert)` : ''}
          </span>
        ) : (
          <span>{usage.count}/{usage.limit} Kostenlose Belege</span>
        )}
      </div>

      <button onClick={handleReset} className="text-xs bg-black text-white px-3 py-1 rounded-full mb-4">
        🔧 Reset 0/3
      </button>

      <div>
        <input type="file" onChange={e => e.target.files && upload(e.target.files[0])} />
      </div>

      {blocked && (
        <div className="mt-4 bg-black text-white p-3 rounded">
          Gratis-Limit erreicht (3/3). Bitte auf Pro upgraden für unbegrenzte Analysen.
        </div>
      )}

      {/* Återställ Pro för kunder i andra webbläsare eller inkognito */}
      {!isPro && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          {!showRestore ? (
            <button
              type="button"
              onClick={() => setShowRestore(true)}
              className="text-xs text-gray-500 hover:text-black underline transition"
            >
              Bereits Pro-Kunde? Abonnement wiederherstellen
            </button>
          ) : (
            <form onSubmit={handleRestore} className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 mt-2">
              <input
                type="email"
                required
                placeholder="Stripe E-Mail-Adresse"
                value={restoreEmail}
                onChange={e => setRestoreEmail(e.target.value)}
                className="px-3 py-1 text-xs border rounded-md bg-white text-black focus:outline-none focus:ring-1 focus:ring-black w-60"
              />
              <button
                type="submit"
                disabled={restoreLoading}
                className="px-3 py-1 text-xs font-medium text-white bg-black hover:bg-neutral-800 rounded-md transition disabled:opacity-50"
              >
                {restoreLoading ? 'Prüfe...' : 'Aktivieren'}
              </button>
              <button
                type="button"
                onClick={() => { setShowRestore(false); setRestoreMsg(null); }}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                Abbrechen
              </button>
            </form>
          )}

          {restoreMsg && (
            <p className={`text-xs mt-2 ${restoreMsg.ok ? 'text-emerald-600 font-medium' : 'text-red-500'}`}>
              {restoreMsg.text}
            </p>
          )}
        </div>
      )}

      {mitGWG.length > 0 && (
        <div className="mt-6 text-left">
          <h3 className="font-black mb-2">GWG-Check & AfA – funktioniert jetzt</h3>
          {mitGWG.map((it, i) => <GWGBadge key={i} item={it} />)}
          <pre className="mt-4 bg-gray-100 p-3 text-xs overflow-auto whitespace-pre-wrap">{extf}</pre>
          <button
            onClick={() => {
              const blob = new Blob([extf], { type: 'text/plain' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'DATEV_BG-8821.txt'
              a.click()
            }}
            className="mt-3 bg-black text-white px-4 py-2 rounded"
          >
            DATEV EXTF herunterladen
          </button>
        </div>
      )}
    </div>
  )
}
