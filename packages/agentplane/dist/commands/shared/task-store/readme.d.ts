import { type TaskData } from "../../../backends/task-backend.js";
import { CliError } from "../../../shared/errors.js";
import type { CachedTask, TaskStoreContext } from "./types.js";
export declare function normalizeTaskRevision(value: unknown, fallback?: number): number;
export declare function readStoredTaskRevision(value: unknown): number | null;
export declare function isConcurrentReadmeChangeError(err: unknown): err is CliError;
export declare function throwTaskRevisionConflict(opts: {
    taskId: string;
    expectedRevision: number;
    currentRevision: number;
}): never;
export declare function readTaskReadmeCached(opts: {
    ctx: TaskStoreContext;
    taskId: string;
}): Promise<CachedTask>;
export declare function ensureUnchangedOnDisk(opts: {
    readmePath: string;
    expectedMtimeMs: number;
}): Promise<void>;
export declare function didReadmeChangeOnDisk(opts: {
    readmePath: string;
    expectedMtimeMs: number;
}): Promise<boolean>;
export declare function writeTaskReadme(opts: {
    entry: CachedTask;
    next: TaskData;
}): Promise<boolean>;
//# sourceMappingURL=readme.d.ts.map