import type { TaskData } from "../../../backends/task-backend.js";
import type { PolicyActionId } from "../../../policy/taxonomy.js";
import type { CommandContext } from "../../shared/task-backend.js";
import { type ExecuteTaskStatusTransitionRequest, type TaskStatusTransitionExecution } from "./workflow-transition-service.js";
type TaskStatusTransitionCommandRequest = Omit<ExecuteTaskStatusTransitionRequest, "task" | "backend" | "config">;
export declare function applyTaskStatusTransitionCommand(opts: {
    ctx: CommandContext;
    taskId: string;
    quiet: boolean;
    policyAction?: PolicyActionId;
    build: (current: TaskData) => TaskStatusTransitionCommandRequest | Promise<TaskStatusTransitionCommandRequest>;
}): Promise<{
    execution: TaskStatusTransitionExecution;
    primaryTag: string;
}>;
export {};
//# sourceMappingURL=transition-command.d.ts.map