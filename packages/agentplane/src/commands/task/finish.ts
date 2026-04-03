import { mapBackendError } from "../../cli/error-map.js";
import { infoMessage, invalidValueMessage, successMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { readFile, rm } from "node:fs/promises";
import path from "node:path";

import { ensureActionApproved } from "../shared/approval-requirements.js";
import { ensureReconciledBeforeMutation } from "../shared/reconcile-check.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { backendIsLocalFileBackend, getTaskStore } from "../shared/task-store.js";
import { collectTaskIncidents } from "../incidents/shared.js";
import {
  createTaskCloseCommit,
  existingCommitInfo,
  loadTaskForFinish,
  type LoadedFinishTask,
  type ResolvedCommitInfo,
  writeFinishedTasks,
} from "./finish-shared.js";

import {
  defaultCommitEmojiForStatus,
  enforceStatusCommitPolicy,
  prepareTaskTransitionComment,
  readCommitInfo,
  requireStructuredComment,
  runTaskTransitionCommentCommit,
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
  noCloseCommit?: boolean;
  closeUnstageOthers?: boolean;
  baseBranchOverride?: string;
  quiet: boolean;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    await ensureReconciledBeforeMutation({ ctx, command: "finish" });
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
    if (opts.commitFromComment && statusCommitRequested) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message:
          "--commit-from-comment cannot be combined with --status-commit in finish; use one deterministic commit path.",
      });
    }
    if ((opts.closeCommit || opts.noCloseCommit) && opts.taskIds.length !== 1) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--close-commit/--no-close-commit requires exactly one task id",
      });
    }
    if (opts.closeCommit && opts.noCloseCommit) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--close-commit and --no-close-commit are mutually exclusive",
      });
    }
    if ((opts.closeCommit || opts.noCloseCommit) && (opts.commitFromComment || opts.statusCommit)) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message:
          "--close-commit/--no-close-commit cannot be combined with --commit-from-comment/--status-commit",
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

    const useStore = backendIsLocalFileBackend(ctx);
    const store = useStore ? getTaskStore(ctx) : null;
    const backendWritesTaskReadmes = ctx.taskBackend.capabilities.writes_task_readmes === true;
    const defaultDirectCloseCommit =
      ctx.config.workflow_mode === "direct" &&
      backendWritesTaskReadmes &&
      opts.taskIds.length === 1 &&
      !opts.commitFromComment &&
      !statusCommitRequested;
    const statusPathRequiresTrackedTaskCommit =
      backendWritesTaskReadmes &&
      opts.taskIds.length === 1 &&
      (opts.commitFromComment || statusCommitRequested);
    const shouldCloseCommit =
      opts.closeCommit === true ||
      statusPathRequiresTrackedTaskCommit ||
      (defaultDirectCloseCommit && opts.noCloseCommit !== true);

    const metaTaskId = opts.taskIds.length === 1 ? (opts.taskIds[0] ?? "") : "";
    const wantMeta =
      typeof opts.result === "string" || typeof opts.risk === "string" || opts.breaking === true;
    const resultProvided = typeof opts.result === "string";
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
    const loadedTasks: LoadedFinishTask[] = [];
    for (const taskId of opts.taskIds) {
      const loaded = await loadTaskForFinish({
        ctx,
        store,
        useStore,
        taskId,
        taskCount: opts.taskIds.length,
        metaTaskId,
        resultProvided,
        resultSummary,
        force: opts.force,
        capturePrimaryLifecycleMeta: taskId === primaryTaskId,
      });
      loadedTasks.push(loaded.loaded);
      if (taskId === primaryTaskId) {
        primaryStatusFrom = loaded.primaryStatusFrom;
        primaryTag = loaded.primaryTag;
      }
    }

    for (const taskId of opts.taskIds) {
      await collectTaskIncidents({
        ctx,
        taskId,
        write: false,
      });
    }

    const tasksMissingCommit = loadedTasks
      .filter(({ task }) => !existingCommitInfo(task))
      .map(({ taskId }) => taskId);
    if (!opts.commitFromComment && !opts.commit && tasksMissingCommit.length > 0) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message:
          "finish requires --commit <hash> or existing task commit metadata on every task; implicit HEAD fallback was removed.",
      });
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

    const gitRoot = ctx.resolvedProject.gitRoot;
    let taskCommitInfo: ResolvedCommitInfo | null = opts.commit
      ? await readCommitInfo(gitRoot, opts.commit)
      : null;
    const preparedComment =
      opts.commitFromComment || statusCommitRequested
        ? prepareTaskTransitionComment({
            body: opts.body,
            enabled: true,
            config: ctx.config,
          })
        : null;

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
      taskCommitInfo = await runTaskTransitionCommentCommit({
        ctx,
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: primaryTaskId,
        primaryTag: primaryTag ?? "meta",
        author: opts.author,
        statusFrom: primaryStatusFrom ?? undefined,
        statusTo: "DONE",
        commentBody: opts.body,
        formattedComment: preparedComment?.formattedComment ?? null,
        emoji: opts.commitEmoji ?? defaultCommitEmojiForStatus("DONE"),
        allow: opts.commitAllow,
        autoAllow: false,
        allowTasks: opts.commitAllowTasks,
        requireClean: opts.commitRequireClean,
        quiet: opts.quiet,
        progressMessage: "creating commit from verification comment",
        resolveExecutorAgent: true,
      });
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
      await runTaskTransitionCommentCommit({
        ctx,
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: primaryTaskId,
        primaryTag: primaryTag ?? "meta",
        author: opts.author,
        statusFrom: primaryStatusFrom ?? undefined,
        statusTo: "DONE",
        commentBody: opts.body,
        formattedComment: preparedComment?.formattedComment ?? null,
        emoji: opts.statusCommitEmoji ?? defaultCommitEmojiForStatus("DONE"),
        allow: opts.statusCommitAllow,
        autoAllow: false,
        allowTasks: true,
        requireClean: opts.statusCommitRequireClean,
        quiet: opts.quiet,
        progressMessage: "creating status commit",
        resolveExecutorAgent: true,
      });
    }

    await writeFinishedTasks({
      ctx,
      loadedTasks,
      metaTaskId,
      author: opts.author,
      body: opts.body,
      force: opts.force,
      resultProvided,
      resultSummary,
      riskLevel,
      breaking,
      taskCommitInfo,
    });

    let promotedIncidents = 0;
    for (const taskId of opts.taskIds) {
      const collected = await collectTaskIncidents({
        ctx,
        taskId,
        write: true,
      });
      promotedIncidents += collected.plan.promotable.length;
    }

    // tasks.json is export-only; generated via `agentplane task export`.

    if (shouldCloseCommit && primaryTaskId) {
      if (!opts.quiet) {
        process.stdout.write(
          `${infoMessage("task marked DONE; creating deterministic close commit")}\n`,
        );
      }
      await createTaskCloseCommit({
        ctx,
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: primaryTaskId,
        baseBranchOverride: opts.baseBranchOverride,
        quiet: opts.quiet,
        closeUnstageOthers: opts.closeCommit === true && opts.closeUnstageOthers === true,
      });
    }

    if (ctx.config.workflow_mode === "direct") {
      await clearDirectWorkLockIfMatches({
        agentplaneDir: ctx.resolvedProject.agentplaneDir,
        taskIds: opts.taskIds,
      });
    }

    if (!opts.quiet) {
      if (promotedIncidents > 0) {
        process.stdout.write(
          `${infoMessage(`incident registry updated (${promotedIncidents} promoted)`)}\n`,
        );
      }
      process.stdout.write(`${successMessage("finished")}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "finish", root: opts.rootOverride ?? null });
  }
}
