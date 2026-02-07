import { type TaskData } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import {
  backendNotSupportedMessage,
  missingValueMessage,
  usageMessage,
  warnMessage,
} from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { normalizeDependsOnInput, nowIso, requiresVerify } from "./shared.js";

type TaskNewFlags = {
  title?: string;
  description?: string;
  owner?: string;
  priority?: "low" | "normal" | "med" | "high";
  tags: string[];
  dependsOn: string[];
  verify: string[];
};

export const TASK_NEW_USAGE =
  "Usage: agentplane task new --title <text> --description <text> --priority <low|normal|med|high> --owner <id> --tag <tag> [--tag <tag>...]";
export const TASK_NEW_USAGE_EXAMPLE =
  'agentplane task new --title "Refactor CLI" --description "Improve CLI output" --priority med --owner CODER --tag cli';

function parseTaskNewFlags(args: string[]): TaskNewFlags {
  const out: TaskNewFlags = { tags: [], dependsOn: [], verify: [] };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (!arg.startsWith("--")) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Unexpected argument: ${arg}`,
      });
    }

    const next = args[i + 1];
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
      case "--owner": {
        out.owner = next;
        break;
      }
      case "--priority": {
        out.priority = next as TaskNewFlags["priority"];
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
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unknown flag: ${arg}` });
      }
    }

    i++;
  }

  return out;
}

export async function cmdTaskNew(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseTaskNewFlags(opts.args);
  const priority = flags.priority ?? "med";

  if (!flags.title || !flags.description || !flags.owner || flags.tags.length === 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_NEW_USAGE, TASK_NEW_USAGE_EXAMPLE),
    });
  }

  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const suffixLength = ctx.config.tasks.id_suffix_length_default;
    if (!ctx.taskBackend.generateTaskId) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: backendNotSupportedMessage("generateTaskId()"),
      });
    }
    const taskId = await ctx.taskBackend.generateTaskId({ length: suffixLength, attempts: 1000 });
    const task: TaskData = {
      id: taskId,
      title: flags.title,
      description: flags.description,
      status: "TODO",
      priority,
      owner: flags.owner,
      tags: flags.tags,
      depends_on: flags.dependsOn,
      verify: flags.verify,
      comments: [],
      doc_version: 2,
      doc_updated_at: nowIso(),
      doc_updated_by: flags.owner,
      id_source: "generated",
    };

    if (requiresVerify(flags.tags, ctx.config.tasks.verify.required_tags)) {
      process.stderr.write(
        `${warnMessage(
          `task requires ## Verify Steps in README; run \`agentplane task scaffold ${taskId}\` and fill it before approving the plan`,
        )}\n`,
      );
    }
    const hasSpike = flags.tags.some((tag) => tag.trim().toLowerCase() === "spike");
    const hasImplementationTags = requiresVerify(flags.tags, ctx.config.tasks.verify.required_tags);
    if (hasSpike && hasImplementationTags) {
      process.stderr.write(
        `${warnMessage(
          "spike is combined with code/backend/frontend tags; consider splitting spike vs implementation tasks",
        )}\n`,
      );
    }

    await ctx.taskBackend.writeTask(task);
    process.stdout.write(`${taskId}\n`);
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task new", root: opts.rootOverride ?? null });
  }
}
