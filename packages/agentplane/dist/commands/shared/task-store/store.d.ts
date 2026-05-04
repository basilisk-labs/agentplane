import type { TaskData } from "../../../backends/task-backend.js";
import type { TaskStore as TaskStoreContract, TaskStoreContext, TaskStoreIntentResult, TaskStoreMutationOptions, TaskStorePatch } from "./types.js";
export declare class TaskStore implements TaskStoreContract {
    private ctx;
    private cache;
    constructor(ctx: TaskStoreContext);
    get(taskId: string): Promise<TaskData>;
    update(taskId: string, updater: (current: TaskData) => Promise<TaskData> | TaskData, opts?: TaskStoreMutationOptions): Promise<{
        changed: boolean;
        task: TaskData;
    }>;
    patch(taskId: string, builder: (current: TaskData) => Promise<TaskStorePatch | null | undefined> | TaskStorePatch | null | undefined, opts?: TaskStoreMutationOptions): Promise<{
        changed: boolean;
        task: TaskData;
    }>;
    mutate(taskId: string, builder: (current: TaskData) => Promise<TaskStoreIntentResult> | TaskStoreIntentResult, opts?: TaskStoreMutationOptions): Promise<{
        changed: boolean;
        task: TaskData;
    }>;
    private getCached;
    private runWithRetry;
    private writeNextTask;
}
export declare function getTaskStore(ctx: TaskStoreContext): TaskStore;
export declare function backendIsLocalFileBackend(ctx: TaskStoreContext): boolean;
//# sourceMappingURL=store.d.ts.map