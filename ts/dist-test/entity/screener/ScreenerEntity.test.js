"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ScreenerEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when YAHOO_FINANCE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('YAHOO_FINANCE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.YahooFinanceSDK.test();
        const ent = testsdk.Screener();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.YAHOO_FINANCE_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'screener.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "offset": { "a": true, "h": "Offset", "n": "offset", "r": false, "sh": "Offset for pagination", "t": "`$INTEGER`", "key$": "offset", "index$": 0 }, "query": { "a": true, "h": "Query", "n": "query", "r": false, "sh": "Query criteria", "t": "`$OBJECT`", "key$": "query", "index$": 1 }, "quoteType": { "a": true, "h": "Quote Type", "n": "quoteType", "r": false, "t": "`$STRING`", "key$": "quoteType", "index$": 2 }, "result": { "a": true, "h": "Result", "n": "result", "r": false, "t": "`$ARRAY`", "key$": "result", "index$": 3 }, "size": { "a": true, "h": "Size", "n": "size", "r": false, "sh": "Number of results to return", "t": "`$INTEGER`", "key$": "size", "index$": 4 }, "sortField": { "a": true, "h": "Sort Field", "n": "sortField", "r": false, "sh": "Field to sort by", "t": "`$STRING`", "key$": "sortField", "index$": 5 }, "sortType": { "a": true, "h": "Sort Type", "n": "sortType", "r": false, "t": "`$STRING`", "key$": "sortType", "index$": 6 } }, "name": "screener", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v1/finance/screener", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v1/finance/screener", "q": {}, "r": {}, "s": [{ "lit": "v1" }, { "lit": "finance" }, { "lit": "screener" }], "t": { "req": "`reqdata`", "res": "`body.finance`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "screener", "name__orig": "screener", "Name": "Screener", "name_": "screener", "name-": "screener", "NAME": "SCREENER", "index$": 2 }, { "active": true, "entity": "screener", "key$": "BasicScreenerFlow", "kind": "basic", "name": "BasicScreenerFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "screener_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'Screener', { "POST /v1/finance/screener": { "protocol": "http", "operationId": "screenStocks", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "size": { "type": "integer", "description": "Number of results to return", "key$": "size" }, "offset": { "type": "integer", "description": "Offset for pagination", "key$": "offset" }, "sortField": { "type": "string", "description": "Field to sort by", "key$": "sortField" }, "sortType": { "type": "string", "enum": ["ASC", "DESC"], "key$": "sortType" }, "quoteType": { "type": "string", "enum": ["EQUITY", "ETF", "MUTUALFUND"], "key$": "quoteType" }, "query": { "type": "object", "description": "Query criteria", "key$": "query" } }, "index$": 1 } } } }, "responses": { "200": { "description": "Screening results", "content": { "application/json": { "schema": { "type": "object", "properties": { "finance": { "type": "object", "properties": { "result": { "type": "array", "items": { "type": "object" }, "key$": "result" } }, "index$": 0 } } } } } } }, "parameters": [], "securitySource": "unspecified", "securitySchemes": { "cookieAuth": { "type": "apiKey", "in": "cookie", "name": "Session", "description": "Yahoo Finance uses cookie-based authentication for some endpoints" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const screener_ref01_ent = client.Screener();
        let screener_ref01_data = setup.data.new.screener['screener_ref01'];
        screener_ref01_data = (await screener_ref01_ent.create(screener_ref01_data)).data();
        (0, node_assert_1.default)(null != screener_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/screener/ScreenerTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.YahooFinanceSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['screener01', 'screener02', 'screener03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'YAHOO_FINANCE_TEST_SCREENER_ENTID': idmap,
        'YAHOO_FINANCE_TEST_LIVE': 'FALSE',
        'YAHOO_FINANCE_TEST_EXPLAIN': 'FALSE',
        'YAHOO_FINANCE_APIKEY': '',
    });
    idmap = env['YAHOO_FINANCE_TEST_SCREENER_ENTID'];
    const live = 'TRUE' === env.YAHOO_FINANCE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['YAHOO_FINANCE_TEST_SCREENER_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.YahooFinanceSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
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
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=ScreenerEntity.test.js.map