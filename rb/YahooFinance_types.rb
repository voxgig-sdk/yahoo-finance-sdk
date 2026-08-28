# frozen_string_literal: true

# Typed models for the YahooFinance SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Download entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
Download = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Download#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] event
#   @return [String, nil]
#
# @!attribute [rw] interval
#   @return [String, nil]
#
# @!attribute [rw] period1
#   @return [Integer]
#
# @!attribute [rw] period2
#   @return [Integer]
DownloadLoadMatch = Struct.new(
  :id,
  :event,
  :interval,
  :period1,
  :period2,
  keyword_init: true
)

# Market entity data model.
#
# @!attribute [rw] result
#   @return [Array, nil]
Market = Struct.new(
  :result,
  keyword_init: true
)

# Request payload for Market#load.
#
# @!attribute [rw] region
#   @return [String]
MarketLoadMatch = Struct.new(
  :region,
  keyword_init: true
)

# Screener entity data model.
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] query
#   @return [Hash, nil]
#
# @!attribute [rw] quoteType
#   @return [String, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
#
# @!attribute [rw] size
#   @return [Integer, nil]
#
# @!attribute [rw] sortField
#   @return [String, nil]
#
# @!attribute [rw] sortType
#   @return [String, nil]
Screener = Struct.new(
  :offset,
  :query,
  :quoteType,
  :result,
  :size,
  :sortField,
  :sortType,
  keyword_init: true
)

# Request payload for Screener#create.
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] query
#   @return [Hash, nil]
#
# @!attribute [rw] quoteType
#   @return [String, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
#
# @!attribute [rw] size
#   @return [Integer, nil]
#
# @!attribute [rw] sortField
#   @return [String, nil]
#
# @!attribute [rw] sortType
#   @return [String, nil]
ScreenerCreateData = Struct.new(
  :offset,
  :query,
  :quoteType,
  :result,
  :size,
  :sortField,
  :sortType,
  keyword_init: true
)

# Search entity data model.
#
# @!attribute [rw] news
#   @return [Array, nil]
#
# @!attribute [rw] quotes
#   @return [Array, nil]
Search = Struct.new(
  :news,
  :quotes,
  keyword_init: true
)

# Request payload for Search#list.
#
# @!attribute [rw] news_count
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String]
#
# @!attribute [rw] quotes_count
#   @return [Integer, nil]
SearchListMatch = Struct.new(
  :news_count,
  :q,
  :quotes_count,
  keyword_init: true
)

# Ticker entity data model.
#
# @!attribute [rw] error
#   @return [NilClass, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
Ticker = Struct.new(
  :error,
  :result,
  keyword_init: true
)

# Request payload for Ticker#load.
#
# @!attribute [rw] symbol
#   @return [String]
#
# @!attribute [rw] event
#   @return [String, nil]
#
# @!attribute [rw] interval
#   @return [String, nil]
#
# @!attribute [rw] period1
#   @return [Integer, nil]
#
# @!attribute [rw] period2
#   @return [Integer, nil]
#
# @!attribute [rw] range
#   @return [String, nil]
#
# @!attribute [rw] date
#   @return [Integer, nil]
#
# @!attribute [rw] module
#   @return [String, nil]
TickerLoadMatch = Struct.new(
  :symbol,
  :event,
  :interval,
  :period1,
  :period2,
  :range,
  :date,
  :module,
  keyword_init: true
)

