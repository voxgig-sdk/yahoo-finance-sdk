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

func TestScreenerEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Screener(nil)
		if ent == nil {
			t.Fatal("expected non-nil ScreenerEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := screenerBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "screener." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set YAHOOFINANCE_TEST_SCREENER_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		screenerRef01Ent := client.Screener(nil)
		screenerRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "screener"}, setup.data), "screener_ref01"))

		screenerRef01DataResult, err := screenerRef01Ent.Create(screenerRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		screenerRef01Data = core.ToMapAny(screenerRef01DataResult)
		if screenerRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func screenerBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "screener", "ScreenerTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read screener test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse screener test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"screener01", "screener02", "screener03"},
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
	entidEnvRaw := os.Getenv("YAHOOFINANCE_TEST_SCREENER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"YAHOOFINANCE_TEST_SCREENER_ENTID": idmap,
		"YAHOOFINANCE_TEST_LIVE":      "FALSE",
		"YAHOOFINANCE_TEST_EXPLAIN":   "FALSE",
		"YAHOOFINANCE_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["YAHOOFINANCE_TEST_SCREENER_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["YAHOOFINANCE_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["YAHOOFINANCE_APIKEY"],
			},
			extra,
		})
		client = sdk.NewYahooFinanceSDK(core.ToMapAny(mergedOpts))
	}

	live := env["YAHOOFINANCE_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["YAHOOFINANCE_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
