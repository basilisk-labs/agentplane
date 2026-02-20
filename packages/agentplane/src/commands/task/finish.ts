import { type TaskData } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import { invalidValueMessage, successMessage } from "../../cli/output.js";
import { formatCommentBodyForCommit } from "../../shared/comment-format.js";
import { CliError } from "../../shared/errors.js";
import { readFile, rm } from "node:fs/promises";
import path from "node:path";

import { buildGitCommitEnv, cmdCommit, commitFromComment } from "../guard/index.js";
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
  defaultCommitEmojiForStatus,
  enforceStatusCommitPolicy,
  ensureVerificationSatisfiedIfRequired,
  nowIso,
  readCommitInfo,
  readHeadCommit,
  requireStructuredComment,
  resolvePrimaryTag,
  toStringArray,
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
  yes?: boolean;
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
  closeCommit?: boolean;
  closeUnstageOthers?: boolean;
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
        reason: "finish --force",
      });
    }
    const { prefix, min_chars: minChars } = ctx.config.tasks.comments.verified;
    requireStructuredComment(opts.body, prefix, minChars);
    const statusCommitRequested = opts.statusCommit;
    if ((opts.commitFromComment || statusCommitRequested) && opts.taskIds.length !== 1) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--commit-from-comment/--status-commit requires exactly one task id",
      });
    }
    if (opts.closeCommit && opts.taskIds.length !== 1) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--close-commit requires exactly one task id",
      });
    }
    if (opts.closeCommit && (opts.commitFromComment || opts.statusCommit)) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--close-commit cannot be combined with --commit-from-comment/--status-commit",
      });
    }
    const primaryTaskId = opts.taskIds[0] ?? "";
    if ((opts.commitFromComment || statusCommitRequested) && !primaryTaskId) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--commit-from-comment/--status-commit requires exactly one task id",
      });
    }
    if (opts.commitAutoAllow) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--commit-auto-allow is disabled; pass explicit --commit-allow <path-prefix>.",
      });
    }
    if (opts.statusCommitAutoAllow) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message:
          "--status-commit-auto-allow is disabled; pass explicit --status-commit-allow <path-prefix>.",
      });
    }
    if (opts.commitFromComment && opts.commitAllow.length === 0) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--commit-from-comment requires --commit-allow <path-prefix>",
      });
    }
    if (statusCommitRequested && opts.statusCommitAllow.length === 0) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--status-commit requires --status-commit-allow <path-prefix>",
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
    let primaryTag: string | null = null;
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
        (opts.commitFromComment || statusCommitRequested) &&
        primaryStatusFrom === null
      ) {
        primaryStatusFrom = String(task.status || "TODO").toUpperCase();
        primaryTag = resolvePrimaryTag(toStringArray(task.tags), ctx).primary;
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

    if (opts.commitFromComment || statusCommitRequested) {
      enforceStatusCommitPolicy({
        policy: ctx.config.status_commit_policy,
        action: "finish",
        confirmed: opts.confirmStatusCommit,
        quiet: opts.quiet,
        statusFrom: primaryStatusFrom ?? "UNKNOWN",
        statusTo: "DONE",
      });
    }

    // tasks.json is export-only; generated via `agentplane task export`.

    let executorAgent: string | null = null;
    if (opts.commitFromComment || statusCommitRequested) {
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
      const committed = await commitFromComment({
        ctx,
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: primaryTaskId,
        primaryTag: primaryTag ?? "meta",
        executorAgent: executorAgent ?? undefined,
        author: opts.author,
        statusFrom: primaryStatusFrom ?? undefined,
        statusTo: "DONE",
        commentBody: opts.body,
        formattedComment: formatCommentBodyForCommit(opts.body, ctx.config),
        emoji: opts.commitEmoji ?? defaultCommitEmojiForStatus("DONE"),
        allow: opts.commitAllow,
        autoAllow: false,
        allowTasks: opts.commitAllowTasks,
        requireClean: opts.commitRequireClean,
        quiet: opts.quiet,
        config: ctx.config,
      });

      // commitFromComment creates the git commit and returns the actual head hash/subject.
      // Refresh task commit metadata to this hash and amend the same commit in local mode so
      // "task done" metadata does not require a manual follow-up close commit.
      const taskAfterCommit = useStore
        ? await store!.get(primaryTaskId)
        : await loadTaskFromContext({ ctx, taskId: primaryTaskId });
      const updatedAfterCommit: TaskData = {
        ...taskAfterCommit,
        commit: { hash: committed.hash, message: committed.message },
        doc_version: 2,
        doc_updated_at: nowIso(),
        doc_updated_by: opts.author,
      };
      await (useStore
        ? store!.update(primaryTaskId, () => updatedAfterCommit)
        : ctx.taskBackend.writeTask(updatedAfterCommit));

      if (useStore) {
        const workflowReadmeRelPath = path.join(
          ctx.config.paths.workflow_dir,
          primaryTaskId,
          "README.md",
        );
        await ctx.git.stage([workflowReadmeRelPath]);
        const env = buildGitCommitEnv({
          taskId: primaryTaskId,
          agentId: executorAgent ?? undefined,
          statusTo: "DONE",
          allowTasks: true,
          allowBase: false,
          allowPolicy: false,
          allowConfig: false,
          allowHooks: false,
          allowCI: false,
        });
        await ctx.git.commitAmendNoEdit({ env });
      }
    }

    if (statusCommitRequested) {
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
        primaryTag: primaryTag ?? "meta",
        executorAgent: executorAgent ?? undefined,
        author: opts.author,
        statusFrom: primaryStatusFrom ?? undefined,
        statusTo: "DONE",
        commentBody: opts.body,
        formattedComment: formatCommentBodyForCommit(opts.body, ctx.config),
        emoji: opts.statusCommitEmoji ?? defaultCommitEmojiForStatus("DONE"),
        allow: opts.statusCommitAllow,
        autoAllow: false,
        allowTasks: true,
        requireClean: opts.statusCommitRequireClean,
        quiet: opts.quiet,
        config: ctx.config,
      });
    }

    if (opts.closeCommit && primaryTaskId) {
      await cmdCommit({
        ctx,
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: primaryTaskId,
        message: "",
        close: true,
        allow: [],
        autoAllow: false,
        allowTasks: true,
        allowBase: false,
        allowPolicy: false,
        allowConfig: false,
        allowHooks: false,
        allowCI: false,
        requireClean: true,
        quiet: opts.quiet,
        closeUnstageOthers: opts.closeUnstageOthers === true,
        closeCheckOnly: false,
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
