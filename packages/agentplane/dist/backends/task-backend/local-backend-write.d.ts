import { type LocalBackendContext } from "./local-backend-state.js";
import { type TaskData, type TaskWriteOptions } from "./shared.js";
export declare function generateLocalTaskId(context: Pick<LocalBackendContext, "root">, opts: {
    length: number;
    attempts: number;
}): Promise<string>;
export declare function writeLocalTask(context: LocalBackendContext, task: TaskData, opts?: TaskWriteOptions): Promise<void>;
export declare function writeLocalTasks(context: LocalBackendContext, tasks: TaskData[], opts?: TaskWriteOptions): Promise<void>;
export declare function normalizeLocalTasks(context: LocalBackendContext): Promise<{
    scanned: number;
    changed: number;
}>;
export declare function exportLocalTasksJson(context: LocalBackendContext, outputPath: string): Promise<void>;
export declare function exportLocalProjectionSnapshot(context: LocalBackendContext, outputPath: string): Promise<void>;
//# sourceMappingURL=local-backend-write.d.ts.map