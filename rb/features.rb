# YahooFinance SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module YahooFinanceFeatures
  def self.make_feature(name)
    case name
    when "base"
      YahooFinanceBaseFeature.new
    when "ratelimit"
      YahooFinanceRatelimitFeature.new
    when "retry"
      YahooFinanceRetryFeature.new
    when "test"
      YahooFinanceTestFeature.new
    when "timeout"
      YahooFinanceTimeoutFeature.new
    else
      YahooFinanceBaseFeature.new
    end
  end
end
