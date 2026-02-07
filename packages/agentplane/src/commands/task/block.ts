import { type TaskData } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import { successMessage } from "../../cli/output.js";
import { formatCommentBodyForCommit } from "../../shared/comment-format.js";
import { CliError } from "../../shared/errors.js";

import { commitFromComment } from "../guard/index.js";
import {
  loadCommandContext,
  loadTaskFromContext,
  type CommandContext,
} from "../shared/task-backend.js";
import { backendIsLocalFileBackend, getTaskStore } from "../shared/task-store.js";

import {
  appendTaskEvent,
  defaultCommitEmojiForStatus,
  enforceStatusCommitPolicy,
  isTransitionAllowed,
  nowIso,
  requireStructuredComment,
} from "./shared.js";

export const BLOCK_USAGE = "Usage: agentplane block <task-id> --author <id> --body <text> [flags]";
export const BLOCK_USAGE_EXAMPLE =
  'agentplane block 202602030608-F1Q8AB --author CODER --body "Blocked: ..."';

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
  quiet: boolean;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));

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
      commitInfo = await commitFromComment({
        ctx,
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: opts.taskId,
        author: opts.author,
        statusFrom: currentStatus,
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
