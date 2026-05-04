import { type TaskData, type TaskSummary, type TaskWriteOptions } from "../shared.js";
type RedmineCachePort = {
    listTasks: () => Promise<TaskData[]>;
    listProjectionTasks?: () => Promise<TaskSummary[]>;
    normalizeTasks?: () => Promise<{
        scanned: number;
        changed: number;
    }>;
    getTask: (taskId: string) => Promise<TaskData | null>;
    writeTask: (task: TaskData, opts?: TaskWriteOptions) => Promise<void>;
};
type RedmineCacheDocContext = {
    cache: RedmineCachePort | null;
    customFields: Record<string, unknown>;
    ownerAgent: string;
    batchSize: number;
    findIssueByTaskId: (taskId: string) => Promise<Record<string, unknown> | null>;
    issueToTask: (issue: Record<string, unknown>, taskIdOverride?: string) => TaskData | null;
    customFieldValue: (issue: Record<string, unknown>, fieldId: unknown) => string | null;
    appendCustomField: (fields: Record<string, unknown>[], key: string, value: unknown) => void;
    requestJson: (method: string, reqPath: string, payload?: Record<string, unknown>, params?: Record<string, unknown>) => Promise<Record<string, unknown>>;
    assertExpectedRevisionSupported: (taskId: string, opts?: TaskWriteOptions) => void;
    assertExpectedRevision: (taskId: string, expectedRevision: number | undefined, currentRevision: number) => void;
    cacheTask: (task: TaskData, dirty: boolean) => Promise<void>;
};
export declare function listRedmineTasks(context: RedmineCacheDocContext): Promise<TaskData[]>;
export declare function listRedmineProjectionTasks(context: RedmineCacheDocContext): Promise<TaskSummary[]>;
export declare function exportRedmineTasksJson(context: RedmineCacheDocContext, outputPath: string): Promise<void>;
export declare function exportRedmineProjectionSnapshot(context: RedmineCacheDocContext, outputPath: string): Promise<void>;
export declare function normalizeRedmineTasks(context: RedmineCacheDocContext): Promise<{
    scanned: number;
    changed: number;
}>;
export declare function getRedmineTask(context: RedmineCacheDocContext, taskId: string): Promise<TaskData | null>;
export declare function getRedmineTasks(context: RedmineCacheDocContext, taskIds: string[]): Promise<(TaskData | null)[]>;
export declare function getRedmineTaskDoc(context: RedmineCacheDocContext, taskId: string): Promise<string>;
export declare function setRedmineTaskDoc(context: RedmineCacheDocContext, taskId: string, doc: string, updatedBy?: string, opts?: TaskWriteOptions): Promise<void>;
export declare function touchRedmineTaskDocMetadata(context: RedmineCacheDocContext, taskId: string, updatedBy?: string, opts?: TaskWriteOptions): Promise<void>;
export {};
//# sourceMappingURL=backend-cache-doc.d.ts.map