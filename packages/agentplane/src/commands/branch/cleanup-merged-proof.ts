import { readFile } from "node:fs/promises";
import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import {
  findWorktreeForBranch,
  gitDiffNames,
  gitEnv,
  gitListBranchesByPrefixes,
  parseTaskIdFromBranch,
  parseTaskIdFromCloseBranch,
} from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";
import { normalizeTaskStatus } from "@agentplaneorg/core/tasks";

import { gitIsAncestor } from "../shared/git-ops.js";
import { parsePrMeta } from "../shared/pr-meta.js";
import {
  observeExistingGithubPrByBranch,
  observeExistingGithubPrByNumber,
  type GithubPrLookupResult,
} from "../pr/internal/sync-github.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import {
  taskCloseAlreadyRecordedOnBase,
  taskPreMergeClosureRecordedOnBase,
} from "../task/close-tail-state.js";

type CleanupBranchKind = "task" | "task-close";

export type CleanupCandidate = {
  taskId: string;
  branch: string;
  worktreePath: string | null;
  expectedHeadSha: string | null;
  proof:
    | "branch_diff_empty"
    | "task_commit_on_base"
    | "merged_meta_on_base"
    | "tree_equivalent"
    | "patch_equivalent"
    | "provider_merge";
};

type CleanupBlockedCandidate = {
  taskId: string;
  branch: string;
  worktreePath: string | null;
  reason: string;
};

export type CleanupResolution = {
  candidates: CleanupCandidate[];
  blocked: CleanupBlockedCandidate[];
  matchedTaskIds: Set<string>;
};

function resolveCleanupBranchTaskId(opts: {
  branch: string;
  prefix: string;
  closePrefix: string;
}): { taskId: string; kind: CleanupBranchKind } | null {
  const taskId = parseTaskIdFromBranch(opts.prefix, opts.branch);
  if (taskId) return { taskId, kind: "task" };
  const closeTaskId = parseTaskIdFromCloseBranch(opts.branch, opts.closePrefix);
  return closeTaskId ? { taskId: closeTaskId, kind: "task-close" } : null;
}

async function readCleanupPrMetaIfPresent(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
}) {
  const metaPath = path.join(opts.gitRoot, opts.workflowDir, opts.taskId, "pr", "meta.json");
  try {
    return parsePrMeta(await readFile(metaPath, "utf8"), opts.taskId);
  } catch {
    return null;
  }
}

async function taskLifecycleProofOnBase(opts: {
  gitRoot: string;
  workflowDir: string;
  baseBranch: string;
  task: TaskData;
  taskId: string;
}): Promise<CleanupCandidate["proof"] | null> {
  const taskCommitHash = opts.task.commit?.hash?.trim() ?? "";
  if (taskCommitHash && (await gitIsAncestor(opts.gitRoot, taskCommitHash, opts.baseBranch))) {
    return "task_commit_on_base";
  }
  const meta = await readCleanupPrMetaIfPresent(opts);
  const mergeCommit = meta?.status === "MERGED" ? (meta.merge_commit?.trim() ?? "") : "";
  return mergeCommit && (await gitIsAncestor(opts.gitRoot, mergeCommit, opts.baseBranch))
    ? "merged_meta_on_base"
    : null;
}

function commandFailedWithExitCode(error: unknown, code: number): boolean {
  return (error as { code?: number | string } | null)?.code === code;
}

async function gitTreesEquivalent(opts: {
  gitRoot: string;
  baseBranch: string;
  branch: string;
}): Promise<boolean> {
  try {
    await execFileAsync("git", ["diff", "--quiet", opts.baseBranch, opts.branch, "--"], {
      cwd: opts.gitRoot,
      env: gitEnv(),
    });
    return true;
  } catch (error) {
    if (commandFailedWithExitCode(error, 1)) return false;
    throw error;
  }
}

async function gitLinearPatchsetEquivalent(opts: {
  gitRoot: string;
  baseBranch: string;
  branch: string;
}): Promise<boolean> {
  const { stdout: mergeCommits } = await execFileAsync(
    "git",
    ["rev-list", "--merges", `${opts.baseBranch}..${opts.branch}`],
    { cwd: opts.gitRoot, env: gitEnv() },
  );
  if (mergeCommits.trim()) return false;
  const { stdout } = await execFileAsync("git", ["cherry", opts.baseBranch, opts.branch], {
    cwd: opts.gitRoot,
    env: gitEnv(),
  });
  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .every((line) => line.startsWith("- "));
}

async function observeProviderPr(opts: {
  gitRoot: string;
  branch: string;
  baseBranch: string;
  prNumber: number | null;
}): Promise<GithubPrLookupResult> {
  return opts.prNumber
    ? await observeExistingGithubPrByNumber({
        gitRoot: opts.gitRoot,
        branch: opts.branch,
        baseBranch: opts.baseBranch,
        prNumber: opts.prNumber,
      })
    : await observeExistingGithubPrByBranch({
        gitRoot: opts.gitRoot,
        branch: opts.branch,
        baseBranch: opts.baseBranch,
      });
}

function providerUnavailableBecauseRepositoryIsLocal(result: GithubPrLookupResult): boolean {
  return (
    result.state === "unavailable" &&
    result.reason === "origin is unavailable or is not a GitHub repository"
  );
}

async function validateMergedProviderReceipt(opts: {
  gitRoot: string;
  baseBranch: string;
  branchHead: string;
  result: GithubPrLookupResult;
}): Promise<{ prNumber: number | null; reason: string | null }> {
  if (opts.result.state === "not_found") {
    return { prNumber: null, reason: "provider PR was not found for the exact branch and base" };
  }
  if (opts.result.state === "unavailable") {
    return {
      prNumber: null,
      reason: `provider lookup is unavailable: ${opts.result.reason}`,
    };
  }
  const observed = opts.result.pr;
  if (observed.status !== "MERGED") {
    return {
      prNumber: observed.prNumber,
      reason: `provider PR #${observed.prNumber} is ${observed.status.toLowerCase()}, not merged`,
    };
  }
  if ((observed.base?.trim() ?? "") !== opts.baseBranch) {
    return {
      prNumber: observed.prNumber,
      reason: `provider base mismatch: expected=${opts.baseBranch} observed=${observed.base ?? "-"}`,
    };
  }
  if (!observed.headSha?.trim() || observed.headSha.trim() !== opts.branchHead) {
    return {
      prNumber: observed.prNumber,
      reason: `provider head mismatch: local=${opts.branchHead} observed=${observed.headSha ?? "-"}`,
    };
  }
  const mergeCommit = observed.mergeCommit?.trim() ?? "";
  if (!mergeCommit || !(await gitIsAncestor(opts.gitRoot, mergeCommit, opts.baseBranch))) {
    return {
      prNumber: observed.prNumber,
      reason: `provider merge commit is not on ${opts.baseBranch}: ${mergeCommit || "-"}`,
    };
  }
  return { prNumber: observed.prNumber, reason: null };
}

async function targetedCleanupProof(opts: {
  gitRoot: string;
  workflowDir: string;
  baseBranch: string;
  taskId: string;
  branch: string;
  kind: CleanupBranchKind;
}): Promise<{
  proof: CleanupCandidate["proof"] | null;
  reason: string | null;
  expectedHeadSha: string;
}> {
  const branchHeadResult = await execFileAsync("git", ["rev-parse", opts.branch], {
    cwd: opts.gitRoot,
    env: gitEnv(),
  });
  const branchHead = branchHeadResult.stdout.trim();
  const result = (proof: CleanupCandidate["proof"] | null, reason: string | null) => ({
    proof,
    reason,
    expectedHeadSha: branchHead,
  });
  const meta = await readCleanupPrMetaIfPresent(opts);
  const metaBranch = meta?.branch?.trim() ?? "";
  const recordedPrNumber =
    metaBranch === opts.branch && Number.isInteger(meta?.pr_number) && Number(meta?.pr_number) > 0
      ? Number(meta?.pr_number)
      : null;
  const recordedHostedIdentity =
    metaBranch === opts.branch &&
    (recordedPrNumber !== null ||
      Boolean(meta?.pr_url?.trim()) ||
      meta?.status === "OPEN" ||
      meta?.status === "CLOSED" ||
      meta?.status === "MERGED");
  const providerResult = await observeProviderPr({
    gitRoot: opts.gitRoot,
    branch: opts.branch,
    baseBranch: opts.baseBranch,
    prNumber: recordedPrNumber,
  });
  const providerReceipt = await validateMergedProviderReceipt({
    gitRoot: opts.gitRoot,
    baseBranch: opts.baseBranch,
    branchHead,
    result: providerResult,
  });

  if (opts.kind === "task") {
    if (providerReceipt.reason) return result(null, providerReceipt.reason);
    const closureRecorded =
      providerReceipt.prNumber !== null &&
      (await taskPreMergeClosureRecordedOnBase({
        gitRoot: opts.gitRoot,
        workflowDir: opts.workflowDir,
        taskId: opts.taskId,
        baseBranch: opts.baseBranch,
        branch: opts.branch,
        prNumber: providerReceipt.prNumber,
      }));
    return closureRecorded
      ? result("provider_merge", null)
      : result(null, "exact pre-merge closure evidence is not recorded on base");
  }

  const closeRecorded = await taskCloseAlreadyRecordedOnBase({
    gitRoot: opts.gitRoot,
    workflowDir: opts.workflowDir,
    taskId: opts.taskId,
    baseBranch: opts.baseBranch,
  });
  if (!closeRecorded) return result(null, "task-close evidence is not recorded on base");
  if (providerResult.state === "found") {
    return providerReceipt.reason
      ? result(null, providerReceipt.reason)
      : result("provider_merge", null);
  }
  if (recordedHostedIdentity) return result(null, providerReceipt.reason);
  if (
    providerResult.state === "unavailable" &&
    !providerUnavailableBecauseRepositoryIsLocal(providerResult)
  ) {
    return result(null, providerReceipt.reason);
  }
  if (await gitTreesEquivalent(opts)) return result("tree_equivalent", null);
  if (await gitLinearPatchsetEquivalent(opts)) {
    return result("patch_equivalent", null);
  }
  return result(null, "provider-less task-close branch is not tree/patch equivalent to base");
}

export async function resolveCleanupPlan(opts: {
  ctx: CommandContext;
  gitRoot: string;
  workflowDir: string;
  baseBranch: string;
  taskIds?: readonly string[];
}): Promise<CleanupResolution> {
  const prefix = opts.ctx.config.branch.task_prefix;
  const closePrefix = opts.ctx.config.branch.task_close_prefix;
  const branches = await gitListBranchesByPrefixes(opts.gitRoot, [prefix, closePrefix]);
  const taskCache = new Map<string, TaskData | null>();
  const requestedTaskIds = new Set(
    (opts.taskIds ?? []).map((taskId) => taskId.trim()).filter(Boolean),
  );
  const targeted = requestedTaskIds.size > 0;
  const matchedTaskIds = new Set<string>();
  const candidates: CleanupCandidate[] = [];
  const blocked: CleanupBlockedCandidate[] = [];

  for (const branch of branches) {
    if (branch === opts.baseBranch) continue;
    const target = resolveCleanupBranchTaskId({ branch, prefix, closePrefix });
    if (!target || (targeted && !requestedTaskIds.has(target.taskId))) continue;
    matchedTaskIds.add(target.taskId);
    const worktreePath = await findWorktreeForBranch(opts.gitRoot, branch);
    let task = taskCache.get(target.taskId) ?? null;
    if (!taskCache.has(target.taskId)) {
      try {
        task = await loadTaskFromContext({ ctx: opts.ctx, taskId: target.taskId });
      } catch {
        task = null;
      }
      taskCache.set(target.taskId, task);
    }
    if (!task) {
      if (targeted) {
        blocked.push({
          taskId: target.taskId,
          branch,
          worktreePath,
          reason: "task artifact is missing",
        });
      }
      continue;
    }
    const status = normalizeTaskStatus(task.status);
    if (status !== "DONE") {
      if (targeted) {
        blocked.push({
          taskId: target.taskId,
          branch,
          worktreePath,
          reason: `task status is ${status}, not DONE`,
        });
      }
      continue;
    }
    if (targeted) {
      const proof = await targetedCleanupProof({
        gitRoot: opts.gitRoot,
        workflowDir: opts.workflowDir,
        baseBranch: opts.baseBranch,
        taskId: target.taskId,
        branch,
        kind: target.kind,
      });
      if (proof.proof) {
        candidates.push({
          taskId: target.taskId,
          branch,
          worktreePath,
          expectedHeadSha: proof.expectedHeadSha,
          proof: proof.proof,
        });
      } else {
        blocked.push({
          taskId: target.taskId,
          branch,
          worktreePath,
          reason: proof.reason ?? "merged identity could not be proven",
        });
      }
      continue;
    }
    const diff = await gitDiffNames(opts.gitRoot, opts.baseBranch, branch);
    const lifecycleProof = await taskLifecycleProofOnBase({
      gitRoot: opts.gitRoot,
      workflowDir: opts.workflowDir,
      baseBranch: opts.baseBranch,
      task,
      taskId: target.taskId,
    });
    if (diff.length === 0 || lifecycleProof) {
      candidates.push({
        taskId: target.taskId,
        branch,
        worktreePath,
        expectedHeadSha: null,
        proof: lifecycleProof ?? "branch_diff_empty",
      });
    }
  }

  if (targeted) {
    for (const taskId of requestedTaskIds) {
      if (matchedTaskIds.has(taskId)) continue;
      let task = taskCache.get(taskId) ?? null;
      if (!taskCache.has(taskId)) {
        try {
          task = await loadTaskFromContext({ ctx: opts.ctx, taskId });
        } catch {
          task = null;
        }
        taskCache.set(taskId, task);
      }
      const status = task ? normalizeTaskStatus(task.status) : null;
      if (!task || status !== "DONE") {
        blocked.push({
          taskId,
          branch: "-",
          worktreePath: null,
          reason: task ? `task status is ${status}, not DONE` : "task artifact is missing",
        });
      }
    }
  }
  return { candidates, blocked, matchedTaskIds };
}
