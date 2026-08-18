# frozen_string_literal: true

# Typed models for the YahooFinance SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Download entity data model.
class Download
end

# Request payload for Download#load.
#
# @!attribute [rw] id
#   @return [String]
DownloadLoadMatch = Struct.new(
  :id,
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
# @!attribute [rw] news
#   @return [Array, nil]
#
# @!attribute [rw] quotes
#   @return [Array, nil]
SearchListMatch = Struct.new(
  :news,
  :quotes,
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
TickerLoadMatch = Struct.new(
  :symbol,
  keyword_init: true
)

