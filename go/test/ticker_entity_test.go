package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/yahoo-finance-sdk/go"
	"github.com/voxgig-sdk/yahoo-finance-sdk/go/core"

	vs "github.com/voxgig-sdk/yahoo-finance-sdk/go/utility/struct"
)

func TestTickerEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Ticker(nil)
		if ent == nil {
			t.Fatal("expected non-nil TickerEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := tickerBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "ticker." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set YAHOO_FINANCE_TEST_TICKER_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		tickerRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.ticker", setup.data)))
		var tickerRef01Data map[string]any
		if len(tickerRef01DataRaw) > 0 {
			tickerRef01Data = core.ToMapAny(tickerRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = tickerRef01Data

		// LOAD
		tickerRef01Ent := client.Ticker(nil)
		tickerRef01MatchDt0 := map[string]any{}
		tickerRef01DataDt0Loaded, err := tickerRef01Ent.Load(tickerRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if tickerRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func tickerBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "ticker", "TickerTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read ticker test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse ticker test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"ticker01", "ticker02", "ticker03", "quote_summary01", "quote_summary02", "quote_summary03", "option01", "option02", "option03", "chart01", "chart02", "chart03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("YAHOO_FINANCE_TEST_TICKER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"YAHOO_FINANCE_TEST_TICKER_ENTID": idmap,
		"YAHOO_FINANCE_TEST_LIVE":      "FALSE",
		"YAHOO_FINANCE_TEST_EXPLAIN":   "FALSE",
		"YAHOO_FINANCE_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["YAHOO_FINANCE_TEST_TICKER_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["YAHOO_FINANCE_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["YAHOO_FINANCE_APIKEY"],
			},
			extra,
		})
		client = sdk.NewYahooFinanceSDK(core.ToMapAny(mergedOpts))
	}

	live := env["YAHOO_FINANCE_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["YAHOO_FINANCE_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
