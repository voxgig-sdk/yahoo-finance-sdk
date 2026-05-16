# YahooFinance SDK utility: feature_add
module YahooFinanceUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
