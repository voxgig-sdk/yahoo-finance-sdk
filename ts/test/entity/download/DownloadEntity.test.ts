

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":0}],"id":{"field":"id","name":"id"},"name":"download","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"symbol","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"event","orig":"event","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"1d","kind":"query","name":"interval","orig":"interval","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"period1","orig":"period1","reqd":true,"type":"`$INTEGER`","index$":2},{"active":true,"kind":"query","name":"period2","orig":"period2","reqd":true,"type":"`$INTEGER`","index$":3}]},"contract":{"id":"GET /v7/finance/download/{symbol}","json":"{\"operationId\":\"downloadHistoricalData\",\"parameters\":[{\"description\":\"Ticker symbol\",\"in\":\"path\",\"name\":\"symbol\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Start date as Unix timestamp\",\"in\":\"query\",\"name\":\"period1\",\"required\":true,\"schema\":{\"format\":\"int64\",\"type\":\"integer\"}},{\"description\":\"End date as Unix timestamp\",\"in\":\"query\",\"name\":\"period2\",\"required\":true,\"schema\":{\"format\":\"int64\",\"type\":\"integer\"}},{\"description\":\"Data interval\",\"in\":\"query\",\"name\":\"interval\",\"schema\":{\"default\":\"1d\",\"enum\":[\"1d\",\"1wk\",\"1mo\"],\"type\":\"string\"}},{\"description\":\"Events to include\",\"in\":\"query\",\"name\":\"events\",\"schema\":{\"enum\":[\"history\",\"div\",\"split\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"text/csv\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"CSV file with historical data\"},\"404\":{\"description\":\"Symbol not found\"}},\"securitySchemes\":{\"cookieAuth\":{\"description\":\"Yahoo Finance uses cookie-based authentication for some endpoints\",\"in\":\"cookie\",\"name\":\"Session\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v7/finance/download/{symbol}","rename":{"param":{"symbol":"id"}},"segments":[{"lit":"v7"},{"lit":"finance"},{"lit":"download"},{"var":"id"}],"select":{"exist":["event","id","interval","period1","period2"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"download","name__orig":"download","Name":"Download","name_":"download","name-":"download","NAME":"DOWNLOAD","index$":0}, {"active":true,"entity":"download","key$":"BasicDownloadFlow","kind":"basic","name":"BasicDownloadFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"download_ref01","srcdatavar":"download_ref01_data","suffix":"_dt0"},"match":{"id":"download01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-download_ref01"}}],"index$":0}]}, 'Download')
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
  
