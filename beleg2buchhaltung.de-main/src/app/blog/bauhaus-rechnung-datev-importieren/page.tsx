import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = {
  title: "BAUHAUS Rechnung DATEV importieren | PDF zu DATEV-CSV Guide",
  description: "BAUHAUS Rechnung in DATEV importieren: PDF hochladen, KI erkennt Datum, Brutto, 19% MwSt und BH-Nummer. Fertige DATEV-CSV für SKR03 3400.",
  keywords: ["bauhaus-rechnung-datev-importieren", "DATEV", "Baumarkt", "SKR03 3400", "19% MwSt", "DATEV Unternehmen Online"],
  alternates: { canonical: "https://beleg2buchhaltung.de/blog/bauhaus-rechnung-datev-importieren" },
  openGraph: { title: "BAUHAUS Rechnung DATEV importieren | PDF zu DATEV-CSV Guide", description: "BAUHAUS Rechnung in DATEV importieren: PDF hochladen, KI erkennt Datum, Brutto, 19% MwSt und BH-Nummer. Fertige DATEV-CSV für SKR03 3400.", url: "https://beleg2buchhaltung.de/blog/bauhaus-rechnung-datev-importieren", siteName: "beleg2buchhaltung.de", locale: "de_DE", type: "article" },
}
export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Wie importiere ich BAUHAUS Rechnung in DATEV Unternehmen Online?", "acceptedAnswer": { "@type": "Answer", "text": "PDF hochladen, CSV herunterladen, in Unternehmen Online unter Belege → Belegtransfer importieren. Konto 3400 und BU 9 sind schon gesetzt. Kein manuelles Tippen." } },
      { "@type": "Question", "name": "A4 Rechnung oder Kassenbon – was ist besser für DATEV?", "acceptedAnswer": { "@type": "Answer", "text": "Beides funktioniert. A4 Rechnungen haben mehr Details wie USt-ID, Kassenbons sind schneller. Unsere KI liest beide. Für DATEV ist nur Belegfeld1 BH-Nummer und Belegdatum wichtig." } },
      { "@type": "Question", "name": "Welches Gegenkonto bei BAUHAUS Rechnung?", "acceptedAnswer": { "@type": "Answer", "text": "Bei Barzahlung auf dem Bon: Gegenkonto 1600 Kasse. Bei EC oder Überweisung: 1200 Bank. Unsere KI erkennt Bar/EC aus dem Bon-Text." } }
    ]
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="text-xs text-zinc-500 mb-4"><Link href="/" className="hover:underline">beleg2buchhaltung.de</Link> / <Link href="/blog" className="hover:underline">Blog</Link> / bauhaus-rechnung-datev-importieren</div>
      <h1 className="text-4xl font-bold tracking-tight">BAUHAUS Rechnung DATEV importieren</h1>
      <p className="mt-4 text-zinc-600 text-lg">BAUHAUS Rechnungen manuell abzutippen ist fehleranfällig. Lade die PDF hoch, wir lesen alles aus und du importierst die fertige CSV direkt in DATEV Unternehmen Online.</p>
      <div className="mt-8 border-2 border-dashed rounded-2xl p-8 bg-zinc-50 text-center">
        <p className="font-semibold">Teste direkt: PDF hier ablegen</p>
        <p className="text-sm text-zinc-500">PDF, JPG, PNG bis 10MB • DSGVO-konform verarbeitet in Deutschland</p>
        <div className="mt-4 flex gap-2 justify-center">
          <Link href="/" className="bg-black text-white px-5 py-2 rounded-full text-sm">Zum DATEV-CSV Converter →</Link>
        </div>
      </div>
      <div className="mt-12 prose prose-zinc">

        <h2>BAUHAUS Rechnung vs Kassenbon: Unterschied</h2>
        <p>BAUHAUS hat zwei Belegtypen: Den kleinen Kassenbon (bis 250€) und die A4 Rechnung für Firmenkunden. Die A4 Rechnung hat oben <strong>BAUHAUS Gesellschaft für Bau- und Gartenbedarf</strong> und eine Rechnungsnummer wie <strong>R-Nr. BH-887123</strong>. Der Kassenbon hat nur BH-992341.</p>
        <p>Für DATEV ist beides gleich: Belegfeld1 = BH-Nummer, Belegdatum = Rechnungsdatum, Konto 3400. Unsere KI erkennt beide Varianten. Bei A4 Rechnungen steht die USt-ID und die Zahlungsart Überweisung – dann ist Gegenkonto 1200 statt 1600.</p>


        <h2>Import in DATEV Unternehmen Online: Schritt für Schritt</h2>
        <p>1. PDF bei beleg2buchhaltung.de hochladen. 2. DATEV-CSV herunterladen. 3. In Unternehmen Online: Belege → Belegtransfer → Import. 4. DATEV erkennt automatisch Konto 3400, BU 9, Belegfeld1. Du musst nur noch Speichern klicken. Der Beleg ist dann GoBD-konform verknüpft mit dem Original-PDF.</p>

        <h2>DATEV-CSV Format (EXTF 700)</h2>
        <p>Das Format für DATEV Unternehmen Online ist standardisiert. beleg2buchhaltung.de erzeugt eine EXTF-Datei mit 21 Feldern, die du 1:1 im Belegtransfer hochladen kannst.</p>
        <pre className="text-xs bg-black text-green-400 p-4 rounded-xl overflow-auto">EXTF;700;21;Belegfeld1;Belegdatum;Konto;Gegenkonto;BU;Brutto\n;BH-887123;28082025;3400;1600;9;245,80</pre>
        <p className="text-xs text-zinc-500 mt-2">Belegfeld1 = Rechnungsnummer, Belegdatum im Format DDMMYYYY, Konto 3400, Gegenkonto 1600, BU 9 für 19% Vorsteuer. Bei gemischten Steuersätzen erzeugen wir zwei Zeilen mit BU 9 und BU 8.</p>
        <h2>Häufige Fehler die wir automatisch korrigieren</h2>
        <ul>
          <li><strong>Datum mit Punkten:</strong> Auf dem Bon steht 28.08.2025 – DATEV braucht 28082025. Wir wandeln um.</li>
          <li><strong>Brutto mit Leerzeichen:</strong> 127,45 € wird zu 127,45 für DATEV.</li>
          <li><strong>Falsches Konto:</strong> Viele buchen Baumarkt auf 4000. Korrekt für Handwerker ist 3400 Bau- und Rohstoffe, damit die BWA stimmt.</li>
          <li><strong>Belegnummer vergessen:</strong> Ohne Belegfeld1 meckert DATEV. Wir lesen BH-/OB-/HB-Nummern automatisch aus.</li>
        </ul>
        <h2>FAQ</h2>
        <h3>Wie importiere ich BAUHAUS Rechnung in DATEV Unternehmen Online?</h3>
        <p>PDF hochladen, CSV herunterladen, in Unternehmen Online unter Belege → Belegtransfer importieren. Konto 3400 und BU 9 sind schon gesetzt. Kein manuelles Tippen.</p>
        <h3>A4 Rechnung oder Kassenbon – was ist besser für DATEV?</h3>
        <p>Beides funktioniert. A4 Rechnungen haben mehr Details wie USt-ID, Kassenbons sind schneller. Unsere KI liest beide. Für DATEV ist nur Belegfeld1 BH-Nummer und Belegdatum wichtig.</p>
        <h3>Welches Gegenkonto bei BAUHAUS Rechnung?</h3>
        <p>Bei Barzahlung auf dem Bon: Gegenkonto 1600 Kasse. Bei EC oder Überweisung: 1200 Bank. Unsere KI erkennt Bar/EC aus dem Bon-Text.</p>
      </div>
      <div className="mt-12 border-t pt-8 flex gap-3">
        <Link href="/blog" className="border px-4 py-2 rounded-full text-sm">← Alle Anleitungen</Link>
        <Link href="/" className="bg-black text-white px-4 py-2 rounded-full text-sm">Zum Converter</Link>
      </div>
    </div>
  )
}
