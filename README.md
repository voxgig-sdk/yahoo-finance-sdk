# YahooFinance SDK

Fetch current and historical stock, crypto, and market data from Yahoo Finance's public endpoints

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Yahoo Finance API

This SDK is an unofficial wrapper around the public endpoints that power [Yahoo Finance](https://finance.yahoo.com), reached through the `query1.finance.yahoo.com` host. It mirrors the surface popularised by the open-source [yfinance](https://github.com/ranaroussi/yfinance) project, exposing the same routes used by the Yahoo Finance web app for quotes, charts, screening and search.

What you get from the API:

- Historical and intraday price charts for stocks, ETFs, indices and cryptocurrencies (for example `BTC-USD`).
- Per-ticker fundamentals, quote data and related news.
- Market-wide overviews and sector/industry context.
- A screener for building queries that filter securities by criteria.
- Search across symbols and news.

Operational notes: the endpoints are unofficial, so behaviour, fields and availability can change without notice. CORS is disabled on `query1.finance.yahoo.com`, which means browser-side calls will be blocked and a server-side proxy is required. No API key is documented for these public chart and search routes, but Yahoo applies undocumented rate limiting and may require cookie/crumb handshakes for some endpoints.

## Try it

**TypeScript**
```bash
npm install yahoo-finance
```

**Python**
```bash
pip install yahoo-finance-sdk
```

**PHP**
```bash
composer require voxgig/yahoo-finance-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/yahoo-finance-sdk/go
```

**Ruby**
```bash
gem install yahoo-finance-sdk
```

**Lua**
```bash
luarocks install yahoo-finance-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { YahooFinanceSDK } from 'yahoo-finance'

const client = new YahooFinanceSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o yahoo-finance-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "yahoo-finance": {
      "command": "/abs/path/to/yahoo-finance-mcp"
    }
  }
}
```

## Entities

The API exposes 5 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Download** | Bulk download of historical market data for one or many ticker symbols at once. | `/v7/finance/download/{symbol}` |
| **Market** | Broader market overview information beyond a single security, such as index summaries and market status. | `/v1/finance/trending/{region}` |
| **Screener** | Build and run queries that filter the universe of securities by configurable criteria. | `/v1/finance/screener` |
| **Search** | Look up symbols, quotes and related news from a free-text query. | `/v1/finance/search` |
| **Ticker** | Detailed data for a single symbol, including quote, fundamentals and historical chart via `https://query1.finance.yahoo.com/v8/finance/chart/{symbol}`. | `/v8/finance/chart/{symbol}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from yahoofinance_sdk import YahooFinanceSDK

client = YahooFinanceSDK({})


# Load a specific download
download, err = client.Download(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'yahoofinance_sdk.php';

$client = new YahooFinanceSDK([]);


// Load a specific download
[$download, $err] = $client->Download(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/yahoo-finance-sdk/go"

client := sdk.NewYahooFinanceSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "YahooFinance_sdk"

client = YahooFinanceSDK.new({})


# Load a specific download
download, err = client.Download(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("yahoo-finance_sdk")

local client = sdk.new({})


-- Load a specific download
local download, err = client:Download(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = YahooFinanceSDK.test()
const result = await client.Download().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = YahooFinanceSDK.test(None, None)
result, err = client.Download(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = YahooFinanceSDK::test(null, null);
[$result, $err] = $client->Download(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Download(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = YahooFinanceSDK.test(nil, nil)
result, err = client.Download(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Download(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Yahoo Finance API

- Upstream: [https://finance.yahoo.com](https://finance.yahoo.com)
- API docs: [https://github.com/ranaroussi/yfinance](https://github.com/ranaroussi/yfinance)

- SDK code is distributed under the Apache 2.0 licence.
- The underlying endpoints at `query1.finance.yahoo.com` are unofficial and not covered by a published API agreement from Yahoo.
- Yahoo Finance data is owned by Yahoo and its data providers; review Yahoo's Terms of Service before redistributing or using the data commercially.
- Attribution to Yahoo Finance is recommended when displaying data sourced through this wrapper.

---

Generated from the Yahoo Finance API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
