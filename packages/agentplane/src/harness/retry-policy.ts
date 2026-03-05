export type RetryReasonCode =
  | "continuation_needed"
  | "worker_exit_abnormal"
  | "worker_spawn_failed"
  | "stalled_timeout"
  | "poll_failed"
  | "no_slots"
  | "reconcile_conflict";

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

const DEFAULT_POLICY: RetryPolicy = {
  continuationDelayMs: 1000,
  failureBaseDelayMs: 10_000,
  maxBackoffMs: 300_000,
  maxAttempts: 5,
};

export function computeRetryDelayMs(
  attempt: number,
  delayType: RetryDelayType,
  policy: RetryPolicy = DEFAULT_POLICY,
): number {
  if (delayType === "continuation" && attempt <= 1) {
    return policy.continuationDelayMs;
  }
  const power = Math.max(0, Math.min(attempt - 1, 10));
  const delayed = policy.failureBaseDelayMs * 2 ** power;
  return Math.min(delayed, policy.maxBackoffMs);
}

export function scheduleRetryEntry(opts: {
  issueId: string;
  attempt: number;
  reasonCode: RetryReasonCode;
  reasonMessage?: string;
  delayType: RetryDelayType;
  nowMs: number;
  policy?: RetryPolicy;
}): RetryEntry {
  const policy = opts.policy ?? DEFAULT_POLICY;
  const safeAttempt = Math.max(1, opts.attempt);
  const delayMs = computeRetryDelayMs(safeAttempt, opts.delayType, policy);
  return {
    issueId: opts.issueId,
    attempt: safeAttempt,
    dueAtMs: opts.nowMs + delayMs,
    reasonCode: opts.reasonCode,
    reasonMessage: opts.reasonMessage,
    delayType: opts.delayType,
  };
}

export function canRetry(
  attempt: number,
  policy: RetryPolicy = DEFAULT_POLICY,
): { allowed: boolean; terminal: boolean } {
  if (attempt < policy.maxAttempts) {
    return { allowed: true, terminal: false };
  }
  return { allowed: false, terminal: true };
}
