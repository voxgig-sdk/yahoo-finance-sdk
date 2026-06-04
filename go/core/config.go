package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "YahooFinance",
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
											"active": true,
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "event",
											"orig": "event",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "1d",
											"kind": "query",
											"name": "interval",
											"orig": "interval",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "period1",
											"orig": "period1",
											"reqd": true,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "period2",
											"orig": "period2",
											"reqd": true,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"market": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "finance",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 0,
					},
				},
				"name": "market",
				"op": map[string]any{
					"load": map[string]any{
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
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
						"name": "finance",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "offset",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "query",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "quote_type",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "size",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 4,
					},
					map[string]any{
						"name": "sort_field",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 5,
					},
					map[string]any{
						"name": "sort_type",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 6,
					},
				},
				"name": "screener",
				"op": map[string]any{
					"create": map[string]any{
						"name": "create",
						"points": []any{
							map[string]any{
								"method": "POST",
								"orig": "/v1/finance/screener",
								"parts": []any{
									"v1",
									"finance",
									"screener",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "create",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"search": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "new",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "quote",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 1,
					},
				},
				"name": "search",
				"op": map[string]any{
					"list": map[string]any{
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
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": true,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 6,
											"kind": "query",
											"name": "quotes_count",
											"orig": "quotes_count",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"ticker": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "chart",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "finance",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "option_chain",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "quote_response",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "quote_summary",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 4,
					},
					map[string]any{
						"name": "spark",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 5,
					},
				},
				"name": "ticker",
				"op": map[string]any{
					"load": map[string]any{
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
											"active": true,
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "event",
											"orig": "event",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "1d",
											"kind": "query",
											"name": "interval",
											"orig": "interval",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "period1",
											"orig": "period1",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "period2",
											"orig": "period2",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "range",
											"orig": "range",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 0,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "5m",
											"kind": "query",
											"name": "interval",
											"orig": "interval",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "1d",
											"kind": "query",
											"name": "range",
											"orig": "range",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "symbol",
											"orig": "symbol",
											"reqd": true,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 1,
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
											"active": true,
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "date",
											"orig": "date",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 2,
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
											"active": true,
										},
									},
									"query": []any{
										map[string]any{
											"example": "assetProfile,financialData,defaultKeyStatistics",
											"kind": "query",
											"name": "module",
											"orig": "module",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 3,
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
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 4,
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
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 5,
							},
						},
						"input": "data",
						"key$": "load",
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
