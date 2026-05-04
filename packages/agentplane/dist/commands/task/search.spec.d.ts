import type { CommandSpec } from "../../cli/spec/spec.js";
import type { TaskListFilters } from "./shared.js";
export type TaskSearchParsed = {
    query: string;
    regex: boolean;
    filters: TaskListFilters;
};
export declare const taskSearchSpec: CommandSpec<TaskSearchParsed>;
//# sourceMappingURL=search.spec.d.ts.map