import type { RunnerProcessSignal } from "../types.js";
export type ObservedProcessIdentity = {
    pid: number;
    command: string | null;
    started_at: string | null;
};
export declare function normalizeSignal(signal: NodeJS.Signals | null): RunnerProcessSignal | null;
export declare function exitCodeForSignal(signal: RunnerProcessSignal | null): number | null;
export declare function isProcessAlive(pid: number): boolean;
export declare function readObservedProcessIdentity(pid: number): Promise<ObservedProcessIdentity | null>;
export declare function waitForProcessExit(opts: {
    pid: number;
    timeout_ms: number;
    poll_ms?: number;
}): Promise<boolean>;
//# sourceMappingURL=signals.d.ts.map