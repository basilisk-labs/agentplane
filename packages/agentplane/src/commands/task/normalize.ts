import { mapBackendError } from "../../cli/error-map.js";
import { successMessage } from "../../cli/output.js";
import { ensureActionApproved } from "../shared/approval-requirements.js";
import {
  loadCommandContext,
  type CommandContext,
  writeTasksOrFallback,
} from "../shared/task-backend.js";
import { syncHostedMergedTasks } from "./hosted-merge-sync.js";

export async function cmdTaskNormalize(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  quiet: boolean;
  force: boolean;
  yes?: boolean;
  syncHostedMerges?: boolean;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    if (opts.force) {
      await ensureActionApproved({
        action: "force_action",
        config: ctx.config,
        yes: opts.yes === true,
        reason: "task normalize --force",
      });
    }
    if (ctx.taskBackend.normalizeTasks && opts.syncHostedMerges !== true) {
      const result = await ctx.taskBackend.normalizeTasks();
      if (!opts.quiet) {
        process.stdout.write(
          `${successMessage("normalized tasks", undefined, `scanned=${result.scanned} changed=${result.changed}`)}\n`,
        );
      }
      return 0;
    }

    let tasks = await ctx.taskBackend.listTasks();
    let syncedHostedMerges = 0;
    if (opts.syncHostedMerges === true) {
      const synced = await syncHostedMergedTasks({ ctx, tasks });
      tasks = synced.tasks;
      syncedHostedMerges = synced.synced;
    }
    await writeTasksOrFallback(ctx.taskBackend, tasks);
    if (!opts.quiet) {
      process.stdout.write(
        `${successMessage(
          "normalized tasks",
          undefined,
          `count=${tasks.length}${opts.syncHostedMerges === true ? ` synced_hosted_merges=${syncedHostedMerges}` : ""}`,
        )}\n`,
      );
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task normalize", root: opts.rootOverride ?? null });
  }
}
