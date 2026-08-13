# YahooFinance SDK utility: make_context

from projectname_sdk.core.context import YahooFinanceContext


def make_context_util(ctxmap, basectx):
    return YahooFinanceContext(ctxmap, basectx)
