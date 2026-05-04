import type { LocalBackend } from "./local-backend.js";
import { type TaskCanonicalStateMigrationResult, type TaskBackend, type TaskBackendInspectionResult, type TaskData, type TaskSummary, type TaskWriteOptions } from "./shared.js";
export type RedmineSettings = {
    url?: string;
    api_key?: string;
    project_id?: string;
    status_map?: Record<string, unknown>;
    custom_fields?: Record<string, unknown>;
    batch_size?: number;
    batch_pause?: number;
    owner_agent?: string;
    cache_dir?: string;
};
export declare class RedmineBackend implements TaskBackend {
    id: string;
    capabilities: TaskBackend["capabilities"];
    baseUrl: string;
    apiKey: string;
    projectId: string;
    assigneeId: number | null;
    ownerAgent: string;
    statusMap: Record<string, unknown>;
    customFields: Record<string, unknown>;
    batchSize: number;
    batchPauseMs: number;
    cache: LocalBackend | null;
    issueCache: Map<string, Record<string, unknown>>;
    reverseStatus: Map<number, string>;
    inferredStatusByTaskStatus: Map<string, number> | null;
    constructor(settings: RedmineSettings, opts: {
        cache?: LocalBackend | null;
    });
    setInferredStatusByTaskStatus(next: Map<string, number> | null): void;
    private runtimeHost;
    generateTaskId(opts: {
        length: number;
        attempts: number;
    }): Promise<string>;
    listTasks(): Promise<TaskData[]>;
    listProjectionTasks(): Promise<TaskSummary[]>;
    exportTasksJson(outputPath: string): Promise<void>;
    exportProjectionSnapshot(outputPath: string): Promise<void>;
    refreshProjection(opts: {
        allowNetwork: boolean;
        quiet?: boolean;
        conflict?: "diff" | "prefer-local" | "prefer-remote" | "fail";
    }): Promise<void>;
    normalizeTasks(): Promise<{
        scanned: number;
        changed: number;
    }>;
    migrateCanonicalState(): Promise<TaskCanonicalStateMigrationResult>;
    inspectConfiguration(): Promise<TaskBackendInspectionResult>;
    getTask(taskId: string): Promise<TaskData | null>;
    getTasks(taskIds: string[]): Promise<(TaskData | null)[]>;
    getTaskDoc(taskId: string): Promise<string>;
    setTaskDoc(taskId: string, doc: string, updatedBy?: string, opts?: TaskWriteOptions): Promise<void>;
    touchTaskDocMetadata(taskId: string, updatedBy?: string, opts?: TaskWriteOptions): Promise<void>;
    writeTask(task: TaskData, opts?: TaskWriteOptions): Promise<void>;
    writeTasks(tasks: TaskData[], opts?: TaskWriteOptions): Promise<void>;
    sync(opts: {
        direction: "push" | "pull";
        conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
        quiet: boolean;
        confirm: boolean;
    }): Promise<void>;
}
//# sourceMappingURL=redmine-backend.d.ts.map