import { describe, expect, it } from "vitest";

import { applyTokenUsageEvent, createTokenAccumulator } from "./token-accounting.js";

describe("harness/token-accounting", () => {
  it("accepts absolute totals and updates high-water-mark", () => {
    const state = createTokenAccumulator();
    const first = applyTokenUsageEvent(state, {
      threadId: "t1",
      payload: {
        tokenUsage: {
          total: { inputTokens: 10, outputTokens: 5, totalTokens: 15 },
        },
      },
    });
    expect(first.accepted).toBe(true);
    expect(first.state.global.totalTokens).toBe(15);

    const second = applyTokenUsageEvent(first.state, {
      threadId: "t1",
      payload: {
        tokenUsage: {
          total: { inputTokens: 8, outputTokens: 3, totalTokens: 11 },
        },
      },
    });
    expect(second.accepted).toBe(false);
    expect(second.state.global.totalTokens).toBe(15);
  });

  it("keeps absolute cache accounting idempotent across restart and partial duplicates", () => {
    const event = (cachedInputTokens?: number, totalTokens = 15) => ({
      threadId: "t1",
      payload: {
        tokenUsage: {
          total: {
            inputTokens: 10,
            outputTokens: totalTokens - 10,
            totalTokens,
            ...(cachedInputTokens === undefined ? {} : { cachedInputTokens }),
          },
        },
      },
    });
    const first = applyTokenUsageEvent(createTokenAccumulator(), event(7));
    const restored = JSON.parse(JSON.stringify(first.state));
    const duplicate = applyTokenUsageEvent(restored, event());
    expect(duplicate.state.global).toMatchObject({ totalTokens: 15, cachedInputTokens: 7 });
    const advancedWithoutCache = applyTokenUsageEvent(duplicate.state, event(undefined, 16));
    expect(advancedWithoutCache.state.global.cachedInputTokens).toBeNull();
    expect(applyTokenUsageEvent(duplicate.state, event(11)).accepted).toBe(false);
  });

  it("supports codex info.total_token_usage payload", () => {
    const state = createTokenAccumulator();
    const next = applyTokenUsageEvent(state, {
      threadId: "t2",
      payload: {
        info: {
          total_token_usage: {
            input_tokens: "2",
            output_tokens: 1,
            total_tokens: 3,
          },
        },
      },
    });
    expect(next.accepted).toBe(true);
    expect(next.state.byThread.t2?.totalTokens).toBe(3);
  });
});
