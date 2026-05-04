import type { TaskData, TaskEvent } from "../../../backends/task-backend.js";
import type { CachedTask, TaskComment, TaskStoreIntent, TaskStoreIntentResult, TaskStoreLike, TaskStoreMutationOptions, TaskStorePatch, TaskStoreTaskPatch } from "./types.js";
export declare function setTaskFieldsIntent(task: TaskStoreTaskPatch): TaskStoreIntent;
export declare function appendTaskCommentsIntent(comments: TaskComment[]): TaskStoreIntent;
export declare function appendTaskCommentIntent(comment: TaskComment): TaskStoreIntent;
export declare function appendTaskEventsIntent(events: TaskEvent[]): TaskStoreIntent;
export declare function appendTaskEventIntent(event: TaskEvent): TaskStoreIntent;
export declare function replaceTaskDocIntent(opts: {
    doc: string;
    expectedCurrentDoc?: string | null;
}): TaskStoreIntent;
export declare function setTaskSectionIntent(opts: {
    section: string;
    text: string;
    requiredSections: string[];
    expectedCurrentText?: string | null;
}): TaskStoreIntent;
export declare function touchTaskDocMetaIntent(opts?: {
    updatedBy?: string;
    version?: 2 | 3;
}): TaskStoreIntent;
export declare function taskStorePatchFromIntents(intents: TaskStoreIntentResult): TaskStorePatch | null | undefined;
export declare function mutateTaskStore(store: TaskStoreLike, taskId: string, builder: (current: TaskData) => Promise<TaskStoreIntentResult> | TaskStoreIntentResult, opts?: TaskStoreMutationOptions): Promise<{
    changed: boolean;
    task: TaskData;
}>;
export declare function applyTaskStoreIntentsToTask(task: TaskData, intents: TaskStoreIntentResult, opts?: {
    currentDocVersion?: 2 | 3;
    docUpdatedAt?: string;
}): TaskData;
export declare function applyTaskStoreIntents(entry: CachedTask, intents: TaskStoreIntent[]): TaskData;
export declare function resolveTaskStoreIntents(intents: TaskStoreIntentResult): TaskStoreIntent[];
export declare function resolveTaskStorePatch(patch: TaskStorePatch | null | undefined): TaskStoreIntent[];
//# sourceMappingURL=intents.d.ts.map