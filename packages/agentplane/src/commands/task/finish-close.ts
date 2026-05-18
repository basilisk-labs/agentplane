import { resolveBaseBranch, gitEnv, taskCloseBranchName } from "@agentplaneorg/core/git";
import { readFile, rm } from "node:fs/promises";
import path from "node:path";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitBranchExists, gitCurrentBranch } from "../shared/git-ops.js";
import {
  tryLookupExistingGithubPrByBranch,
  tryLookupExistingGithubPrByBranchPrefix,
} from "../pr/internal/sync-github.js";
import type { CommandContext } from "../shared/task-backend.js";

import { taskCloseAlreadyRecordedOnBase } from "./close-tail-state.js";
import { createTaskCloseCommit } from "./finish-shared.js";

export async function clearDirectWorkLockIfMatches(opts: {
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

export async function ensureFinishRunsOnBaseBranch(opts: {
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

async function fetchRemoteBaseBestEffort(opts: {
  gitRoot: string;
  baseBranch: string;
}): Promise<void> {
  try {
    await execFileAsync("git", ["fetch", "--no-tags", "origin", opts.baseBranch], {
      cwd: opts.gitRoot,
      env: gitEnv(),
    });
  } catch {
    // Local finish remains usable without network/GitHub auth; remote state only makes
    // the close-tail path idempotent when hosted close already won the race.
  }
}

async function closeTailAlreadyHandledRemotely(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
  baseBranch: string;
  closeBranch: string;
}): Promise<boolean> {
  const remoteBase = `origin/${opts.baseBranch}`;
  const recordedOnRemoteBase = await taskCloseAlreadyRecordedOnBase({
    gitRoot: opts.gitRoot,
    workflowDir: opts.workflowDir,
    taskId: opts.taskId,
    baseBranch: remoteBase,
  }).catch(() => false);
  if (recordedOnRemoteBase) return true;

  const observedClosePr = await tryLookupExistingGithubPrByBranch({
    gitRoot: opts.gitRoot,
    branch: opts.closeBranch,
    baseBranch: opts.baseBranch,
  }).catch(() => null);
  if (observedClosePr?.status === "OPEN" || observedClosePr?.status === "MERGED") return true;

  const closeBranchPrefix = opts.closeBranch.slice(0, opts.closeBranch.lastIndexOf("/") + 1);
  const observedSiblingClosePr = await tryLookupExistingGithubPrByBranchPrefix({
    gitRoot: opts.gitRoot,
    branchPrefix: closeBranchPrefix,
    baseBranch: opts.baseBranch,
  }).catch(() => null);
  return observedSiblingClosePr?.status === "OPEN" || observedSiblingClosePr?.status === "MERGED";
}

export async function resolveBranchPrCloseTailState(opts: {
  ctx: CommandContext;
  taskId: string;
}): Promise<{
  baseBranch: string;
  closeBranch: string | null;
  alreadyHandled: boolean;
}> {
  const gitRoot = opts.ctx.resolvedProject.gitRoot;
  const baseBranch = await gitCurrentBranch(gitRoot);
  const alreadyClosedOnBase = await taskCloseAlreadyRecordedOnBase({
    gitRoot,
    workflowDir: opts.ctx.config.paths.workflow_dir,
    taskId: opts.taskId,
    baseBranch,
  });
  if (alreadyClosedOnBase) {
    return { baseBranch, closeBranch: null, alreadyHandled: true };
  }

  const headCommitHash = await readHeadCommitHash(gitRoot);
  const closeBranch = taskCloseBranchName({
    taskClosePrefix: opts.ctx.config.branch.task_close_prefix,
    taskId: opts.taskId,
    commit: headCommitHash,
  });

  await fetchRemoteBaseBestEffort({ gitRoot, baseBranch });
  const alreadyHandledRemotely = await closeTailAlreadyHandledRemotely({
    gitRoot,
    workflowDir: opts.ctx.config.paths.workflow_dir,
    taskId: opts.taskId,
    baseBranch,
    closeBranch,
  });
  return { baseBranch, closeBranch, alreadyHandled: alreadyHandledRemotely };
}

export async function materializeBranchPrCloseTail(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  baseBranchOverride?: string;
  quiet: boolean;
  closeUnstageOthers?: boolean;
  allowPolicy?: boolean;
  additionalTaskIds?: string[];
}): Promise<string | null> {
  const gitRoot = opts.ctx.resolvedProject.gitRoot;
  const closeTailState = await resolveBranchPrCloseTailState({
    ctx: opts.ctx,
    taskId: opts.taskId,
  });
  if (closeTailState.alreadyHandled || !closeTailState.closeBranch) {
    return null;
  }

  const baseBranch = closeTailState.baseBranch;
  const closeBranch = closeTailState.closeBranch;
  const branchExists = await gitBranchExists(gitRoot, closeBranch);

  await execFileAsync(
    "git",
    branchExists ? ["checkout", closeBranch] : ["checkout", "-b", closeBranch],
    { cwd: gitRoot, env: gitEnv() },
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
      additionalTaskIds: opts.additionalTaskIds,
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
