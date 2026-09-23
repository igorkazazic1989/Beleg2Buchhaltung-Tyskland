import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = {
  title: "OBI Rechnung PDF in DATEV-CSV umwandeln | Automatisch",
  description: "OBI Rechnung PDF in DATEV-CSV umwandeln: KI liest OBI PDF, JPG, Foto. OB-Nummer, Datum, Brutto, 19% MwSt automatisch. Für SKR03 3400, BU 9.",
  keywords: ["obi-rechnung-pdf-in-datev-csv-umwandeln", "DATEV", "Baumarkt", "SKR03 3400", "19% MwSt", "DATEV Unternehmen Online"],
  alternates: { canonical: "https://beleg2buchhaltung.de/blog/obi-rechnung-pdf-in-datev-csv-umwandeln" },
  openGraph: { title: "OBI Rechnung PDF in DATEV-CSV umwandeln | Automatisch", description: "OBI Rechnung PDF in DATEV-CSV umwandeln: KI liest OBI PDF, JPG, Foto. OB-Nummer, Datum, Brutto, 19% MwSt automatisch. Für SKR03 3400, BU 9.", url: "https://beleg2buchhaltung.de/blog/obi-rechnung-pdf-in-datev-csv-umwandeln", siteName: "beleg2buchhaltung.de", locale: "de_DE", type: "article" },
}
export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Geht OBI PDF in DATEV-CSV auch mit Handy-Foto?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. JPG, PNG bis 10MB, auch schief mit Schatten. KI ist auf Handy-Fotos von OBI trainiert." } },
      { "@type": "Question", "name": "Liest ihr auch OBI Online PDFs?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, echte Text-PDFs aus OBI Konto werden noch schneller gelesen als Fotos. Auch gescannte Bild-PDFs funktionieren mit Vision-OCR." } },
      { "@type": "Question", "name": "Was passiert mit meinem OBI PDF nach Upload?", "acceptedAnswer": { "@type": "Answer", "text": "DSGVO-konform in Deutschland verarbeitet, nach Download gelöscht. Keine Speicherung, kein Training mit deinen Daten." } }
    ]
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="text-xs text-zinc-500 mb-4"><Link href="/" className="hover:underline">beleg2buchhaltung.de</Link> / <Link href="/blog" className="hover:underline">Blog</Link> / obi-rechnung-pdf-in-datev-csv-umwandeln</div>
      <h1 className="text-4xl font-bold tracking-tight">OBI Rechnung PDF in DATEV-CSV umwandeln</h1>
      <p className="mt-4 text-zinc-600 text-lg">Du hast OBI Rechnungen als PDF aus dem OBI Konto oder als Handy-Foto? Lade sie hoch – wir wandeln sie in DATEV-CSV um, die du direkt in Unternehmen Online importieren kannst. Kein OCR-Tool nötig.</p>
      <div className="mt-8 border-2 border-dashed rounded-2xl p-8 bg-zinc-50 text-center">
        <p className="font-semibold">Teste direkt: PDF hier ablegen</p>
        <p className="text-sm text-zinc-500">PDF, JPG, PNG bis 10MB • DSGVO-konform verarbeitet in Deutschland</p>
        <div className="mt-4 flex gap-2 justify-center">
          <Link href="/" className="bg-black text-white px-5 py-2 rounded-full text-sm">Zum DATEV-CSV Converter →</Link>
        </div>
      </div>
      <div className="mt-12 prose prose-zinc">

        <h2>OBI PDF Besonderheit: Text-PDF vs Foto</h2>
        <p>OBI PDFs aus dem Online-Konto sind echte Text-PDFs mit <strong>OBI GmbH & Co. Deutschland KG</strong> oben und OB-Nummer unten. Kassenbon Fotos sind JPG mit Schatten. Unsere Vision-KI liest beides: Text-PDFs noch schneller, Fotos auch schief.</p>
        <p>OBI druckt Brutto als <strong>127,45 €</strong> mit Euro und Leerzeichen, Datum als <code>28.08.2025</code> mit Punkten. DATEV will <code>127,45</code> ohne Euro und <code>28082025</code> ohne Punkte. Wir wandeln automatisch um. OB-Nummer als <code>OB-884729</code> wird als Belegfeld1 gesetzt – Pflicht für DATEV.</p>
        <p>OBI hat fast nur 19% MwSt, selten 7% – deshalb fast immer BU 9.</p>


        <h2>PDF zu DATEV-CSV: So funktioniert es für OBI</h2>
        <p>PDF, JPG, PNG bis 10MB hochladen. KI erkennt OBI am Logo, liest Belegdatum, Brutto, OB-Nummer, 19% MwSt. Ergebnis: EXTF 700 CSV mit Konto 3400, BU 9, Gegenkonto 1600/1200, Belegfeld1 OB-Nummer. DSGVO-konform in Deutschland verarbeitet, nach Download gelöscht.</p>

        <h2>DATEV-CSV Format (EXTF 700)</h2>
        <p>DATEV Unternehmen Online erwartet EXTF 700 mit 21 Feldern. beleg2buchhaltung.de erzeugt genau dieses Format, damit der Import ohne Anpassung funktioniert.</p>
        <pre className="text-xs bg-black text-green-400 p-4 rounded-xl overflow-auto">EXTF;700;21;Belegfeld1;Belegdatum;Konto;Gegenkonto;BU;Brutto;Belegtext\n;OB-884729;28082025;3400;1600;9;127,45;OBI Markt</pre>
        <p className="text-xs text-zinc-500 mt-2">Belegfeld1 = Rechnungsnummer, Belegdatum als DDMMYYYY, Konto 3400, Gegenkonto 1600/1200, BU 9 für 19% Vorsteuer. Bei Mischsteuersätzen zwei Zeilen BU 9 + BU 8.</p>
        <h2>Häufige Fehler die wir automatisch korrigieren</h2>
        <ul>
          <li><strong>Datum mit Punkten:</strong> 28.08.2025 auf dem Bon → 28082025 für DATEV.</li>
          <li><strong>Brutto mit Euro:</strong> 127,45 € → 127,45 ohne Leerzeichen und Euro.</li>
          <li><strong>Falsches Konto:</strong> Viele buchen Baumarkt auf 4000 statt 3400 für Handwerker.</li>
          <li><strong>Belegnummer fehlt:</strong> Ohne OB-/BH-/HB-Nummer lehnt Belegtransfer ab.</li>
        </ul>
        <h2>FAQ</h2>
        <h3>Geht OBI PDF in DATEV-CSV auch mit Handy-Foto?</h3>
        <p>Ja. JPG, PNG bis 10MB, auch schief mit Schatten. KI ist auf Handy-Fotos von OBI trainiert.</p>
        <h3>Liest ihr auch OBI Online PDFs?</h3>
        <p>Ja, echte Text-PDFs aus OBI Konto werden noch schneller gelesen als Fotos. Auch gescannte Bild-PDFs funktionieren mit Vision-OCR.</p>
        <h3>Was passiert mit meinem OBI PDF nach Upload?</h3>
        <p>DSGVO-konform in Deutschland verarbeitet, nach Download gelöscht. Keine Speicherung, kein Training mit deinen Daten.</p>
      </div>
      <div className="mt-12 border-t pt-8 flex gap-3">
        <Link href="/blog" className="border px-4 py-2 rounded-full text-sm">← Alle Anleitungen</Link>
        <Link href="/" className="bg-black text-white px-4 py-2 rounded-full text-sm">Zum Converter</Link>
      </div>
    </div>
  )
}
