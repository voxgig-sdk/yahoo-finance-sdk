<?php
declare(strict_types=1);

// YahooFinance SDK utility: prepare_body

class YahooFinancePrepareBody
{
    public static function call(YahooFinanceContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
