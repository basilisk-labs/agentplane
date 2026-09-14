import {
  computeReadyWorkItems,
  taskCentricAggregateFromExtensions,
} from "@agentplaneorg/core/tasks";
import { execFileAsync } from "@agentplaneorg/core/process";

import type { TaskData } from "../../backends/task-backend.js";
import type { TaskWorktreeCleanliness } from "./task-worktree-cleanliness.js";

const BRANCH_BASE_RESOURCE = /^branch-base:([^\s@]+)@([a-f0-9]{40}|[a-f0-9]{64})$/u;

type BranchBaseSyncIdentity = {
  workItemId: string;
  branch: string;
  baseBranch: string;
  expectedHeadSha: string;
  expectedBaseSha: string;
};

export type BranchBaseSyncObservation =
  | { state: "not_requested" }
  | ({ state: "waiting_for_worktree" } & Omit<BranchBaseSyncIdentity, "branch" | "expectedHeadSha">)
  | ({ state: "satisfied" } & BranchBaseSyncIdentity)
  | ({ state: "ready" } & BranchBaseSyncIdentity)
  | { state: "invalid"; workItemId: string; reason: string }
  | { state: "unavailable"; workItemId: string; reason: string };

function requestedResource(
  task: TaskData,
):
  | { state: "not_requested" }
  | { state: "invalid"; workItemId: string; reason: string }
  | { state: "requested"; workItemId: string; baseBranch: string; expectedBaseSha: string } {
  const aggregate = taskCentricAggregateFromExtensions(task.extensions);
  const plan = aggregate?.current_plan;
  if (!aggregate || !plan) return { state: "not_requested" };
  const readyIds = new Set(
    computeReadyWorkItems({
      graph: plan.proposal.work_items,
      runtime: aggregate.work_items,
    })
      .filter((item) => item.ready)
      .map((item) => item.work_item_id),
  );
  const requests = plan.proposal.work_items.work_items.flatMap((item) =>
    readyIds.has(item.id)
      ? item.resource_claims
          .filter((claim) => claim.resource.startsWith("branch-base:"))
          .map((claim) => ({ item, claim }))
      : [],
  );
  if (requests.length > 1) {
    return {
      state: "invalid",
      workItemId: requests[0]!.item.id,
      reason: "ready WorkItems contain more than one branch-base resource claim",
    };
  }
  for (const { item, claim } of requests) {
    if (claim.kind !== "exclusive" || claim.mode !== "exclusive") {
      return {
        state: "invalid",
        workItemId: item.id,
        reason: "ready WorkItem branch-base resource claim must be exclusive",
      };
    }
    const match = BRANCH_BASE_RESOURCE.exec(claim.resource);
    if (!match) {
      return {
        state: "invalid",
        workItemId: item.id,
        reason: "branch-base resource must be branch-base:<base-ref>@<full-sha>",
      };
    }
    return {
      state: "requested",
      workItemId: item.id,
      baseBranch: match[1]!,
      expectedBaseSha: match[2]!,
    };
  }
  return { state: "not_requested" };
}

async function revParse(root: string, ref: string): Promise<string> {
  const result = await execFileAsync("git", ["rev-parse", "--verify", `${ref}^{commit}`], {
    cwd: root,
  });
  return result.stdout.trim();
}

async function isAncestor(root: string, ancestor: string, descendant: string): Promise<boolean> {
  try {
    await execFileAsync("git", ["merge-base", "--is-ancestor", ancestor, descendant], {
      cwd: root,
    });
    return true;
  } catch (error) {
    if ((error as { exitCode?: unknown } | null)?.exitCode === 1) return false;
    throw error;
  }
}

export async function observeBranchBaseSync(opts: {
  gitRoot: string;
  task: TaskData;
  configuredBaseBranch: string | null;
  taskWorktree: TaskWorktreeCleanliness;
}): Promise<BranchBaseSyncObservation> {
  const request = requestedResource(opts.task);
  if (request.state !== "requested") return request;
  if (request.baseBranch !== opts.configuredBaseBranch) {
    return {
      state: "invalid",
      workItemId: request.workItemId,
      reason:
        `requested base ${request.baseBranch} does not equal configured task base ` +
        `${opts.configuredBaseBranch ?? "<unknown>"}`,
    };
  }
  if (
    opts.taskWorktree.state === "not_present" ||
    opts.taskWorktree.state === "unavailable" ||
    !opts.taskWorktree.worktreePath
  ) {
    return {
      state: "waiting_for_worktree",
      workItemId: request.workItemId,
      baseBranch: request.baseBranch,
      expectedBaseSha: request.expectedBaseSha,
    };
  }
  try {
    const [expectedHeadSha, observedBaseSha] = await Promise.all([
      revParse(opts.gitRoot, opts.taskWorktree.branch),
      revParse(opts.gitRoot, request.baseBranch),
    ]);
    if (observedBaseSha !== request.expectedBaseSha) {
      return {
        state: "invalid",
        workItemId: request.workItemId,
        reason:
          `requested base SHA ${request.expectedBaseSha} does not equal current ` +
          `${request.baseBranch} ${observedBaseSha}`,
      };
    }
    const identity = {
      workItemId: request.workItemId,
      branch: opts.taskWorktree.branch,
      baseBranch: request.baseBranch,
      expectedHeadSha,
      expectedBaseSha: request.expectedBaseSha,
    };
    return (await isAncestor(opts.gitRoot, request.expectedBaseSha, expectedHeadSha))
      ? { state: "satisfied", ...identity }
      : { state: "ready", ...identity };
  } catch (error) {
    return {
      state: "unavailable",
      workItemId: request.workItemId,
      reason: error instanceof Error ? error.message : String(error),
    };
  }
}
