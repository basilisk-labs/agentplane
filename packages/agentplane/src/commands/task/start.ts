import { type TaskData } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import { successMessage, warnMessage } from "../../cli/output.js";
import { formatCommentBodyForCommit } from "../../shared/comment-format.js";
import { CliError } from "../../shared/errors.js";

import { commitFromComment } from "../guard/index.js";
import {
  listTasksMemo,
  loadCommandContext,
  loadTaskFromContext,
  type CommandContext,
} from "../shared/task-backend.js";
import { backendIsLocalFileBackend, getTaskStore } from "../shared/task-store.js";

import {
  appendTaskEvent,
  buildDependencyState,
  ensurePlanApprovedIfRequired,
  enforceStatusCommitPolicy,
  extractDocSection,
  isVerifyStepsFilled,
  isTransitionAllowed,
  nowIso,
  requiresVerify,
  requireStructuredComment,
  toStringArray,
} from "./shared.js";

export const START_USAGE = "Usage: agentplane start <task-id> --author <id> --body <text> [flags]";
export const START_USAGE_EXAMPLE =
  'agentplane start 202602030608-F1Q8AB --author CODER --body "Start: ..."';

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
  quiet: boolean;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));

    if (opts.commitFromComment) {
      enforceStatusCommitPolicy({
        policy: ctx.config.status_commit_policy,
        action: "start",
        confirmed: opts.confirmStatusCommit,
        quiet: opts.quiet,
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
      const tags = toStringArray(task.tags);
      const verifyRequired = requiresVerify(tags, ctx.config.tasks.verify.required_tags);
      if (verifyRequired) {
        const doc = typeof task.doc === "string" ? task.doc : "";
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
    }

    ensurePlanApprovedIfRequired(task, ctx.config);

    const currentStatus = String(task.status || "TODO").toUpperCase();
    if (!opts.force && !isTransitionAllowed(currentStatus, "DOING")) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Refusing status transition ${currentStatus} -> DOING (use --force to override)`,
      });
    }

    if (!opts.force) {
      const allTasks = await listTasksMemo(ctx);
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
      commitInfo = await commitFromComment({
        ctx,
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: opts.taskId,
        author: opts.author,
        statusFrom: currentStatus,
        statusTo: "DOING",
        commentBody: opts.body,
        formattedComment,
        emoji: opts.commitEmoji ?? "🚧",
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
