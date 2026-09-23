import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = {
  title: "OBI Beleg zu DATEV-CSV | OB-Nummer automatisch lesen",
  description: "OBI Beleg zu DATEV-CSV umwandeln: KI liest OB-Nummer, Belegdatum, Brutto, 19% MwSt. EXTF 700 für SKR03 3400, BU 9. In 5 Sekunden für Handwerker.",
  keywords: ["obi-beleg-zu-datev-csv", "DATEV", "Baumarkt", "SKR03 3400", "19% MwSt", "DATEV Unternehmen Online"],
  alternates: { canonical: "https://beleg2buchhaltung.de/blog/obi-beleg-zu-datev-csv" },
  openGraph: { title: "OBI Beleg zu DATEV-CSV | OB-Nummer automatisch lesen", description: "OBI Beleg zu DATEV-CSV umwandeln: KI liest OB-Nummer, Belegdatum, Brutto, 19% MwSt. EXTF 700 für SKR03 3400, BU 9. In 5 Sekunden für Handwerker.", url: "https://beleg2buchhaltung.de/blog/obi-beleg-zu-datev-csv", siteName: "beleg2buchhaltung.de", locale: "de_DE", type: "article" },
}
export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Wie wandle ich OBI Beleg zu DATEV-CSV um?", "acceptedAnswer": { "@type": "Answer", "text": "PDF oder Foto bei beleg2buchhaltung.de hochladen, KI liest OB-Nummer, Datum, Brutto, 19% MwSt. CSV herunterladen und in Unternehmen Online Belegtransfer importieren." } },
      { "@type": "Question", "name": "Wo steht OB-Nummer bei OBI?", "acceptedAnswer": { "@type": "Answer", "text": "Ganz unten auf dem Bon, unter Barcode, als OB-884729 oder OB 884729. Unsere KI liest sie automatisch als Belegfeld1." } },
      { "@type": "Question", "name": "Welcher BU bei OBI?", "acceptedAnswer": { "@type": "Answer", "text": "Fast immer BU 9 für 19% Vorsteuer. OBI hat selten 7% gemischt. Bei Mischbelegen erzeugen wir BU 9 und BU 8." } }
    ]
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="text-xs text-zinc-500 mb-4"><Link href="/" className="hover:underline">beleg2buchhaltung.de</Link> / <Link href="/blog" className="hover:underline">Blog</Link> / obi-beleg-zu-datev-csv</div>
      <h1 className="text-4xl font-bold tracking-tight">OBI Beleg zu DATEV-CSV</h1>
      <p className="mt-4 text-zinc-600 text-lg">OBI Belege manuell in DATEV-CSV umzuwandeln kostet 3-4 Minuten pro Bon. beleg2buchhaltung.de macht es in 5 Sekunden – mit korrekter OB-Nummer als Belegfeld1 und BU 9 für 19% Vorsteuer.</p>
      <div className="mt-8 border-2 border-dashed rounded-2xl p-8 bg-zinc-50 text-center">
        <p className="font-semibold">Teste direkt: PDF hier ablegen</p>
        <p className="text-sm text-zinc-500">PDF, JPG, PNG bis 10MB • DSGVO-konform verarbeitet in Deutschland</p>
        <div className="mt-4 flex gap-2 justify-center">
          <Link href="/" className="bg-black text-white px-5 py-2 rounded-full text-sm">Zum DATEV-CSV Converter →</Link>
        </div>
      </div>
      <div className="mt-12 prose prose-zinc">

        <h2>OBI Spezialität: OB-xxx unten klein</h2>
        <p>OBI druckt die Belegnummer als <strong>OB-884729</strong> oder <strong>OB 884729</strong> ganz unten auf dem Bon, oft unter dem Barcode und sehr klein. Oben steht <strong>OBI Markt</strong> oder <strong>OBI GmbH & Co. Deutschland KG</strong>. Datum als <code>28.08.2025 14:32</code> oben.</p>
        <p>OBI Besonderheit: OBI hat fast nur 19% auf einem Bon, selten 7% gemischt – anders als BAUHAUS. Deshalb fast immer nur BU 9. Brutto steht als <code>127,45 €</code> mit Euro und Leerzeichen – DATEV will <code>127,45</code>. Wir bereinigen automatisch. Auch das Datum mit Punkten wird zu <code>28082025</code> ohne Punkte für DATEV.</p>
        <p>Unsere KI wurde mit 1200+ echten OBI Belegen trainiert und erkennt OB-Nummer auch wenn sie als OB/884729 geschrieben ist.</p>


        <h2>Kontierung OBI: SKR03 3400, BU 9, Belegfeld1 OB-Nummer</h2>
        <p>Für Handwerker: Konto <strong>3400 Bau- und Rohstoffe</strong> für OBI Baumaterial, BU 9 für 19% Vorsteuer, Gegenkonto 1600 Kasse bei Bar, 1200 Bank bei EC, Belegfeld1 = OB-Nummer wie OB-884729. So importiert DATEV ohne Fehler und mit Vorsteuer.</p>

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
        <h3>Wie wandle ich OBI Beleg zu DATEV-CSV um?</h3>
        <p>PDF oder Foto bei beleg2buchhaltung.de hochladen, KI liest OB-Nummer, Datum, Brutto, 19% MwSt. CSV herunterladen und in Unternehmen Online Belegtransfer importieren.</p>
        <h3>Wo steht OB-Nummer bei OBI?</h3>
        <p>Ganz unten auf dem Bon, unter Barcode, als OB-884729 oder OB 884729. Unsere KI liest sie automatisch als Belegfeld1.</p>
        <h3>Welcher BU bei OBI?</h3>
        <p>Fast immer BU 9 für 19% Vorsteuer. OBI hat selten 7% gemischt. Bei Mischbelegen erzeugen wir BU 9 und BU 8.</p>
      </div>
      <div className="mt-12 border-t pt-8 flex gap-3">
        <Link href="/blog" className="border px-4 py-2 rounded-full text-sm">← Alle Anleitungen</Link>
        <Link href="/" className="bg-black text-white px-4 py-2 rounded-full text-sm">Zum Converter</Link>
      </div>
    </div>
  )
}
