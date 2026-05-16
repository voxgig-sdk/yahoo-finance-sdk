
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { YahooFinanceSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await YahooFinanceSDK.test()
    equal(null !== testsdk, true)
  })

})
