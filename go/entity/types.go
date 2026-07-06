// Typed models for the YahooFinance SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Download is the typed data model for the download entity.
type Download struct {
}

// DownloadLoadMatch is the typed request payload for Download.LoadTyped.
type DownloadLoadMatch struct {
	Id string `json:"id"`
}

// Market is the typed data model for the market entity.
type Market struct {
	Finance *map[string]any `json:"finance,omitempty"`
}

// MarketLoadMatch is the typed request payload for Market.LoadTyped.
type MarketLoadMatch struct {
	Region string `json:"region"`
}

// Screener is the typed data model for the screener entity.
type Screener struct {
	Finance *map[string]any `json:"finance,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Query *map[string]any `json:"query,omitempty"`
	QuoteType *string `json:"quote_type,omitempty"`
	Size *int `json:"size,omitempty"`
	SortField *string `json:"sort_field,omitempty"`
	SortType *string `json:"sort_type,omitempty"`
}

// ScreenerCreateData is the typed request payload for Screener.CreateTyped.
type ScreenerCreateData struct {
	Finance *map[string]any `json:"finance,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Query *map[string]any `json:"query,omitempty"`
	QuoteType *string `json:"quote_type,omitempty"`
	Size *int `json:"size,omitempty"`
	SortField *string `json:"sort_field,omitempty"`
	SortType *string `json:"sort_type,omitempty"`
}

// Search is the typed data model for the search entity.
type Search struct {
	New *[]any `json:"new,omitempty"`
	Quote *[]any `json:"quote,omitempty"`
}

// SearchListMatch is the typed request payload for Search.ListTyped.
type SearchListMatch struct {
	New *[]any `json:"new,omitempty"`
	Quote *[]any `json:"quote,omitempty"`
}

// Ticker is the typed data model for the ticker entity.
type Ticker struct {
	Chart *map[string]any `json:"chart,omitempty"`
	Finance *map[string]any `json:"finance,omitempty"`
	OptionChain *map[string]any `json:"option_chain,omitempty"`
	QuoteResponse *map[string]any `json:"quote_response,omitempty"`
	QuoteSummary *map[string]any `json:"quote_summary,omitempty"`
	Spark *map[string]any `json:"spark,omitempty"`
}

// TickerLoadMatch is the typed request payload for Ticker.LoadTyped.
type TickerLoadMatch struct {
	Symbol string `json:"symbol"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
