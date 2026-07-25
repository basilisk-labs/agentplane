import type { TaskData } from "../../backends/task-backend.js";
import type { RouteNextAction } from "./route-decision-types.js";
import type { RouteExecutionPacket, RouteOracle } from "./route-oracle.js";
import { projectWorkflowOperationArgv } from "./workflow-operation-projection.js";
import type { WorkflowCheckout, WorkflowStep } from "./workflow-step.js";

export function projectWorkflowStepNextAction(step: WorkflowStep): RouteNextAction {
  return { ...step.compatibility };
}

function checkoutPathFor(
  checkout: WorkflowCheckout,
  paths: {
    baseCheckoutPath?: string | null;
    taskWorktreePath?: string | null;
    primaryTaskWorktreePath?: string | null;
    currentCheckoutPath?: string | null;
  },
): string | null {
  if (checkout === "base_checkout") return paths.baseCheckoutPath ?? null;
  if (checkout === "task_worktree") return paths.taskWorktreePath ?? null;
  if (checkout === "primary_task_worktree") return paths.primaryTaskWorktreePath ?? null;
  if (checkout === "current_checkout") return paths.currentCheckoutPath ?? null;
  return null;
}

export function projectWorkflowStepOracle(opts: {
  step: WorkflowStep;
  paths?: {
    baseCheckoutPath?: string | null;
    taskWorktreePath?: string | null;
    primaryTaskWorktreePath?: string | null;
    currentCheckoutPath?: string | null;
  };
}): RouteOracle {
  const authoritativeCheckoutPath = checkoutPathFor(
    opts.step.authoritativeCheckout,
    opts.paths ?? {},
  );
  const safeToMutate =
    (opts.step.execution.actionKind === "local_command" ||
      opts.step.execution.semanticMutationAllowed) &&
    opts.step.blockers.every((blocker) => blocker.code !== "runner_alive") &&
    authoritativeCheckoutPath !== null;
  return {
    phase: opts.step.phase,
    authoritativeCheckout: opts.step.authoritativeCheckout,
    authoritativeCheckoutPath,
    mutationPathHint: safeToMutate ? authoritativeCheckoutPath : null,
    blocker: opts.step.selectedBlocker ? { ...opts.step.selectedBlocker } : null,
    nextCommand: opts.step.compatibility.command,
    summary: opts.step.summary,
  };
}

function blockerEvidence(blockers: WorkflowStep["blockers"]): string[] {
  const missing = new Set<string>();
  for (const blocker of blockers) {
    if (blocker.code === "missing_pr_branch") missing.add("task_branch");
    if (blocker.code === "remote_pr_missing") missing.add("remote_pr");
    if (blocker.code === "pr_head_unpublished") missing.add("published_pr_head");
    if (blocker.code === "hosted_pr_head_mismatch") missing.add("aligned_hosted_pr_head");
    if (blocker.code === "provider_pr_unavailable") missing.add("live_provider_pr_state");
    if (blocker.code === "pr_meta_stale") missing.add("fresh_pr_artifacts");
    if (blocker.code === "close_tail_missing") missing.add("close_tail_pr");
    if (blocker.code === "cleanup_blocked") missing.add("proven_merged_cleanup_identity");
    if (blocker.code === "runner_alive") missing.add("runner_terminal_state");
    if (blocker.code === "dirty_task_artifacts") missing.add("task_artifact_cleanup_commit");
    if (blocker.code === "quality_review_missing") missing.add("evaluator_quality_review");
    if (blocker.code === "quality_review_stale") missing.add("fresh_evaluator_quality_review");
    if (blocker.code === "implementation_rework_required") {
      missing.add("verified_implementation_rework");
    }
    if (blocker.code === "pre_merge_closure_missing") missing.add("pre_merge_closure");
    if (blocker.code === "pre_merge_closure_stale") missing.add("fresh_pre_merge_closure");
    if (blocker.code === "task_worktree_dirty") missing.add("clean_committed_task_worktree");
    if (blocker.code === "task_worktree_state_unavailable") {
      missing.add("confirmed_task_worktree_state");
    }
    if (blocker.code === "verification_required") missing.add("verification_record");
    if (blocker.code === "included_batch_verification_pending") {
      missing.add("included_task_verification_record");
    }
    if (blocker.code === "missing_included_batch_metadata") {
      missing.add("structured_branch_pr_batch_metadata");
    }
  }
  return [...missing];
}

function packetMustNot(step: WorkflowStep): string[] {
  const base = [
    "do not reconstruct branch/worktree/PR state from prose",
    "do not widen lifecycle authority beyond this packet",
    "do not mutate outside mutationPathHint",
    ...step.execution.mustNot,
  ];
  if (step.execution.actionKind === "local_command") {
    return [
      ...base,
      "do not execute raw shell when exactArgv is null",
      "do not continue after a non-zero command exit without recomputing the route",
    ];
  }
  if (step.execution.actionKind === "provider_action") {
    return [...base, "do not complete AgentPlane task truth from provider/card state"];
  }
  if (step.execution.actionKind === "wait") {
    return [...base, "do not reclaim or force progress without explicit parent approval"];
  }
  if (step.execution.semanticMutationAllowed) {
    return [
      ...base,
      "do not mutate task lifecycle or PR state while control belongs to implementation rework",
    ];
  }
  return [...base, "do not perform further task mutation for this route state"];
}

export function projectWorkflowStepExecutionPacket(opts: {
  task: TaskData;
  step: WorkflowStep;
  oracle: RouteOracle;
}): RouteExecutionPacket {
  const missing = new Set<string>(opts.step.execution.evidenceMissing);
  if (opts.task.plan_approval?.state !== "approved") missing.add("approved_plan");
  if (opts.step.execution.needsVerificationRecord && opts.task.verification?.state !== "ok") {
    missing.add("verification_record");
  }
  const blockersForEvidence = opts.step.selectedBlocker
    ? [...opts.step.blockers, opts.step.selectedBlocker]
    : opts.step.blockers;
  for (const value of blockerEvidence(blockersForEvidence)) missing.add(value);
  const actionKind = opts.step.execution.actionKind;
  return {
    schemaVersion: 1,
    actionKind,
    safeToMutate:
      (actionKind === "local_command" || opts.step.execution.semanticMutationAllowed) &&
      opts.oracle.mutationPathHint !== null,
    requiresProviderAction: actionKind === "provider_action",
    recommendedRole: opts.step.execution.recommendedRole,
    authoritativeCheckout: opts.oracle.authoritativeCheckout,
    authoritativeCheckoutPath: opts.oracle.authoritativeCheckoutPath,
    mutationPathHint: opts.oracle.mutationPathHint,
    mustRunFrom: opts.oracle.authoritativeCheckoutPath,
    exactArgv:
      opts.step.kind === "cli_operation" && actionKind === "local_command"
        ? projectWorkflowOperationArgv(opts.step.operation)
        : null,
    mustNot: [...new Set(packetMustNot(opts.step))],
    returnControlWhen: opts.step.execution.returnControlWhen,
    humanProviderAction: actionKind === "provider_action" ? opts.step.summary : null,
    staleStateCheck: `agentplane task next-action ${opts.task.id} --explain`,
    evidenceMissing: [...missing].toSorted((left, right) => left.localeCompare(right)),
    verificationCandidate: opts.step.execution.verificationCandidate,
    stopReason:
      actionKind === "stop" || actionKind === "wait"
        ? (opts.step.selectedBlocker?.summary ?? opts.step.summary)
        : null,
  };
}
