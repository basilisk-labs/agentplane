import type { TaskData } from "../../../backends/task-backend.js";
import { type PrMeta } from "../../shared/pr-meta.js";
import { type CommandContext } from "../../shared/task-backend.js";
type BatchValidationDeps = {
    getTask?: (taskId: string) => Promise<TaskData | null>;
    resolveTaskBranch?: (taskId: string) => Promise<string | null>;
    readPrMeta?: (taskId: string) => Promise<PrMeta | null>;
};
export declare function validateBranchPrBatchIncludedTasks(opts: {
    ctx: CommandContext;
    primaryTaskId: string;
    includeTaskIds?: string[];
    primaryBranch: string;
    deps?: BatchValidationDeps;
}): Promise<string[]>;
export {};
//# sourceMappingURL=batch-validation.d.ts.map