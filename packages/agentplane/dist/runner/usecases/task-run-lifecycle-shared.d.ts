import { type CommandContext } from "../../commands/shared/task-backend.js";
import { RunnerRunRepository } from "../run-repository.js";
import type { RunnerContextBundle, RunnerLifecycleStatus, RunnerProcessSignal, RunnerResult, RunnerRunState } from "../types.js";
import { type ExecutedTaskRunnerExecution, type PreparedTaskRunnerExecution } from "./task-run.js";
export type LoadedRunnerExecution = PreparedTaskRunnerExecution & {
    ctx: CommandContext;
    state: RunnerRunState;
    repository: RunnerRunRepository;
};
export type CancelledTaskRunnerExecution = LoadedRunnerExecution & {
    previous_status: RunnerLifecycleStatus;
    changed: boolean;
};
export type ResumedTaskRunnerExecution = LoadedRunnerExecution & {
    previous_status: RunnerLifecycleStatus;
    result: RunnerResult;
};
export type RetriedTaskRunnerExecution = ExecutedTaskRunnerExecution & {
    ctx: CommandContext;
    source_run_id: string;
    source_status: RunnerLifecycleStatus;
};
export declare function assertExecuteMode(bundle: RunnerContextBundle, action: "resume" | "retry"): void;
export declare function readRunningPid(state: RunnerRunState): number | null;
export declare function assertMatchingProcessIdentity(opts: {
    task_id: string;
    run_id: string;
    state: RunnerRunState;
    pid: number;
}): Promise<void>;
export declare function signalProcess(pid: number, signal: RunnerProcessSignal): boolean;
export declare function buildSyntheticCancelledState(opts: {
    state: RunnerRunState;
    signal: RunnerProcessSignal;
    updated_at: string;
}): RunnerRunState;
export declare function loadExistingRunnerExecution(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string | null;
    task_id: string;
    run_id: string;
    require_task_doing?: boolean;
}): Promise<LoadedRunnerExecution>;
//# sourceMappingURL=task-run-lifecycle-shared.d.ts.map