# Typed models for the YahooFinance SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Download:
    pass


@dataclass
class DownloadLoadMatch:
    id: str


@dataclass
class Market:
    finance: Optional[dict] = None


@dataclass
class MarketLoadMatch:
    region: str


@dataclass
class Screener:
    finance: Optional[dict] = None
    offset: Optional[int] = None
    query: Optional[dict] = None
    quote_type: Optional[str] = None
    size: Optional[int] = None
    sort_field: Optional[str] = None
    sort_type: Optional[str] = None


@dataclass
class ScreenerCreateData:
    finance: Optional[dict] = None
    offset: Optional[int] = None
    query: Optional[dict] = None
    quote_type: Optional[str] = None
    size: Optional[int] = None
    sort_field: Optional[str] = None
    sort_type: Optional[str] = None


@dataclass
class Search:
    new: Optional[list] = None
    quote: Optional[list] = None


@dataclass
class SearchListMatch:
    new: Optional[list] = None
    quote: Optional[list] = None


@dataclass
class Ticker:
    chart: Optional[dict] = None
    finance: Optional[dict] = None
    option_chain: Optional[dict] = None
    quote_response: Optional[dict] = None
    quote_summary: Optional[dict] = None
    spark: Optional[dict] = None


@dataclass
class TickerLoadMatch:
    symbol: str

