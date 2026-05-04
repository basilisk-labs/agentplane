export declare const GH_LOOKUP_MAX_ATTEMPTS = 3;
export declare const GH_LOOKUP_BASE_DELAY_MS = 250;
export declare function normalizeGhTransportError(err: unknown): string;
export declare function isTransientGhTransportError(err: unknown): boolean;
export declare function withGhTransportRetry<T>(operation: () => Promise<T>, opts: {
    label: string;
    maxAttempts?: number;
    baseDelayMs?: number;
    onRetry?: (ctx: {
        attempt: number;
        maxAttempts: number;
        error: unknown;
        label: string;
    }) => void;
}): Promise<T>;
//# sourceMappingURL=gh-transport.d.ts.map