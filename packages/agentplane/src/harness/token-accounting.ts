export type TokenTotals = {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
};

export type TokenUsageEvent = {
  threadId: string;
  payload: Record<string, unknown>;
};

export type TokenAccumulator = {
  byThread: Record<string, TokenTotals>;
  global: TokenTotals;
};

const ZERO_TOTALS: TokenTotals = {
  inputTokens: 0,
  outputTokens: 0,
  totalTokens: 0,
};

function safeInt(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return Math.trunc(value);
  if (typeof value === "string" && /^\d+$/.test(value)) return Number.parseInt(value, 10);
  return null;
}

function extractAbsoluteTotals(payload: Record<string, unknown>): TokenTotals | null {
  const tokenUsage = payload.tokenUsage;
  if (tokenUsage && typeof tokenUsage === "object" && !Array.isArray(tokenUsage)) {
    const total = (tokenUsage as Record<string, unknown>).total;
    if (total && typeof total === "object" && !Array.isArray(total)) {
      const totalObj = total as Record<string, unknown>;
      const input = safeInt(totalObj.inputTokens);
      const output = safeInt(totalObj.outputTokens);
      const all = safeInt(totalObj.totalTokens);
      if (input !== null && output !== null && all !== null) {
        return { inputTokens: input, outputTokens: output, totalTokens: all };
      }
    }
  }

  const info = payload.info;
  if (info && typeof info === "object" && !Array.isArray(info)) {
    const totalUsage = (info as Record<string, unknown>).total_token_usage;
    if (totalUsage && typeof totalUsage === "object" && !Array.isArray(totalUsage)) {
      const usage = totalUsage as Record<string, unknown>;
      const input = safeInt(usage.input_tokens);
      const output = safeInt(usage.output_tokens);
      const all = safeInt(usage.total_tokens);
      if (input !== null && output !== null && all !== null) {
        return { inputTokens: input, outputTokens: output, totalTokens: all };
      }
    }
  }

  return null;
}

function mergeGlobal(byThread: Record<string, TokenTotals>): TokenTotals {
  const global = { ...ZERO_TOTALS };
  for (const totals of Object.values(byThread)) {
    global.inputTokens += totals.inputTokens;
    global.outputTokens += totals.outputTokens;
    global.totalTokens += totals.totalTokens;
  }
  return global;
}

export function createTokenAccumulator(): TokenAccumulator {
  return {
    byThread: {},
    global: { ...ZERO_TOTALS },
  };
}

export function applyTokenUsageEvent(
  state: TokenAccumulator,
  event: TokenUsageEvent,
): { state: TokenAccumulator; accepted: boolean } {
  const absolute = extractAbsoluteTotals(event.payload);
  if (!absolute) {
    return { state, accepted: false };
  }

  const prev = state.byThread[event.threadId] ?? { ...ZERO_TOTALS };
  if (absolute.totalTokens < prev.totalTokens) {
    return { state, accepted: false };
  }

  const nextByThread = {
    ...state.byThread,
    [event.threadId]: absolute,
  };

  return {
    accepted: true,
    state: {
      byThread: nextByThread,
      global: mergeGlobal(nextByThread),
    },
  };
}
