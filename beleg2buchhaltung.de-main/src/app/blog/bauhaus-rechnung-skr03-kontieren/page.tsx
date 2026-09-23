import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = {
  title: "BAUHAUS Rechnung SKR03 kontieren | 3400 richtig buchen",
  description: "BAUHAUS Rechnung SKR03 kontieren: Konto 3400 Bau- und Rohstoffe, BU 9 für 19% Vorsteuer, Gegenkonto 1600, Belegfeld1 BH-Nummer. So buchst du korrekt.",
  keywords: ["bauhaus-rechnung-skr03-kontieren", "DATEV", "Baumarkt", "SKR03 3400", "19% MwSt", "DATEV Unternehmen Online"],
  alternates: { canonical: "https://beleg2buchhaltung.de/blog/bauhaus-rechnung-skr03-kontieren" },
  openGraph: { title: "BAUHAUS Rechnung SKR03 kontieren | 3400 richtig buchen", description: "BAUHAUS Rechnung SKR03 kontieren: Konto 3400 Bau- und Rohstoffe, BU 9 für 19% Vorsteuer, Gegenkonto 1600, Belegfeld1 BH-Nummer. So buchst du korrekt.", url: "https://beleg2buchhaltung.de/blog/bauhaus-rechnung-skr03-kontieren", siteName: "beleg2buchhaltung.de", locale: "de_DE", type: "article" },
}
export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Auf welches Konto buche ich BAUHAUS in SKR03?", "acceptedAnswer": { "@type": "Answer", "text": "Für Handwerker auf 3400 Bau- und Rohstoffe, nicht 4000. 3400 ist für Baumaterial für Baustellen. 4000 ist nur für Händler. Mit 3400 stimmt die BWA und Baustellenabrechnung." } },
      { "@type": "Question", "name": "Welcher BU-Schlüssel bei BAUHAUS?", "acceptedAnswer": { "@type": "Answer", "text": "BU 9 für 19% Vorsteuer ist Standard bei BAUHAUS Werkzeug und Material. BU 8 für 7% bei Pflanzen, Erde, Garten. Bei Mischbelegen zwei Zeilen mit BU 9 und BU 8." } },
      { "@type": "Question", "name": "Was ist Belegfeld1 bei BAUHAUS?", "acceptedAnswer": { "@type": "Answer", "text": "Die BH-Nummer wie BH-992341 unten rechts auf dem Bon. Pflichtfeld in DATEV für die Belegverknüpfung. Ohne Belegfeld1 kannst du nicht importieren." } }
    ]
  }
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="text-xs text-zinc-500 mb-4"><Link href="/" className="hover:underline">beleg2buchhaltung.de</Link> / <Link href="/blog" className="hover:underline">Blog</Link> / bauhaus-rechnung-skr03-kontieren</div>
      <h1 className="text-4xl font-bold tracking-tight">BAUHAUS Rechnung SKR03 kontieren</h1>
      <p className="mt-4 text-zinc-600 text-lg">BAUHAUS falsch zu kontieren kostet dich Vorsteuer und eine falsche BWA. Hier lernst du wie du BAUHAUS Belege korrekt in SKR03 buchst – und wie beleg2buchhaltung.de es automatisch für dich macht.</p>
      <div className="mt-8 border-2 border-dashed rounded-2xl p-8 bg-zinc-50 text-center">
        <p className="font-semibold">Teste direkt: PDF hier ablegen</p>
        <p className="text-sm text-zinc-500">PDF, JPG, PNG bis 10MB • DSGVO-konform verarbeitet in Deutschland</p>
        <div className="mt-4 flex gap-2 justify-center">
          <Link href="/" className="bg-black text-white px-5 py-2 rounded-full text-sm">Zum DATEV-CSV Converter →</Link>
        </div>
      </div>
      <div className="mt-12 prose prose-zinc">

        <h2>BAUHAUS richtig kontieren: 3400 statt 4000</h2>
        <p>Viele Steuerberater buchen BAUHAUS automatisch auf <strong>4000 Material</strong>. Für Handwerker ist das falsch. Korrekt ist <strong>3400 Bau- und Rohstoffe</strong>, weil BAUHAUS Material für Baustellen ist, nicht Handelsware. 3400 fließt in die Bauleistungs-BWA, 4000 nicht. Das macht einen Unterschied bei der Baustellen-Nachkalkulation.</p>
        <p>BAUHAUS hat oft Mischbelege: Zement, Schrauben mit 19% und Pflanzen, Erde mit 7%. Dann brauchst du <strong>zwei Buchungszeilen</strong>: 3400 mit BU 9 für 19% und 3400 mit BU 8 für 7%. Gleiche Belegnummer BH-xxx, DATEV fasst sie zusammen. Manuell ist das aufwändig – unsere KI macht das automatisch.</p>


        <h2>SKR03 Kontierung für BAUHAUS im Detail</h2>
        <ul>
          <li><strong>Konto:</strong> 3400 Bau- und Rohstoffe (für Handwerker), 4000 nur wenn du Händler bist</li>
          <li><strong>BU-Schlüssel:</strong> 9 = 19% Vorsteuer, 8 = 7% Vorsteuer bei Gartenartikeln. 9 ist Standard bei BAUHAUS.</li>
          <li><strong>Gegenkonto:</strong> 1600 Kasse bei Barzahlung, 1200 Bank bei EC/Überweisung. Steht auf dem Bon unter Zahlungsart.</li>
          <li><strong>Belegfeld1:</strong> BH-Nummer wie BH-992341. Pflichtfeld für DATEV, sonst meckert Belegtransfer.</li>
          <li><strong>Belegdatum:</strong> 28082025 Format, ohne Punkte. Aus 28.08.2025 auf dem Bon.</li>
        </ul>

        <h2>DATEV-CSV Format (EXTF 700)</h2>
        <p>Das Format für DATEV Unternehmen Online ist standardisiert. beleg2buchhaltung.de erzeugt eine EXTF-Datei mit 21 Feldern, die du 1:1 im Belegtransfer hochladen kannst.</p>
        <pre className="text-xs bg-black text-green-400 p-4 rounded-xl overflow-auto">EXTF;700;21;Belegfeld1;Belegdatum;Konto;Gegenkonto;BU;Brutto;Belegtext\n;BH-992341;28082025;3400;1600;9;127,45;BAUHAUS\n;BH-992341;28082025;3400;1600;8;19,90;BAUHAUS-Pflanzen</pre>
        <p className="text-xs text-zinc-500 mt-2">Belegfeld1 = Rechnungsnummer, Belegdatum im Format DDMMYYYY, Konto 3400, Gegenkonto 1600, BU 9 für 19% Vorsteuer. Bei gemischten Steuersätzen erzeugen wir zwei Zeilen mit BU 9 und BU 8.</p>
        <h2>Häufige Fehler die wir automatisch korrigieren</h2>
        <ul>
          <li><strong>Datum mit Punkten:</strong> Auf dem Bon steht 28.08.2025 – DATEV braucht 28082025. Wir wandeln um.</li>
          <li><strong>Brutto mit Leerzeichen:</strong> 127,45 € wird zu 127,45 für DATEV.</li>
          <li><strong>Falsches Konto:</strong> Viele buchen Baumarkt auf 4000. Korrekt für Handwerker ist 3400 Bau- und Rohstoffe, damit die BWA stimmt.</li>
          <li><strong>Belegnummer vergessen:</strong> Ohne Belegfeld1 meckert DATEV. Wir lesen BH-/OB-/HB-Nummern automatisch aus.</li>
        </ul>
        <h2>FAQ</h2>
        <h3>Auf welches Konto buche ich BAUHAUS in SKR03?</h3>
        <p>Für Handwerker auf 3400 Bau- und Rohstoffe, nicht 4000. 3400 ist für Baumaterial für Baustellen. 4000 ist nur für Händler. Mit 3400 stimmt die BWA und Baustellenabrechnung.</p>
        <h3>Welcher BU-Schlüssel bei BAUHAUS?</h3>
        <p>BU 9 für 19% Vorsteuer ist Standard bei BAUHAUS Werkzeug und Material. BU 8 für 7% bei Pflanzen, Erde, Garten. Bei Mischbelegen zwei Zeilen mit BU 9 und BU 8.</p>
        <h3>Was ist Belegfeld1 bei BAUHAUS?</h3>
        <p>Die BH-Nummer wie BH-992341 unten rechts auf dem Bon. Pflichtfeld in DATEV für die Belegverknüpfung. Ohne Belegfeld1 kannst du nicht importieren.</p>
      </div>
      <div className="mt-12 border-t pt-8 flex gap-3">
        <Link href="/blog" className="border px-4 py-2 rounded-full text-sm">← Alle Anleitungen</Link>
        <Link href="/" className="bg-black text-white px-4 py-2 rounded-full text-sm">Zum Converter</Link>
      </div>
    </div>
  )
}
