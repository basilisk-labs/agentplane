import { type TaskData } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import {
  missingValueMessage,
  successMessage,
  unknownEntityMessage,
  usageMessage,
  warnMessage,
} from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { dedupeStrings, normalizeDependsOnInput, requiresVerify, toStringArray } from "./shared.js";

export const TASK_UPDATE_USAGE = "Usage: agentplane task update <task-id> [flags]";
export const TASK_UPDATE_USAGE_EXAMPLE =
  'agentplane task update 202602030608-F1Q8AB --title "..." --owner CODER';

type TaskUpdateFlags = {
  taskId: string;
  title?: string;
  description?: string;
  priority?: string;
  owner?: string;
  tags: string[];
  replaceTags: boolean;
  dependsOn: string[];
  replaceDependsOn: boolean;
  verify: string[];
  replaceVerify: boolean;
};

function parseTaskUpdateFlags(args: string[]): TaskUpdateFlags {
  const [taskId, ...rest] = args;
  if (!taskId) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_UPDATE_USAGE, TASK_UPDATE_USAGE_EXAMPLE),
    });
  }
  const out: TaskUpdateFlags = {
    taskId,
    tags: [],
    replaceTags: false,
    dependsOn: [],
    replaceDependsOn: false,
    verify: [],
    replaceVerify: false,
  };

  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i];
    if (!arg) continue;
    if (arg === "--replace-tags") {
      out.replaceTags = true;
      continue;
    }
    if (arg === "--replace-depends-on") {
      out.replaceDependsOn = true;
      continue;
    }
    if (arg === "--replace-verify") {
      out.replaceVerify = true;
      continue;
    }
    if (!arg.startsWith("--")) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(TASK_UPDATE_USAGE, TASK_UPDATE_USAGE_EXAMPLE),
      });
    }
    const next = rest[i + 1];
    if (!next) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: missingValueMessage(arg) });
    }
    switch (arg) {
      case "--title": {
        out.title = next;
        break;
      }
      case "--description": {
        out.description = next;
        break;
      }
      case "--priority": {
        out.priority = next;
        break;
      }
      case "--owner": {
        out.owner = next;
        break;
      }
      case "--tag": {
        out.tags.push(next);
        break;
      }
      case "--depends-on": {
        out.dependsOn.push(...normalizeDependsOnInput(next));
        break;
      }
      case "--verify": {
        out.verify.push(next);
        break;
      }
      default: {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `Unknown flag: ${arg}`,
        });
      }
    }
    i++;
  }
  return out;
}

export async function cmdTaskUpdate(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseTaskUpdateFlags(opts.args);
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const task = await ctx.taskBackend.getTask(flags.taskId);
    if (!task) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: unknownEntityMessage("task id", flags.taskId),
      });
    }
    const next: TaskData = { ...task };
    if (flags.title !== undefined) next.title = flags.title;
    if (flags.description !== undefined) next.description = flags.description;
    if (flags.priority !== undefined) next.priority = flags.priority;
    if (flags.owner !== undefined) next.owner = flags.owner;

    const existingTags = flags.replaceTags ? [] : dedupeStrings(toStringArray(next.tags));
    const mergedTags = dedupeStrings([...existingTags, ...flags.tags]);
    next.tags = mergedTags;

    const spikeTag = (ctx.config.tasks.verify.spike_tag ?? "spike").trim().toLowerCase();
    const hasSpike = mergedTags.some((tag) => tag.trim().toLowerCase() === spikeTag);
    const hasImplementationTags = requiresVerify(mergedTags, ctx.config.tasks.verify.required_tags);
    if (hasSpike && hasImplementationTags) {
      process.stderr.write(
        `${warnMessage(
          "spike is combined with code/backend/frontend tags; consider splitting spike vs implementation tasks",
        )}\n`,
      );
    }

    const existingDepends = flags.replaceDependsOn
      ? []
      : dedupeStrings(toStringArray(next.depends_on));
    const mergedDepends = dedupeStrings([...existingDepends, ...flags.dependsOn]);
    next.depends_on = mergedDepends;

    const existingVerify = flags.replaceVerify ? [] : dedupeStrings(toStringArray(next.verify));
    const mergedVerify = dedupeStrings([...existingVerify, ...flags.verify]);
    next.verify = mergedVerify;

    await ctx.taskBackend.writeTask(next);
    process.stdout.write(`${successMessage("updated", flags.taskId)}\n`);
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task update", root: opts.rootOverride ?? null });
  }
}
