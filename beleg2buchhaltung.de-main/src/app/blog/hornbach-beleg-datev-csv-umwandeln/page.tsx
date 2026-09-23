import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = {
  title: "Hornbach Beleg DATEV-CSV umwandeln | HB-Nummer automatisch lesen",
  description: "Hornbach Beleg in DATEV-CSV umwandeln: KI liest HB-Nummer, Belegdatum, Brutto, 19% MwSt. EXTF 700 für SKR03 3400, BU 9. Für Handwerker.",
  keywords: ["hornbach-beleg-datev-csv-umwandeln", "DATEV", "Baumarkt", "SKR03 3400", "19% MwSt", "DATEV Unternehmen Online"],
  alternates: { canonical: "https://beleg2buchhaltung.de/blog/hornbach-beleg-datev-csv-umwandeln" },
  openGraph: { title: "Hornbach Beleg DATEV-CSV umwandeln | HB-Nummer automatisch lesen", description: "Hornbach Beleg in DATEV-CSV umwandeln: KI liest HB-Nummer, Belegdatum, Brutto, 19% MwSt. EXTF 700 für SKR03 3400, BU 9. Für Handwerker.", url: "https://beleg2buchhaltung.de/blog/hornbach-beleg-datev-csv-umwandeln", siteName: "beleg2buchhaltung.de", locale: "de_DE", type: "article" },
}
export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Wie wandle ich Hornbach Beleg zu DATEV-CSV um?", "acceptedAnswer": { "@type": "Answer", "text": "PDF oder Foto bei beleg2buchhaltung.de hochladen, KI liest HB-Nummer, Datum, Brutto, 19% MwSt. CSV herunterladen und in Unternehmen Online Belegtransfer importieren." } },
      { "@type": "Question", "name": "Welche Belegnummer hat Hornbach?", "acceptedAnswer": { "@type": "Answer", "text": "HB-112093 oder Rg. Nr. HB-112093 oben rechts, bei Firmenrechnung 2 Seiten. Unsere KI liest HB-Nummer automatisch als Belegfeld1." } },
      { "@type": "Question", "name": "Hornbach mit 19% und 7% gemischt?", "acceptedAnswer": { "@type": "Answer", "text": "Selten, meist nur 19%. Wenn doch gemischt, erzeugen wir zwei Zeilen BU 9 und BU 8 mit gleicher HB-Nummer." } }
    ]
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="text-xs text-zinc-500 mb-4"><Link href="/" className="hover:underline">beleg2buchhaltung.de</Link> / <Link href="/blog" className="hover:underline">Blog</Link> / hornbach-beleg-datev-csv-umwandeln</div>
      <h1 className="text-4xl font-bold tracking-tight">Hornbach Beleg DATEV-CSV umwandeln</h1>
      <p className="mt-4 text-zinc-600 text-lg">Hornbach Belege in DATEV-CSV umzuwandeln ist mit Hornbachs langen Artikelnummern mühsam. beleg2buchhaltung.de liest die HB-Nummer automatisch aus und erzeugt eine fertige CSV für Unternehmen Online.</p>
      <div className="mt-8 border-2 border-dashed rounded-2xl p-8 bg-zinc-50 text-center">
        <p className="font-semibold">Teste direkt: PDF hier ablegen</p>
        <p className="text-sm text-zinc-500">PDF, JPG, PNG bis 10MB • DSGVO-konform verarbeitet in Deutschland</p>
        <div className="mt-4 flex gap-2 justify-center">
          <Link href="/" className="bg-black text-white px-5 py-2 rounded-full text-sm">Zum DATEV-CSV Converter →</Link>
        </div>
      </div>
      <div className="mt-12 prose prose-zinc">

        <h2>Hornbach Spezialität: HB-Nummer und 2-seitige Rechnungen</h2>
        <p>Hornbach druckt die Belegnummer als <strong>HB-112093</strong> oder <strong>Rg. Nr. HB-112093</strong> oben rechts, oft auf Seite 1 von 2 bei Firmenkunden. Anders als OBI OB- oder BAUHAUS BH- steht bei Hornbach manchmal <strong>HORNBACH Baumarkt AG, Hornbachstr. 11</strong> im Kopf und die Filialnummer extra.</p>
        <p>Hornbach Besonderheit: Sehr lange Artikelzeilen mit Artikelnummern wie <code>12345678</code> und EAN. Die Summe steht unten als <strong>Brutto 127,45 €</strong> mit Leerzeichen. Unsere KI ignoriert die langen Zeilen und liest nur Brutto, Datum und HB-Nummer. Datum steht als <code>28.08.2025 14:32:11</code> mit Sekunden – wir kürzen auf DDMMYYYY für DATEV.</p>
        <p>Hornbach hat meist nur 19% auf einem Bon, selten 7%. Deshalb fast immer BU 9.</p>


        <h2>Kontierung für Hornbach: SKR03 3400, BU 9</h2>
        <p>Für Handwerker: Konto <strong>3400 Bau- und Rohstoffe</strong>, BU 9 für 19% Vorsteuer, Gegenkonto 1600 Kasse bei Bar, 1200 Bank bei EC. Belegfeld1 = HB-Nummer wie HB-112093. Bei Firmenrechnung mit Überweisung Gegenkonto 1200. So importiert DATEV ohne Fehler.</p>

        <h2>DATEV-CSV Format (EXTF 700)</h2>
        <p>DATEV Unternehmen Online erwartet EXTF 700 mit 21 Feldern. beleg2buchhaltung.de erzeugt genau dieses Format, damit der Import ohne Anpassung funktioniert.</p>
        <pre className="text-xs bg-black text-green-400 p-4 rounded-xl overflow-auto">EXTF;700;21;Belegfeld1;Belegdatum;Konto;Gegenkonto;BU;Brutto;Belegtext\n;HB-112093;28082025;3400;1600;9;127,45;Hornbach</pre>
        <p className="text-xs text-zinc-500 mt-2">Belegfeld1 = Rechnungsnummer, Belegdatum als DDMMYYYY, Konto 3400, Gegenkonto 1600/1200, BU 9 für 19% Vorsteuer. Bei Mischsteuersätzen zwei Zeilen BU 9 + BU 8.</p>
        <h2>Häufige Fehler die wir automatisch korrigieren</h2>
        <ul>
          <li><strong>Datum mit Punkten:</strong> 28.08.2025 auf dem Bon → 28082025 für DATEV.</li>
          <li><strong>Brutto mit Euro:</strong> 127,45 € → 127,45 ohne Leerzeichen und Euro.</li>
          <li><strong>Falsches Konto:</strong> Viele buchen Baumarkt auf 4000 statt 3400 für Handwerker.</li>
          <li><strong>Belegnummer fehlt:</strong> Ohne OB-/BH-/HB-Nummer lehnt Belegtransfer ab.</li>
        </ul>
        <h2>FAQ</h2>
        <h3>Wie wandle ich Hornbach Beleg zu DATEV-CSV um?</h3>
        <p>PDF oder Foto bei beleg2buchhaltung.de hochladen, KI liest HB-Nummer, Datum, Brutto, 19% MwSt. CSV herunterladen und in Unternehmen Online Belegtransfer importieren.</p>
        <h3>Welche Belegnummer hat Hornbach?</h3>
        <p>HB-112093 oder Rg. Nr. HB-112093 oben rechts, bei Firmenrechnung 2 Seiten. Unsere KI liest HB-Nummer automatisch als Belegfeld1.</p>
        <h3>Hornbach mit 19% und 7% gemischt?</h3>
        <p>Selten, meist nur 19%. Wenn doch gemischt, erzeugen wir zwei Zeilen BU 9 und BU 8 mit gleicher HB-Nummer.</p>
      </div>
      <div className="mt-12 border-t pt-8 flex gap-3">
        <Link href="/blog" className="border px-4 py-2 rounded-full text-sm">← Alle Anleitungen</Link>
        <Link href="/" className="bg-black text-white px-4 py-2 rounded-full text-sm">Zum Converter</Link>
      </div>
    </div>
  )
}
