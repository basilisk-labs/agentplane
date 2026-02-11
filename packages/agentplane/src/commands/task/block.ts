import { type TaskData } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import { invalidValueMessage, successMessage } from "../../cli/output.js";
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
  defaultCommitEmojiForAgentId,
  enforceStatusCommitPolicy,
  isTransitionAllowed,
  nowIso,
  requireStructuredComment,
} from "./shared.js";

export async function cmdBlock(opts: {
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
        reason: "block --force",
      });
    }

    if (opts.commitFromComment) {
      enforceStatusCommitPolicy({
        policy: ctx.config.status_commit_policy,
        action: "block",
        confirmed: opts.confirmStatusCommit,
        quiet: opts.quiet,
      });
    }

    const { prefix, min_chars: minChars } = ctx.config.tasks.comments.blocked;
    requireStructuredComment(opts.body, prefix, minChars);

    const useStore = backendIsLocalFileBackend(ctx);
    const store = useStore ? getTaskStore(ctx) : null;
    const task = useStore
      ? await store!.get(opts.taskId)
      : await loadTaskFromContext({ ctx, taskId: opts.taskId });

    const currentStatus = String(task.status || "TODO").toUpperCase();
    if (!opts.force && !isTransitionAllowed(currentStatus, "BLOCKED")) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Refusing status transition ${currentStatus} -> BLOCKED (use --force to override)`,
      });
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
    const commentsValue = [...existingComments, { author: opts.author, body: commentBody }];
    const at = nowIso();
    const nextTask: TaskData = {
      ...task,
      status: "BLOCKED",
      comments: commentsValue,
      events: appendTaskEvent(task, {
        type: "status",
        at,
        author: opts.author,
        from: currentStatus,
        to: "BLOCKED",
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
        executorAgent,
        author: opts.author,
        statusFrom: currentStatus,
        statusTo: "BLOCKED",
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
      process.stdout.write(`${successMessage("blocked", `${opts.taskId}${suffix}`)}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "block", root: opts.rootOverride ?? null });
  }
}
