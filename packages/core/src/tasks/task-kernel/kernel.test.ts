import { describe, expect, it } from "vitest";

import {
  isTaskCompletionEligible,
  kernelDigest,
  reduceTaskCommand,
  TASK_TRANSITION_TABLE,
  WORK_ITEM_TRANSITION_TABLE,
} from "./kernel.js";
import type {
  ExecutionAuthority,
  KernelInput,
  OutputManifest,
  PlanRecord,
  Sha256Digest,
  TaskAggregate,
  TaskCommand,
  ValidationRecord,
  WorkItemRuntime,
} from "./model.js";

const fingerprint = kernelDigest("repository-state");
const resultDigest = kernelDigest("implementation-result");

const plan: PlanRecord = {
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
      optional: false,
    },
  ],
};

const authority: ExecutionAuthority = {
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
  resources: [],
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

function runtime(state: WorkItemRuntime["state"]): WorkItemRuntime {
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

function aggregate(overrides: Partial<TaskAggregate> = {}): TaskAggregate {
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

function input(state: TaskAggregate, command: TaskCommand, mutationId = "mutation-1"): KernelInput {
  return {
    aggregate: state,
    command,
    actor: {
      id: "agent-1",
      kind: "AGENT",
      transport: "managed",
      capabilities: ["repository_write"],
    },
    authority,
    repository_fingerprint: fingerprint,
    occurred_at: "2026-08-29T20:00:00.000Z",
    mutation_id: mutationId,
  };
}

function transitionCommand(
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

function manifest(): OutputManifest {
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

function validation(implementationIdentity: Sha256Digest): ValidationRecord {
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

describe("canonical task kernel reducer", () => {
  it("publishes closed task and WorkItem transition policies", () => {
    expect(Object.keys(TASK_TRANSITION_TABLE)).toHaveLength(10);
    expect(TASK_TRANSITION_TABLE.COMPLETED).toEqual([]);
    expect(WORK_ITEM_TRANSITION_TABLE.claim).toEqual([
      ["READY", "CLAIMED"],
      ["REWORK_READY", "CLAIMED"],
    ]);
  });

  it("rejects stale commands before changing aggregate state", () => {
    const state = aggregate();
    const command = { ...transitionCommand(state, "claim"), expected_task_revision: 6 };

    expect(reduceTaskCommand(input(state, command))).toMatchObject({
      kind: "rejected",
      code: "STALE_TASK_REVISION",
    });
    expect(state.work_items.kernel?.state).toBe("READY");
  });

  it("returns the original receipt for an exact mutation replay", () => {
    const state = aggregate();
    const command = transitionCommand(state, "claim");
    const first = reduceTaskCommand(input(state, command));
    expect(first.kind).toBe("accepted");
    if (first.kind !== "accepted") return;

    const replay = reduceTaskCommand(input(first.aggregate, command));
    expect(replay).toMatchObject({ kind: "accepted", events: [] });
    if (replay.kind === "accepted") {
      expect(replay.aggregate).toBe(first.aggregate);
      expect(replay.receipts).toEqual(first.receipts);
    }
  });

  it("binds accepted results and validation to the active WorkItem attempt", () => {
    const state = aggregate({ work_items: { kernel: runtime("EXECUTING") } });
    const missingOutput: Extract<TaskCommand, { kind: "accept_work_item_result" }> = {
      kind: "accept_work_item_result",
      task_id: state.id,
      expected_task_revision: state.revision,
      expected_state_fingerprint: fingerprint,
      plan_revision: plan.revision,
      plan_digest: plan.digest,
      work_item_id: "kernel",
      result_digest: resultDigest,
      output_manifests: [],
    };
    expect(reduceTaskCommand(input(state, missingOutput))).toMatchObject({
      kind: "rejected",
      code: "WORK_ITEM_OUTPUT_MISSING",
    });

    const accepted = reduceTaskCommand(
      input(state, { ...missingOutput, output_manifests: [manifest()] }),
    );
    expect(accepted).toMatchObject({
      kind: "accepted",
      aggregate: { work_items: { kernel: { state: "RESULT_RECEIVED" } } },
    });
    if (accepted.kind !== "accepted") return;

    const inspecting = aggregate({
      revision: accepted.aggregate.revision,
      work_items: {
        kernel: { ...accepted.aggregate.work_items.kernel!, state: "INSPECTING" },
      },
    });
    const recordValidation: Extract<TaskCommand, { kind: "record_work_item_validation" }> = {
      kind: "record_work_item_validation",
      task_id: state.id,
      expected_task_revision: inspecting.revision,
      expected_state_fingerprint: fingerprint,
      work_item_id: "kernel",
      validation: validation(resultDigest),
    };
    expect(reduceTaskCommand(input(inspecting, recordValidation, "mutation-2"))).toMatchObject({
      kind: "accepted",
      aggregate: { work_items: { kernel: { state: "VALIDATING" } } },
    });
    expect(
      reduceTaskCommand(
        input(
          inspecting,
          { ...recordValidation, validation: { ...validation(resultDigest), status: "FAILED" } },
          "mutation-3",
        ),
      ),
    ).toMatchObject({
      kind: "accepted",
      aggregate: {
        work_items: { kernel: { state: "VALIDATING", validation: { status: "FAILED" } } },
      },
    });
  });

  it("requires completed validated outputs and final validation for task completion", () => {
    const validRuntime: WorkItemRuntime = {
      ...runtime("COMPLETED"),
      result_digest: resultDigest,
      output_manifests: [manifest()],
      validation: validation(resultDigest),
    };
    const finalValidation = validation(fingerprint);
    const eligible = aggregate({
      state: "FINAL_VALIDATION",
      work_items: { kernel: validRuntime },
      final_validation: finalValidation,
    });
    expect(isTaskCompletionEligible(eligible, fingerprint)).toBe(true);
    expect(
      isTaskCompletionEligible(
        { ...eligible, work_items: { kernel: { ...validRuntime, output_manifests: [] } } },
        fingerprint,
      ),
    ).toBe(false);

    const complete: Extract<TaskCommand, { kind: "complete_task" }> = {
      kind: "complete_task",
      task_id: eligible.id,
      expected_task_revision: eligible.revision,
      expected_state_fingerprint: fingerprint,
    };
    expect(reduceTaskCommand(input(eligible, complete))).toMatchObject({
      kind: "accepted",
      aggregate: { state: "COMPLETED" },
    });
  });

  it("uses canonical JSON and real SHA-256 for stable identities", () => {
    expect(kernelDigest({ b: 2, a: 1 })).toBe(kernelDigest({ a: 1, b: 2 }));
    expect(kernelDigest({ a: 1 })).toMatch(/^sha256:[0-9a-f]{64}$/);
  });
});
