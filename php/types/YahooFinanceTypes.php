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
    public ?array $result = null;
}

/** Request payload for Market#load. */
class MarketLoadMatch
{
    public string $region;
}

/** Screener entity data model. */
class Screener
{
    public ?int $offset = null;
    public ?array $query = null;
    public ?string $quoteType = null;
    public ?array $result = null;
    public ?int $size = null;
    public ?string $sortField = null;
    public ?string $sortType = null;
}

/** Request payload for Screener#create. */
class ScreenerCreateData
{
    public ?int $offset = null;
    public ?array $query = null;
    public ?string $quoteType = null;
    public ?array $result = null;
    public ?int $size = null;
    public ?string $sortField = null;
    public ?string $sortType = null;
}

/** Search entity data model. */
class Search
{
    public ?array $news = null;
    public ?array $quotes = null;
}

/** Request payload for Search#list. */
class SearchListMatch
{
    public ?array $news = null;
    public ?array $quotes = null;
}

/** Ticker entity data model. */
class Ticker
{
    public mixed $error = null;
    public ?array $result = null;
}

/** Request payload for Ticker#load. */
class TickerLoadMatch
{
    public ?string $symbol = null;
}

