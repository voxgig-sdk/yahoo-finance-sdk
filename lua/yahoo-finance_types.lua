-- Typed models for the YahooFinance SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Download

---@class DownloadLoadMatch
---@field id string

---@class Market
---@field finance? table

---@class MarketLoadMatch
---@field region string

---@class Screener
---@field finance? table
---@field offset? number
---@field query? table
---@field quote_type? string
---@field size? number
---@field sort_field? string
---@field sort_type? string

---@class ScreenerCreateData

---@class Search
---@field new? table
---@field quote? table

---@class SearchListMatch

---@class Ticker
---@field chart? table
---@field finance? table
---@field option_chain? table
---@field quote_response? table
---@field quote_summary? table
---@field spark? table

---@class TickerLoadMatch
---@field symbol string

local M = {}

return M
