<?php
declare(strict_types=1);

// YahooFinance SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class YahooFinanceMakeContext
{
    public static function call(array $ctxmap, ?YahooFinanceContext $basectx): YahooFinanceContext
    {
        return new YahooFinanceContext($ctxmap, $basectx);
    }
}
