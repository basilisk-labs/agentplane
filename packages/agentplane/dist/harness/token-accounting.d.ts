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
export declare function createTokenAccumulator(): TokenAccumulator;
export declare function applyTokenUsageEvent(state: TokenAccumulator, event: TokenUsageEvent): {
    state: TokenAccumulator;
    accepted: boolean;
};
//# sourceMappingURL=token-accounting.d.ts.map