# YahooFinance Python SDK Reference

Complete API reference for the YahooFinance Python SDK.


## YahooFinanceSDK

### Constructor

```python
from yahoo-finance_sdk import YahooFinanceSDK

client = YahooFinanceSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `YahooFinanceSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = YahooFinanceSDK.test()
```


### Instance Methods

#### `Download(data=None)`

Create a new `DownloadEntity` instance. Pass `None` for no initial data.

#### `Market(data=None)`

Create a new `MarketEntity` instance. Pass `None` for no initial data.

#### `Screener(data=None)`

Create a new `ScreenerEntity` instance. Pass `None` for no initial data.

#### `Search(data=None)`

Create a new `SearchEntity` instance. Pass `None` for no initial data.

#### `Ticker(data=None)`

Create a new `TickerEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## DownloadEntity

```python
download = client.download
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.download.load({"id": "download_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DownloadEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MarketEntity

```python
market = client.market
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `finance` | ``$OBJECT`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.market.load({"id": "market_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MarketEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ScreenerEntity

```python
screener = client.screener
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `finance` | ``$OBJECT`` | No |  |
| `offset` | ``$INTEGER`` | No |  |
| `query` | ``$OBJECT`` | No |  |
| `quote_type` | ``$STRING`` | No |  |
| `size` | ``$INTEGER`` | No |  |
| `sort_field` | ``$STRING`` | No |  |
| `sort_type` | ``$STRING`` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.screener.create({
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ScreenerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SearchEntity

```python
search = client.search
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `new` | ``$ARRAY`` | No |  |
| `quote` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.search.list({})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SearchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TickerEntity

```python
ticker = client.ticker
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `chart` | ``$OBJECT`` | No |  |
| `finance` | ``$OBJECT`` | No |  |
| `option_chain` | ``$OBJECT`` | No |  |
| `quote_response` | ``$OBJECT`` | No |  |
| `quote_summary` | ``$OBJECT`` | No |  |
| `spark` | ``$OBJECT`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ticker.load({"id": "ticker_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TickerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = YahooFinanceSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

