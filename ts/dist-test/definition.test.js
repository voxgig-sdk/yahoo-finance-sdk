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
            "period1": "v1",
            "period2": "v1",
            "event": "v1",
            "interval": "1d"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "text/csv"
        ],
        "query": [
            "period1",
            "period2",
            "interval",
            "events"
        ],
        "queryArgs": [
            {
                "name": "event",
                "wire": "events"
            },
            {
                "name": "interval",
                "wire": "interval"
            },
            {
                "name": "period1",
                "wire": "period1"
            },
            {
                "name": "period2",
                "wire": "period2"
            }
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
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
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
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
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
            "q": "v1",
            "news_count": 4,
            "quotes_count": 6
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "q",
            "quotesCount",
            "newsCount"
        ],
        "queryArgs": [
            {
                "name": "news_count",
                "wire": "newsCount"
            },
            {
                "name": "q",
                "wire": "q"
            },
            {
                "name": "quotes_count",
                "wire": "quotesCount"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "quotes": [
                {
                    "symbol": "x",
                    "shortname": "x",
                    "longname": "x",
                    "exchange": "x",
                    "quoteType": "x"
                }
            ],
            "news": [
                {
                    "uuid": "x",
                    "title": "x",
                    "publisher": "x",
                    "link": "x"
                }
            ]
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