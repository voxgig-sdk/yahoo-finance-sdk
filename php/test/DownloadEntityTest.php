<?php
declare(strict_types=1);

// Download entity test

require_once __DIR__ . '/../yahoofinance_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class DownloadEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = YahooFinanceSDK::test(null, null);
        $ent = $testsdk->Download(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = download_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "download." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set YAHOO_FINANCE_TEST_DOWNLOAD_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $download_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.download")));
        $download_ref01_data = null;
        if (count($download_ref01_data_raw) > 0) {
            $download_ref01_data = Helpers::to_map($download_ref01_data_raw[0][1]);
        }

        // LOAD
        $download_ref01_ent = $client->Download(null);
        $download_ref01_match_dt0 = [
            "id" => $download_ref01_data["id"],
        ];
        $download_ref01_data_dt0_loaded = $download_ref01_ent->load($download_ref01_match_dt0, null);
        $download_ref01_data_dt0_load_result = Helpers::to_map(is_object($download_ref01_data_dt0_loaded) && method_exists($download_ref01_data_dt0_loaded, 'data_get') ? $download_ref01_data_dt0_loaded->data_get() : $download_ref01_data_dt0_loaded);
        $this->assertNotNull($download_ref01_data_dt0_load_result);
        $this->assertEquals($download_ref01_data_dt0_load_result["id"], $download_ref01_data["id"]);

    }
}

function download_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/download/DownloadTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = YahooFinanceSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["download01", "download02", "download03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("YAHOO_FINANCE_TEST_DOWNLOAD_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "YAHOO_FINANCE_TEST_DOWNLOAD_ENTID" => $idmap,
        "YAHOO_FINANCE_TEST_LIVE" => "FALSE",
        "YAHOO_FINANCE_TEST_EXPLAIN" => "FALSE",
        "YAHOO_FINANCE_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["YAHOO_FINANCE_TEST_DOWNLOAD_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["YAHOO_FINANCE_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["YAHOO_FINANCE_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new YahooFinanceSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["YAHOO_FINANCE_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["YAHOO_FINANCE_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
