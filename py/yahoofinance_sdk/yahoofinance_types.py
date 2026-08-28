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


class Download(TypedDict, total=False):
    id: str


class DownloadLoadMatchRequired(TypedDict):
    id: str
    period1: int
    period2: int


class DownloadLoadMatch(DownloadLoadMatchRequired, total=False):
    event: str
    interval: str


class Market(TypedDict, total=False):
    result: list


class MarketLoadMatch(TypedDict):
    region: str


class Screener(TypedDict, total=False):
    offset: int
    query: dict
    quoteType: str
    result: list
    size: int
    sortField: str
    sortType: str


class ScreenerCreateData(TypedDict, total=False):
    offset: int
    query: dict
    quoteType: str
    result: list
    size: int
    sortField: str
    sortType: str


class Search(TypedDict, total=False):
    news: list
    quotes: list


class SearchListMatchRequired(TypedDict):
    q: str


class SearchListMatch(SearchListMatchRequired, total=False):
    news_count: int
    quotes_count: int


class Ticker(TypedDict, total=False):
    error: None
    result: list


class TickerLoadMatchRequired(TypedDict):
    symbol: str


class TickerLoadMatch(TickerLoadMatchRequired, total=False):
    event: str
    interval: str
    period1: int
    period2: int
    range: str
    date: int
    module: str
