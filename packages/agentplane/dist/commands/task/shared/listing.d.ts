import type { TaskSummary } from "../../../backends/task-backend.js";
import { type DependencyState } from "./dependencies.js";
export type TaskListFilters = {
    status: string[];
    owner: string[];
    tag: string[];
    limit?: number;
    quiet: boolean;
    strictRead?: boolean;
};
export declare function parseTaskListFilters(args: string[], opts?: {
    allowLimit?: boolean;
}): TaskListFilters;
export declare function handleTaskListWarnings(opts: {
    backend: {
        getLastListWarnings?: () => string[];
    };
    strictRead?: boolean;
}): void;
export type QueryTaskProjectionResult = {
    depState: Map<string, DependencyState>;
    filtered: TaskSummary[];
    items: TaskSummary[];
};
export declare function queryTaskProjection(opts: {
    tasks: TaskSummary[];
    filters: TaskListFilters;
    defaultStatuses?: string[];
    match?: (task: TaskSummary) => boolean;
    readyOnly?: boolean;
    limitOrder?: "before-sort" | "after-sort";
}): QueryTaskProjectionResult;
export declare function taskTextBlob(task: TaskSummary): string;
//# sourceMappingURL=listing.d.ts.map