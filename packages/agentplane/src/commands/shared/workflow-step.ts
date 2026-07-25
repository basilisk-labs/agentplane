import type { StateFingerprint } from "@agentplaneorg/core/schemas";

import type { TaskData } from "../../backends/task-backend.js";
import type { PrFlowStatusReport } from "../pr/flow-status.js";
import type { TaskResumeContext } from "../task/handoff.shared.js";
import type { RouteBatchOwnership } from "./route-batch-ownership.js";
import type { RouteCleanupProbe, RouteNextAction } from "./route-decision-types.js";
import type { RouteBlocker, RouteExecutionPacket, RouteOracle } from "./route-oracle.js";
import type { TaskWorktreeCleanliness } from "./task-worktree-cleanliness.js";

export type WorkflowRole = RouteExecutionPacket["recommendedRole"];
export type WorkflowCheckout = RouteOracle["authoritativeCheckout"];

export type WorkflowRouteState = {
  task: TaskData;
  resume: TaskResumeContext;
  workflowMode: string;
  prFlow: PrFlowStatusReport | null;
  cleanupProbe: RouteCleanupProbe;
  blockers: readonly RouteBlocker[];
  batchOwnership: RouteBatchOwnership;
  taskWorktree?: TaskWorktreeCleanliness;
  preconditionFingerprint: StateFingerprint;
};

type WorkflowPostconditionId =
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

type WorkflowPostcondition = {
  id: WorkflowPostconditionId;
  subject: "base" | "provider" | "route" | "runner" | "task";
  expected: string;
};

type WorkflowOperationType =
  | "batch_reconcile"
  | "cleanup"
  | "hosted_close_prepare"
  | "integration_enqueue"
  | "pr_sync"
  | "provider_refresh"
  | "runner_follow"
  | "task_record_result"
  | "task_start"
  | "task_view"
  | "worktree_prepare";

export type WorkflowOperationId =
  | "batch.collect_included"
  | "batch.follow_primary"
  | "batch.reconcile_included"
  | "integration.enqueue"
  | "pr.artifacts.update"
  | "pr.head.publish"
  | "pr.open"
  | "pr.sync_or_verify"
  | "provider.pr.refresh"
  | "route.remote.refresh"
  | "runner.follow"
  | "task.artifacts.commit"
  | "task.branch.start"
  | "task.hosted_close.open"
  | "task.hosted_close.finalize"
  | "task.pre_merge_close"
  | "task.start"
  | "task.verify.show"
  | "task.worktree.cleanup"
  | "worktree.prepare";

export type WorkflowOperationParams = {
  "batch.collect_included": { taskId: string };
  "batch.follow_primary": { taskId: string };
  "batch.reconcile_included": { taskId: string };
  "integration.enqueue": { taskId: string; branch: string };
  "pr.artifacts.update": { taskId: string; includeTaskIds: readonly string[] };
  "pr.head.publish": {
    taskId: string;
    author: string;
    includeTaskIds: readonly string[];
  };
  "pr.open": { taskId: string; author: string; includeTaskIds: readonly string[] };
  "pr.sync_or_verify": { taskId: string; includeTaskIds: readonly string[] };
  "provider.pr.refresh": { taskId: string };
  "route.remote.refresh": { taskId: string };
  "runner.follow":
    | { mode: "reclaim"; taskId: string; author: string; reason: string }
    | { mode: "status"; taskId: string; runId: string | null }
    | { mode: "verify"; taskId: string }
    | { mode: "run"; taskId: string };
  "task.artifacts.commit": { taskId: string };
  "task.branch.start": { taskId: string; author: string; body: string };
  "task.hosted_close.open": { taskId: string };
  "task.hosted_close.finalize": { taskId: string; base: string };
  "task.pre_merge_close": {
    taskId: string;
    author: string;
    body: string;
    result: string;
    commit: string;
    force: boolean;
  };
  "task.start": { taskId: string; author: string; body: string };
  "task.verify.show": { taskId: string };
  "task.worktree.cleanup": { taskId: string; base: string };
  "worktree.prepare": { taskId: string; agent: string; slug: string };
};

type WorkflowOperationSpec = {
  type: WorkflowOperationType;
  phase: string;
  checkout: WorkflowCheckout;
  role: WorkflowRole;
  expectedPostconditions: readonly WorkflowPostcondition[];
  mustNot: readonly string[];
  triggersGitHooks: boolean;
  verificationCandidate: string | null;
  needsVerificationRecord: boolean;
};

const POSTCONDITION = {
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

const PR_AUTOMATION_GUARD = [
  "do not repair stale PR artifacts with manual edits or amend commits; agentplane pr update/pr check own PR artifact freshness",
] as const;

export const WORKFLOW_OPERATION_REGISTRY = {
  "task.artifacts.commit": {
    type: "task_record_result",
    phase: "direct_done_pending_artifact_commit",
    checkout: "current_checkout",
    role: "CODER",
    expectedPostconditions: [POSTCONDITION.taskArtifactsCommitted, POSTCONDITION.routeRecomputed],
    mustNot: [],
    triggersGitHooks: true,
    verificationCandidate: null,
    needsVerificationRecord: false,
  },
  "task.start": {
    type: "task_start",
    phase: "direct_execution",
    checkout: "current_checkout",
    role: "CODER",
    expectedPostconditions: [POSTCONDITION.taskDoing, POSTCONDITION.routeRecomputed],
    mustNot: [],
    triggersGitHooks: false,
    verificationCandidate: null,
    needsVerificationRecord: false,
  },
  "task.branch.start": {
    type: "task_start",
    phase: "branch_execution",
    checkout: "task_worktree",
    role: "CODER",
    expectedPostconditions: [POSTCONDITION.taskDoing, POSTCONDITION.routeRecomputed],
    mustNot: [],
    triggersGitHooks: false,
    verificationCandidate: null,
    needsVerificationRecord: false,
  },
  "task.verify.show": {
    type: "task_view",
    phase: "direct_execution",
    checkout: "current_checkout",
    role: "CODER",
    expectedPostconditions: [POSTCONDITION.routeRecomputed],
    mustNot: [],
    triggersGitHooks: false,
    verificationCandidate: null,
    needsVerificationRecord: false,
  },
  "runner.follow": {
    type: "runner_follow",
    phase: "direct_execution",
    checkout: "current_checkout",
    role: "CODER",
    expectedPostconditions: [POSTCONDITION.runnerObserved, POSTCONDITION.routeRecomputed],
    mustNot: [
      "do not infer local lifecycle authority from runner output alone; inspect the durable runner state",
    ],
    triggersGitHooks: false,
    verificationCandidate: null,
    needsVerificationRecord: false,
  },
  "batch.follow_primary": {
    type: "task_view",
    phase: "batch_delegate",
    checkout: "primary_task_worktree",
    role: "CODER",
    expectedPostconditions: [POSTCONDITION.taskBriefLoaded, POSTCONDITION.routeRecomputed],
    mustNot: [],
    triggersGitHooks: false,
    verificationCandidate: null,
    needsVerificationRecord: false,
  },
  "batch.collect_included": {
    type: "task_view",
    phase: "batch_collect_verification",
    checkout: "primary_task_worktree",
    role: "CODER",
    expectedPostconditions: [POSTCONDITION.taskBriefLoaded, POSTCONDITION.routeRecomputed],
    mustNot: [
      "do not publish, close, or queue the primary PR until every included task has verification state ok",
    ],
    triggersGitHooks: false,
    verificationCandidate: null,
    needsVerificationRecord: false,
  },
  "batch.reconcile_included": {
    type: "batch_reconcile",
    phase: "included_task_closure_needed",
    checkout: "base_checkout",
    role: "INTEGRATOR",
    expectedPostconditions: [
      POSTCONDITION.batchReconciled,
      POSTCONDITION.taskDone,
      POSTCONDITION.routeRecomputed,
    ],
    mustNot: [],
    triggersGitHooks: false,
    verificationCandidate: null,
    needsVerificationRecord: false,
  },
  "worktree.prepare": {
    type: "worktree_prepare",
    phase: "worktree_needed",
    checkout: "base_checkout",
    role: "CODER",
    expectedPostconditions: [POSTCONDITION.worktreePresent, POSTCONDITION.routeRecomputed],
    mustNot: [],
    triggersGitHooks: false,
    verificationCandidate: null,
    needsVerificationRecord: false,
  },
  "pr.artifacts.update": {
    type: "pr_sync",
    phase: "pr_artifacts_stale",
    checkout: "task_worktree",
    role: "CODER",
    expectedPostconditions: [POSTCONDITION.prArtifactsCurrent, POSTCONDITION.routeRecomputed],
    mustNot: PR_AUTOMATION_GUARD,
    triggersGitHooks: true,
    verificationCandidate: "agentplane pr check <task-id>",
    needsVerificationRecord: false,
  },
  "pr.open": {
    type: "pr_sync",
    phase: "pr_needed",
    checkout: "task_worktree",
    role: "CODER",
    expectedPostconditions: [
      POSTCONDITION.remotePrLinked,
      POSTCONDITION.remotePrAligned,
      POSTCONDITION.routeRecomputed,
    ],
    mustNot: [
      "do not create/link the hosted PR manually; agentplane pr open owns branch publish, PR artifacts, and PR creation/linking",
    ],
    triggersGitHooks: true,
    verificationCandidate: null,
    needsVerificationRecord: false,
  },
  "pr.head.publish": {
    type: "pr_sync",
    phase: "pr_head_publication_needed",
    checkout: "task_worktree",
    role: "CODER",
    expectedPostconditions: [POSTCONDITION.remotePrAligned, POSTCONDITION.routeRecomputed],
    mustNot: [
      "do not push or relink the hosted PR manually; agentplane pr open owns final branch publication and PR head alignment",
    ],
    triggersGitHooks: true,
    verificationCandidate: "agentplane pr flow status <task-id>",
    needsVerificationRecord: false,
  },
  "provider.pr.refresh": {
    type: "provider_refresh",
    phase: "provider_state_unavailable",
    checkout: "base_checkout",
    role: "CODER",
    expectedPostconditions: [POSTCONDITION.providerObserved, POSTCONDITION.routeRecomputed],
    mustNot: ["do not queue or merge while the live GitHub PR head cannot be confirmed"],
    triggersGitHooks: false,
    verificationCandidate: "agentplane pr flow status <task-id>",
    needsVerificationRecord: false,
  },
  "route.remote.refresh": {
    type: "provider_refresh",
    phase: "remote_route_refresh_needed",
    checkout: "base_checkout",
    role: "INTEGRATOR",
    expectedPostconditions: [POSTCONDITION.providerObserved, POSTCONDITION.routeRecomputed],
    mustNot: [
      "do not enqueue, publish, or clean a DONE task from local-only PR metadata; recompute with live provider state",
    ],
    triggersGitHooks: false,
    verificationCandidate: "agentplane task next-action <task-id> --remote --explain",
    needsVerificationRecord: false,
  },
  "task.pre_merge_close": {
    type: "task_record_result",
    phase: "pre_merge_closure_needed",
    checkout: "task_worktree",
    role: "CODER",
    expectedPostconditions: [
      POSTCONDITION.preMergeClosure,
      POSTCONDITION.taskDone,
      POSTCONDITION.routeRecomputed,
    ],
    mustNot: [
      "do not queue integration before the pre-merge closure marker is committed on the task branch",
    ],
    triggersGitHooks: true,
    verificationCandidate: null,
    needsVerificationRecord: false,
  },
  "integration.enqueue": {
    type: "integration_enqueue",
    phase: "pr_open_integration_lane",
    checkout: "base_checkout",
    role: "INTEGRATOR",
    expectedPostconditions: [POSTCONDITION.integrationQueued, POSTCONDITION.routeRecomputed],
    mustNot: [
      "do not merge/rebase/squash the task branch manually; integrate queue/integrate own the serialized merge lane",
      "do not amend only to align quality_review.evaluated_sha; rerun evaluator on current HEAD, then recompute the route",
    ],
    triggersGitHooks: false,
    verificationCandidate: "agentplane pr check <task-id>",
    needsVerificationRecord: false,
  },
  "task.hosted_close.open": {
    type: "hosted_close_prepare",
    phase: "close_tail_needed",
    checkout: "base_checkout",
    role: "INTEGRATOR",
    expectedPostconditions: [POSTCONDITION.hostedCloseOpen, POSTCONDITION.routeRecomputed],
    mustNot: [
      "do not write close-tail artifacts manually; agentplane task hosted-close-pr owns close-tail recovery",
    ],
    triggersGitHooks: false,
    verificationCandidate: null,
    needsVerificationRecord: false,
  },
  "task.hosted_close.finalize": {
    type: "cleanup",
    phase: "hosted_close_recorded_upstream",
    checkout: "base_checkout",
    role: "INTEGRATOR",
    expectedPostconditions: [
      POSTCONDITION.baseSynced,
      POSTCONDITION.worktreeAbsent,
      POSTCONDITION.routeRecomputed,
    ],
    mustNot: [
      "do not recreate close-tail evidence after hosted close landed; sync base truth, then run AgentPlane cleanup",
      "do not delete task branches/worktrees manually; agentplane cleanup merged owns merged-work cleanup",
    ],
    triggersGitHooks: false,
    verificationCandidate: null,
    needsVerificationRecord: false,
  },
  "task.worktree.cleanup": {
    type: "cleanup",
    phase: "done_pending_cleanup",
    checkout: "base_checkout",
    role: "INTEGRATOR",
    expectedPostconditions: [POSTCONDITION.worktreeAbsent, POSTCONDITION.routeRecomputed],
    mustNot: [
      "do not delete task branches/worktrees manually; agentplane cleanup merged owns merged-work cleanup",
    ],
    triggersGitHooks: false,
    verificationCandidate: null,
    needsVerificationRecord: false,
  },
  "pr.sync_or_verify": {
    type: "pr_sync",
    phase: "verify_or_pr_update",
    checkout: "task_worktree",
    role: "CODER",
    expectedPostconditions: [POSTCONDITION.prArtifactsCurrent, POSTCONDITION.routeRecomputed],
    mustNot: [
      ...PR_AUTOMATION_GUARD,
      "do not amend only to align quality_review.evaluated_sha; rerun evaluator on current HEAD, then recompute the route",
    ],
    triggersGitHooks: true,
    verificationCandidate: "agentplane pr check <task-id>",
    needsVerificationRecord: true,
  },
} as const satisfies Record<WorkflowOperationId, WorkflowOperationSpec>;

type WorkflowOperationBase<Id extends WorkflowOperationId> = {
  id: Id;
  type: WorkflowOperationType;
  params: WorkflowOperationParams[Id];
  preconditionFingerprint: StateFingerprint;
  authorityRef: string;
  idempotencyKey: string;
  expectedPostconditions: readonly WorkflowPostcondition[];
  triggersGitHooks: boolean;
};

export type WorkflowOperation = {
  [Id in WorkflowOperationId]: WorkflowOperationBase<Id>;
}[WorkflowOperationId];

type WorkflowStepExecution = {
  actionKind: RouteExecutionPacket["actionKind"];
  recommendedRole: WorkflowRole;
  semanticMutationAllowed: boolean;
  mustNot: readonly string[];
  returnControlWhen: string;
  verificationCandidate: string | null;
  evidenceMissing: readonly string[];
  needsVerificationRecord: boolean;
};

type WorkflowStepBase = {
  schemaVersion: 1;
  id: string;
  phase: string;
  authoritativeCheckout: WorkflowCheckout;
  summary: string;
  blockers: readonly RouteBlocker[];
  selectedBlocker: RouteBlocker | null;
  compatibility: RouteNextAction;
  preconditionFingerprint: StateFingerprint;
  execution: WorkflowStepExecution;
};

export type WorkflowStep =
  | (WorkflowStepBase & {
      kind: "cli_operation";
      operation: WorkflowOperation;
    })
  | (WorkflowStepBase & {
      kind: "agent_episode";
      episode: {
        purpose:
          | "implementation"
          | "implementation_rework"
          | "quality_review"
          | "task_worktree_resolution"
          | "verification";
        role: WorkflowRole;
        taskId: string;
        objective: string;
      };
    })
  | (WorkflowStepBase & {
      kind: "approval";
      request: {
        type: "plan_approval" | "provider_merge";
        taskId: string;
        authorityRef: string;
      };
    })
  | (WorkflowStepBase & {
      kind: "human_input";
      request: {
        type: "open_question";
        taskId: string;
        questionId: string;
        question: string;
      };
    })
  | (WorkflowStepBase & {
      kind: "wait";
      condition: {
        type: "runner_terminal";
        taskId: string;
        runId: string | null;
      };
    })
  | (WorkflowStepBase & {
      kind: "terminal";
      outcome: {
        type:
          | "attention_required"
          | "cleanup_blocked"
          | "done"
          | "input_required"
          | "repair_required";
        taskId: string;
      };
    });
export { reduceRouteState } from "./workflow-step-reducer.js";
export {
  WORKFLOW_OPERATION_EFFECTS,
  workflowOperationMutatesState,
} from "./workflow-operation-effects.js";
export { WORKFLOW_OPERATION_ARGV_PREFIX } from "./workflow-operation-prefix.js";
export {
  projectWorkflowStepExecutionPacket,
  projectWorkflowStepNextAction,
  projectWorkflowStepOracle,
} from "./workflow-step-projections.js";
