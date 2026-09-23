import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = {
  title: "Toom Rechnung in DATEV importieren | Anleitung Unternehmen Online",
  description: "Toom Rechnung in DATEV importieren: Anleitung für Unternehmen Online. PDF hochladen, DATEV-CSV mit Toom Nummer, 3400, BU 9 erstellen und importieren.",
  keywords: ["toom-rechnung-in-datev-importieren", "DATEV", "Baumarkt", "SKR03 3400", "19% MwSt", "DATEV Unternehmen Online"],
  alternates: { canonical: "https://beleg2buchhaltung.de/blog/toom-rechnung-in-datev-importieren" },
  openGraph: { title: "Toom Rechnung in DATEV importieren | Anleitung Unternehmen Online", description: "Toom Rechnung in DATEV importieren: Anleitung für Unternehmen Online. PDF hochladen, DATEV-CSV mit Toom Nummer, 3400, BU 9 erstellen und importieren.", url: "https://beleg2buchhaltung.de/blog/toom-rechnung-in-datev-importieren", siteName: "beleg2buchhaltung.de", locale: "de_DE", type: "article" },
}
export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Wie importiere ich Toom Rechnung in DATEV?", "acceptedAnswer": { "@type": "Answer", "text": "PDF hochladen bei beleg2buchhaltung.de, CSV herunterladen, in Unternehmen Online unter Belege → Belegtransfer importieren. Konto 3400, BU 9, Toom Nummer schon gesetzt." } },
      { "@type": "Question", "name": "Wo finde ich Belegtransfer?", "acceptedAnswer": { "@type": "Answer", "text": "Login → Belege → Belegtransfer → Import. Dort CSV auswählen. DATEV erkennt Konto 3400, BU 9 automatisch." } },
      { "@type": "Question", "name": "Mehrere Toom Rechnungen gleichzeitig?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, bis zu 3 pro Upload als Sammel-CSV. Mit Abo unbegrenzt." } }
    ]
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="text-xs text-zinc-500 mb-4"><Link href="/" className="hover:underline">beleg2buchhaltung.de</Link> / <Link href="/blog" className="hover:underline">Blog</Link> / toom-rechnung-in-datev-importieren</div>
      <h1 className="text-4xl font-bold tracking-tight">Toom Rechnung in DATEV importieren</h1>
      <p className="mt-4 text-zinc-600 text-lg">Toom Rechnung in DATEV Unternehmen Online zu importieren geht nicht direkt mit PDF – du brauchst CSV. beleg2buchhaltung.de macht aus Toom PDF die passende CSV in 5 Sekunden.</p>
      <div className="mt-8 border-2 border-dashed rounded-2xl p-8 bg-zinc-50 text-center">
        <p className="font-semibold">Teste direkt: PDF hier ablegen</p>
        <p className="text-sm text-zinc-500">PDF, JPG, PNG bis 10MB • DSGVO-konform verarbeitet in Deutschland</p>
        <div className="mt-4 flex gap-2 justify-center">
          <Link href="/" className="bg-black text-white px-5 py-2 rounded-full text-sm">Zum DATEV-CSV Converter →</Link>
        </div>
      </div>
      <div className="mt-12 prose prose-zinc">

        <h2>Schritt für Schritt: Toom in Unternehmen Online importieren</h2>
        <p><strong>Schritt 1:</strong> Toom PDF oder Foto bei beleg2buchhaltung.de hochladen. <strong>Schritt 2:</strong> DATEV-CSV herunterladen. <strong>Schritt 3:</strong> In Unternehmen Online einloggen → Belege → Belegtransfer → Import → CSV wählen. <strong>Schritt 4:</strong> DATEV zeigt Vorschau: Konto 3400, BU 9, Belegfeld1 1234/5678, Brutto 89,90. Auf Importieren klicken.</p>
        <p>Toom Besonderheit: Kassenbon 1 Seite mit 1234/5678 Nummer, Firmenrechnung A4 mit toom Logo und Rechnungsbetrag unten. Zahlungsart Bar → 1600 Kasse, EC → 1200 Bank. Unsere KI erkennt Bar/EC aus Text <code>Bar</code> oder <code>EC-Cash</code>.</p>
        <p>Tipp: Lade bis zu 3 Toom Bons gleichzeitig hoch – wir erzeugen Sammel-CSV für Belegtransfer.</p>


        <h2>Was DATEV für Toom braucht</h2>
        <p>EXTF 700 mit 21 Feldern: Belegfeld1 Toom Nummer 1234/5678, Belegdatum DDMMYYYY aus 28.08.2025, Konto 3400 Bau- und Rohstoffe, Gegenkonto 1600/1200, BU 9 für 19% Vorsteuer, Brutto 89,90. Unsere CSV hat genau dieses Format. Keine Anpassung nötig.</p>

        <h2>DATEV-CSV Format (EXTF 700)</h2>
        <p>Für DATEV Unternehmen Online brauchst du EXTF 700 mit 21 Feldern. beleg2buchhaltung.de erzeugt genau dieses Format für Toom und OBI, damit der Belegtransfer ohne Anpassung klappt.</p>
        <pre className="text-xs bg-black text-green-400 p-4 rounded-xl overflow-auto">EXTF;700;21;Belegfeld1;Belegdatum;Konto;Gegenkonto;BU;Brutto;Belegtext\n;1234/5678;28082025;3400;1600;9;89,90;toom Baumarkt</pre>
        <p className="text-xs text-zinc-500 mt-2">Belegfeld1 = Rechnungsnummer, Belegdatum DDMMYYYY, Konto 3400, Gegenkonto 1600/1200, BU 9 für 19% Vorsteuer, Brutto mit Komma.</p>
        <h2>Häufige Fehler die wir automatisch korrigieren</h2>
        <ul>
          <li><strong>Datum mit Punkten:</strong> 28.08.2025 → 28082025 für DATEV.</li>
          <li><strong>Brutto mit Euro:</strong> 127,45 € → 127,45.</li>
          <li><strong>Falsches Konto:</strong> 4000 statt 3400 für Handwerker.</li>
          <li><strong>BU fehlt:</strong> Ohne BU 9 keine Vorsteuer.</li>
        </ul>
        <h2>FAQ</h2>
        <h3>Wie importiere ich Toom Rechnung in DATEV?</h3>
        <p>PDF hochladen bei beleg2buchhaltung.de, CSV herunterladen, in Unternehmen Online unter Belege → Belegtransfer importieren. Konto 3400, BU 9, Toom Nummer schon gesetzt.</p>
        <h3>Wo finde ich Belegtransfer?</h3>
        <p>Login → Belege → Belegtransfer → Import. Dort CSV auswählen. DATEV erkennt Konto 3400, BU 9 automatisch.</p>
        <h3>Mehrere Toom Rechnungen gleichzeitig?</h3>
        <p>Ja, bis zu 3 pro Upload als Sammel-CSV. Mit Abo unbegrenzt.</p>
      </div>
      <div className="mt-12 border-t pt-8 flex gap-3">
        <Link href="/blog" className="border px-4 py-2 rounded-full text-sm">← Alle Anleitungen</Link>
        <Link href="/" className="bg-black text-white px-4 py-2 rounded-full text-sm">Zum Converter</Link>
      </div>
    </div>
  )
}
