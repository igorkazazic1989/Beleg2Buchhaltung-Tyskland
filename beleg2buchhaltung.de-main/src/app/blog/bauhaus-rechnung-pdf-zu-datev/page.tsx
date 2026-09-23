import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = {
  title: "BAUHAUS Rechnung PDF zu DATEV | Automatisch umwandeln",
  description: "BAUHAUS Rechnung PDF zu DATEV-CSV: KI liest BAUHAUS Belege aus PDF, JPG, PNG. Automatisch Belegdatum, Brutto, BH-Nummer, 19% MwSt für SKR03 3400.",
  keywords: ["bauhaus-rechnung-pdf-zu-datev", "DATEV", "Baumarkt", "SKR03 3400", "19% MwSt", "DATEV Unternehmen Online"],
  alternates: { canonical: "https://beleg2buchhaltung.de/blog/bauhaus-rechnung-pdf-zu-datev" },
  openGraph: { title: "BAUHAUS Rechnung PDF zu DATEV | Automatisch umwandeln", description: "BAUHAUS Rechnung PDF zu DATEV-CSV: KI liest BAUHAUS Belege aus PDF, JPG, PNG. Automatisch Belegdatum, Brutto, BH-Nummer, 19% MwSt für SKR03 3400.", url: "https://beleg2buchhaltung.de/blog/bauhaus-rechnung-pdf-zu-datev", siteName: "beleg2buchhaltung.de", locale: "de_DE", type: "article" },
}
export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Funktioniert das auch mit Handy-Foto von BAUHAUS Bon?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. JPG, PNG bis 10MB. Auch schiefe Fotos mit Schatten werden gelesen. Unsere Vision-KI ist auf Handy-Fotos von BAUHAUS trainiert." } },
      { "@type": "Question", "name": "Liest ihr auch gescannte BAUHAUS PDFs ohne Text?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. BAUHAUS Online-PDFs sind oft nur Bilder. Wir nutzen Vision-OCR, kein normales PDF-Parsing. Auch gescannte PDFs werden korrekt gelesen." } },
      { "@type": "Question", "name": "Was passiert mit meinem BAUHAUS PDF nach Upload?", "acceptedAnswer": { "@type": "Answer", "text": "DSGVO-konform verarbeitet in Deutschland. Nach dem Download wird die Datei gelöscht. Keine Speicherung, kein Training mit deinen Daten." } }
    ]
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="text-xs text-zinc-500 mb-4"><Link href="/" className="hover:underline">beleg2buchhaltung.de</Link> / <Link href="/blog" className="hover:underline">Blog</Link> / bauhaus-rechnung-pdf-zu-datev</div>
      <h1 className="text-4xl font-bold tracking-tight">BAUHAUS Rechnung PDF zu DATEV</h1>
      <p className="mt-4 text-zinc-600 text-lg">Du hast BAUHAUS Rechnungen als PDF, Foto oder Screenshot? Lade sie hoch – wir machen daraus eine DATEV-konforme CSV, die du direkt importieren kannst. Kein OCR-Tool, keine Vorlage nötig.</p>
      <div className="mt-8 border-2 border-dashed rounded-2xl p-8 bg-zinc-50 text-center">
        <p className="font-semibold">Teste direkt: PDF hier ablegen</p>
        <p className="text-sm text-zinc-500">PDF, JPG, PNG bis 10MB • DSGVO-konform verarbeitet in Deutschland</p>
        <div className="mt-4 flex gap-2 justify-center">
          <Link href="/" className="bg-black text-white px-5 py-2 rounded-full text-sm">Zum DATEV-CSV Converter →</Link>
        </div>
      </div>
      <div className="mt-12 prose prose-zinc">

        <h2>BAUHAUS PDF Besonderheit: Eingescannt oder Foto</h2>
        <p>BAUHAUS PDFs aus dem Online-Konto sind oft gescannte Bilder, nicht echter Text. Normale PDF-Parser lesen nichts. Unsere KI nutzt Vision-OCR und liest auch schiefe Fotos mit Schatten. Wir erkennen BH-Nummer selbst wenn sie halb abgeschnitten ist.</p>
        <p>BAUHAUS druckt Brutto als <strong>127,45 €</strong> mit Euro-Zeichen und Leerzeichen. DATEV will <strong>127,45</strong> ohne Euro und ohne Leerzeichen. Wir bereinigen das automatisch. Auch das Datum 28.08.2025 wird zu 28082025.</p>


        <h2>PDF zu DATEV: So funktioniert es</h2>
        <p>Du lädst PDF, JPG oder PNG bis 10MB hoch. Unsere KI erkennt Lieferant BAUHAUS an Logo und Text, liest Belegdatum, Brutto, BH-Nummer und Steuersatz. Ergebnis: EXTF 700 CSV mit Konto 3400, BU 9, Gegenkonto 1600, Belegfeld1 BH-Nummer. DSGVO-konform verarbeitet in Deutschland, keine Speicherung nach Download.</p>

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
        <h3>Funktioniert das auch mit Handy-Foto von BAUHAUS Bon?</h3>
        <p>Ja. JPG, PNG bis 10MB. Auch schiefe Fotos mit Schatten werden gelesen. Unsere Vision-KI ist auf Handy-Fotos von BAUHAUS trainiert.</p>
        <h3>Liest ihr auch gescannte BAUHAUS PDFs ohne Text?</h3>
        <p>Ja. BAUHAUS Online-PDFs sind oft nur Bilder. Wir nutzen Vision-OCR, kein normales PDF-Parsing. Auch gescannte PDFs werden korrekt gelesen.</p>
        <h3>Was passiert mit meinem BAUHAUS PDF nach Upload?</h3>
        <p>DSGVO-konform verarbeitet in Deutschland. Nach dem Download wird die Datei gelöscht. Keine Speicherung, kein Training mit deinen Daten.</p>
      </div>
      <div className="mt-12 border-t pt-8 flex gap-3">
        <Link href="/blog" className="border px-4 py-2 rounded-full text-sm">← Alle Anleitungen</Link>
        <Link href="/" className="bg-black text-white px-4 py-2 rounded-full text-sm">Zum Converter</Link>
      </div>
    </div>
  )
}
