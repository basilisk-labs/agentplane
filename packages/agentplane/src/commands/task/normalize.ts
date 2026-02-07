import { mapBackendError } from "../../cli/error-map.js";
import { successMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";

type TaskNormalizeFlags = { quiet: boolean; force: boolean };

function parseTaskNormalizeFlags(args: string[]): TaskNormalizeFlags {
  const out: TaskNormalizeFlags = { quiet: false, force: false };
  for (const arg of args) {
    if (!arg) continue;
    if (arg === "--quiet") out.quiet = true;
    else if (arg === "--force") out.force = true;
    else if (arg.startsWith("--")) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unknown flag: ${arg}` });
    }
  }
  return out;
}

export async function cmdTaskNormalize(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseTaskNormalizeFlags(opts.args);
  if (flags.force) {
    // Force is accepted for parity; no additional checks in node CLI.
  }
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const tasks = await ctx.taskBackend.listTasks();
    if (ctx.taskBackend.writeTasks) {
      await ctx.taskBackend.writeTasks(tasks);
    } else {
      for (const task of tasks) await ctx.taskBackend.writeTask(task);
    }
    if (!flags.quiet) {
      process.stdout.write(
        `${successMessage("normalized tasks", undefined, `count=${tasks.length}`)}\n`,
      );
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task normalize", root: opts.rootOverride ?? null });
  }
}
