import { readFile } from "node:fs/promises";
import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import {
  findWorktreeForBranch,
  gitProofDiffNames,
  gitProofEnv,
  gitListBranchesByPrefixes,
  parseTaskIdFromBranch,
  parseTaskIdFromCloseBranch,
} from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";
import { normalizeTaskStatus } from "@agentplaneorg/core/tasks";

import {
  gitCommitObjectExists,
  gitProofIsAncestor,
  isCanonicalFullCommitOid,
} from "../shared/git-ops.js";
import { parsePrMeta, readPreMergeClosureMarker } from "../shared/pr-meta.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import {
  taskCloseAlreadyRecordedOnBase,
  taskPreMergeClosureRecordedOnBase,
} from "../task/close-tail-state.js";

import {
  observeProviderPr,
  resolveProviderReconciliation,
  validateMergedProviderReceipt,
  type ProviderReconciliationProof,
} from "./cleanup-merged-provider-reconciliation.js";
import type { GithubPrLookupResult } from "../pr/internal/sync-github.js";

export type { ProviderReconciliationProof } from "./cleanup-merged-provider-reconciliation.js";

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
    | "provider_merge"
    | "provider_rebase";
  providerReconciliation?: ProviderReconciliationProof;
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
  if (
    isCanonicalFullCommitOid(taskCommitHash) &&
    (await gitCommitObjectExists(opts.gitRoot, taskCommitHash)) &&
    (await gitProofIsAncestor(opts.gitRoot, taskCommitHash, opts.baseBranch))
  ) {
    return "task_commit_on_base";
  }
  const meta = await readCleanupPrMetaIfPresent(opts);
  const mergeCommit = meta?.status === "MERGED" ? (meta.merge_commit?.trim() ?? "") : "";
  return isCanonicalFullCommitOid(mergeCommit) &&
    (await gitCommitObjectExists(opts.gitRoot, mergeCommit)) &&
    (await gitProofIsAncestor(opts.gitRoot, mergeCommit, opts.baseBranch))
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
      env: gitProofEnv(),
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
    { cwd: opts.gitRoot, env: gitProofEnv() },
  );
  if (mergeCommits.trim()) return false;
  const { stdout } = await execFileAsync("git", ["cherry", opts.baseBranch, opts.branch], {
    cwd: opts.gitRoot,
    env: gitProofEnv(),
  });
  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .every((line) => line.startsWith("- "));
}

function blockedCleanupProof(reason: string) {
  return {
    proof: null,
    reason,
    expectedHeadSha: "",
    providerReconciliation: null,
  };
}

function providerUnavailableBecauseRepositoryIsLocal(result: GithubPrLookupResult): boolean {
  return (
    result.state === "unavailable" &&
    result.reason === "origin is unavailable or is not a GitHub repository"
  );
}

async function targetedCleanupProof(opts: {
  gitRoot: string;
  workflowDir: string;
  baseBranch: string;
  taskId: string;
  taskCommitSha: string;
  branch: string;
  kind: CleanupBranchKind;
  expectedReconciliation?: ProviderReconciliationProof;
}): Promise<{
  proof: CleanupCandidate["proof"] | null;
  reason: string | null;
  expectedHeadSha: string;
  providerReconciliation: ProviderReconciliationProof | null;
}> {
  const meta = await readCleanupPrMetaIfPresent(opts);
  const marker = opts.kind === "task" ? readPreMergeClosureMarker(meta) : null;
  const taskCommitIdentityReason =
    opts.kind === "task" && !isCanonicalFullCommitOid(opts.taskCommitSha)
      ? `task commit must be a canonical full commit OID: ${opts.taskCommitSha || "-"}`
      : null;
  const closureBasisIdentityReason =
    opts.kind === "task" && marker && !isCanonicalFullCommitOid(marker.basisCommit)
      ? `pre-merge closure basis must be a canonical full commit OID: ${marker.basisCommit || "-"}`
      : null;
  if (taskCommitIdentityReason) return blockedCleanupProof(taskCommitIdentityReason);
  if (opts.kind === "task" && !marker) {
    return blockedCleanupProof("exact pre-merge closure marker is unavailable");
  }
  if (closureBasisIdentityReason) return blockedCleanupProof(closureBasisIdentityReason);
  if (opts.kind === "task") {
    if (!(await gitCommitObjectExists(opts.gitRoot, opts.taskCommitSha))) {
      return blockedCleanupProof(
        `task commit object is unavailable locally: ${opts.taskCommitSha}`,
      );
    }
    if (!(await gitCommitObjectExists(opts.gitRoot, marker?.basisCommit ?? ""))) {
      return blockedCleanupProof(
        `pre-merge closure basis object is unavailable locally: ${marker?.basisCommit ?? "-"}`,
      );
    }
  }
  const branchHeadResult = await execFileAsync("git", ["rev-parse", opts.branch], {
    cwd: opts.gitRoot,
    env: gitProofEnv(),
  });
  const branchHead = branchHeadResult.stdout.trim();
  const result = (
    proof: CleanupCandidate["proof"] | null,
    reason: string | null,
    providerReconciliation: ProviderReconciliationProof | null = null,
  ) => ({
    proof,
    reason,
    expectedHeadSha: branchHead,
    providerReconciliation,
  });
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
    expectedPrNumber: recordedPrNumber,
    expectedReconciliation: opts.expectedReconciliation,
    result: providerResult,
  });

  if (opts.kind === "task") {
    if (recordedPrNumber === null) {
      return result(null, "exact task PR identity is unavailable from metadata");
    }
    if (providerReceipt.reason || !providerReceipt.receipt) {
      return result(null, providerReceipt.reason ?? "provider merge receipt is unavailable");
    }
    const closureRecorded = await taskPreMergeClosureRecordedOnBase({
      gitRoot: opts.gitRoot,
      workflowDir: opts.workflowDir,
      taskId: opts.taskId,
      baseBranch: opts.baseBranch,
      branch: opts.branch,
      prNumber: providerReceipt.receipt.prNumber,
    });
    if (!closureRecorded) {
      return result(null, "exact pre-merge closure evidence is not recorded on base");
    }
    const reconciliation = await resolveProviderReconciliation({
      gitRoot: opts.gitRoot,
      taskId: opts.taskId,
      branch: opts.branch,
      baseBranch: opts.baseBranch,
      taskCommitSha: opts.taskCommitSha,
      branchHead,
      closureBasisCommit: marker?.basisCommit ?? "",
      receipt: providerReceipt.receipt,
    });
    if (!reconciliation.proof) {
      return result(null, reconciliation.reason ?? "provider reconciliation proof is unavailable");
    }
    return result(
      reconciliation.proof.kind === "exact_head" ? "provider_merge" : "provider_rebase",
      null,
      reconciliation.proof,
    );
  }

  const closeRecorded = await taskCloseAlreadyRecordedOnBase({
    gitRoot: opts.gitRoot,
    workflowDir: opts.workflowDir,
    taskId: opts.taskId,
    baseBranch: opts.baseBranch,
  });
  if (!closeRecorded) return result(null, "task-close evidence is not recorded on base");
  if (providerResult.state === "found") {
    return providerReceipt.reason || !providerReceipt.receipt
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

function sameProviderReconciliation(
  left: ProviderReconciliationProof,
  right: ProviderReconciliationProof,
): boolean {
  return (
    left.kind === right.kind &&
    left.taskId === right.taskId &&
    left.branch === right.branch &&
    left.baseBranch === right.baseBranch &&
    left.prNumber === right.prNumber &&
    left.taskCommitSha === right.taskCommitSha &&
    left.localHeadSha === right.localHeadSha &&
    left.providerHeadSha === right.providerHeadSha &&
    left.mergeCommit === right.mergeCommit &&
    left.closureBasisCommit === right.closureBasisCommit
  );
}

export async function revalidateCleanupCandidate(opts: {
  gitRoot: string;
  workflowDir: string;
  baseBranch: string;
  candidate: CleanupCandidate;
}): Promise<string | null> {
  const expected = opts.candidate.providerReconciliation;
  if (!expected) return null;
  const proof = await targetedCleanupProof({
    gitRoot: opts.gitRoot,
    workflowDir: opts.workflowDir,
    baseBranch: opts.baseBranch,
    taskId: opts.candidate.taskId,
    taskCommitSha: expected.taskCommitSha,
    branch: opts.candidate.branch,
    kind: "task",
    expectedReconciliation: expected,
  });
  if (!proof.proof || !proof.providerReconciliation) {
    return (
      proof.reason ?? "provider reconciliation proof is unavailable during cleanup revalidation"
    );
  }
  if (!sameProviderReconciliation(expected, proof.providerReconciliation)) {
    return "provider reconciliation changed after proof";
  }
  if (proof.expectedHeadSha !== opts.candidate.expectedHeadSha) {
    return (
      "local task branch head changed after provider reconciliation proof: " +
      `expected=${opts.candidate.expectedHeadSha ?? "-"} observed=${proof.expectedHeadSha}`
    );
  }
  return null;
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
        taskCommitSha: task.commit?.hash?.trim() ?? "",
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
          ...(proof.providerReconciliation
            ? { providerReconciliation: proof.providerReconciliation }
            : {}),
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
    const diff = await gitProofDiffNames(opts.gitRoot, opts.baseBranch, branch);
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
