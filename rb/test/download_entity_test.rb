# Download entity test

require "minitest/autorun"
require "json"
require_relative "../YahooFinance_sdk"
require_relative "runner"

class DownloadEntityTest < Minitest::Test
  def test_create_instance
    testsdk = YahooFinanceSDK.test(nil, nil)
    ent = testsdk.Download(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = download_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "download." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set YAHOOFINANCE_TEST_DOWNLOAD_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    download_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.download")))
    download_ref01_data = nil
    if download_ref01_data_raw.length > 0
      download_ref01_data = Helpers.to_map(download_ref01_data_raw[0][1])
    end

    # LOAD
    download_ref01_ent = client.Download(nil)
    download_ref01_match_dt0 = {}
    download_ref01_data_dt0_loaded, err = download_ref01_ent.load(download_ref01_match_dt0, nil)
    assert_nil err
    assert !download_ref01_data_dt0_loaded.nil?

  end
end

def download_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "download", "DownloadTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = YahooFinanceSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["download01", "download02", "download03"],
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
  entid_env_raw = ENV["YAHOOFINANCE_TEST_DOWNLOAD_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "YAHOOFINANCE_TEST_DOWNLOAD_ENTID" => idmap,
    "YAHOOFINANCE_TEST_LIVE" => "FALSE",
    "YAHOOFINANCE_TEST_EXPLAIN" => "FALSE",
    "YAHOOFINANCE_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["YAHOOFINANCE_TEST_DOWNLOAD_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["YAHOOFINANCE_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["YAHOOFINANCE_APIKEY"],
      },
      extra || {},
    ])
    client = YahooFinanceSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["YAHOOFINANCE_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["YAHOOFINANCE_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
