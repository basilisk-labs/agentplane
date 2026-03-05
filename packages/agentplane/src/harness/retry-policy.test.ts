import { describe, expect, it } from "vitest";

import { canRetry, computeRetryDelayMs, scheduleRetryEntry } from "./retry-policy.js";

describe("harness/retry-policy", () => {
  it("uses continuation delay on first continuation attempt", () => {
    expect(computeRetryDelayMs(1, "continuation")).toBe(1000);
  });

  it("uses exponential backoff for failure", () => {
    const d1 = computeRetryDelayMs(1, "failure");
    const d3 = computeRetryDelayMs(3, "failure");
    expect(d1).toBe(10_000);
    expect(d3).toBe(40_000);
  });

  it("schedules retry with reason code", () => {
    const entry = scheduleRetryEntry({
      issueId: "i1",
      attempt: 2,
      reasonCode: "stalled_timeout",
      delayType: "failure",
      nowMs: 100,
    });
    expect(entry.reasonCode).toBe("stalled_timeout");
    expect(entry.dueAtMs).toBeGreaterThan(100);
  });

  it("enforces max attempts", () => {
    expect(
      canRetry(3, {
        continuationDelayMs: 1,
        failureBaseDelayMs: 1,
        maxBackoffMs: 10,
        maxAttempts: 5,
      }),
    ).toEqual({ allowed: true, terminal: false });
    expect(
      canRetry(5, {
        continuationDelayMs: 1,
        failureBaseDelayMs: 1,
        maxBackoffMs: 10,
        maxAttempts: 5,
      }),
    ).toEqual({ allowed: false, terminal: true });
  });
});
