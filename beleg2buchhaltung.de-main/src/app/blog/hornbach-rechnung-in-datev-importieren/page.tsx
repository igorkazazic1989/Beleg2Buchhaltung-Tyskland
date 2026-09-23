import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = {
  title: "Hornbach Rechnung in DATEV importieren | Schritt für Schritt",
  description: "Hornbach Rechnung in DATEV importieren: Anleitung für Unternehmen Online. PDF hochladen, DATEV-CSV mit HB-Nummer, 3400, BU 9 erstellen und importieren.",
  keywords: ["hornbach-rechnung-in-datev-importieren", "DATEV", "Baumarkt", "SKR03 3400", "19% MwSt", "DATEV Unternehmen Online"],
  alternates: { canonical: "https://beleg2buchhaltung.de/blog/hornbach-rechnung-in-datev-importieren" },
  openGraph: { title: "Hornbach Rechnung in DATEV importieren | Schritt für Schritt", description: "Hornbach Rechnung in DATEV importieren: Anleitung für Unternehmen Online. PDF hochladen, DATEV-CSV mit HB-Nummer, 3400, BU 9 erstellen und importieren.", url: "https://beleg2buchhaltung.de/blog/hornbach-rechnung-in-datev-importieren", siteName: "beleg2buchhaltung.de", locale: "de_DE", type: "article" },
}
export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Wie importiere ich Hornbach Rechnung in DATEV?", "acceptedAnswer": { "@type": "Answer", "text": "PDF bei beleg2buchhaltung.de hochladen, CSV herunterladen, in Unternehmen Online unter Belege → Belegtransfer importieren. Konto 3400, BU 9 schon gesetzt." } },
      { "@type": "Question", "name": "Hornbach Firmenrechnung 2 Seiten – geht das?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Wir lesen Seite 1 und 2, Summe auf Seite 2, HB-Nummer oben. Auch Kassenbons 1 Seite funktionieren." } },
      { "@type": "Question", "name": "Welches Gegenkonto bei Hornbach?", "acceptedAnswer": { "@type": "Answer", "text": "Bar auf Bon → 1600 Kasse, EC/Überweisung → 1200 Bank. KI erkennt Zahlungsart automatisch." } }
    ]
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="text-xs text-zinc-500 mb-4"><Link href="/" className="hover:underline">beleg2buchhaltung.de</Link> / <Link href="/blog" className="hover:underline">Blog</Link> / hornbach-rechnung-in-datev-importieren</div>
      <h1 className="text-4xl font-bold tracking-tight">Hornbach Rechnung in DATEV importieren</h1>
      <p className="mt-4 text-zinc-600 text-lg">Hornbach Rechnung in DATEV Unternehmen Online zu importieren geht nicht direkt mit PDF – du brauchst CSV. beleg2buchhaltung.de macht aus Hornbach PDF die passende CSV in 5 Sekunden.</p>
      <div className="mt-8 border-2 border-dashed rounded-2xl p-8 bg-zinc-50 text-center">
        <p className="font-semibold">Teste direkt: PDF hier ablegen</p>
        <p className="text-sm text-zinc-500">PDF, JPG, PNG bis 10MB • DSGVO-konform verarbeitet in Deutschland</p>
        <div className="mt-4 flex gap-2 justify-center">
          <Link href="/" className="bg-black text-white px-5 py-2 rounded-full text-sm">Zum DATEV-CSV Converter →</Link>
        </div>
      </div>
      <div className="mt-12 prose prose-zinc">

        <h2>Hornbach Import: 2-seitige Firmenrechnung beachten</h2>
        <p>Hornbach Firmenkunden bekommen oft 2-seitige A4 Rechnungen: Seite 1 Artikel, Seite 2 Summe mit <strong>Rechnungsbetrag 127,45 € inkl. 19% MwSt</strong> und Zahlungsart Überweisung. Die Belegnummer steht als <strong>Rechnungs-Nr. HB-112093</strong> oben.</p>
        <p>Kassenbons von Hornbach sind 1 Seite, aber mit sehr langen Artikelnummern. Unsere KI liest beide Varianten: Bei 2 Seiten liest sie Seite 1 und 2 zusammen, bei Kassenbon nur die Summe unten. HB-Nummer wird immer als Belegfeld1 genommen, nicht Filialnummer.</p>
        <p>Zahlungsart: Bei Kassenbon steht Bar/EC, bei Firmenrechnung Überweisung – dann Gegenkonto 1200 Bank statt 1600 Kasse. Wir erkennen das automatisch.</p>


        <h2>Schritt für Schritt in Unternehmen Online importieren</h2>
        <p>1. Hornbach PDF bei beleg2buchhaltung.de hochladen. 2. DATEV-CSV herunterladen. 3. In Unternehmen Online: Belege → Belegtransfer → Import → CSV wählen. 4. Vorschau prüfen: Konto 3400, BU 9, Belegfeld1 HB-Nummer. 5. Importieren. Fertig – Beleg ist mit Original-PDF verknüpft.</p>

        <h2>DATEV-CSV Format (EXTF 700)</h2>
        <p>DATEV Unternehmen Online erwartet EXTF 700 mit 21 Feldern. beleg2buchhaltung.de erzeugt genau dieses Format, damit der Import ohne Anpassung funktioniert.</p>
        <pre className="text-xs bg-black text-green-400 p-4 rounded-xl overflow-auto">EXTF;700;21;Belegfeld1;Belegdatum;Konto;Gegenkonto;BU;Brutto\n;HB-112093;28082025;3400;1600;9;127,45</pre>
        <p className="text-xs text-zinc-500 mt-2">Belegfeld1 = Rechnungsnummer, Belegdatum als DDMMYYYY, Konto 3400, Gegenkonto 1600/1200, BU 9 für 19% Vorsteuer. Bei Mischsteuersätzen zwei Zeilen BU 9 + BU 8.</p>
        <h2>Häufige Fehler die wir automatisch korrigieren</h2>
        <ul>
          <li><strong>Datum mit Punkten:</strong> 28.08.2025 auf dem Bon → 28082025 für DATEV.</li>
          <li><strong>Brutto mit Euro:</strong> 127,45 € → 127,45 ohne Leerzeichen und Euro.</li>
          <li><strong>Falsches Konto:</strong> Viele buchen Baumarkt auf 4000 statt 3400 für Handwerker.</li>
          <li><strong>Belegnummer fehlt:</strong> Ohne OB-/BH-/HB-Nummer lehnt Belegtransfer ab.</li>
        </ul>
        <h2>FAQ</h2>
        <h3>Wie importiere ich Hornbach Rechnung in DATEV?</h3>
        <p>PDF bei beleg2buchhaltung.de hochladen, CSV herunterladen, in Unternehmen Online unter Belege → Belegtransfer importieren. Konto 3400, BU 9 schon gesetzt.</p>
        <h3>Hornbach Firmenrechnung 2 Seiten – geht das?</h3>
        <p>Ja. Wir lesen Seite 1 und 2, Summe auf Seite 2, HB-Nummer oben. Auch Kassenbons 1 Seite funktionieren.</p>
        <h3>Welches Gegenkonto bei Hornbach?</h3>
        <p>Bar auf Bon → 1600 Kasse, EC/Überweisung → 1200 Bank. KI erkennt Zahlungsart automatisch.</p>
      </div>
      <div className="mt-12 border-t pt-8 flex gap-3">
        <Link href="/blog" className="border px-4 py-2 rounded-full text-sm">← Alle Anleitungen</Link>
        <Link href="/" className="bg-black text-white px-4 py-2 rounded-full text-sm">Zum Converter</Link>
      </div>
    </div>
  )
}
