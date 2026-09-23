import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = {
  title: "Baumarkt Rechnung automatisch DATEV | KI statt Abtippen",
  description: "Baumarkt Rechnung automatisch in DATEV: KI liest OBI, BAUHAUS, Hornbach, Toom aus PDF, Foto. 5000+ Belege trainiert. DATEV-CSV in 5 Sekunden.",
  keywords: ["baumarkt-rechnung-automatisch-datev", "DATEV", "Baumarkt", "SKR03 3400", "19% MwSt", "DATEV Unternehmen Online"],
  alternates: { canonical: "https://beleg2buchhaltung.de/blog/baumarkt-rechnung-automatisch-datev" },
  openGraph: { title: "Baumarkt Rechnung automatisch DATEV | KI statt Abtippen", description: "Baumarkt Rechnung automatisch in DATEV: KI liest OBI, BAUHAUS, Hornbach, Toom aus PDF, Foto. 5000+ Belege trainiert. DATEV-CSV in 5 Sekunden.", url: "https://beleg2buchhaltung.de/blog/baumarkt-rechnung-automatisch-datev", siteName: "beleg2buchhaltung.de", locale: "de_DE", type: "article" },
}
export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Wie funktioniert automatisch bei Baumarkt?", "acceptedAnswer": { "@type": "Answer", "text": "PDF oder Foto hochladen, Vision-KI erkennt Lieferant, Belegdatum, Brutto, Belegnummer, Steuersatz ohne Vorlage. Erzeugt DATEV-CSV mit Konto 3400, BU 9, Belegfeld1. Kein Training nötig." } },
      { "@type": "Question", "name": "Geht das auch mit Handy-Foto auf Baustelle?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, genau dafür gebaut. JPG, PNG bis 10MB, auch schief, mit Schatten. Handwerker fotografieren auf Baustelle, nicht scannen. KI ist darauf trainiert." } },
      { "@type": "Question", "name": "Wie genau ist die KI bei Baumarkt?", "acceptedAnswer": { "@type": "Answer", "text": "Über 95% bei Belegdatum, Brutto und Belegnummer bei OBI, BAUHAUS, Hornbach. Bei Mischsteuersätzen 19%/7% erkennt sie beide und splittet BU 9 und BU 8." } }
    ]
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="text-xs text-zinc-500 mb-4"><Link href="/" className="hover:underline">beleg2buchhaltung.de</Link> / <Link href="/blog" className="hover:underline">Blog</Link> / baumarkt-rechnung-automatisch-datev</div>
      <h1 className="text-4xl font-bold tracking-tight">Baumarkt Rechnung automatisch DATEV</h1>
      <p className="mt-4 text-zinc-600 text-lg">Baumarkt-Rechnungen automatisch in DATEV zu bekommen war bisher unmöglich – jeder Bon sieht anders aus. beleg2buchhaltung.de nutzt Vision-KI statt Vorlagen und liest jeden Baumarkt automatisch aus.</p>
      <div className="mt-8 border-2 border-dashed rounded-2xl p-8 bg-zinc-50 text-center">
        <p className="font-semibold">Teste direkt: PDF hier ablegen</p>
        <p className="text-sm text-zinc-500">PDF, JPG, PNG bis 10MB • DSGVO-konform verarbeitet in Deutschland</p>
        <div className="mt-4 flex gap-2 justify-center">
          <Link href="/" className="bg-black text-white px-5 py-2 rounded-full text-sm">Zum DATEV-CSV Converter →</Link>
        </div>
      </div>
      <div className="mt-12 prose prose-zinc">

        <h2>Warum Vorlagen bei Baumarkt nicht funktionieren</h2>
        <p>OBI ändert sein Layout alle 6 Monate, BAUHAUS druckt mal BH- mal BH/ , Hornbach hat mal 1 Seite mal 2 Seiten. Ein Parser mit festen Koordinaten bricht sofort. Unsere KI nutzt <strong>Vision statt OCR-Vorlagen</strong>: Sie versteht wo Datum, Brutto und Belegnummer stehen, egal wie der Bon aussieht.</p>
        <p>Trainiert mit 5000+ echten Belegen von Handwerkern aus Deutschland: OBI, BAUHAUS, Hornbach, Toom, Hagebau, Globus, IKEA. Auch Handy-Fotos schief mit Schatten werden gelesen – weil Handwerker auf der Baustelle fotografieren, nicht scannen.</p>


        <h2>Automatisch kontiert: SKR03 3400, BU 9, Belegfeld1</h2>
        <p>Die KI setzt automatisch: Konto 3400 Bau- und Rohstoffe für Handwerker, BU 9 für 19% Vorsteuer, BU 8 für 7% bei Garten, Gegenkonto 1600 Kasse oder 1200 Bank je nach Zahlungsart auf dem Bon, Belegfeld1 = OB-/BH-/HB-Nummer. Du musst nichts mehr manuell zuordnen. CSV direkt in DATEV importieren.</p>

        <h2>DATEV-CSV Format (EXTF 700)</h2>
        <p>Das Format für DATEV Unternehmen Online ist standardisiert. beleg2buchhaltung.de erzeugt eine EXTF-Datei mit 21 Feldern, die du 1:1 im Belegtransfer hochladen kannst.</p>
        <pre className="text-xs bg-black text-green-400 p-4 rounded-xl overflow-auto">EXTF;700;21;Belegfeld1;Belegdatum;Konto;Gegenkonto;BU;Brutto;Belegtext\n;OB-884729;28082025;3400;1600;9;127,45;OBI Markt</pre>
        <p className="text-xs text-zinc-500 mt-2">Belegfeld1 = Rechnungsnummer, Belegdatum im Format DDMMYYYY, Konto 3400, Gegenkonto 1600, BU 9 für 19% Vorsteuer. Bei gemischten Steuersätzen erzeugen wir zwei Zeilen mit BU 9 und BU 8.</p>
        <h2>Häufige Fehler die wir automatisch korrigieren</h2>
        <ul>
          <li><strong>Datum mit Punkten:</strong> Auf dem Bon steht 28.08.2025 – DATEV braucht 28082025. Wir wandeln um.</li>
          <li><strong>Brutto mit Leerzeichen:</strong> 127,45 € wird zu 127,45 für DATEV.</li>
          <li><strong>Falsches Konto:</strong> Viele buchen Baumarkt auf 4000. Korrekt für Handwerker ist 3400 Bau- und Rohstoffe, damit die BWA stimmt.</li>
          <li><strong>Belegnummer vergessen:</strong> Ohne Belegfeld1 meckert DATEV. Wir lesen BH-/OB-/HB-Nummern automatisch aus.</li>
        </ul>
        <h2>FAQ</h2>
        <h3>Wie funktioniert automatisch bei Baumarkt?</h3>
        <p>PDF oder Foto hochladen, Vision-KI erkennt Lieferant, Belegdatum, Brutto, Belegnummer, Steuersatz ohne Vorlage. Erzeugt DATEV-CSV mit Konto 3400, BU 9, Belegfeld1. Kein Training nötig.</p>
        <h3>Geht das auch mit Handy-Foto auf Baustelle?</h3>
        <p>Ja, genau dafür gebaut. JPG, PNG bis 10MB, auch schief, mit Schatten. Handwerker fotografieren auf Baustelle, nicht scannen. KI ist darauf trainiert.</p>
        <h3>Wie genau ist die KI bei Baumarkt?</h3>
        <p>Über 95% bei Belegdatum, Brutto und Belegnummer bei OBI, BAUHAUS, Hornbach. Bei Mischsteuersätzen 19%/7% erkennt sie beide und splittet BU 9 und BU 8.</p>
      </div>
      <div className="mt-12 border-t pt-8 flex gap-3">
        <Link href="/blog" className="border px-4 py-2 rounded-full text-sm">← Alle Anleitungen</Link>
        <Link href="/" className="bg-black text-white px-4 py-2 rounded-full text-sm">Zum Converter</Link>
      </div>
    </div>
  )
}
