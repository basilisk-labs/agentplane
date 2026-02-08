import { type TaskData } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import { infoMessage, successMessage } from "../../cli/output.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";

export const TASK_SCRUB_USAGE =
  "Usage: agentplane task scrub --find <text> --replace <text> [flags]";
export const TASK_SCRUB_USAGE_EXAMPLE =
  'agentplane task scrub --find "agentctl" --replace "agentplane" --dry-run';

function scrubValue(value: unknown, find: string, replace: string): unknown {
  if (typeof value === "string") return value.replaceAll(find, replace);
  if (Array.isArray(value)) return value.map((item) => scrubValue(item, find, replace));
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    const out: Record<string, unknown> = {};
    for (const [key, val] of entries) {
      out[key] = scrubValue(val, find, replace);
    }
    return out;
  }
  return value;
}

export async function cmdTaskScrub(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  find: string;
  replace: string;
  dryRun: boolean;
  quiet: boolean;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const tasks = await ctx.taskBackend.listTasks();
    const updated: TaskData[] = [];
    const changedIds = new Set<string>();
    for (const task of tasks) {
      const before = JSON.stringify(task);
      const scrubbed = scrubValue(task, opts.find, opts.replace);
      if (scrubbed && typeof scrubbed === "object") {
        const next = scrubbed as TaskData;
        updated.push(next);
        const after = JSON.stringify(next);
        if (before !== after) changedIds.add(next.id);
      } else {
        updated.push(task);
      }
    }
    if (opts.dryRun) {
      if (!opts.quiet) {
        process.stdout.write(
          `${infoMessage(`dry-run: would update ${changedIds.size} task(s)`)}` + "\n",
        );
        for (const id of [...changedIds].toSorted()) {
          process.stdout.write(`${id}\n`);
        }
      }
      return 0;
    }
    if (ctx.taskBackend.writeTasks) {
      await ctx.taskBackend.writeTasks(updated);
    } else {
      for (const task of updated) {
        await ctx.taskBackend.writeTask(task);
      }
    }
    if (!opts.quiet) {
      process.stdout.write(
        `${successMessage("updated tasks", undefined, `count=${changedIds.size}`)}` + "\n",
      );
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task scrub", root: opts.rootOverride ?? null });
  }
}
