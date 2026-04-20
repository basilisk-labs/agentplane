import { generateTaskId, RedmineUnavailable, toStringSafe } from "../../shared.js";
import type { RedmineSyncContext } from "./context.js";

export async function generateRedmineTaskId(
  context: RedmineSyncContext,
  opts: { length: number; attempts: number },
): Promise<string> {
  let existingIds = new Set<string>();
  try {
    const tasks = await context.listTasksRemote();
    existingIds = new Set(tasks.map((task) => toStringSafe(task.id)).filter(Boolean));
  } catch (err) {
    if (!(err instanceof RedmineUnavailable)) throw err;
    if (!context.cache) throw err;
    const cached = await context.cache.listTasks();
    existingIds = new Set(cached.map((task) => toStringSafe(task.id)).filter(Boolean));
  }
  return await generateTaskId({
    length: opts.length,
    attempts: opts.attempts,
    isAvailable: (taskId) => !existingIds.has(taskId),
  });
}
