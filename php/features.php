<?php
declare(strict_types=1);

// YahooFinance SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class YahooFinanceFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new YahooFinanceBaseFeature();
            case "test":
                return new YahooFinanceTestFeature();
            default:
                return new YahooFinanceBaseFeature();
        }
    }
}
