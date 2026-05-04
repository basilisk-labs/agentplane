import { type CommandContext } from "../shared/task-backend.js";
import { type TaskListFilters } from "./shared.js";
export declare function cmdTaskSearch(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    query: string;
    regex: boolean;
    filters: TaskListFilters;
}): Promise<number>;
//# sourceMappingURL=search.d.ts.map