import { DownloadEntity } from './entity/DownloadEntity';
import { MarketEntity } from './entity/MarketEntity';
import { ScreenerEntity } from './entity/ScreenerEntity';
import { SearchEntity } from './entity/SearchEntity';
import { TickerEntity } from './entity/TickerEntity';
export type * from './YahooFinanceTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { YahooFinanceEntityBase } from './YahooFinanceEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class YahooFinanceSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Download(entopts?: Record<string, any>): DownloadEntity;
    Market(entopts?: Record<string, any>): MarketEntity;
    Screener(entopts?: Record<string, any>): ScreenerEntity;
    Search(entopts?: Record<string, any>): SearchEntity;
    Ticker(entopts?: Record<string, any>): TickerEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): YahooFinanceSDK;
    tester(testopts?: any, sdkopts?: any): YahooFinanceSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof YahooFinanceSDK;
export { stdutil, config, BaseFeature, YahooFinanceEntityBase, YahooFinanceSDK, SDK, };
