import type { TaskData, TaskSummary, TaskWriteOptions } from "../../backends/task-backend.js";
import type { TaskBackendPort } from "../../ports/task-backend-port.js";
import type { CommandContext } from "../../commands/shared/task-backend.js";
export declare class TaskBackendAdapter implements TaskBackendPort {
    private readonly ctx;
    readonly listProjectionTasks?: () => Promise<TaskSummary[]>;
    constructor(ctx: CommandContext);
    get capabilities(): TaskBackendPort["capabilities"];
    listTasks(): Promise<TaskData[]>;
    getTask(id: string): Promise<TaskData | null>;
    writeTask(task: TaskData, opts?: TaskWriteOptions): Promise<void>;
    exportProjectionSnapshot(path: string): Promise<void>;
}
//# sourceMappingURL=task-backend-adapter.d.ts.map