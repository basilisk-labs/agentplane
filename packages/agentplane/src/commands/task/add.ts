import { type TaskData } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { dedupeStrings, normalizeTaskStatus, nowIso } from "./shared.js";

export async function cmdTaskAdd(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskIds: string[];
  title: string;
  description: string;
  status: string;
  priority: string;
  owner: string;
  tags: string[];
  dependsOn: string[];
  verify: string[];
  commentAuthor: string | null;
  commentBody: string | null;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const status = normalizeTaskStatus(opts.status);
    const existing = await ctx.taskBackend.listTasks();
    const existingIds = new Set(existing.map((task) => task.id));
    for (const taskId of opts.taskIds) {
      if (existingIds.has(taskId)) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `Task already exists: ${taskId}`,
        });
      }
    }

    const tags = dedupeStrings(opts.tags);
    const dependsOn = dedupeStrings(opts.dependsOn);
    const verify = dedupeStrings(opts.verify);
    const docUpdatedBy = (opts.commentAuthor ?? "").trim() || opts.owner;

    const tasks: TaskData[] = opts.taskIds.map((taskId) => ({
      id: taskId,
      title: opts.title,
      description: opts.description,
      status,
      priority: opts.priority,
      owner: opts.owner,
      tags,
      depends_on: dependsOn,
      verify,
      comments:
        opts.commentAuthor && opts.commentBody
          ? [{ author: opts.commentAuthor, body: opts.commentBody }]
          : [],
      doc_version: 2,
      doc_updated_at: nowIso(),
      doc_updated_by: docUpdatedBy,
      id_source: "explicit",
    }));
    if (ctx.taskBackend.writeTasks) {
      await ctx.taskBackend.writeTasks(tasks);
    } else {
      for (const task of tasks) {
        await ctx.taskBackend.writeTask(task);
      }
    }
    for (const task of tasks) {
      process.stdout.write(`${task.id}\n`);
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task add", root: opts.rootOverride ?? null });
  }
}
