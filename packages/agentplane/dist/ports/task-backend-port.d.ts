import type { TaskBackendCapabilities, TaskData, TaskSummary, TaskWriteOptions } from "../backends/task-backend.js";
export type TaskBackendPort = {
    capabilities: Pick<TaskBackendCapabilities, "canonical_source" | "projection" | "projection_read_mode" | "reads_from_projection_by_default">;
    listTasks(): Promise<TaskData[]>;
    listProjectionTasks?: () => Promise<TaskSummary[]>;
    getTask(id: string): Promise<TaskData | null>;
    writeTask(task: TaskData, opts?: TaskWriteOptions): Promise<void>;
    exportProjectionSnapshot(path: string): Promise<void>;
};
//# sourceMappingURL=task-backend-port.d.ts.map