import { type TaskData } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import { backendNotSupportedMessage, warnMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import {
  nowIso,
  requiresVerifyStepsByPrimary,
  resolvePrimaryTag,
  warnIfUnknownOwner,
} from "./shared.js";

export type TaskNewParsed = {
  title: string;
  description: string;
  owner: string;
  priority: "low" | "normal" | "med" | "high";
  tags: string[];
  dependsOn: string[];
  verify: string[];
};

function buildDefaultVerifyStepsDoc(opts: { primary: string; verifyCommands: string[] }): string {
  const checks =
    opts.verifyCommands.length > 0
      ? opts.verifyCommands.map((command) => `- \`${command}\``).join("\n")
      : "- Add explicit checks/commands for this task before approval.";
  return [
    "## Verify Steps",
    "",
    "### Scope",
    `- Primary tag: \`${opts.primary}\``,
    "",
    "### Checks",
    checks,
    "",
    "### Evidence / Commands",
    "- Record executed commands and key outputs.",
    "",
    "### Pass criteria",
    "- Steps are reproducible and produce expected results.",
    "",
  ].join("\n");
}

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

    const spikeTag = (ctx.config.tasks.verify.spike_tag ?? "spike").trim().toLowerCase();
    const primary = resolvePrimaryTag(p.tags, ctx);
    if (primary.usedFallback) {
      process.stderr.write(
        `${warnMessage(
          `primary tag not found in task tags; using fallback primary=${primary.primary}`,
        )}\n`,
      );
    }
    const requiresVerifySteps = requiresVerifyStepsByPrimary(p.tags, ctx.config);
    await warnIfUnknownOwner(ctx, p.owner);
    if (requiresVerifySteps) {
      task.doc = buildDefaultVerifyStepsDoc({
        primary: primary.primary,
        verifyCommands: p.verify,
      });
      process.stderr.write(
        `${warnMessage(
          "task requires Verify Steps by primary tag; seeded a default ## Verify Steps section in README (review and refine before approval/start)",
        )}\n`,
      );
    }
    const hasSpike = p.tags.some((tag) => tag.trim().toLowerCase() === spikeTag);
    const hasImplementationTags = requiresVerifyStepsByPrimary(p.tags, ctx.config);
    if (hasSpike && hasImplementationTags) {
      process.stderr.write(
        `${warnMessage(
          "spike is combined with a primary tag that requires verify steps; consider splitting spike vs implementation tasks",
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
