import { mapBackendError } from "../../cli/error-map.js";
import { successMessage } from "../../cli/output.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";

export async function cmdTaskNormalize(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  quiet: boolean;
  force: boolean;
}): Promise<number> {
  if (opts.force) {
    // Force is accepted for parity; no additional checks in node CLI.
  }
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    if (ctx.taskBackend.normalizeTasks) {
      const result = await ctx.taskBackend.normalizeTasks();
      if (!opts.quiet) {
        process.stdout.write(
          `${successMessage("normalized tasks", undefined, `scanned=${result.scanned} changed=${result.changed}`)}\n`,
        );
      }
      return 0;
    }

    const tasks = await ctx.taskBackend.listTasks();
    await (ctx.taskBackend.writeTasks
      ? ctx.taskBackend.writeTasks(tasks)
      : (async () => {
          for (const task of tasks) await ctx.taskBackend.writeTask(task);
        })());
    if (!opts.quiet) {
      process.stdout.write(
        `${successMessage("normalized tasks", undefined, `count=${tasks.length}`)}\n`,
      );
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task normalize", root: opts.rootOverride ?? null });
  }
}
