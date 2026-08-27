<?php
declare(strict_types=1);

// YahooFinance SDK configuration

class YahooFinanceConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "YahooFinance",
                "slug" => "yahoo-finance",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://query1.finance.yahoo.com",
                "auth" => [
                    "prefix" => "",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "download" => [],
                    "market" => [],
                    "screener" => [],
                    "search" => [],
                    "ticker" => [],
                ],
            ],
            "entity" => [
        'download' => [
          'fields' => [
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'download',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'symbol',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'event',
                        'orig' => 'event',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '1d',
                        'kind' => 'query',
                        'name' => 'interval',
                        'orig' => 'interval',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'period1',
                        'orig' => 'period1',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'period2',
                        'orig' => 'period2',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v7/finance/download/{symbol}',
                  'parts' => [
                    'v7',
                    'finance',
                    'download',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'symbol' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'event',
                      'id',
                      'interval',
                      'period1',
                      'period2',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'market' => [
          'fields' => [
            [
              'name' => 'result',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'market',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'US',
                        'kind' => 'param',
                        'name' => 'region',
                        'orig' => 'region',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/finance/trending/{region}',
                  'parts' => [
                    'v1',
                    'finance',
                    'trending',
                    '{region}',
                  ],
                  'select' => [
                    'exist' => [
                      'region',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.finance`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'trending',
              ],
            ],
          ],
        ],
        'screener' => [
          'fields' => [
            [
              'name' => 'offset',
              'short' => 'Offset for pagination',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'query',
              'short' => 'Query criteria',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'quoteType',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'result',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'size',
              'short' => 'Number of results to return',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'sortField',
              'short' => 'Field to sort by',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'sortType',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'screener',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/v1/finance/screener',
                  'parts' => [
                    'v1',
                    'finance',
                    'screener',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.finance`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'search' => [
          'fields' => [
            [
              'name' => 'news',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'quotes',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'search',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 4,
                        'kind' => 'query',
                        'name' => 'news_count',
                        'orig' => 'news_count',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'q',
                        'orig' => 'q',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 6,
                        'kind' => 'query',
                        'name' => 'quotes_count',
                        'orig' => 'quotes_count',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/finance/search',
                  'parts' => [
                    'v1',
                    'finance',
                    'search',
                  ],
                  'select' => [
                    'exist' => [
                      'news_count',
                      'q',
                      'quotes_count',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'ticker' => [
          'fields' => [
            [
              'name' => 'error',
              'type' => '`$NULL`',
            ],
            [
              'name' => 'result',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'ticker',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'AAPL',
                        'kind' => 'param',
                        'name' => 'symbol',
                        'orig' => 'symbol',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'event',
                        'orig' => 'event',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '1d',
                        'kind' => 'query',
                        'name' => 'interval',
                        'orig' => 'interval',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'period1',
                        'orig' => 'period1',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'period2',
                        'orig' => 'period2',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'range',
                        'orig' => 'range',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v8/finance/chart/{symbol}',
                  'parts' => [
                    'v8',
                    'finance',
                    'chart',
                    '{symbol}',
                  ],
                  'select' => [
                    'exist' => [
                      'event',
                      'interval',
                      'period1',
                      'period2',
                      'range',
                      'symbol',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.chart`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '5m',
                        'kind' => 'query',
                        'name' => 'interval',
                        'orig' => 'interval',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '1d',
                        'kind' => 'query',
                        'name' => 'range',
                        'orig' => 'range',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'symbol',
                        'orig' => 'symbol',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/finance/spark',
                  'parts' => [
                    'v1',
                    'finance',
                    'spark',
                  ],
                  'select' => [
                    'exist' => [
                      'interval',
                      'range',
                      'symbol',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.spark`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'symbol',
                        'orig' => 'symbol',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'date',
                        'orig' => 'date',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v7/finance/options/{symbol}',
                  'parts' => [
                    'v7',
                    'finance',
                    'options',
                    '{symbol}',
                  ],
                  'select' => [
                    'exist' => [
                      'date',
                      'symbol',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.optionChain`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'symbol',
                        'orig' => 'symbol',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'example' => 'assetProfile,financialData,defaultKeyStatistics',
                        'kind' => 'query',
                        'name' => 'module',
                        'orig' => 'module',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v10/finance/quoteSummary/{symbol}',
                  'parts' => [
                    'v10',
                    'finance',
                    'quoteSummary',
                    '{symbol}',
                  ],
                  'select' => [
                    'exist' => [
                      'module',
                      'symbol',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.quoteSummary`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'AAPL,MSFT,GOOGL',
                        'kind' => 'query',
                        'name' => 'symbol',
                        'orig' => 'symbol',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v6/finance/quote',
                  'parts' => [
                    'v6',
                    'finance',
                    'quote',
                  ],
                  'select' => [
                    'exist' => [
                      'symbol',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.quoteResponse`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'symbol',
                        'orig' => 'symbol',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/ws/insights/v1/finance/insights',
                  'parts' => [
                    'ws',
                    'insights',
                    'v1',
                    'finance',
                    'insights',
                  ],
                  'select' => [
                    'exist' => [
                      'symbol',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.finance`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'quote_summary',
              ],
              [
                'option',
              ],
              [
                'chart',
              ],
            ],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return YahooFinanceFeatures::make_feature($name);
    }
}
