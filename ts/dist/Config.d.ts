import { BaseFeature } from './feature/base/BaseFeature';
declare const FEATURE_PLUGINS: Record<string, any[]>;
declare class Config {
    makeFeature(this: any, fn: string): BaseFeature;
    hasFeature(this: any, fn: string): boolean;
    main: {
        name: string;
        slug: string;
        version: string;
        target: string;
    };
    feature: {
        ratelimit: {
            options: {
                active: boolean;
                burst: number;
                rate: number;
            };
            optspec: {
                now: string;
                sleep: string;
            };
            strict: boolean;
            transport: string;
        };
        retry: {
            options: {
                active: boolean;
                factor: number;
                maxDelay: number;
                minDelay: number;
                retries: number;
                statuses: number[];
            };
            optspec: {
                jitter: string;
                sleep: string;
            };
            strict: boolean;
            transport: string;
        };
        test: {
            options: {
                active: boolean;
            };
            optspec: {
                entity: string;
                net: string;
            };
            strict: boolean;
            transport: string;
        };
        timeout: {
            options: {
                active: boolean;
                ms: number;
            };
            optspec: {
                clearTimer: string;
                setTimer: string;
            };
            strict: boolean;
            transport: string;
        };
    };
    options: {
        base: string;
        auth: {
            prefix: string;
            in: string;
            name: string;
        };
        headers: {
            "content-type": string;
        };
        entity: {
            download: {};
            market: {};
            screener: {};
            search: {};
            ticker: {};
        };
    };
    entity: {
        download: {
            fields: {
                name: string;
                type: string;
            }[];
            id: {
                field: string;
                name: string;
            };
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        args: {
                            params: {
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                            query: ({
                                kind: string;
                                name: string;
                                orig: string;
                                type: string;
                                example?: undefined;
                                reqd?: undefined;
                            } | {
                                example: string;
                                kind: string;
                                name: string;
                                orig: string;
                                type: string;
                                reqd?: undefined;
                            } | {
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                example?: undefined;
                            })[];
                        };
                        kind: string;
                        method: string;
                        orig: string;
                        rename: {
                            param: {
                                symbol: string;
                            };
                        };
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        market: {
            fields: {
                name: string;
                type: string;
            }[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        args: {
                            params: {
                                example: string;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
                    }[];
                };
            };
            relations: {
                ancestors: string[][];
            };
        };
        screener: {
            fields: ({
                name: string;
                short: string;
                type: string;
            } | {
                name: string;
                type: string;
                short?: undefined;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        search: {
            fields: {
                name: string;
                type: string;
            }[];
            name: string;
            op: {
                list: {
                    input: string;
                    name: string;
                    points: {
                        args: {
                            query: ({
                                example: number;
                                kind: string;
                                name: string;
                                orig: string;
                                type: string;
                                reqd?: undefined;
                            } | {
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                example?: undefined;
                            })[];
                        };
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        ticker: {
            fields: {
                name: string;
                type: string;
            }[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: ({
                        args: {
                            params: {
                                example: string;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                            query: ({
                                kind: string;
                                name: string;
                                orig: string;
                                type: string;
                                example?: undefined;
                            } | {
                                example: string;
                                kind: string;
                                name: string;
                                orig: string;
                                type: string;
                            })[];
                        };
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
                    } | {
                        args: {
                            query: ({
                                example: string;
                                kind: string;
                                name: string;
                                orig: string;
                                type: string;
                                reqd?: undefined;
                            } | {
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                example?: undefined;
                            })[];
                            params?: undefined;
                        };
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
                    } | {
                        args: {
                            params: {
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                            query: {
                                kind: string;
                                name: string;
                                orig: string;
                                type: string;
                            }[];
                        };
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
                    } | {
                        args: {
                            params: {
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                            query: {
                                example: string;
                                kind: string;
                                name: string;
                                orig: string;
                                type: string;
                            }[];
                        };
                        kind: string;
                        method: string;
                        orig: string;
                        segments: ({
                            lit: string;
                            var?: undefined;
                        } | {
                            var: string;
                            lit?: undefined;
                        })[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
                    } | {
                        args: {
                            query: {
                                example: string;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                            params?: undefined;
                        };
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
                    })[];
                };
            };
            relations: {
                ancestors: string[][];
            };
        };
    };
}
declare const config: Config;
export { config, FEATURE_PLUGINS, };
