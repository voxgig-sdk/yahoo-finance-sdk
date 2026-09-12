"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'YahooFinance',
        slug: "yahoo-finance",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://query1.finance.yahoo.com",
        auth: {
            prefix: '',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            download: {},
            market: {},
            screener: {},
            search: {},
            ticker: {},
        }
    };
    entity = {
        "download": {
            "fields": [
                {
                    "name": "id",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "download",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "symbol",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "event",
                                        "orig": "event",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "1d",
                                        "kind": "query",
                                        "name": "interval",
                                        "orig": "interval",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "period1",
                                        "orig": "period1",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "period2",
                                        "orig": "period2",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v7/finance/download/{symbol}",
                            "rename": {
                                "param": {
                                    "symbol": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "v7"
                                },
                                {
                                    "lit": "finance"
                                },
                                {
                                    "lit": "download"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "event",
                                    "id",
                                    "interval",
                                    "period1",
                                    "period2"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "v7",
                                "finance",
                                "download",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "market": {
            "fields": [
                {
                    "name": "result",
                    "type": "`$ARRAY`"
                }
            ],
            "name": "market",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "US",
                                        "kind": "param",
                                        "name": "region",
                                        "orig": "region",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/finance/trending/{region}",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "finance"
                                },
                                {
                                    "lit": "trending"
                                },
                                {
                                    "var": "region"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "region"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.finance`"
                            },
                            "parts": [
                                "v1",
                                "finance",
                                "trending",
                                "{region}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "trending"
                    ]
                ]
            }
        },
        "screener": {
            "fields": [
                {
                    "name": "offset",
                    "short": "Offset for pagination",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "query",
                    "short": "Query criteria",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "quoteType",
                    "type": "`$STRING`"
                },
                {
                    "name": "result",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "size",
                    "short": "Number of results to return",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "sortField",
                    "short": "Field to sort by",
                    "type": "`$STRING`"
                },
                {
                    "name": "sortType",
                    "type": "`$STRING`"
                }
            ],
            "name": "screener",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/v1/finance/screener",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "finance"
                                },
                                {
                                    "lit": "screener"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.finance`"
                            },
                            "parts": [
                                "v1",
                                "finance",
                                "screener"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "search": {
            "fields": [
                {
                    "name": "news",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "quotes",
                    "type": "`$ARRAY`"
                }
            ],
            "name": "search",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": 4,
                                        "kind": "query",
                                        "name": "news_count",
                                        "orig": "news_count",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "q",
                                        "orig": "q",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 6,
                                        "kind": "query",
                                        "name": "quotes_count",
                                        "orig": "quotes_count",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/finance/search",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "finance"
                                },
                                {
                                    "lit": "search"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "news_count",
                                    "q",
                                    "quotes_count"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "v1",
                                "finance",
                                "search"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "ticker": {
            "fields": [
                {
                    "name": "error",
                    "type": "`$NULL`"
                },
                {
                    "name": "result",
                    "type": "`$ARRAY`"
                }
            ],
            "name": "ticker",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "AAPL",
                                        "kind": "param",
                                        "name": "symbol",
                                        "orig": "symbol",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "event",
                                        "orig": "event",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "1d",
                                        "kind": "query",
                                        "name": "interval",
                                        "orig": "interval",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "period1",
                                        "orig": "period1",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "period2",
                                        "orig": "period2",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "range",
                                        "orig": "range",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v8/finance/chart/{symbol}",
                            "segments": [
                                {
                                    "lit": "v8"
                                },
                                {
                                    "lit": "finance"
                                },
                                {
                                    "lit": "chart"
                                },
                                {
                                    "var": "symbol"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "event",
                                    "interval",
                                    "period1",
                                    "period2",
                                    "range",
                                    "symbol"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.chart`"
                            },
                            "parts": [
                                "v8",
                                "finance",
                                "chart",
                                "{symbol}"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "5m",
                                        "kind": "query",
                                        "name": "interval",
                                        "orig": "interval",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "1d",
                                        "kind": "query",
                                        "name": "range",
                                        "orig": "range",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "symbol",
                                        "orig": "symbol",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/finance/spark",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "finance"
                                },
                                {
                                    "lit": "spark"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "interval",
                                    "range",
                                    "symbol"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.spark`"
                            },
                            "parts": [
                                "v1",
                                "finance",
                                "spark"
                            ]
                        },
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "symbol",
                                        "orig": "symbol",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "date",
                                        "orig": "date",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v7/finance/options/{symbol}",
                            "segments": [
                                {
                                    "lit": "v7"
                                },
                                {
                                    "lit": "finance"
                                },
                                {
                                    "lit": "options"
                                },
                                {
                                    "var": "symbol"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "date",
                                    "symbol"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.optionChain`"
                            },
                            "parts": [
                                "v7",
                                "finance",
                                "options",
                                "{symbol}"
                            ]
                        },
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "symbol",
                                        "orig": "symbol",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "example": "assetProfile,financialData,defaultKeyStatistics",
                                        "kind": "query",
                                        "name": "module",
                                        "orig": "module",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v10/finance/quoteSummary/{symbol}",
                            "segments": [
                                {
                                    "lit": "v10"
                                },
                                {
                                    "lit": "finance"
                                },
                                {
                                    "lit": "quoteSummary"
                                },
                                {
                                    "var": "symbol"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "module",
                                    "symbol"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.quoteSummary`"
                            },
                            "parts": [
                                "v10",
                                "finance",
                                "quoteSummary",
                                "{symbol}"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "AAPL,MSFT,GOOGL",
                                        "kind": "query",
                                        "name": "symbol",
                                        "orig": "symbol",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v6/finance/quote",
                            "segments": [
                                {
                                    "lit": "v6"
                                },
                                {
                                    "lit": "finance"
                                },
                                {
                                    "lit": "quote"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "symbol"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.quoteResponse`"
                            },
                            "parts": [
                                "v6",
                                "finance",
                                "quote"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "symbol",
                                        "orig": "symbol",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/ws/insights/v1/finance/insights",
                            "segments": [
                                {
                                    "lit": "ws"
                                },
                                {
                                    "lit": "insights"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "finance"
                                },
                                {
                                    "lit": "insights"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "symbol"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.finance`"
                            },
                            "parts": [
                                "ws",
                                "insights",
                                "v1",
                                "finance",
                                "insights"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "quote_summary"
                    ],
                    [
                        "option"
                    ],
                    [
                        "chart"
                    ]
                ]
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map