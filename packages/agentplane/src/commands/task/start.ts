import { mapBackendError } from "../../cli/error-map.js";
import { infoMessage, successMessage } from "../../cli/output.js";
import { formatCommentBodyForCommit } from "../../shared/comment-format.js";
import { CliError } from "../../shared/errors.js";
import type { TaskData } from "../../backends/task-backend.js";

import { commitFromComment } from "../guard/index.js";
import { ensureActionApproved } from "../shared/approval-requirements.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { applyTaskMutation } from "../shared/task-mutation.js";

import { readDirectWorkLock } from "../../shared/direct-work-lock.js";

import {
  emitTransitionWarnings,
  ensurePlanApprovedIfRequired,
  executeTaskStatusTransitionRequest,
  extractTaskObservationSection,
  defaultCommitEmojiForStatus,
  extractDocSection,
  isVerifyStepsFilled,
  normalizeTaskDocVersion,
  nowIso,
  readDeferredTaskTransitionWarnings,
  requiresVerifyStepsByPrimary,
  requireStructuredComment,
  resolvePrimaryTag,
  taskObservationSectionName,
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
    const verifySteps = extractDocSection(doc, "Verify Steps");
    if (!isVerifyStepsFilled(verifySteps)) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message:
          `${task.id}: cannot start work: ## Verify Steps section is missing/empty/unfilled ` +
          "(fill it before starting work when plan approval is disabled)",
      });
    }
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

export async function cmdStart(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author: string;
  body: string;
  commitFromComment: boolean;
  commitEmoji?: string;
  commitAllow: string[];
  commitAutoAllow: boolean;
  commitAllowTasks: boolean;
  commitRequireClean: boolean;
  confirmStatusCommit: boolean;
  force: boolean;
  yes?: boolean;
  quiet: boolean;
}): Promise<number> {
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

    const formattedComment = opts.commitFromComment
      ? formatCommentBodyForCommit(opts.body, ctx.config)
      : null;
    const commentBody = formattedComment ?? opts.body;

    const at = nowIso();
    let currentStatusForCommit = "TODO";
    let primaryTagForCommit = "meta";
    let deferredWarnings: string[] = [];
    try {
      await applyTaskMutation({
        ctx,
        taskId: opts.taskId,
        build: async (current) => {
          assertStartDocRequirements(current, ctx.config);
          ensurePlanApprovedIfRequired(current, ctx.config);
          const execution = await executeTaskStatusTransitionRequest({
            task: current,
            backend: ctx.taskBackend,
            config: ctx.config,
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
          });
          currentStatusForCommit = execution.currentStatus;
          primaryTagForCommit = resolvePrimaryTag(toStringArray(current.tags), ctx).primary;
          deferredWarnings = execution.deferredWarnings;
          return { intents: execution.intents };
        },
      });
    } catch (err) {
      emitTransitionWarnings(
        readDeferredTaskTransitionWarnings(err).length > 0
          ? readDeferredTaskTransitionWarnings(err)
          : deferredWarnings,
        opts.quiet,
      );
      throw err;
    }

    emitTransitionWarnings(deferredWarnings, opts.quiet);

    let commitInfo: { hash: string; message: string } | null = null;
    if (opts.commitFromComment) {
      if (!opts.quiet) {
        process.stdout.write(
          `${infoMessage("task marked DOING; creating commit from start comment")}\n`,
        );
      }
      const mode = ctx.config.workflow_mode;
      let executorAgent = opts.author;
      if (mode === "direct") {
        const lock = await readDirectWorkLock(ctx.resolvedProject.agentplaneDir);
        const lockAgent = lock?.task_id === opts.taskId ? (lock.agent?.trim() ?? "") : "";
        if (lockAgent) executorAgent = lockAgent;
      }

      commitInfo = await commitFromComment({
        ctx,
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: opts.taskId,
        primaryTag: primaryTagForCommit,
        executorAgent,
        author: opts.author,
        statusFrom: currentStatusForCommit,
        statusTo: "DOING",
        commentBody: opts.body,
        formattedComment,
        emoji: opts.commitEmoji ?? defaultCommitEmojiForStatus("DOING"),
        allow: opts.commitAllow,
        autoAllow: opts.commitAutoAllow || opts.commitAllow.length === 0,
        allowTasks: opts.commitAllowTasks,
        requireClean: opts.commitRequireClean,
        quiet: opts.quiet,
        config: ctx.config,
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
