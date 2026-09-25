"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YahooFinanceError = void 0;
class YahooFinanceError extends Error {
    isYahooFinanceError = true;
    sdk = 'YahooFinance';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.YahooFinanceError = YahooFinanceError;
//# sourceMappingURL=YahooFinanceError.js.map