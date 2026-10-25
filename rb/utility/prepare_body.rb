# YahooFinance SDK utility: prepare_body
require_relative 'media'
module YahooFinanceUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return YahooFinanceUtilities.raw_body(ctx.reqdata) if YahooFinanceUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
