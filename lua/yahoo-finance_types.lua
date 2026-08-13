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
---@field result? table

---@class MarketLoadMatch
---@field region string

---@class Screener
---@field offset? number
---@field query? table
---@field quoteType? string
---@field result? table
---@field size? number
---@field sortField? string
---@field sortType? string

---@class ScreenerCreateData
---@field offset? number
---@field query? table
---@field quoteType? string
---@field result? table
---@field size? number
---@field sortField? string
---@field sortType? string

---@class Search
---@field news? table
---@field quotes? table

---@class SearchListMatch
---@field news? table
---@field quotes? table

---@class Ticker
---@field error? nil
---@field result? table

---@class TickerLoadMatch
---@field symbol? string

local M = {}

return M
