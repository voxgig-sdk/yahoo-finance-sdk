<?php
declare(strict_types=1);

// YahooFinance SDK utility: result_headers

class YahooFinanceResultHeaders
{
    public static function call(YahooFinanceContext $ctx): ?YahooFinanceResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
