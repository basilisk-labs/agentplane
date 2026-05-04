import { type TasksExportSnapshot } from "@agentplaneorg/core/tasks";
import type { TaskData } from "./types.js";
export declare function buildTasksExportSnapshotFromTasks(tasks: TaskData[]): TasksExportSnapshot;
export declare function writeTasksExportFromTasks(opts: {
    outputPath: string;
    tasks: TaskData[];
}): Promise<void>;
//# sourceMappingURL=export.d.ts.map