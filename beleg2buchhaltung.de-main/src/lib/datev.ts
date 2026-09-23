// src/lib/datev.ts – EXTF 700 mit GWG-Konto
import { kategorisiertePosition } from './gwg'

function toKomma(n: number): string {
  return n.toFixed(2).replace('.', ',')
}

export function generateEXTF(
  belegNr: string,
  belegdatum: string,
  lieferant: string,
  items: kategorisiertePosition[],
  gegenkonto: number = 1600
): string {
  const header = 'EXTF\t700\t21\tBelegfeld1\tBelegdatum\tKonto\tGegenkonto\tBU\tBrutto\tBelegtext'
  const rows = items.map(item => {
    const brutto = toKomma(item.brutto)
    const belegtext = `${lieferant} - ${item.beschreibung} - ${item.text}`.slice(0, 60).replace(/\t/g, ' ')
    const kontoStr = item.konto === 400 ? '0400' : String(item.konto)
    return `EXTF\t700\t21\t${belegNr}\t${belegdatum}\t${kontoStr}\t${gegenkonto}\t${item.bu}\t${brutto}\t${belegtext}`
  })
  return [header, ...rows].join('\n')
}
