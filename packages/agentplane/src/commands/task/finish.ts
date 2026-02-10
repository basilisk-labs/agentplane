import { type TaskData } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import { invalidValueMessage, successMessage } from "../../cli/output.js";
import { formatCommentBodyForCommit } from "../../shared/comment-format.js";
import { CliError } from "../../shared/errors.js";
import { readFile, rm } from "node:fs/promises";
import path from "node:path";

import { commitFromComment } from "../guard/index.js";
import {
  loadCommandContext,
  loadTaskFromContext,
  type CommandContext,
} from "../shared/task-backend.js";
import { backendIsLocalFileBackend, getTaskStore } from "../shared/task-store.js";

import { readDirectWorkLock } from "../../shared/direct-work-lock.js";

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

async function clearDirectWorkLockIfMatches(opts: {
  agentplaneDir: string;
  taskIds: string[];
}): Promise<void> {
  const lockPath = path.join(opts.agentplaneDir, "cache", "direct-work.json");
  try {
    const text = await readFile(lockPath, "utf8");
    const parsed = JSON.parse(text) as { task_id?: unknown } | null;
    const lockTaskId = parsed && typeof parsed.task_id === "string" ? parsed.task_id : null;
    if (!lockTaskId) return;
    if (!opts.taskIds.includes(lockTaskId)) return;
    await rm(lockPath, { force: true });
  } catch {
    // best-effort
  }
}

export async function cmdFinish(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskIds: string[];
  author: string;
  body: string;
  result?: string;
  risk?: "low" | "med" | "high";
  breaking: boolean;
  commit?: string;
  force: boolean;
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

    const useStore = backendIsLocalFileBackend(ctx);
    const store = useStore ? getTaskStore(ctx) : null;

    const metaTaskId = opts.taskIds.length === 1 ? (opts.taskIds[0] ?? "") : "";
    const wantMeta =
      typeof opts.result === "string" || typeof opts.risk === "string" || opts.breaking === true;
    if (wantMeta && opts.taskIds.length !== 1) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--result/--risk/--breaking requires exactly one task id",
      });
    }
    const resultSummary = typeof opts.result === "string" ? opts.result.trim() : "";
    const riskLevel = opts.risk;
    const breaking = opts.breaking === true;

    let primaryStatusFrom: string | null = null;
    for (const taskId of opts.taskIds) {
      const task = useStore ? await store!.get(taskId) : await loadTaskFromContext({ ctx, taskId });

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

      if (taskId === metaTaskId) {
        const tags = Array.isArray(task.tags)
          ? task.tags.filter((t): t is string => typeof t === "string")
          : [];
        const isSpike = tags.includes("spike");
        if (!isSpike && opts.taskIds.length === 1 && !resultSummary) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: "Missing required --result for non-spike tasks.",
          });
        }
        if (typeof opts.result === "string" && !resultSummary) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: "Invalid value for --result: empty.",
          });
        }
      }

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
        result_summary:
          taskId === metaTaskId && resultSummary ? resultSummary : task.result_summary,
        risk_level: taskId === metaTaskId && riskLevel ? riskLevel : task.risk_level,
        breaking: taskId === metaTaskId && breaking ? true : task.breaking,
        doc_version: 2,
        doc_updated_at: at,
        doc_updated_by: opts.author,
      };
      await (useStore
        ? store!.update(taskId, () => nextTask)
        : ctx.taskBackend.writeTask(nextTask));
    }

    // tasks.json is export-only; generated via `agentplane task export`.

    let executorAgent: string | null = null;
    if (opts.commitFromComment || opts.statusCommit) {
      const mode = ctx.config.workflow_mode;
      executorAgent = opts.author;
      if (mode === "direct") {
        const lock = await readDirectWorkLock(ctx.resolvedProject.agentplaneDir);
        const lockAgent = lock?.task_id === primaryTaskId ? (lock.agent?.trim() ?? "") : "";
        if (lockAgent) executorAgent = lockAgent;
      }
    }

    if (opts.commitFromComment) {
      if (typeof opts.commitEmoji === "string" && opts.commitEmoji.trim() !== "✅") {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: invalidValueMessage(
            "--commit-emoji",
            opts.commitEmoji,
            "✅ (finish commits must use a checkmark)",
          ),
        });
      }
      await commitFromComment({
        ctx,
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: primaryTaskId,
        executorAgent: executorAgent ?? undefined,
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
      if (typeof opts.statusCommitEmoji === "string" && opts.statusCommitEmoji.trim() !== "✅") {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: invalidValueMessage(
            "--status-commit-emoji",
            opts.statusCommitEmoji,
            "✅ (finish commits must use a checkmark)",
          ),
        });
      }
      await commitFromComment({
        ctx,
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: primaryTaskId,
        executorAgent: executorAgent ?? undefined,
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

    if (ctx.config.workflow_mode === "direct") {
      await clearDirectWorkLockIfMatches({
        agentplaneDir: ctx.resolvedProject.agentplaneDir,
        taskIds: opts.taskIds,
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
