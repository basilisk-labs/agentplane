import { findWorktreeForBranch, gitRevParse, listWorktrees } from "@agentplaneorg/core/git";

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
  if (normalized !== branch) return await findWorktreeForBranch(cwd, normalized);
  if (!/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/u.test(branch)) return null;
  const matches: string[] = [];
  for (const worktree of await listWorktrees(cwd)) {
    const head = await gitRevParse(worktree.path, ["HEAD^{commit}"]).catch(() => null);
    if (head === branch) matches.push(worktree.path);
  }
  return matches.length === 1 ? matches[0]! : null;
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
