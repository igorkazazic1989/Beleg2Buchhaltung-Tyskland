import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = {
  title: "DATEV EXTF-700-Format erklärt | Belegfeld1, BU, Brutto",
  description: "Das DATEV EXTF-700-Format für den Belegtransfer erklärt: 21 Felder, Belegfeld1, BU-Codes, Bruttoformat. So erzeugt Beleg2Buchhaltung automatisch die passende CSV für Unternehmen Online.",
  keywords: ["EXTF 700 Format", "DATEV Belegtransfer", "DATEV", "Baumarkt", "SKR03 3400", "19% MwSt", "DATEV Unternehmen Online"],
  alternates: { canonical: "https://beleg2buchhaltung.de/blog/datev-beleg2buchhaltung-format" },
  openGraph: { title: "DATEV EXTF-700-Format erklärt | Belegfeld1, BU, Brutto", description: "Das DATEV EXTF-700-Format für den Belegtransfer erklärt: 21 Felder, Belegfeld1, BU-Codes, Bruttoformat. So erzeugt Beleg2Buchhaltung automatisch die passende CSV für Unternehmen Online.", url: "https://beleg2buchhaltung.de/blog/datev-beleg2buchhaltung-format", siteName: "beleg2buchhaltung.de", locale: "de_DE", type: "article" },
}
export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Was ist EXTF 700 Format?", "acceptedAnswer": { "@type": "Answer", "text": "Extended Transfer Format 700 von DATEV. Standard für Belegtransfer mit 21 Feldern, Semikolon getrennt. Header + Buchungszeilen. Für Baumarkt: Belegfeld1, Datum, Konto 3400, BU 9, Brutto." } },
      { "@type": "Question", "name": "Was ist Belegfeld1 in DATEV?", "acceptedAnswer": { "@type": "Answer", "text": "Rechnungsnummer, bei Baumarkt OB-/BH-/HB-Nummer. Pflichtfeld, max 36 Zeichen. Wird für Belegverknüpfung und GoBD gebraucht. Ohne Belegfeld1 kein Import." } },
      { "@type": "Question", "name": "Welcher BU bei Baumarkt?", "acceptedAnswer": { "@type": "Answer", "text": "BU 9 für 19% Vorsteuer Standard, BU 8 für 7% bei Garten/Pflanzen. Bei Mischbelegen beide mit gleicher Belegnummer." } }
    ]
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="text-xs text-zinc-500 mb-4"><Link href="/" className="hover:underline">beleg2buchhaltung.de</Link> / <Link href="/blog" className="hover:underline">Blog</Link> / datev-beleg2buchhaltung-format</div>
      <h1 className="text-4xl font-bold tracking-tight">DATEV EXTF-700-Format erklärt</h1>
      <p className="mt-4 text-zinc-600 text-lg">DATEV Belegtransfer braucht das EXTF-700-Format mit genau 21 Feldern. Hier erklären wir den Aufbau – und wie Beleg2Buchhaltung das automatisch für Baumarkt-Belege erzeugt, ohne dass du das Format manuell bauen musst.</p>
      <div className="mt-8 border-2 border-dashed rounded-2xl p-8 bg-zinc-50 text-center">
        <p className="font-semibold">Teste direkt: PDF hier ablegen</p>
        <p className="text-sm text-zinc-500">PDF, JPG, PNG bis 10MB • DSGVO-konform verarbeitet in Deutschland</p>
        <div className="mt-4 flex gap-2 justify-center">
          <Link href="/" className="bg-black text-white px-5 py-2 rounded-full text-sm">Zum DATEV-CSV Converter →</Link>
        </div>
      </div>
      <div className="mt-12 prose prose-zinc">

        <h2>EXTF 700 Aufbau: 21 Felder erklärt</h2>
        <p>EXTF = Extended Transfer Format. Zeile 1 ist Header: <code>EXTF;700;21;Belegfeld1;Belegdatum;Konto;Gegenkonto;BU;Brutto;...</code>. Zeile 2+ sind Buchungen: <code>;OB-884729;28082025;3400;1600;9;127,45;OBI;</code>. Wichtig: Mit Semikolon getrennt, Brutto mit Komma, Datum ohne Punkte.</p>
        <p>Für Baumarkt-Belege sind diese Felder Pflicht:</p>
        <ul>
          <li><strong>Belegfeld1:</strong> OB-/BH-/HB-Nummer, max 36 Zeichen. Ohne das meckert DATEV.</li>
          <li><strong>Belegdatum:</strong> DDMMYYYY, aus 28.08.2025 wird 28082025.</li>
          <li><strong>Konto:</strong> 3400 für Handwerker Baumaterial, nicht 4000.</li>
          <li><strong>Gegenkonto:</strong> 1600 Kasse oder 1200 Bank.</li>
          <li><strong>BU:</strong> 9 für 19% Vorsteuer, 8 für 7%. Bei Baumarkt oft beide.</li>
          <li><strong>Brutto:</strong> 127,45 mit Komma, ohne Euro-Zeichen.</li>
        </ul>


        <h2>Belegfeld1 und BU: Häufige Fehler</h2>
        <p>Viele CSV Tools lassen Belegfeld1 leer – DATEV lehnt ab. Wir füllen immer OB-/BH-/HB-Nummer. BU vergessen: Ohne BU 9 bucht DATEV ohne Vorsteuer, du verlierst 19%. Wir setzen BU 9 automatisch bei 19% und BU 8 bei 7%. Bei Mischbelegen erzeugen wir zwei Zeilen.</p>

        <h2>DATEV-CSV Format (EXTF 700)</h2>
        <p>Das Format für DATEV Unternehmen Online ist standardisiert. beleg2buchhaltung.de erzeugt eine EXTF-Datei mit 21 Feldern, die du 1:1 im Belegtransfer hochladen kannst.</p>
        <pre className="text-xs bg-black text-green-400 p-4 rounded-xl overflow-auto">EXTF;700;21;Belegfeld1;Belegdatum;Konto;Gegenkonto;BU;Brutto;Belegtext;KOST;Bewegungstyp\n;OB-884729;28082025;3400;1600;9;127,45;OBI Markt;;1</pre>
        <p className="text-xs text-zinc-500 mt-2">Belegfeld1 = Rechnungsnummer, Belegdatum im Format DDMMYYYY, Konto 3400, Gegenkonto 1600, BU 9 für 19% Vorsteuer. Bei gemischten Steuersätzen erzeugen wir zwei Zeilen mit BU 9 und BU 8.</p>
        <h2>Häufige Fehler die wir automatisch korrigieren</h2>
        <ul>
          <li><strong>Datum mit Punkten:</strong> Auf dem Bon steht 28.08.2025 – DATEV braucht 28082025. Wir wandeln um.</li>
          <li><strong>Brutto mit Leerzeichen:</strong> 127,45 € wird zu 127,45 für DATEV.</li>
          <li><strong>Falsches Konto:</strong> Viele buchen Baumarkt auf 4000. Korrekt für Handwerker ist 3400 Bau- und Rohstoffe, damit die BWA stimmt.</li>
          <li><strong>Belegnummer vergessen:</strong> Ohne Belegfeld1 meckert DATEV. Wir lesen BH-/OB-/HB-Nummern automatisch aus.</li>
        </ul>
        <h2>FAQ</h2>
        <h3>Was ist EXTF 700 Format?</h3>
        <p>Extended Transfer Format 700 von DATEV. Standard für Belegtransfer mit 21 Feldern, Semikolon getrennt. Header + Buchungszeilen. Für Baumarkt: Belegfeld1, Datum, Konto 3400, BU 9, Brutto.</p>
        <h3>Was ist Belegfeld1 in DATEV?</h3>
        <p>Rechnungsnummer, bei Baumarkt OB-/BH-/HB-Nummer. Pflichtfeld, max 36 Zeichen. Wird für Belegverknüpfung und GoBD gebraucht. Ohne Belegfeld1 kein Import.</p>
        <h3>Welcher BU bei Baumarkt?</h3>
        <p>BU 9 für 19% Vorsteuer Standard, BU 8 für 7% bei Garten/Pflanzen. Bei Mischbelegen beide mit gleicher Belegnummer.</p>
      </div>
      <div className="mt-12 border-t pt-8 flex gap-3">
        <Link href="/blog" className="border px-4 py-2 rounded-full text-sm">← Alle Anleitungen</Link>
        <Link href="/" className="bg-black text-white px-4 py-2 rounded-full text-sm">Zum Converter</Link>
      </div>
    </div>
  )
}
