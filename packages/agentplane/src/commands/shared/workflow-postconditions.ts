export type WorkflowPostconditionId =
  | "base_checkout_synced"
  | "hosted_close_pr_open"
  | "included_batch_closure_reconciled"
  | "integration_queue_contains_task"
  | "pr_artifacts_current"
  | "provider_state_observed"
  | "remote_pr_head_aligned"
  | "remote_pr_linked"
  | "route_state_recomputed"
  | "runner_state_observed"
  | "task_artifacts_committed"
  | "task_brief_loaded"
  | "task_status_done"
  | "task_status_doing"
  | "task_worktree_absent"
  | "task_worktree_present"
  | "pre_merge_closure_recorded";

export type WorkflowPostcondition = {
  id: WorkflowPostconditionId;
  subject: "base" | "provider" | "route" | "runner" | "task";
  expected: string;
};

export const POSTCONDITION = {
  routeRecomputed: {
    id: "route_state_recomputed",
    subject: "route",
    expected: "route state is recomputed before another mutation",
  },
  taskArtifactsCommitted: {
    id: "task_artifacts_committed",
    subject: "task",
    expected: "tracked task artifacts are committed",
  },
  taskDoing: {
    id: "task_status_doing",
    subject: "task",
    expected: "task status is DOING",
  },
  taskDone: {
    id: "task_status_done",
    subject: "task",
    expected: "task status is DONE",
  },
  worktreePresent: {
    id: "task_worktree_present",
    subject: "task",
    expected: "one dedicated task worktree is present",
  },
  remotePrLinked: {
    id: "remote_pr_linked",
    subject: "provider",
    expected: "task branch is linked to one remote PR",
  },
  remotePrAligned: {
    id: "remote_pr_head_aligned",
    subject: "provider",
    expected: "remote PR head equals the task branch head",
  },
  prArtifactsCurrent: {
    id: "pr_artifacts_current",
    subject: "task",
    expected: "PR artifacts describe the current task branch head",
  },
  providerObserved: {
    id: "provider_state_observed",
    subject: "provider",
    expected: "provider state has a fresh observation",
  },
  preMergeClosure: {
    id: "pre_merge_closure_recorded",
    subject: "task",
    expected: "pre-merge closure is recorded for the current task head",
  },
  integrationQueued: {
    id: "integration_queue_contains_task",
    subject: "task",
    expected: "integration queue contains the exact task branch head",
  },
  hostedCloseOpen: {
    id: "hosted_close_pr_open",
    subject: "provider",
    expected: "hosted close PR is open or already merged",
  },
  worktreeAbsent: {
    id: "task_worktree_absent",
    subject: "task",
    expected: "merged task worktree and branch cleanup candidates are absent",
  },
  baseSynced: {
    id: "base_checkout_synced",
    subject: "base",
    expected: "base checkout contains hosted task closure truth",
  },
  batchReconciled: {
    id: "included_batch_closure_reconciled",
    subject: "task",
    expected: "included task has structured landed closure evidence",
  },
  taskBriefLoaded: {
    id: "task_brief_loaded",
    subject: "task",
    expected: "primary batch task context is loaded",
  },
  runnerObserved: {
    id: "runner_state_observed",
    subject: "runner",
    expected: "runner state is observed after the operation",
  },
} as const satisfies Record<string, WorkflowPostcondition>;
