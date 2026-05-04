import type { TaskData, TaskSummary } from "./task-backend.js";
export declare const TASK_INDEX_SCHEMA_VERSION = 2;
export type TaskIndexEntry = {
    task: TaskSummary;
    readmePath: string;
    mtimeMs: number;
};
export type TaskIndexFileV2 = {
    schema_version: 2;
    byId: Record<string, TaskIndexEntry>;
    byPath: Record<string, string>;
};
export type TaskIndexFile = TaskIndexFileV2;
export declare function resolveTaskIndexPath(tasksDir: string): string;
export declare function loadTaskIndex(indexPath: string): Promise<TaskIndexFile | null>;
export declare function saveTaskIndex(indexPath: string, index: TaskIndexFileV2): Promise<void>;
export declare function buildTaskIndexEntry(task: TaskData, readmePath: string, mtimeMs: number): TaskIndexEntry;
//# sourceMappingURL=task-index.d.ts.map