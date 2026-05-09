import { mapBackendError } from "../../cli/error-map.js";
import { createCliEmitter, emitCommandResult } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";

import { ensureActionApproved } from "../shared/approval-requirements.js";
import { loadCommandContext } from "../shared/task-backend.js";

import {
  applyTaskStatusTransitionCommand,
  defaultCommitEmojiForStatus,
  nowIso,
  prepareTaskTransitionComment,
  requireStructuredComment,
  runOptionalTaskTransitionCommentCommit,
  type TaskTransitionCommentCommandOptions,
} from "./shared.js";

const output = createCliEmitter();

export async function cmdBlock(opts: TaskTransitionCommentCommandOptions): Promise<number> {
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
      policyAction: "task_block",
      build: () => ({
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
      }),
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
      statusTo: "BLOCKED",
      commentBody: opts.body,
      formattedComment: preparedComment.formattedComment,
      emoji: opts.commitEmoji ?? defaultCommitEmojiForStatus("BLOCKED"),
      allow: opts.commitAllow,
      autoAllow: opts.commitAutoAllow || opts.commitAllow.length === 0,
      allowTasks: opts.commitAllowTasks,
      requireClean: opts.commitRequireClean,
      quiet: opts.quiet,
      resolveExecutorAgent: true,
    });

    if (!opts.quiet) {
      const suffix = commitInfo ? ` (commit=${commitInfo.hash.slice(0, 12)})` : "";
      emitCommandResult(output, {
        kind: "success",
        action: "blocked",
        target: `${opts.taskId}${suffix}`,
      });
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "block", root: opts.rootOverride ?? null });
  }
}
