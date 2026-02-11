import { readFile } from "node:fs/promises";
import path from "node:path";

import { type TaskData } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import { successMessage } from "../../cli/output.js";
import { ensureActionApproved } from "../shared/approval-requirements.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";

export async function cmdTaskMigrate(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  source?: string;
  quiet: boolean;
  force: boolean;
  yes?: boolean;
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
        reason: "task migrate --force",
      });
    }
    const backend = ctx.taskBackend;
    const resolved = ctx.resolvedProject;
    const config = ctx.config;
    const source = opts.source ?? config.paths.tasks_path;
    const sourcePath = path.join(resolved.gitRoot, source);
    const raw = await readFile(sourcePath, "utf8");
    const parsed = JSON.parse(raw) as { tasks?: TaskData[] };
    const tasks = Array.isArray(parsed.tasks) ? parsed.tasks : [];
    if (backend.writeTasks) {
      await backend.writeTasks(tasks);
    } else {
      for (const task of tasks) await backend.writeTask(task);
    }
    if (!opts.quiet) {
      process.stdout.write(
        `${successMessage("migrated tasks into backend", undefined, `count=${tasks.length}`)}\n`,
      );
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task migrate", root: opts.rootOverride ?? null });
  }
}
