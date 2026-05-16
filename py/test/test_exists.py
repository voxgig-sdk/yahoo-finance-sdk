# ProjectName SDK exists test

import pytest
from yahoofinance_sdk import YahooFinanceSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = YahooFinanceSDK.test(None, None)
        assert testsdk is not None
