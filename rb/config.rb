# YahooFinance SDK configuration

module YahooFinanceConfig
  def self.make_config
    {
      "main" => {
        "name" => "YahooFinance",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://query1.finance.yahoo.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "download" => {},
          "market" => {},
          "screener" => {},
          "search" => {},
          "ticker" => {},
        },
      },
      "entity" => {
        "download" => {
          "fields" => [],
          "name" => "download",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "symbol",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "event",
                        "orig" => "event",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "example" => "1d",
                        "kind" => "query",
                        "name" => "interval",
                        "orig" => "interval",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "period1",
                        "orig" => "period1",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "period2",
                        "orig" => "period2",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/v7/finance/download/{symbol}",
                  "parts" => [
                    "v7",
                    "finance",
                    "download",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "symbol" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "event",
                      "id",
                      "interval",
                      "period1",
                      "period2",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "market" => {
          "fields" => [
            {
              "name" => "finance",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 0,
            },
          ],
          "name" => "market",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "US",
                        "kind" => "param",
                        "name" => "region",
                        "orig" => "region",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/v1/finance/trending/{region}",
                  "parts" => [
                    "v1",
                    "finance",
                    "trending",
                    "{region}",
                  ],
                  "select" => {
                    "exist" => [
                      "region",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "trending",
              ],
            ],
          },
        },
        "screener" => {
          "fields" => [
            {
              "name" => "finance",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "offset",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "query",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "quote_type",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "size",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 4,
            },
            {
              "name" => "sort_field",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 5,
            },
            {
              "name" => "sort_type",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 6,
            },
          ],
          "name" => "screener",
          "op" => {
            "create" => {
              "name" => "create",
              "points" => [
                {
                  "method" => "POST",
                  "orig" => "/v1/finance/screener",
                  "parts" => [
                    "v1",
                    "finance",
                    "screener",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "create",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "search" => {
          "fields" => [
            {
              "name" => "new",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "quote",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 1,
            },
          ],
          "name" => "search",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 4,
                        "kind" => "query",
                        "name" => "news_count",
                        "orig" => "news_count",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "q",
                        "orig" => "q",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "example" => 6,
                        "kind" => "query",
                        "name" => "quotes_count",
                        "orig" => "quotes_count",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/v1/finance/search",
                  "parts" => [
                    "v1",
                    "finance",
                    "search",
                  ],
                  "select" => {
                    "exist" => [
                      "news_count",
                      "q",
                      "quotes_count",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "ticker" => {
          "fields" => [
            {
              "name" => "chart",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "finance",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "option_chain",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "quote_response",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "quote_summary",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 4,
            },
            {
              "name" => "spark",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 5,
            },
          ],
          "name" => "ticker",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "AAPL",
                        "kind" => "param",
                        "name" => "symbol",
                        "orig" => "symbol",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "event",
                        "orig" => "event",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "example" => "1d",
                        "kind" => "query",
                        "name" => "interval",
                        "orig" => "interval",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "period1",
                        "orig" => "period1",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "period2",
                        "orig" => "period2",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "range",
                        "orig" => "range",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/v8/finance/chart/{symbol}",
                  "parts" => [
                    "v8",
                    "finance",
                    "chart",
                    "{symbol}",
                  ],
                  "select" => {
                    "exist" => [
                      "event",
                      "interval",
                      "period1",
                      "period2",
                      "range",
                      "symbol",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "5m",
                        "kind" => "query",
                        "name" => "interval",
                        "orig" => "interval",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "example" => "1d",
                        "kind" => "query",
                        "name" => "range",
                        "orig" => "range",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "symbol",
                        "orig" => "symbol",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/v1/finance/spark",
                  "parts" => [
                    "v1",
                    "finance",
                    "spark",
                  ],
                  "select" => {
                    "exist" => [
                      "interval",
                      "range",
                      "symbol",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 1,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "symbol",
                        "orig" => "symbol",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "date",
                        "orig" => "date",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/v7/finance/options/{symbol}",
                  "parts" => [
                    "v7",
                    "finance",
                    "options",
                    "{symbol}",
                  ],
                  "select" => {
                    "exist" => [
                      "date",
                      "symbol",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 2,
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "symbol",
                        "orig" => "symbol",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                    "query" => [
                      {
                        "example" => "assetProfile,financialData,defaultKeyStatistics",
                        "kind" => "query",
                        "name" => "module",
                        "orig" => "module",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/v10/finance/quoteSummary/{symbol}",
                  "parts" => [
                    "v10",
                    "finance",
                    "quoteSummary",
                    "{symbol}",
                  ],
                  "select" => {
                    "exist" => [
                      "module",
                      "symbol",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 3,
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "AAPL,MSFT,GOOGL",
                        "kind" => "query",
                        "name" => "symbol",
                        "orig" => "symbol",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/v6/finance/quote",
                  "parts" => [
                    "v6",
                    "finance",
                    "quote",
                  ],
                  "select" => {
                    "exist" => [
                      "symbol",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 4,
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "symbol",
                        "orig" => "symbol",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/ws/insights/v1/finance/insights",
                  "parts" => [
                    "ws",
                    "insights",
                    "v1",
                    "finance",
                    "insights",
                  ],
                  "select" => {
                    "exist" => [
                      "symbol",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 5,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "quote_summary",
              ],
              [
                "option",
              ],
              [
                "chart",
              ],
            ],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    YahooFinanceFeatures.make_feature(name)
  end
end
