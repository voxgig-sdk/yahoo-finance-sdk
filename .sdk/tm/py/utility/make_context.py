# YahooFinance SDK utility: make_context

from core.context import YahooFinanceContext


def make_context_util(ctxmap, basectx):
    return YahooFinanceContext(ctxmap, basectx)
