import type { CommandContext } from "../../commands/shared/task-backend.js";
import { type ResumedTaskRunnerExecution, type RetriedTaskRunnerExecution } from "./task-run-lifecycle-shared.js";
export declare function resumeTaskRunnerExecution(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string | null;
    task_id: string;
    run_id: string;
}): Promise<ResumedTaskRunnerExecution>;
export declare function retryTaskRunnerExecution(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string | null;
    task_id: string;
    run_id: string;
    new_run_id?: string;
}): Promise<RetriedTaskRunnerExecution>;
//# sourceMappingURL=task-run-lifecycle-replay.d.ts.map