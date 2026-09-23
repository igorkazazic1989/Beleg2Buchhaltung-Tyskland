export interface ParsedInvoice {
  supplier_name: string
  vat_id: string | null
  invoice_number: string | null
  invoice_date: string | null
  due_date: string | null
  amount_net: number | null
  vat_amount: number | null
  vat_rate: number | null
  amount_gross: number | null
  currency: 'EUR' | 'SEK' | null
  iban: string | null
  bic: string | null
  bankgiro: string | null
  plusgiro: string | null
  payment_reference: string | null
  detected_language: 'de' | 'sv' | 'en'
}

export interface ParseResponse {
  success: boolean
  data?: ParsedInvoice
  error?: string
}
