import { mapBackendError } from "../../cli/error-map.js";
import { successMessage } from "../../cli/output.js";
import { formatCommentBodyForCommit } from "../../shared/comment-format.js";
import { CliError } from "../../shared/errors.js";

import { commitFromComment } from "../guard/index.js";
import { ensureActionApproved } from "../shared/approval-requirements.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { applyTaskMutation } from "../shared/task-mutation.js";

import { readDirectWorkLock } from "../../shared/direct-work-lock.js";

import {
  defaultCommitEmojiForStatus,
  emitTransitionWarnings,
  executeTaskStatusTransitionRequest,
  nowIso,
  readDeferredTaskTransitionWarnings,
  requireStructuredComment,
  resolvePrimaryTag,
  toStringArray,
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

    const { prefix, min_chars: minChars } = ctx.config.tasks.comments.blocked;
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
          const execution = await executeTaskStatusTransitionRequest({
            task: current,
            backend: ctx.taskBackend,
            config: ctx.config,
            at,
            toStatus: "BLOCKED",
            eventAuthor: opts.author,
            updatedBy: opts.author,
            note: commentBody,
            comment: { author: opts.author, body: commentBody },
            force: opts.force,
            dependencyPolicy: { kind: "none" },
            commentCommitPolicy: {
              enabled: opts.commitFromComment,
              action: "block",
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
        statusTo: "BLOCKED",
        commentBody: opts.body,
        formattedComment,
        emoji: opts.commitEmoji ?? defaultCommitEmojiForStatus("BLOCKED"),
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
