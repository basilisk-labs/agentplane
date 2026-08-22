import { taskCentricDigest } from "./digest.js";
import type {
  ConfirmationDecision,
  Failure,
  HumanDecisionTicket,
  OutcomeDisposition,
  PlanAmendment,
  PlanRefinement,
  RecoveryDecision,
  RetryBudget,
  Sha256Digest,
  TaskAggregate,
} from "./model.js";

export type SupervisionOutcome =
  | "completed"
  | "failed"
  | "blocked"
  | "cancelled"
  | "awaiting_plan_approval"
  | "awaiting_effect_approval"
  | "human_required"
  | "external_wait"
  | "effect_in_doubt"
  | "stale_state";

const OUTCOME_DISPOSITIONS: Readonly<Record<SupervisionOutcome, OutcomeDisposition>> = {
  completed: { kind: "success", exit_code: 0, reason_code: "completed", terminal: true },
  failed: { kind: "failure", exit_code: 1, reason_code: "failed", terminal: true },
  blocked: { kind: "failure", exit_code: 2, reason_code: "blocked", terminal: false },
  cancelled: { kind: "failure", exit_code: 130, reason_code: "cancelled", terminal: true },
  awaiting_plan_approval: {
    kind: "pause",
    exit_code: 0,
    reason_code: "plan_approval_required",
    terminal: false,
  },
  awaiting_effect_approval: {
    kind: "pause",
    exit_code: 0,
    reason_code: "effect_approval_required",
    terminal: false,
  },
  human_required: {
    kind: "pause",
    exit_code: 0,
    reason_code: "human_required",
    terminal: false,
  },
  external_wait: { kind: "wait", exit_code: 0, reason_code: "external_wait", terminal: false },
  effect_in_doubt: {
    kind: "failure",
    exit_code: 3,
    reason_code: "effect_in_doubt",
    terminal: false,
  },
  stale_state: { kind: "failure", exit_code: 4, reason_code: "stale_state", terminal: false },
};

export function dispositionForOutcome(outcome: SupervisionOutcome): OutcomeDisposition {
  return OUTCOME_DISPOSITIONS[outcome];
}

export function recoveryDecisionForFailure(failure: Failure): RecoveryDecision {
  if (failure.kind === "effect_in_doubt") {
    return { action: "reconcile_effect", reason_code: "effect_must_be_reconciled", failure };
  }
  if (failure.kind === "auth") {
    return { action: "require_human", reason_code: "credentials_required", failure };
  }
  if (failure.kind === "policy" || failure.kind === "invalid_state") {
    return { action: "block", reason_code: `non_retryable_${failure.kind}`, failure };
  }
  if (failure.kind === "validation") {
    return failure.retryable
      ? { action: "repair", reason_code: "validation_repair", failure }
      : { action: "replan", reason_code: "validation_requires_replan", failure };
  }
  return failure.retryable
    ? { action: "retry", reason_code: "bounded_retry", failure }
    : { action: "block", reason_code: "non_retryable_failure", failure };
}

export function consumeRetryBudget(opts: {
  budget: RetryBudget;
  current_fingerprint: Sha256Digest;
}): RetryBudget | null {
  const budget =
    opts.budget.reset_fingerprint === opts.current_fingerprint
      ? opts.budget
      : { ...opts.budget, consumed: 0, reset_fingerprint: opts.current_fingerprint };
  if (budget.consumed >= budget.maximum) return null;
  return Object.freeze({ ...budget, consumed: budget.consumed + 1 });
}

export type ConfirmationFacts = Readonly<{
  plan_approved: boolean;
  plan_digest_matches: boolean;
  safe_local_effect: boolean;
  external_effect: boolean;
  destructive_effect: boolean;
  credentials_required: boolean;
  policy_allows_external_effect: boolean;
  effect_state: "none" | "pending" | "in_doubt";
}>;

export function decideConfirmation(facts: ConfirmationFacts): ConfirmationDecision {
  if (facts.effect_state === "in_doubt") {
    return { action: "wait", rule: "effect_in_doubt_requires_reconciliation", evidence: [] };
  }
  if (!facts.plan_approved || !facts.plan_digest_matches) {
    return { action: "require_plan_approval", rule: "exact_plan_approval", evidence: [] };
  }
  if (facts.credentials_required) {
    return { action: "require_human", rule: "credentials_are_human_authority", evidence: [] };
  }
  if (facts.destructive_effect) {
    return { action: "require_effect_approval", rule: "destructive_effect", evidence: [] };
  }
  if (facts.external_effect && !facts.policy_allows_external_effect) {
    return { action: "require_effect_approval", rule: "external_effect_policy", evidence: [] };
  }
  if (facts.safe_local_effect || facts.policy_allows_external_effect) {
    return { action: "proceed", rule: "approved_plan_autonomy", evidence: [] };
  }
  return { action: "deny", rule: "no_authorized_effect", evidence: [] };
}

export type PlanChangeClassification = Readonly<{
  material: boolean;
  reason_codes: readonly string[];
}>;

export function classifyPlanChange(refinement: PlanRefinement): PlanChangeClassification {
  const reasons: string[] = [];
  if (refinement.scope_roots_added.length > 0) reasons.push("scope_expanded");
  if (refinement.outputs_added.length > 0) reasons.push("outputs_changed");
  if (refinement.acceptance_changed) reasons.push("acceptance_changed");
  if (refinement.risk_changed) reasons.push("risk_changed");
  if (refinement.external_effects_added.length > 0) reasons.push("external_effects_changed");
  if (refinement.dependencies_changed) reasons.push("dependencies_changed");
  if (refinement.architecture_constraints_changed) reasons.push("architecture_changed");
  const knownLocal = new Set(["split", "reorder", "add_test", "clarify"]);
  if (refinement.operations.some((operation) => !knownLocal.has(operation))) {
    reasons.push("unknown_change");
  }
  return Object.freeze({ material: reasons.length > 0, reason_codes: reasons });
}

export type PlanRefinementApplication = Readonly<{
  action: "amended" | "replan_required";
  classification: PlanChangeClassification;
  task: TaskAggregate;
  amendment: PlanAmendment | null;
}>;

export function applyPlanRefinement(opts: {
  task: TaskAggregate;
  refinement: PlanRefinement;
  actor_id: string;
  at: string;
}): PlanRefinementApplication {
  const classification = classifyPlanChange(opts.refinement);
  const plan = opts.task.current_plan;
  if (
    !plan ||
    plan.approval.state !== "approved" ||
    plan.approval.approved_digest !== plan.digest
  ) {
    throw new Error("Plan refinement requires the exact approved current plan.");
  }
  if (classification.material) {
    return Object.freeze({
      action: "replan_required",
      classification,
      task: opts.task,
      amendment: null,
    });
  }
  const identity = {
    plan_revision: plan.revision,
    plan_digest: plan.digest,
    refinement: opts.refinement,
    actor_id: opts.actor_id,
    created_at: opts.at,
  };
  const digest = taskCentricDigest(identity);
  const amendment: PlanAmendment = Object.freeze({
    schema_version: 1,
    id: `amendment_${digest.slice(7, 31)}`,
    ...identity,
    digest,
  });
  const current = opts.task.plan_amendments ?? [];
  const existing = current.find((candidate) => candidate.digest === amendment.digest);
  if (existing) {
    return Object.freeze({
      action: "amended",
      classification,
      task: opts.task,
      amendment: existing,
    });
  }
  return Object.freeze({
    action: "amended",
    classification,
    amendment,
    task: Object.freeze({
      ...opts.task,
      revision: opts.task.revision + 1,
      event_cursor: opts.task.event_cursor + 1,
      plan_amendments: Object.freeze([...current, amendment]),
      updated_at: opts.at,
    }),
  });
}

export function createHumanDecisionTicket(opts: {
  kind: HumanDecisionTicket["kind"];
  question: string;
  alternatives: HumanDecisionTicket["alternatives"];
  required_authority: string;
  state_fingerprint: Sha256Digest;
  expires_at: string | null;
}): HumanDecisionTicket {
  const identity = {
    kind: opts.kind,
    question: opts.question,
    alternatives: opts.alternatives,
    required_authority: opts.required_authority,
    state_fingerprint: opts.state_fingerprint,
    expires_at: opts.expires_at,
  };
  const digest = taskCentricDigest(identity);
  return Object.freeze({
    schema_version: 1,
    id: `decision_${digest.slice("sha256:".length, "sha256:".length + 24)}`,
    ...identity,
    resume_token: digest,
  });
}

export function validateHumanDecisionAnswer(opts: {
  ticket: HumanDecisionTicket;
  state_fingerprint: Sha256Digest;
  answer_id: string;
  now: string;
}): void {
  if (opts.ticket.state_fingerprint !== opts.state_fingerprint) {
    throw new Error("Human decision answer is stale for the current state fingerprint.");
  }
  if (opts.ticket.expires_at && Date.parse(opts.ticket.expires_at) <= Date.parse(opts.now)) {
    throw new Error("Human decision ticket has expired.");
  }
  if (!opts.ticket.alternatives.some((alternative) => alternative.id === opts.answer_id)) {
    throw new Error("Human decision answer is not one of the offered alternatives.");
  }
}
