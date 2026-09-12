import { YahooFinanceEntityBase } from '../YahooFinanceEntityBase';
import type { YahooFinanceSDK } from '../YahooFinanceSDK';
import type { Control } from '../types';
import type { Search, SearchListMatch } from '../YahooFinanceTypes';
declare class SearchEntity extends YahooFinanceEntityBase<Search> {
    constructor(client: YahooFinanceSDK, entopts: any);
    make(this: SearchEntity): SearchEntity;
    list(this: any, reqmatch?: SearchListMatch, ctrl?: Control): Promise<SearchEntity[]>;
}
export { SearchEntity };
