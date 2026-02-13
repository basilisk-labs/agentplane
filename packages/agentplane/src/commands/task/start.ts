import { type TaskData } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import { invalidValueMessage, successMessage, warnMessage } from "../../cli/output.js";
import { formatCommentBodyForCommit } from "../../shared/comment-format.js";
import { CliError } from "../../shared/errors.js";

import { commitFromComment } from "../guard/index.js";
import { ensureActionApproved } from "../shared/approval-requirements.js";
import {
  loadCommandContext,
  loadTaskFromContext,
  type CommandContext,
} from "../shared/task-backend.js";
import { backendIsLocalFileBackend, getTaskStore } from "../shared/task-store.js";

import { readDirectWorkLock } from "../../shared/direct-work-lock.js";

import {
  appendTaskEvent,
  ensurePlanApprovedIfRequired,
  ensureCommentCommitAllowed,
  ensureStatusTransitionAllowed,
  defaultCommitEmojiForAgentId,
  extractDocSection,
  isVerifyStepsFilled,
  nowIso,
  requiresVerifyStepsByPrimary,
  requireStructuredComment,
  resolveTaskDependencyState,
  resolvePrimaryTag,
  toStringArray,
} from "./shared.js";

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

    const useStore = backendIsLocalFileBackend(ctx);
    const store = useStore ? getTaskStore(ctx) : null;
    const task = useStore
      ? await store!.get(opts.taskId)
      : await loadTaskFromContext({ ctx, taskId: opts.taskId });

    if (ctx.config.agents?.approvals?.require_plan !== true) {
      const enforce = ctx.config.tasks.verify.enforce_on_start_when_no_plan !== false;
      if (enforce) {
        const tags = toStringArray(task.tags);
        const spikeTag = (ctx.config.tasks.verify.spike_tag ?? "spike").trim().toLowerCase();
        const verifyRequired = requiresVerifyStepsByPrimary(tags, ctx.config);
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

        if (isSpike) {
          const notes = extractDocSection(doc, "Notes");
          if (!notes || notes.trim().length === 0) {
            throw new CliError({
              exitCode: 3,
              code: "E_VALIDATION",
              message:
                `${task.id}: cannot start spike: ## Notes section is missing or empty ` +
                "(include Findings/Decision/Next Steps)",
            });
          }
        }
      }
    }

    ensurePlanApprovedIfRequired(task, ctx.config);

    const currentStatus = String(task.status || "TODO").toUpperCase();
    ensureStatusTransitionAllowed({
      currentStatus,
      nextStatus: "DOING",
      force: opts.force,
    });
    ensureCommentCommitAllowed({
      enabled: opts.commitFromComment,
      config: ctx.config,
      action: "start",
      confirmed: opts.confirmStatusCommit,
      quiet: opts.quiet,
      statusFrom: currentStatus,
      statusTo: "DOING",
    });

    if (!opts.force) {
      const dep = await resolveTaskDependencyState(task, ctx.taskBackend);
      if (dep.missing.length > 0 || dep.incomplete.length > 0) {
        if (!opts.quiet) {
          if (dep.missing.length > 0) {
            process.stderr.write(`${warnMessage(`missing deps: ${dep.missing.join(", ")}`)}\n`);
          }
          if (dep.incomplete.length > 0) {
            process.stderr.write(
              `${warnMessage(`incomplete deps: ${dep.incomplete.join(", ")}`)}\n`,
            );
          }
        }
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `Task is not ready: ${task.id} (use --force to override)`,
        });
      }
    }

    const formattedComment = opts.commitFromComment
      ? formatCommentBodyForCommit(opts.body, ctx.config)
      : null;
    const commentBody = formattedComment ?? opts.body;

    const existingComments = Array.isArray(task.comments)
      ? task.comments.filter(
          (item): item is { author: string; body: string } =>
            !!item && typeof item.author === "string" && typeof item.body === "string",
        )
      : [];
    const commentsValue: { author: string; body: string }[] = [
      ...existingComments,
      { author: opts.author, body: commentBody },
    ];

    const at = nowIso();
    const nextTask: TaskData = {
      ...task,
      status: "DOING",
      comments: commentsValue,
      events: appendTaskEvent(task, {
        type: "status",
        at,
        author: opts.author,
        from: currentStatus,
        to: "DOING",
        note: commentBody,
      }),
      doc_version: 2,
      doc_updated_at: at,
      doc_updated_by: opts.author,
    };
    await (useStore
      ? store!.update(opts.taskId, () => nextTask)
      : ctx.taskBackend.writeTask(nextTask));

    let commitInfo: { hash: string; message: string } | null = null;
    if (opts.commitFromComment) {
      const mode = ctx.config.workflow_mode;
      let executorAgent = opts.author;
      if (mode === "direct") {
        const lock = await readDirectWorkLock(ctx.resolvedProject.agentplaneDir);
        const lockAgent = lock?.task_id === opts.taskId ? (lock.agent?.trim() ?? "") : "";
        if (lockAgent) executorAgent = lockAgent;
      }

      const expectedEmoji = await defaultCommitEmojiForAgentId(ctx, executorAgent);
      if (typeof opts.commitEmoji === "string" && opts.commitEmoji.trim() !== expectedEmoji) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: invalidValueMessage(
            "--commit-emoji",
            opts.commitEmoji,
            `${expectedEmoji} (executor agent=${executorAgent})`,
          ),
        });
      }

      commitInfo = await commitFromComment({
        ctx,
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: opts.taskId,
        primaryTag: resolvePrimaryTag(toStringArray(task.tags), ctx).primary,
        executorAgent,
        author: opts.author,
        statusFrom: currentStatus,
        statusTo: "DOING",
        commentBody: opts.body,
        formattedComment,
        emoji: opts.commitEmoji ?? expectedEmoji,
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
