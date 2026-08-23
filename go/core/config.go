package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "YahooFinance",
			"slug": "yahoo-finance",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://query1.finance.yahoo.com",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"download": map[string]any{},
				"market": map[string]any{},
				"screener": map[string]any{},
				"search": map[string]any{},
				"ticker": map[string]any{},
			},
		},
		"entity": map[string]any{
			"download": map[string]any{
				"fields": []any{},
				"name": "download",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "symbol",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "event",
											"orig": "event",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "1d",
											"kind": "query",
											"name": "interval",
											"orig": "interval",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "period1",
											"orig": "period1",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "period2",
											"orig": "period2",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v7/finance/download/{symbol}",
								"parts": []any{
									"v7",
									"finance",
									"download",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"symbol": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"event",
										"id",
										"interval",
										"period1",
										"period2",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"market": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "result",
						"type": "`$ARRAY`",
					},
				},
				"name": "market",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "US",
											"kind": "param",
											"name": "region",
											"orig": "region",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/finance/trending/{region}",
								"parts": []any{
									"v1",
									"finance",
									"trending",
									"{region}",
								},
								"select": map[string]any{
									"exist": []any{
										"region",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.finance`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"trending",
						},
					},
				},
			},
			"screener": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "offset",
						"short": "Offset for pagination",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "query",
						"short": "Query criteria",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "quoteType",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "result",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "size",
						"short": "Number of results to return",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "sortField",
						"short": "Field to sort by",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sortType",
						"type": "`$STRING`",
					},
				},
				"name": "screener",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/v1/finance/screener",
								"parts": []any{
									"v1",
									"finance",
									"screener",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.finance`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"search": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "news",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "quotes",
						"type": "`$ARRAY`",
					},
				},
				"name": "search",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 4,
											"kind": "query",
											"name": "news_count",
											"orig": "news_count",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 6,
											"kind": "query",
											"name": "quotes_count",
											"orig": "quotes_count",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/finance/search",
								"parts": []any{
									"v1",
									"finance",
									"search",
								},
								"select": map[string]any{
									"exist": []any{
										"news_count",
										"q",
										"quotes_count",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"ticker": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "error",
						"type": "`$NULL`",
					},
					map[string]any{
						"name": "result",
						"type": "`$ARRAY`",
					},
				},
				"name": "ticker",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "AAPL",
											"kind": "param",
											"name": "symbol",
											"orig": "symbol",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "event",
											"orig": "event",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "1d",
											"kind": "query",
											"name": "interval",
											"orig": "interval",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "period1",
											"orig": "period1",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "period2",
											"orig": "period2",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "range",
											"orig": "range",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v8/finance/chart/{symbol}",
								"parts": []any{
									"v8",
									"finance",
									"chart",
									"{symbol}",
								},
								"select": map[string]any{
									"exist": []any{
										"event",
										"interval",
										"period1",
										"period2",
										"range",
										"symbol",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.chart`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "5m",
											"kind": "query",
											"name": "interval",
											"orig": "interval",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "1d",
											"kind": "query",
											"name": "range",
											"orig": "range",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "symbol",
											"orig": "symbol",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/finance/spark",
								"parts": []any{
									"v1",
									"finance",
									"spark",
								},
								"select": map[string]any{
									"exist": []any{
										"interval",
										"range",
										"symbol",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.spark`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "symbol",
											"orig": "symbol",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "date",
											"orig": "date",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v7/finance/options/{symbol}",
								"parts": []any{
									"v7",
									"finance",
									"options",
									"{symbol}",
								},
								"select": map[string]any{
									"exist": []any{
										"date",
										"symbol",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.optionChain`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "symbol",
											"orig": "symbol",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "assetProfile,financialData,defaultKeyStatistics",
											"kind": "query",
											"name": "module",
											"orig": "module",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v10/finance/quoteSummary/{symbol}",
								"parts": []any{
									"v10",
									"finance",
									"quoteSummary",
									"{symbol}",
								},
								"select": map[string]any{
									"exist": []any{
										"module",
										"symbol",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.quoteSummary`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "AAPL,MSFT,GOOGL",
											"kind": "query",
											"name": "symbol",
											"orig": "symbol",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v6/finance/quote",
								"parts": []any{
									"v6",
									"finance",
									"quote",
								},
								"select": map[string]any{
									"exist": []any{
										"symbol",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.quoteResponse`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "symbol",
											"orig": "symbol",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/ws/insights/v1/finance/insights",
								"parts": []any{
									"ws",
									"insights",
									"v1",
									"finance",
									"insights",
								},
								"select": map[string]any{
									"exist": []any{
										"symbol",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.finance`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"quote_summary",
						},
						[]any{
							"option",
						},
						[]any{
							"chart",
						},
					},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
