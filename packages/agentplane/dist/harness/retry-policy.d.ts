export type RetryReasonCode = "continuation_needed" | "worker_exit_abnormal" | "worker_spawn_failed" | "stalled_timeout" | "poll_failed" | "no_slots" | "reconcile_conflict";
export type RetryDelayType = "continuation" | "failure";
export type RetryPolicy = {
    continuationDelayMs: number;
    failureBaseDelayMs: number;
    maxBackoffMs: number;
    maxAttempts: number;
};
export type RetryEntry = {
    issueId: string;
    attempt: number;
    dueAtMs: number;
    reasonCode: RetryReasonCode;
    reasonMessage?: string;
    delayType: RetryDelayType;
};
export declare function computeRetryDelayMs(attempt: number, delayType: RetryDelayType, policy?: RetryPolicy): number;
export declare function scheduleRetryEntry(opts: {
    issueId: string;
    attempt: number;
    reasonCode: RetryReasonCode;
    reasonMessage?: string;
    delayType: RetryDelayType;
    nowMs: number;
    policy?: RetryPolicy;
}): RetryEntry;
export declare function canRetry(attempt: number, policy?: RetryPolicy): {
    allowed: boolean;
    terminal: boolean;
};
//# sourceMappingURL=retry-policy.d.ts.map