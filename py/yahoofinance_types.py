# Typed models for the YahooFinance SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Download(TypedDict):
    pass


class DownloadLoadMatch(TypedDict):
    id: str


class Market(TypedDict, total=False):
    finance: dict


class MarketLoadMatch(TypedDict):
    region: str


class Screener(TypedDict, total=False):
    finance: dict
    offset: int
    query: dict
    quote_type: str
    size: int
    sort_field: str
    sort_type: str


class ScreenerCreateData(TypedDict, total=False):
    finance: dict
    offset: int
    query: dict
    quote_type: str
    size: int
    sort_field: str
    sort_type: str


class Search(TypedDict, total=False):
    new: list
    quote: list


class SearchListMatch(TypedDict, total=False):
    new: list
    quote: list


class Ticker(TypedDict, total=False):
    chart: dict
    finance: dict
    option_chain: dict
    quote_response: dict
    quote_summary: dict
    spark: dict


class TickerLoadMatch(TypedDict, total=False):
    symbol: str
