// Typed models for the YahooFinance SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Download {
}

export interface DownloadLoadMatch {
  id: string
}

export interface Market {
  finance?: Record<string, any>
}

export interface MarketLoadMatch {
  region: string
}

export interface Screener {
  finance?: Record<string, any>
  offset?: number
  query?: Record<string, any>
  quote_type?: string
  size?: number
  sort_field?: string
  sort_type?: string
}

export interface ScreenerCreateData {
  finance?: Record<string, any>
  offset?: number
  query?: Record<string, any>
  quote_type?: string
  size?: number
  sort_field?: string
  sort_type?: string
}

export interface Search {
  new?: any[]
  quote?: any[]
}

export interface SearchListMatch {
  new?: any[]
  quote?: any[]
}

export interface Ticker {
  chart?: Record<string, any>
  finance?: Record<string, any>
  option_chain?: Record<string, any>
  quote_response?: Record<string, any>
  quote_summary?: Record<string, any>
  spark?: Record<string, any>
}

export interface TickerLoadMatch {
  symbol?: string
}

