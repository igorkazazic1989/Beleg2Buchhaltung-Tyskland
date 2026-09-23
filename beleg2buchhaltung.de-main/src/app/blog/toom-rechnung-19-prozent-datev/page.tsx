import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = {
  title: "Toom Rechnung 19 Prozent DATEV | BU 9 korrekt buchen",
  description: "Toom Rechnung 19 Prozent in DATEV: So buchst du Toom mit 19% MwSt korrekt mit BU 9, Konto 3400, Belegfeld1. DATEV-CSV automatisch.",
  keywords: ["toom-rechnung-19-prozent-datev", "DATEV", "Baumarkt", "SKR03 3400", "19% MwSt", "DATEV Unternehmen Online"],
  alternates: { canonical: "https://beleg2buchhaltung.de/blog/toom-rechnung-19-prozent-datev" },
  openGraph: { title: "Toom Rechnung 19 Prozent DATEV | BU 9 korrekt buchen", description: "Toom Rechnung 19 Prozent in DATEV: So buchst du Toom mit 19% MwSt korrekt mit BU 9, Konto 3400, Belegfeld1. DATEV-CSV automatisch.", url: "https://beleg2buchhaltung.de/blog/toom-rechnung-19-prozent-datev", siteName: "beleg2buchhaltung.de", locale: "de_DE", type: "article" },
}
export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Welcher BU bei Toom 19 Prozent?", "acceptedAnswer": { "@type": "Answer", "text": "BU 9 für 19% Vorsteuer. Pflicht, sonst keine Vorsteuer. KI setzt BU 9 automatisch bei Toom." } },
      { "@type": "Question", "name": "Wie buche ich Toom 19% in SKR03?", "acceptedAnswer": { "@type": "Answer", "text": "Konto 3400 Bau- und Rohstoffe, BU 9, Gegenkonto 1600/1200, Belegfeld1 Toom Nummer. So mit Vorsteuer." } },
      { "@type": "Question", "name": "Toom Bon ohne MwSt ausgewiesen?", "acceptedAnswer": { "@type": "Answer", "text": "Manche Toom Bons zeigen nur Brutto. Wir erkennen 19% aus Kontext (Baumaterial immer 19%) und setzen BU 9." } }
    ]
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="text-xs text-zinc-500 mb-4"><Link href="/" className="hover:underline">beleg2buchhaltung.de</Link> / <Link href="/blog" className="hover:underline">Blog</Link> / toom-rechnung-19-prozent-datev</div>
      <h1 className="text-4xl font-bold tracking-tight">Toom Rechnung 19 Prozent DATEV</h1>
      <p className="mt-4 text-zinc-600 text-lg">Toom Rechnungen haben meist 19% MwSt – aber ohne BU 9 verlierst du Vorsteuer. Hier lernst du wie du Toom mit 19% korrekt buchst und wie beleg2buchhaltung.de BU 9 automatisch setzt.</p>
      <div className="mt-8 border-2 border-dashed rounded-2xl p-8 bg-zinc-50 text-center">
        <p className="font-semibold">Teste direkt: PDF hier ablegen</p>
        <p className="text-sm text-zinc-500">PDF, JPG, PNG bis 10MB • DSGVO-konform verarbeitet in Deutschland</p>
        <div className="mt-4 flex gap-2 justify-center">
          <Link href="/" className="bg-black text-white px-5 py-2 rounded-full text-sm">Zum DATEV-CSV Converter →</Link>
        </div>
      </div>
      <div className="mt-12 prose prose-zinc">

        <h2>Toom 19% MwSt: Warum BU 9 Pflicht ist</h2>
        <p>Toom verkauft fast nur 19% Artikel: Werkzeug, Holz, Schrauben, Farbe. Auf dem Bon steht unten <strong>inkl. 19% MwSt 14,34 €</strong> oder <code>19% USt</code>. Ohne BU-Schlüssel bucht DATEV brutto ohne Vorsteuer – du verschenkst 19%.</p>
        <p>Toom druckt Brutto als <code>89,90 €</code> mit Euro und Leerzeichen – DATEV will <code>89,90</code> ohne Euro. Datum als <code>28.08.2025</code> mit Punkten – DATEV will <code>28082025</code>. Unsere KI wandelt beides um und setzt automatisch <strong>BU 9 für 19% Vorsteuer</strong>.</p>
        <p>Toom Besonderheit: Manchmal 7% bei Pflanzen/Garten auf gleichem Bon – dann BU 8 zusätzlich. Wir erkennen beide und splitten.</p>


        <h2>SKR03 mit 19% MwSt: 3400 + BU 9 für Toom</h2>
        <p>Für Handwerker: <strong>Konto 3400 Bau- und Rohstoffe, BU 9 für 19% Vorsteuer</strong>, Gegenkonto 1600 Kasse bei Bar, 1200 Bank bei EC, Belegfeld1 = Toom Belegnummer 1234/5678. Mit BU 9 zieht DATEV automatisch 19% Vorsteuer. Ohne BU keine Vorsteuer – deshalb Pflicht bei Toom.</p>

        <h2>DATEV-CSV Format (EXTF 700)</h2>
        <p>Für DATEV Unternehmen Online brauchst du EXTF 700 mit 21 Feldern. beleg2buchhaltung.de erzeugt genau dieses Format für Toom und OBI, damit der Belegtransfer ohne Anpassung klappt.</p>
        <pre className="text-xs bg-black text-green-400 p-4 rounded-xl overflow-auto">EXTF;700;21;Belegfeld1;Belegdatum;Konto;Gegenkonto;BU;Brutto;Belegtext\n;1234/5678;28082025;3400;1600;9;89,90;toom 19%</pre>
        <p className="text-xs text-zinc-500 mt-2">Belegfeld1 = Rechnungsnummer, Belegdatum DDMMYYYY, Konto 3400, Gegenkonto 1600/1200, BU 9 für 19% Vorsteuer, Brutto mit Komma.</p>
        <h2>Häufige Fehler die wir automatisch korrigieren</h2>
        <ul>
          <li><strong>Datum mit Punkten:</strong> 28.08.2025 → 28082025 für DATEV.</li>
          <li><strong>Brutto mit Euro:</strong> 127,45 € → 127,45.</li>
          <li><strong>Falsches Konto:</strong> 4000 statt 3400 für Handwerker.</li>
          <li><strong>BU fehlt:</strong> Ohne BU 9 keine Vorsteuer.</li>
        </ul>
        <h2>FAQ</h2>
        <h3>Welcher BU bei Toom 19 Prozent?</h3>
        <p>BU 9 für 19% Vorsteuer. Pflicht, sonst keine Vorsteuer. KI setzt BU 9 automatisch bei Toom.</p>
        <h3>Wie buche ich Toom 19% in SKR03?</h3>
        <p>Konto 3400 Bau- und Rohstoffe, BU 9, Gegenkonto 1600/1200, Belegfeld1 Toom Nummer. So mit Vorsteuer.</p>
        <h3>Toom Bon ohne MwSt ausgewiesen?</h3>
        <p>Manche Toom Bons zeigen nur Brutto. Wir erkennen 19% aus Kontext (Baumaterial immer 19%) und setzen BU 9.</p>
      </div>
      <div className="mt-12 border-t pt-8 flex gap-3">
        <Link href="/blog" className="border px-4 py-2 rounded-full text-sm">← Alle Anleitungen</Link>
        <Link href="/" className="bg-black text-white px-4 py-2 rounded-full text-sm">Zum Converter</Link>
      </div>
    </div>
  )
}
