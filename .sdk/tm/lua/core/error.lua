-- YahooFinance SDK error

local YahooFinanceError = {}
YahooFinanceError.__index = YahooFinanceError


function YahooFinanceError.new(code, msg, ctx)
  local self = setmetatable({}, YahooFinanceError)
  self.is_sdk_error = true
  self.sdk = "YahooFinance"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function YahooFinanceError:error()
  return self.msg
end


function YahooFinanceError:__tostring()
  return self.msg
end


return YahooFinanceError
