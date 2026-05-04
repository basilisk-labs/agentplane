import type { TaskData, TaskDocMeta, TaskWriteOptions } from "../../shared.js";
import type { TaskComment } from "../comments.js";
export type RedmineCachePort = {
    listTasks: () => Promise<TaskData[]>;
    writeTask: (task: TaskData, opts?: TaskWriteOptions) => Promise<void>;
};
export type RedmineSyncContext = {
    cache: RedmineCachePort | null;
    customFields: Record<string, unknown>;
    ownerAgent: string;
    projectId: string;
    batchSize: number;
    batchPauseMs: number;
    statusMap: Record<string, unknown>;
    issueCache: Map<string, Record<string, unknown>>;
    inferredStatusByTaskStatus: Map<string, number> | null;
    setInferredStatusByTaskStatus: (next: Map<string, number> | null) => void;
    listTasksRemote: () => Promise<TaskData[]>;
    writeTask: (task: TaskData, opts?: TaskWriteOptions) => Promise<void>;
    writeTasks: (tasks: TaskData[], opts?: TaskWriteOptions) => Promise<void>;
    findIssueByTaskId: (taskId: string) => Promise<Record<string, unknown> | null>;
    issueToTask: (issue: Record<string, unknown>, taskIdOverride?: string) => TaskData | null;
    taskToIssuePayload: (task: TaskData, existingIssue?: Record<string, unknown>) => Record<string, unknown>;
    appendCustomField: (fields: Record<string, unknown>[], key: string, value: unknown) => void;
    customFieldValue: (issue: Record<string, unknown>, fieldId: unknown) => string | null;
    maybeParseJson: (value: unknown) => unknown;
    normalizeComments: (value: unknown) => TaskComment[];
    appendCommentNotes: (issueId: string, existingComments: TaskComment[], desiredComments: TaskComment[]) => Promise<void>;
    cacheTask: (task: TaskData, dirty: boolean) => Promise<void>;
    assertExpectedRevisionSupported: (taskId: string, opts?: TaskWriteOptions) => void;
    assertExpectedRevision: (taskId: string, expectedRevision: number | undefined, currentRevision: number) => void;
    ensureDocMetadata: (task: TaskDocMeta) => void;
    diffTasks: (localTask: TaskData, remoteTask: TaskData) => string;
    tasksDiffer: (localTask: TaskData, remoteTask: TaskData) => boolean;
    taskIdFieldId: () => unknown;
    setIssueCustomFieldValue: (issue: Record<string, unknown>, fieldId: unknown, value: unknown) => void;
    requestJson: (method: string, reqPath: string, payload?: Record<string, unknown>, params?: Record<string, unknown>, opts?: {
        attempts?: number;
        backoff?: number;
    }) => Promise<Record<string, unknown>>;
};
export declare function revisionNumber(value: unknown): number;
export declare function issueFromPayload(payload: Record<string, unknown>): Record<string, unknown> | null;
//# sourceMappingURL=context.d.ts.map