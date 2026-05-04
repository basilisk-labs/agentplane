import { type CommandContext } from "../shared/task-backend.js";
import { type TaskListFilters } from "./shared.js";
export declare function cmdTaskListWithFilters(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    filters: TaskListFilters;
}): Promise<number>;
export declare function cmdTaskList(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    filters: TaskListFilters;
}): Promise<number>;
//# sourceMappingURL=list.d.ts.map