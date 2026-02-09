import type { TaskData } from "../../backends/task-backend.js";
import type { TaskBackendPort } from "../../ports/task-backend-port.js";
import type { CommandContext } from "../../commands/shared/task-backend.js";

export class TaskBackendAdapter implements TaskBackendPort {
  private readonly ctx: CommandContext;

  constructor(ctx: CommandContext) {
    this.ctx = ctx;
  }

  listTasks(): Promise<TaskData[]> {
    return this.ctx.taskBackend.listTasks();
  }

  getTask(id: string): Promise<TaskData | null> {
    return this.ctx.taskBackend.getTask(id);
  }

  writeTask(task: TaskData): Promise<void> {
    return this.ctx.taskBackend.writeTask(task);
  }

  exportTasksJson(path: string): Promise<void> {
    return this.ctx.taskBackend.exportTasksJson(path);
  }
}
