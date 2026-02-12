import { type TaskData } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import { successMessage, unknownEntityMessage, warnMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import {
  dedupeStrings,
  requiresVerify,
  readTaskTagPolicy,
  resolvePrimaryTag,
  toStringArray,
  warnIfUnknownOwner,
} from "./shared.js";

export async function cmdTaskUpdate(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
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
  allowPrimaryChange?: boolean;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const task = await ctx.taskBackend.getTask(opts.taskId);
    if (!task) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: unknownEntityMessage("task id", opts.taskId),
      });
    }
    const next: TaskData = { ...task };
    if (opts.title !== undefined) next.title = opts.title;
    if (opts.description !== undefined) next.description = opts.description;
    if (opts.priority !== undefined) next.priority = opts.priority;
    if (opts.owner !== undefined) {
      next.owner = opts.owner;
      await warnIfUnknownOwner(ctx, opts.owner);
    }

    const currentPrimary = resolvePrimaryTag(toStringArray(next.tags), ctx).primary;
    const existingTags = opts.replaceTags ? [] : dedupeStrings(toStringArray(next.tags));
    const mergedTags = dedupeStrings([...existingTags, ...opts.tags]);
    const nextPrimary = resolvePrimaryTag(mergedTags, ctx).primary;
    const tagPolicy = readTaskTagPolicy(ctx);
    if (
      currentPrimary !== nextPrimary &&
      tagPolicy.lockPrimaryOnUpdate === true &&
      opts.allowPrimaryChange !== true
    ) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message:
          `Primary tag change is locked (${currentPrimary} -> ${nextPrimary}). ` +
          "Use --allow-primary-change to override explicitly.",
      });
    }
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

    const existingDepends = opts.replaceDependsOn
      ? []
      : dedupeStrings(toStringArray(next.depends_on));
    const mergedDepends = dedupeStrings([...existingDepends, ...opts.dependsOn]);
    next.depends_on = mergedDepends;

    const existingVerify = opts.replaceVerify ? [] : dedupeStrings(toStringArray(next.verify));
    const mergedVerify = dedupeStrings([...existingVerify, ...opts.verify]);
    next.verify = mergedVerify;

    await ctx.taskBackend.writeTask(next);
    process.stdout.write(`${successMessage("updated", opts.taskId)}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) {
      throw err;
    }
    throw mapBackendError(err, { command: "task update", root: opts.rootOverride ?? null });
  }
}
