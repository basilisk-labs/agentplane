import { describe, expect, it } from "vitest";

import { createSupervisionClock } from "./clock.js";

describe("runner supervision clock", () => {
  it("projects persisted time from monotonic elapsed time across forward and backward wall steps", () => {
    const anchor = Date.parse("2026-07-24T10:00:00.000Z");
    let wallNowMs = anchor;
    let monotonicNowMs = 1000;
    const clock = createSupervisionClock({
      wall_now_ms: () => wallNowMs,
      monotonic_now_ms: () => monotonicNowMs,
    });

    expect(clock.nowIso()).toBe("2026-07-24T10:00:00.000Z");

    wallNowMs += 3_600_000;
    monotonicNowMs += 25;
    expect(clock.nowIso()).toBe("2026-07-24T10:00:00.025Z");

    wallNowMs -= 7_200_000;
    monotonicNowMs += 25;
    expect(clock.nowIso()).toBe("2026-07-24T10:00:00.050Z");
    expect(clock.diagnostic()).toEqual({
      logical_time_source: "monotonic_projection",
      wall_clock_regression_count: 1,
      maximum_wall_clock_regression_ms: 7_200_000,
    });
  });

  it("honors an existing persisted timestamp as a logical floor", () => {
    const anchor = Date.parse("2026-07-24T10:00:00.000Z");
    let monotonicNowMs = 1000;
    const clock = createSupervisionClock({
      wall_now_ms: () => anchor,
      monotonic_now_ms: () => monotonicNowMs,
    });

    clock.advanceToIso("2026-07-24T10:00:05.000Z");

    expect(clock.nowIso()).toBe("2026-07-24T10:00:05.000Z");
    monotonicNowMs += 25;
    expect(clock.nowIso()).toBe("2026-07-24T10:00:05.025Z");
  });
});
