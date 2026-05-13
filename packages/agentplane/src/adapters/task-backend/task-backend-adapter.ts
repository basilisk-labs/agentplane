import type { TaskData, TaskSummary, TaskWriteOptions } from "../../backends/task-backend.js";
import type { TaskBackendPort } from "../../ports/task-backend-port.js";
import type { CommandContext } from "../../commands/shared/task-backend.js";

export class TaskBackendAdapter implements TaskBackendPort {
  private readonly ctx: CommandContext;
  readonly listProjectionTasks?: () => Promise<TaskSummary[]>;

  constructor(ctx: CommandContext) {
    this.ctx = ctx;
    this.listProjectionTasks = ctx.taskBackend.listProjectionTasks
      ? () => ctx.taskBackend.listProjectionTasks!()
      : undefined;
  }

  get capabilities(): TaskBackendPort["capabilities"] {
    const { canonical_source, projection, projection_read_mode, reads_from_projection_by_default } =
      this.ctx.taskBackend.capabilities;
    return {
      canonical_source,
      projection,
      projection_read_mode,
      reads_from_projection_by_default,
    };
  }

  listTasks(): Promise<TaskData[]> {
    return this.ctx.taskBackend.listTasks();
  }

  getTask(id: string): Promise<TaskData | null> {
    return this.ctx.taskBackend.getTask(id);
  }

  writeTask(task: TaskData, opts?: TaskWriteOptions): Promise<void> {
    return this.ctx.taskBackend.writeTask(task, opts);
  }
}
