import { YahooFinanceEntityBase } from '../YahooFinanceEntityBase';
import type { YahooFinanceSDK } from '../YahooFinanceSDK';
import type { Control } from '../types';
import type { Screener, ScreenerCreateData } from '../YahooFinanceTypes';
declare class ScreenerEntity extends YahooFinanceEntityBase<Screener> {
    constructor(client: YahooFinanceSDK, entopts: any);
    make(this: ScreenerEntity): ScreenerEntity;
    create(this: any, reqdata?: ScreenerCreateData, ctrl?: Control): Promise<ScreenerEntity>;
}
export { ScreenerEntity };
