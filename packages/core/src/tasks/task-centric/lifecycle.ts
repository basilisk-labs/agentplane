import { requiredOutputManifestsPresent } from "./graph.js";
import type {
  ReconciliationSnapshot,
  Sha256Digest,
  TaskAggregate,
  TaskLifecycleState,
  ValidationResult,
  WorkItem,
  WorkItemState,
} from "./model.js";

const TASK_TRANSITIONS: Readonly<Record<TaskLifecycleState, readonly TaskLifecycleState[]>> = {
  CAPTURED: ["PLANNING", "CANCELLED", "BLOCKED"],
  PLANNING: ["AWAITING_PLAN_APPROVAL", "HUMAN_REQUIRED", "BLOCKED", "CANCELLED"],
  AWAITING_PLAN_APPROVAL: ["ACTIVE", "PLANNING", "CANCELLED"],
  ACTIVE: [
    "PLANNING",
    "FINAL_VALIDATION",
    "HUMAN_REQUIRED",
    "BLOCKED",
    "EFFECT_IN_DOUBT",
    "CANCELLED",
  ],
  FINAL_VALIDATION: ["COMPLETED", "ACTIVE", "HUMAN_REQUIRED", "BLOCKED", "EFFECT_IN_DOUBT"],
  COMPLETED: [],
  HUMAN_REQUIRED: ["PLANNING", "ACTIVE", "CANCELLED", "BLOCKED"],
  BLOCKED: ["PLANNING", "ACTIVE", "CANCELLED"],
  EFFECT_IN_DOUBT: ["ACTIVE", "HUMAN_REQUIRED", "BLOCKED"],
  CANCELLED: [],
};

const WORK_ITEM_TRANSITIONS: Readonly<Record<WorkItemState, readonly WorkItemState[]>> = {
  PLANNED: ["READY", "BLOCKED", "CANCELLED"],
  READY: ["CLAIMED", "BLOCKED", "CANCELLED"],
  CLAIMED: ["EXECUTING", "READY", "BLOCKED", "CANCELLED"],
  EXECUTING: ["RESULT_RECEIVED", "REWORK_READY", "BLOCKED", "EFFECT_IN_DOUBT", "CANCELLED"],
  RESULT_RECEIVED: ["INSPECTING", "REWORK_READY", "BLOCKED", "EFFECT_IN_DOUBT"],
  INSPECTING: ["VALIDATING", "REWORK_READY", "BLOCKED", "EFFECT_IN_DOUBT"],
  VALIDATING: ["COMPLETED", "REWORK_READY", "BLOCKED", "EFFECT_IN_DOUBT"],
  REWORK_READY: ["CLAIMED", "BLOCKED", "CANCELLED"],
  COMPLETED: [],
  BLOCKED: ["READY", "REWORK_READY", "CANCELLED"],
  EFFECT_IN_DOUBT: ["INSPECTING", "BLOCKED"],
  CANCELLED: [],
};

export function assertTaskTransition(from: TaskLifecycleState, to: TaskLifecycleState): void {
  if (!TASK_TRANSITIONS[from].includes(to)) {
    throw new Error(`Illegal task lifecycle transition ${from} -> ${to}.`);
  }
}

export function assertWorkItemTransition(from: WorkItemState, to: WorkItemState): void {
  if (!WORK_ITEM_TRANSITIONS[from].includes(to)) {
    throw new Error(`Illegal work item lifecycle transition ${from} -> ${to}.`);
  }
}

export type CompletionEvaluation = Readonly<{
  eligible: boolean;
  reason_codes: readonly string[];
}>;

export type IndependentReviewApplication = Readonly<{
  action: "complete" | "rework" | "attention" | "reject";
  completion_satisfied: boolean;
  semantic_work_required: boolean;
  reason_code:
    | "review_passed"
    | "review_rework_required"
    | "review_attention_required"
    | "review_provenance_rejected"
    | "review_evidence_stale";
}>;

/** Pure review policy shared by canonical completion and compatibility gates. */
export function decideIndependentReviewApplication(opts: {
  verdict: "pass" | "rework" | "blocked" | "human_review";
  provenance_accepted: boolean;
  evidence_current: boolean;
}): IndependentReviewApplication {
  if (!opts.provenance_accepted) {
    return {
      action: "reject",
      completion_satisfied: false,
      semantic_work_required: false,
      reason_code: "review_provenance_rejected",
    };
  }
  if (!opts.evidence_current) {
    return {
      action: "reject",
      completion_satisfied: false,
      semantic_work_required: false,
      reason_code: "review_evidence_stale",
    };
  }
  if (opts.verdict === "pass") {
    return {
      action: "complete",
      completion_satisfied: true,
      semantic_work_required: false,
      reason_code: "review_passed",
    };
  }
  if (opts.verdict === "rework") {
    return {
      action: "rework",
      completion_satisfied: false,
      semantic_work_required: true,
      reason_code: "review_rework_required",
    };
  }
  return {
    action: "attention",
    completion_satisfied: false,
    semantic_work_required: false,
    reason_code: "review_attention_required",
  };
}

export function incompleteRequiredWorkItems(task: TaskAggregate | null): readonly WorkItem[] {
  return (
    task?.current_plan?.proposal.work_items.work_items.filter(
      (item) => !item.optional && task.work_items[item.id]?.state !== "COMPLETED",
    ) ?? []
  );
}

export function requiredWorkItemsComplete(task: TaskAggregate | null): boolean {
  return task !== null && incompleteRequiredWorkItems(task).length === 0;
}

export function evaluateTaskCompletion(opts: {
  task: TaskAggregate;
  repository_digest: Sha256Digest;
  pending_effects: ReconciliationSnapshot["pending_effects"];
}): CompletionEvaluation {
  const reasons: string[] = [];
  const plan = opts.task.current_plan;
  if (!plan) reasons.push("plan_missing");
  else if (plan.approval.state !== "approved" || plan.approval.approved_digest !== plan.digest) {
    reasons.push("current_plan_not_approved");
  }
  reasons.push(
    ...incompleteRequiredWorkItems(opts.task).map(
      (item) => `required_work_item_incomplete:${item.id}`,
    ),
  );
  if (plan) {
    for (const item of plan.proposal.work_items.work_items) {
      const runtime = opts.task.work_items[item.id];
      if (
        runtime?.state === "COMPLETED" &&
        !requiredOutputManifestsPresent(item, runtime.output_manifests)
      ) {
        reasons.push(`required_output_missing_or_stale:${item.id}`);
      }
    }
  }
  if (opts.task.final_validation?.status !== "passed") reasons.push("final_validation_missing");
  if (opts.task.final_validation?.stale_evidence.length) reasons.push("final_validation_stale");
  if (opts.pending_effects.some((effect) => !["applied", "reconciled"].includes(effect.state))) {
    reasons.push("pending_or_uncertain_effect");
  }
  return Object.freeze({ eligible: reasons.length === 0, reason_codes: reasons });
}

export function aggregateValidation(
  plan: {
    checks: readonly { id: string; required: boolean }[];
    criteria: readonly { id: string; required: boolean; check_ids: readonly string[] }[];
  },
  evidence: ValidationResult["evidence"],
): ValidationResult {
  const byId = new Map(evidence.map((item) => [item.check_id, item]));
  const stale = evidence.filter((item) => item.status === "stale").map((item) => item.check_id);
  const unsatisfied = plan.criteria
    .filter(
      (criterion) =>
        criterion.required &&
        criterion.check_ids.some((checkId) => byId.get(checkId)?.status !== "passed"),
    )
    .map((criterion) => criterion.id);
  const unsupportedRequired = plan.checks.some(
    (check) => check.required && byId.get(check.id)?.status === "unsupported",
  );
  return Object.freeze({
    schema_version: 1,
    status: unsupportedRequired
      ? "blocked"
      : unsatisfied.length > 0 || stale.length > 0
        ? "failed"
        : "passed",
    evidence,
    unsatisfied_criteria: unsatisfied,
    stale_evidence: stale,
  });
}
