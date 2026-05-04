import type { CommandContext } from "../../commands/shared/task-backend.js";
import { type CancelledTaskRunnerExecution } from "./task-run-lifecycle-shared.js";
export declare function cancelTaskRunnerExecution(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string | null;
    task_id: string;
    run_id: string;
}): Promise<CancelledTaskRunnerExecution>;
//# sourceMappingURL=task-run-lifecycle-cancel.d.ts.map