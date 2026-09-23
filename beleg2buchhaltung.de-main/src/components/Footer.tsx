// src/components/Footer.tsx
import Link from "next/link"

export default function Footer(){
  return (
    <footer className="bg-zinc-50 border-t mt-20">
      <div className="mx-auto max-w-6xl px-6 py-12 grid md:grid-cols-3 gap-10 text-sm">
        
        <div>
          <div className="font-black">beleg2buchhaltung.de</div>
          <p className="mt-3 text-zinc-500">
            Baumarkt-Belege in 5 Sekunden zu DATEV-CSV. Für Handwerker, Hausmeister & Steuerberater.
          </p>
        </div>

        <div>
          <div className="font-semibold">Produkt</div>
          <div className="mt-3 flex flex-col gap-2 text-zinc-600">
            <Link href="/blog" className="hover:underline">Blog</Link>
          </div>
        </div>

        <div>
          <div className="font-semibold">Rechtliches (DSGVO)</div>
          <div className="mt-3 flex flex-col gap-2 text-zinc-600">
            <Link href="/impressum" className="hover:underline">Impressum</Link>
            <Link href="/datenschutz" className="hover:underline">Datenschutz</Link>
            <Link href="/terms" className="hover:underline">AGB</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
