
import { Context } from './Context'


class YahooFinanceError extends Error {

  isYahooFinanceError = true

  sdk = 'YahooFinance'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  YahooFinanceError
}

