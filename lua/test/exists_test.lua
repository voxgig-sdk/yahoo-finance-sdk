-- YahooFinance SDK exists test

local sdk = require("yahoo-finance_sdk")

describe("YahooFinanceSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
