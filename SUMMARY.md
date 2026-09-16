# Yahoo Finance API

Yahoo finance API to access current and historical crypto and finance data. This is an unofficial API wrapper that uses Yahoo&#39;s publicly available APIs for research and educational purposes.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 5 entities and 10 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Download

Results: CSV file with historical data.

SDK operations: `load`.

### Market

Results: Trending tickers.

SDK operations: `load`.

### Screener

Results: Screening results.

SDK operations: `create`.

Key fields to recognise:

- `offset`: Offset for pagination
- `query`: Query criteria
- `size`: Number of results to return
- `sortField`: Field to sort by

### Search

Results: Search results.

SDK operations: `list`.

### Ticker

Results: Successful response with chart data; Spark chart data; Options chain data; Successful response with ticker summary; Quote data for requested tickers; Ticker insights.

SDK operations: `load`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Download | `load` | `GET /v7/finance/download/{symbol}` | See reference |
| Market | `load` | `GET /v1/finance/trending/{region}` | See reference |
| Screener | `create` | `POST /v1/finance/screener` | See reference |
| Search | `list` | `GET /v1/finance/search` | See reference |
| Ticker | `load` | `GET /v8/finance/chart/{symbol}` | See reference |
| Ticker | `load` | `GET /v1/finance/spark` | See reference |
| Ticker | `load` | `GET /v7/finance/options/{symbol}` | See reference |
| Ticker | `load` | `GET /v10/finance/quoteSummary/{symbol}` | See reference |
| Ticker | `load` | `GET /v6/finance/quote` | See reference |
| Ticker | `load` | `GET /ws/insights/v1/finance/insights` | See reference |

## Connect to the API

- Yahoo Finance API Server: `https://query1.finance.yahoo.com`
- Yahoo Finance API Server (Alternative): `https://query2.finance.yahoo.com`

The default credential is sent in the `Session` cookie.

Yahoo Finance uses cookie-based authentication for some endpoints

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `yahoo-finance_list`: List records for an entity. Supported entities: `search`.
- `yahoo-finance_load`: Load one record for an entity. Supported entities: `download`, `market`, `ticker`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

