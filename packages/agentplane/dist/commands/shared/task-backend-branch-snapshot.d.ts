import { type TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "./task-backend.js";
export declare function resolveTaskBranchFromContext(opts: {
    ctx: CommandContext;
    taskId: string;
}): Promise<string | null>;
export declare function loadTaskFromBranchSnapshot(opts: {
    ctx: CommandContext;
    taskId: string;
    readmePath: string;
    branch?: string | null;
}): Promise<TaskData | null>;
//# sourceMappingURL=task-backend-branch-snapshot.d.ts.map