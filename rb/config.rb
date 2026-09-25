# YahooFinance SDK configuration

module YahooFinanceConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "YahooFinance",
        "slug" => "yahoo-finance",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://query1.finance.yahoo.com",
        "auth" => {
          "prefix" => "",
          "in" => "cookie",
          "name" => "Session",
        },
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
          "fields" => [
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "download",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v7/finance/download/{symbol}",
                  "segments" => [
                    {
                      "lit" => "v7",
                    },
                    {
                      "lit" => "finance",
                    },
                    {
                      "lit" => "download",
                    },
                    {
                      "var" => "id",
                    },
                  ],
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
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "symbol",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                    "query" => [
                      {
                        "name" => "event",
                        "orig" => "event",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "interval",
                        "orig" => "interval",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "1d",
                      },
                      {
                        "name" => "period1",
                        "orig" => "period1",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "period2",
                        "orig" => "period2",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
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
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "market" => {
          "fields" => [
            {
              "name" => "result",
              "title" => "Result",
              "type" => "`$ARRAY`",
            },
          ],
          "name" => "market",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/finance/trending/{region}",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "finance",
                    },
                    {
                      "lit" => "trending",
                    },
                    {
                      "var" => "region",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "finance",
                    "trending",
                    "{region}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.finance`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "region",
                        "orig" => "region",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "US",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "region",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "screener" => {
          "fields" => [
            {
              "name" => "offset",
              "title" => "Offset",
              "type" => "`$INTEGER`",
              "short" => "Offset for pagination",
            },
            {
              "name" => "query",
              "title" => "Query",
              "type" => "`$OBJECT`",
              "short" => "Query criteria",
            },
            {
              "name" => "quoteType",
              "title" => "Quote Type",
              "type" => "`$STRING`",
            },
            {
              "name" => "result",
              "title" => "Result",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "size",
              "title" => "Size",
              "type" => "`$INTEGER`",
              "short" => "Number of results to return",
            },
            {
              "name" => "sortField",
              "title" => "Sort Field",
              "type" => "`$STRING`",
              "short" => "Field to sort by",
            },
            {
              "name" => "sortType",
              "title" => "Sort Type",
              "type" => "`$STRING`",
            },
          ],
          "name" => "screener",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/v1/finance/screener",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "finance",
                    },
                    {
                      "lit" => "screener",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "finance",
                    "screener",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.finance`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "search" => {
          "fields" => [
            {
              "name" => "news",
              "title" => "News",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "quotes",
              "title" => "Quotes",
              "type" => "`$ARRAY`",
            },
          ],
          "name" => "search",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/finance/search",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "finance",
                    },
                    {
                      "lit" => "search",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "finance",
                    "search",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "news_count",
                        "orig" => "news_count",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 4,
                      },
                      {
                        "name" => "q",
                        "orig" => "q",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "quotes_count",
                        "orig" => "quotes_count",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 6,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "news_count",
                      "q",
                      "quotes_count",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "ticker" => {
          "fields" => [
            {
              "name" => "error",
              "title" => "Error",
              "type" => "`$NULL`",
            },
            {
              "name" => "result",
              "title" => "Result",
              "type" => "`$ARRAY`",
            },
          ],
          "name" => "ticker",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v8/finance/chart/{symbol}",
                  "segments" => [
                    {
                      "lit" => "v8",
                    },
                    {
                      "lit" => "finance",
                    },
                    {
                      "lit" => "chart",
                    },
                    {
                      "var" => "symbol",
                    },
                  ],
                  "parts" => [
                    "v8",
                    "finance",
                    "chart",
                    "{symbol}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.chart`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "symbol",
                        "orig" => "symbol",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "AAPL",
                      },
                    ],
                    "query" => [
                      {
                        "name" => "event",
                        "orig" => "event",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "interval",
                        "orig" => "interval",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "1d",
                      },
                      {
                        "name" => "period1",
                        "orig" => "period1",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                      },
                      {
                        "name" => "period2",
                        "orig" => "period2",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                      },
                      {
                        "name" => "range",
                        "orig" => "range",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
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
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/finance/spark",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "finance",
                    },
                    {
                      "lit" => "spark",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "finance",
                    "spark",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.spark`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "interval",
                        "orig" => "interval",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "5m",
                      },
                      {
                        "name" => "range",
                        "orig" => "range",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "1d",
                      },
                      {
                        "name" => "symbol",
                        "orig" => "symbol",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "interval",
                      "range",
                      "symbol",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v7/finance/options/{symbol}",
                  "segments" => [
                    {
                      "lit" => "v7",
                    },
                    {
                      "lit" => "finance",
                    },
                    {
                      "lit" => "options",
                    },
                    {
                      "var" => "symbol",
                    },
                  ],
                  "parts" => [
                    "v7",
                    "finance",
                    "options",
                    "{symbol}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.optionChain`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "symbol",
                        "orig" => "symbol",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                    "query" => [
                      {
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "date",
                      "symbol",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v10/finance/quoteSummary/{symbol}",
                  "segments" => [
                    {
                      "lit" => "v10",
                    },
                    {
                      "lit" => "finance",
                    },
                    {
                      "lit" => "quoteSummary",
                    },
                    {
                      "var" => "symbol",
                    },
                  ],
                  "parts" => [
                    "v10",
                    "finance",
                    "quoteSummary",
                    "{symbol}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.quoteSummary`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "symbol",
                        "orig" => "symbol",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                    "query" => [
                      {
                        "name" => "module",
                        "orig" => "module",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "assetProfile,financialData,defaultKeyStatistics",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "module",
                      "symbol",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v6/finance/quote",
                  "segments" => [
                    {
                      "lit" => "v6",
                    },
                    {
                      "lit" => "finance",
                    },
                    {
                      "lit" => "quote",
                    },
                  ],
                  "parts" => [
                    "v6",
                    "finance",
                    "quote",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.quoteResponse`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "symbol",
                        "orig" => "symbol",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => "AAPL,MSFT,GOOGL",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "symbol",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/ws/insights/v1/finance/insights",
                  "segments" => [
                    {
                      "lit" => "ws",
                    },
                    {
                      "lit" => "insights",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "finance",
                    },
                    {
                      "lit" => "insights",
                    },
                  ],
                  "parts" => [
                    "ws",
                    "insights",
                    "v1",
                    "finance",
                    "insights",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.finance`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "symbol",
                        "orig" => "symbol",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "symbol",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
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
