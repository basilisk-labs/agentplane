import type { WorkflowRouteState, WorkflowStep } from "./workflow-step.js";
import type { RouteBlocker } from "./route-oracle.js";
import { conflictReworkRouteStep } from "./workflow-step-conflict-rework.js";
import { preMergeCommit, primaryIncludeTaskIds } from "./workflow-step-branch-state.js";
import { supersededProviderConflictStep } from "./workflow-step-provider-conflict-superseded.js";
import { needsQualityEvidenceRefresh } from "./workflow-step-quality.js";
import {
  approvalStep,
  branchImplementationStep,
  cliOperationStep,
  commonExecution,
  implementationReworkStep,
  includedBatchStep,
  qualityEvidenceRefreshStep,
  qualityReviewStep,
  routeBlockerFor,
  routeBlockerSnapshot,
  taskWorktreeBlocker,
  terminalStep,
  verificationStep,
  verifiedIncludedClosureCandidate,
  workSlug,
  worktreeResolutionStep,
} from "./workflow-step-factory.js";

function branchHeadRepairStep(state: WorkflowRouteState): WorkflowStep {
  return terminalStep({
    state,
    id: "terminal.branch_head_repair",
    code: "repair_branch_head",
    phase: "branch_head_missing",
    checkout: "base_checkout",
    role: "CODER",
    outcome: "repair_required",
    summary:
      "the structured task branch exists but its local head is unavailable; recover or fetch that branch before PR, closure, or integration operations",
    evidenceMissing: ["task_branch_head"],
    selectedBlocker: routeBlockerFor(state, "branch_head_missing"),
  });
}

function primaryBatchVerificationStep(state: WorkflowRouteState): WorkflowStep | null {
  if (state.batchOwnership.role !== "primary") return null;
  const ownership = state.batchOwnership;
  const pending = ownership.taskStates.find(
    (task) => ownership.includedTaskIds.includes(task.id) && task.verification !== "ok",
  );
  if (!pending) return null;
  return cliOperationStep({
    state,
    operationId: "batch.collect_included",
    params: { taskId: pending.id },
    code: "collect_included_verification",
    summary: "collect verification for included batch tasks before final integration",
    selectedBlocker: {
      code: "included_batch_verification_pending",
      summary: `included batch task ${pending.id} requires verification before primary PR mutation`,
    },
  });
}

function integrationQueueWaitStep(
  state: WorkflowRouteState,
  queueStatus: "queued" | "claimed" | "handoff" | "done",
): WorkflowStep {
  const summary =
    queueStatus === "done"
      ? "wait for merged provider truth after the integration queue completed"
      : `wait for the integration queue entry to leave ${queueStatus}`;
  return {
    schemaVersion: 1,
    id: "wait.integration_queue",
    kind: "wait",
    phase: "integration_queue_wait",
    authoritativeCheckout: "base_checkout",
    summary,
    blockers: routeBlockerSnapshot(state),
    selectedBlocker: null,
    compatibility: {
      code: "wait_integration_queue",
      command: null,
      summary,
      requiresApproval: false,
    },
    preconditionFingerprint: state.preconditionFingerprint,
    condition: {
      type: "integration_queue_terminal",
      taskId: state.task.id,
      queueStatus,
    },
    execution: commonExecution({
      actionKind: "wait",
      role: "INTEGRATOR",
      mustNot: [
        "do not enqueue the same task again while its integration queue entry is active or completed",
      ],
    }),
  };
}

function integrationEnqueueStep(state: WorkflowRouteState, summary: string): WorkflowStep {
  const id = state.task.id;
  const queue = state.prFlow?.queue;
  if (queue?.present) {
    if (queue.status === "rework") return implementationReworkStep(state);
    if (queue.status === "superseded") {
      return terminalStep({
        state,
        id: "terminal.integration_superseded",
        code: "integration_superseded",
        phase: "integration_superseded",
        checkout: "base_checkout",
        role: "INTEGRATOR",
        outcome: "superseded",
        summary: queue.reason ?? "integration queue entry was superseded",
        evidenceMissing: [],
      });
    }
    return integrationQueueWaitStep(state, queue.status);
  }
  const branch = state.prFlow?.branch.name;
  if (!branch) {
    return terminalStep({
      state,
      id: "terminal.pr_branch_metadata_repair",
      code: "repair_pr_branch_metadata",
      phase: "pr_branch_metadata_missing",
      checkout: "base_checkout",
      role: "INTEGRATOR",
      outcome: "repair_required",
      summary:
        "the hosted PR is open but structured task branch metadata is absent; refresh route metadata before integration",
      evidenceMissing: ["task_branch"],
    });
  }
  return cliOperationStep({
    state,
    operationId: "integration.enqueue",
    params: { taskId: id, branch },
    code: "wait_hosted_checks",
    summary,
    selectedBlocker: null,
  });
}

function hostedCloseStep(state: WorkflowRouteState): WorkflowStep | null {
  const id = state.task.id;
  if (state.prFlow?.closeTail.state === "open") {
    return approvalStep({
      state,
      id: "approval.provider_merge",
      code: "merge_close_tail",
      phase: "close_tail_provider_lane",
      checkout: "provider",
      type: "provider_merge",
      summary: "wait for hosted checks and merge the close-tail PR through the provider",
      command: null,
      selectedBlocker: routeBlockerFor(state, "close_tail_open"),
    });
  }
  if (
    state.prFlow?.closeTail.state === "merged" ||
    state.prFlow?.closeTail.state === "recorded_on_base"
  ) {
    const implementationBase = state.prFlow.pr.state === "not_found" ? null : state.prFlow.pr.base;
    const base =
      state.prFlow.closeTail.state === "recorded_on_base"
        ? state.prFlow.closeTail.base
        : (implementationBase ?? "main");
    return cliOperationStep({
      state,
      operationId: "task.hosted_close.finalize",
      params: { taskId: id, base },
      code: "sync_hosted_close",
      summary:
        "hosted close-tail already landed upstream; finalize base sync and clean merged task branches/worktrees",
      selectedBlocker: null,
    });
  }
  if (state.prFlow?.closeTail.state === "not_found") {
    return cliOperationStep({
      state,
      operationId: "task.hosted_close.open",
      params: { taskId: id },
      code: "open_close_tail",
      summary: "open the hosted close-tail PR for the merged implementation PR",
      selectedBlocker: routeBlockerFor(state, "close_tail_missing"),
    });
  }
  return null;
}

function runnerWaitStep(state: WorkflowRouteState): WorkflowStep {
  const id = state.task.id;
  const summary = "wait for the active runner or reclaim with explicit force if it is orphaned";
  return {
    schemaVersion: 1,
    id: "wait.runner",
    kind: "wait",
    phase: "runner_wait",
    authoritativeCheckout: "task_worktree",
    summary,
    blockers: routeBlockerSnapshot(state),
    selectedBlocker: routeBlockerFor(state, "runner_alive"),
    compatibility: {
      code: "wait_runner",
      command: null,
      summary,
      requiresApproval: false,
    },
    preconditionFingerprint: state.preconditionFingerprint,
    condition: {
      type: "runner_terminal",
      taskId: id,
      runId: state.resume.runner.run_id ?? null,
    },
    execution: commonExecution({
      actionKind: "wait",
      role: "CODER",
      mustNot: ["do not reclaim or force progress without explicit parent approval"],
    }),
  };
}

function unavailableWorktreeBlocker(state: WorkflowRouteState): RouteBlocker {
  const probe = state.taskWorktree;
  if (probe?.state === "unavailable") {
    return {
      code: "task_worktree_state_unavailable",
      summary: `task worktree state could not be inspected: ${probe.reason}`,
    };
  }
  return {
    code: "task_worktree_state_unavailable",
    summary: "task worktree state could not be inspected",
  };
}

export function doneBranchStep(state: WorkflowRouteState): WorkflowStep {
  const id = state.task.id;
  const worktreeBlocker = taskWorktreeBlocker(state);
  if (state.resume.runner.next_action === "wait") return runnerWaitStep(state);
  if (worktreeBlocker) return worktreeResolutionStep(state, worktreeBlocker);
  const conflictStep = conflictReworkRouteStep(state);
  if (conflictStep) return conflictStep;
  if (state.blockers.some((blocker) => blocker.code === "implementation_rework_required")) {
    return implementationReworkStep(state);
  }
  if (state.blockers.some((blocker) => blocker.code === "verification_required")) {
    return verificationStep(state);
  }
  const batchVerificationStep = primaryBatchVerificationStep(state);
  if (batchVerificationStep) return batchVerificationStep;
  const closeStep = hostedCloseStep(state);
  if (closeStep) return closeStep;
  if (state.blockers.some((blocker) => blocker.code === "branch_head_missing")) {
    return branchHeadRepairStep(state);
  }
  if (
    state.prFlow?.providerObservation?.state === "unavailable" ||
    (state.prFlow?.pr.state === "OPEN" &&
      state.prFlow.pr.source === "metadata" &&
      !state.prFlow.providerObservation)
  ) {
    return cliOperationStep({
      state,
      operationId: "route.remote.refresh",
      params: { taskId: id },
      code: "refresh_remote_route",
      summary: "recompute the DONE task route with live provider state before integration",
      selectedBlocker: routeBlockerFor(state, "provider_pr_unavailable"),
    });
  }
  if (
    state.blockers.some(
      (blocker) =>
        blocker.code === "quality_review_missing" || blocker.code === "quality_review_stale",
    )
  ) {
    return qualityReviewStep(state);
  }
  if (state.blockers.some((blocker) => blocker.code === "pre_merge_closure_stale")) {
    const commit = preMergeCommit(state);
    if (!commit) return branchHeadRepairStep(state);
    const body = "Verified: refreshed pre-merge closure packet is ready for the task PR.";
    return cliOperationStep({
      state,
      operationId: "task.pre_merge_close",
      params: {
        taskId: id,
        author: state.task.owner,
        body,
        result: "pre-merge closure",
        commit,
        force: true,
      },
      code: "record_pre_merge_closure",
      summary: "record a fresh pre-merge closure before queueing integration",
      selectedBlocker: routeBlockerFor(state, "pre_merge_closure_stale"),
    });
  }
  if (state.prFlow?.pr.state === "not_found") {
    return cliOperationStep({
      state,
      operationId: "pr.open",
      params: {
        taskId: id,
        author: state.task.owner,
        includeTaskIds: primaryIncludeTaskIds(state),
      },
      code: "open_pr",
      summary: "publish/link the closed task branch and its PR",
      selectedBlocker: routeBlockerFor(state, "remote_pr_missing"),
    });
  }
  if (
    state.blockers.some(
      (blocker) =>
        blocker.code === "pr_head_unpublished" || blocker.code === "hosted_pr_head_mismatch",
    )
  ) {
    return cliOperationStep({
      state,
      operationId: "pr.head.publish",
      params: {
        taskId: id,
        author: state.task.owner,
        includeTaskIds: primaryIncludeTaskIds(state),
      },
      code: "publish_pr_head",
      summary:
        "publish the final task branch head and confirm the hosted PR points to the same commit",
      selectedBlocker: routeBlockerFor(state, "pr_head_unpublished", "hosted_pr_head_mismatch"),
    });
  }
  if (state.blockers.some((blocker) => blocker.code === "provider_pr_unavailable")) {
    return cliOperationStep({
      state,
      operationId: "provider.pr.refresh",
      params: { taskId: id },
      code: "retry_provider_lookup",
      summary: "retry GitHub PR observation before queueing integration",
      selectedBlocker: routeBlockerFor(state, "provider_pr_unavailable"),
    });
  }
  if (state.prFlow?.pr.state === "OPEN") {
    return integrationEnqueueStep(
      state,
      "pre-merge closure is recorded; wait for hosted checks and merge the task PR",
    );
  }
  if (state.prFlow?.pr.state === "CLOSED") {
    return terminalStep({
      state,
      id: "terminal.inspect_pr",
      code: "inspect_pr",
      phase: "pr_provider_attention",
      checkout: "provider",
      role: "CODER",
      outcome: "attention_required",
      summary:
        "task is done but the implementation PR is closed before merge; inspect or reopen it",
      selectedBlocker: null,
    });
  }
  if (state.cleanupProbe.state === "blocked") {
    return terminalStep({
      state,
      id: "terminal.cleanup_blocked",
      code: "cleanup_blocked",
      phase: "cleanup_blocked",
      checkout: "base_checkout",
      role: "INTEGRATOR",
      outcome: "cleanup_blocked",
      summary:
        "targeted cleanup is blocked because merged identity is not proven: " +
        state.cleanupProbe.reasons.join("; "),
      mustNot: [
        "do not delete task branches/worktrees while exact merged identity or closure proof is blocked",
      ],
      evidenceMissing: ["proven_merged_cleanup_identity"],
      selectedBlocker: routeBlockerFor(state, "cleanup_blocked"),
    });
  }
  if (state.cleanupProbe.state === "already_clean") {
    return terminalStep({
      state,
      id: "terminal.done",
      code: "done",
      phase: "done",
      checkout: "base_checkout",
      role: "CODER",
      outcome: "done",
      summary: "task is already done and no merged branch/worktree cleanup candidates remain",
      selectedBlocker: null,
    });
  }
  if (state.cleanupProbe.state === "unavailable" || state.cleanupProbe.state === "not_requested") {
    return cliOperationStep({
      state,
      operationId: "route.remote.refresh",
      params: { taskId: id },
      code: "refresh_remote_route",
      summary: "load per-task provider and cleanup truth before finalizing the DONE task",
      selectedBlocker: null,
    });
  }
  const base = state.resume.base_branch ?? "main";
  return cliOperationStep({
    state,
    operationId: "task.worktree.cleanup",
    params: { taskId: id, base },
    code: "cleanup",
    summary: "task is already done; finalize base sync and clean only this task branch/worktree",
    selectedBlocker: null,
  });
}

export function branchStep(state: WorkflowRouteState): WorkflowStep {
  const id = state.task.id;
  const supersededStep = supersededProviderConflictStep(state);
  if (supersededStep) return supersededStep;
  const worktreeBlocker = taskWorktreeBlocker(state);
  const status = String(state.task.status).toUpperCase();
  if (status === "TODO") {
    if (state.taskWorktree?.state === "unavailable") {
      return worktreeResolutionStep(state, worktreeBlocker ?? unavailableWorktreeBlocker(state));
    }
    if (state.blockers.some((blocker) => blocker.code === "branch_head_missing")) {
      return branchHeadRepairStep(state);
    }
    if (
      !state.taskWorktree ||
      state.taskWorktree.state === "not_present" ||
      state.taskWorktree.branch === state.resume.base_branch
    ) {
      const slug = workSlug(state.task);
      return cliOperationStep({
        state,
        operationId: "worktree.prepare",
        params: { taskId: id, agent: state.task.owner, slug },
        code: "start_or_recover_worktree",
        summary: "create or recover the dedicated branch_pr worktree before starting the task",
        selectedBlocker: routeBlockerFor(state, "missing_pr_branch", "on_base_checkout"),
      });
    }
    const body = "Start: continue branch_pr task in the dedicated task worktree.";
    return cliOperationStep({
      state,
      operationId: "task.branch.start",
      params: { taskId: id, author: state.task.owner, body },
      code: "start_branch",
      summary: "mark the branch_pr task started before agent work or PR publication",
      selectedBlocker: null,
    });
  }
  if (state.batchOwnership.role === "included") return includedBatchStep(state);
  if (!state.prFlow?.branch.name && verifiedIncludedClosureCandidate(state.task)) {
    return cliOperationStep({
      state,
      operationId: "batch.reconcile_included",
      params: { taskId: id },
      code: "reconcile_included_task_closure",
      summary:
        "verified included batch task appears landed but lacks closure metadata; reconcile landed evidence before starting a new worktree",
      selectedBlocker: null,
    });
  }
  if (state.blockers.some((blocker) => blocker.code === "missing_included_batch_metadata")) {
    return terminalStep({
      state,
      id: "terminal.included_batch_metadata_repair",
      code: "repair_included_batch_metadata",
      phase: "included_task_metadata_missing",
      checkout: "base_checkout",
      role: "CODER",
      outcome: "repair_required",
      summary:
        "structured branch_pr batch metadata is incomplete or malformed; restore extensions.branch_pr_batch or primary PR batch metadata before reconciling",
      evidenceMissing: ["structured_branch_pr_batch_metadata"],
      selectedBlocker: routeBlockerFor(state, "missing_included_batch_metadata"),
    });
  }
  if (state.resume.runner.next_action === "wait") return runnerWaitStep(state);
  if (worktreeBlocker?.code === "task_worktree_state_unavailable") {
    return worktreeResolutionStep(state, worktreeBlocker);
  }
  if (worktreeBlocker) return worktreeResolutionStep(state, worktreeBlocker);
  const conflictStep = conflictReworkRouteStep(state);
  if (conflictStep) return conflictStep;
  if (
    state.taskWorktree?.state === "not_present" &&
    state.blockers.some((blocker) => blocker.code === "pr_meta_stale")
  ) {
    const slug = workSlug(state.task);
    return cliOperationStep({
      state,
      operationId: "worktree.prepare",
      params: { taskId: id, agent: state.task.owner, slug },
      code: "start_or_recover_worktree",
      summary: "recover the dedicated branch_pr worktree before task-scoped PR operations",
      selectedBlocker: routeBlockerFor(state, "on_base_checkout", "missing_pr_branch"),
    });
  }
  if (state.blockers.some((blocker) => blocker.code === "implementation_rework_required")) {
    return implementationReworkStep(state);
  }
  const batchVerificationStep = primaryBatchVerificationStep(state);
  if (batchVerificationStep) return batchVerificationStep;
  if (
    state.taskWorktree !== undefined &&
    state.taskWorktree.state !== "not_present" &&
    state.taskWorktree.state !== "unavailable" &&
    state.blockers.some((blocker) => blocker.code === "pr_meta_stale")
  ) {
    return cliOperationStep({
      state,
      operationId: "pr.artifacts.update",
      params: { taskId: id, includeTaskIds: primaryIncludeTaskIds(state) },
      code: "update_pr_artifacts",
      summary: "refresh stale PR metadata before hosted checks or integration",
      selectedBlocker: routeBlockerFor(state, "pr_meta_stale"),
    });
  }
  if (state.blockers.some((blocker) => blocker.code === "missing_pr_branch")) {
    const slug = workSlug(state.task);
    return cliOperationStep({
      state,
      operationId: "worktree.prepare",
      params: { taskId: id, agent: state.task.owner, slug },
      code: "start_or_recover_worktree",
      summary: "create or recover the dedicated branch_pr worktree before opening a PR",
      selectedBlocker: routeBlockerFor(state, "missing_pr_branch"),
    });
  }
  const closeStep = hostedCloseStep(state);
  if (closeStep) return closeStep;
  if (state.blockers.some((blocker) => blocker.code === "branch_head_missing")) {
    return branchHeadRepairStep(state);
  }
  if (
    state.prFlow?.pr.state === "not_found" &&
    state.prFlow.branch.name &&
    state.taskWorktree?.state === "not_present"
  ) {
    const slug = workSlug(state.task);
    return cliOperationStep({
      state,
      operationId: "worktree.prepare",
      params: { taskId: id, agent: state.task.owner, slug },
      code: "start_or_recover_worktree",
      summary: "recover the existing task branch into one dedicated worktree before opening a PR",
      selectedBlocker: routeBlockerFor(state, "on_base_checkout"),
    });
  }
  if (state.prFlow?.pr.state === "not_found") {
    return cliOperationStep({
      state,
      operationId: "pr.open",
      params: {
        taskId: id,
        author: state.task.owner,
        includeTaskIds: primaryIncludeTaskIds(state),
      },
      code: "open_pr",
      summary: "publish/link the task PR",
      selectedBlocker: routeBlockerFor(state, "remote_pr_missing"),
    });
  }
  if (
    state.task.verification?.state !== "ok" &&
    !(typeof state.task.commit?.hash === "string" && state.task.commit.hash.trim())
  ) {
    return branchImplementationStep(state);
  }
  if (state.blockers.some((blocker) => blocker.code === "verification_required")) {
    return verificationStep(state);
  }
  if (needsQualityEvidenceRefresh(state)) {
    return qualityEvidenceRefreshStep(state);
  }
  if (
    state.blockers.some(
      (blocker) =>
        blocker.code === "quality_review_missing" || blocker.code === "quality_review_stale",
    )
  ) {
    return qualityReviewStep(state);
  }
  if (state.blockers.some((blocker) => blocker.code === "pre_merge_closure_missing")) {
    const commit = preMergeCommit(state);
    if (!commit) return branchHeadRepairStep(state);
    const body = "Verified: pre-merge closure packet is ready for the task PR.";
    return cliOperationStep({
      state,
      operationId: "task.pre_merge_close",
      params: {
        taskId: id,
        author: state.task.owner,
        body,
        result: "pre-merge closure",
        commit,
        force: false,
      },
      code: "record_pre_merge_closure",
      summary:
        "record task DONE and pre-merge closure on the task branch before queueing integration",
      selectedBlocker: routeBlockerFor(state, "pre_merge_closure_missing"),
    });
  }
  if (
    state.blockers.some(
      (blocker) =>
        blocker.code === "pr_head_unpublished" || blocker.code === "hosted_pr_head_mismatch",
    )
  ) {
    return cliOperationStep({
      state,
      operationId: "pr.head.publish",
      params: {
        taskId: id,
        author: state.task.owner,
        includeTaskIds: primaryIncludeTaskIds(state),
      },
      code: "publish_pr_head",
      summary: "publish the local task branch head and align the hosted PR head",
      selectedBlocker: routeBlockerFor(state, "pr_head_unpublished", "hosted_pr_head_mismatch"),
    });
  }
  if (state.blockers.some((blocker) => blocker.code === "provider_pr_unavailable")) {
    return cliOperationStep({
      state,
      operationId: "provider.pr.refresh",
      params: { taskId: id },
      code: "retry_provider_lookup",
      summary: "retry GitHub PR observation before publication or integration",
      selectedBlocker: routeBlockerFor(state, "provider_pr_unavailable"),
    });
  }
  if (state.prFlow?.pr.state === "OPEN") {
    return integrationEnqueueStep(
      state,
      "enqueue the verified branch after hosted checks are stable",
    );
  }
  return cliOperationStep({
    state,
    operationId: "pr.sync_or_verify",
    params: { taskId: id, includeTaskIds: primaryIncludeTaskIds(state) },
    code: "verify_or_update_pr",
    summary: "refresh PR artifacts, verify, then queue integration",
    selectedBlocker: null,
  });
}
