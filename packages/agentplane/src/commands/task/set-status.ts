import { mapBackendError } from "../../cli/error-map.js";
import { successMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";

import { ensureActionApproved } from "../shared/approval-requirements.js";
import {
  loadCommandContext,
  resolveDocUpdatedBy,
  type CommandContext,
} from "../shared/task-backend.js";

import {
  applyTaskStatusTransitionCommand,
  defaultCommitEmojiForStatus,
  ensureLifecycleCommentCommitLocation,
  normalizeTaskStatus,
  nowIso,
  prepareTaskTransitionComment,
  readCommitInfo,
  runTaskTransitionCommentCommit,
} from "./shared.js";

export async function cmdTaskSetStatus(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  status: string;
  author?: string;
  body?: string;
  commit?: string;
  force: boolean;
  yes: boolean;
  commitFromComment: boolean;
  commitEmoji?: string;
  commitAllow: string[];
  commitAutoAllow: boolean;
  commitAllowTasks: boolean;
  commitRequireClean: boolean;
  confirmStatusCommit: boolean;
  quiet: boolean;
}): Promise<number> {
  const nextStatus = normalizeTaskStatus(opts.status);
  if (nextStatus === "DONE" && !opts.force) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Use `agentplane finish` to mark DONE (use --force to override)",
    });
  }
  if ((opts.author && !opts.body) || (opts.body && !opts.author)) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "--author and --body must be provided together",
    });
  }

  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const config = ctx.config;
    if (opts.force) {
      await ensureActionApproved({
        action: "force_action",
        config,
        yes: opts.yes,
        reason: "task set-status --force",
      });
    }
    const resolved = ctx.resolvedProject;
    await ensureLifecycleCommentCommitLocation({
      enabled: opts.commitFromComment,
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      command: "task set-status",
      taskId: opts.taskId,
    });

    const preparedComment =
      opts.author && opts.body
        ? prepareTaskTransitionComment({
            body: opts.body,
            enabled: opts.commitFromComment,
            config,
          })
        : null;
    const commentBody = preparedComment?.commentBody;

    const at = nowIso();
    const commitInfo = opts.commit ? await readCommitInfo(resolved.gitRoot, opts.commit) : null;
    const nextCommit = opts.commit
      ? { hash: commitInfo!.hash, message: commitInfo!.message }
      : undefined;
    const transition = await applyTaskStatusTransitionCommand({
      ctx,
      taskId: opts.taskId,
      quiet: opts.quiet,
      policyAction: "task_set_status",
      phase: "implement",
      build: (current) => {
        const currentEventAuthor = resolveDocUpdatedBy(current, opts.author);
        return {
          at,
          toStatus: nextStatus,
          eventAuthor: currentEventAuthor,
          updatedBy: currentEventAuthor,
          note: commentBody,
          comment:
            commentBody && opts.author ? { author: opts.author, body: commentBody } : undefined,
          commit: nextCommit,
          force: opts.force,
          dependencyPolicy:
            nextStatus === "DOING" || nextStatus === "DONE"
              ? { kind: "require-ready" }
              : { kind: "none" },
          commentCommitPolicy: {
            enabled: opts.commitFromComment,
            action: "task set-status",
            confirmed: opts.confirmStatusCommit,
            quiet: opts.quiet,
          },
        };
      },
    });

    // Legacy tasks.json exports are not generated during status commits.

    if (opts.commitFromComment) {
      if (!opts.body) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: "--body is required when using --commit-from-comment",
        });
      }
      await runTaskTransitionCommentCommit({
        ctx,
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: opts.taskId,
        primaryTag: transition.primaryTag,
        author: opts.author,
        statusFrom: transition.execution.currentStatus,
        statusTo: nextStatus,
        commentBody: opts.body,
        formattedComment: preparedComment?.formattedComment ?? null,
        emoji: opts.commitEmoji ?? defaultCommitEmojiForStatus(nextStatus),
        allow: opts.commitAllow,
        autoAllow: opts.commitAutoAllow || opts.commitAllow.length === 0,
        allowTasks: opts.commitAllowTasks,
        requireClean: opts.commitRequireClean,
        quiet: opts.quiet,
      });
    }

    if (!opts.quiet) {
      process.stdout.write(`${successMessage("status", opts.taskId, `next=${nextStatus}`)}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task set-status", root: opts.rootOverride ?? null });
  }
}
