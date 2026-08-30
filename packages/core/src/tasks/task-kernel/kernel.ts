import { createHash } from "node:crypto";

import {
  authorityBindsCurrentState,
  executionRequirementsAreSubset,
  validateWorkItemDefinitions,
} from "./invariants.js";
import type {
  DomainEvent,
  EffectState,
  ExternalEffect,
  ExecutionRequirements,
  KernelInput,
  KernelRejectionCode,
  KernelResult,
  MutationReceipt,
  OutputManifest,
  PlanRecord,
  Sha256Digest,
  TaskAggregate,
  TaskCommand,
  TaskState,
  ValidationRecord,
  WorkItemRuntime,
  WorkItemState,
} from "./model.js";

const TASK_TRANSITIONS: Readonly<Record<TaskState, readonly TaskState[]>> = {
  CAPTURED: ["PLANNING", "CANCELLED"],
  PLANNING: ["AWAITING_PLAN_APPROVAL", "CANCELLED"],
  AWAITING_PLAN_APPROVAL: ["PLANNING", "ACTIVE", "CANCELLED"],
  ACTIVE: ["FINAL_VALIDATION", "HUMAN_REQUIRED", "BLOCKED", "EFFECT_IN_DOUBT", "CANCELLED"],
  FINAL_VALIDATION: [
    "ACTIVE",
    "COMPLETED",
    "HUMAN_REQUIRED",
    "BLOCKED",
    "EFFECT_IN_DOUBT",
    "CANCELLED",
  ],
  COMPLETED: [],
  HUMAN_REQUIRED: ["ACTIVE", "BLOCKED", "CANCELLED"],
  BLOCKED: ["ACTIVE", "HUMAN_REQUIRED", "CANCELLED"],
  EFFECT_IN_DOUBT: ["ACTIVE"],
  CANCELLED: [],
};

const TASK_ACTION_TRANSITIONS: Readonly<
  Record<
    Extract<TaskCommand, { kind: "transition_task" }>["action"],
    readonly (readonly [TaskState, TaskState])[]
  >
> = {
  request_human: [
    ["ACTIVE", "HUMAN_REQUIRED"],
    ["FINAL_VALIDATION", "HUMAN_REQUIRED"],
    ["BLOCKED", "HUMAN_REQUIRED"],
  ],
  block: [
    ["ACTIVE", "BLOCKED"],
    ["FINAL_VALIDATION", "BLOCKED"],
    ["HUMAN_REQUIRED", "BLOCKED"],
  ],
  resume: [
    ["FINAL_VALIDATION", "ACTIVE"],
    ["HUMAN_REQUIRED", "ACTIVE"],
    ["BLOCKED", "ACTIVE"],
  ],
  cancel: [
    ["CAPTURED", "CANCELLED"],
    ["PLANNING", "CANCELLED"],
    ["AWAITING_PLAN_APPROVAL", "CANCELLED"],
    ["ACTIVE", "CANCELLED"],
    ["FINAL_VALIDATION", "CANCELLED"],
    ["HUMAN_REQUIRED", "CANCELLED"],
    ["BLOCKED", "CANCELLED"],
  ],
};

const WORK_ITEM_ACTION_TRANSITIONS: Readonly<
  Record<
    Extract<TaskCommand, { kind: "transition_work_item" }>["action"],
    readonly (readonly [WorkItemState, WorkItemState])[]
  >
> = {
  claim: [
    ["READY", "CLAIMED"],
    ["REWORK_READY", "CLAIMED"],
  ],
  begin: [["CLAIMED", "EXECUTING"]],
  inspect: [["RESULT_RECEIVED", "INSPECTING"]],
  validate: [["INSPECTING", "VALIDATING"]],
  rework: [["VALIDATING", "REWORK_READY"]],
  block: [
    ["READY", "BLOCKED"],
    ["CLAIMED", "BLOCKED"],
    ["EXECUTING", "BLOCKED"],
    ["RESULT_RECEIVED", "BLOCKED"],
    ["INSPECTING", "BLOCKED"],
    ["VALIDATING", "BLOCKED"],
    ["REWORK_READY", "BLOCKED"],
    ["EFFECT_IN_DOUBT", "BLOCKED"],
  ],
  resume: [["BLOCKED", "READY"]],
  complete: [["VALIDATING", "COMPLETED"]],
  cancel: [
    ["PLANNED", "CANCELLED"],
    ["READY", "CANCELLED"],
    ["CLAIMED", "CANCELLED"],
    ["EXECUTING", "CANCELLED"],
    ["RESULT_RECEIVED", "CANCELLED"],
    ["INSPECTING", "CANCELLED"],
    ["VALIDATING", "CANCELLED"],
    ["REWORK_READY", "CANCELLED"],
    ["BLOCKED", "CANCELLED"],
    ["EFFECT_IN_DOUBT", "CANCELLED"],
  ],
};

const EFFECT_OBSERVE_TRANSITIONS: Readonly<
  Record<EffectState, readonly ("APPLIED" | "NOT_APPLIED" | "IN_DOUBT")[]>
> = {
  PREPARED: ["APPLIED", "NOT_APPLIED", "IN_DOUBT"],
  PENDING: ["APPLIED", "NOT_APPLIED", "IN_DOUBT"],
  APPLIED: ["APPLIED"],
  NOT_APPLIED: ["NOT_APPLIED"],
  IN_DOUBT: ["APPLIED", "NOT_APPLIED", "IN_DOUBT"],
  RECONCILED: [],
  SUPERSEDED: [],
};

const EVENT_KIND: Readonly<Record<TaskCommand["kind"], DomainEvent["kind"]>> = {
  capture_intent: "intent_captured",
  transition_task: "task_transitioned",
  propose_plan: "plan_proposed",
  reject_plan: "plan_rejected",
  approve_plan: "plan_approved",
  materialize_work_items: "work_items_materialized",
  transition_work_item: "work_item_transitioned",
  accept_work_item_result: "work_item_result_accepted",
  record_work_item_validation: "work_item_validation_recorded",
  record_final_validation: "final_validation_recorded",
  prepare_effect: "effect_prepared",
  observe_effect: "effect_observed",
  reconcile_effect: "effect_reconciled",
  supersede_effect: "effect_superseded",
  amend_plan: "plan_amended",
  request_authority_delta: "authority_delta_requested",
  complete_task: "task_completed",
  record_controller_transfer: "controller_transferred",
  record_migration: "migration_recorded",
};

function canonicalValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map((item) => canonicalValue(item));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, item]) => item !== undefined)
        .toSorted(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
        .map(([key, item]) => [key, canonicalValue(item)]),
    );
  }
  return value;
}

export function kernelDigest(value: unknown): Sha256Digest {
  const input = JSON.stringify(canonicalValue(value));
  return `sha256:${createHash("sha256").update(input, "utf8").digest("hex")}`;
}

function rejected(
  code: KernelRejectionCode,
  facts: readonly string[],
  requiredAction: string | null = "request_fresh_packet",
): KernelResult {
  return { kind: "rejected", code, facts, required_action: requiredAction };
}

function taskTransitionAllowed(from: TaskState, to: TaskState): boolean {
  return TASK_TRANSITIONS[from].includes(to);
}

function planMatches(
  plan: PlanRecord | null,
  revision: number,
  digest: Sha256Digest,
): plan is PlanRecord {
  return plan !== null && plan.revision === revision && plan.digest === digest;
}

function requiredAuthority(input: KernelInput, workItemId: string | null): KernelResult | null {
  const authority = input.authority;
  if (!authority) return rejected("AUTHORITY_MISSING", [input.command.kind], "request_authority");
  if (authority.task_id !== input.aggregate.id) {
    return rejected("AUTHORITY_TASK_MISMATCH", [authority.task_id, input.aggregate.id]);
  }
  const occurredAt = Date.parse(input.occurred_at);
  const expiresAt = authority.expires_at === null ? Infinity : Date.parse(authority.expires_at);
  if (!Number.isFinite(occurredAt) || Number.isNaN(expiresAt) || occurredAt >= expiresAt) {
    return rejected("AUTHORITY_SCOPE_EXCEEDED", ["authority_expired_or_invalid_time"]);
  }
  const currentPlan = input.aggregate.current_plan;
  if (
    input.repository_fingerprint === null ||
    !authorityBindsCurrentState(authority, {
      task_id: input.aggregate.id,
      plan_revision: currentPlan?.revision ?? null,
      plan_digest: currentPlan?.digest ?? null,
      repository_fingerprint: input.repository_fingerprint,
      work_item_id: workItemId,
    })
  ) {
    return rejected("AUTHORITY_SCOPE_EXCEEDED", [authority.digest]);
  }
  return null;
}

function requirementsAllowed(
  input: KernelInput,
  requirements: ExecutionRequirements | undefined,
): boolean {
  return (
    requirements !== undefined &&
    input.authority !== null &&
    executionRequirementsAreSubset(input.authority, requirements) &&
    requirements.capabilities.every((capability) => input.actor.capabilities.includes(capability))
  );
}

function authorityWorkItem(command: TaskCommand): string | null {
  switch (command.kind) {
    case "transition_work_item":
    case "accept_work_item_result":
    case "record_work_item_validation": {
      return command.work_item_id;
    }
    default: {
      return null;
    }
  }
}

function hasEveryExpectedOutput(
  runtime: WorkItemRuntime,
  manifests: readonly OutputManifest[],
): boolean {
  const byId = new Map(manifests.map((manifest) => [manifest.id, manifest]));
  return runtime.definition.expected_outputs.every((id) => {
    const manifest = byId.get(id);
    return (
      manifest !== undefined &&
      manifest.task_id.length > 0 &&
      manifest.work_item_id === runtime.definition.id &&
      manifest.attempt === runtime.attempt
    );
  });
}

function isSha256Digest(value: string): value is Sha256Digest {
  return /^sha256:[0-9a-f]{64}$/u.test(value);
}

function outputManifestIsValid(manifest: OutputManifest): boolean {
  return (
    manifest.id.length > 0 &&
    manifest.kind.length > 0 &&
    isSha256Digest(manifest.digest) &&
    isSha256Digest(manifest.repository_fingerprint)
  );
}

function validationMatchesResult(
  validation: ValidationRecord | null,
  resultDigest: Sha256Digest | null,
): boolean {
  return (
    validation?.status === "PASSED" &&
    resultDigest !== null &&
    validation.identity.implementation_identity === resultDigest
  );
}

function validationIdentityMatchesResult(
  validation: ValidationRecord,
  resultDigest: Sha256Digest | null,
): boolean {
  const identity = validation.identity;
  return (
    resultDigest !== null &&
    isSha256Digest(resultDigest) &&
    identity.implementation_identity === resultDigest &&
    identity.check_id.trim().length > 0 &&
    isSha256Digest(identity.command_digest) &&
    isSha256Digest(identity.toolchain_digest) &&
    isSha256Digest(identity.environment_digest) &&
    validation.evidence_digests.length > 0 &&
    validation.evidence_digests.every((digest) => isSha256Digest(digest))
  );
}

function refreshReadyItems(
  workItems: Readonly<Record<string, WorkItemRuntime>>,
): Readonly<Record<string, WorkItemRuntime>> {
  const next: Record<string, WorkItemRuntime> = { ...workItems };
  for (const [id, runtime] of Object.entries(next)) {
    if (
      runtime.state === "PLANNED" &&
      runtime.definition.depends_on.every(
        (dependency) => next[dependency]?.state === "COMPLETED",
      ) &&
      requiredInputsPresent(runtime, next)
    ) {
      next[id] = { ...runtime, state: "READY", revision: runtime.revision + 1 };
    }
  }
  return next;
}

function requiredInputsPresent(
  runtime: WorkItemRuntime,
  workItems: Readonly<Record<string, WorkItemRuntime>>,
): boolean {
  return runtime.definition.required_inputs.every((id) =>
    Object.values(workItems).some(
      (producer) =>
        producer.definition.id !== runtime.definition.id &&
        producer.state === "COMPLETED" &&
        producer.definition.expected_outputs.includes(id) &&
        validationMatchesResult(producer.validation, producer.result_digest) &&
        hasEveryExpectedOutput(producer, producer.output_manifests) &&
        producer.output_manifests.some(
          (output) => output.id === id && outputManifestIsValid(output),
        ),
    ),
  );
}

function effectTransition(effect: ExternalEffect, state: EffectState): ExternalEffect {
  return { ...effect, state };
}

function taskStateAfterEffect(state: TaskState, effects: readonly ExternalEffect[]): TaskState {
  if (effects.some((effect) => effect.state === "IN_DOUBT")) return "EFFECT_IN_DOUBT";
  return state === "EFFECT_IN_DOUBT" ? "ACTIVE" : state;
}

function accept(input: KernelInput, next: TaskAggregate): KernelResult {
  const commandDigest = kernelDigest(input.command);
  const event: DomainEvent = {
    id: `${input.mutation_id}:${EVENT_KIND[input.command.kind]}`,
    kind: EVENT_KIND[input.command.kind],
    task_id: next.id,
    task_revision: next.revision,
    mutation_id: input.mutation_id,
    occurred_at: input.occurred_at,
    command_digest: commandDigest,
    payload_digest: kernelDigest({ kind: input.command.kind, aggregate_revision: next.revision }),
  };
  const receipt: MutationReceipt = {
    mutation_id: input.mutation_id,
    command_digest: commandDigest,
    before_revision: input.aggregate.revision,
    after_revision: next.revision,
    aggregate_digest: kernelDigest(next),
    event_digests: [kernelDigest(event)],
    effect_ids:
      input.command.kind === "prepare_effect"
        ? [input.command.effect.id]
        : input.command.kind === "observe_effect" ||
            input.command.kind === "reconcile_effect" ||
            input.command.kind === "supersede_effect"
          ? [input.command.effect_id]
          : [],
  };
  const aggregate: TaskAggregate = {
    ...next,
    mutation_receipts: { ...next.mutation_receipts, [input.mutation_id]: receipt },
  };
  return { kind: "accepted", aggregate, events: [event], receipts: [receipt] };
}

function preconditions(input: KernelInput): KernelResult | null {
  const commandDigest = kernelDigest(input.command);
  const existing = input.aggregate.mutation_receipts[input.mutation_id];
  if (existing) {
    if (existing.command_digest !== commandDigest) {
      return rejected("MUTATION_ID_CONFLICT", [input.mutation_id], "use_new_mutation_id");
    }
    return { kind: "accepted", aggregate: input.aggregate, events: [], receipts: [existing] };
  }
  if (input.aggregate.state === "COMPLETED" || input.aggregate.state === "CANCELLED") {
    return rejected("ILLEGAL_TASK_TRANSITION", [input.aggregate.state, input.command.kind]);
  }
  if (input.command.task_id !== input.aggregate.id) {
    return rejected("TASK_ID_MISMATCH", [input.command.task_id, input.aggregate.id]);
  }
  if (input.command.expected_task_revision !== input.aggregate.revision) {
    return rejected("STALE_TASK_REVISION", [
      String(input.command.expected_task_revision),
      String(input.aggregate.revision),
    ]);
  }
  if (
    input.repository_fingerprint === null ||
    input.command.expected_state_fingerprint !== input.repository_fingerprint
  ) {
    return rejected("STALE_STATE_FINGERPRINT", [
      input.command.expected_state_fingerprint,
      input.repository_fingerprint ?? "null",
    ]);
  }
  const uncertain = input.aggregate.effects.find((effect) => effect.state === "IN_DOUBT");
  if (
    uncertain &&
    input.command.kind !== "observe_effect" &&
    input.command.kind !== "reconcile_effect" &&
    input.command.kind !== "supersede_effect"
  ) {
    return rejected("EFFECT_RECONCILIATION_REQUIRED", [uncertain.id], "reconcile_effect");
  }
  const workItemId = authorityWorkItem(input.command);
  if (workItemId !== null) {
    if (input.aggregate.state !== "ACTIVE") {
      return rejected("ILLEGAL_TASK_TRANSITION", [input.aggregate.state, input.command.kind]);
    }
    if (!input.aggregate.current_plan) return rejected("CURRENT_PLAN_MISSING", []);
    if (input.aggregate.current_plan.state !== "APPROVED") {
      return rejected("CURRENT_PLAN_NOT_APPROVED", [input.aggregate.current_plan.state]);
    }
    const runtime = input.aggregate.work_items[workItemId];
    const definition = input.aggregate.current_plan.work_items.find(
      (item) => item.id === workItemId,
    );
    if (runtime && (!definition || kernelDigest(runtime.definition) !== kernelDigest(definition))) {
      return rejected("PLAN_DIGEST_MISMATCH", [workItemId, "runtime_definition_mismatch"]);
    }
    if (runtime && !requirementsAllowed(input, runtime.definition.execution_requirements)) {
      return rejected("AUTHORITY_SCOPE_EXCEEDED", [workItemId, "execution_requirements"]);
    }
  }
  return requiredAuthority(input, workItemId);
}

function amendPlan(
  input: KernelInput,
  command: Extract<TaskCommand, { kind: "amend_plan" }>,
): KernelResult {
  const aggregate = input.aggregate;
  const current = aggregate.current_plan;
  if (!planMatches(current, command.plan_revision, command.plan_digest)) {
    return rejected("PLAN_DIGEST_MISMATCH", [command.plan_digest]);
  }
  if (current.state !== "APPROVED") return rejected("CURRENT_PLAN_NOT_APPROVED", [current.state]);
  if (aggregate.state !== "ACTIVE" && aggregate.state !== "FINAL_VALIDATION") {
    return rejected("ILLEGAL_TASK_TRANSITION", [aggregate.state, command.kind]);
  }
  if (command.authority_delta_digest) {
    return rejected(
      "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
      [command.authority_delta_digest],
      "request_authority_delta",
    );
  }
  const proposed = command.amended_plan;
  if (proposed.revision !== current.revision + 1) {
    return rejected("PLAN_REVISION_MISMATCH", [String(proposed.revision)]);
  }
  if (
    command.amendment_digest !== kernelDigest(proposed) ||
    proposed.digest !==
      kernelDigest({ revision: proposed.revision, work_items: proposed.work_items })
  ) {
    return rejected("PLAN_DIGEST_MISMATCH", [proposed.digest]);
  }
  const issues = validateWorkItemDefinitions(proposed.work_items);
  if (issues.length > 0) return rejected("WORK_ITEM_DEPENDENCY_INCOMPLETE", issues);
  const originals = new Map(current.work_items.map((item) => [item.id, item]));
  if (
    proposed.work_items.length !== current.work_items.length ||
    proposed.work_items.some((item) => {
      const original = originals.get(item.id);
      return (
        !original ||
        (!original.optional && item.optional) ||
        !original.expected_outputs.every((id) => item.expected_outputs.includes(id)) ||
        !original.required_inputs.every((id) => item.required_inputs.includes(id)) ||
        !original.depends_on.every((id) => item.depends_on.includes(id)) ||
        !item.execution_requirements ||
        !original.execution_requirements ||
        !executionRequirementsAreSubset(
          original.execution_requirements,
          item.execution_requirements,
        ) ||
        !input.authority ||
        !executionRequirementsAreSubset(input.authority, item.execution_requirements)
      );
    })
  ) {
    return rejected(
      "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
      ["amendment_changes_authority_or_work_item_set"],
      "request_authority_delta",
    );
  }
  const pending = aggregate.effects.find((effect) =>
    ["PREPARED", "PENDING", "IN_DOUBT"].includes(effect.state),
  );
  if (pending) return rejected("EFFECT_RECONCILIATION_REQUIRED", [pending.id]);
  const definitions = new Map(proposed.work_items.map((item) => [item.id, item]));
  const workItems: Record<string, WorkItemRuntime> = {};
  for (const [id, runtime] of Object.entries(aggregate.work_items)) {
    const original = originals.get(id);
    const definition = definitions.get(id);
    if (!original || !definition || kernelDigest(runtime.definition) !== kernelDigest(original)) {
      return rejected("PLAN_DIGEST_MISMATCH", [id, "runtime_definition_mismatch"]);
    }
    const changed = kernelDigest(definition) !== kernelDigest(original);
    if (
      !["PLANNED", "READY", "REWORK_READY", "BLOCKED", "COMPLETED", "CANCELLED"].includes(
        runtime.state,
      ) ||
      (changed && (runtime.state === "COMPLETED" || runtime.state === "CANCELLED"))
    ) {
      return rejected(
        "ILLEGAL_WORK_ITEM_TRANSITION",
        [id, runtime.state, "amend_plan"],
        "wait_or_replan",
      );
    }
    workItems[id] = changed
      ? {
          ...runtime,
          definition,
          state: "PLANNED",
          revision: runtime.revision + 1,
          claim_id: null,
          result_digest: null,
          output_manifests: [],
          validation: null,
        }
      : runtime;
  }
  return accept(input, {
    ...aggregate,
    revision: aggregate.revision + 1,
    state: "ACTIVE",
    current_plan: { ...current, ...proposed },
    plan_history: [...aggregate.plan_history, { ...current, state: "SUPERSEDED" }],
    work_items: refreshReadyItems(workItems),
    final_validation: null,
  });
}

export function reduceTaskCommand(input: KernelInput): KernelResult {
  const blocked = preconditions(input);
  if (blocked) return blocked;

  const aggregate = input.aggregate;
  const command = input.command;
  let next: TaskAggregate;

  switch (command.kind) {
    case "capture_intent": {
      if (!taskTransitionAllowed(aggregate.state, "PLANNING")) {
        return rejected("ILLEGAL_TASK_TRANSITION", [aggregate.state, "PLANNING"]);
      }
      next = {
        ...aggregate,
        revision: aggregate.revision + 1,
        state: "PLANNING",
        intent_digest: command.intent_digest,
      };
      break;
    }
    case "transition_task": {
      const transition = TASK_ACTION_TRANSITIONS[command.action].find(
        ([from]) => from === aggregate.state,
      );
      if (!transition) {
        return rejected("ILLEGAL_TASK_TRANSITION", [aggregate.state, command.action]);
      }
      next = {
        ...aggregate,
        revision: aggregate.revision + 1,
        state: transition[1],
        final_validation: command.action === "resume" ? null : aggregate.final_validation,
      };
      break;
    }
    case "propose_plan": {
      if (!taskTransitionAllowed(aggregate.state, "AWAITING_PLAN_APPROVAL")) {
        return rejected("ILLEGAL_TASK_TRANSITION", [aggregate.state, "AWAITING_PLAN_APPROVAL"]);
      }
      if (command.plan.state !== "PROPOSED") {
        return rejected("ILLEGAL_TASK_TRANSITION", ["plan", command.plan.state]);
      }
      next = {
        ...aggregate,
        revision: aggregate.revision + 1,
        state: "AWAITING_PLAN_APPROVAL",
        current_plan: command.plan,
        plan_history: aggregate.current_plan
          ? [...aggregate.plan_history, aggregate.current_plan]
          : aggregate.plan_history,
        work_items: {},
        final_validation: null,
      };
      break;
    }
    case "reject_plan": {
      if (!planMatches(aggregate.current_plan, command.plan_revision, command.plan_digest)) {
        return rejected("PLAN_DIGEST_MISMATCH", [command.plan_digest]);
      }
      if (aggregate.current_plan.state !== "PROPOSED") {
        return rejected("ILLEGAL_TASK_TRANSITION", [aggregate.current_plan.state, "REJECTED"]);
      }
      next = {
        ...aggregate,
        revision: aggregate.revision + 1,
        state: "PLANNING",
        current_plan: { ...aggregate.current_plan, state: "REJECTED" },
      };
      break;
    }
    case "approve_plan": {
      const provenance = input.authority?.provenance;
      if (
        input.actor.kind !== "USER" ||
        provenance?.kind !== "USER" ||
        provenance.parent_authority_digest !== null ||
        provenance.actor_id !== input.actor.id ||
        provenance.evidence_digest !== command.approval_evidence_digest
      ) {
        return rejected("AUTHORITY_PROVENANCE_ESCALATION", [
          "plan_approval_requires_user_evidence",
        ]);
      }
      if (!planMatches(aggregate.current_plan, command.plan_revision, command.plan_digest)) {
        return rejected("PLAN_DIGEST_MISMATCH", [command.plan_digest]);
      }
      if (
        aggregate.current_plan.state !== "PROPOSED" ||
        !taskTransitionAllowed(aggregate.state, "ACTIVE")
      ) {
        return rejected("ILLEGAL_TASK_TRANSITION", [aggregate.state, "ACTIVE"]);
      }
      next = {
        ...aggregate,
        revision: aggregate.revision + 1,
        state: "ACTIVE",
        current_plan: {
          ...aggregate.current_plan,
          state: "APPROVED",
          approval_actor_id: input.actor.id,
          approval_evidence_digest: command.approval_evidence_digest,
        },
      };
      break;
    }
    case "materialize_work_items": {
      if (aggregate.state !== "ACTIVE") {
        return rejected("ILLEGAL_TASK_TRANSITION", [aggregate.state, command.kind]);
      }
      if (!planMatches(aggregate.current_plan, command.plan_revision, command.plan_digest)) {
        return rejected("PLAN_DIGEST_MISMATCH", [command.plan_digest]);
      }
      if (aggregate.current_plan.state !== "APPROVED") {
        return rejected("CURRENT_PLAN_NOT_APPROVED", [aggregate.current_plan.state]);
      }
      if (Object.keys(aggregate.work_items).length > 0) {
        return rejected("ILLEGAL_TASK_TRANSITION", ["work_items_already_materialized"]);
      }
      const graphIssues = validateWorkItemDefinitions(aggregate.current_plan.work_items);
      if (graphIssues.length > 0) {
        return rejected("WORK_ITEM_DEPENDENCY_INCOMPLETE", graphIssues);
      }
      const workItems = Object.fromEntries(
        aggregate.current_plan.work_items.map((definition) => [
          definition.id,
          {
            definition,
            state:
              definition.depends_on.length === 0 && definition.required_inputs.length === 0
                ? "READY"
                : "PLANNED",
            revision: 1,
            attempt: 0,
            claim_id: null,
            result_digest: null,
            output_manifests: [],
            validation: null,
          } satisfies WorkItemRuntime,
        ]),
      );
      next = { ...aggregate, revision: aggregate.revision + 1, work_items: workItems };
      break;
    }
    case "transition_work_item": {
      const runtime = aggregate.work_items[command.work_item_id];
      if (!runtime) return rejected("WORK_ITEM_MISSING", [command.work_item_id]);
      const transition = WORK_ITEM_ACTION_TRANSITIONS[command.action].find(
        ([from]) => from === runtime.state,
      );
      if (!transition) {
        return rejected("ILLEGAL_WORK_ITEM_TRANSITION", [runtime.state, command.action]);
      }
      if (
        command.action === "claim" &&
        !runtime.definition.depends_on.every(
          (dependency) => aggregate.work_items[dependency]?.state === "COMPLETED",
        )
      ) {
        return rejected("WORK_ITEM_DEPENDENCY_INCOMPLETE", runtime.definition.depends_on);
      }
      if (command.action === "claim" && !command.claim_id) {
        return rejected("ILLEGAL_WORK_ITEM_TRANSITION", ["claim_id_missing"]);
      }
      if (command.action === "claim" && !requiredInputsPresent(runtime, aggregate.work_items)) {
        return rejected("WORK_ITEM_DEPENDENCY_INCOMPLETE", runtime.definition.required_inputs);
      }
      if (command.action === "complete") {
        if (!hasEveryExpectedOutput(runtime, runtime.output_manifests)) {
          return rejected("WORK_ITEM_OUTPUT_MISSING", runtime.definition.expected_outputs);
        }
        if (!validationMatchesResult(runtime.validation, runtime.result_digest)) {
          return rejected("WORK_ITEM_VALIDATION_MISSING", [command.work_item_id]);
        }
      }
      const [, state] = transition;
      const updated: WorkItemRuntime = {
        ...runtime,
        state,
        revision: runtime.revision + 1,
        attempt: command.action === "claim" ? runtime.attempt + 1 : runtime.attempt,
        claim_id: command.action === "claim" ? command.claim_id : runtime.claim_id,
      };
      const workItems = { ...aggregate.work_items, [command.work_item_id]: updated };
      next = {
        ...aggregate,
        revision: aggregate.revision + 1,
        work_items: command.action === "complete" ? refreshReadyItems(workItems) : workItems,
      };
      break;
    }
    case "accept_work_item_result": {
      if (!planMatches(aggregate.current_plan, command.plan_revision, command.plan_digest)) {
        return rejected("PLAN_DIGEST_MISMATCH", [command.plan_digest]);
      }
      const runtime = aggregate.work_items[command.work_item_id];
      if (!runtime) return rejected("WORK_ITEM_MISSING", [command.work_item_id]);
      if (runtime.state !== "EXECUTING") {
        return rejected("ILLEGAL_WORK_ITEM_TRANSITION", [runtime.state, "RESULT_RECEIVED"]);
      }
      if (
        !isSha256Digest(command.result_digest) ||
        new Set(command.output_manifests.map((manifest) => manifest.id)).size !==
          command.output_manifests.length ||
        command.output_manifests.some(
          (manifest) =>
            !outputManifestIsValid(manifest) ||
            manifest.task_id !== aggregate.id ||
            manifest.plan_revision !== command.plan_revision ||
            manifest.work_item_id !== command.work_item_id ||
            manifest.attempt !== runtime.attempt ||
            manifest.repository_fingerprint !== input.repository_fingerprint,
        )
      ) {
        return rejected("WORK_ITEM_RESULT_TARGET_MISMATCH", [command.work_item_id]);
      }
      if (!hasEveryExpectedOutput(runtime, command.output_manifests)) {
        return rejected("WORK_ITEM_OUTPUT_MISSING", runtime.definition.expected_outputs);
      }
      next = {
        ...aggregate,
        revision: aggregate.revision + 1,
        work_items: {
          ...aggregate.work_items,
          [command.work_item_id]: {
            ...runtime,
            state: "RESULT_RECEIVED",
            revision: runtime.revision + 1,
            result_digest: command.result_digest,
            output_manifests: [...command.output_manifests],
            validation: null,
          },
        },
      };
      break;
    }
    case "record_work_item_validation": {
      const runtime = aggregate.work_items[command.work_item_id];
      if (!runtime) return rejected("WORK_ITEM_MISSING", [command.work_item_id]);
      if (!validationIdentityMatchesResult(command.validation, runtime.result_digest)) {
        return rejected("VALIDATION_IDENTITY_MISMATCH", [command.work_item_id]);
      }
      if (runtime.state !== "INSPECTING" && runtime.state !== "VALIDATING") {
        return rejected("ILLEGAL_WORK_ITEM_TRANSITION", [runtime.state, "VALIDATING"]);
      }
      next = {
        ...aggregate,
        revision: aggregate.revision + 1,
        work_items: {
          ...aggregate.work_items,
          [command.work_item_id]: {
            ...runtime,
            state: "VALIDATING",
            revision: runtime.revision + 1,
            validation: command.validation,
          },
        },
      };
      break;
    }
    case "record_final_validation": {
      if (!validationIdentityMatchesResult(command.validation, input.repository_fingerprint)) {
        return rejected("VALIDATION_IDENTITY_MISMATCH", ["final_validation"]);
      }
      if (command.validation.status !== "PASSED") {
        return rejected("FINAL_VALIDATION_MISSING", [command.validation.status]);
      }
      if (aggregate.state !== "ACTIVE" && aggregate.state !== "FINAL_VALIDATION") {
        return rejected("ILLEGAL_TASK_TRANSITION", [aggregate.state, "FINAL_VALIDATION"]);
      }
      if (!requiredWorkComplete(aggregate)) {
        return rejected("TASK_COMPLETION_INELIGIBLE", ["required_work_incomplete"]);
      }
      next = {
        ...aggregate,
        revision: aggregate.revision + 1,
        state: "FINAL_VALIDATION",
        final_validation: command.validation,
      };
      break;
    }
    case "prepare_effect": {
      if (aggregate.state !== "ACTIVE" && aggregate.state !== "FINAL_VALIDATION") {
        return rejected("ILLEGAL_TASK_TRANSITION", [aggregate.state, command.kind]);
      }
      if (
        !input.authority?.external_effects.includes(command.effect.kind) ||
        !requirementsAllowed(input, command.effect.execution_requirements)
      ) {
        return rejected("AUTHORITY_SCOPE_EXCEEDED", [command.effect.kind]);
      }
      if (
        aggregate.effects.some(
          (effect) =>
            effect.id === command.effect.id ||
            effect.idempotency_key === command.effect.idempotency_key,
        )
      ) {
        return rejected("MUTATION_ID_CONFLICT", [command.effect.id]);
      }
      if (
        command.effect.state !== "PREPARED" ||
        !command.effect.id.trim() ||
        !command.effect.idempotency_key.trim() ||
        !isSha256Digest(command.effect.request_digest)
      ) {
        return rejected("ILLEGAL_TASK_TRANSITION", ["effect", command.effect.state]);
      }
      next = {
        ...aggregate,
        revision: aggregate.revision + 1,
        effects: [...aggregate.effects, command.effect],
      };
      break;
    }
    case "observe_effect": {
      const index = aggregate.effects.findIndex((effect) => effect.id === command.effect_id);
      if (index === -1) return rejected("EFFECT_RECONCILIATION_REQUIRED", [command.effect_id]);
      if (
        !EFFECT_OBSERVE_TRANSITIONS[aggregate.effects[index]!.state].includes(
          command.observed_state,
        )
      ) {
        return rejected("EFFECT_RECONCILIATION_REQUIRED", [
          command.effect_id,
          aggregate.effects[index]!.state,
          command.observed_state,
        ]);
      }
      const effects = [...aggregate.effects];
      effects[index] = {
        ...effects[index]!,
        state: command.observed_state,
        observed_state_digest: command.observation_digest,
      };
      next = {
        ...aggregate,
        revision: aggregate.revision + 1,
        state: taskStateAfterEffect(aggregate.state, effects),
        effects,
      };
      break;
    }
    case "reconcile_effect": {
      const index = aggregate.effects.findIndex((effect) => effect.id === command.effect_id);
      if (index === -1) return rejected("EFFECT_RECONCILIATION_REQUIRED", [command.effect_id]);
      if (aggregate.effects[index]!.state !== "IN_DOUBT") {
        return rejected("EFFECT_RECONCILIATION_REQUIRED", [aggregate.effects[index]!.state]);
      }
      const effects = [...aggregate.effects];
      effects[index] = {
        ...effects[index]!,
        state: "RECONCILED",
        provider_receipt_digest: command.provider_receipt_digest,
        observed_state_digest: kernelDigest(command.resolution),
      };
      next = {
        ...aggregate,
        revision: aggregate.revision + 1,
        state: taskStateAfterEffect(aggregate.state, effects),
        effects,
      };
      break;
    }
    case "supersede_effect": {
      const index = aggregate.effects.findIndex((effect) => effect.id === command.effect_id);
      const replacement = aggregate.effects.find(
        (effect) => effect.id === command.replacement_effect_id,
      );
      if (
        index === -1 ||
        aggregate.effects[index]!.state !== "IN_DOUBT" ||
        replacement?.state !== "PREPARED" ||
        replacement?.id === command.effect_id
      ) {
        return rejected("EFFECT_RECONCILIATION_REQUIRED", [command.effect_id]);
      }
      const effects = [...aggregate.effects];
      effects[index] = effectTransition(effects[index]!, "SUPERSEDED");
      next = {
        ...aggregate,
        revision: aggregate.revision + 1,
        state: taskStateAfterEffect(aggregate.state, effects),
        effects,
      };
      break;
    }
    case "amend_plan": {
      return amendPlan(input, command);
    }
    case "request_authority_delta": {
      if (input.authority?.digest !== command.parent_authority_digest) {
        return rejected("AUTHORITY_SCOPE_EXCEEDED", [command.parent_authority_digest]);
      }
      next = { ...aggregate, revision: aggregate.revision + 1 };
      break;
    }
    case "complete_task": {
      if (!aggregate.current_plan) return rejected("CURRENT_PLAN_MISSING", []);
      if (aggregate.current_plan.state !== "APPROVED") {
        return rejected("CURRENT_PLAN_NOT_APPROVED", [aggregate.current_plan.state]);
      }
      const required = aggregate.current_plan.work_items.filter(
        (definition) => !definition.optional,
      );
      const incomplete = required.filter(
        (definition) => aggregate.work_items[definition.id]?.state !== "COMPLETED",
      );
      const invalidOutputs = required.filter((definition) => {
        const runtime = aggregate.work_items[definition.id];
        return !runtime || !hasEveryExpectedOutput(runtime, runtime.output_manifests);
      });
      const unresolvedEffects = aggregate.effects.filter((effect) =>
        ["PREPARED", "PENDING", "IN_DOUBT"].includes(effect.state),
      );
      if (
        input.repository_fingerprint === null ||
        !isTaskCompletionEligible(aggregate, input.repository_fingerprint)
      ) {
        return rejected("TASK_COMPLETION_INELIGIBLE", [
          ...incomplete.map((item) => `incomplete:${item.id}`),
          ...invalidOutputs.map((item) => `outputs:${item.id}`),
          ...unresolvedEffects.map((effect) => `effect:${effect.id}:${effect.state}`),
        ]);
      }
      next = { ...aggregate, revision: aggregate.revision + 1, state: "COMPLETED" };
      break;
    }
    case "record_controller_transfer": {
      if (
        !command.receipt.from_controller ||
        !command.receipt.to_controller ||
        command.receipt.from_controller === command.receipt.to_controller ||
        command.receipt.authority_digest !== input.authority?.digest
      ) {
        return rejected("CONTROLLER_TRANSFER_INVALID", [command.receipt.from_controller]);
      }
      next = {
        ...aggregate,
        revision: aggregate.revision + 1,
        controller_transfer: command.receipt,
      };
      break;
    }
    case "record_migration": {
      if (
        !command.receipt.migration_version ||
        command.receipt.canonical_digest === command.receipt.source_digest ||
        aggregate.migration_receipts.some(
          (receipt) => receipt.migration_version === command.receipt.migration_version,
        )
      ) {
        return rejected("MIGRATION_RECEIPT_INVALID", [command.receipt.migration_version]);
      }
      next = {
        ...aggregate,
        revision: aggregate.revision + 1,
        migration_receipts: [...aggregate.migration_receipts, command.receipt],
      };
      break;
    }
  }

  return accept(input, next);
}

export function isTaskCompletionEligible(
  aggregate: TaskAggregate,
  repositoryFingerprint: Sha256Digest,
): boolean {
  if (
    aggregate.state !== "FINAL_VALIDATION" ||
    aggregate.current_plan?.state !== "APPROVED" ||
    aggregate.final_validation?.status !== "PASSED" ||
    !validationIdentityMatchesResult(aggregate.final_validation, repositoryFingerprint)
  ) {
    return false;
  }
  return (
    requiredWorkComplete(aggregate) &&
    aggregate.effects.every((effect) =>
      ["APPLIED", "NOT_APPLIED", "RECONCILED", "SUPERSEDED"].includes(effect.state),
    )
  );
}

function requiredWorkComplete(aggregate: TaskAggregate): boolean {
  return (
    aggregate.current_plan?.state === "APPROVED" &&
    aggregate.current_plan.work_items
      .filter((definition) => !definition.optional)
      .every((definition) => {
        const runtime = aggregate.work_items[definition.id];
        return (
          runtime?.state === "COMPLETED" &&
          kernelDigest(runtime.definition) === kernelDigest(definition) &&
          hasEveryExpectedOutput(runtime, runtime.output_manifests) &&
          validationMatchesResult(runtime.validation, runtime.result_digest)
        );
      })
  );
}

export const TASK_TRANSITION_TABLE = TASK_TRANSITIONS;
export const TASK_ACTION_TRANSITION_TABLE = TASK_ACTION_TRANSITIONS;
export const WORK_ITEM_TRANSITION_TABLE = WORK_ITEM_ACTION_TRANSITIONS;
export const EFFECT_OBSERVE_TRANSITION_TABLE = EFFECT_OBSERVE_TRANSITIONS;
