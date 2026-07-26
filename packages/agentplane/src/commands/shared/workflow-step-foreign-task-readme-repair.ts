import type { WorkflowOperationSpec, WorkflowPostcondition } from "./workflow-step.js";

export function foreignTaskReadmeReplicaRepairOperation(
  routeRecomputed: WorkflowPostcondition,
): Record<"flow.repair.foreign_task_readme", WorkflowOperationSpec> {
  return {
    "flow.repair.foreign_task_readme": {
      type: "workflow_repair",
      phase: "task_worktree_foreign_artifact_repair",
      checkout: "task_worktree",
      role: "CODER",
      expectedPostconditions: [routeRecomputed],
      mustNot: [
        "do not remove any path unless flow repair re-proves one foreign untracked README replica immediately before removal",
        "do not apply this repair to active-task, modified, symlinked, unknown, or mixed worktree artifacts",
      ],
      triggersGitHooks: false,
      verificationCandidate: null,
      needsVerificationRecord: false,
    },
  };
}
