import type { ExecutedTaskRunnerExecution, PreparedTaskRunnerExecution } from "../../runner/usecases/task-run.js";
export type TaskRunOutput = {
    stdout: string;
    stderr: string;
};
export declare function renderTaskRunExecutedOutput(opts: {
    taskId: string;
    executed: ExecutedTaskRunnerExecution;
}): TaskRunOutput;
export declare function renderTaskRunDryRunOutput(opts: {
    taskId: string;
    prepared: PreparedTaskRunnerExecution;
}): TaskRunOutput;
//# sourceMappingURL=run-output.d.ts.map