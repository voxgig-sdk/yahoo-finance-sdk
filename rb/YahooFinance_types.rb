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
# @!attribute [rw] finance
#   @return [Hash, nil]
Market = Struct.new(
  :finance,
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
# @!attribute [rw] finance
#   @return [Hash, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] query
#   @return [Hash, nil]
#
# @!attribute [rw] quote_type
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [Integer, nil]
#
# @!attribute [rw] sort_field
#   @return [String, nil]
#
# @!attribute [rw] sort_type
#   @return [String, nil]
Screener = Struct.new(
  :finance,
  :offset,
  :query,
  :quote_type,
  :size,
  :sort_field,
  :sort_type,
  keyword_init: true
)

# Request payload for Screener#create.
#
# @!attribute [rw] finance
#   @return [Hash, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] query
#   @return [Hash, nil]
#
# @!attribute [rw] quote_type
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [Integer, nil]
#
# @!attribute [rw] sort_field
#   @return [String, nil]
#
# @!attribute [rw] sort_type
#   @return [String, nil]
ScreenerCreateData = Struct.new(
  :finance,
  :offset,
  :query,
  :quote_type,
  :size,
  :sort_field,
  :sort_type,
  keyword_init: true
)

# Search entity data model.
#
# @!attribute [rw] new
#   @return [Array, nil]
#
# @!attribute [rw] quote
#   @return [Array, nil]
Search = Struct.new(
  :new,
  :quote,
  keyword_init: true
)

# Request payload for Search#list.
#
# @!attribute [rw] new
#   @return [Array, nil]
#
# @!attribute [rw] quote
#   @return [Array, nil]
SearchListMatch = Struct.new(
  :new,
  :quote,
  keyword_init: true
)

# Ticker entity data model.
#
# @!attribute [rw] chart
#   @return [Hash, nil]
#
# @!attribute [rw] finance
#   @return [Hash, nil]
#
# @!attribute [rw] option_chain
#   @return [Hash, nil]
#
# @!attribute [rw] quote_response
#   @return [Hash, nil]
#
# @!attribute [rw] quote_summary
#   @return [Hash, nil]
#
# @!attribute [rw] spark
#   @return [Hash, nil]
Ticker = Struct.new(
  :chart,
  :finance,
  :option_chain,
  :quote_response,
  :quote_summary,
  :spark,
  keyword_init: true
)

# Request payload for Ticker#load.
#
# @!attribute [rw] symbol
#   @return [String, nil]
TickerLoadMatch = Struct.new(
  :symbol,
  keyword_init: true
)

