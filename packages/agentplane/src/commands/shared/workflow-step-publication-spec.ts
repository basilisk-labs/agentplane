import type { WorkflowOperationSpec } from "./workflow-step.js";
import { POSTCONDITION } from "./workflow-postconditions.js";

export const CANDIDATE_PUBLICATION_SPEC = {
  type: "pr_sync",
  phase: "candidate_publication",
  checkout: "current_checkout",
  role: "CODER",
  expectedPostconditions: [POSTCONDITION.candidateRefPublished],
  mustNot: ["Do not commit, force-push, merge, integrate, or complete the task."],
  triggersGitHooks: true,
  verificationCandidate: null,
  needsVerificationRecord: false,
} satisfies WorkflowOperationSpec;

export const PR_HEAD_PUBLICATION_SPEC = {
  type: "pr_sync",
  phase: "pr_head_publication_needed",
  checkout: "task_worktree",
  role: "CODER",
  expectedPostconditions: [POSTCONDITION.remotePrAligned, POSTCONDITION.routeRecomputed],
  mustNot: [
    "do not push or relink the hosted PR manually; agentplane pr open owns final branch publication and PR head alignment",
    "do not rebase, merge, force-push, or select conflict hunks while publishing the guarded branch head",
  ],
  triggersGitHooks: true,
  verificationCandidate: "agentplane pr flow status <task-id>",
  needsVerificationRecord: false,
} satisfies WorkflowOperationSpec;
