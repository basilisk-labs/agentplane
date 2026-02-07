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

import {
  appendTaskEvent,
  defaultCommitEmojiForStatus,
  enforceStatusCommitPolicy,
  ensureVerificationSatisfiedIfRequired,
  nowIso,
  readCommitInfo,
  readHeadCommit,
  requireStructuredComment,
} from "./shared.js";

export const FINISH_USAGE =
  "Usage: agentplane finish <task-id> [<task-id>...] --author <id> --body <text> [flags]";
export const FINISH_USAGE_EXAMPLE =
  'agentplane finish 202602030608-F1Q8AB --author INTEGRATOR --body "Verified: ..."';

export async function cmdFinish(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskIds: string[];
  author: string;
  body: string;
  commit?: string;
  skipVerify: boolean;
  force: boolean;
  noRequireTaskIdInCommit: boolean;
  commitFromComment: boolean;
  commitEmoji?: string;
  commitAllow: string[];
  commitAutoAllow: boolean;
  commitAllowTasks: boolean;
  commitRequireClean: boolean;
  statusCommit: boolean;
  statusCommitEmoji?: string;
  statusCommitAllow: string[];
  statusCommitAutoAllow: boolean;
  statusCommitRequireClean: boolean;
  confirmStatusCommit: boolean;
  quiet: boolean;
}): Promise<number> {
  try {
    if (opts.noRequireTaskIdInCommit) {
      // Parity flag (commit subject checks are not enforced in node CLI).
    }
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const { prefix, min_chars: minChars } = ctx.config.tasks.comments.verified;
    requireStructuredComment(opts.body, prefix, minChars);
    if (opts.commitFromComment || opts.statusCommit) {
      enforceStatusCommitPolicy({
        policy: ctx.config.status_commit_policy,
        action: "finish",
        confirmed: opts.confirmStatusCommit,
        quiet: opts.quiet,
      });
    }
    if ((opts.commitFromComment || opts.statusCommit) && opts.taskIds.length !== 1) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--commit-from-comment/--status-commit requires exactly one task id",
      });
    }
    const primaryTaskId = opts.taskIds[0] ?? "";
    if ((opts.commitFromComment || opts.statusCommit) && !primaryTaskId) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--commit-from-comment/--status-commit requires exactly one task id",
      });
    }

    const gitRoot = ctx.resolvedProject.gitRoot;
    const commitInfo = opts.commit
      ? await readCommitInfo(gitRoot, opts.commit)
      : await readHeadCommit(gitRoot);

    let primaryStatusFrom: string | null = null;
    for (const taskId of opts.taskIds) {
      const task = await loadTaskFromContext({ ctx, taskId });

      if (!opts.force) {
        const currentStatus = String(task.status || "TODO").toUpperCase();
        if (currentStatus === "DONE") {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: `Task is already DONE: ${task.id} (use --force to override)`,
          });
        }
      }

      if (
        taskId === primaryTaskId &&
        (opts.commitFromComment || opts.statusCommit) &&
        primaryStatusFrom === null
      ) {
        primaryStatusFrom = String(task.status || "TODO").toUpperCase();
      }

      ensureVerificationSatisfiedIfRequired(task, ctx.config);

      const existingComments = Array.isArray(task.comments)
        ? task.comments.filter(
            (item): item is { author: string; body: string } =>
              !!item && typeof item.author === "string" && typeof item.body === "string",
          )
        : [];
      const commentsValue = [...existingComments, { author: opts.author, body: opts.body }];
      const at = nowIso();
      const nextTask: TaskData = {
        ...task,
        status: "DONE",
        commit: { hash: commitInfo.hash, message: commitInfo.message },
        comments: commentsValue,
        events: appendTaskEvent(task, {
          type: "status",
          at,
          author: opts.author,
          from: String(task.status || "TODO").toUpperCase(),
          to: "DONE",
          note: opts.body,
        }),
        doc_version: 2,
        doc_updated_at: at,
        doc_updated_by: opts.author,
      };
      await ctx.taskBackend.writeTask(nextTask);
    }

    if (!opts.skipVerify) {
      // No-op for parity; verify is handled by `agentplane verify`.
    }

    // tasks.json is export-only; generated via `agentplane task export`.

    if (opts.commitFromComment) {
      await commitFromComment({
        ctx,
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: primaryTaskId,
        author: opts.author,
        statusFrom: primaryStatusFrom ?? undefined,
        statusTo: "DONE",
        commentBody: opts.body,
        formattedComment: formatCommentBodyForCommit(opts.body, ctx.config),
        emoji: opts.commitEmoji ?? defaultCommitEmojiForStatus("DONE"),
        allow: opts.commitAllow,
        autoAllow: opts.commitAutoAllow || opts.commitAllow.length === 0,
        allowTasks: opts.commitAllowTasks,
        requireClean: opts.commitRequireClean,
        quiet: opts.quiet,
        config: ctx.config,
      });
    }

    if (opts.statusCommit) {
      await commitFromComment({
        ctx,
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: primaryTaskId,
        author: opts.author,
        statusFrom: primaryStatusFrom ?? undefined,
        statusTo: "DONE",
        commentBody: opts.body,
        formattedComment: formatCommentBodyForCommit(opts.body, ctx.config),
        emoji: opts.statusCommitEmoji ?? defaultCommitEmojiForStatus("DONE"),
        allow: opts.statusCommitAllow,
        autoAllow: opts.statusCommitAutoAllow || opts.statusCommitAllow.length === 0,
        allowTasks: true,
        requireClean: opts.statusCommitRequireClean,
        quiet: opts.quiet,
        config: ctx.config,
      });
    }

    if (!opts.quiet) {
      process.stdout.write(`${successMessage("finished")}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "finish", root: opts.rootOverride ?? null });
  }
}
