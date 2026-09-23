import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = {
  title: "OBI Rechnung SKR03 3400 buchen | Korrekt für Handwerker",
  description: "OBI Rechnung SKR03 3400 buchen: So buchst du OBI korrekt mit Konto 3400 Bau- und Rohstoffe, BU 9, Gegenkonto 1600, Belegfeld1 OB-Nummer.",
  keywords: ["obi-rechnung-skr03-3400-buchen", "DATEV", "Baumarkt", "SKR03 3400", "19% MwSt", "DATEV Unternehmen Online"],
  alternates: { canonical: "https://beleg2buchhaltung.de/blog/obi-rechnung-skr03-3400-buchen" },
  openGraph: { title: "OBI Rechnung SKR03 3400 buchen | Korrekt für Handwerker", description: "OBI Rechnung SKR03 3400 buchen: So buchst du OBI korrekt mit Konto 3400 Bau- und Rohstoffe, BU 9, Gegenkonto 1600, Belegfeld1 OB-Nummer.", url: "https://beleg2buchhaltung.de/blog/obi-rechnung-skr03-3400-buchen", siteName: "beleg2buchhaltung.de", locale: "de_DE", type: "article" },
}
export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Auf welches Konto buche ich OBI in SKR03?", "acceptedAnswer": { "@type": "Answer", "text": "Für Handwerker auf 3400 Bau- und Rohstoffe, nicht 4000. 3400 für Baumaterial für Baustellen, 4000 nur für Händler. So stimmt BWA und Baustellenabrechnung." } },
      { "@type": "Question", "name": "Welcher BU bei OBI?", "acceptedAnswer": { "@type": "Answer", "text": "BU 9 für 19% Vorsteuer Standard bei OBI. OBI hat fast nur 19%, selten 7% gemischt. Bei Mischbelegen zwei Zeilen BU 9 und BU 8." } },
      { "@type": "Question", "name": "Was ist Belegfeld1 bei OBI?", "acceptedAnswer": { "@type": "Answer", "text": "OB-Nummer wie OB-884729 unten auf dem Bon unter Barcode. Pflichtfeld in DATEV für Belegverknüpfung." } }
    ]
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="text-xs text-zinc-500 mb-4"><Link href="/" className="hover:underline">beleg2buchhaltung.de</Link> / <Link href="/blog" className="hover:underline">Blog</Link> / obi-rechnung-skr03-3400-buchen</div>
      <h1 className="text-4xl font-bold tracking-tight">OBI Rechnung SKR03 3400 buchen</h1>
      <p className="mt-4 text-zinc-600 text-lg">OBI falsch zu buchen kostet dich Vorsteuer und eine falsche BWA. Als Handwerker musst du OBI auf 3400 Bau- und Rohstoffe buchen, nicht auf 4000. Hier lernst du warum – und wie beleg2buchhaltung.de es automatisch macht.</p>
      <div className="mt-8 border-2 border-dashed rounded-2xl p-8 bg-zinc-50 text-center">
        <p className="font-semibold">Teste direkt: PDF hier ablegen</p>
        <p className="text-sm text-zinc-500">PDF, JPG, PNG bis 10MB • DSGVO-konform verarbeitet in Deutschland</p>
        <div className="mt-4 flex gap-2 justify-center">
          <Link href="/" className="bg-black text-white px-5 py-2 rounded-full text-sm">Zum DATEV-CSV Converter →</Link>
        </div>
      </div>
      <div className="mt-12 prose prose-zinc">

        <h2>Warum 3400 und nicht 4000 bei OBI</h2>
        <p>Viele Steuerberater buchen OBI automatisch auf <strong>4000 Material</strong>. Für Handwerker ist das falsch. <strong>3400 Bau- und Rohstoffe</strong> ist korrekt, weil OBI Material für Baustellen liefert, nicht Handelsware für Wiederverkauf. 3400 fließt in die Bauleistungs-BWA und in die Baustellen-Nachkalkulation, 4000 nicht. Wenn du OBI auf 4000 buchst, siehst du nicht was du pro Baustelle bei OBI ausgegeben hast.</p>
        <p>OBI druckt die Belegnummer als <strong>OB-884729</strong> ganz unten unter dem Barcode. Das ist Belegfeld1 für DATEV – Pflichtfeld. Ohne OB-Nummer lehnt Belegtransfer ab. Datum steht als <code>28.08.2025</code> oben – DATEV will <code>28082025</code> ohne Punkte. Brutto als <code>127,45 €</code> mit Euro – DATEV will <code>127,45</code> ohne Euro.</p>
        <p>OBI hat fast nur 19% auf einem Bon – deshalb fast immer nur BU 9. Anders als BAUHAUS selten 7% gemischt.</p>


        <h2>SKR03 Kontierung OBI im Detail</h2>
        <ul>
          <li><strong>Konto:</strong> 3400 Bau- und Rohstoffe für Handwerker, 4000 nur wenn du Händler bist</li>
          <li><strong>BU-Schlüssel:</strong> 9 für 19% Vorsteuer, Standard bei OBI. 8 nur bei Gartenartikeln.</li>
          <li><strong>Gegenkonto:</strong> 1600 Kasse bei Barzahlung, 1200 Bank bei EC. Steht auf dem Bon als Barzahlung oder EC-Cash.</li>
          <li><strong>Belegfeld1:</strong> OB-Nummer wie OB-884729 unten auf dem Bon. Pflichtfeld für DATEV.</li>
          <li><strong>Belegdatum:</strong> 28082025 Format, aus 28.08.2025 auf dem Bon.</li>
        </ul>

        <h2>DATEV-CSV Format (EXTF 700)</h2>
        <p>Für DATEV Unternehmen Online brauchst du EXTF 700 mit 21 Feldern. beleg2buchhaltung.de erzeugt genau dieses Format für Toom und OBI, damit der Belegtransfer ohne Anpassung klappt.</p>
        <pre className="text-xs bg-black text-green-400 p-4 rounded-xl overflow-auto">EXTF;700;21;Belegfeld1;Belegdatum;Konto;Gegenkonto;BU;Brutto;Belegtext\n;OB-884729;28082025;3400;1600;9;127,45;OBI Markt</pre>
        <p className="text-xs text-zinc-500 mt-2">Belegfeld1 = Rechnungsnummer, Belegdatum DDMMYYYY, Konto 3400, Gegenkonto 1600/1200, BU 9 für 19% Vorsteuer, Brutto mit Komma.</p>
        <h2>Häufige Fehler die wir automatisch korrigieren</h2>
        <ul>
          <li><strong>Datum mit Punkten:</strong> 28.08.2025 → 28082025 für DATEV.</li>
          <li><strong>Brutto mit Euro:</strong> 127,45 € → 127,45.</li>
          <li><strong>Falsches Konto:</strong> 4000 statt 3400 für Handwerker.</li>
          <li><strong>BU fehlt:</strong> Ohne BU 9 keine Vorsteuer.</li>
        </ul>
        <h2>FAQ</h2>
        <h3>Auf welches Konto buche ich OBI in SKR03?</h3>
        <p>Für Handwerker auf 3400 Bau- und Rohstoffe, nicht 4000. 3400 für Baumaterial für Baustellen, 4000 nur für Händler. So stimmt BWA und Baustellenabrechnung.</p>
        <h3>Welcher BU bei OBI?</h3>
        <p>BU 9 für 19% Vorsteuer Standard bei OBI. OBI hat fast nur 19%, selten 7% gemischt. Bei Mischbelegen zwei Zeilen BU 9 und BU 8.</p>
        <h3>Was ist Belegfeld1 bei OBI?</h3>
        <p>OB-Nummer wie OB-884729 unten auf dem Bon unter Barcode. Pflichtfeld in DATEV für Belegverknüpfung.</p>
      </div>
      <div className="mt-12 border-t pt-8 flex gap-3">
        <Link href="/blog" className="border px-4 py-2 rounded-full text-sm">← Alle Anleitungen</Link>
        <Link href="/" className="bg-black text-white px-4 py-2 rounded-full text-sm">Zum Converter</Link>
      </div>
    </div>
  )
}
