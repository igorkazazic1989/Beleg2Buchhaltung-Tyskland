import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = {
  title: "IKEA Rechnung DATEV importieren Handwerker | 19% MwSt BU 9",
  description: "IKEA Rechnung DATEV importieren für Handwerker: IKEA Beleg PDF zu DATEV-CSV, SKR03 3400, BU 9 für 19% Möbel, BU 8 für 7% Food. Automatisch.",
  keywords: ["ikea-rechnung-datev-importieren-handwerker", "DATEV", "Baumarkt", "SKR03 3400", "19% MwSt", "DATEV Unternehmen Online"],
  alternates: { canonical: "https://beleg2buchhaltung.de/blog/ikea-rechnung-datev-importieren-handwerker" },
  openGraph: { title: "IKEA Rechnung DATEV importieren Handwerker | 19% MwSt BU 9", description: "IKEA Rechnung DATEV importieren für Handwerker: IKEA Beleg PDF zu DATEV-CSV, SKR03 3400, BU 9 für 19% Möbel, BU 8 für 7% Food. Automatisch.", url: "https://beleg2buchhaltung.de/blog/ikea-rechnung-datev-importieren-handwerker", siteName: "beleg2buchhaltung.de", locale: "de_DE", type: "article" },
}
export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Wie importiere ich IKEA Rechnung in DATEV?", "acceptedAnswer": { "@type": "Answer", "text": "PDF hochladen bei beleg2buchhaltung.de, CSV herunterladen, in Unternehmen Online Belegtransfer importieren. Konto 3400, BU 9/8 automatisch." } },
      { "@type": "Question", "name": "IKEA mit 19% und 7% auf einem Bon?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, Möbel 19% und Restaurant/Hotdog 7%. Wir erzeugen zwei Zeilen BU 9 und BU 8 mit gleicher Belegnummer." } },
      { "@type": "Question", "name": "Welches Konto für IKEA als Handwerker?", "acceptedAnswer": { "@type": "Answer", "text": "3400 für Baumaterial/Küche, 4985 für Werkzeuge, 6805 für Büro. Standard 3400, du kannst im Converter ändern." } }
    ]
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="text-xs text-zinc-500 mb-4"><Link href="/" className="hover:underline">beleg2buchhaltung.de</Link> / <Link href="/blog" className="hover:underline">Blog</Link> / ikea-rechnung-datev-importieren-handwerker</div>
      <h1 className="text-4xl font-bold tracking-tight">IKEA Rechnung DATEV importieren Handwerker</h1>
      <p className="mt-4 text-zinc-600 text-lg">IKEA Rechnungen für Handwerker – Küche, Büro, Baustelleneinrichtung – musst du auch in DATEV buchen. IKEA druckt anders als Baumarkt: Lange Belegnummern und 19% + 7% Food gemischt. beleg2buchhaltung.de liest auch IKEA.</p>
      <div className="mt-8 border-2 border-dashed rounded-2xl p-8 bg-zinc-50 text-center">
        <p className="font-semibold">Teste direkt: PDF hier ablegen</p>
        <p className="text-sm text-zinc-500">PDF, JPG, PNG bis 10MB • DSGVO-konform verarbeitet in Deutschland</p>
        <div className="mt-4 flex gap-2 justify-center">
          <Link href="/" className="bg-black text-white px-5 py-2 rounded-full text-sm">Zum DATEV-CSV Converter →</Link>
        </div>
      </div>
      <div className="mt-12 prose prose-zinc">

        <h2>IKEA Spezialität: Lange Belegnummer und 19% + 7% Food</h2>
        <p>IKEA druckt keine OB- oder BH-Nummer, sondern <strong>Beleg-Nr. 123456789012</strong> oder <strong>Rechnungsnr. 987654321</strong> mit 10-12 Ziffern unten. Oben steht <strong>IKEA Deutschland GmbH & Co. KG</strong> mit Filiale. Datum als <code>28.08.2025</code>.</p>
        <p>IKEA Besonderheit: <strong>19% Möbel/Küche und 7% Hotdog/RESTAURANT</strong> auf einem Bon, wenn du auf Baustelle Mittag isst. Unsere KI splittet automatisch: BU 9 für 19% Möbel, BU 8 für 7% Food. Anders als Baumarkt ist bei IKEA oft auch 4985 Werkzeuge oder 6805 Büromaterial statt 3400 – je nach Artikel. Standard setzen wir 3400 für Handwerker, du kannst im Converter auf 4985 ändern.</p>
        <p>IKEA PDFs aus dem Online-Konto sind echte PDFs mit Text, keine Scans – wir lesen sie noch schneller.</p>


        <h2>Kontierung IKEA für Handwerker</h2>
        <p>Standard: Konto <strong>3400 Bau- und Rohstoffe</strong> für Küchen/Baumaterial, oder 4985 Werkzeuge, 6805 Bürobedarf – je nach Verwendung. BU 9 für 19%, BU 8 für 7% Food. Gegenkonto 1600/1200. Belegfeld1 = lange IKEA Belegnummer. Für DATEV brauchst du immer Belegfeld1, sonst kein Import.</p>

        <h2>DATEV-CSV Format (EXTF 700)</h2>
        <p>DATEV Unternehmen Online erwartet EXTF 700 mit 21 Feldern. beleg2buchhaltung.de erzeugt genau dieses Format, damit der Import ohne Anpassung funktioniert.</p>
        <pre className="text-xs bg-black text-green-400 p-4 rounded-xl overflow-auto">EXTF;700;21;Belegfeld1;Belegdatum;Konto;Gegenkonto;BU;Brutto;Belegtext\n;123456789012;28082025;3400;1600;9;299,00;IKEA\n;123456789012;28082025;3400;1600;8;5,50;IKEA Food</pre>
        <p className="text-xs text-zinc-500 mt-2">Belegfeld1 = Rechnungsnummer, Belegdatum als DDMMYYYY, Konto 3400, Gegenkonto 1600/1200, BU 9 für 19% Vorsteuer. Bei Mischsteuersätzen zwei Zeilen BU 9 + BU 8.</p>
        <h2>Häufige Fehler die wir automatisch korrigieren</h2>
        <ul>
          <li><strong>Datum mit Punkten:</strong> 28.08.2025 auf dem Bon → 28082025 für DATEV.</li>
          <li><strong>Brutto mit Euro:</strong> 127,45 € → 127,45 ohne Leerzeichen und Euro.</li>
          <li><strong>Falsches Konto:</strong> Viele buchen Baumarkt auf 4000 statt 3400 für Handwerker.</li>
          <li><strong>Belegnummer fehlt:</strong> Ohne OB-/BH-/HB-Nummer lehnt Belegtransfer ab.</li>
        </ul>
        <h2>FAQ</h2>
        <h3>Wie importiere ich IKEA Rechnung in DATEV?</h3>
        <p>PDF hochladen bei beleg2buchhaltung.de, CSV herunterladen, in Unternehmen Online Belegtransfer importieren. Konto 3400, BU 9/8 automatisch.</p>
        <h3>IKEA mit 19% und 7% auf einem Bon?</h3>
        <p>Ja, Möbel 19% und Restaurant/Hotdog 7%. Wir erzeugen zwei Zeilen BU 9 und BU 8 mit gleicher Belegnummer.</p>
        <h3>Welches Konto für IKEA als Handwerker?</h3>
        <p>3400 für Baumaterial/Küche, 4985 für Werkzeuge, 6805 für Büro. Standard 3400, du kannst im Converter ändern.</p>
      </div>
      <div className="mt-12 border-t pt-8 flex gap-3">
        <Link href="/blog" className="border px-4 py-2 rounded-full text-sm">← Alle Anleitungen</Link>
        <Link href="/" className="bg-black text-white px-4 py-2 rounded-full text-sm">Zum Converter</Link>
      </div>
    </div>
  )
}
