export declare function sleep(ms: number): Promise<void>;
export declare function mapLimit<T, R>(items: T[], limit: number, fn: (item: T, index: number) => Promise<R>): Promise<R[]>;
//# sourceMappingURL=concurrency.d.ts.map