<?php
declare(strict_types=1);

// Typed models for the YahooFinance SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Download entity data model. */
class Download
{
}

/** Request payload for Download#load. */
class DownloadLoadMatch
{
    public string $id;
}

/** Market entity data model. */
class Market
{
    public ?array $finance = null;
}

/** Request payload for Market#load. */
class MarketLoadMatch
{
    public string $region;
}

/** Screener entity data model. */
class Screener
{
    public ?array $finance = null;
    public ?int $offset = null;
    public ?array $query = null;
    public ?string $quote_type = null;
    public ?int $size = null;
    public ?string $sort_field = null;
    public ?string $sort_type = null;
}

/** Match filter for Screener#create (any subset of Screener fields). */
class ScreenerCreateData
{
    public ?array $finance = null;
    public ?int $offset = null;
    public ?array $query = null;
    public ?string $quote_type = null;
    public ?int $size = null;
    public ?string $sort_field = null;
    public ?string $sort_type = null;
}

/** Search entity data model. */
class Search
{
    public ?array $new = null;
    public ?array $quote = null;
}

/** Match filter for Search#list (any subset of Search fields). */
class SearchListMatch
{
    public ?array $new = null;
    public ?array $quote = null;
}

/** Ticker entity data model. */
class Ticker
{
    public ?array $chart = null;
    public ?array $finance = null;
    public ?array $option_chain = null;
    public ?array $quote_response = null;
    public ?array $quote_summary = null;
    public ?array $spark = null;
}

/** Request payload for Ticker#load. */
class TickerLoadMatch
{
    public string $symbol;
}

