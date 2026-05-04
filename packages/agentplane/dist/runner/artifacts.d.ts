import type { RunnerContextBundle, RunnerEvent, RunnerInvocation, RunnerInvocationSnapshot, RunnerLifecycleStatus, RunnerResult, RunnerRunState, RunnerSupervisionState } from "./types.js";
export declare function createRunnerInvocationSnapshot(invocation?: RunnerInvocation | null): RunnerInvocationSnapshot;
export declare function createRunnerRunState(opts: {
    bundle: RunnerContextBundle;
    status?: RunnerLifecycleStatus;
    created_at?: string;
    prepared_metadata?: RunnerRunState["prepared_metadata"];
}): RunnerRunState;
export declare function writePreparedRunnerArtifacts(opts: {
    bundle: RunnerContextBundle;
    bootstrap_markdown?: string;
    created_at?: string;
    invocation?: RunnerInvocation;
}): Promise<RunnerRunState>;
export declare function appendRunnerEvent(opts: {
    events_path: string;
    event: RunnerEvent;
}): Promise<void>;
export declare function readRunnerRunState(state_path: string): Promise<RunnerRunState | null>;
export declare function evolveRunnerRunState(opts: {
    state: RunnerRunState;
    status: RunnerLifecycleStatus;
    result?: RunnerResult;
    updated_at?: string;
    supervision?: RunnerSupervisionState;
}): RunnerRunState;
export declare function writeRunnerRunState(opts: {
    state_path: string;
    state: RunnerRunState;
}): Promise<void>;
//# sourceMappingURL=artifacts.d.ts.map