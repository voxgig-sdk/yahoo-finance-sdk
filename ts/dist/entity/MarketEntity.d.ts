import { YahooFinanceEntityBase } from '../YahooFinanceEntityBase';
import type { YahooFinanceSDK } from '../YahooFinanceSDK';
import type { Control } from '../types';
import type { Market, MarketLoadMatch } from '../YahooFinanceTypes';
declare class MarketEntity extends YahooFinanceEntityBase<Market> {
    constructor(client: YahooFinanceSDK, entopts: any);
    make(this: MarketEntity): MarketEntity;
    load(this: any, reqmatch?: MarketLoadMatch, ctrl?: Control): Promise<MarketEntity>;
}
export { MarketEntity };
