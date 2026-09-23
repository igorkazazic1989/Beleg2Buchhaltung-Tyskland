import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = {
  title: "Globus Baumarkt Rechnung DATEV importieren | Automatische CSV",
  description: "Globus Baumarkt Rechnung in DATEV importieren: PDF hochladen, KI liest Datum, Brutto, Belegnummer. DATEV-CSV für SKR03 3400, BU 9. Für Handwerker.",
  keywords: ["globus-baumarkt-rechnung-datev-importieren", "DATEV", "Baumarkt", "SKR03 3400", "19% MwSt", "DATEV Unternehmen Online"],
  alternates: { canonical: "https://beleg2buchhaltung.de/blog/globus-baumarkt-rechnung-datev-importieren" },
  openGraph: { title: "Globus Baumarkt Rechnung DATEV importieren | Automatische CSV", description: "Globus Baumarkt Rechnung in DATEV importieren: PDF hochladen, KI liest Datum, Brutto, Belegnummer. DATEV-CSV für SKR03 3400, BU 9. Für Handwerker.", url: "https://beleg2buchhaltung.de/blog/globus-baumarkt-rechnung-datev-importieren", siteName: "beleg2buchhaltung.de", locale: "de_DE", type: "article" },
}
export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Wie importiere ich Globus Baumarkt Rechnung in DATEV?", "acceptedAnswer": { "@type": "Answer", "text": "PDF oder Foto bei beleg2buchhaltung.de hochladen, CSV herunterladen, in DATEV Unternehmen Online unter Belege → Belegtransfer importieren. Konto 3400, BU 9 schon gesetzt." } },
      { "@type": "Question", "name": "Welche Belegnummer hat Globus Baumarkt?", "acceptedAnswer": { "@type": "Answer", "text": "Meist 12345/6789 oder GB-123456 unten auf dem Bon. Unsere KI liest beide Varianten als Belegfeld1 aus." } },
      { "@type": "Question", "name": "Globus mit 19% und 7% auf einem Bon?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, Baumaterial 19% und Garten 7% gemischt. Wir erzeugen zwei Zeilen BU 9 und BU 8 mit gleicher Belegnummer, DATEV bucht korrekt." } }
    ]
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="text-xs text-zinc-500 mb-4"><Link href="/" className="hover:underline">beleg2buchhaltung.de</Link> / <Link href="/blog" className="hover:underline">Blog</Link> / globus-baumarkt-rechnung-datev-importieren</div>
      <h1 className="text-4xl font-bold tracking-tight">Globus Baumarkt Rechnung DATEV importieren</h1>
      <p className="mt-4 text-zinc-600 text-lg">Globus Baumarkt Belege in DATEV zu importieren dauert manuell 3 Minuten. Mit beleg2buchhaltung.de geht es in 5 Sekunden – egal ob Kassenbon oder A4 Rechnung von Globus.</p>
      <div className="mt-8 border-2 border-dashed rounded-2xl p-8 bg-zinc-50 text-center">
        <p className="font-semibold">Teste direkt: PDF hier ablegen</p>
        <p className="text-sm text-zinc-500">PDF, JPG, PNG bis 10MB • DSGVO-konform verarbeitet in Deutschland</p>
        <div className="mt-4 flex gap-2 justify-center">
          <Link href="/" className="bg-black text-white px-5 py-2 rounded-full text-sm">Zum DATEV-CSV Converter →</Link>
        </div>
      </div>
      <div className="mt-12 prose prose-zinc">

        <h2>Globus Baumarkt Spezialität</h2>
        <p>Globus Baumarkt druckt oben <strong>Globus Baumarkt</strong> mit Filialnummer, unten eine Belegnummer als <strong>12345/6789</strong> oder <strong>GB-123456</strong> – anders als OBI OB- oder BAUHAUS BH-. Das Datum steht als <code>28.08.2025 15:21</code>. Globus hat oft 19% Baumaterial und 7% Garten auf einem Bon, ähnlich BAUHAUS.</p>
        <p>Unsere KI erkennt Globus am Logo und Text und liest die spezielle Belegnummer als Belegfeld1. Auch wenn Globus mal GB- und mal nur Zahlen druckt, finden wir sie. Brutto wird als <code>89,90 €</code> gedruckt – wir wandeln zu <code>89,90</code> für DATEV.</p>


        <h2>SKR03 Kontierung für Globus Baumarkt</h2>
        <p>Für Handwerker: Konto <strong>3400 Bau- und Rohstoffe</strong>, BU 9 für 19%, BU 8 für 7% bei Pflanzen, Gegenkonto 1600 Kasse bei Bar, 1200 Bank bei EC. Belegfeld1 = Globus Belegnummer 12345/6789 oder GB-Nummer. So importiert DATEV ohne Fehler. Kein manuelles Suchen nach Konten.</p>

        <h2>DATEV-CSV Format (EXTF 700)</h2>
        <p>Das Format für DATEV Unternehmen Online ist standardisiert. beleg2buchhaltung.de erzeugt eine EXTF-Datei mit 21 Feldern, die du 1:1 im Belegtransfer hochladen kannst.</p>
        <pre className="text-xs bg-black text-green-400 p-4 rounded-xl overflow-auto">EXTF;700;21;Belegfeld1;Belegdatum;Konto;Gegenkonto;BU;Brutto;Belegtext\n;GB-123456;28082025;3400;1600;9;89,90;Globus Baumarkt</pre>
        <p className="text-xs text-zinc-500 mt-2">Belegfeld1 = Rechnungsnummer, Belegdatum im Format DDMMYYYY, Konto 3400, Gegenkonto 1600, BU 9 für 19% Vorsteuer. Bei gemischten Steuersätzen erzeugen wir zwei Zeilen mit BU 9 und BU 8.</p>
        <h2>Häufige Fehler die wir automatisch korrigieren</h2>
        <ul>
          <li><strong>Datum mit Punkten:</strong> Auf dem Bon steht 28.08.2025 – DATEV braucht 28082025. Wir wandeln um.</li>
          <li><strong>Brutto mit Leerzeichen:</strong> 127,45 € wird zu 127,45 für DATEV.</li>
          <li><strong>Falsches Konto:</strong> Viele buchen Baumarkt auf 4000. Korrekt für Handwerker ist 3400 Bau- und Rohstoffe, damit die BWA stimmt.</li>
          <li><strong>Belegnummer vergessen:</strong> Ohne Belegfeld1 meckert DATEV. Wir lesen BH-/OB-/HB-Nummern automatisch aus.</li>
        </ul>
        <h2>FAQ</h2>
        <h3>Wie importiere ich Globus Baumarkt Rechnung in DATEV?</h3>
        <p>PDF oder Foto bei beleg2buchhaltung.de hochladen, CSV herunterladen, in DATEV Unternehmen Online unter Belege → Belegtransfer importieren. Konto 3400, BU 9 schon gesetzt.</p>
        <h3>Welche Belegnummer hat Globus Baumarkt?</h3>
        <p>Meist 12345/6789 oder GB-123456 unten auf dem Bon. Unsere KI liest beide Varianten als Belegfeld1 aus.</p>
        <h3>Globus mit 19% und 7% auf einem Bon?</h3>
        <p>Ja, Baumaterial 19% und Garten 7% gemischt. Wir erzeugen zwei Zeilen BU 9 und BU 8 mit gleicher Belegnummer, DATEV bucht korrekt.</p>
      </div>
      <div className="mt-12 border-t pt-8 flex gap-3">
        <Link href="/blog" className="border px-4 py-2 rounded-full text-sm">← Alle Anleitungen</Link>
        <Link href="/" className="bg-black text-white px-4 py-2 rounded-full text-sm">Zum Converter</Link>
      </div>
    </div>
  )
}
