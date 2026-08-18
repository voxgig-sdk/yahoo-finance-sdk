package voxgigyahoofinancesdk

import (
	"github.com/voxgig-sdk/yahoo-finance-sdk/go/core"
	"github.com/voxgig-sdk/yahoo-finance-sdk/go/entity"
	"github.com/voxgig-sdk/yahoo-finance-sdk/go/feature"
	_ "github.com/voxgig-sdk/yahoo-finance-sdk/go/utility"
)

// Type aliases preserve external API.
type YahooFinanceSDK = core.YahooFinanceSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type YahooFinanceEntity = core.YahooFinanceEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type YahooFinanceError = core.YahooFinanceError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewDownloadEntityFunc = func(client *core.YahooFinanceSDK, entopts map[string]any) core.YahooFinanceEntity {
		return entity.NewDownloadEntity(client, entopts)
	}
	core.NewMarketEntityFunc = func(client *core.YahooFinanceSDK, entopts map[string]any) core.YahooFinanceEntity {
		return entity.NewMarketEntity(client, entopts)
	}
	core.NewScreenerEntityFunc = func(client *core.YahooFinanceSDK, entopts map[string]any) core.YahooFinanceEntity {
		return entity.NewScreenerEntity(client, entopts)
	}
	core.NewSearchEntityFunc = func(client *core.YahooFinanceSDK, entopts map[string]any) core.YahooFinanceEntity {
		return entity.NewSearchEntity(client, entopts)
	}
	core.NewTickerEntityFunc = func(client *core.YahooFinanceSDK, entopts map[string]any) core.YahooFinanceEntity {
		return entity.NewTickerEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewYahooFinanceSDK = core.NewYahooFinanceSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewYahooFinanceSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *YahooFinanceSDK  { return NewYahooFinanceSDK(nil) }
func Test() *YahooFinanceSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
