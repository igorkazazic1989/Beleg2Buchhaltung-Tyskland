export interface ParsedInvoice {
  supplier_name: string | null
  invoice_number: string | null
  invoice_date: string | null
  amount_net: number | null
  vat_amount: number | null
  vat_rate: number | null
  amount_gross: number | null
  mwst_7_brutto: number | null
  mwst_19_brutto: number | null
  split_7_brutto: number | null
  split_19_brutto: number | null
  skr03_account: string
  counter_account: string
  bu: string
  datev_csv: string
  detected_language: 'de' | 'sv' | 'en'
}

export interface ParseResponse {
  success: boolean
  data?: ParsedInvoice
  error?: string
}
