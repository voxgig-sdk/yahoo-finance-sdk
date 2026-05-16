package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewDownloadEntityFunc func(client *YahooFinanceSDK, entopts map[string]any) YahooFinanceEntity

var NewMarketEntityFunc func(client *YahooFinanceSDK, entopts map[string]any) YahooFinanceEntity

var NewScreenerEntityFunc func(client *YahooFinanceSDK, entopts map[string]any) YahooFinanceEntity

var NewSearchEntityFunc func(client *YahooFinanceSDK, entopts map[string]any) YahooFinanceEntity

var NewTickerEntityFunc func(client *YahooFinanceSDK, entopts map[string]any) YahooFinanceEntity

