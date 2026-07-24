import type { TaskBackend, TaskData } from "../backends/task-backend.js";
import {
  getTaskBackendCapabilities,
  type CommandContext,
} from "../commands/shared/task-backend.js";

type TaskProjectionReader = Pick<TaskBackend, "getTask" | "getTasks">;

function cachedProjectionReader(ctx: CommandContext): TaskProjectionReader | null {
  const capabilities = getTaskBackendCapabilities(ctx);
  if (
    capabilities.canonical_source !== "remote" ||
    capabilities.projection !== "cache" ||
    capabilities.may_access_network_on_read !== true
  ) {
    return ctx.taskBackend;
  }
  const cache = (
    ctx.taskBackend as CommandContext["taskBackend"] & {
      cache?: Partial<TaskProjectionReader>;
    }
  ).cache;
  return typeof cache?.getTask === "function"
    ? {
        getTask: cache.getTask.bind(cache),
        ...(typeof cache.getTasks === "function" ? { getTasks: cache.getTasks.bind(cache) } : {}),
      }
    : null;
}

export function runnerTaskProjectionReader(ctx: CommandContext): TaskProjectionReader {
  const reader = cachedProjectionReader(ctx);
  if (reader) return reader;
  return {
    getTask: () => Promise.resolve(null),
    getTasks: (taskIds) => Promise.resolve(taskIds.map(() => null)),
  };
}

export async function observeRunnerTaskProjection(
  ctx: CommandContext,
  taskId: string,
): Promise<TaskData | null> {
  return await runnerTaskProjectionReader(ctx).getTask(taskId);
}
