import { readFile } from "node:fs/promises";
import path from "node:path";

import { type TaskData } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import { missingValueMessage, successMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";

type TaskMigrateFlags = { source?: string; quiet: boolean; force: boolean };

function parseTaskMigrateFlags(args: string[]): TaskMigrateFlags {
  const out: TaskMigrateFlags = { quiet: false, force: false };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (arg === "--quiet") {
      out.quiet = true;
      continue;
    }
    if (arg === "--force") {
      out.force = true;
      continue;
    }
    if (arg === "--source") {
      const next = args[i + 1];
      if (!next) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: missingValueMessage("--source"),
        });
      }
      out.source = next;
      i++;
      continue;
    }
    if (arg.startsWith("--")) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unknown flag: ${arg}` });
    }
  }
  return out;
}

export async function cmdTaskMigrate(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseTaskMigrateFlags(opts.args);
  if (flags.force) {
    // Force is accepted for parity; no additional checks in node CLI.
  }
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const backend = ctx.taskBackend;
    const resolved = ctx.resolvedProject;
    const config = ctx.config;
    const source = flags.source ?? config.paths.tasks_path;
    const sourcePath = path.join(resolved.gitRoot, source);
    const raw = await readFile(sourcePath, "utf8");
    const parsed = JSON.parse(raw) as { tasks?: TaskData[] };
    const tasks = Array.isArray(parsed.tasks) ? parsed.tasks : [];
    if (backend.writeTasks) {
      await backend.writeTasks(tasks);
    } else {
      for (const task of tasks) await backend.writeTask(task);
    }
    if (!flags.quiet) {
      process.stdout.write(
        `${successMessage("migrated tasks into backend", undefined, `count=${tasks.length}`)}\n`,
      );
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task migrate", root: opts.rootOverride ?? null });
  }
}
