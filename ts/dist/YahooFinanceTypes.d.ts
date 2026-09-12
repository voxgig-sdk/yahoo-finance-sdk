export interface Download {
    id?: string;
}
export interface DownloadLoadMatch {
    id: string;
    event?: string;
    interval?: string;
    period1: number;
    period2: number;
}
export interface Market {
    result?: any[];
}
export interface MarketLoadMatch {
    region: string;
}
export interface Screener {
    offset?: number;
    query?: Record<string, any>;
    quoteType?: string;
    result?: any[];
    size?: number;
    sortField?: string;
    sortType?: string;
}
export interface ScreenerCreateData {
    offset?: number;
    query?: Record<string, any>;
    quoteType?: string;
    result?: any[];
    size?: number;
    sortField?: string;
    sortType?: string;
}
export interface Search {
    news?: any[];
    quotes?: any[];
}
export interface SearchListMatch {
    news_count?: number;
    q: string;
    quotes_count?: number;
}
export interface Ticker {
    error?: null;
    result?: any[];
}
export interface TickerLoadMatch {
    symbol: string;
    event?: string;
    interval?: string;
    period1?: number;
    period2?: number;
    range?: string;
    date?: number;
    module?: string;
}
