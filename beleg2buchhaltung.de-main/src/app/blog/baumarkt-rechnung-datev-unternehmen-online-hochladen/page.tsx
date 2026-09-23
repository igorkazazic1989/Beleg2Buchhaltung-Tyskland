import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = {
  title: "Baumarkt Rechnung DATEV Unternehmen Online hochladen | So geht's",
  description: "Baumarkt Rechnung in DATEV Unternehmen Online hochladen: Anleitung für OBI, BAUHAUS, Hornbach. DATEV-CSV Generator, Belegtransfer in 10 Sekunden.",
  keywords: ["baumarkt-rechnung-datev-unternehmen-online-hochladen", "DATEV", "Baumarkt", "SKR03 3400", "19% MwSt", "DATEV Unternehmen Online"],
  alternates: { canonical: "https://beleg2buchhaltung.de/blog/baumarkt-rechnung-datev-unternehmen-online-hochladen" },
  openGraph: { title: "Baumarkt Rechnung DATEV Unternehmen Online hochladen | So geht's", description: "Baumarkt Rechnung in DATEV Unternehmen Online hochladen: Anleitung für OBI, BAUHAUS, Hornbach. DATEV-CSV Generator, Belegtransfer in 10 Sekunden.", url: "https://beleg2buchhaltung.de/blog/baumarkt-rechnung-datev-unternehmen-online-hochladen", siteName: "beleg2buchhaltung.de", locale: "de_DE", type: "article" },
}
export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Wie lade ich Baumarkt Rechnung in Unternehmen Online hoch?", "acceptedAnswer": { "@type": "Answer", "text": "Nicht direkt PDF hochladen. Erst bei beleg2buchhaltung.de in DATEV-CSV umwandeln, dann CSV in Unternehmen Online unter Belege → Belegtransfer importieren. PDF wird automatisch verknüpft." } },
      { "@type": "Question", "name": "Kann ich mehrere Baumarkt Belege gleichzeitig hochladen?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, bis zu 3 pro Upload, wir erzeugen Sammel-CSV. Für mehr nutze Abo mit unbegrenzt Uploads." } },
      { "@type": "Question", "name": "Wo finde ich Belegtransfer in Unternehmen Online?", "acceptedAnswer": { "@type": "Answer", "text": "Login → Belege → Belegtransfer → Import. Dort CSV auswählen. DATEV erkennt Konto 3400, BU 9 automatisch." } }
    ]
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="text-xs text-zinc-500 mb-4"><Link href="/" className="hover:underline">beleg2buchhaltung.de</Link> / <Link href="/blog" className="hover:underline">Blog</Link> / baumarkt-rechnung-datev-unternehmen-online-hochladen</div>
      <h1 className="text-4xl font-bold tracking-tight">Baumarkt Rechnung DATEV Unternehmen Online hochladen</h1>
      <p className="mt-4 text-zinc-600 text-lg">Du willst Baumarkt-Rechnungen in DATEV Unternehmen Online hochladen, aber der Upload akzeptiert nur CSV, nicht PDF? Genau dafür ist beleg2buchhaltung.de: PDF hochladen, CSV herunterladen, in Unternehmen Online hochladen – fertig.</p>
      <div className="mt-8 border-2 border-dashed rounded-2xl p-8 bg-zinc-50 text-center">
        <p className="font-semibold">Teste direkt: PDF hier ablegen</p>
        <p className="text-sm text-zinc-500">PDF, JPG, PNG bis 10MB • DSGVO-konform verarbeitet in Deutschland</p>
        <div className="mt-4 flex gap-2 justify-center">
          <Link href="/" className="bg-black text-white px-5 py-2 rounded-full text-sm">Zum DATEV-CSV Converter →</Link>
        </div>
      </div>
      <div className="mt-12 prose prose-zinc">

        <h2>Schritt für Schritt: Baumarkt in Unternehmen Online hochladen</h2>
        <p><strong>Schritt 1:</strong> BAUHAUS, OBI, Hornbach PDF bei beleg2buchhaltung.de hochladen. <strong>Schritt 2:</strong> DATEV-CSV herunterladen. <strong>Schritt 3:</strong> In DATEV Unternehmen Online einloggen → Belege → Belegtransfer → Import → CSV auswählen. <strong>Schritt 4:</strong> DATEV zeigt Vorschau mit Konto 3400, BU 9, Belegfeld1. Auf Importieren klicken.</p>
        <p>Der Beleg ist dann mit dem Original-PDF verknüpft und GoBD-konform abgelegt. Kein manuelles Abtippen, kein Konto suchen. Funktioniert für alle Baumärkte: OBI OB-Nummer, BAUHAUS BH-Nummer, Hornbach HB-Nummer, Toom ohne Prefix.</p>
        <p><strong>Tipp:</strong> Lade bis zu 3 Belege gleichzeitig hoch – wir erzeugen eine Sammel-CSV für den Belegtransfer.</p>


        <h2>Was DATEV Unternehmen Online braucht</h2>
        <p>Unternehmen Online will EXTF 700 mit 21 Feldern: Belegfeld1 = Rechnungsnummer, Belegdatum als DDMMYYYY, Konto 3400, Gegenkonto 1600/1200, BU 9 für 19%, Brutto als 127,45. Unsere CSV hat genau dieses Format. Keine Anpassung nötig.</p>

        <h2>DATEV-CSV Format (EXTF 700)</h2>
        <p>Das Format für DATEV Unternehmen Online ist standardisiert. beleg2buchhaltung.de erzeugt eine EXTF-Datei mit 21 Feldern, die du 1:1 im Belegtransfer hochladen kannst.</p>
        <pre className="text-xs bg-black text-green-400 p-4 rounded-xl overflow-auto">EXTF;700;21;Belegfeld1;Belegdatum;Konto;Gegenkonto;BU;Brutto;Belegtext;Beleginfo\n;HB-112093;28082025;3400;1600;9;127,45;Hornbach;Original-PDF</pre>
        <p className="text-xs text-zinc-500 mt-2">Belegfeld1 = Rechnungsnummer, Belegdatum im Format DDMMYYYY, Konto 3400, Gegenkonto 1600, BU 9 für 19% Vorsteuer. Bei gemischten Steuersätzen erzeugen wir zwei Zeilen mit BU 9 und BU 8.</p>
        <h2>Häufige Fehler die wir automatisch korrigieren</h2>
        <ul>
          <li><strong>Datum mit Punkten:</strong> Auf dem Bon steht 28.08.2025 – DATEV braucht 28082025. Wir wandeln um.</li>
          <li><strong>Brutto mit Leerzeichen:</strong> 127,45 € wird zu 127,45 für DATEV.</li>
          <li><strong>Falsches Konto:</strong> Viele buchen Baumarkt auf 4000. Korrekt für Handwerker ist 3400 Bau- und Rohstoffe, damit die BWA stimmt.</li>
          <li><strong>Belegnummer vergessen:</strong> Ohne Belegfeld1 meckert DATEV. Wir lesen BH-/OB-/HB-Nummern automatisch aus.</li>
        </ul>
        <h2>FAQ</h2>
        <h3>Wie lade ich Baumarkt Rechnung in Unternehmen Online hoch?</h3>
        <p>Nicht direkt PDF hochladen. Erst bei beleg2buchhaltung.de in DATEV-CSV umwandeln, dann CSV in Unternehmen Online unter Belege → Belegtransfer importieren. PDF wird automatisch verknüpft.</p>
        <h3>Kann ich mehrere Baumarkt Belege gleichzeitig hochladen?</h3>
        <p>Ja, bis zu 3 pro Upload, wir erzeugen Sammel-CSV. Für mehr nutze Abo mit unbegrenzt Uploads.</p>
        <h3>Wo finde ich Belegtransfer in Unternehmen Online?</h3>
        <p>Login → Belege → Belegtransfer → Import. Dort CSV auswählen. DATEV erkennt Konto 3400, BU 9 automatisch.</p>
      </div>
      <div className="mt-12 border-t pt-8 flex gap-3">
        <Link href="/blog" className="border px-4 py-2 rounded-full text-sm">← Alle Anleitungen</Link>
        <Link href="/" className="bg-black text-white px-4 py-2 rounded-full text-sm">Zum Converter</Link>
      </div>
    </div>
  )
}
