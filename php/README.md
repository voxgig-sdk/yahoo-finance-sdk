# YahooFinance PHP SDK



The PHP SDK for the YahooFinance API — an entity-oriented client using PHP conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/yahoo-finance-sdk/releases](https://github.com/voxgig-sdk/yahoo-finance-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'yahoofinance_sdk.php';

$client = new YahooFinanceSDK([
    "apikey" => getenv("YAHOO_FINANCE_APIKEY"),
]);
```

### 3. Load a download

```php
try {
    // load() returns the bare Download record (throws on error).
    $download = $client->Download()->load(["id" => "example_id"]);
    print_r($download);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    echo "Error: " . $result["err"]->getMessage();
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = YahooFinanceSDK::test([
    "entity" => ["download" => ["test01" => ["id" => "test01"]]],
]);

// load() returns the bare mock record (throws on error).
$download = $client->Download()->load(["id" => "test01"]);
print_r($download);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new YahooFinanceSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
YAHOO_FINANCE_TEST_LIVE=TRUE
YAHOO_FINANCE_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### YahooFinanceSDK

```php
require_once 'yahoofinance_sdk.php';
$client = new YahooFinanceSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = YahooFinanceSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### YahooFinanceSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Download` | `($data): DownloadEntity` | Create a Download entity instance. |
| `Market` | `($data): MarketEntity` | Create a Market entity instance. |
| `Screener` | `($data): ScreenerEntity` | Create a Screener entity instance. |
| `Search` | `($data): SearchEntity` | Create a Search entity instance. |
| `Ticker` | `($data): TickerEntity` | Create a Ticker entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Download

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/v7/finance/download/{symbol}`

#### Market

| Field | Description |
| --- | --- |
| `finance` |  |

Operations: Load.

API path: `/v1/finance/trending/{region}`

#### Screener

| Field | Description |
| --- | --- |
| `finance` |  |
| `offset` |  |
| `query` |  |
| `quote_type` |  |
| `size` |  |
| `sort_field` |  |
| `sort_type` |  |

Operations: Create.

API path: `/v1/finance/screener`

#### Search

| Field | Description |
| --- | --- |
| `new` |  |
| `quote` |  |

Operations: List.

API path: `/v1/finance/search`

#### Ticker

| Field | Description |
| --- | --- |
| `chart` |  |
| `finance` |  |
| `option_chain` |  |
| `quote_response` |  |
| `quote_summary` |  |
| `spark` |  |

Operations: Load.

API path: `/v8/finance/chart/{symbol}`



## Entities


### Download

Create an instance: `$download = $client->Download();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare Download record (throws on error).
$download = $client->Download()->load(["id" => "download_id"]);
```


### Market

Create an instance: `$market = $client->Market();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `finance` | ``$OBJECT`` |  |

#### Example: Load

```php
// load() returns the bare Market record (throws on error).
$market = $client->Market()->load(["id" => "market_id"]);
```


### Screener

Create an instance: `$screener = $client->Screener();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `finance` | ``$OBJECT`` |  |
| `offset` | ``$INTEGER`` |  |
| `query` | ``$OBJECT`` |  |
| `quote_type` | ``$STRING`` |  |
| `size` | ``$INTEGER`` |  |
| `sort_field` | ``$STRING`` |  |
| `sort_type` | ``$STRING`` |  |

#### Example: Create

```php
$screener = $client->Screener()->create([
]);
```


### Search

Create an instance: `$search = $client->Search();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `new` | ``$ARRAY`` |  |
| `quote` | ``$ARRAY`` |  |

#### Example: List

```php
// list() returns an array of Search records (throws on error).
$searchs = $client->Search()->list();
```


### Ticker

Create an instance: `$ticker = $client->Ticker();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `chart` | ``$OBJECT`` |  |
| `finance` | ``$OBJECT`` |  |
| `option_chain` | ``$OBJECT`` |  |
| `quote_response` | ``$OBJECT`` |  |
| `quote_summary` | ``$OBJECT`` |  |
| `spark` | ``$OBJECT`` |  |

#### Example: Load

```php
// load() returns the bare Ticker record (throws on error).
$ticker = $client->Ticker()->load(["id" => "ticker_id"]);
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as the second element in the return array.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── yahoofinance_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`yahoofinance_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$download = $client->Download();
$download->load(["id" => "example_id"]);

// $download->dataGet() now returns the loaded download data
// $download->matchGet() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
