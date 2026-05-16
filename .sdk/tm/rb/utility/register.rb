# YahooFinance SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

YahooFinanceUtility.registrar = ->(u) {
  u.clean = YahooFinanceUtilities::Clean
  u.done = YahooFinanceUtilities::Done
  u.make_error = YahooFinanceUtilities::MakeError
  u.feature_add = YahooFinanceUtilities::FeatureAdd
  u.feature_hook = YahooFinanceUtilities::FeatureHook
  u.feature_init = YahooFinanceUtilities::FeatureInit
  u.fetcher = YahooFinanceUtilities::Fetcher
  u.make_fetch_def = YahooFinanceUtilities::MakeFetchDef
  u.make_context = YahooFinanceUtilities::MakeContext
  u.make_options = YahooFinanceUtilities::MakeOptions
  u.make_request = YahooFinanceUtilities::MakeRequest
  u.make_response = YahooFinanceUtilities::MakeResponse
  u.make_result = YahooFinanceUtilities::MakeResult
  u.make_point = YahooFinanceUtilities::MakePoint
  u.make_spec = YahooFinanceUtilities::MakeSpec
  u.make_url = YahooFinanceUtilities::MakeUrl
  u.param = YahooFinanceUtilities::Param
  u.prepare_auth = YahooFinanceUtilities::PrepareAuth
  u.prepare_body = YahooFinanceUtilities::PrepareBody
  u.prepare_headers = YahooFinanceUtilities::PrepareHeaders
  u.prepare_method = YahooFinanceUtilities::PrepareMethod
  u.prepare_params = YahooFinanceUtilities::PrepareParams
  u.prepare_path = YahooFinanceUtilities::PreparePath
  u.prepare_query = YahooFinanceUtilities::PrepareQuery
  u.result_basic = YahooFinanceUtilities::ResultBasic
  u.result_body = YahooFinanceUtilities::ResultBody
  u.result_headers = YahooFinanceUtilities::ResultHeaders
  u.transform_request = YahooFinanceUtilities::TransformRequest
  u.transform_response = YahooFinanceUtilities::TransformResponse
}
