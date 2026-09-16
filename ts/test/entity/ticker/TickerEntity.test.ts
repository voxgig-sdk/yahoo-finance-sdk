

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"error","req":false,"type":"`$NULL`","index$":0},{"active":true,"name":"result","req":false,"type":"`$ARRAY`","index$":1}],"name":"ticker","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"AAPL","kind":"param","name":"symbol","orig":"symbol","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"event","orig":"event","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"1d","kind":"query","name":"interval","orig":"interval","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"period1","orig":"period1","reqd":false,"type":"`$INTEGER`","index$":2},{"active":true,"kind":"query","name":"period2","orig":"period2","reqd":false,"type":"`$INTEGER`","index$":3},{"active":true,"kind":"query","name":"range","orig":"range","reqd":false,"type":"`$STRING`","index$":4}]},"contract":{"id":"GET /v8/finance/chart/{symbol}","json":"{\"operationId\":\"getTickerChart\",\"parameters\":[{\"description\":\"Ticker symbol (e.g., AAPL, BTC-USD, EURUSD=X)\",\"example\":\"AAPL\",\"in\":\"path\",\"name\":\"symbol\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Start date as Unix timestamp\",\"in\":\"query\",\"name\":\"period1\",\"schema\":{\"format\":\"int64\",\"type\":\"integer\"}},{\"description\":\"End date as Unix timestamp\",\"in\":\"query\",\"name\":\"period2\",\"schema\":{\"format\":\"int64\",\"type\":\"integer\"}},{\"description\":\"Data interval\",\"in\":\"query\",\"name\":\"interval\",\"schema\":{\"default\":\"1d\",\"enum\":[\"1m\",\"2m\",\"5m\",\"15m\",\"30m\",\"60m\",\"90m\",\"1h\",\"1d\",\"5d\",\"1wk\",\"1mo\",\"3mo\"],\"type\":\"string\"}},{\"description\":\"Time range for data\",\"in\":\"query\",\"name\":\"range\",\"schema\":{\"enum\":[\"1d\",\"5d\",\"1mo\",\"3mo\",\"6mo\",\"1y\",\"2y\",\"5y\",\"10y\",\"ytd\",\"max\"],\"type\":\"string\"}},{\"description\":\"Include dividends and splits\",\"in\":\"query\",\"name\":\"events\",\"schema\":{\"enum\":[\"div\",\"split\",\"div,split\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"chart\":{\"properties\":{\"error\":{\"type\":\"null\"},\"result\":{\"items\":{\"properties\":{\"indicators\":{\"properties\":{\"quote\":{\"items\":{\"properties\":{\"close\":{\"items\":{\"type\":\"number\"},\"type\":\"array\"},\"high\":{\"items\":{\"type\":\"number\"},\"type\":\"array\"},\"low\":{\"items\":{\"type\":\"number\"},\"type\":\"array\"},\"open\":{\"items\":{\"type\":\"number\"},\"type\":\"array\"},\"volume\":{\"items\":{\"type\":\"integer\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"meta\":{\"properties\":{\"chartPreviousClose\":{\"type\":\"number\"},\"currency\":{\"type\":\"string\"},\"exchangeName\":{\"type\":\"string\"},\"instrumentType\":{\"type\":\"string\"},\"regularMarketPrice\":{\"type\":\"number\"},\"symbol\":{\"type\":\"string\"}},\"type\":\"object\"},\"timestamp\":{\"items\":{\"format\":\"int64\",\"type\":\"integer\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with chart data\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"type\":\"string\"},\"description\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Symbol not found\"}},\"securitySchemes\":{\"cookieAuth\":{\"description\":\"Yahoo Finance uses cookie-based authentication for some endpoints\",\"in\":\"cookie\",\"name\":\"Session\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v8/finance/chart/{symbol}","segments":[{"lit":"v8"},{"lit":"finance"},{"lit":"chart"},{"var":"symbol"}],"select":{"exist":["event","interval","period1","period2","range","symbol"]},"transform":{"req":"`reqdata`","res":"`body.chart`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"example":"5m","kind":"query","name":"interval","orig":"interval","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"1d","kind":"query","name":"range","orig":"range","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"symbol","orig":"symbol","reqd":true,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /v1/finance/spark","json":"{\"operationId\":\"getSparkData\",\"parameters\":[{\"description\":\"Comma-separated list of ticker symbols\",\"in\":\"query\",\"name\":\"symbols\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Time range\",\"in\":\"query\",\"name\":\"range\",\"schema\":{\"default\":\"1d\",\"enum\":[\"1d\",\"5d\",\"1mo\",\"3mo\",\"6mo\",\"1y\",\"5y\"],\"type\":\"string\"}},{\"description\":\"Data interval\",\"in\":\"query\",\"name\":\"interval\",\"schema\":{\"default\":\"5m\",\"enum\":[\"1m\",\"5m\",\"15m\",\"1d\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"spark\":{\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Spark chart data\"}},\"securitySchemes\":{\"cookieAuth\":{\"description\":\"Yahoo Finance uses cookie-based authentication for some endpoints\",\"in\":\"cookie\",\"name\":\"Session\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/finance/spark","segments":[{"lit":"v1"},{"lit":"finance"},{"lit":"spark"}],"select":{"exist":["interval","range","symbol"]},"transform":{"req":"`reqdata`","res":"`body.spark`"},"index$":1},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"symbol","orig":"symbol","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"date","orig":"date","reqd":false,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /v7/finance/options/{symbol}","json":"{\"operationId\":\"getOptions\",\"parameters\":[{\"description\":\"Ticker symbol\",\"in\":\"path\",\"name\":\"symbol\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Expiration date as Unix timestamp\",\"in\":\"query\",\"name\":\"date\",\"schema\":{\"format\":\"int64\",\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"optionChain\":{\"properties\":{\"result\":{\"items\":{\"properties\":{\"expirationDates\":{\"items\":{\"type\":\"integer\"},\"type\":\"array\"},\"options\":{\"items\":{\"properties\":{\"calls\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"puts\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"},\"strikes\":{\"items\":{\"type\":\"number\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Options chain data\"}},\"securitySchemes\":{\"cookieAuth\":{\"description\":\"Yahoo Finance uses cookie-based authentication for some endpoints\",\"in\":\"cookie\",\"name\":\"Session\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v7/finance/options/{symbol}","segments":[{"lit":"v7"},{"lit":"finance"},{"lit":"options"},{"var":"symbol"}],"select":{"exist":["date","symbol"]},"transform":{"req":"`reqdata`","res":"`body.optionChain`"},"index$":2},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"symbol","orig":"symbol","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"example":"assetProfile,financialData,defaultKeyStatistics","kind":"query","name":"module","orig":"module","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /v10/finance/quoteSummary/{symbol}","json":"{\"operationId\":\"getTickerSummary\",\"parameters\":[{\"description\":\"Ticker symbol\",\"in\":\"path\",\"name\":\"symbol\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Comma-separated list of data modules to retrieve\",\"example\":\"assetProfile,financialData,defaultKeyStatistics\",\"in\":\"query\",\"name\":\"modules\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"quoteSummary\":{\"properties\":{\"error\":{\"type\":\"null\"},\"result\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with ticker summary\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"type\":\"string\"},\"description\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Symbol not found\"}},\"securitySchemes\":{\"cookieAuth\":{\"description\":\"Yahoo Finance uses cookie-based authentication for some endpoints\",\"in\":\"cookie\",\"name\":\"Session\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v10/finance/quoteSummary/{symbol}","segments":[{"lit":"v10"},{"lit":"finance"},{"lit":"quoteSummary"},{"var":"symbol"}],"select":{"exist":["module","symbol"]},"transform":{"req":"`reqdata`","res":"`body.quoteSummary`"},"index$":3},{"active":true,"args":{"query":[{"active":true,"example":"AAPL,MSFT,GOOGL","kind":"query","name":"symbol","orig":"symbol","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /v6/finance/quote","json":"{\"operationId\":\"getQuotes\",\"parameters\":[{\"description\":\"Comma-separated list of ticker symbols\",\"example\":\"AAPL,MSFT,GOOGL\",\"in\":\"query\",\"name\":\"symbols\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"quoteResponse\":{\"properties\":{\"error\":{\"type\":\"null\"},\"result\":{\"items\":{\"properties\":{\"regularMarketChange\":{\"type\":\"number\"},\"regularMarketChangePercent\":{\"type\":\"number\"},\"regularMarketDayHigh\":{\"type\":\"number\"},\"regularMarketDayLow\":{\"type\":\"number\"},\"regularMarketOpen\":{\"type\":\"number\"},\"regularMarketPreviousClose\":{\"type\":\"number\"},\"regularMarketPrice\":{\"type\":\"number\"},\"regularMarketVolume\":{\"type\":\"integer\"},\"symbol\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Quote data for requested tickers\"}},\"securitySchemes\":{\"cookieAuth\":{\"description\":\"Yahoo Finance uses cookie-based authentication for some endpoints\",\"in\":\"cookie\",\"name\":\"Session\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v6/finance/quote","segments":[{"lit":"v6"},{"lit":"finance"},{"lit":"quote"}],"select":{"exist":["symbol"]},"transform":{"req":"`reqdata`","res":"`body.quoteResponse`"},"index$":4},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"symbol","orig":"symbol","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /ws/insights/v1/finance/insights","json":"{\"operationId\":\"getInsights\",\"parameters\":[{\"description\":\"Ticker symbol\",\"in\":\"query\",\"name\":\"symbol\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"finance\":{\"properties\":{\"result\":{\"type\":\"object\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Ticker insights\"}},\"securitySchemes\":{\"cookieAuth\":{\"description\":\"Yahoo Finance uses cookie-based authentication for some endpoints\",\"in\":\"cookie\",\"name\":\"Session\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/ws/insights/v1/finance/insights","segments":[{"lit":"ws"},{"lit":"insights"},{"lit":"v1"},{"lit":"finance"},{"lit":"insights"}],"select":{"exist":["symbol"]},"transform":{"req":"`reqdata`","res":"`body.finance`"},"index$":5}],"key$":"load"}},"relations":{"ancestors":[["quote_summary"],["option"],["chart"]]},"key$":"ticker","name__orig":"ticker","Name":"Ticker","name_":"ticker","name-":"ticker","NAME":"TICKER","index$":4}, {"active":true,"entity":"ticker","key$":"BasicTickerFlow","kind":"basic","name":"BasicTickerFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"ticker_ref01","srcdatavar":"ticker_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-ticker_ref01"}}],"index$":0}]}, 'Ticker')
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
    ['ticker01','ticker02','ticker03','quote_summary01','quote_summary02','quote_summary03','option01','option02','option03','chart01','chart02','chart03'],
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
  
