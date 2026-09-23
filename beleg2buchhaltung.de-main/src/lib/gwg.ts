// src/lib/gwg.ts – DIN MOAT, 1 regel-motor, ingen AI
// Schwellen seit 2018: 250€, 800€, 1000€

export type GWGKategorie = 'UNTER_250' | 'GWG_250_800' | 'ANLAGE_UEBER_800'

export interface kategorisiertePosition {
  netto: number
  brutto: number
  beschreibung: string
  kategorie: GWGKategorie
  konto: number // SKR03
  konto04: number // SKR04
  afaMonatlich: number | null
  afaJahre: number | null
  bu: number
  text: string
}

export function kategorisierePosition(netto: number, beschreibung: string): kategorisiertePosition {
  const brutto = netto * 1.19
  let kategorie: GWGKategorie
  let konto: number
  let konto04: number
  let afaMonatlich: number | null = null
  let afaJahre: number | null = null

  if (netto <= 250) {
    kategorie = 'UNTER_250'
    konto = 4980 // Betriebsbedarf
    konto04 = 6815
  } else if (netto <= 800) {
    kategorie = 'GWG_250_800'
    konto = 4855 // Sofortabschreibung §6 Abs 2
    konto04 = 6260
  } else {
    kategorie = 'ANLAGE_UEBER_800'
    konto = 400 // Betriebs- und Geschäftsausstattung / 0400
    konto04 = 400
    // Vorschlag: Werkzeuge 3 Jahre, sonst 7 Jahre
    const isWerkzeug = /schrauber|pistole|bohrer|hammer|säge/i.test(beschreibung)
    afaJahre = isWerkzeug ? 3 : 7
    afaMonatlich = parseFloat((netto / (afaJahre * 12)).toFixed(2))
  }

  const text = kategorie === 'UNTER_250'
    ? `UNTER_250€ -> ${konto} nicht anlagepflichtig`
    : kategorie === 'GWG_250_800'
    ? `GWG 250-800€ Sofortabschreibung §6 Abs2 Konto ${konto}`
    : `>800€ AfA-pflichtig ${afaJahre}J = ${afaMonatlich}€/Monat Konto 0${konto}`

  return { netto, brutto, beschreibung, kategorie, konto, konto04, afaMonatlich, afaJahre, bu: 9, text }
}

export function kategorisiereBeleg(lineItems: { netto: number, beschreibung: string }[]): kategorisiertePosition[] {
  return lineItems.map(item => kategorisierePosition(item.netto, item.beschreibung))
}
