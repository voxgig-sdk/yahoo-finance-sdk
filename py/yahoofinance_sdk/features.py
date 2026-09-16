# YahooFinance SDK feature factory

from yahoofinance_sdk.feature.base_feature import YahooFinanceBaseFeature
from yahoofinance_sdk.feature.ratelimit_feature import YahooFinanceRatelimitFeature
from yahoofinance_sdk.feature.retry_feature import YahooFinanceRetryFeature
from yahoofinance_sdk.feature.test_feature import YahooFinanceTestFeature
from yahoofinance_sdk.feature.timeout_feature import YahooFinanceTimeoutFeature


_FEATURES = {
    "base": lambda: YahooFinanceBaseFeature(),
    "ratelimit": lambda: YahooFinanceRatelimitFeature(),
    "retry": lambda: YahooFinanceRetryFeature(),
    "test": lambda: YahooFinanceTestFeature(),
    "timeout": lambda: YahooFinanceTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
