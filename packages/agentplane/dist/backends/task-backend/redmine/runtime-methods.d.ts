import { type TaskData, type TaskDocMeta, type TaskWriteOptions } from "../shared.js";
import type { TaskComment } from "./comments.js";
import type { RedmineBackendRuntimeHost } from "./runtime-context.js";
export declare const redmineBackendRuntimeMethods: {
    setInferredStatusByTaskStatus(this: RedmineBackendRuntimeHost, next: Map<string, number> | null): void;
    ensureDocMetadata(this: RedmineBackendRuntimeHost, task: TaskDocMeta): void;
    cacheTask(this: RedmineBackendRuntimeHost, task: TaskData, dirty: boolean): Promise<void>;
    assertExpectedRevisionSupported(this: RedmineBackendRuntimeHost, taskId: string, opts?: TaskWriteOptions): void;
    assertExpectedRevision(this: RedmineBackendRuntimeHost, taskId: string, expectedRevision: number | undefined, currentRevision: number): void;
    taskIdFieldId(this: RedmineBackendRuntimeHost): unknown;
    setIssueCustomFieldValue(this: RedmineBackendRuntimeHost, issue: Record<string, unknown>, fieldId: unknown, value: unknown): void;
    listTasksRemote(this: RedmineBackendRuntimeHost): Promise<TaskData[]>;
    findIssueByTaskId(this: RedmineBackendRuntimeHost, taskId: string): Promise<Record<string, unknown> | null>;
    issueToTask(this: RedmineBackendRuntimeHost, issue: Record<string, unknown>, taskIdOverride?: string): TaskData | null;
    taskToIssuePayload(this: RedmineBackendRuntimeHost, task: TaskData, existingIssue?: Record<string, unknown>): Record<string, unknown>;
    appendCustomField(this: RedmineBackendRuntimeHost, fields: Record<string, unknown>[], key: string, value: unknown): void;
    normalizeComments(this: RedmineBackendRuntimeHost, value: unknown): TaskComment[];
    commentsToPairs(this: RedmineBackendRuntimeHost, comments: TaskComment[]): [string, string][];
    formatCommentNote(this: RedmineBackendRuntimeHost, author?: string, body?: string): string;
    appendCommentNotes(this: RedmineBackendRuntimeHost, issueId: string, existingComments: TaskComment[], desiredComments: TaskComment[]): Promise<void>;
    startDateFromTaskId(this: RedmineBackendRuntimeHost, taskId: string): string | null;
    doneRatioForStatus(this: RedmineBackendRuntimeHost, status: string): number | null;
    customFieldValue(this: RedmineBackendRuntimeHost, issue: Record<string, unknown>, fieldId: unknown): string | null;
    maybeParseJson(this: RedmineBackendRuntimeHost, value: unknown): unknown;
    coerceDocVersion(this: RedmineBackendRuntimeHost, value: unknown): 2 | 3 | null;
    diffTasks(this: RedmineBackendRuntimeHost, localTask: TaskData, remoteTask: TaskData): string;
    tasksDiffer(this: RedmineBackendRuntimeHost, localTask: TaskData, remoteTask: TaskData): boolean;
    requestJson(this: RedmineBackendRuntimeHost, method: string, reqPath: string, payload?: Record<string, unknown>, params?: Record<string, unknown>, opts?: {
        attempts?: number;
        backoff?: number;
    }): Promise<Record<string, unknown>>;
};
//# sourceMappingURL=runtime-methods.d.ts.map