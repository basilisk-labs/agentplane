import type { RunnerInvocation, RunnerRunState, RunnerSupervisionState } from "../types.js";
export declare function renderInvocationCommand(invocation: RunnerInvocation): string | null;
export declare function mergeSupervisionState(current: RunnerSupervisionState | undefined, patch: Partial<RunnerSupervisionState>): RunnerSupervisionState;
export declare function buildInvocationEventData(invocation: RunnerInvocation, pid: number | null): Record<string, unknown>;
export declare function waitForRunnerStateStop(opts: {
    state_path: string;
    timeout_ms: number;
    poll_ms?: number;
}): Promise<RunnerRunState | null>;
//# sourceMappingURL=state.d.ts.map