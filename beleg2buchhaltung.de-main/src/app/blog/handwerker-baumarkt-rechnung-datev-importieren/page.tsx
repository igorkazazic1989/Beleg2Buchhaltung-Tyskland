import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = {
  title: "Handwerker Baumarkt Rechnung DATEV importieren | Für Elektriker, SHK",
  description: "Handwerker Baumarkt Rechnung in DATEV importieren: OBI, BAUHAUS, Hornbach, Toom für Elektriker, SHK, Maler. Automatisch SKR03 3400, BU 9, Belegfeld1.",
  keywords: ["handwerker-baumarkt-rechnung-datev-importieren", "DATEV", "Baumarkt", "SKR03 3400", "19% MwSt", "DATEV Unternehmen Online"],
  alternates: { canonical: "https://beleg2buchhaltung.de/blog/handwerker-baumarkt-rechnung-datev-importieren" },
  openGraph: { title: "Handwerker Baumarkt Rechnung DATEV importieren | Für Elektriker, SHK", description: "Handwerker Baumarkt Rechnung in DATEV importieren: OBI, BAUHAUS, Hornbach, Toom für Elektriker, SHK, Maler. Automatisch SKR03 3400, BU 9, Belegfeld1.", url: "https://beleg2buchhaltung.de/blog/handwerker-baumarkt-rechnung-datev-importieren", siteName: "beleg2buchhaltung.de", locale: "de_DE", type: "article" },
}
export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Wie importiere ich als Handwerker Baumarkt Bons in DATEV?", "acceptedAnswer": { "@type": "Answer", "text": "Bons fotografieren oder PDF hochladen bei beleg2buchhaltung.de, CSV herunterladen, in Unternehmen Online unter Belegtransfer importieren. Konto 3400, BU 9 automatisch gesetzt." } },
      { "@type": "Question", "name": "3400 oder 4000 für Handwerker Baumarkt?", "acceptedAnswer": { "@type": "Answer", "text": "Immer 3400 Bau- und Rohstoffe für Handwerker, nicht 4000. 3400 für Baumaterial für Baustellen, 4000 nur für Händler. So stimmt BWA und Baustellenabrechnung." } },
      { "@type": "Question", "name": "Geht das auch mit Handy-Foto auf Baustelle?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, genau dafür gebaut. JPG/PNG bis 10MB, auch schief, mit Schatten. Handwerker fotografieren auf Baustelle, nicht scannen. KI ist darauf trainiert." } }
    ]
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="text-xs text-zinc-500 mb-4"><Link href="/" className="hover:underline">beleg2buchhaltung.de</Link> / <Link href="/blog" className="hover:underline">Blog</Link> / handwerker-baumarkt-rechnung-datev-importieren</div>
      <h1 className="text-4xl font-bold tracking-tight">Handwerker Baumarkt Rechnung DATEV importieren</h1>
      <p className="mt-4 text-zinc-600 text-lg">Als Handwerker kaufst du täglich bei OBI, BAUHAUS, Hornbach – und musst die Bons abends noch in DATEV tippen. beleg2buchhaltung.de wurde genau dafür gebaut: Baumarkt-Bons in 5 Sekunden zu DATEV-CSV, damit du mehr Zeit auf der Baustelle hast.</p>
      <div className="mt-8 border-2 border-dashed rounded-2xl p-8 bg-zinc-50 text-center">
        <p className="font-semibold">Teste direkt: PDF hier ablegen</p>
        <p className="text-sm text-zinc-500">PDF, JPG, PNG bis 10MB • DSGVO-konform verarbeitet in Deutschland</p>
        <div className="mt-4 flex gap-2 justify-center">
          <Link href="/" className="bg-black text-white px-5 py-2 rounded-full text-sm">Zum DATEV-CSV Converter →</Link>
        </div>
      </div>
      <div className="mt-12 prose prose-zinc">

        <h2>Handwerker Problem: Baumarkt Bons stapeln sich</h2>
        <p>Elektriker, SHK, Maler, Dachdecker: Ihr kauft morgens um 6 bei OBI Kabel, Schrauben, Farbe und habt abends 5-10 Bons. Jeder Bon sieht anders aus: OBI OB-Nummer, BAUHAUS BH-Nummer mit 19%+7% gemischt, Hornbach HB-Nummer mit 2 Seiten Rechnung. Manuell abtippen = 30 Minuten pro Tag.</p>
        <p>beleg2buchhaltung.de ist auf Handwerker trainiert: Wir erkennen automatisch ob Bar (Gegenkonto 1600) oder EC (1200) bezahlt wurde, ob 19% oder 7% drauf ist, und ob es Baumaterial 3400 oder Werkzeug 4985 ist. Standard ist 3400 Bau- und Rohstoffe für alle Baumärkte – korrekt für Handwerker BWA.</p>
        <p>Du fotografierst die Bons auf der Baustelle mit Handy – auch schief mit Schatten. Unsere Vision-KI liest sie trotzdem, weil sie auf echte Handwerker-Fotos trainiert ist, nicht auf perfekte Scans.</p>


        <h2>Kontierung für Handwerker: Warum 3400 und nicht 4000</h2>
        <p>Viele Steuerberater buchen Baumarkt auf 4000 Material. Für Handwerker falsch. <strong>3400 Bau- und Rohstoffe</strong> ist korrekt, weil es in die Bauleistung fließt und für Baustellen-Nachkalkulation gebraucht wird. 4000 ist Handelsware. Mit 3400 stimmt deine BWA und du siehst pro Baustelle was du bei OBI & Co ausgegeben hast. BU 9 für 19% Vorsteuer, BU 8 für 7% bei Garten. Belegfeld1 = OB-/BH-/HB-Nummer für GoBD-Verknüpfung.</p>

        <h2>DATEV-CSV Format (EXTF 700)</h2>
        <p>DATEV Unternehmen Online erwartet EXTF 700 mit 21 Feldern. beleg2buchhaltung.de erzeugt genau dieses Format, damit der Import ohne Anpassung funktioniert.</p>
        <pre className="text-xs bg-black text-green-400 p-4 rounded-xl overflow-auto">EXTF;700;21;Belegfeld1;Belegdatum;Konto;Gegenkonto;BU;Brutto;Belegtext;KOST\n;OB-884729;28082025;3400;1600;9;127,45;OBI Markt;Baustelle Müller</pre>
        <p className="text-xs text-zinc-500 mt-2">Belegfeld1 = Rechnungsnummer, Belegdatum als DDMMYYYY, Konto 3400, Gegenkonto 1600/1200, BU 9 für 19% Vorsteuer. Bei Mischsteuersätzen zwei Zeilen BU 9 + BU 8.</p>
        <h2>Häufige Fehler die wir automatisch korrigieren</h2>
        <ul>
          <li><strong>Datum mit Punkten:</strong> 28.08.2025 auf dem Bon → 28082025 für DATEV.</li>
          <li><strong>Brutto mit Euro:</strong> 127,45 € → 127,45 ohne Leerzeichen und Euro.</li>
          <li><strong>Falsches Konto:</strong> Viele buchen Baumarkt auf 4000 statt 3400 für Handwerker.</li>
          <li><strong>Belegnummer fehlt:</strong> Ohne OB-/BH-/HB-Nummer lehnt Belegtransfer ab.</li>
        </ul>
        <h2>FAQ</h2>
        <h3>Wie importiere ich als Handwerker Baumarkt Bons in DATEV?</h3>
        <p>Bons fotografieren oder PDF hochladen bei beleg2buchhaltung.de, CSV herunterladen, in Unternehmen Online unter Belegtransfer importieren. Konto 3400, BU 9 automatisch gesetzt.</p>
        <h3>3400 oder 4000 für Handwerker Baumarkt?</h3>
        <p>Immer 3400 Bau- und Rohstoffe für Handwerker, nicht 4000. 3400 für Baumaterial für Baustellen, 4000 nur für Händler. So stimmt BWA und Baustellenabrechnung.</p>
        <h3>Geht das auch mit Handy-Foto auf Baustelle?</h3>
        <p>Ja, genau dafür gebaut. JPG/PNG bis 10MB, auch schief, mit Schatten. Handwerker fotografieren auf Baustelle, nicht scannen. KI ist darauf trainiert.</p>
      </div>
      <div className="mt-12 border-t pt-8 flex gap-3">
        <Link href="/blog" className="border px-4 py-2 rounded-full text-sm">← Alle Anleitungen</Link>
        <Link href="/" className="bg-black text-white px-4 py-2 rounded-full text-sm">Zum Converter</Link>
      </div>
    </div>
  )
}
