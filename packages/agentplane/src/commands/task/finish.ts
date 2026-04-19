import { resolveBaseBranch } from "@agentplaneorg/core";

import { mapBackendError } from "../../cli/error-map.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { infoMessage, invalidValueMessage, successMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { readFile, rm } from "node:fs/promises";
import path from "node:path";

import { ensureActionApproved } from "../shared/approval-requirements.js";
import { ensureReconciledBeforeMutation } from "../shared/reconcile-check.js";
import { execFileAsync, gitEnv } from "../shared/git.js";
import { gitBranchExists, gitCurrentBranch } from "../shared/git-ops.js";
import {
  backendUsesLocalTaskStore,
  loadCommandContext,
  type CommandContext,
} from "../shared/task-backend.js";
import { getTaskStore } from "../shared/task-store.js";
import { applyTaskMutation } from "../shared/task-mutation.js";
import { collectTaskIncidents, renderIncidentCollectionPlanOutcome } from "../incidents/shared.js";
import {
  createTaskCloseCommit,
  existingCommitInfo,
  loadTaskForFinish,
  type LoadedFinishTask,
  type ResolvedCommitInfo,
  writeFinishedTasks,
} from "./finish-shared.js";
import { buildStructuredFindingMutationPlan } from "./findings.js";

import {
  defaultCommitEmojiForStatus,
  enforceStatusCommitPolicy,
  prepareTaskTransitionComment,
  readCommitInfo,
  requireStructuredComment,
  runTaskTransitionCommentCommit,
} from "./shared.js";
import { taskCloseAlreadyRecordedOnBase } from "./close-tail-state.js";

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

async function ensureFinishRunsOnBaseBranch(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  baseBranchOverride?: string;
}): Promise<void> {
  if (opts.ctx.config.workflow_mode !== "branch_pr") return;

  const baseBranch = await resolveBaseBranch({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    cliBaseOpt: opts.baseBranchOverride ?? null,
    mode: opts.ctx.config.workflow_mode,
  });
  if (!baseBranch) {
    throw new CliError({
      exitCode: exitCodeForError("E_USAGE"),
      code: "E_USAGE",
      message: "Base branch could not be resolved (use `agentplane branch base set` or --base).",
    });
  }

  const currentBranch = await gitCurrentBranch(opts.ctx.resolvedProject.gitRoot);
  if (currentBranch === baseBranch) return;

  throw new CliError({
    exitCode: exitCodeForError("E_GIT"),
    code: "E_GIT",
    message:
      `finish must run on base branch ${baseBranch} in branch_pr mode ` +
      `(current: ${currentBranch}); integrate first or reconcile from the base checkout.`,
  });
}

async function readHeadCommitHash(gitRoot: string): Promise<string> {
  const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
    cwd: gitRoot,
    env: gitEnv(),
  });
  const hash = stdout.trim();
  if (!hash) {
    throw new CliError({
      exitCode: exitCodeForError("E_GIT"),
      code: "E_GIT",
      message: "Failed to resolve HEAD while preparing a branch_pr close tail.",
    });
  }
  return hash;
}

function branchPrCloseBranchName(taskId: string, headCommitHash: string): string {
  return `task-close/${taskId}/${headCommitHash.slice(0, 12)}`;
}

async function hasTaskArtifactChanges(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
}): Promise<boolean> {
  const taskDirRelative = path.join(opts.workflowDir, opts.taskId);
  const { stdout } = await execFileAsync("git", ["status", "--short", "--", taskDirRelative], {
    cwd: opts.gitRoot,
    env: gitEnv(),
  });
  return stdout.trim().length > 0;
}

async function materializeBranchPrCloseTail(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  baseBranchOverride?: string;
  quiet: boolean;
  closeUnstageOthers?: boolean;
  allowPolicy?: boolean;
}): Promise<string | null> {
  const gitRoot = opts.ctx.resolvedProject.gitRoot;
  const baseBranch = await gitCurrentBranch(gitRoot);
  const alreadyClosedOnBase = await taskCloseAlreadyRecordedOnBase({
    gitRoot,
    workflowDir: opts.ctx.config.paths.workflow_dir,
    taskId: opts.taskId,
    baseBranch,
  });
  if (alreadyClosedOnBase) {
    return null;
  }
  const headCommitHash = await readHeadCommitHash(gitRoot);
  const closeBranch = branchPrCloseBranchName(opts.taskId, headCommitHash);
  const branchExists = await gitBranchExists(gitRoot, closeBranch);

  await execFileAsync(
    "git",
    branchExists ? ["checkout", closeBranch] : ["checkout", "-b", closeBranch],
    {
      cwd: gitRoot,
      env: gitEnv(),
    },
  );

  let checkoutError: unknown = null;
  try {
    await createTaskCloseCommit({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      baseBranchOverride: opts.baseBranchOverride,
      quiet: opts.quiet,
      closeUnstageOthers: opts.closeUnstageOthers,
      allowPolicy: opts.allowPolicy,
    });
  } finally {
    try {
      await execFileAsync("git", ["checkout", baseBranch], {
        cwd: gitRoot,
        env: gitEnv(),
      });
    } catch (error) {
      checkoutError = error;
    }
  }

  if (checkoutError) {
    throw new CliError({
      exitCode: exitCodeForError("E_GIT"),
      code: "E_GIT",
      message:
        `Created ${closeBranch} but failed to return to ${baseBranch}; ` +
        "inspect the local checkout before continuing.",
    });
  }

  return closeBranch;
}

type FinishStructuredFindingInput = {
  observation: string;
  impact: string;
  resolution: string;
  localOnly: boolean;
  repoFixable: boolean;
  incidentScope?: string;
  incidentTags: string[];
  incidentMatch: string[];
  incidentAdvice?: string;
  incidentRule?: string;
};

async function appendFinishStructuredFinding(opts: {
  ctx: CommandContext;
  taskId: string;
  author: string;
  finding: FinishStructuredFindingInput;
}): Promise<void> {
  await applyTaskMutation({
    ctx: opts.ctx,
    taskId: opts.taskId,
    build: (current) => {
      const plan = buildStructuredFindingMutationPlan({
        current,
        config: opts.ctx.config,
        observation: opts.finding.observation,
        impact: opts.finding.impact,
        resolution: opts.finding.resolution,
        promote: !opts.finding.localOnly,
        external: !opts.finding.localOnly,
        fixability: opts.finding.repoFixable ? "repo-fixable" : null,
        incidentScope: opts.finding.incidentScope,
        incidentTags: opts.finding.incidentTags,
        incidentMatch: opts.finding.incidentMatch,
        incidentAdvice: opts.finding.incidentAdvice,
        incidentRule: opts.finding.incidentRule,
        updatedBy: opts.author,
      });
      return plan ? { intents: plan.intents } : null;
    },
  });
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
  observation?: string;
  impact?: string;
  resolution?: string;
  localOnly?: boolean;
  repoFixable?: boolean;
  incidentScope?: string;
  incidentTags?: string[];
  incidentMatch?: string[];
  incidentAdvice?: string;
  incidentRule?: string;
  quiet: boolean;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    await ensureReconciledBeforeMutation({ ctx, command: "finish" });
    await ensureFinishRunsOnBaseBranch({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      baseBranchOverride: opts.baseBranchOverride,
    });
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

    const useStore = backendUsesLocalTaskStore(ctx);
    const store = useStore ? getTaskStore(ctx) : null;
    const backendWritesTaskReadmes = ctx.taskBackend.capabilities.writes_task_readmes === true;
    const defaultDirectCloseCommit =
      ctx.config.workflow_mode === "direct" &&
      backendWritesTaskReadmes &&
      opts.taskIds.length === 1 &&
      !opts.commitFromComment &&
      !statusCommitRequested;
    const defaultBranchPrCloseCommit =
      ctx.config.workflow_mode === "branch_pr" &&
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
      (defaultDirectCloseCommit && opts.noCloseCommit !== true) ||
      (defaultBranchPrCloseCommit && opts.noCloseCommit !== true);

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
    const finishFinding =
      typeof opts.observation === "string" &&
      typeof opts.impact === "string" &&
      typeof opts.resolution === "string"
        ? {
            observation: opts.observation,
            impact: opts.impact,
            resolution: opts.resolution,
            localOnly: opts.localOnly === true,
            repoFixable: opts.repoFixable === true,
            incidentScope: opts.incidentScope,
            incidentTags: opts.incidentTags ?? [],
            incidentMatch: opts.incidentMatch ?? [],
            incidentAdvice: opts.incidentAdvice,
            incidentRule: opts.incidentRule,
          }
        : null;
    if (finishFinding && opts.taskIds.length !== 1) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message:
          "--observation/--impact/--resolution and incident finding options require exactly one task id",
      });
    }
    if (finishFinding && primaryTaskId) {
      await loadTaskForFinish({
        ctx,
        store,
        useStore,
        taskId: primaryTaskId,
        taskCount: opts.taskIds.length,
        metaTaskId,
        resultProvided,
        resultSummary,
        force: opts.force,
        capturePrimaryLifecycleMeta: false,
      });
      await appendFinishStructuredFinding({
        ctx,
        taskId: primaryTaskId,
        author: opts.author,
        finding: finishFinding,
      });
    }

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
      const loadedTask = loadedTasks.find((candidate) => candidate.taskId === taskId) ?? null;
      await collectTaskIncidents({
        ctx,
        taskId,
        task: loadedTask?.task ?? null,
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
    const primaryLoadedTask = primaryTaskId
      ? (loadedTasks.find((candidate) => candidate.taskId === primaryTaskId) ?? null)
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

    const incidentPlans = [];
    const incidentRegistryPaths: string[][] = [];
    for (const taskId of opts.taskIds) {
      const loadedTask = loadedTasks.find((candidate) => candidate.taskId === taskId) ?? null;
      const collected = await collectTaskIncidents({
        ctx,
        taskId,
        task: loadedTask?.task ?? null,
        write: true,
      });
      incidentPlans.push(collected.plan);
      incidentRegistryPaths.push(collected.registryPaths);
    }
    const promotedIncidents = incidentPlans.reduce((sum, plan) => sum + plan.promotable.length, 0);
    const primaryTaskAlreadyClosedOnBase =
      ctx.config.workflow_mode === "branch_pr" &&
      primaryLoadedTask?.task.status === "DONE" &&
      (primaryLoadedTask.task.commit?.hash?.trim() ?? "") !== "" &&
      (taskCommitInfo?.hash?.trim() ?? "") !== "" &&
      primaryLoadedTask.task.commit?.hash?.trim() === taskCommitInfo?.hash?.trim();

    // tasks.json is export-only; generated via `agentplane task export`.

    if (shouldCloseCommit && primaryTaskId) {
      if (!opts.quiet) {
        process.stdout.write(
          `${infoMessage("task marked DONE; creating deterministic close commit")}\n`,
        );
      }
      const closeUnstageOthers = opts.closeCommit === true && opts.closeUnstageOthers === true;
      if (ctx.config.workflow_mode === "branch_pr") {
        const taskArtifactsChanged = await hasTaskArtifactChanges({
          gitRoot: ctx.resolvedProject.gitRoot,
          workflowDir: ctx.config.paths.workflow_dir,
          taskId: primaryTaskId,
        });
        if (primaryTaskAlreadyClosedOnBase && !taskArtifactsChanged && promotedIncidents === 0) {
          if (!opts.quiet) {
            process.stdout.write(
              `${infoMessage(
                `branch_pr close tail skipped for ${primaryTaskId}; canonical close artifacts are already present on the base branch.`,
              )}\n`,
            );
          }
        } else {
          const closeBranch = await materializeBranchPrCloseTail({
            ctx,
            cwd: opts.cwd,
            rootOverride: opts.rootOverride,
            taskId: primaryTaskId,
            baseBranchOverride: opts.baseBranchOverride,
            quiet: opts.quiet,
            closeUnstageOthers,
            allowPolicy: promotedIncidents > 0,
          });
          if (!opts.quiet) {
            if (closeBranch) {
              process.stdout.write(
                `${infoMessage(
                  `branch_pr close tail ready on ${closeBranch}; push that branch and open it with task hosted-close-pr if hosted automation does not create the closure PR for you.`,
                )}\n`,
              );
            } else {
              process.stdout.write(
                `${infoMessage(
                  "branch_pr close tail already exists on base; skipping local task-close branch materialization.",
                )}\n`,
              );
            }
          }
        }
      } else {
        await createTaskCloseCommit({
          ctx,
          cwd: opts.cwd,
          rootOverride: opts.rootOverride,
          taskId: primaryTaskId,
          baseBranchOverride: opts.baseBranchOverride,
          quiet: opts.quiet,
          closeUnstageOthers,
          allowPolicy: promotedIncidents > 0,
        });
      }
    }

    if (ctx.config.workflow_mode === "direct") {
      await clearDirectWorkLockIfMatches({
        agentplaneDir: ctx.resolvedProject.agentplaneDir,
        taskIds: opts.taskIds,
      });
    }

    if (!opts.quiet) {
      const incidentPlan = incidentPlans[0] ?? {
        candidates: [],
        skipped: [],
        promotable: [],
        duplicates: [],
      };
      process.stdout.write(
        `${infoMessage(
          renderIncidentCollectionPlanOutcome(incidentPlan, {
            wrote: promotedIncidents > 0,
            context: "finish",
            promotedIds: incidentPlan.promotable.map((item) => item.entry.id),
            registryPaths: incidentRegistryPaths[0] ?? [],
            taskId: opts.taskIds[0] ?? null,
          }),
        )}\n`,
      );
      process.stdout.write(`${successMessage("finished")}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "finish", root: opts.rootOverride ?? null });
  }
}
