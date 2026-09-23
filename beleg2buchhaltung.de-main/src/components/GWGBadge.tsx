// src/components/GWGBadge.tsx
import { kategorisiertePosition } from '@/lib/gwg'

export function GWGBadge({ item }: { item: kategorisiertePosition }) {
  const color = item.kategorie === 'UNTER_250' ? 'bg-gray-100 border-gray-300' 
    : item.kategorie === 'GWG_250_800' ? 'bg-green-100 border-green-500' 
    : 'bg-orange-100 border-orange-500'
  
  const label = item.kategorie === 'UNTER_250' ? `UNTER 250€ → ${item.konto} Betriebsbedarf` 
    : item.kategorie === 'GWG_250_800' ? `GWG 250-800€ → ${item.konto} Sofortabschreibung §6 Abs2` 
    : `>800€ → 0${item.konto} AfA ${item.afaJahre}J = ${item.afaMonatlich}€/Monat`

  return (
    <div className={`border-l-4 p-3 mb-2 rounded ${color} text-sm`}>
      <div className="font-bold">{item.beschreibung} – {item.netto.toFixed(2)}€ netto / {item.brutto.toFixed(2)}€ brutto</div>
      <div>{label}</div>
      <div className="text-xs opacity-70">{item.text}</div>
    </div>
  )
}
