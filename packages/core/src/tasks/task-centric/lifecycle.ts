import { taskCentricDigest } from "./digest.js";
import {
  computeReadyWorkItems,
  requiredOutputManifestsPresent,
  WorkItemScheduler,
} from "./graph.js";
import { decideConfirmation, recoveryDecisionForFailure } from "./policy.js";
import type {
  ActorIdentity,
  ContextBundle,
  DomainEvent,
  ExecutionAuthority,
  LifecycleCommand,
  LifecycleInput,
  ReconciliationSnapshot,
  SemanticWorkRequest,
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
  if (plan) {
    for (const item of plan.proposal.work_items.work_items) {
      const runtime = opts.task.work_items[item.id];
      if (!item.optional && runtime?.state !== "COMPLETED") {
        reasons.push(`required_work_item_incomplete:${item.id}`);
      }
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

function event(opts: {
  snapshot: ReconciliationSnapshot;
  entity: DomainEvent["entity"];
  work_item_id: string | null;
  from: string | null;
  to: string;
  actor_id: string;
  cause_refs?: readonly string[];
}): DomainEvent {
  const plan = opts.snapshot.task.current_plan;
  const identity = {
    task_id: opts.snapshot.task.id,
    task_revision: opts.snapshot.task.revision,
    plan_revision: plan?.revision ?? null,
    plan_digest: plan?.digest ?? null,
    work_item_id: opts.work_item_id,
    entity: opts.entity,
    from: opts.from,
    to: opts.to,
    cause_refs: opts.cause_refs ?? [],
    actor_id: opts.actor_id,
    repository_fingerprint: opts.snapshot.repository.digest,
  };
  const digest = taskCentricDigest(identity);
  return Object.freeze({
    schema_version: 1,
    id: `event_${digest.slice(7, 31)}`,
    mutation_id: `mutation_${digest.slice(31, 55)}`,
    ...identity,
    at: opts.snapshot.repository.captured_at,
  });
}

function requestFor(opts: {
  snapshot: ReconciliationSnapshot;
  item: WorkItem;
  actor: ActorIdentity;
  context: ContextBundle;
  kind: SemanticWorkRequest["kind"];
}): SemanticWorkRequest {
  const plan = opts.snapshot.task.current_plan;
  if (!plan) throw new Error("Cannot request semantic work without a current plan.");
  const authority: ExecutionAuthority = {
    task_id: opts.snapshot.task.id,
    plan_revision: plan.revision,
    plan_digest: plan.digest,
    work_item_id: opts.item.id,
    repository_snapshot_digest: opts.snapshot.repository.digest,
    workspace: opts.context.authority.workspace,
    writable_roots: opts.item.scope_roots,
    allowed_operations: opts.context.authority.allowed_operations,
    expires_at: opts.context.authority.expires_at,
  };
  return Object.freeze({
    schema_version: 1,
    kind: opts.kind,
    task_id: opts.snapshot.task.id,
    plan_revision: plan.revision,
    plan_digest: plan.digest,
    work_item: opts.item,
    context: opts.context,
    authority,
    required_outputs: opts.item.expected_outputs,
    stop_rules: [
      "Do not mutate lifecycle, approval, Git integration, or validation truth.",
      "Return only semantic claims, questions, and artifact references.",
    ],
  });
}

export class LifecycleEngine {
  readonly scheduler: WorkItemScheduler;

  constructor(scheduler = new WorkItemScheduler(1)) {
    this.scheduler = scheduler;
  }

  decide(input: LifecycleInput & { context?: ContextBundle }): readonly LifecycleCommand[] {
    const { snapshot } = input;
    const task = snapshot.task;
    const plan = task.current_plan;
    if (task.lifecycle === "COMPLETED" || task.lifecycle === "CANCELLED") {
      return [{ kind: "complete" }];
    }
    if (snapshot.pending_effects.some((effect) => effect.state === "effect_in_doubt")) {
      return [
        {
          kind: "decision",
          decision: { action: "wait", rule: "effect_in_doubt_reconciliation", evidence: [] },
        },
      ];
    }
    if (
      !plan ||
      plan.approval.state !== "approved" ||
      plan.approval.approved_digest !== plan.digest
    ) {
      return [
        {
          kind: "decision",
          decision: decideConfirmation({
            plan_approved: false,
            plan_digest_matches: false,
            safe_local_effect: false,
            external_effect: false,
            destructive_effect: false,
            credentials_required: false,
            policy_allows_external_effect: false,
            effect_state: "none",
          }),
        },
      ];
    }
    if (input.failure) {
      const recovery = recoveryDecisionForFailure(input.failure);
      return [
        {
          kind: "decision",
          decision: {
            action:
              recovery.action === "require_human"
                ? "require_human"
                : recovery.action === "reconcile_effect"
                  ? "wait"
                  : recovery.action === "block"
                    ? "deny"
                    : "proceed",
            rule: recovery.reason_code,
            evidence: recovery.failure.cause_refs,
          },
        },
      ];
    }
    if (input.semantic_result) {
      const result = input.semantic_result;
      if (
        result.task_id !== task.id ||
        result.plan_revision !== plan.revision ||
        result.plan_digest !== plan.digest ||
        result.context_digest !== input.context?.digest
      ) {
        return [
          {
            kind: "decision",
            decision: { action: "deny", rule: "stale_semantic_result", evidence: [] },
          },
        ];
      }
    }
    if (input.validation_result) {
      const workItemId = input.semantic_result?.work_item_id ?? null;
      if (input.validation_result.status === "passed") {
        return [
          {
            kind: "transition",
            event: event({
              snapshot,
              entity: workItemId ? "work_item" : "task",
              work_item_id: workItemId,
              from: workItemId ? (task.work_items[workItemId]?.state ?? null) : task.lifecycle,
              to: workItemId ? "COMPLETED" : "COMPLETED",
              actor_id: input.actor?.id ?? "agentplane",
              cause_refs: input.validation_result.evidence.map((evidence) => evidence.check_id),
            }),
          },
        ];
      }
      return [
        {
          kind: "transition",
          event: event({
            snapshot,
            entity: "work_item",
            work_item_id: workItemId,
            from: workItemId ? (task.work_items[workItemId]?.state ?? null) : null,
            to: "REWORK_READY",
            actor_id: input.actor?.id ?? "agentplane",
            cause_refs: input.validation_result.unsatisfied_criteria,
          }),
        },
      ];
    }

    const selected = this.scheduler.select({
      graph: plan.proposal.work_items,
      runtime: task.work_items,
      active_leases: snapshot.active_leases,
    });
    if (selected.length > 0 && input.actor && input.context) {
      const item = selected[0]!;
      const runtime = task.work_items[item.id];
      const kind = runtime?.state === "REWORK_READY" ? "repair" : "execute";
      return [
        {
          kind: "request_semantic_work",
          request: requestFor({ snapshot, item, actor: input.actor, context: input.context, kind }),
        },
      ];
    }
    const readiness = computeReadyWorkItems({
      graph: plan.proposal.work_items,
      runtime: task.work_items,
      active_leases: snapshot.active_leases,
    });
    if (readiness.every((item) => task.work_items[item.work_item_id]?.state === "COMPLETED")) {
      return [
        { kind: "run_validation", plan: plan.proposal.top_level_validation, work_item_id: null },
      ];
    }
    return [
      {
        kind: "decision",
        decision: {
          action: "wait",
          rule: "no_ready_work_item",
          evidence: readiness.flatMap((item) => item.reason_codes),
        },
      },
    ];
  }
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
