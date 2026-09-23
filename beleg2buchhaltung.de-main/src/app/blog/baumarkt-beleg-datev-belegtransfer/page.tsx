import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = {
  title: "Baumarkt Beleg DATEV Belegtransfer | OBI, BAUHAUS, Hornbach, Toom",
  description: "Baumarkt Beleg via DATEV Belegtransfer: OBI, BAUHAUS, Hornbach, Toom, Hagebau PDF zu DATEV-CSV. Automatisch SKR03 3400, BU 9, Belegfeld1.",
  keywords: ["baumarkt-beleg-datev-belegtransfer", "DATEV", "Baumarkt", "SKR03 3400", "19% MwSt", "DATEV Unternehmen Online"],
  alternates: { canonical: "https://beleg2buchhaltung.de/blog/baumarkt-beleg-datev-belegtransfer" },
  openGraph: { title: "Baumarkt Beleg DATEV Belegtransfer | OBI, BAUHAUS, Hornbach, Toom", description: "Baumarkt Beleg via DATEV Belegtransfer: OBI, BAUHAUS, Hornbach, Toom, Hagebau PDF zu DATEV-CSV. Automatisch SKR03 3400, BU 9, Belegfeld1.", url: "https://beleg2buchhaltung.de/blog/baumarkt-beleg-datev-belegtransfer", siteName: "beleg2buchhaltung.de", locale: "de_DE", type: "article" },
}
export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Funktioniert Belegtransfer für alle Baumärkte?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. OBI, BAUHAUS, Hornbach, Toom, Hagebau, Globus Baumarkt, IKEA. Unsere KI erkennt alle. PDF hochladen, CSV in Unternehmen Online importieren." } },
      { "@type": "Question", "name": "Welche Belegnummer bei welchem Baumarkt?", "acceptedAnswer": { "@type": "Answer", "text": "OBI: OB-Nummer, BAUHAUS: BH-Nummer, Hornbach: HB-Nummer, Toom: Nummer ohne Prefix. Wir lesen alle automatisch als Belegfeld1." } },
      { "@type": "Question", "name": "Mischbelege mit 19% und 7% bei Baumarkt?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, besonders BAUHAUS und Toom haben 19% und 7% gemischt. Wir erzeugen zwei Zeilen BU 9 und BU 8 mit gleicher Belegnummer." } }
    ]
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="text-xs text-zinc-500 mb-4"><Link href="/" className="hover:underline">beleg2buchhaltung.de</Link> / <Link href="/blog" className="hover:underline">Blog</Link> / baumarkt-beleg-datev-belegtransfer</div>
      <h1 className="text-4xl font-bold tracking-tight">Baumarkt Beleg DATEV Belegtransfer</h1>
      <p className="mt-4 text-zinc-600 text-lg">Ob OBI, BAUHAUS, Hornbach, Toom oder Hagebau – alle Baumarkt-Belege kannst du mit beleg2buchhaltung.de in 5 Sekunden via DATEV Belegtransfer in Unternehmen Online importieren. Kein Abtippen mehr.</p>
      <div className="mt-8 border-2 border-dashed rounded-2xl p-8 bg-zinc-50 text-center">
        <p className="font-semibold">Teste direkt: PDF hier ablegen</p>
        <p className="text-sm text-zinc-500">PDF, JPG, PNG bis 10MB • DSGVO-konform verarbeitet in Deutschland</p>
        <div className="mt-4 flex gap-2 justify-center">
          <Link href="/" className="bg-black text-white px-5 py-2 rounded-full text-sm">Zum DATEV-CSV Converter →</Link>
        </div>
      </div>
      <div className="mt-12 prose prose-zinc">

        <h2>Alle Baumärkte im Vergleich: So unterscheiden sich die Belege</h2>
        <p>Jeder Baumarkt druckt anders, DATEV will aber immer das Gleiche: Belegfeld1, Belegdatum, Konto, BU, Brutto.</p>
        <ul>
          <li><strong>OBI:</strong> Belegnummer als OB-884729 unten, Datum als 28.08.2025, Lieferant OBI Markt.</li>
          <li><strong>BAUHAUS:</strong> BH-992341 unten rechts sehr klein, oft 19% und 7% gemischt.</li>
          <li><strong>Hornbach:</strong> HB-112093 oder Rg. Nr. HB-..., Datum mit Uhrzeit, oft 2 Seiten bei Firmenrechnung.</li>
          <li><strong>Toom:</strong> Toom Belegnummer als 1234/5678, Datum als 28.08.2025, oft ohne OB/BH Prefix.</li>
          <li><strong>Hagebau & Globus:</strong> Hagebau R-Nr. 992341, Globus Baumarkt mit Globus Logo oben.</li>
        </ul>
        <p>Unsere KI wurde mit 5000+ echten Belegen aller Baumärkte trainiert und erkennt automatisch welcher Markt es ist und wo die Nummer steht.</p>


        <h2>Kontierung für Baumarkt: Einheitlich SKR03 3400</h2>
        <p>Egal welcher Baumarkt: Für Handwerker immer <strong>Konto 3400 Bau- und Rohstoffe</strong>, BU 9 für 19%, BU 8 für 7% bei Garten. Gegenkonto 1600 Kasse bei Bar, 1200 Bank bei EC. Belegfeld1 = OB-/BH-/HB-Nummer. So importiert DATEV ohne Fehler.</p>

        <h2>DATEV-CSV Format (EXTF 700)</h2>
        <p>Das Format für DATEV Unternehmen Online ist standardisiert. beleg2buchhaltung.de erzeugt eine EXTF-Datei mit 21 Feldern, die du 1:1 im Belegtransfer hochladen kannst.</p>
        <pre className="text-xs bg-black text-green-400 p-4 rounded-xl overflow-auto">EXTF;700;21;Belegfeld1;Belegdatum;Konto;Gegenkonto;BU;Brutto;Belegtext\n;OB-884729;28082025;3400;1600;9;127,45;OBI\n;BH-992341;28082025;3400;1600;9;89,90;BAUHAUS</pre>
        <p className="text-xs text-zinc-500 mt-2">Belegfeld1 = Rechnungsnummer, Belegdatum im Format DDMMYYYY, Konto 3400, Gegenkonto 1600, BU 9 für 19% Vorsteuer. Bei gemischten Steuersätzen erzeugen wir zwei Zeilen mit BU 9 und BU 8.</p>
        <h2>Häufige Fehler die wir automatisch korrigieren</h2>
        <ul>
          <li><strong>Datum mit Punkten:</strong> Auf dem Bon steht 28.08.2025 – DATEV braucht 28082025. Wir wandeln um.</li>
          <li><strong>Brutto mit Leerzeichen:</strong> 127,45 € wird zu 127,45 für DATEV.</li>
          <li><strong>Falsches Konto:</strong> Viele buchen Baumarkt auf 4000. Korrekt für Handwerker ist 3400 Bau- und Rohstoffe, damit die BWA stimmt.</li>
          <li><strong>Belegnummer vergessen:</strong> Ohne Belegfeld1 meckert DATEV. Wir lesen BH-/OB-/HB-Nummern automatisch aus.</li>
        </ul>
        <h2>FAQ</h2>
        <h3>Funktioniert Belegtransfer für alle Baumärkte?</h3>
        <p>Ja. OBI, BAUHAUS, Hornbach, Toom, Hagebau, Globus Baumarkt, IKEA. Unsere KI erkennt alle. PDF hochladen, CSV in Unternehmen Online importieren.</p>
        <h3>Welche Belegnummer bei welchem Baumarkt?</h3>
        <p>OBI: OB-Nummer, BAUHAUS: BH-Nummer, Hornbach: HB-Nummer, Toom: Nummer ohne Prefix. Wir lesen alle automatisch als Belegfeld1.</p>
        <h3>Mischbelege mit 19% und 7% bei Baumarkt?</h3>
        <p>Ja, besonders BAUHAUS und Toom haben 19% und 7% gemischt. Wir erzeugen zwei Zeilen BU 9 und BU 8 mit gleicher Belegnummer.</p>
      </div>
      <div className="mt-12 border-t pt-8 flex gap-3">
        <Link href="/blog" className="border px-4 py-2 rounded-full text-sm">← Alle Anleitungen</Link>
        <Link href="/" className="bg-black text-white px-4 py-2 rounded-full text-sm">Zum Converter</Link>
      </div>
    </div>
  )
}
