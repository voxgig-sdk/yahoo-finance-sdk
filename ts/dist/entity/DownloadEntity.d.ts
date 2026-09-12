import { YahooFinanceEntityBase } from '../YahooFinanceEntityBase';
import type { YahooFinanceSDK } from '../YahooFinanceSDK';
import type { Control } from '../types';
import type { Download, DownloadLoadMatch } from '../YahooFinanceTypes';
declare class DownloadEntity extends YahooFinanceEntityBase<Download> {
    constructor(client: YahooFinanceSDK, entopts: any);
    make(this: DownloadEntity): DownloadEntity;
    load(this: any, reqmatch?: DownloadLoadMatch, ctrl?: Control): Promise<DownloadEntity>;
}
export { DownloadEntity };
