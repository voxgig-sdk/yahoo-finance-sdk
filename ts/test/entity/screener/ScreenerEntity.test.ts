

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


describe('ScreenerEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when YAHOO_FINANCE_TEST_LIVE=TRUE.
  afterEach(liveDelay('YAHOO_FINANCE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = YahooFinanceSDK.test()
    const ent = testsdk.Screener()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.YAHOO_FINANCE_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'screener.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"offset":{"a":true,"h":"Offset","n":"offset","r":false,"sh":"Offset for pagination","t":"`$INTEGER`","key$":"offset","index$":0},"query":{"a":true,"h":"Query","n":"query","r":false,"sh":"Query criteria","t":"`$OBJECT`","key$":"query","index$":1},"quoteType":{"a":true,"h":"Quote Type","n":"quoteType","r":false,"t":"`$STRING`","key$":"quoteType","index$":2},"result":{"a":true,"h":"Result","n":"result","r":false,"t":"`$ARRAY`","key$":"result","index$":3},"size":{"a":true,"h":"Size","n":"size","r":false,"sh":"Number of results to return","t":"`$INTEGER`","key$":"size","index$":4},"sortField":{"a":true,"h":"Sort Field","n":"sortField","r":false,"sh":"Field to sort by","t":"`$STRING`","key$":"sortField","index$":5},"sortType":{"a":true,"h":"Sort Type","n":"sortType","r":false,"t":"`$STRING`","key$":"sortType","index$":6}},"name":"screener","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v1/finance/screener","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/finance/screener","q":{},"r":{},"s":[{"lit":"v1"},{"lit":"finance"},{"lit":"screener"}],"t":{"req":"`reqdata`","res":"`body.finance`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"screener","name__orig":"screener","Name":"Screener","name_":"screener","name-":"screener","NAME":"SCREENER","index$":2}, {"active":true,"entity":"screener","key$":"BasicScreenerFlow","kind":"basic","name":"BasicScreenerFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"screener_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Screener', {"POST /v1/finance/screener":{"protocol":"http","operationId":"screenStocks","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"size":{"type":"integer","description":"Number of results to return","key$":"size"},"offset":{"type":"integer","description":"Offset for pagination","key$":"offset"},"sortField":{"type":"string","description":"Field to sort by","key$":"sortField"},"sortType":{"type":"string","enum":["ASC","DESC"],"key$":"sortType"},"quoteType":{"type":"string","enum":["EQUITY","ETF","MUTUALFUND"],"key$":"quoteType"},"query":{"type":"object","description":"Query criteria","key$":"query"}},"index$":1}}}},"responses":{"200":{"description":"Screening results","content":{"application/json":{"schema":{"type":"object","properties":{"finance":{"type":"object","properties":{"result":{"type":"array","items":{"type":"object"},"key$":"result"}},"index$":0}}}}}}},"parameters":[],"securitySource":"unspecified","securitySchemes":{"cookieAuth":{"type":"apiKey","in":"cookie","name":"Session","description":"Yahoo Finance uses cookie-based authentication for some endpoints"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const screener_ref01_ent = client.Screener()
    let screener_ref01_data = setup.data.new.screener['screener_ref01']

    screener_ref01_data = (await screener_ref01_ent.create(screener_ref01_data)).data()
    assert(null != screener_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/screener/ScreenerTestData.json')

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
    ['screener01','screener02','screener03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'YAHOO_FINANCE_TEST_SCREENER_ENTID': idmap,
    'YAHOO_FINANCE_TEST_LIVE': 'FALSE',
    'YAHOO_FINANCE_TEST_EXPLAIN': 'FALSE',
    'YAHOO_FINANCE_APIKEY': '',
  })

  idmap = env['YAHOO_FINANCE_TEST_SCREENER_ENTID']

  const live = 'TRUE' === env.YAHOO_FINANCE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['YAHOO_FINANCE_TEST_SCREENER_ENTID']
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
  
