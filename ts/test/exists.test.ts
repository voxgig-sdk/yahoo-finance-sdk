
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { YahooFinanceSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = YahooFinanceSDK.test()
    equal(testsdk instanceof YahooFinanceSDK, true,
      'YahooFinanceSDK.test() must return a client synchronously')
  })

})
