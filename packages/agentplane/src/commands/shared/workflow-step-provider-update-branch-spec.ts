import { POSTCONDITION } from "./workflow-postconditions.js";

// Keep this leaf free of workflow-step and workflow-step-factory imports to preserve dependency direction.
export const PROVIDER_UPDATE_BRANCH_OPERATION_SPEC = {
  type: "provider_update_branch",
  phase: "provider_pr_update_branch_required",
  checkout: "task_worktree",
  role: "INTEGRATOR",
  expectedPostconditions: [
    POSTCONDITION.providerBranchUpdated,
    POSTCONDITION.providerObserved,
    POSTCONDITION.routeRecomputed,
  ],
  mustNot: [
    "do not update a different PR, branch, base, provider identity, or head than the exact approved operation",
    "do not repeat an effect-in-doubt update; reconcile fresh provider ancestry before another mutation",
    "do not merge, rebase, force-push, or edit AgentPlane task state as a substitute for provider update-branch",
  ],
  triggersGitHooks: false,
  verificationCandidate: "agentplane task next-action <task-id> --remote --explain",
  needsVerificationRecord: false,
} as const;
