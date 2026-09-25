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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://query1.finance.yahoo.com",
			"auth": map[string]any{
				"prefix": "",
				"in": "cookie",
				"name": "Session",
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
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "download",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v7/finance/download/{symbol}",
								"segments": []any{
									map[string]any{
										"lit": "v7",
									},
									map[string]any{
										"lit": "finance",
									},
									map[string]any{
										"lit": "download",
									},
									map[string]any{
										"var": "id",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "symbol",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "event",
											"orig": "event",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "interval",
											"orig": "interval",
											"type": "`$STRING`",
											"kind": "query",
											"example": "1d",
										},
										map[string]any{
											"name": "period1",
											"orig": "period1",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "period2",
											"orig": "period2",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
										},
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
						"title": "Result",
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
								"kind": "http",
								"method": "GET",
								"orig": "/v1/finance/trending/{region}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "finance",
									},
									map[string]any{
										"lit": "trending",
									},
									map[string]any{
										"var": "region",
									},
								},
								"parts": []any{
									"v1",
									"finance",
									"trending",
									"{region}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.finance`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "region",
											"orig": "region",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "US",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"region",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"screener": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "offset",
						"title": "Offset",
						"type": "`$INTEGER`",
						"short": "Offset for pagination",
					},
					map[string]any{
						"name": "query",
						"title": "Query",
						"type": "`$OBJECT`",
						"short": "Query criteria",
					},
					map[string]any{
						"name": "quoteType",
						"title": "Quote Type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "result",
						"title": "Result",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "size",
						"title": "Size",
						"type": "`$INTEGER`",
						"short": "Number of results to return",
					},
					map[string]any{
						"name": "sortField",
						"title": "Sort Field",
						"type": "`$STRING`",
						"short": "Field to sort by",
					},
					map[string]any{
						"name": "sortType",
						"title": "Sort Type",
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
								"kind": "http",
								"method": "POST",
								"orig": "/v1/finance/screener",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "finance",
									},
									map[string]any{
										"lit": "screener",
									},
								},
								"parts": []any{
									"v1",
									"finance",
									"screener",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.finance`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "News",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "quotes",
						"title": "Quotes",
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
								"kind": "http",
								"method": "GET",
								"orig": "/v1/finance/search",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "finance",
									},
									map[string]any{
										"lit": "search",
									},
								},
								"parts": []any{
									"v1",
									"finance",
									"search",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "news_count",
											"orig": "news_count",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 4,
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "quotes_count",
											"orig": "quotes_count",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 6,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"news_count",
										"q",
										"quotes_count",
									},
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
						"title": "Error",
						"type": "`$NULL`",
					},
					map[string]any{
						"name": "result",
						"title": "Result",
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
								"kind": "http",
								"method": "GET",
								"orig": "/v8/finance/chart/{symbol}",
								"segments": []any{
									map[string]any{
										"lit": "v8",
									},
									map[string]any{
										"lit": "finance",
									},
									map[string]any{
										"lit": "chart",
									},
									map[string]any{
										"var": "symbol",
									},
								},
								"parts": []any{
									"v8",
									"finance",
									"chart",
									"{symbol}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.chart`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "symbol",
											"orig": "symbol",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "AAPL",
										},
									},
									"query": []any{
										map[string]any{
											"name": "event",
											"orig": "event",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "interval",
											"orig": "interval",
											"type": "`$STRING`",
											"kind": "query",
											"example": "1d",
										},
										map[string]any{
											"name": "period1",
											"orig": "period1",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "period2",
											"orig": "period2",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "range",
											"orig": "range",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
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
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/finance/spark",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "finance",
									},
									map[string]any{
										"lit": "spark",
									},
								},
								"parts": []any{
									"v1",
									"finance",
									"spark",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.spark`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "interval",
											"orig": "interval",
											"type": "`$STRING`",
											"kind": "query",
											"example": "5m",
										},
										map[string]any{
											"name": "range",
											"orig": "range",
											"type": "`$STRING`",
											"kind": "query",
											"example": "1d",
										},
										map[string]any{
											"name": "symbol",
											"orig": "symbol",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"interval",
										"range",
										"symbol",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v7/finance/options/{symbol}",
								"segments": []any{
									map[string]any{
										"lit": "v7",
									},
									map[string]any{
										"lit": "finance",
									},
									map[string]any{
										"lit": "options",
									},
									map[string]any{
										"var": "symbol",
									},
								},
								"parts": []any{
									"v7",
									"finance",
									"options",
									"{symbol}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.optionChain`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "symbol",
											"orig": "symbol",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"date",
										"symbol",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v10/finance/quoteSummary/{symbol}",
								"segments": []any{
									map[string]any{
										"lit": "v10",
									},
									map[string]any{
										"lit": "finance",
									},
									map[string]any{
										"lit": "quoteSummary",
									},
									map[string]any{
										"var": "symbol",
									},
								},
								"parts": []any{
									"v10",
									"finance",
									"quoteSummary",
									"{symbol}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.quoteSummary`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "symbol",
											"orig": "symbol",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "module",
											"orig": "module",
											"type": "`$STRING`",
											"kind": "query",
											"example": "assetProfile,financialData,defaultKeyStatistics",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"module",
										"symbol",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v6/finance/quote",
								"segments": []any{
									map[string]any{
										"lit": "v6",
									},
									map[string]any{
										"lit": "finance",
									},
									map[string]any{
										"lit": "quote",
									},
								},
								"parts": []any{
									"v6",
									"finance",
									"quote",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.quoteResponse`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "symbol",
											"orig": "symbol",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "AAPL,MSFT,GOOGL",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"symbol",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/ws/insights/v1/finance/insights",
								"segments": []any{
									map[string]any{
										"lit": "ws",
									},
									map[string]any{
										"lit": "insights",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "finance",
									},
									map[string]any{
										"lit": "insights",
									},
								},
								"parts": []any{
									"ws",
									"insights",
									"v1",
									"finance",
									"insights",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.finance`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "symbol",
											"orig": "symbol",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"symbol",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
