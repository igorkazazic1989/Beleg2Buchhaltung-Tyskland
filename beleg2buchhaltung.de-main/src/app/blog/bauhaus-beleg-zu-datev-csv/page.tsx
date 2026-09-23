import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = {
  title: "BAUHAUS Beleg zu DATEV-CSV | Automatisch umwandeln in 5 Sekunden",
  description: "BAUHAUS Beleg in DATEV-CSV umwandeln: KI liest Belegdatum, Brutto, 19% MwSt, BH-Nummer und erstellt EXTF 700 für SKR03 3400. Für Handwerker.",
  keywords: ["bauhaus-beleg-zu-datev-csv", "DATEV", "Baumarkt", "SKR03 3400", "19% MwSt", "DATEV Unternehmen Online"],
  alternates: { canonical: "https://beleg2buchhaltung.de/blog/bauhaus-beleg-zu-datev-csv" },
  openGraph: { title: "BAUHAUS Beleg zu DATEV-CSV | Automatisch umwandeln in 5 Sekunden", description: "BAUHAUS Beleg in DATEV-CSV umwandeln: KI liest Belegdatum, Brutto, 19% MwSt, BH-Nummer und erstellt EXTF 700 für SKR03 3400. Für Handwerker.", url: "https://beleg2buchhaltung.de/blog/bauhaus-beleg-zu-datev-csv", siteName: "beleg2buchhaltung.de", locale: "de_DE", type: "article" },
}
export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Wie wandle ich BAUHAUS Beleg zu DATEV-CSV um?", "acceptedAnswer": { "@type": "Answer", "text": "PDF oder Foto bei beleg2buchhaltung.de hochladen, KI liest Belegdatum, Brutto, BH-Nummer und MwSt aus und erstellt DATEV-CSV. Download und in Unternehmen Online importieren. Fertig in 5 Sekunden." } },
      { "@type": "Question", "name": "Was bedeutet BH-Nummer bei BAUHAUS?", "acceptedAnswer": { "@type": "Answer", "text": "BH steht für BAUHAUS. Die Nummer wie BH-992341 ist die eindeutige Rechnungsnummer unten rechts auf dem Bon. DATEV braucht sie als Belegfeld1 für die GoBD-Verknüpfung." } },
      { "@type": "Question", "name": "Kann ich BAUHAUS mit 19% und 7% zusammen importieren?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Unsere KI erkennt beide Steuersätze auf einem Bon und erzeugt zwei CSV-Zeilen mit BU 9 und BU 8, gleiche Belegnummer. DATEV bucht sie automatisch korrekt." } }
    ]
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="text-xs text-zinc-500 mb-4"><Link href="/" className="hover:underline">beleg2buchhaltung.de</Link> / <Link href="/blog" className="hover:underline">Blog</Link> / bauhaus-beleg-zu-datev-csv</div>
      <h1 className="text-4xl font-bold tracking-tight">BAUHAUS Beleg zu DATEV-CSV</h1>
      <p className="mt-4 text-zinc-600 text-lg">Aus einem BAUHAUS Kassenbon eine DATEV-CSV zu machen dauert manuell 3-4 Minuten. beleg2buchhaltung.de macht es in 5 Sekunden – mit korrektem EXTF 700 Format für SKR03 3400.</p>
      <div className="mt-8 border-2 border-dashed rounded-2xl p-8 bg-zinc-50 text-center">
        <p className="font-semibold">Teste direkt: PDF hier ablegen</p>
        <p className="text-sm text-zinc-500">PDF, JPG, PNG bis 10MB • DSGVO-konform verarbeitet in Deutschland</p>
        <div className="mt-4 flex gap-2 justify-center">
          <Link href="/" className="bg-black text-white px-5 py-2 rounded-full text-sm">Zum DATEV-CSV Converter →</Link>
        </div>
      </div>
      <div className="mt-12 prose prose-zinc">

        <h2>BAUHAUS Spezialität: BH-xxx + gemischte Steuersätze</h2>
        <p>BAUHAUS Bons sind anders als OBI oder Hornbach: Die Belegnummer beginnt immer mit <strong>BH-</strong> und steht sehr klein unter dem Barcode. OBI schreibt OB-, Hornbach schreibt HB-. Unsere KI unterscheidet das und schreibt den korrekten Lieferanten ins Belegtext-Feld.</p>
        <p>BAUHAUS hat als einziger Baumarkt oft <strong>19% und 7% auf dem gleichen Bon</strong>: Hammer und Schrauben mit 19%, Erde und Pflanzen mit 7%. Wenn du das falsch mit nur BU 9 buchst, stimmt die Vorsteuer nicht. beleg2buchhaltung.de erkennt das und splittet automatisch.</p>
        <p>Zusätzlich druckt BAUHAUS das Datum als <code>28.08.2025</code> mit Punkten – DATEV will <code>28082025</code> ohne Punkte. Wir wandeln das um.</p>


        <h2>Kontierung für BAUHAUS: SKR03 3400 richtig nutzen</h2>
        <p>Handwerker buchen BAUHAUS nicht auf 4000 Rohstoffe, sondern auf <strong>3400 Bau- und Rohstoffe</strong>. Das ist wichtig für die BWA und für die Baustellenabrechnung. Gegenkonto ist 1600 bei Barzahlung, 1200 bei EC-Karte. BU 9 für 19%, BU 8 für 7%. Belegfeld1 = BH-Nummer.</p>

        <h2>DATEV-CSV Format (EXTF 700)</h2>
        <p>Das Format für DATEV Unternehmen Online ist standardisiert. beleg2buchhaltung.de erzeugt eine EXTF-Datei mit 21 Feldern, die du 1:1 im Belegtransfer hochladen kannst.</p>
        <pre className="text-xs bg-black text-green-400 p-4 rounded-xl overflow-auto">EXTF;700;21;Belegfeld1;Belegdatum;Konto;Gegenkonto;BU;Brutto;Belegtext\n;BH-992341;28082025;3400;1600;9;127,45;BAUHAUS</pre>
        <p className="text-xs text-zinc-500 mt-2">Belegfeld1 = Rechnungsnummer, Belegdatum im Format DDMMYYYY, Konto 3400, Gegenkonto 1600, BU 9 für 19% Vorsteuer. Bei gemischten Steuersätzen erzeugen wir zwei Zeilen mit BU 9 und BU 8.</p>
        <h2>Häufige Fehler die wir automatisch korrigieren</h2>
        <ul>
          <li><strong>Datum mit Punkten:</strong> Auf dem Bon steht 28.08.2025 – DATEV braucht 28082025. Wir wandeln um.</li>
          <li><strong>Brutto mit Leerzeichen:</strong> 127,45 € wird zu 127,45 für DATEV.</li>
          <li><strong>Falsches Konto:</strong> Viele buchen Baumarkt auf 4000. Korrekt für Handwerker ist 3400 Bau- und Rohstoffe, damit die BWA stimmt.</li>
          <li><strong>Belegnummer vergessen:</strong> Ohne Belegfeld1 meckert DATEV. Wir lesen BH-/OB-/HB-Nummern automatisch aus.</li>
        </ul>
        <h2>FAQ</h2>
        <h3>Wie wandle ich BAUHAUS Beleg zu DATEV-CSV um?</h3>
        <p>PDF oder Foto bei beleg2buchhaltung.de hochladen, KI liest Belegdatum, Brutto, BH-Nummer und MwSt aus und erstellt DATEV-CSV. Download und in Unternehmen Online importieren. Fertig in 5 Sekunden.</p>
        <h3>Was bedeutet BH-Nummer bei BAUHAUS?</h3>
        <p>BH steht für BAUHAUS. Die Nummer wie BH-992341 ist die eindeutige Rechnungsnummer unten rechts auf dem Bon. DATEV braucht sie als Belegfeld1 für die GoBD-Verknüpfung.</p>
        <h3>Kann ich BAUHAUS mit 19% und 7% zusammen importieren?</h3>
        <p>Ja. Unsere KI erkennt beide Steuersätze auf einem Bon und erzeugt zwei CSV-Zeilen mit BU 9 und BU 8, gleiche Belegnummer. DATEV bucht sie automatisch korrekt.</p>
      </div>
      <div className="mt-12 border-t pt-8 flex gap-3">
        <Link href="/blog" className="border px-4 py-2 rounded-full text-sm">← Alle Anleitungen</Link>
        <Link href="/" className="bg-black text-white px-4 py-2 rounded-full text-sm">Zum Converter</Link>
      </div>
    </div>
  )
}
