import { POSTCONDITION } from "./workflow-postconditions.js";

export type BaseSyncParams = {
  taskId: string;
  branch: string;
  baseBranch: string;
  expectedHeadSha: string;
  expectedBaseSha: string;
};

export const BASE_SYNC_SPEC = {
  type: "task_branch_base_sync",
  phase: "task_branch_base_sync",
  checkout: "task_worktree",
  role: "CODER",
  expectedPostconditions: [POSTCONDITION.taskBranchContainsBase, POSTCONDITION.routeRecomputed],
  mustNot: [
    "do not rebase, force-push, select conflict hunks, or replace the exact plan-bound base SHA",
  ],
  triggersGitHooks: true,
  verificationCandidate: null,
  needsVerificationRecord: false,
} as const;
