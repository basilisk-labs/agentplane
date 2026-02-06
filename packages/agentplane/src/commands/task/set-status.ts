import { type TaskData } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import { successMessage, warnMessage } from "../../cli/output.js";
import { formatCommentBodyForCommit } from "../../shared/comment-format.js";
import { CliError } from "../../shared/errors.js";

import { commitFromComment } from "../guard/index.js";
import { loadBackendTask, resolveDocUpdatedBy } from "../shared/task-backend.js";

import {
  buildDependencyState,
  defaultCommitEmojiForStatus,
  enforceStatusCommitPolicy,
  isTransitionAllowed,
  normalizeTaskStatus,
  nowIso,
  readCommitInfo,
} from "./shared.js";

export async function cmdTaskSetStatus(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  status: string;
  author?: string;
  body?: string;
  commit?: string;
  force: boolean;
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
    const { backend, task, config, resolved } = await loadBackendTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      taskId: opts.taskId,
    });
    if (opts.commitFromComment) {
      enforceStatusCommitPolicy({
        policy: config.status_commit_policy,
        action: "task set-status",
        confirmed: opts.confirmStatusCommit,
        quiet: opts.quiet,
      });
    }

    const currentStatus = String(task.status || "TODO").toUpperCase();
    if (!opts.force && !isTransitionAllowed(currentStatus, nextStatus)) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Refusing status transition ${currentStatus} -> ${nextStatus} (use --force to override)`,
      });
    }

    if (!opts.force && (nextStatus === "DOING" || nextStatus === "DONE")) {
      const allTasks = await backend.listTasks();
      const depState = buildDependencyState(allTasks);
      const dep = depState.get(task.id);
      if (dep && (dep.missing.length > 0 || dep.incomplete.length > 0)) {
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

    const existingComments = Array.isArray(task.comments)
      ? task.comments.filter(
          (item): item is { author: string; body: string } =>
            !!item && typeof item.author === "string" && typeof item.body === "string",
        )
      : [];
    let comments = existingComments;
    if (opts.author && opts.body) {
      const commentBody = opts.commitFromComment
        ? formatCommentBodyForCommit(opts.body, config)
        : opts.body;
      comments = [...existingComments, { author: opts.author, body: commentBody }];
    }

    const next: TaskData = {
      ...task,
      status: nextStatus,
      comments,
      doc_version: 2,
      doc_updated_at: nowIso(),
      doc_updated_by: resolveDocUpdatedBy(task, opts.author),
    };
    if (opts.commit) {
      const commitInfo = await readCommitInfo(resolved.gitRoot, opts.commit);
      next.commit = { hash: commitInfo.hash, message: commitInfo.message };
    }
    await backend.writeTask(next);

    // tasks.json is export-only; generated via `agentplane task export`.

    if (opts.commitFromComment) {
      if (!opts.body) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: "--body is required when using --commit-from-comment",
        });
      }
      await commitFromComment({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: opts.taskId,
        author: opts.author,
        statusFrom: currentStatus,
        statusTo: nextStatus,
        commentBody: opts.body,
        formattedComment: formatCommentBodyForCommit(opts.body, config),
        emoji: opts.commitEmoji ?? defaultCommitEmojiForStatus(nextStatus),
        allow: opts.commitAllow,
        autoAllow: opts.commitAutoAllow || opts.commitAllow.length === 0,
        allowTasks: opts.commitAllowTasks,
        requireClean: opts.commitRequireClean,
        quiet: opts.quiet,
        config,
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
