import { findWorktreeForBranch } from "@agentplaneorg/core/git";

import type { PrFlowStatusReport } from "../pr/flow-status.js";
import type { TaskResumeContext } from "../task/handoff.shared.js";
import { isSameBranchIdentity, normalizeBranchIdentity } from "./branch-identity.js";
import type { TaskRouteDecision } from "./route-decision-types.js";

export function deriveRouteCheckoutRole(
  resume: TaskResumeContext,
): TaskRouteDecision["workspace"]["checkoutRole"] {
  if (!resume.branch || !resume.base_branch) return "unknown";
  return isSameBranchIdentity(resume.branch, resume.base_branch) ? "base" : "task_worktree";
}

export async function findRouteWorktreePath(
  cwd: string,
  branch: string | null,
): Promise<string | null> {
  if (!branch) return null;
  const exact = await findWorktreeForBranch(cwd, branch);
  if (exact) return exact;
  const normalized = normalizeBranchIdentity(branch);
  return normalized === branch ? null : await findWorktreeForBranch(cwd, normalized);
}

export function inferTaskRouteBranch(
  resume: TaskResumeContext,
  prFlow: PrFlowStatusReport | null,
): string | null {
  if (prFlow?.branch.name) return prFlow.branch.name;
  if (resume.pr_branch) return resume.pr_branch;
  if (
    resume.branch &&
    resume.base_branch &&
    !isSameBranchIdentity(resume.branch, resume.base_branch)
  ) {
    return resume.branch;
  }
  return null;
}
