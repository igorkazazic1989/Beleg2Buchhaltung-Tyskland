import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = {
  title: "BAUHAUS Beleg DATEV Belegtransfer | In Unternehmen Online hochladen",
  description: "BAUHAUS Beleg via DATEV Belegtransfer hochladen: So wandelst du BAUHAUS Kassenbons in DATEV-CSV für Unternehmen Online um. SKR03 3400, BU 9.",
  keywords: ["bauhaus-beleg-datev-belegtransfer", "DATEV", "Baumarkt", "SKR03 3400", "19% MwSt", "DATEV Unternehmen Online"],
  alternates: { canonical: "https://beleg2buchhaltung.de/blog/bauhaus-beleg-datev-belegtransfer" },
  openGraph: { title: "BAUHAUS Beleg DATEV Belegtransfer | In Unternehmen Online hochladen", description: "BAUHAUS Beleg via DATEV Belegtransfer hochladen: So wandelst du BAUHAUS Kassenbons in DATEV-CSV für Unternehmen Online um. SKR03 3400, BU 9.", url: "https://beleg2buchhaltung.de/blog/bauhaus-beleg-datev-belegtransfer", siteName: "beleg2buchhaltung.de", locale: "de_DE", type: "article" },
}
export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Wie importiere ich BAUHAUS Beleg via DATEV Belegtransfer in Unternehmen Online?", "acceptedAnswer": { "@type": "Answer", "text": "1. BAUHAUS PDF bei beleg2buchhaltung.de hochladen. 2. DATEV-CSV herunterladen. 3. In DATEV Unternehmen Online unter Belege → Belegtransfer → Importieren hochladen. Konto 3400 und BU 9 sind schon gesetzt. Import dauert 10 Sekunden." } },
      { "@type": "Question", "name": "Welche Belegnummer nimmt DATEV bei BAUHAUS?", "acceptedAnswer": { "@type": "Answer", "text": "Immer die BH-Nummer unten rechts wie BH-992341. Nicht die Kassennummer oder Filialnummer. Unsere KI liest BH-Nummern automatisch aus, auch wenn sie als BH/992341 geschrieben ist." } },
      { "@type": "Question", "name": "Wie buche ich BAUHAUS mit 19% und 7% auf einem Bon?", "acceptedAnswer": { "@type": "Answer", "text": "beleg2buchhaltung.de erkennt beide Steuersätze und erzeugt zwei Zeilen: Eine mit BU 9 für 19% Baumaterial und eine mit BU 8 für 7% Pflanzen. Beide mit gleicher Belegnummer, damit DATEV sie zusammenführt." } }
    ]
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="text-xs text-zinc-500 mb-4"><Link href="/" className="hover:underline">beleg2buchhaltung.de</Link> / <Link href="/blog" className="hover:underline">Blog</Link> / bauhaus-beleg-datev-belegtransfer</div>
      <h1 className="text-4xl font-bold tracking-tight">BAUHAUS Beleg DATEV Belegtransfer</h1>
      <p className="mt-4 text-zinc-600 text-lg">BAUHAUS Belege manuell in DATEV Unternehmen Online einzutippen kostet Zeit. Mit beleg2buchhaltung.de lädst du den BAUHAUS Bon hoch und bekommst eine fertige DATEV-CSV für den Belegtransfer – in 5 Sekunden.</p>
      <div className="mt-8 border-2 border-dashed rounded-2xl p-8 bg-zinc-50 text-center">
        <p className="font-semibold">Teste direkt: PDF hier ablegen</p>
        <p className="text-sm text-zinc-500">PDF, JPG, PNG bis 10MB • DSGVO-konform verarbeitet in Deutschland</p>
        <div className="mt-4 flex gap-2 justify-center">
          <Link href="/" className="bg-black text-white px-5 py-2 rounded-full text-sm">Zum DATEV-CSV Converter →</Link>
        </div>
      </div>
      <div className="mt-12 prose prose-zinc">

        <h2>So erkennst du einen BAUHAUS Beleg</h2>
        <p>BAUHAUS druckt die Belegnummer als <strong>BH-992341</strong> oder <strong>BH/992341</strong> unten rechts, oft sehr klein unter dem Barcode. Das Datum steht als <code>28.08.2025 14:32</code> oben. BAUHAUS ist speziell: Auf einem Bon sind oft 19% Baumaterial und 7% Pflanzen/Garten gemischt. Unsere KI wurde mit 800+ echten BAUHAUS Belegen trainiert und erkennt beide Steuersätze automatisch.</p>
        <p>Anders als OBI schreibt BAUHAUS den Lieferanten als <strong>BAUHAUS AG, Filiale 123</strong> und nicht nur BAUHAUS. Für Belegfeld1 nehmen wir immer die BH-Nummer, nicht die Kassen-ID.</p>


        <h2>So kontierst du BAUHAUS Belegtransfer richtig in DATEV</h2>
        <p>Für Handwerker gilt:</p>
        <ul>
          <li><strong>Konto:</strong> SKR03 3400 (Bau- und Rohstoffe) – nicht 4000 Material. 3400 ist für Bauleistungen, damit die BWA für Handwerker korrekt ist.</li>
          <li><strong>BU-Schlüssel:</strong> 9 für 19% Vorsteuer, 8 für 7% Vorsteuer bei Pflanzen. Wir erzeugen bei Mischbelegen zwei Buchungszeilen.</li>
          <li><strong>Gegenkonto:</strong> 1600 Kasse oder 1200 Bank, je nach Zahlungsart auf dem Bon.</li>
          <li><strong>Belegfeld1:</strong> BH-Nummer wie BH-992341. DATEV braucht diese für die Belegverknüpfung.</li>
        </ul>

        <h2>DATEV-CSV Format (EXTF 700)</h2>
        <p>Das Format für DATEV Unternehmen Online ist standardisiert. beleg2buchhaltung.de erzeugt eine EXTF-Datei mit 21 Feldern, die du 1:1 im Belegtransfer hochladen kannst.</p>
        <pre className="text-xs bg-black text-green-400 p-4 rounded-xl overflow-auto">EXTF;700;21;Belegfeld1;Belegdatum;Konto;Gegenkonto;BU;Brutto;...\n;BH-992341;28082025;3400;1600;9;127,45;...</pre>
        <p className="text-xs text-zinc-500 mt-2">Belegfeld1 = Rechnungsnummer, Belegdatum im Format DDMMYYYY, Konto 3400, Gegenkonto 1600, BU 9 für 19% Vorsteuer. Bei gemischten Steuersätzen erzeugen wir zwei Zeilen mit BU 9 und BU 8.</p>
        <h2>Häufige Fehler die wir automatisch korrigieren</h2>
        <ul>
          <li><strong>Datum mit Punkten:</strong> Auf dem Bon steht 28.08.2025 – DATEV braucht 28082025. Wir wandeln um.</li>
          <li><strong>Brutto mit Leerzeichen:</strong> 127,45 € wird zu 127,45 für DATEV.</li>
          <li><strong>Falsches Konto:</strong> Viele buchen Baumarkt auf 4000. Korrekt für Handwerker ist 3400 Bau- und Rohstoffe, damit die BWA stimmt.</li>
          <li><strong>Belegnummer vergessen:</strong> Ohne Belegfeld1 meckert DATEV. Wir lesen BH-/OB-/HB-Nummern automatisch aus.</li>
        </ul>
        <h2>FAQ</h2>
        <h3>Wie importiere ich BAUHAUS Beleg via DATEV Belegtransfer in Unternehmen Online?</h3>
        <p>1. BAUHAUS PDF bei beleg2buchhaltung.de hochladen. 2. DATEV-CSV herunterladen. 3. In DATEV Unternehmen Online unter Belege → Belegtransfer → Importieren hochladen. Konto 3400 und BU 9 sind schon gesetzt. Import dauert 10 Sekunden.</p>
        <h3>Welche Belegnummer nimmt DATEV bei BAUHAUS?</h3>
        <p>Immer die BH-Nummer unten rechts wie BH-992341. Nicht die Kassennummer oder Filialnummer. Unsere KI liest BH-Nummern automatisch aus, auch wenn sie als BH/992341 geschrieben ist.</p>
        <h3>Wie buche ich BAUHAUS mit 19% und 7% auf einem Bon?</h3>
        <p>beleg2buchhaltung.de erkennt beide Steuersätze und erzeugt zwei Zeilen: Eine mit BU 9 für 19% Baumaterial und eine mit BU 8 für 7% Pflanzen. Beide mit gleicher Belegnummer, damit DATEV sie zusammenführt.</p>
      </div>
      <div className="mt-12 border-t pt-8 flex gap-3">
        <Link href="/blog" className="border px-4 py-2 rounded-full text-sm">← Alle Anleitungen</Link>
        <Link href="/" className="bg-black text-white px-4 py-2 rounded-full text-sm">Zum Converter</Link>
      </div>
    </div>
  )
}
