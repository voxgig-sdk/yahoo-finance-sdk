

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { YahooFinanceSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('TickerEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when YAHOO_FINANCE_TEST_LIVE=TRUE.
  afterEach(liveDelay('YAHOO_FINANCE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = YahooFinanceSDK.test()
    const ent = testsdk.Ticker()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.YAHOO_FINANCE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'ticker.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"error":{"a":true,"h":"Error","n":"error","r":false,"t":"`$NULL`","key$":"error","index$":0},"result":{"a":true,"h":"Result","n":"result","r":false,"t":"`$ARRAY`","key$":"result","index$":1}},"name":"ticker","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v8/finance/chart/{symbol}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"AAPL","k":"param","n":"symbol","or":"symbol","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"event","or":"event","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"1d","k":"query","n":"interval","or":"interval","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"period1","or":"period1","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"period2","or":"period2","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"k":"query","n":"range","or":"range","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/v8/finance/chart/{symbol}","q":{"exist":["event","interval","period1","period2","range","symbol"]},"r":{},"s":[{"lit":"v8"},{"lit":"finance"},{"lit":"chart"},{"var":"symbol"}],"t":{"req":"`reqdata`","res":"`body.chart`"},"index$":0},{"a":true,"co":{"id":"GET /v1/finance/spark","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"5m","k":"query","n":"interval","or":"interval","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"1d","k":"query","n":"range","or":"range","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"symbol","or":"symbol","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/v1/finance/spark","q":{"exist":["interval","range","symbol"]},"r":{},"s":[{"lit":"v1"},{"lit":"finance"},{"lit":"spark"}],"t":{"req":"`reqdata`","res":"`body.spark`"},"index$":1},{"a":true,"co":{"id":"GET /v7/finance/options/{symbol}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"symbol","or":"symbol","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"date","or":"date","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/v7/finance/options/{symbol}","q":{"exist":["date","symbol"]},"r":{},"s":[{"lit":"v7"},{"lit":"finance"},{"lit":"options"},{"var":"symbol"}],"t":{"req":"`reqdata`","res":"`body.optionChain`"},"index$":2},{"a":true,"co":{"id":"GET /v10/finance/quoteSummary/{symbol}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"symbol","or":"symbol","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"assetProfile,financialData,defaultKeyStatistics","k":"query","n":"module","or":"module","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v10/finance/quoteSummary/{symbol}","q":{"exist":["module","symbol"]},"r":{},"s":[{"lit":"v10"},{"lit":"finance"},{"lit":"quoteSummary"},{"var":"symbol"}],"t":{"req":"`reqdata`","res":"`body.quoteSummary`"},"index$":3},{"a":true,"co":{"id":"GET /v6/finance/quote","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"AAPL,MSFT,GOOGL","k":"query","n":"symbol","or":"symbol","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v6/finance/quote","q":{"exist":["symbol"]},"r":{},"s":[{"lit":"v6"},{"lit":"finance"},{"lit":"quote"}],"t":{"req":"`reqdata`","res":"`body.quoteResponse`"},"index$":4},{"a":true,"co":{"id":"GET /ws/insights/v1/finance/insights","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"symbol","or":"symbol","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/ws/insights/v1/finance/insights","q":{"exist":["symbol"]},"r":{},"s":[{"lit":"ws"},{"lit":"insights"},{"lit":"v1"},{"lit":"finance"},{"lit":"insights"}],"t":{"req":"`reqdata`","res":"`body.finance`"},"index$":5}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"ticker","name__orig":"ticker","Name":"Ticker","name_":"ticker","name-":"ticker","NAME":"TICKER","index$":4}, {"active":true,"entity":"ticker","key$":"BasicTickerFlow","kind":"basic","name":"BasicTickerFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"ticker_ref01","srcdatavar":"ticker_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-ticker_ref01"}}],"index$":0}]}, 'Ticker', {"GET /v8/finance/chart/{symbol}":{"protocol":"http","operationId":"getTickerChart","responses":{"200":{"description":"Successful response with chart data","content":{"application/json":{"schema":{"type":"object","properties":{"chart":{"type":"object","properties":{"result":{"type":"array","items":{"type":"object","properties":{"meta":{"type":"object","properties":{"currency":{"type":"string"},"symbol":{"type":"string"},"exchangeName":{"type":"string"},"instrumentType":{"type":"string"},"regularMarketPrice":{"type":"number"},"chartPreviousClose":{"type":"number"}}},"timestamp":{"type":"array","items":{"type":"integer","format":"int64"}},"indicators":{"type":"object","properties":{"quote":{"type":"array","items":{"type":"object","properties":{"open":{"type":"array","items":{"type":"number"}},"high":{"type":"array","items":{"type":"number"}},"low":{"type":"array","items":{"type":"number"}},"close":{"type":"array","items":{"type":"number"}},"volume":{"type":"array","items":{"type":"integer"}}}}}}}}},"key$":"result"},"error":{"type":"null","key$":"error"}},"index$":0}}}}}},"404":{"description":"Symbol not found","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"string"},"description":{"type":"string"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"symbol","in":"path","required":true,"description":"Ticker symbol (e.g., AAPL, BTC-USD, EURUSD=X)","schema":{"type":"string"},"example":"AAPL","index$":0},{"name":"period1","in":"query","description":"Start date as Unix timestamp","schema":{"type":"integer","format":"int64"},"index$":1},{"name":"period2","in":"query","description":"End date as Unix timestamp","schema":{"type":"integer","format":"int64"},"index$":2},{"name":"interval","in":"query","description":"Data interval","schema":{"type":"string","enum":["1m","2m","5m","15m","30m","60m","90m","1h","1d","5d","1wk","1mo","3mo"],"default":"1d"},"index$":3},{"name":"range","in":"query","description":"Time range for data","schema":{"type":"string","enum":["1d","5d","1mo","3mo","6mo","1y","2y","5y","10y","ytd","max"]},"index$":4},{"name":"events","in":"query","description":"Include dividends and splits","schema":{"type":"string","enum":["div","split","div,split"]},"index$":5}],"securitySource":"unspecified","securitySchemes":{"cookieAuth":{"type":"apiKey","in":"cookie","name":"Session","description":"Yahoo Finance uses cookie-based authentication for some endpoints"}}},"GET /v1/finance/spark":{"protocol":"http","operationId":"getSparkData","responses":{"200":{"description":"Spark chart data","content":{"application/json":{"schema":{"type":"object","properties":{"spark":{"key$":"spark","type":"object"}}}}}}},"parameters":[{"name":"symbols","in":"query","required":true,"description":"Comma-separated list of ticker symbols","schema":{"type":"string"},"index$":0},{"name":"range","in":"query","description":"Time range","schema":{"type":"string","enum":["1d","5d","1mo","3mo","6mo","1y","5y"],"default":"1d"},"index$":1},{"name":"interval","in":"query","description":"Data interval","schema":{"type":"string","enum":["1m","5m","15m","1d"],"default":"5m"},"index$":2}],"securitySource":"unspecified","securitySchemes":{"cookieAuth":{"type":"apiKey","in":"cookie","name":"Session","description":"Yahoo Finance uses cookie-based authentication for some endpoints"}}},"GET /v7/finance/options/{symbol}":{"protocol":"http","operationId":"getOptions","responses":{"200":{"description":"Options chain data","content":{"application/json":{"schema":{"type":"object","properties":{"optionChain":{"type":"object","properties":{"result":{"type":"array","items":{"type":"object","properties":{"expirationDates":{"type":"array","items":{"type":"integer"}},"strikes":{"type":"array","items":{"type":"number"}},"options":{"type":"array","items":{"type":"object","properties":{"calls":{"type":"array","items":{"type":"object"}},"puts":{"type":"array","items":{"type":"object"}}}}}}},"key$":"result"}},"index$":0}}}}}}},"parameters":[{"name":"symbol","in":"path","required":true,"description":"Ticker symbol","schema":{"type":"string"},"index$":0},{"name":"date","in":"query","description":"Expiration date as Unix timestamp","schema":{"type":"integer","format":"int64"},"index$":1}],"securitySource":"unspecified","securitySchemes":{"cookieAuth":{"type":"apiKey","in":"cookie","name":"Session","description":"Yahoo Finance uses cookie-based authentication for some endpoints"}}},"GET /v10/finance/quoteSummary/{symbol}":{"protocol":"http","operationId":"getTickerSummary","responses":{"200":{"description":"Successful response with ticker summary","content":{"application/json":{"schema":{"type":"object","properties":{"quoteSummary":{"type":"object","properties":{"result":{"type":"array","items":{"type":"object"},"key$":"result"},"error":{"type":"null","key$":"error"}},"index$":0}}}}}},"404":{"description":"Symbol not found","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"string"},"description":{"type":"string"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"symbol","in":"path","required":true,"description":"Ticker symbol","schema":{"type":"string"},"index$":0},{"name":"modules","in":"query","description":"Comma-separated list of data modules to retrieve","schema":{"type":"string"},"example":"assetProfile,financialData,defaultKeyStatistics","index$":1}],"securitySource":"unspecified","securitySchemes":{"cookieAuth":{"type":"apiKey","in":"cookie","name":"Session","description":"Yahoo Finance uses cookie-based authentication for some endpoints"}}},"GET /v6/finance/quote":{"protocol":"http","operationId":"getQuotes","responses":{"200":{"description":"Quote data for requested tickers","content":{"application/json":{"schema":{"type":"object","properties":{"quoteResponse":{"key$":"quoteResponse","properties":{"error":{"type":"null","key$":"error"},"result":{"items":{"properties":{"regularMarketChange":{"type":"number"},"regularMarketChangePercent":{"type":"number"},"regularMarketDayHigh":{"type":"number"},"regularMarketDayLow":{"type":"number"},"regularMarketOpen":{"type":"number"},"regularMarketPreviousClose":{"type":"number"},"regularMarketPrice":{"type":"number"},"regularMarketVolume":{"type":"integer"},"symbol":{"type":"string"}},"type":"object"},"type":"array","key$":"result"}},"type":"object","index$":0}}}}}}},"parameters":[{"name":"symbols","in":"query","required":true,"description":"Comma-separated list of ticker symbols","schema":{"type":"string"},"example":"AAPL,MSFT,GOOGL","index$":0}],"securitySource":"unspecified","securitySchemes":{"cookieAuth":{"type":"apiKey","in":"cookie","name":"Session","description":"Yahoo Finance uses cookie-based authentication for some endpoints"}}},"GET /ws/insights/v1/finance/insights":{"protocol":"http","operationId":"getInsights","responses":{"200":{"description":"Ticker insights","content":{"application/json":{"schema":{"type":"object","properties":{"finance":{"key$":"finance","properties":{"result":{"type":"object","key$":"result"}},"type":"object","index$":0}}}}}}},"parameters":[{"name":"symbol","in":"query","required":true,"description":"Ticker symbol","schema":{"type":"string"},"index$":0}],"securitySource":"unspecified","securitySchemes":{"cookieAuth":{"type":"apiKey","in":"cookie","name":"Session","description":"Yahoo Finance uses cookie-based authentication for some endpoints"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let ticker_ref01_data = Object.values(setup.data.existing.ticker)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const ticker_ref01_ent = client.Ticker()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/ticker/TickerTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = YahooFinanceSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['ticker01','ticker02','ticker03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'YAHOO_FINANCE_TEST_TICKER_ENTID': idmap,
    'YAHOO_FINANCE_TEST_LIVE': 'FALSE',
    'YAHOO_FINANCE_TEST_EXPLAIN': 'FALSE',
    'YAHOO_FINANCE_APIKEY': '',
  })

  idmap = env['YAHOO_FINANCE_TEST_TICKER_ENTID']

  const live = 'TRUE' === env.YAHOO_FINANCE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['YAHOO_FINANCE_TEST_TICKER_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new YahooFinanceSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.YAHOO_FINANCE_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.YAHOO_FINANCE_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
