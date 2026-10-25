# Download entity test

require "minitest/autorun"
require "json"
require_relative "../YahooFinance_sdk"
require_relative "runner"

class DownloadEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = YahooFinanceSDK.test(nil, nil)
    ent = testsdk.Download(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = YahooFinanceConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = YahooFinanceSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Download(nil).load({ "id" => 1, "period1" => 1, "period2" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
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
    if setup[:live]
      Runner.live_miss(LIVE_STRICT, "Live entity test blocked: " + "the flow loads a download record it has no list to find")
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
    download_ref01_match_dt0 = {
      "id" => download_ref01_data["id"],
    }
    download_ref01_data_dt0_loaded = download_ref01_ent.load(download_ref01_match_dt0, nil)
    download_ref01_data_dt0_load_result = Helpers.to_map(download_ref01_data_dt0_loaded.respond_to?(:data_get) ? download_ref01_data_dt0_loaded.data_get : download_ref01_data_dt0_loaded)
    assert !download_ref01_data_dt0_load_result.nil?
    assert_equal download_ref01_data_dt0_load_result["id"], download_ref01_data["id"]

  end
end

def download_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "download", "DownloadTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
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

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["YAHOO_FINANCE_TEST_DOWNLOAD_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "YAHOO_FINANCE_TEST_DOWNLOAD_ENTID" => idmap,
    "YAHOO_FINANCE_TEST_LIVE" => "FALSE",
    "YAHOO_FINANCE_TEST_EXPLAIN" => "FALSE",
    "YAHOO_FINANCE_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["YAHOO_FINANCE_TEST_DOWNLOAD_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["YAHOO_FINANCE_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
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
