# Market entity test

require "minitest/autorun"
require "json"
require_relative "../YahooFinance_sdk"
require_relative "runner"

class MarketEntityTest < Minitest::Test
  def test_create_instance
    testsdk = YahooFinanceSDK.test(nil, nil)
    ent = testsdk.Market(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = market_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "market." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set YAHOO_FINANCE_TEST_MARKET_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    market_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.market")))
    market_ref01_data = nil
    if market_ref01_data_raw.length > 0
      market_ref01_data = Helpers.to_map(market_ref01_data_raw[0][1])
    end

    # LOAD
    market_ref01_ent = client.Market(nil)
    market_ref01_match_dt0 = {}
    market_ref01_data_dt0_loaded = market_ref01_ent.load(market_ref01_match_dt0, nil)
    assert !market_ref01_data_dt0_loaded.nil?

  end
end

def market_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "market", "MarketTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = YahooFinanceSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["market01", "market02", "market03", "trending01", "trending02", "trending03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["YAHOO_FINANCE_TEST_MARKET_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "YAHOO_FINANCE_TEST_MARKET_ENTID" => idmap,
    "YAHOO_FINANCE_TEST_LIVE" => "FALSE",
    "YAHOO_FINANCE_TEST_EXPLAIN" => "FALSE",
    "YAHOO_FINANCE_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["YAHOO_FINANCE_TEST_MARKET_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["YAHOO_FINANCE_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["YAHOO_FINANCE_APIKEY"],
      },
      extra || {},
    ])
    client = YahooFinanceSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["YAHOO_FINANCE_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["YAHOO_FINANCE_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
