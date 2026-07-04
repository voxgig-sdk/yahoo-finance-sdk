
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://query1.finance.yahoo.com',

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      download: {
      },

      market: {
      },

      screener: {
      },

      search: {
      },

      ticker: {
      },

    }
  }


  entity = {
    "download": {
      "fields": [],
      "name": "download",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "symbol",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "event",
                    "orig": "event",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": "1d",
                    "kind": "query",
                    "name": "interval",
                    "orig": "interval",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "period1",
                    "orig": "period1",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "period2",
                    "orig": "period2",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/v7/finance/download/{symbol}",
              "parts": [
                "v7",
                "finance",
                "download",
                "{id}"
              ],
              "rename": {
                "param": {
                  "symbol": "id"
                }
              },
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
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "market": {
      "fields": [
        {
          "active": true,
          "name": "finance",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 0
        }
      ],
      "name": "market",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "US",
                    "kind": "param",
                    "name": "region",
                    "orig": "region",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "method": "GET",
              "orig": "/v1/finance/trending/{region}",
              "parts": [
                "v1",
                "finance",
                "trending",
                "{region}"
              ],
              "select": {
                "exist": [
                  "region"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
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
          "active": true,
          "name": "finance",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 0
        },
        {
          "active": true,
          "name": "offset",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 1
        },
        {
          "active": true,
          "name": "query",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 2
        },
        {
          "active": true,
          "name": "quote_type",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "size",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 4
        },
        {
          "active": true,
          "name": "sort_field",
          "req": false,
          "type": "`$STRING`",
          "index$": 5
        },
        {
          "active": true,
          "name": "sort_type",
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        }
      ],
      "name": "screener",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {},
              "method": "POST",
              "orig": "/v1/finance/screener",
              "parts": [
                "v1",
                "finance",
                "screener"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "create"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "search": {
      "fields": [
        {
          "active": true,
          "name": "new",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 0
        },
        {
          "active": true,
          "name": "quote",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 1
        }
      ],
      "name": "search",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "example": 4,
                    "kind": "query",
                    "name": "news_count",
                    "orig": "news_count",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "q",
                    "orig": "q",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": 6,
                    "kind": "query",
                    "name": "quotes_count",
                    "orig": "quotes_count",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/v1/finance/search",
              "parts": [
                "v1",
                "finance",
                "search"
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
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "ticker": {
      "fields": [
        {
          "active": true,
          "name": "chart",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 0
        },
        {
          "active": true,
          "name": "finance",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 1
        },
        {
          "active": true,
          "name": "option_chain",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 2
        },
        {
          "active": true,
          "name": "quote_response",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 3
        },
        {
          "active": true,
          "name": "quote_summary",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 4
        },
        {
          "active": true,
          "name": "spark",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 5
        }
      ],
      "name": "ticker",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "AAPL",
                    "kind": "param",
                    "name": "symbol",
                    "orig": "symbol",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "event",
                    "orig": "event",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": "1d",
                    "kind": "query",
                    "name": "interval",
                    "orig": "interval",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "period1",
                    "orig": "period1",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "period2",
                    "orig": "period2",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "range",
                    "orig": "range",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/v8/finance/chart/{symbol}",
              "parts": [
                "v8",
                "finance",
                "chart",
                "{symbol}"
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
                "res": "`body`"
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "example": "5m",
                    "kind": "query",
                    "name": "interval",
                    "orig": "interval",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": "1d",
                    "kind": "query",
                    "name": "range",
                    "orig": "range",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "symbol",
                    "orig": "symbol",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/v1/finance/spark",
              "parts": [
                "v1",
                "finance",
                "spark"
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
                "res": "`body`"
              },
              "index$": 1
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "symbol",
                    "orig": "symbol",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "date",
                    "orig": "date",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/v7/finance/options/{symbol}",
              "parts": [
                "v7",
                "finance",
                "options",
                "{symbol}"
              ],
              "select": {
                "exist": [
                  "date",
                  "symbol"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 2
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "symbol",
                    "orig": "symbol",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "example": "assetProfile,financialData,defaultKeyStatistics",
                    "kind": "query",
                    "name": "module",
                    "orig": "module",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/v10/finance/quoteSummary/{symbol}",
              "parts": [
                "v10",
                "finance",
                "quoteSummary",
                "{symbol}"
              ],
              "select": {
                "exist": [
                  "module",
                  "symbol"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 3
            },
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "example": "AAPL,MSFT,GOOGL",
                    "kind": "query",
                    "name": "symbol",
                    "orig": "symbol",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/v6/finance/quote",
              "parts": [
                "v6",
                "finance",
                "quote"
              ],
              "select": {
                "exist": [
                  "symbol"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 4
            },
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "symbol",
                    "orig": "symbol",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/ws/insights/v1/finance/insights",
              "parts": [
                "ws",
                "insights",
                "v1",
                "finance",
                "insights"
              ],
              "select": {
                "exist": [
                  "symbol"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 5
            }
          ],
          "key$": "load"
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
  }
}


const config = new Config()

export {
  config
}

