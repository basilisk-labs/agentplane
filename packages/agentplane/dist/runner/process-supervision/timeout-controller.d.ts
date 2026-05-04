import type { RunnerTimeoutReason } from "../types.js";
type TimeoutRefState = {
    heartbeat_at: string;
    timeoutReason: RunnerTimeoutReason | null;
    timeoutRequestedAt: string | null;
    terminateSentAt: string | null;
    killSentAt: string | null;
};
export declare function createTimeoutController(opts: {
    pid: number | null;
    events_path: string;
    state_path: string;
    timeout_policy: {
        wall_clock_ms: number;
        idle_ms: number;
        terminate_grace_ms: number;
    };
    mutable: TimeoutRefState;
    is_settled: () => boolean;
    finish_with_error: (err: unknown) => void;
}): {
    clearTimers(): void;
    requestTimeout: (reason: RunnerTimeoutReason) => void;
    resetIdleTimer(): void;
    startWallClockTimer(): void;
};
export {};
//# sourceMappingURL=timeout-controller.d.ts.map