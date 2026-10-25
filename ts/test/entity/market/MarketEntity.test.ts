

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { YahooFinanceSDK, BaseFeature, config, stdutil } from '../../..'

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


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = YahooFinanceSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Market().load({"region":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.YAHOO_FINANCE_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'market.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"result":{"a":true,"h":"Result","n":"result","r":false,"t":"`$ARRAY`","key$":"result","index$":0}},"name":"market","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/finance/trending/{region}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"US","k":"param","n":"region","or":"region","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/finance/trending/{region}","q":{"exist":["region"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"finance"},{"lit":"trending"},{"var":"region"}],"t":{"req":"`reqdata`","res":"`body.finance`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"market","name__orig":"market","Name":"Market","name_":"market","name-":"market","NAME":"MARKET","index$":1}, {"active":true,"entity":"market","key$":"BasicMarketFlow","kind":"basic","name":"BasicMarketFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"market_ref01","srcdatavar":"market_ref01_data","suffix":"_dt0"},"m":{"id":"market01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-market_ref01"}}],"unreachable":true}]}, 'Market', {"GET /v1/finance/trending/{region}":{"protocol":"http","parameters":[{"name":"region","in":"path","required":true,"description":"Region code (e.g., US, GB, AU)","schema":{"type":"string","default":"US"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let market_ref01_data = Object.values(setup.data.existing.market)[0] as any

  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  
