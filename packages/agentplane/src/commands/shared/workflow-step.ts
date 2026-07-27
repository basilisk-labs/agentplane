import type { StateFingerprint } from "@agentplaneorg/core/schemas";

import type { TaskData } from "../../backends/task-backend.js";
import type { PrFlowStatusReport } from "../pr/flow-status.js";
import type { ConflictReworkPreparation } from "../pr/conflict-rework.js";
import type { TaskResumeContext } from "../task/handoff.shared.js";
import type { RouteBatchOwnership } from "./route-batch-ownership.js";
import type { RouteCleanupProbe, RouteNextAction } from "./route-decision-types.js";
import type { RouteBlocker, RouteExecutionPacket, RouteOracle } from "./route-oracle.js";
import type { TaskWorktreeCleanliness } from "./task-worktree-cleanliness.js";
import { POSTCONDITION, type WorkflowPostcondition } from "./workflow-postconditions.js";

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
  /**
   * The route was computed with hosted-provider state. Approval grants must
   * rebuild the same route context instead of silently falling back to a
   * local-only decision.
   */
  remoteEnabled?: boolean;
  taskWorktree?: TaskWorktreeCleanliness;
  conflictRework?: ConflictReworkPreparation | null;
  preconditionFingerprint: StateFingerprint;
};

type WorkflowOperationType =
  | "batch_reconcile"
  | "cleanup"
  | "hosted_close_prepare"
  | "integration_legacy_conflict_adoption"
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
  | "integration.adopt_legacy_protected_conflict"
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
  "integration.adopt_legacy_protected_conflict": {
    taskId: string;
    expectedAdoptionToken: string;
  };
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
    checkout: "task_worktree",
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
  "integration.adopt_legacy_protected_conflict": {
    type: "integration_legacy_conflict_adoption",
    phase: "legacy_protected_conflict_adoption_required",
    checkout: "base_checkout",
    role: "INTEGRATOR",
    expectedPostconditions: [POSTCONDITION.routeRecomputed],
    mustNot: [
      "do not infer recovery evidence from queue reason, rebase, merge, force-push, or start semantic conflict resolution before the explicit receipt is recorded",
    ],
    triggersGitHooks: false,
    verificationCandidate: "agentplane task next-action <task-id> --remote --explain",
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
        type: "plan_approval" | "provider_merge" | "side_effect";
        taskId: string;
        authorityRef: string;
      } & (
        | {
            type: "plan_approval" | "provider_merge";
          }
        | {
            type: "side_effect";
            operationId: WorkflowOperationId;
            operation: Pick<WorkflowOperation, "id" | "type" | "params">;
            operationDigest: string;
            stateFingerprintDigest: string;
            stateScopeDigest: string;
            policyRule: string;
          }
      );
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
export {
  WORKFLOW_OPERATION_EFFECTS,
  workflowOperationMutatesState,
} from "./workflow-operation-effects.js";
export { WORKFLOW_OPERATION_AUTHORITY_POLICY } from "./side-effect-authority.js";
export { WORKFLOW_OPERATION_ARGV_PREFIX } from "./workflow-operation-prefix.js";
