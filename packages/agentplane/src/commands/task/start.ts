import { mapBackendError } from "../../cli/error-map.js";
import { successMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import type { TaskData } from "../../backends/task-backend.js";

import { ensureActionApproved } from "../shared/approval-requirements.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { ensurePrArtifactsSynced } from "../pr/internal/sync.js";
import { writeTaskBlueprintResolvedSnapshot } from "../blueprint/snapshot-artifact.js";

import {
  applyTaskStatusTransitionCommand,
  assertVerifyStepsFilled,
  ensurePlanApprovedIfRequired,
  ensureLifecycleCommentCommitLocation,
  extractTaskObservationSection,
  defaultCommitEmojiForStatus,
  extractDocSection,
  normalizeTaskDocVersion,
  nowIso,
  prepareTaskTransitionComment,
  requiresVerifyStepsByPrimary,
  requireStructuredComment,
  runOptionalTaskTransitionCommentCommit,
  taskObservationSectionName,
  type TaskTransitionCommentCommandOptions,
  toStringArray,
} from "./shared.js";

function assertStartDocRequirements(task: TaskData, config: CommandContext["config"]): void {
  if (config.agents?.approvals?.require_plan === true) return;

  const enforce = config.tasks.verify.enforce_on_start_when_no_plan !== false;
  if (!enforce) return;

  const tags = toStringArray(task.tags);
  const spikeTag = (config.tasks.verify.spike_tag ?? "spike").trim().toLowerCase();
  const verifyRequired = requiresVerifyStepsByPrimary(tags, config);
  const isSpike = tags.some((tag) => tag.trim().toLowerCase() === spikeTag);
  const doc = typeof task.doc === "string" ? task.doc : "";

  if (verifyRequired || isSpike) {
    assertVerifyStepsFilled({
      taskId: task.id,
      sectionText: extractDocSection(doc, "Verify Steps"),
      action: "start work",
      guidance: "fill it before starting work when plan approval is disabled",
    });
  }

  if (!isSpike) return;

  const docVersion = normalizeTaskDocVersion(task.doc_version);
  const observationSection = taskObservationSectionName(docVersion);
  const observation = extractTaskObservationSection(doc, docVersion);
  if (!observation || observation.trim().length === 0) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message:
        `${task.id}: cannot start spike: ## ${observationSection} section is missing or empty ` +
        "(include Findings/Decision/Next Steps)",
    });
  }
}

export async function cmdStart(opts: TaskTransitionCommentCommandOptions): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));

    if (opts.force) {
      await ensureActionApproved({
        action: "force_action",
        config: ctx.config,
        yes: opts.yes === true,
        reason: "start --force",
      });
    }

    const { prefix, min_chars: minChars } = ctx.config.tasks.comments.start;
    requireStructuredComment(opts.body, prefix, minChars);
    await ensureLifecycleCommentCommitLocation({
      enabled: opts.commitFromComment,
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      command: "task start-ready",
      taskId: opts.taskId,
    });
    const preparedComment = prepareTaskTransitionComment({
      body: opts.body,
      enabled: opts.commitFromComment,
      config: ctx.config,
    });
    const commentBody = preparedComment.commentBody ?? opts.body;

    const at = nowIso();
    const transition = await applyTaskStatusTransitionCommand({
      ctx,
      taskId: opts.taskId,
      quiet: opts.quiet,
      policyAction: "task_start",
      phase: "implement",
      build: (current) => {
        assertStartDocRequirements(current, ctx.config);
        ensurePlanApprovedIfRequired(current, ctx.config);
        return {
          at,
          toStatus: "DOING",
          eventAuthor: opts.author,
          updatedBy: opts.author,
          note: commentBody,
          comment: { author: opts.author, body: commentBody },
          force: opts.force,
          dependencyPolicy: { kind: "require-ready" },
          commentCommitPolicy: {
            enabled: opts.commitFromComment,
            action: "start",
            confirmed: opts.confirmStatusCommit,
            quiet: opts.quiet,
          },
        };
      },
    });

    await writeTaskBlueprintResolvedSnapshot({
      ctx,
      task: transition.execution.nextTask,
    });

    const commitInfo = await runOptionalTaskTransitionCommentCommit({
      enabled: opts.commitFromComment,
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      primaryTag: transition.primaryTag,
      author: opts.author,
      statusFrom: transition.execution.currentStatus,
      statusTo: "DOING",
      commentBody: opts.body,
      formattedComment: preparedComment.formattedComment,
      emoji: opts.commitEmoji ?? defaultCommitEmojiForStatus("DOING"),
      allow: opts.commitAllow,
      autoAllow: opts.commitAutoAllow || opts.commitAllow.length === 0,
      allowTasks: opts.commitAllowTasks,
      requireClean: opts.commitRequireClean,
      quiet: opts.quiet,
      progressMessage: "task marked DOING; creating commit from start comment",
      resolveExecutorAgent: true,
    });

    if (ctx.config.workflow_mode === "branch_pr") {
      await ensurePrArtifactsSynced({
        ctx,
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: opts.taskId,
        author: opts.author,
      });
    }

    if (!opts.quiet) {
      const suffix = commitInfo ? ` (commit=${commitInfo.hash.slice(0, 12)})` : "";
      process.stdout.write(`${successMessage("started", `${opts.taskId}${suffix}`)}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "start", root: opts.rootOverride ?? null });
  }
}
