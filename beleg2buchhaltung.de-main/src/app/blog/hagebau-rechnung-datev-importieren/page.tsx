import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = {
  title: "Hagebau Rechnung DATEV importieren | Automatische DATEV-CSV",
  description: "Hagebau Rechnung in DATEV importieren: PDF hochladen, KI liest Belegdatum, Brutto, Hagebau Belegnummer, 19% MwSt. DATEV-CSV für SKR03 3400.",
  keywords: ["hagebau-rechnung-datev-importieren", "DATEV", "Baumarkt", "SKR03 3400", "19% MwSt", "DATEV Unternehmen Online"],
  alternates: { canonical: "https://beleg2buchhaltung.de/blog/hagebau-rechnung-datev-importieren" },
  openGraph: { title: "Hagebau Rechnung DATEV importieren | Automatische DATEV-CSV", description: "Hagebau Rechnung in DATEV importieren: PDF hochladen, KI liest Belegdatum, Brutto, Hagebau Belegnummer, 19% MwSt. DATEV-CSV für SKR03 3400.", url: "https://beleg2buchhaltung.de/blog/hagebau-rechnung-datev-importieren", siteName: "beleg2buchhaltung.de", locale: "de_DE", type: "article" },
}
export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Wie importiere ich Hagebau Rechnung in DATEV?", "acceptedAnswer": { "@type": "Answer", "text": "PDF oder Foto bei beleg2buchhaltung.de hochladen, CSV herunterladen, in DATEV Unternehmen Online unter Belege → Belegtransfer importieren. Konto 3400, BU 9, Belegfeld1 schon gesetzt." } },
      { "@type": "Question", "name": "Welche Belegnummer hat Hagebau?", "acceptedAnswer": { "@type": "Answer", "text": "Meist Re-Nr. 1234567 oben rechts oder HAG-123456. Unsere KI liest beide Varianten als Belegfeld1, auch ohne Prefix." } },
      { "@type": "Question", "name": "Brauche ich 3400 oder 4000 für Hagebau?", "acceptedAnswer": { "@type": "Answer", "text": "Für Handwerker immer 3400 Bau- und Rohstoffe, damit BWA und Baustellenabrechnung stimmen. 4000 nur wenn du Händler bist." } }
    ]
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="text-xs text-zinc-500 mb-4"><Link href="/" className="hover:underline">beleg2buchhaltung.de</Link> / <Link href="/blog" className="hover:underline">Blog</Link> / hagebau-rechnung-datev-importieren</div>
      <h1 className="text-4xl font-bold tracking-tight">Hagebau Rechnung DATEV importieren</h1>
      <p className="mt-4 text-zinc-600 text-lg">Hagebau Rechnungen als PDF oder Foto in DATEV zu importieren kostet manuell 3-4 Minuten. Mit beleg2buchhaltung.de lädst du den Hagebau Bon hoch und bekommst eine fertige DATEV-CSV für Unternehmen Online – in 5 Sekunden.</p>
      <div className="mt-8 border-2 border-dashed rounded-2xl p-8 bg-zinc-50 text-center">
        <p className="font-semibold">Teste direkt: PDF hier ablegen</p>
        <p className="text-sm text-zinc-500">PDF, JPG, PNG bis 10MB • DSGVO-konform verarbeitet in Deutschland</p>
        <div className="mt-4 flex gap-2 justify-center">
          <Link href="/" className="bg-black text-white px-5 py-2 rounded-full text-sm">Zum DATEV-CSV Converter →</Link>
        </div>
      </div>
      <div className="mt-12 prose prose-zinc">

        <h2>Hagebau Spezialität: Hagebau schreibt Re-Nr. ohne Prefix</h2>
        <p>Hagebau druckt anders als OBI oder BAUHAUS: Keine OB- oder BH-Nummer, sondern <strong>Re-Nr. 1234567</strong> oder <strong>HAG-123456</strong> oben rechts, oft unter <strong>hagebau – Ihr Baumarkt</strong>. Das Datum steht als <code>28.08.2025</code> oben links. Viele Hagebau Filialen sind eigenständig, deshalb steht die Filiale als <strong>hagebaucentrum Mustermann</strong> im Kopf.</p>
        <p>Unsere KI erkennt Hagebau am Logo und liest die Re-Nr. als Belegfeld1, auch wenn sie als 1234567 ohne Prefix gedruckt ist. Hagebau hat wie Toom oft nur 19% auf einem Bon, selten 7% gemischt. Brutto steht als <code>127,45 €</code> mit Euro – wir wandeln zu <code>127,45</code> für DATEV.</p>
        <p>Besonderheit: Hagebau A4 Rechnungen für Firmenkunden haben 2 Seiten mit Lieferschein. Wir lesen nur die erste Seite mit Rechnungsbetrag.</p>


        <h2>SKR03 Kontierung für Hagebau: 3400 Bau- und Rohstoffe</h2>
        <p>Für Handwerker immer <strong>Konto 3400 Bau- und Rohstoffe</strong>, nicht 4000. Hagebau liefert Baumaterial für Baustellen, deshalb 3400 für korrekte BWA. BU 9 für 19% Vorsteuer Standard, BU 8 nur bei Pflanzen/Garten. Gegenkonto 1600 Kasse bei Bar, 1200 Bank bei EC/Überweisung. Belegfeld1 = Re-Nr. 1234567 oder HAG-Nummer.</p>

        <h2>DATEV-CSV Format (EXTF 700)</h2>
        <p>DATEV Unternehmen Online erwartet EXTF 700 mit 21 Feldern. beleg2buchhaltung.de erzeugt genau dieses Format, damit der Import ohne Anpassung funktioniert.</p>
        <pre className="text-xs bg-black text-green-400 p-4 rounded-xl overflow-auto">EXTF;700;21;Belegfeld1;Belegdatum;Konto;Gegenkonto;BU;Brutto;Belegtext\n;HAG-123456;28082025;3400;1600;9;127,45;hagebau</pre>
        <p className="text-xs text-zinc-500 mt-2">Belegfeld1 = Rechnungsnummer, Belegdatum als DDMMYYYY, Konto 3400, Gegenkonto 1600/1200, BU 9 für 19% Vorsteuer. Bei Mischsteuersätzen zwei Zeilen BU 9 + BU 8.</p>
        <h2>Häufige Fehler die wir automatisch korrigieren</h2>
        <ul>
          <li><strong>Datum mit Punkten:</strong> 28.08.2025 auf dem Bon → 28082025 für DATEV.</li>
          <li><strong>Brutto mit Euro:</strong> 127,45 € → 127,45 ohne Leerzeichen und Euro.</li>
          <li><strong>Falsches Konto:</strong> Viele buchen Baumarkt auf 4000 statt 3400 für Handwerker.</li>
          <li><strong>Belegnummer fehlt:</strong> Ohne OB-/BH-/HB-Nummer lehnt Belegtransfer ab.</li>
        </ul>
        <h2>FAQ</h2>
        <h3>Wie importiere ich Hagebau Rechnung in DATEV?</h3>
        <p>PDF oder Foto bei beleg2buchhaltung.de hochladen, CSV herunterladen, in DATEV Unternehmen Online unter Belege → Belegtransfer importieren. Konto 3400, BU 9, Belegfeld1 schon gesetzt.</p>
        <h3>Welche Belegnummer hat Hagebau?</h3>
        <p>Meist Re-Nr. 1234567 oben rechts oder HAG-123456. Unsere KI liest beide Varianten als Belegfeld1, auch ohne Prefix.</p>
        <h3>Brauche ich 3400 oder 4000 für Hagebau?</h3>
        <p>Für Handwerker immer 3400 Bau- und Rohstoffe, damit BWA und Baustellenabrechnung stimmen. 4000 nur wenn du Händler bist.</p>
      </div>
      <div className="mt-12 border-t pt-8 flex gap-3">
        <Link href="/blog" className="border px-4 py-2 rounded-full text-sm">← Alle Anleitungen</Link>
        <Link href="/" className="bg-black text-white px-4 py-2 rounded-full text-sm">Zum Converter</Link>
      </div>
    </div>
  )
}
