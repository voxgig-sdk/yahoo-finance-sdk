"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "download",
        "accessor": "Download",
        "op": "load",
        "method": "GET",
        "path": "/v7/finance/download/{symbol}",
        "args": [
            {
                "name": "id",
                "wire": "symbol",
                "value": "p1"
            }
        ],
        "select": {
            "event": "v1",
            "interval": "v1",
            "period1": "v1",
            "period2": "v1"
        },
        "headers": [],
        "query": [
            "period1",
            "period2",
            "interval",
            "events"
        ],
        "auth": [],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "market",
        "accessor": "Market",
        "op": "load",
        "method": "GET",
        "path": "/v1/finance/trending/{region}",
        "args": [
            {
                "name": "region",
                "wire": "region",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [],
        "status": 200,
        "sample": {
            "finance": {
                "result": [
                    {
                        "quotes": [
                            {
                                "symbol": "x"
                            }
                        ]
                    }
                ]
            }
        },
        "idField": "id"
    },
    {
        "entity": "screener",
        "accessor": "Screener",
        "op": "create",
        "method": "POST",
        "path": "/v1/finance/screener",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [],
        "status": 200,
        "sample": {
            "finance": {
                "result": [
                    {}
                ]
            }
        },
        "idField": "id"
    },
    {
        "entity": "search",
        "accessor": "Search",
        "op": "list",
        "method": "GET",
        "path": "/v1/finance/search",
        "args": [],
        "select": {
            "news_count": "v1",
            "q": "v1",
            "quotes_count": "v1"
        },
        "headers": [],
        "query": [
            "q",
            "quotesCount",
            "newsCount"
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "quotes": [
                {
                    "exchange": "x",
                    "longname": "x",
                    "quoteType": "x",
                    "shortname": "x",
                    "symbol": "x"
                }
            ],
            "news": [
                {
                    "link": "x",
                    "publisher": "x",
                    "title": "x",
                    "uuid": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "ticker",
        "accessor": "Ticker",
        "op": "load",
        "method": "GET",
        "path": "/v8/finance/chart/{symbol}",
        "args": [
            {
                "name": "symbol",
                "wire": "symbol",
                "value": "AAPL"
            }
        ],
        "select": {
            "event": "v1",
            "interval": "v1",
            "period1": "v1",
            "period2": "v1",
            "range": "v1"
        },
        "headers": [],
        "query": [
            "period1",
            "period2",
            "interval",
            "range",
            "events"
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "chart": {
                "result": [
                    {
                        "meta": {
                            "currency": "x",
                            "symbol": "x",
                            "exchangeName": "x",
                            "instrumentType": "x",
                            "regularMarketPrice": 1,
                            "chartPreviousClose": 1
                        },
                        "timestamp": [
                            1
                        ],
                        "indicators": {
                            "quote": [
                                {}
                            ]
                        }
                    }
                ]
            }
        },
        "idField": "id"
    },
    {
        "entity": "ticker",
        "accessor": "Ticker",
        "op": "load",
        "method": "GET",
        "path": "/v1/finance/spark",
        "args": [],
        "select": {
            "interval": "v1",
            "range": "v1",
            "symbol": "v1"
        },
        "headers": [],
        "query": [
            "symbols",
            "range",
            "interval"
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "spark": {}
        },
        "idField": "id"
    },
    {
        "entity": "ticker",
        "accessor": "Ticker",
        "op": "load",
        "method": "GET",
        "path": "/v7/finance/options/{symbol}",
        "args": [
            {
                "name": "symbol",
                "wire": "symbol",
                "value": "p1"
            }
        ],
        "select": {
            "date": "v1"
        },
        "headers": [],
        "query": [
            "date"
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "optionChain": {
                "result": [
                    {
                        "expirationDates": [
                            1
                        ],
                        "strikes": [
                            1
                        ],
                        "options": [
                            {
                                "calls": [],
                                "puts": []
                            }
                        ]
                    }
                ]
            }
        },
        "idField": "id"
    },
    {
        "entity": "ticker",
        "accessor": "Ticker",
        "op": "load",
        "method": "GET",
        "path": "/v10/finance/quoteSummary/{symbol}",
        "args": [
            {
                "name": "symbol",
                "wire": "symbol",
                "value": "p1"
            }
        ],
        "select": {
            "module": "v1"
        },
        "headers": [],
        "query": [
            "modules"
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "quoteSummary": {
                "result": [
                    {}
                ]
            }
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map