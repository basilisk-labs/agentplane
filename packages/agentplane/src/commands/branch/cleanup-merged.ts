import { readFile } from "node:fs/promises";
import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import {
  resolveBaseBranch,
  gitEnv,
  gitDiffNames,
  findWorktreeForBranch,
  gitListBranchesByPrefixes,
  parseTaskIdFromCloseBranch,
  parseTaskIdFromBranch,
} from "@agentplaneorg/core/git";
import { normalizeTaskStatus } from "@agentplaneorg/core/tasks";

import { mapBackendError } from "../../cli/error-map.js";
import { createCliEmitter, unknownEntityMessage, workflowModeMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { ensureGitClean } from "../guard/index.js";
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitBranchExists, gitCurrentBranch, gitIsAncestor } from "../shared/git-ops.js";
import { cleanupMergedLocalBranch } from "../shared/merged-branch-cleanup.js";
import { isPathWithin, resolvePathFallback } from "../shared/path.js";
import { parsePrMeta } from "../shared/pr-meta.js";
import {
  loadTaskFromContext,
  loadCommandContext,
  type CommandContext,
} from "../shared/task-backend.js";

import { archivePrArtifacts } from "./internal/archive-pr.js";
const output = createCliEmitter();

type CleanupBranchKind = "task" | "task-close";

type CleanupCandidate = {
  taskId: string;
  branch: string;
  worktreePath: string | null;
};

function resolveCleanupBranchTaskId(opts: {
  branch: string;
  prefix: string;
}): { taskId: string; kind: CleanupBranchKind } | null {
  const taskId = parseTaskIdFromBranch(opts.prefix, opts.branch);
  if (taskId) return { taskId, kind: "task" };
  const closeTaskId = parseTaskIdFromCloseBranch(opts.branch);
  if (closeTaskId) return { taskId: closeTaskId, kind: "task-close" };
  return null;
}

async function readCleanupPrMetaIfPresent(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
}) {
  const metaPath = path.join(opts.gitRoot, opts.workflowDir, opts.taskId, "pr", "meta.json");
  try {
    const raw = await readFile(metaPath, "utf8");
    return parsePrMeta(raw, opts.taskId);
  } catch {
    return null;
  }
}

async function taskLifecycleIsOnBase(opts: {
  gitRoot: string;
  workflowDir: string;
  baseBranch: string;
  task: TaskData;
  taskId: string;
}): Promise<boolean> {
  const taskCommitHash = opts.task.commit?.hash?.trim() ?? "";
  if (taskCommitHash && (await gitIsAncestor(opts.gitRoot, taskCommitHash, opts.baseBranch))) {
    return true;
  }
  const meta = await readCleanupPrMetaIfPresent({
    gitRoot: opts.gitRoot,
    workflowDir: opts.workflowDir,
    taskId: opts.taskId,
  });
  const mergeCommit = meta?.status === "MERGED" ? (meta.merge_commit?.trim() ?? "") : "";
  return (
    mergeCommit.length > 0 && (await gitIsAncestor(opts.gitRoot, mergeCommit, opts.baseBranch))
  );
}

async function resolveCleanupCandidates(opts: {
  ctx: CommandContext;
  gitRoot: string;
  workflowDir: string;
  baseBranch: string;
}): Promise<CleanupCandidate[]> {
  const prefix = opts.ctx.config.branch.task_prefix;
  const branches = await gitListBranchesByPrefixes(opts.gitRoot, [prefix, "task-close"]);
  const taskCache = new Map<string, TaskData | null>();

  const candidates: CleanupCandidate[] = [];
  for (const branch of branches) {
    if (branch === opts.baseBranch) continue;
    const target = resolveCleanupBranchTaskId({ branch, prefix });
    if (!target) continue;
    let task = taskCache.get(target.taskId) ?? null;
    if (!taskCache.has(target.taskId)) {
      try {
        task = await loadTaskFromContext({ ctx: opts.ctx, taskId: target.taskId });
      } catch {
        task = null;
      }
      taskCache.set(target.taskId, task);
    }
    if (!task) continue;
    const status = normalizeTaskStatus(task.status);
    if (status !== "DONE") continue;
    const diff = await gitDiffNames(opts.gitRoot, opts.baseBranch, branch);
    const lifecycleOnBase = await taskLifecycleIsOnBase({
      gitRoot: opts.gitRoot,
      workflowDir: opts.workflowDir,
      baseBranch: opts.baseBranch,
      task,
      taskId: target.taskId,
    });
    if (diff.length > 0 && !lifecycleOnBase) continue;
    const worktreePath = await findWorktreeForBranch(opts.gitRoot, branch);
    candidates.push({ taskId: target.taskId, branch, worktreePath });
  }
  return candidates;
}

function isMissingRemoteBranchDelete(error: unknown): boolean {
  const stdout = String((error as { stdout?: string } | null)?.stdout ?? "");
  const stderr = String((error as { stderr?: string } | null)?.stderr ?? "");
  const text = `${stdout}\n${stderr}`;
  return (
    text.includes("remote ref does not exist") ||
    text.includes("unable to delete") ||
    text.includes("remote reference is not a full refname")
  );
}

async function deleteRemoteBranchIfPresent(gitRoot: string, branch: string): Promise<boolean> {
  try {
    await execFileAsync("git", ["push", "origin", "--delete", branch], {
      cwd: gitRoot,
      env: gitEnv(),
    });
    return true;
  } catch (error) {
    if (isMissingRemoteBranchDelete(error)) {
      return false;
    }
    throw error;
  }
}

export async function cmdCleanupMerged(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  base?: string;
  yes: boolean;
  archive: boolean;
  deleteRemoteBranches: boolean;
  finalize?: boolean;
  fetch: boolean;
  quiet: boolean;
  skipUnsafeWorktrees?: boolean;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const resolved = ctx.resolvedProject;
    const config = ctx.config;
    if (config.workflow_mode !== "branch_pr") {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: workflowModeMessage(config.workflow_mode, "branch_pr"),
      });
    }

    await ensureGitClean({ cwd: opts.cwd, rootOverride: opts.rootOverride });

    if (opts.fetch) {
      await execFileAsync("git", ["fetch", "--prune", "origin"], {
        cwd: resolved.gitRoot,
        env: gitEnv(),
      });
    }

    const baseBranch = await resolveBaseBranch({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      cliBaseOpt: opts.base ?? null,
      mode: config.workflow_mode,
    });
    if (!baseBranch) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "Base branch could not be resolved (use `agentplane branch base set` or --base).",
      });
    }
    if (!(await gitBranchExists(resolved.gitRoot, baseBranch))) {
      throw new CliError({
        exitCode: 5,
        code: "E_GIT",
        message: unknownEntityMessage("base branch", baseBranch),
      });
    }

    const currentBranch = await gitCurrentBranch(resolved.gitRoot);
    if (currentBranch !== baseBranch) {
      throw new CliError({
        exitCode: 5,
        code: "E_GIT",
        message: `cleanup merged must run on base branch ${baseBranch} (current: ${currentBranch})`,
      });
    }

    if (opts.finalize) {
      await execFileAsync("git", ["pull", "--ff-only", "origin", baseBranch], {
        cwd: resolved.gitRoot,
        env: gitEnv(),
      });
    }

    const repoRoot = await resolvePathFallback(resolved.gitRoot);
    const candidates = await resolveCleanupCandidates({
      ctx,
      gitRoot: resolved.gitRoot,
      workflowDir: config.paths.workflow_dir,
      baseBranch,
    });

    const sortedCandidates = candidates.toSorted((a, b) => a.taskId.localeCompare(b.taskId));

    if (!opts.quiet) {
      const archiveLabel = opts.archive ? " archive=on" : "";
      const fetchLabel = opts.fetch ? " fetch=on" : "";
      const remoteLabel = opts.deleteRemoteBranches ? " remote=delete" : "";
      output.line(`cleanup merged (base=${baseBranch}${archiveLabel}${fetchLabel}${remoteLabel})`);
      if (sortedCandidates.length === 0) {
        output.line("no candidates");
        return 0;
      }
      for (const item of sortedCandidates) {
        output.line(`- ${item.taskId}: branch=${item.branch} worktree=${item.worktreePath ?? "-"}`);
      }
    }

    if (!opts.yes) {
      if (!opts.quiet) {
        output.line("Re-run with --yes to delete these branches/worktrees.");
      }
      return 0;
    }

    const skipUnsafeWorktrees = opts.skipUnsafeWorktrees === true;
    let deletedRemoteBranches = 0;
    let skippedUnsafe = 0;
    for (const item of sortedCandidates) {
      const worktreePath = item.worktreePath ? await resolvePathFallback(item.worktreePath) : null;
      if (worktreePath) {
        const outsideRepo = !isPathWithin(repoRoot, worktreePath);
        const currentWorktree = worktreePath === repoRoot;
        if (outsideRepo || currentWorktree) {
          if (skipUnsafeWorktrees) {
            skippedUnsafe += 1;
            continue;
          }
          if (outsideRepo) {
            throw new CliError({
              exitCode: 5,
              code: "E_GIT",
              message: `Refusing to remove worktree outside repo: ${worktreePath}`,
            });
          }
          throw new CliError({
            exitCode: 5,
            code: "E_GIT",
            message: "Refusing to remove the current worktree",
          });
        }
      }

      if (opts.archive) {
        const taskDir = path.join(resolved.gitRoot, config.paths.workflow_dir, item.taskId);
        await archivePrArtifacts(taskDir);
      }

      await cleanupMergedLocalBranch({
        gitRoot: resolved.gitRoot,
        branch: item.branch,
        worktreePathHint: worktreePath,
      });
      if (opts.deleteRemoteBranches) {
        deletedRemoteBranches += (await deleteRemoteBranchIfPresent(resolved.gitRoot, item.branch))
          ? 1
          : 0;
      }
    }

    if (opts.deleteRemoteBranches) {
      await execFileAsync("git", ["fetch", "--prune", "origin"], {
        cwd: resolved.gitRoot,
        env: gitEnv(),
      });
    }

    if (!opts.quiet) {
      const remoteDetail = opts.deleteRemoteBranches
        ? ` remote_deleted=${deletedRemoteBranches}`
        : "";
      const skippedDetail = skipUnsafeWorktrees ? ` skipped_unsafe=${skippedUnsafe}` : "";
      output.success(
        "cleanup merged",
        undefined,
        `deleted=${candidates.length - skippedUnsafe}${remoteDetail}${skippedDetail}`,
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "cleanup merged", root: opts.rootOverride ?? null });
  }
}
