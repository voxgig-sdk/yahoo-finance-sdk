<?php
declare(strict_types=1);

// YahooFinance SDK utility: feature_add

class YahooFinanceFeatureAdd
{
    public static function call(YahooFinanceContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
