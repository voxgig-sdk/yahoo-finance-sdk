# YahooFinance SDK utility: make_context
require_relative '../core/context'
module YahooFinanceUtilities
  MakeContext = ->(ctxmap, basectx) {
    YahooFinanceContext.new(ctxmap, basectx)
  }
end
