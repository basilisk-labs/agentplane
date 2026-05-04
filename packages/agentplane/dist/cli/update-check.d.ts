export declare const UPDATE_CHECK_SCHEMA_VERSION: 1;
export declare const UPDATE_CHECK_TTL_MS: number;
export declare const UPDATE_CHECK_TIMEOUT_MS = 1500;
export type UpdateCheckStatus = "ok" | "error" | "not_modified";
export type UpdateCheckCache = {
    schema_version: typeof UPDATE_CHECK_SCHEMA_VERSION;
    checked_at: string;
    latest_version: string | null;
    etag: string | null;
    status: UpdateCheckStatus;
};
export type UpdateCheckFetchResult = {
    status: "ok";
    latestVersion: string;
    etag: string | null;
} | {
    status: "not_modified";
    etag: string | null;
} | {
    status: "error";
};
export declare function resolveUpdateCheckCachePath(agentplaneHome: string): string;
export declare function shouldCheckNow(checkedAt: string | null | undefined, now: Date, ttlMs: number): boolean;
export declare function readUpdateCheckCache(filePath: string): Promise<UpdateCheckCache | null>;
export declare function writeUpdateCheckCache(filePath: string, cache: UpdateCheckCache): Promise<void>;
export declare function fetchLatestNpmVersion(opts: {
    url: string;
    timeoutMs: number;
    etag?: string | null;
}): Promise<UpdateCheckFetchResult>;
//# sourceMappingURL=update-check.d.ts.map