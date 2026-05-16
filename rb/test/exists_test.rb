# YahooFinance SDK exists test

require "minitest/autorun"
require_relative "../YahooFinance_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = YahooFinanceSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
