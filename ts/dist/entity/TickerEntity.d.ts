import { YahooFinanceEntityBase } from '../YahooFinanceEntityBase';
import type { YahooFinanceSDK } from '../YahooFinanceSDK';
import type { Control } from '../types';
import type { Ticker, TickerLoadMatch } from '../YahooFinanceTypes';
declare class TickerEntity extends YahooFinanceEntityBase<Ticker> {
    constructor(client: YahooFinanceSDK, entopts: any);
    make(this: TickerEntity): TickerEntity;
    load(this: any, reqmatch?: TickerLoadMatch, ctrl?: Control): Promise<TickerEntity>;
}
export { TickerEntity };
