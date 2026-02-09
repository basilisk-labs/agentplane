import { type TaskData } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import { backendNotSupportedMessage, warnMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { nowIso, requiresVerify, warnIfUnknownOwner } from "./shared.js";

export type TaskNewParsed = {
  title: string;
  description: string;
  owner: string;
  priority: "low" | "normal" | "med" | "high";
  tags: string[];
  dependsOn: string[];
  verify: string[];
};

export async function runTaskNewParsed(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  parsed: TaskNewParsed;
}): Promise<number> {
  const p = opts.parsed;
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
      title: p.title,
      description: p.description,
      status: "TODO",
      priority: p.priority,
      owner: p.owner,
      tags: p.tags,
      depends_on: p.dependsOn,
      verify: p.verify,
      comments: [],
      doc_version: 2,
      doc_updated_at: nowIso(),
      doc_updated_by: p.owner,
      id_source: "generated",
    };

    const requireStepsTags =
      ctx.config.tasks.verify.require_steps_for_tags ?? ctx.config.tasks.verify.required_tags;
    const spikeTag = (ctx.config.tasks.verify.spike_tag ?? "spike").trim().toLowerCase();
    const requiresVerifySteps = requiresVerify(p.tags, requireStepsTags);
    await warnIfUnknownOwner(ctx, p.owner);
    if (requiresVerifySteps) {
      process.stderr.write(
        `${warnMessage(
          `task requires ## Verify Steps in README; run \`agentplane task scaffold ${taskId}\` and fill it before approving the plan`,
        )}\n`,
      );
    }
    const hasSpike = p.tags.some((tag) => tag.trim().toLowerCase() === spikeTag);
    const hasImplementationTags = requiresVerify(p.tags, ctx.config.tasks.verify.required_tags);
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
