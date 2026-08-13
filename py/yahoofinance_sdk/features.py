# YahooFinance SDK feature factory

from yahoofinance_sdk.feature.base_feature import YahooFinanceBaseFeature
from yahoofinance_sdk.feature.test_feature import YahooFinanceTestFeature


def _make_feature(name):
    features = {
        "base": lambda: YahooFinanceBaseFeature(),
        "test": lambda: YahooFinanceTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
