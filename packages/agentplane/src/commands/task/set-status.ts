import { type TaskData } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import { successMessage, warnMessage } from "../../cli/output.js";
import { formatCommentBodyForCommit } from "../../shared/comment-format.js";
import { CliError } from "../../shared/errors.js";

import { commitFromComment } from "../guard/index.js";
import { ensureActionApproved } from "../shared/approval-requirements.js";
import {
  loadCommandContext,
  loadTaskFromContext,
  resolveDocUpdatedBy,
  type CommandContext,
} from "../shared/task-backend.js";
import {
  appendTaskCommentIntent,
  appendTaskEventIntent,
  backendIsLocalFileBackend,
  getTaskStore,
  mutateTaskStore,
  setTaskFieldsIntent,
  touchTaskDocMetaIntent,
} from "../shared/task-store.js";

import {
  appendTaskEvent,
  defaultCommitEmojiForStatus,
  ensureCommentCommitAllowed,
  ensureStatusTransitionAllowed,
  normalizeTaskDocVersion,
  normalizeTaskStatus,
  nowIso,
  readCommitInfo,
  resolveTaskDependencyState,
  resolvePrimaryTag,
  toStringArray,
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
    const useStore = backendIsLocalFileBackend(ctx);
    const store = useStore ? getTaskStore(ctx) : null;
    const task = useStore
      ? await store!.get(opts.taskId)
      : await loadTaskFromContext({ ctx, taskId: opts.taskId });
    const currentStatus = String(task.status || "TODO").toUpperCase();
    if (!useStore) {
      ensureStatusTransitionAllowed({
        currentStatus,
        nextStatus,
        force: opts.force,
      });

      if (!opts.force && (nextStatus === "DOING" || nextStatus === "DONE")) {
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

      ensureCommentCommitAllowed({
        enabled: opts.commitFromComment,
        config,
        action: "task set-status",
        confirmed: opts.confirmStatusCommit,
        quiet: opts.quiet,
        statusFrom: currentStatus,
        statusTo: nextStatus,
      });
    }

    const existingComments = Array.isArray(task.comments)
      ? task.comments.filter(
          (item): item is { author: string; body: string } =>
            !!item && typeof item.author === "string" && typeof item.body === "string",
        )
      : [];
    let comments = existingComments;
    let commentBody: string | undefined;
    if (opts.author && opts.body) {
      commentBody = opts.commitFromComment
        ? formatCommentBodyForCommit(opts.body, config)
        : opts.body;
      comments = [...existingComments, { author: opts.author, body: commentBody }];
    }

    const at = nowIso();
    const eventAuthor = resolveDocUpdatedBy(task, opts.author);
    const commitInfo = opts.commit ? await readCommitInfo(resolved.gitRoot, opts.commit) : null;
    const nextCommit = opts.commit
      ? { hash: commitInfo!.hash, message: commitInfo!.message }
      : undefined;
    let currentStatusForCommit = currentStatus;
    let primaryTagForCommit = resolvePrimaryTag(toStringArray(task.tags), ctx).primary;
    const next: TaskData = {
      ...task,
      status: nextStatus,
      comments,
      events: appendTaskEvent(task, {
        type: "status",
        at,
        author: eventAuthor,
        from: currentStatus,
        to: nextStatus,
        note: commentBody,
      }),
      doc_version: normalizeTaskDocVersion(task.doc_version),
      doc_updated_at: at,
      doc_updated_by: eventAuthor,
    };
    if (opts.commit) {
      next.commit = nextCommit;
    }
    await (useStore
      ? mutateTaskStore(store!, opts.taskId, async (current) => {
          const currentStatus = String(current.status || "TODO").toUpperCase();
          currentStatusForCommit = currentStatus;
          primaryTagForCommit = resolvePrimaryTag(toStringArray(current.tags), ctx).primary;
          ensureStatusTransitionAllowed({
            currentStatus,
            nextStatus,
            force: opts.force,
          });
          if (!opts.force && (nextStatus === "DOING" || nextStatus === "DONE")) {
            const dep = await resolveTaskDependencyState(current, ctx.taskBackend);
            if (dep.missing.length > 0 || dep.incomplete.length > 0) {
              if (!opts.quiet) {
                if (dep.missing.length > 0) {
                  process.stderr.write(
                    `${warnMessage(`missing deps: ${dep.missing.join(", ")}`)}\n`,
                  );
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
                message: `Task is not ready: ${current.id} (use --force to override)`,
              });
            }
          }
          ensureCommentCommitAllowed({
            enabled: opts.commitFromComment,
            config,
            action: "task set-status",
            confirmed: opts.confirmStatusCommit,
            quiet: opts.quiet,
            statusFrom: currentStatus,
            statusTo: nextStatus,
          });
          const currentEventAuthor = resolveDocUpdatedBy(current, opts.author);
          const intents = [
            setTaskFieldsIntent({
              status: nextStatus,
              ...(nextCommit ? { commit: nextCommit } : {}),
            }),
            appendTaskEventIntent({
              type: "status",
              at,
              author: currentEventAuthor,
              from: currentStatus,
              to: nextStatus,
              note: commentBody,
            }),
            touchTaskDocMetaIntent({
              updatedBy: currentEventAuthor,
              version: normalizeTaskDocVersion(current.doc_version),
            }),
          ];
          if (commentBody) {
            intents.splice(
              1,
              0,
              appendTaskCommentIntent({ author: opts.author!, body: commentBody }),
            );
          }
          return intents;
        })
      : ctx.taskBackend.writeTask(next));

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
        ctx,
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: opts.taskId,
        primaryTag: primaryTagForCommit,
        author: opts.author,
        statusFrom: currentStatusForCommit,
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
