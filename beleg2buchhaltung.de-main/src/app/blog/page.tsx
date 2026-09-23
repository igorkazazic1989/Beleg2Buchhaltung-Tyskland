'use client'
import { useState } from 'react'
import Link from 'next/link'

const BLOG_POSTS = [
  "bauhaus-beleg-zu-datev-csv","bauhaus-rechnung-datev-importieren","bauhaus-rechnung-pdf-zu-datev","bauhaus-rechnung-skr03-kontieren","baumarkt-beleg-datev-belegtransfer","baumarkt-rechnung-automatisch-datev","baumarkt-rechnung-datev-unternehmen-online-hochladen","globus-baumarkt-rechnung-datev-importieren","hagebau-rechnung-datev-importieren","handwerker-baumarkt-rechnung-datev-importieren","hornbach-beleg-datev-csv-umwandeln","hornbach-rechnung-19-mwst-datev","hornbach-rechnung-in-datev-importieren","ikea-rechnung-datev-importieren-handwerker","obi-beleg-zu-datev-csv","obi-hornbach-ikea-datev","obi-rechnung-in-datev-importieren","obi-rechnung-pdf-in-datev-csv-umwandeln","obi-rechnung-skr03-3400-buchen","toom-beleg-datev-csv-handwerker","toom-rechnung-19-prozent-datev","toom-rechnung-in-datev-importieren","datev-beleg2buchhaltung-format","bauhaus-beleg-datev-belegtransfer",
]
const EXAMPLES = {
  obi: { date: "28.08.2025", lieferant: "OBI Markt", brutto: "127,45 €", nummer: "OB-884729", csv: "EXTF;700;21;Belegfeld1;Belegdatum;Konto;Gegenkonto;BU;Brutto;...\n;OB-884729;28.08.2025;3400;1600;9;127,45;..." },
  bauhaus: { date: "01.09.2025", lieferant: "BAUHAUS", brutto: "342,90 €", nummer: "BH-992341", csv: "EXTF;700;21;Belegfeld1;Belegdatum;Konto;Gegenkonto;BU;Brutto;...\n;BH-992341;01.09.2025;3400;1600;9;342,90;..." },
  hornbach: { date: "15.08.2025", lieferant: "Hornbach", brutto: "89,90 €", nummer: "HB-112093", csv: "EXTF;700;21;Belegfeld1;Belegdatum;Konto;Gegenkonto;BU;Brutto;...\n;HB-112093;15.08.2025;3400;1600;9;89,90;..." },
}
export default function BlogPage() {
  const [active, setActive] = useState<keyof typeof EXAMPLES | null>("obi")
  const data = active? EXAMPLES[active] : null
  const [filter, setFilter] = useState("alle")
  const filtered = BLOG_POSTS.filter(s => filter==="alle"? true : s.includes(filter))
  const downloadCSV = () => {
    if(!data) return
    const blob = new Blob([data.csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `datev-${data.nummer}.csv`
    a.click()
  }
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="text-xs text-zinc-500 mb-6"><Link href="/" className="hover:underline">beleg2buchhaltung.de</Link> / Blog</div>
        <div className="text-center py-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Baumarkt-Beleg in 5 Sekunden zu DATEV-CSV</h1>
          <p className="mt-4 text-zinc-600 max-w-2xl mx-auto">Wähle ein Beispiel oder lade deine eigene Rechnung hoch. Direkt hier im Blog testen.</p>
          <div className="mt-8 max-w-3xl mx-auto border-2 border-dashed border-zinc-300 rounded- p-8 bg-zinc-50/50">
            <div className="flex flex-col items-center">
              <p className="font-semibold">PDF hier ablegen oder klicken</p>
              <p className="text-xs text-zinc-500">PDF, JPG, PNG bis 10MB</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button onClick={()=>setActive('obi')} className={`border px-5 py-2 rounded-full text-sm ${active==='obi'?'bg-black text-white':'bg-white'}`}>OBI Beispiel</button>
                <button onClick={()=>setActive('bauhaus')} className={`border px-5 py-2 rounded-full text-sm ${active==='bauhaus'?'bg-black text-white':'bg-white'}`}>BAUHAUS Beispiel</button>
                <button onClick={()=>setActive('hornbach')} className={`border px-5 py-2 rounded-full text-sm ${active==='hornbach'?'bg-black text-white':'bg-white'}`}>Hornbach Beispiel</button>
              </div>
            </div>
          </div>
        </div>
        {data && (
          <div className="border rounded- overflow-hidden mb-16">
            <div className="grid md:grid-cols-3 divide-y md:divide-x">
              <div className="p-5"><h3 className="text-xs uppercase text-zinc-500 font-semibold mb-3">Parsed</h3><div className="text-sm bg-zinc-950 text-white p-3 rounded-xl font-mono"><div>{data.lieferant}</div><div>{data.brutto}</div><div>Belegfeld1: {data.nummer}</div><div>SKR03: 3400</div></div></div>
              <div className="p-5"><h3 className="text-xs uppercase text-zinc-500 font-semibold mb-3">DATEV-CSV</h3><pre className="text- bg-black text-green-400 p-3 rounded-xl overflow-auto">{data.csv}</pre><button onClick={downloadCSV} className="mt-3 w-full bg-green-600 text-white py-2.5 rounded-full text-sm">DATEV-CSV herunterladen</button></div>
            </div>
          </div>
        )}
        <div className="flex flex-wrap gap-2 mb-8 border-b pb-6">{["alle","obi","bauhaus","hornbach","toom","ikea","globus","hagebau"].map(f=>(<button key={f} onClick={()=>setFilter(f)} className={`px-4 py-1.5 rounded-full text-sm border capitalize ${filter===f? 'bg-black text-white border-black' : 'bg-white hover:bg-zinc-100'}`}>{f}</button>))}</div>
        <h2 className="text-2xl font-bold">Alle Anleitungen ({filtered.length})</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4">{filtered.map(slug=>(<Link key={slug} href={`/blog/${slug}`} className="group border rounded-2xl p-5 hover:border-black bg-white"><div className="text- tracking-widest opacity-60 font-bold">BAUMARKT • DATEV • {slug.split('-')[0].toUpperCase()}</div><div className="font-medium mt-2 leading-tight group-hover:underline">{slug.replace(/-/g,' ')}</div><div className="text-xs mt-3 text-zinc-500">Anleitung lesen →</div></Link>))}</div>
      </div>
    </div>
  )
}
