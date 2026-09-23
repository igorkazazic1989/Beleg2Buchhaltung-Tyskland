import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = {
  title: "OBI Hornbach IKEA DATEV | Alle Baumärkte in DATEV importieren",
  description: "OBI Hornbach IKEA DATEV: Alle Baumarkt Belege automatisch in DATEV importieren. OBI OB-, Hornbach HB-, IKEA lange Nummer. SKR03 3400, BU 9.",
  keywords: ["obi-hornbach-ikea-datev", "DATEV", "Baumarkt", "SKR03 3400", "19% MwSt", "DATEV Unternehmen Online"],
  alternates: { canonical: "https://beleg2buchhaltung.de/blog/obi-hornbach-ikea-datev" },
  openGraph: { title: "OBI Hornbach IKEA DATEV | Alle Baumärkte in DATEV importieren", description: "OBI Hornbach IKEA DATEV: Alle Baumarkt Belege automatisch in DATEV importieren. OBI OB-, Hornbach HB-, IKEA lange Nummer. SKR03 3400, BU 9.", url: "https://beleg2buchhaltung.de/blog/obi-hornbach-ikea-datev", siteName: "beleg2buchhaltung.de", locale: "de_DE", type: "article" },
}
export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Kann ich OBI, Hornbach und IKEA gemischt importieren?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. PDF gemischt hochladen, wir erkennen jeden Lieferanten und erzeugen Sammel-CSV mit OB-, HB-, IKEA-Nummer als Belegfeld1. In Unternehmen Online einmal importieren." } },
      { "@type": "Question", "name": "Welche Belegnummern haben OBI, Hornbach, IKEA?", "acceptedAnswer": { "@type": "Answer", "text": "OBI OB-Nummer, Hornbach HB-Nummer, IKEA lange 10-12 stellige Nummer. Alle werden automatisch als Belegfeld1 gelesen." } },
      { "@type": "Question", "name": "IKEA mit 19% und 7% zusammen?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, IKEA Möbel 19% und Food 7% gemischt. Wir splitten in BU 9 und BU 8 mit gleicher Belegnummer." } }
    ]
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="text-xs text-zinc-500 mb-4"><Link href="/" className="hover:underline">beleg2buchhaltung.de</Link> / <Link href="/blog" className="hover:underline">Blog</Link> / obi-hornbach-ikea-datev</div>
      <h1 className="text-4xl font-bold tracking-tight">OBI Hornbach IKEA DATEV</h1>
      <p className="mt-4 text-zinc-600 text-lg">Du kaufst bei OBI, Hornbach und IKEA – und musst alle in DATEV importieren. Jeder druckt anders. beleg2buchhaltung.de erkennt alle drei automatisch und erzeugt eine einheitliche DATEV-CSV.</p>
      <div className="mt-8 border-2 border-dashed rounded-2xl p-8 bg-zinc-50 text-center">
        <p className="font-semibold">Teste direkt: PDF hier ablegen</p>
        <p className="text-sm text-zinc-500">PDF, JPG, PNG bis 10MB • DSGVO-konform verarbeitet in Deutschland</p>
        <div className="mt-4 flex gap-2 justify-center">
          <Link href="/" className="bg-black text-white px-5 py-2 rounded-full text-sm">Zum DATEV-CSV Converter →</Link>
        </div>
      </div>
      <div className="mt-12 prose prose-zinc">

        <h2>OBI vs Hornbach vs IKEA: Unterschiede im Beleg</h2>
        <p>Drei Märkte, drei Formate, ein DATEV-Import:</p>
        <ul>
          <li><strong>OBI:</strong> OB-884729 unten klein, fast nur 19%, Brutto 127,45 €, Markt OBI Markt.</li>
          <li><strong>Hornbach:</strong> HB-112093 oben rechts, oft 2-seitige Firmenrechnung, lange Artikelnummern, 19% MwSt 20,36 € unten.</li>
          <li><strong>IKEA:</strong> Beleg-Nr. 123456789012 mit 10-12 Ziffern, 19% Möbel + 7% Food gemischt (Hotdog), PDFs mit echtem Text.</li>
        </ul>
        <p>Unsere KI wurde mit 5000+ Belegen aller drei trainiert. Sie erkennt am Logo und Text welcher Markt es ist und wo Belegnummer, Datum und Brutto stehen. Du lädst OBI, Hornbach und IKEA gemischt hoch – wir erzeugen Sammel-CSV mit korrektem Lieferant in Belegtext.</p>
        <p>Gemeinsam: Alle haben Datum als DD.MM.YYYY, Brutto mit Euro und Leerzeichen – DATEV will DDMMYYYY und 127,45 ohne Euro. Wir wandeln alle um.</p>


        <h2>Einheitliche Kontierung für OBI, Hornbach, IKEA</h2>
        <p>Für Handwerker immer <strong>Konto 3400 Bau- und Rohstoffe</strong> (oder 4985/6805 für IKEA Werkzeuge/Büro), BU 9 für 19%, BU 8 für 7% bei IKEA Food oder BAUHAUS Pflanzen, Gegenkonto 1600/1200, Belegfeld1 = OB-/HB-/IKEA-Nummer. So importiert DATEV alle drei ohne Anpassung.</p>

        <h2>DATEV-CSV Format (EXTF 700)</h2>
        <p>DATEV Unternehmen Online erwartet EXTF 700 mit 21 Feldern. beleg2buchhaltung.de erzeugt genau dieses Format, damit der Import ohne Anpassung funktioniert.</p>
        <pre className="text-xs bg-black text-green-400 p-4 rounded-xl overflow-auto">EXTF;700;21;Belegfeld1;Belegdatum;Konto;Gegenkonto;BU;Brutto;Belegtext\n;OB-884729;28082025;3400;1600;9;127,45;OBI\n;HB-112093;28082025;3400;1600;9;89,90;Hornbach\n;123456789012;28082025;3400;1600;9;299,00;IKEA</pre>
        <p className="text-xs text-zinc-500 mt-2">Belegfeld1 = Rechnungsnummer, Belegdatum als DDMMYYYY, Konto 3400, Gegenkonto 1600/1200, BU 9 für 19% Vorsteuer. Bei Mischsteuersätzen zwei Zeilen BU 9 + BU 8.</p>
        <h2>Häufige Fehler die wir automatisch korrigieren</h2>
        <ul>
          <li><strong>Datum mit Punkten:</strong> 28.08.2025 auf dem Bon → 28082025 für DATEV.</li>
          <li><strong>Brutto mit Euro:</strong> 127,45 € → 127,45 ohne Leerzeichen und Euro.</li>
          <li><strong>Falsches Konto:</strong> Viele buchen Baumarkt auf 4000 statt 3400 für Handwerker.</li>
          <li><strong>Belegnummer fehlt:</strong> Ohne OB-/BH-/HB-Nummer lehnt Belegtransfer ab.</li>
        </ul>
        <h2>FAQ</h2>
        <h3>Kann ich OBI, Hornbach und IKEA gemischt importieren?</h3>
        <p>Ja. PDF gemischt hochladen, wir erkennen jeden Lieferanten und erzeugen Sammel-CSV mit OB-, HB-, IKEA-Nummer als Belegfeld1. In Unternehmen Online einmal importieren.</p>
        <h3>Welche Belegnummern haben OBI, Hornbach, IKEA?</h3>
        <p>OBI OB-Nummer, Hornbach HB-Nummer, IKEA lange 10-12 stellige Nummer. Alle werden automatisch als Belegfeld1 gelesen.</p>
        <h3>IKEA mit 19% und 7% zusammen?</h3>
        <p>Ja, IKEA Möbel 19% und Food 7% gemischt. Wir splitten in BU 9 und BU 8 mit gleicher Belegnummer.</p>
      </div>
      <div className="mt-12 border-t pt-8 flex gap-3">
        <Link href="/blog" className="border px-4 py-2 rounded-full text-sm">← Alle Anleitungen</Link>
        <Link href="/" className="bg-black text-white px-4 py-2 rounded-full text-sm">Zum Converter</Link>
      </div>
    </div>
  )
}
