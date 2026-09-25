

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


describe('DownloadEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when YAHOO_FINANCE_TEST_LIVE=TRUE.
  afterEach(liveDelay('YAHOO_FINANCE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = YahooFinanceSDK.test()
    const ent = testsdk.Download()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.YAHOO_FINANCE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'download.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"download","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v7/finance/download/{symbol}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"symbol","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"event","or":"event","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"1d","k":"query","n":"interval","or":"interval","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"period1","or":"period1","r":true,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"period2","or":"period2","r":true,"t":"`$INTEGER`","index$":3}]},"k":"http","m":"GET","o":"/v7/finance/download/{symbol}","q":{"exist":["event","id","interval","period1","period2"]},"r":{"param":{"symbol":"id"}},"s":[{"lit":"v7"},{"lit":"finance"},{"lit":"download"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"download","name__orig":"download","Name":"Download","name_":"download","name-":"download","NAME":"DOWNLOAD","index$":0}, {"active":true,"entity":"download","key$":"BasicDownloadFlow","kind":"basic","name":"BasicDownloadFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"download_ref01","srcdatavar":"download_ref01_data","suffix":"_dt0"},"m":{"id":"download01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-download_ref01"}}],"index$":0}]}, 'Download', {"GET /v7/finance/download/{symbol}":{"protocol":"http","operationId":"downloadHistoricalData","responses":{"200":{"description":"CSV file with historical data","content":{"text/csv":{"schema":{"type":"string","format":"binary"}}}},"404":{"description":"Symbol not found"}},"parameters":[{"name":"symbol","in":"path","required":true,"description":"Ticker symbol","schema":{"type":"string"},"index$":0},{"name":"period1","in":"query","required":true,"description":"Start date as Unix timestamp","schema":{"type":"integer","format":"int64"},"index$":1},{"name":"period2","in":"query","required":true,"description":"End date as Unix timestamp","schema":{"type":"integer","format":"int64"},"index$":2},{"name":"interval","in":"query","description":"Data interval","schema":{"type":"string","enum":["1d","1wk","1mo"],"default":"1d"},"index$":3},{"name":"events","in":"query","description":"Events to include","schema":{"type":"string","enum":["history","div","split"]},"index$":4}],"securitySource":"unspecified","securitySchemes":{"cookieAuth":{"type":"apiKey","in":"cookie","name":"Session","description":"Yahoo Finance uses cookie-based authentication for some endpoints"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let download_ref01_data = Object.values(setup.data.existing.download)[0] as any

    // LOAD
    const download_ref01_ent = client.Download()
    const download_ref01_match_dt0: any = {}
    download_ref01_match_dt0.id = download_ref01_data.id
    const download_ref01_data_dt0 = (await download_ref01_ent.load(download_ref01_match_dt0)).data()
    assert(download_ref01_data_dt0.id === download_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/download/DownloadTestData.json')

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
    ['download01','download02','download03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'YAHOO_FINANCE_TEST_DOWNLOAD_ENTID': idmap,
    'YAHOO_FINANCE_TEST_LIVE': 'FALSE',
    'YAHOO_FINANCE_TEST_EXPLAIN': 'FALSE',
    'YAHOO_FINANCE_APIKEY': '',
  })

  idmap = env['YAHOO_FINANCE_TEST_DOWNLOAD_ENTID']

  const live = 'TRUE' === env.YAHOO_FINANCE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['YAHOO_FINANCE_TEST_DOWNLOAD_ENTID']
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
  
