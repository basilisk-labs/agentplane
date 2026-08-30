import { kernelDigest } from "./kernel.js";
import type {
  ExecutionAuthority,
  ExecutionRequirements,
  ExternalEffect,
  KernelInput,
  OutputManifest,
  PlanRecord,
  Sha256Digest,
  TaskAggregate,
  TaskCommand,
  ValidationRecord,
  WorkItemRuntime,
  WorkItemDefinition,
} from "./model.js";

export const fingerprint = kernelDigest("repository-state");
export const resultDigest = kernelDigest("implementation-result");
export const requirements: ExecutionRequirements = {
  scope_roots: ["packages/core/src/tasks/task-kernel"],
  repository_effects: ["source_code"],
  external_effects: [],
  capabilities: ["repository_write"],
  resources: ["kernel-work"],
};

export const plan: PlanRecord = {
  revision: 1,
  digest: kernelDigest("plan-1"),
  state: "APPROVED",
  approval_actor_id: "user-1",
  approval_evidence_digest: kernelDigest("approval"),
  work_items: [
    {
      id: "kernel",
      depends_on: [],
      required_inputs: [],
      expected_outputs: ["kernel-source"],
      execution_requirements: requirements,
      optional: false,
    },
  ],
};

export const authority: ExecutionAuthority = {
  digest: kernelDigest("authority"),
  task_id: "task-1",
  plan_revision: plan.revision,
  plan_digest: plan.digest,
  work_item_id: null,
  repository_identity: kernelDigest("repository"),
  repository_fingerprint: fingerprint,
  scope_roots: ["packages/core/src/tasks/task-kernel"],
  repository_effects: ["source_code", "tests"],
  external_effects: [],
  capabilities: ["repository_write"],
  resources: ["kernel-work"],
  validation_requirements: ["focused-tests"],
  policy_digests: [],
  completion_requirements: ["validation"],
  risk: {
    requirements: "bounded",
    implementation: "bounded",
    reversibility: "reversible",
  },
  provenance: {
    kind: "USER",
    actor_id: "user-1",
    evidence_digest: kernelDigest("approval"),
    parent_authority_digest: null,
  },
  expires_at: null,
};

export function effect(id: string, state: ExternalEffect["state"]): ExternalEffect {
  return {
    id,
    kind: "pr.merge",
    execution_requirements: {
      scope_roots: [],
      repository_effects: [],
      external_effects: ["pr.merge"],
      capabilities: ["provider_write"],
      resources: ["pull:1"],
    },
    state,
    idempotency_key: id,
    request_digest: kernelDigest(id),
    provider_receipt_digest: null,
    observed_state_digest: null,
  };
}

export function runtime(state: WorkItemRuntime["state"]): WorkItemRuntime {
  return {
    definition: plan.work_items[0]!,
    state,
    revision: 1,
    attempt: 1,
    claim_id: "claim-1",
    result_digest: null,
    output_manifests: [],
    validation: null,
  };
}

export function aggregate(overrides: Partial<TaskAggregate> = {}): TaskAggregate {
  return {
    schema_version: 1,
    id: "task-1",
    revision: 7,
    state: "ACTIVE",
    intent_digest: kernelDigest("intent"),
    current_plan: plan,
    plan_history: [],
    work_items: { kernel: runtime("READY") },
    final_validation: null,
    effects: [],
    mutation_receipts: {},
    controller_transfer: null,
    migration_receipts: [],
    ...overrides,
  };
}

export function input(
  state: TaskAggregate,
  command: TaskCommand,
  mutationId = "mutation-1",
): KernelInput {
  return {
    aggregate: state,
    command,
    actor: {
      id: "agent-1",
      kind: "AGENT",
      transport: "managed",
      capabilities: ["repository_write", "provider_write"],
    },
    authority,
    repository_fingerprint: fingerprint,
    occurred_at: "2026-08-29T20:00:00.000Z",
    mutation_id: mutationId,
  };
}

export function transitionCommand(
  state: TaskAggregate,
  action: Extract<TaskCommand, { kind: "transition_work_item" }>["action"],
): Extract<TaskCommand, { kind: "transition_work_item" }> {
  return {
    kind: "transition_work_item",
    task_id: state.id,
    expected_task_revision: state.revision,
    expected_state_fingerprint: fingerprint,
    work_item_id: "kernel",
    action,
    claim_id: action === "claim" ? "claim-2" : null,
  };
}

export function manifest(): OutputManifest {
  return {
    id: "kernel-source",
    kind: "source",
    digest: kernelDigest("source"),
    task_id: "task-1",
    plan_revision: plan.revision,
    work_item_id: "kernel",
    attempt: 1,
    repository_fingerprint: fingerprint,
  };
}

export function validation(implementationIdentity: Sha256Digest): ValidationRecord {
  return {
    status: "PASSED",
    identity: {
      implementation_identity: implementationIdentity,
      check_id: "focused-tests",
      command_digest: kernelDigest("test-command"),
      toolchain_digest: kernelDigest("toolchain"),
      environment_digest: kernelDigest("environment"),
    },
    evidence_digests: [kernelDigest("test-evidence")],
    observed_at: "2026-08-29T20:01:00.000Z",
  };
}

export function amendmentCommand(
  state: TaskAggregate,
  work_items: readonly WorkItemDefinition[],
): Extract<TaskCommand, { kind: "amend_plan" }> {
  const revision = state.current_plan!.revision + 1;
  const amended_plan = { revision, work_items, digest: kernelDigest({ revision, work_items }) };
  return {
    kind: "amend_plan",
    task_id: state.id,
    expected_task_revision: state.revision,
    expected_state_fingerprint: fingerprint,
    plan_revision: state.current_plan!.revision,
    plan_digest: state.current_plan!.digest,
    amendment_digest: kernelDigest(amended_plan),
    amended_plan,
    authority_delta_digest: null,
  };
}
