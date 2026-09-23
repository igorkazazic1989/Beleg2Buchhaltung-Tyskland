import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = {
  title: "Hornbach Rechnung 19% MwSt DATEV | Korrekt mit BU 9 buchen",
  description: "Hornbach Rechnung 19% MwSt in DATEV: So buchst du Hornbach mit 19% Vorsteuer korrekt mit BU 9, Konto 3400, HB-Nummer. DATEV-CSV automatisch.",
  keywords: ["hornbach-rechnung-19-mwst-datev", "DATEV", "Baumarkt", "SKR03 3400", "19% MwSt", "DATEV Unternehmen Online"],
  alternates: { canonical: "https://beleg2buchhaltung.de/blog/hornbach-rechnung-19-mwst-datev" },
  openGraph: { title: "Hornbach Rechnung 19% MwSt DATEV | Korrekt mit BU 9 buchen", description: "Hornbach Rechnung 19% MwSt in DATEV: So buchst du Hornbach mit 19% Vorsteuer korrekt mit BU 9, Konto 3400, HB-Nummer. DATEV-CSV automatisch.", url: "https://beleg2buchhaltung.de/blog/hornbach-rechnung-19-mwst-datev", siteName: "beleg2buchhaltung.de", locale: "de_DE", type: "article" },
}
export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Welcher BU bei Hornbach 19% MwSt?", "acceptedAnswer": { "@type": "Answer", "text": "BU 9 für 19% Vorsteuer. Pflicht, sonst keine Vorsteuer. Unsere KI setzt BU 9 automatisch bei Hornbach." } },
      { "@type": "Question", "name": "Wie buche ich Hornbach 19% in SKR03?", "acceptedAnswer": { "@type": "Answer", "text": "Konto 3400 Bau- und Rohstoffe, BU 9, Gegenkonto 1600/1200, Belegfeld1 HB-Nummer. So bucht DATEV mit Vorsteuer." } },
      { "@type": "Question", "name": "Hornbach Bon ohne MwSt ausgewiesen?", "acceptedAnswer": { "@type": "Answer", "text": "Manche Hornbach Kassenbons zeigen nur Brutto. Wir erkennen 19% aus Kontext (Baumaterial immer 19%) und setzen BU 9 automatisch." } }
    ]
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="text-xs text-zinc-500 mb-4"><Link href="/" className="hover:underline">beleg2buchhaltung.de</Link> / <Link href="/blog" className="hover:underline">Blog</Link> / hornbach-rechnung-19-mwst-datev</div>
      <h1 className="text-4xl font-bold tracking-tight">Hornbach Rechnung 19% MwSt DATEV</h1>
      <p className="mt-4 text-zinc-600 text-lg">Hornbach Rechnungen haben fast immer 19% MwSt – aber ohne BU 9 buchst du ohne Vorsteuer und verlierst 19%. Hier lernst du wie du Hornbach mit 19% korrekt in DATEV buchst und wie beleg2buchhaltung.de BU 9 automatisch setzt.</p>
      <div className="mt-8 border-2 border-dashed rounded-2xl p-8 bg-zinc-50 text-center">
        <p className="font-semibold">Teste direkt: PDF hier ablegen</p>
        <p className="text-sm text-zinc-500">PDF, JPG, PNG bis 10MB • DSGVO-konform verarbeitet in Deutschland</p>
        <div className="mt-4 flex gap-2 justify-center">
          <Link href="/" className="bg-black text-white px-5 py-2 rounded-full text-sm">Zum DATEV-CSV Converter →</Link>
        </div>
      </div>
      <div className="mt-12 prose prose-zinc">

        <h2>Hornbach 19% MwSt: Warum BU 9 Pflicht ist</h2>
        <p>Hornbach verkauft fast ausschließlich 19% Artikel: Werkzeug, Baumaterial, Schrauben, Holz. Auf dem Bon steht <strong>19% MwSt 20,36 €</strong> unten. Wenn du ohne BU-Schlüssel buchst, bucht DATEV brutto ohne Vorsteuerabzug – du verschenkst 19%.</p>
        <p>Hornbach druckt die 19% oft als <code>inkl. 19% MwSt</code> oder <code>19% USt</code>. Unsere KI erkennt das und setzt automatisch <strong>BU 9 für 19% Vorsteuer</strong>. Bei Firmenrechnung mit 2 Seiten steht die MwSt auf Seite 2 unten – wir lesen beide Seiten.</p>
        <p>Besonderheit: Hornbach rundet Brutto auf 2 Stellen wie 127,45 €. DATEV will 127,45 mit Komma. Wir wandeln korrekt um, ohne Leerzeichen und Euro.</p>


        <h2>SKR03 mit 19% MwSt: 3400 + BU 9</h2>
        <p>Für Handwerker: <strong>Konto 3400 Bau- und Rohstoffe, BU 9 für 19% Vorsteuer</strong>, Gegenkonto 1600 Kasse bei Bar, 1200 Bank bei EC, Belegfeld1 HB-Nummer. Mit BU 9 zieht DATEV automatisch 19% Vorsteuer. Ohne BU 9 keine Vorsteuer. Deshalb ist BU 9 Pflicht bei Hornbach.</p>

        <h2>DATEV-CSV Format (EXTF 700)</h2>
        <p>DATEV Unternehmen Online erwartet EXTF 700 mit 21 Feldern. beleg2buchhaltung.de erzeugt genau dieses Format, damit der Import ohne Anpassung funktioniert.</p>
        <pre className="text-xs bg-black text-green-400 p-4 rounded-xl overflow-auto">EXTF;700;21;Belegfeld1;Belegdatum;Konto;Gegenkonto;BU;Brutto;Belegtext\n;HB-112093;28082025;3400;1600;9;127,45;Hornbach 19% MwSt</pre>
        <p className="text-xs text-zinc-500 mt-2">Belegfeld1 = Rechnungsnummer, Belegdatum als DDMMYYYY, Konto 3400, Gegenkonto 1600/1200, BU 9 für 19% Vorsteuer. Bei Mischsteuersätzen zwei Zeilen BU 9 + BU 8.</p>
        <h2>Häufige Fehler die wir automatisch korrigieren</h2>
        <ul>
          <li><strong>Datum mit Punkten:</strong> 28.08.2025 auf dem Bon → 28082025 für DATEV.</li>
          <li><strong>Brutto mit Euro:</strong> 127,45 € → 127,45 ohne Leerzeichen und Euro.</li>
          <li><strong>Falsches Konto:</strong> Viele buchen Baumarkt auf 4000 statt 3400 für Handwerker.</li>
          <li><strong>Belegnummer fehlt:</strong> Ohne OB-/BH-/HB-Nummer lehnt Belegtransfer ab.</li>
        </ul>
        <h2>FAQ</h2>
        <h3>Welcher BU bei Hornbach 19% MwSt?</h3>
        <p>BU 9 für 19% Vorsteuer. Pflicht, sonst keine Vorsteuer. Unsere KI setzt BU 9 automatisch bei Hornbach.</p>
        <h3>Wie buche ich Hornbach 19% in SKR03?</h3>
        <p>Konto 3400 Bau- und Rohstoffe, BU 9, Gegenkonto 1600/1200, Belegfeld1 HB-Nummer. So bucht DATEV mit Vorsteuer.</p>
        <h3>Hornbach Bon ohne MwSt ausgewiesen?</h3>
        <p>Manche Hornbach Kassenbons zeigen nur Brutto. Wir erkennen 19% aus Kontext (Baumaterial immer 19%) und setzen BU 9 automatisch.</p>
      </div>
      <div className="mt-12 border-t pt-8 flex gap-3">
        <Link href="/blog" className="border px-4 py-2 rounded-full text-sm">← Alle Anleitungen</Link>
        <Link href="/" className="bg-black text-white px-4 py-2 rounded-full text-sm">Zum Converter</Link>
      </div>
    </div>
  )
}
