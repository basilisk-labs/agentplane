import type { TaskData, TaskWriteOptions } from "../../backends/task-backend.js";
import type { PolicyActionId } from "../../policy/taxonomy.js";
import { type CommandContext } from "./task-backend.js";
import { getTaskStore, type TaskStoreIntentResult } from "./task-store.js";
export type TaskMutationPlan = {
    intents?: TaskStoreIntentResult;
    nextTask?: TaskData;
    forceWrite?: boolean;
    writeOptions?: TaskWriteOptions;
};
export type TaskCollectionMutationPlan<TResult> = {
    tasksToWrite?: readonly TaskData[];
    result: TResult;
};
export declare function withTaskMutationStorage<TResult>(opts: {
    ctx: CommandContext;
    local: (store: ReturnType<typeof getTaskStore>) => Promise<TResult> | TResult;
    remote: (backend: CommandContext["taskBackend"]) => Promise<TResult> | TResult;
}): Promise<TResult>;
export declare function applyTaskMutation(opts: {
    ctx: CommandContext;
    taskId: string;
    policyAction?: PolicyActionId;
    build: (current: TaskData) => Promise<TaskMutationPlan | null | undefined> | TaskMutationPlan | null | undefined;
    writeOptions?: TaskWriteOptions;
}): Promise<{
    changed: boolean;
    task: TaskData;
    mode: "local-store" | "backend";
}>;
export declare function applyTaskCollectionMutation<TResult>(opts: {
    ctx: CommandContext;
    build: (current: TaskData[]) => Promise<TaskCollectionMutationPlan<TResult>> | TaskCollectionMutationPlan<TResult>;
}): Promise<{
    result: TResult;
    tasksToWrite: TaskData[];
}>;
//# sourceMappingURL=task-mutation.d.ts.map