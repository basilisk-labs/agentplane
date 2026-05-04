import { type TaskData } from "../shared.js";
import { type TaskComment } from "./comments.js";
import type { RedmineBackendRuntimeHost } from "./runtime-context.js";
export declare function listRedmineRemoteTasks(host: RedmineBackendRuntimeHost): Promise<TaskData[]>;
export declare function findRedmineIssueByTaskId(host: RedmineBackendRuntimeHost, taskId: string): Promise<Record<string, unknown> | null>;
export declare function redmineIssueToTask(host: RedmineBackendRuntimeHost, issue: Record<string, unknown>, taskIdOverride?: string): TaskData | null;
export declare function redmineTaskToIssuePayload(host: RedmineBackendRuntimeHost, task: TaskData, existingIssue?: Record<string, unknown>): Record<string, unknown>;
export declare function appendRedmineBackendCustomField(host: RedmineBackendRuntimeHost, fields: Record<string, unknown>[], key: string, value: unknown): void;
export declare function normalizeRedmineBackendComments(value: unknown): TaskComment[];
export declare function appendRedmineBackendCommentNotes(host: RedmineBackendRuntimeHost, issueId: string, existingComments: TaskComment[], desiredComments: TaskComment[]): Promise<void>;
export declare function redmineBackendCustomFieldValue(issue: Record<string, unknown>, fieldId: unknown): string | null;
export declare function maybeParseRedmineBackendJson(value: unknown): unknown;
export declare function diffRedmineBackendTasks(localTask: TaskData, remoteTask: TaskData): string;
export declare function redmineBackendTasksDiffer(localTask: TaskData, remoteTask: TaskData): boolean;
export declare function requestRedmineBackendJson(host: RedmineBackendRuntimeHost, method: string, reqPath: string, payload?: Record<string, unknown>, params?: Record<string, unknown>, opts?: {
    attempts?: number;
    backoff?: number;
}): Promise<Record<string, unknown>>;
//# sourceMappingURL=runtime-operations.d.ts.map