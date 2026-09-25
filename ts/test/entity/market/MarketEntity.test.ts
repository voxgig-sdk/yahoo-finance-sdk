

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


describe('MarketEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when YAHOO_FINANCE_TEST_LIVE=TRUE.
  afterEach(liveDelay('YAHOO_FINANCE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = YahooFinanceSDK.test()
    const ent = testsdk.Market()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.YAHOO_FINANCE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'market.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"result":{"a":true,"h":"Result","n":"result","r":false,"t":"`$ARRAY`","key$":"result","index$":0}},"name":"market","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/finance/trending/{region}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"US","k":"param","n":"region","or":"region","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/finance/trending/{region}","q":{"exist":["region"]},"r":{},"s":[{"lit":"v1"},{"lit":"finance"},{"lit":"trending"},{"var":"region"}],"t":{"req":"`reqdata`","res":"`body.finance`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"market","name__orig":"market","Name":"Market","name_":"market","name-":"market","NAME":"MARKET","index$":1}, {"active":true,"entity":"market","key$":"BasicMarketFlow","kind":"basic","name":"BasicMarketFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"market_ref01","srcdatavar":"market_ref01_data","suffix":"_dt0"},"m":{"id":"market01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-market_ref01"}}],"index$":0}]}, 'Market', {"GET /v1/finance/trending/{region}":{"protocol":"http","operationId":"getTrending","responses":{"200":{"description":"Trending tickers","content":{"application/json":{"schema":{"type":"object","properties":{"finance":{"type":"object","properties":{"result":{"type":"array","items":{"type":"object","properties":{"quotes":{"type":"array","items":{"type":"object","properties":{"symbol":{"type":"string"}}}}}},"key$":"result"}},"index$":0}}}}}}},"parameters":[{"name":"region","in":"path","required":true,"description":"Region code (e.g., US, GB, AU)","schema":{"type":"string","default":"US"},"index$":0}],"securitySource":"unspecified","securitySchemes":{"cookieAuth":{"type":"apiKey","in":"cookie","name":"Session","description":"Yahoo Finance uses cookie-based authentication for some endpoints"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let market_ref01_data = Object.values(setup.data.existing.market)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const market_ref01_ent = client.Market()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/market/MarketTestData.json')

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
    ['market01','market02','market03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'YAHOO_FINANCE_TEST_MARKET_ENTID': idmap,
    'YAHOO_FINANCE_TEST_LIVE': 'FALSE',
    'YAHOO_FINANCE_TEST_EXPLAIN': 'FALSE',
    'YAHOO_FINANCE_APIKEY': '',
  })

  idmap = env['YAHOO_FINANCE_TEST_MARKET_ENTID']

  const live = 'TRUE' === env.YAHOO_FINANCE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['YAHOO_FINANCE_TEST_MARKET_ENTID']
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
  
