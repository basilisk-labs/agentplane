import { type CommandContext } from "../../commands/shared/task-backend.js";
import { type RunnerContextBundle, type RunnerExecutionContract, type RunnerInvocation, type RunnerRecipeContext, type RunnerResult, type RunnerRunState, type RunnerTarget } from "../types.js";
export type PreparedTaskRunnerExecution = {
    bundle: RunnerContextBundle;
    invocation: RunnerInvocation;
    state: RunnerRunState;
};
export type ExecutedTaskRunnerExecution = PreparedTaskRunnerExecution & {
    result: RunnerResult;
};
export declare function assertRunnerTaskExecutable(bundle: RunnerContextBundle): void;
export declare function renderTaskRunnerBootstrap(bundle: RunnerContextBundle, invocation?: RunnerInvocation): string;
export declare function prepareTaskRunnerExecution(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string | null;
    task_id: string;
    mode: RunnerExecutionContract["mode"];
    run_id?: string;
    recipe?: RunnerRecipeContext;
    target?: RunnerTarget;
}): Promise<PreparedTaskRunnerExecution>;
export declare function executeTaskRunnerExecution(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string | null;
    task_id: string;
    run_id?: string;
    recipe?: RunnerRecipeContext;
    target?: RunnerTarget;
}): Promise<ExecutedTaskRunnerExecution>;
//# sourceMappingURL=task-run.d.ts.map