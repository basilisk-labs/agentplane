import { type CommandContext } from "../shared/task-backend.js";
import { type TaskListFilters } from "./shared.js";
export declare function cmdTaskNext(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    filters: TaskListFilters;
}): Promise<number>;
//# sourceMappingURL=next.d.ts.map