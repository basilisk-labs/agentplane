export declare function requestJson(opts: {
    baseUrl: string;
    apiKey: string;
}, method: string, reqPath: string, payload?: Record<string, unknown>, params?: Record<string, unknown>, requestOpts?: {
    attempts?: number;
    backoff?: number;
}): Promise<Record<string, unknown>>;
//# sourceMappingURL=client.d.ts.map