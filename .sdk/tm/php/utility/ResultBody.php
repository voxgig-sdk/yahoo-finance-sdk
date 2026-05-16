<?php
declare(strict_types=1);

// YahooFinance SDK utility: result_body

class YahooFinanceResultBody
{
    public static function call(YahooFinanceContext $ctx): ?YahooFinanceResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
