import { type TaskBackend, type TaskData, type TaskSummary, type TaskWriteOptions } from "./shared.js";
export declare class LocalBackend implements TaskBackend {
    id: string;
    capabilities: {
        readonly canonical_source: "local";
        readonly projection: "canonical";
        readonly projection_read_mode: "native";
        readonly reads_from_projection_by_default: true;
        readonly writes_task_readmes: true;
        readonly supports_task_revisions: true;
        readonly supports_revision_guarded_writes: true;
        readonly may_access_network_on_read: false;
        readonly may_access_network_on_write: false;
        readonly supports_projection_refresh: false;
        readonly supports_push_sync: false;
        readonly supports_snapshot_export: true;
    };
    root: string;
    updatedBy: string;
    private lastListWarnings;
    constructor(settings?: {
        dir?: string;
        updatedBy?: string;
    });
    generateTaskId(opts: {
        length: number;
        attempts: number;
    }): Promise<string>;
    private backendContext;
    listTasks(): Promise<TaskData[]>;
    listProjectionTasks(): Promise<TaskSummary[]>;
    getLastListWarnings(): string[];
    getTask(taskId: string): Promise<TaskData | null>;
    getTasks(taskIds: string[]): Promise<(TaskData | null)[]>;
    getTaskDoc(taskId: string): Promise<string>;
    writeTask(task: TaskData, opts?: TaskWriteOptions): Promise<void>;
    setTaskDoc(taskId: string, doc: string, updatedBy?: string, opts?: TaskWriteOptions): Promise<void>;
    touchTaskDocMetadata(taskId: string, updatedBy?: string, opts?: TaskWriteOptions): Promise<void>;
    writeTasks(tasks: TaskData[], opts?: TaskWriteOptions): Promise<void>;
    normalizeTasks(): Promise<{
        scanned: number;
        changed: number;
    }>;
    exportTasksJson(outputPath: string): Promise<void>;
    exportProjectionSnapshot(outputPath: string): Promise<void>;
}
//# sourceMappingURL=local-backend.d.ts.map