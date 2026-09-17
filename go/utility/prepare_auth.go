package utility

import (
	vs "github.com/voxgig-sdk/yahoo-finance-sdk/go/utility/struct"

	"github.com/voxgig-sdk/yahoo-finance-sdk/go/core"
)

const credName = "Session"
const cookieHeader = "cookie"
const optionApikey = "apikey"
const notFound = "__NOTFOUND__"

func prepareAuthUtil(ctx *core.Context) (*core.Spec, error) {
	spec := ctx.Spec
	if spec == nil {
		return nil, ctx.MakeError("auth_no_spec",
			"Expected context spec property to be defined.")
	}

	headers := spec.Headers
	options := ctx.Client.OptionsMap()

	// Public APIs that need no auth omit the options.auth block entirely.
	if options["auth"] == nil {
		delete(headers, credName)
		return spec, nil
	}

	apikey := vs.GetProp(options, optionApikey, notFound)

	skip := false
	if apikey == nil {
		skip = true
	} else if apikeyStr, ok := apikey.(string); ok &&
		(apikeyStr == notFound || apikeyStr == "") {
		skip = true
	}

	if skip {
		delete(headers, credName)
	} else {
		apikeyVal := ""
		if av, ok := apikey.(string); ok {
			apikeyVal = av
		}
		pair := credName + "=" + apikeyVal
		existing := ""
		if ec, ok := headers[cookieHeader].(string); ok {
			existing = ec
		}
		if existing == "" {
			headers[cookieHeader] = pair
		} else {
			headers[cookieHeader] = existing + "; " + pair
		}
	}

	return spec, nil
}
