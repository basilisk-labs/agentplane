import { type TaskData, type TaskSummary } from "./shared.js";
import { type LocalBackendContext } from "./local-backend-state.js";
export declare function listLocalTasks(context: LocalBackendContext, mode: "full" | "projection", opts?: {
    writeIndex?: boolean;
}): Promise<TaskData[] | TaskSummary[]>;
export declare function getLocalTask(context: LocalBackendContext, taskId: string): Promise<TaskData | null>;
export declare function getLocalTasks(context: LocalBackendContext, taskIds: string[]): Promise<(TaskData | null)[]>;
export declare function getLocalTaskDoc(context: LocalBackendContext, taskId: string): Promise<string>;
//# sourceMappingURL=local-backend-read.d.ts.map