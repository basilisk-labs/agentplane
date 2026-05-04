import type { ParsedTaskReadme } from "@agentplaneorg/core/tasks";
import type { TaskData, TaskEvent } from "../../../backends/task-backend.js";
import type { CommandContext } from "../task-backend.js";
export type CachedTask = {
    task: TaskData;
    readmePath: string;
    mtimeMs: number;
    parsed: ParsedTaskReadme;
    rawText: string;
};
export type TaskComment = NonNullable<TaskData["comments"]>[number];
export type TaskDocState = {
    comments: TaskData["comments"] | null;
    doc: string;
    doc_updated_at?: string;
    doc_updated_by?: string;
    doc_version: 2 | 3;
    owner: string;
    sections?: TaskData["sections"] | null;
};
export type TaskStoreTaskPatch = Partial<Omit<TaskData, "doc" | "comments" | "events" | "doc_version" | "doc_updated_at" | "doc_updated_by">>;
export type TaskStoreDocPatch = {
    kind: "replace-doc";
    doc: string;
    expectedCurrentDoc?: string | null;
} | {
    kind: "set-section";
    section: string;
    text: string;
    requiredSections: string[];
    expectedCurrentText?: string | null;
};
export type TaskStorePatch = {
    task?: TaskStoreTaskPatch;
    appendComments?: TaskComment[];
    appendEvents?: TaskEvent[];
    doc?: TaskStoreDocPatch;
    docMeta?: {
        touch?: boolean;
        updatedBy?: string;
        version?: 2 | 3;
    };
};
export type TaskStoreIntent = {
    kind: "set-task-fields";
    task: TaskStoreTaskPatch;
} | {
    kind: "append-comments";
    comments: TaskComment[];
} | {
    kind: "append-events";
    events: TaskEvent[];
} | {
    kind: "replace-doc";
    doc: string;
    expectedCurrentDoc?: string | null;
} | {
    kind: "set-section";
    section: string;
    text: string;
    requiredSections: string[];
    expectedCurrentText?: string | null;
} | {
    kind: "touch-doc-meta";
    updatedBy?: string;
    version?: 2 | 3;
};
export type TaskStoreIntentResult = TaskStoreIntent | readonly TaskStoreIntent[] | null | undefined;
export type TaskStoreMutationOptions = {
    expectedRevision?: number;
};
export type TaskStoreLike = Pick<TaskStore, "patch"> & {
    mutate?: TaskStore["mutate"];
};
export type TaskStoreReader = {
    get(taskId: string): Promise<TaskData>;
};
export interface TaskStore {
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
}
export type TaskStoreContext = CommandContext;
//# sourceMappingURL=types.d.ts.map