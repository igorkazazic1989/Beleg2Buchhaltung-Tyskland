import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = {
  title: "Toom Beleg DATEV-CSV Handwerker | Toom in DATEV importieren",
  description: "Toom Beleg DATEV-CSV für Handwerker: Toom PDF zu DATEV-CSV, SKR03 3400, BU 9. Automatisch Belegdatum, Brutto, Toom Belegnummer.",
  keywords: ["toom-beleg-datev-csv-handwerker", "DATEV", "Baumarkt", "SKR03 3400", "19% MwSt", "DATEV Unternehmen Online"],
  alternates: { canonical: "https://beleg2buchhaltung.de/blog/toom-beleg-datev-csv-handwerker" },
  openGraph: { title: "Toom Beleg DATEV-CSV Handwerker | Toom in DATEV importieren", description: "Toom Beleg DATEV-CSV für Handwerker: Toom PDF zu DATEV-CSV, SKR03 3400, BU 9. Automatisch Belegdatum, Brutto, Toom Belegnummer.", url: "https://beleg2buchhaltung.de/blog/toom-beleg-datev-csv-handwerker", siteName: "beleg2buchhaltung.de", locale: "de_DE", type: "article" },
}
export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Wie importiere ich Toom Beleg in DATEV?", "acceptedAnswer": { "@type": "Answer", "text": "PDF oder Foto bei beleg2buchhaltung.de hochladen, CSV herunterladen, in Unternehmen Online Belegtransfer importieren. Konto 3400, BU 9/8, Belegfeld1 schon gesetzt." } },
      { "@type": "Question", "name": "Welche Belegnummer hat Toom?", "acceptedAnswer": { "@type": "Answer", "text": "Meist 1234/5678 mit Schrägstrich oder Beleg-Nr. 1234567 ohne Prefix. Unsere KI liest beide als Belegfeld1." } },
      { "@type": "Question", "name": "Toom mit 19% und 7% gemischt?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, wie BAUHAUS oft 19% Werkzeug und 7% Garten gemischt. Wir erzeugen zwei Zeilen BU 9 und BU 8 mit gleicher Belegnummer." } }
    ]
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="text-xs text-zinc-500 mb-4"><Link href="/" className="hover:underline">beleg2buchhaltung.de</Link> / <Link href="/blog" className="hover:underline">Blog</Link> / toom-beleg-datev-csv-handwerker</div>
      <h1 className="text-4xl font-bold tracking-tight">Toom Beleg DATEV-CSV Handwerker</h1>
      <p className="mt-4 text-zinc-600 text-lg">Toom Belege als Handwerker in DATEV zu importieren ist mühsam – Toom druckt ohne OB/BH Prefix. beleg2buchhaltung.de erkennt Toom automatisch und macht DATEV-CSV in 5 Sekunden.</p>
      <div className="mt-8 border-2 border-dashed rounded-2xl p-8 bg-zinc-50 text-center">
        <p className="font-semibold">Teste direkt: PDF hier ablegen</p>
        <p className="text-sm text-zinc-500">PDF, JPG, PNG bis 10MB • DSGVO-konform verarbeitet in Deutschland</p>
        <div className="mt-4 flex gap-2 justify-center">
          <Link href="/" className="bg-black text-white px-5 py-2 rounded-full text-sm">Zum DATEV-CSV Converter →</Link>
        </div>
      </div>
      <div className="mt-12 prose prose-zinc">

        <h2>Toom Spezialität: Ohne Prefix, mit Schrägstrich</h2>
        <p>Toom druckt anders als OBI oder BAUHAUS: Keine OB- oder BH-Nummer, sondern <strong>1234/5678</strong> oder <strong>Beleg-Nr. 1234567</strong> mittig oder unten. Oben steht <strong>toom Baumarkt</strong> oder <strong>toom BauMarkt GmbH</strong> mit Filiale. Datum als <code>28.08.2025</code>.</p>
        <p>Toom Besonderheit: Toom hat oft <strong>19% und 7% gemischt</strong> wie BAUHAUS: Werkzeug 19% und Garten/Pflanzen 7% auf einem Bon. Unsere KI splittet automatisch in BU 9 und BU 8 mit gleicher Belegnummer. Brutto steht als <code>89,90 €</code> mit Euro – wir wandeln zu <code>89,90</code>.</p>
        <p>Toom Kassenbons sind kurz, A4 Firmenrechnungen haben 1 Seite mit toom Logo und Rechnungsbetrag unten.</p>


        <h2>Kontierung Toom für Handwerker: 3400 + BU 9/8</h2>
        <p>Für Handwerker: Konto <strong>3400 Bau- und Rohstoffe</strong>, BU 9 für 19%, BU 8 für 7% bei Garten, Gegenkonto 1600 Kasse bei Bar, 1200 Bank bei EC, Belegfeld1 = Toom Belegnummer 1234/5678 oder 1234567. Bei Mischbelegen zwei Zeilen mit gleicher Nummer, DATEV fasst zusammen.</p>

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
        <h3>Wie importiere ich Toom Beleg in DATEV?</h3>
        <p>PDF oder Foto bei beleg2buchhaltung.de hochladen, CSV herunterladen, in Unternehmen Online Belegtransfer importieren. Konto 3400, BU 9/8, Belegfeld1 schon gesetzt.</p>
        <h3>Welche Belegnummer hat Toom?</h3>
        <p>Meist 1234/5678 mit Schrägstrich oder Beleg-Nr. 1234567 ohne Prefix. Unsere KI liest beide als Belegfeld1.</p>
        <h3>Toom mit 19% und 7% gemischt?</h3>
        <p>Ja, wie BAUHAUS oft 19% Werkzeug und 7% Garten gemischt. Wir erzeugen zwei Zeilen BU 9 und BU 8 mit gleicher Belegnummer.</p>
      </div>
      <div className="mt-12 border-t pt-8 flex gap-3">
        <Link href="/blog" className="border px-4 py-2 rounded-full text-sm">← Alle Anleitungen</Link>
        <Link href="/" className="bg-black text-white px-4 py-2 rounded-full text-sm">Zum Converter</Link>
      </div>
    </div>
  )
}
