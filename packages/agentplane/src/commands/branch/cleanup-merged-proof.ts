import { readFile } from "node:fs/promises";
import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import {
  findWorktreeForBranch,
  gitProofDiffNames,
  gitListBranchesByPrefixes,
  parseTaskIdFromBranch,
  parseTaskIdFromCloseBranch,
} from "@agentplaneorg/core/git";
import { normalizeTaskStatus } from "@agentplaneorg/core/tasks";

import {
  gitCommitObjectExists,
  gitProofIsAncestor,
  isCanonicalFullCommitOid,
} from "../shared/git-ops.js";
import { parsePrMeta } from "../shared/pr-meta.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import type { ProviderReconciliationProof } from "./cleanup-merged-provider-reconciliation.js";
import { targetedCleanupProof } from "./cleanup-merged-targeted-proof.js";

export { revalidateCleanupCandidate } from "./cleanup-merged-targeted-proof.js";

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
