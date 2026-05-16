# YahooFinance SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module YahooFinanceFeatures
  def self.make_feature(name)
    case name
    when "base"
      YahooFinanceBaseFeature.new
    when "test"
      YahooFinanceTestFeature.new
    else
      YahooFinanceBaseFeature.new
    end
  end
end
