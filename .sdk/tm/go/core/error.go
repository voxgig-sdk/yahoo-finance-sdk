package core

type YahooFinanceError struct {
	IsYahooFinanceError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewYahooFinanceError(code string, msg string, ctx *Context) *YahooFinanceError {
	return &YahooFinanceError{
		IsYahooFinanceError: true,
		Sdk:              "YahooFinance",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *YahooFinanceError) Error() string {
	return e.Msg
}
