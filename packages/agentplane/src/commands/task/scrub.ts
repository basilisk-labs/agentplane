import { type TaskData } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import {
  infoMessage,
  missingValueMessage,
  successMessage,
  usageMessage,
} from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";

export const TASK_SCRUB_USAGE =
  "Usage: agentplane task scrub --find <text> --replace <text> [flags]";
export const TASK_SCRUB_USAGE_EXAMPLE =
  'agentplane task scrub --find "agentctl" --replace "agentplane" --dry-run';

type TaskScrubFlags = {
  find: string;
  replace: string;
  dryRun: boolean;
  quiet: boolean;
};

function parseTaskScrubFlags(args: string[]): TaskScrubFlags {
  const out: TaskScrubFlags = {
    find: "",
    replace: "",
    dryRun: false,
    quiet: false,
  };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (arg === "--dry-run") {
      out.dryRun = true;
      continue;
    }
    if (arg === "--quiet") {
      out.quiet = true;
      continue;
    }
    if (!arg.startsWith("--")) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(TASK_SCRUB_USAGE, TASK_SCRUB_USAGE_EXAMPLE),
      });
    }
    const next = args[i + 1];
    if (!next) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: missingValueMessage(arg) });
    }
    if (arg === "--find") {
      out.find = next;
    } else if (arg === "--replace") {
      out.replace = next;
    } else {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unknown flag: ${arg}` });
    }
    i++;
  }
  return out;
}

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
  args: string[];
}): Promise<number> {
  const flags = parseTaskScrubFlags(opts.args);
  if (!flags.find) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_SCRUB_USAGE, TASK_SCRUB_USAGE_EXAMPLE),
    });
  }
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const tasks = await ctx.taskBackend.listTasks();
    const updated: TaskData[] = [];
    const changedIds = new Set<string>();
    for (const task of tasks) {
      const before = JSON.stringify(task);
      const scrubbed = scrubValue(task, flags.find, flags.replace);
      if (scrubbed && typeof scrubbed === "object") {
        const next = scrubbed as TaskData;
        updated.push(next);
        const after = JSON.stringify(next);
        if (before !== after) changedIds.add(next.id);
      } else {
        updated.push(task);
      }
    }
    if (flags.dryRun) {
      if (!flags.quiet) {
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
    if (!flags.quiet) {
      process.stdout.write(
        `${successMessage("updated tasks", undefined, `count=${changedIds.size}`)}` + "\n",
      );
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task scrub", root: opts.rootOverride ?? null });
  }
}
