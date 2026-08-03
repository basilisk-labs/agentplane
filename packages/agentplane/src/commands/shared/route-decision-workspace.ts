import { findWorktreeForBranch } from "@agentplaneorg/core/git";

import type { PrFlowStatusReport } from "../pr/flow-status.js";
import type { TaskResumeContext } from "../task/handoff.shared.js";
import type { TaskRouteDecision } from "./route-decision-types.js";

export function deriveRouteCheckoutRole(
  resume: TaskResumeContext,
): TaskRouteDecision["workspace"]["checkoutRole"] {
  if (!resume.branch || !resume.base_branch) return "unknown";
  return resume.branch === resume.base_branch ? "base" : "task_worktree";
}

export async function findRouteWorktreePath(
  cwd: string,
  branch: string | null,
): Promise<string | null> {
  if (!branch) return null;
  return findWorktreeForBranch(cwd, branch).catch(() => null);
}

export function inferTaskRouteBranch(
  resume: TaskResumeContext,
  prFlow: PrFlowStatusReport | null,
): string | null {
  if (prFlow?.branch.name) return prFlow.branch.name;
  if (resume.pr_branch) return resume.pr_branch;
  if (resume.branch && resume.base_branch && resume.branch !== resume.base_branch) {
    return resume.branch;
  }
  return null;
}
