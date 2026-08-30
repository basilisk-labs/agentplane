import { describe, expect, it } from "vitest";

import {
  EFFECT_OBSERVE_TRANSITION_TABLE,
  isTaskCompletionEligible,
  kernelDigest,
  reduceTaskCommand,
  TASK_ACTION_TRANSITION_TABLE,
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
  TaskState,
  ValidationRecord,
  WorkItemRuntime,
  WorkItemState,
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
  it.each(["2026-08-29T19:00:00.000Z", "2026-08-29T20:00:00.000Z", "not-a-date"])(
    "rejects expired or malformed authority expiry %s",
    (expires_at) => {
      const state = aggregate();
      const invocation = input(state, transitionCommand(state, "claim"));
      expect(
        reduceTaskCommand({ ...invocation, authority: { ...authority, expires_at } }),
      ).toMatchObject({ kind: "rejected", code: "AUTHORITY_SCOPE_EXCEEDED" });
      expect(state.work_items.kernel?.state).toBe("READY");
    },
  );

  it("uses supplied time with offsets to enforce authority expiry", () => {
    const state = aggregate();
    const invocation = input(state, transitionCommand(state, "claim"));
    expect(
      reduceTaskCommand({
        ...invocation,
        authority: { ...authority, expires_at: "2026-08-29T23:01:00.000+03:00" },
      }).kind,
    ).toBe("accepted");
    expect(reduceTaskCommand({ ...invocation, occurred_at: "not-a-date" })).toMatchObject({
      kind: "rejected",
      code: "AUTHORITY_SCOPE_EXCEEDED",
    });
  });

  it("publishes closed task and WorkItem transition policies", () => {
    expect(Object.keys(TASK_TRANSITION_TABLE)).toHaveLength(10);
    expect(TASK_TRANSITION_TABLE.COMPLETED).toEqual([]);
    expect(WORK_ITEM_TRANSITION_TABLE.claim).toEqual([
      ["READY", "CLAIMED"],
      ["REWORK_READY", "CLAIMED"],
    ]);
  });

  it("maps every declared Task edge to an executable kernel operation", () => {
    const covered = new Set<string>();
    for (const transitions of Object.values(TASK_ACTION_TRANSITION_TABLE)) {
      for (const [from, to] of transitions) covered.add(`${from}->${to}`);
    }
    for (const edge of [
      "CAPTURED->PLANNING",
      "PLANNING->AWAITING_PLAN_APPROVAL",
      "AWAITING_PLAN_APPROVAL->PLANNING",
      "AWAITING_PLAN_APPROVAL->ACTIVE",
      "ACTIVE->FINAL_VALIDATION",
      "ACTIVE->EFFECT_IN_DOUBT",
      "FINAL_VALIDATION->COMPLETED",
      "FINAL_VALIDATION->EFFECT_IN_DOUBT",
      "EFFECT_IN_DOUBT->ACTIVE",
    ]) {
      covered.add(edge);
    }
    const declared = Object.entries(TASK_TRANSITION_TABLE).flatMap(([from, targets]) =>
      targets.map((to) => `${from}->${to}`),
    );
    expect([...covered].toSorted()).toEqual(declared.toSorted());
  });

  it("executes every explicit Task action vector with exact event and receipt ordering", () => {
    for (const [action, transitions] of Object.entries(TASK_ACTION_TRANSITION_TABLE)) {
      for (const [index, [from, to]] of transitions.entries()) {
        const state = aggregate({ state: from });
        const command: Extract<TaskCommand, { kind: "transition_task" }> = {
          kind: "transition_task",
          task_id: state.id,
          expected_task_revision: state.revision,
          expected_state_fingerprint: fingerprint,
          action: action as Extract<TaskCommand, { kind: "transition_task" }>["action"],
        };
        const result = reduceTaskCommand(input(state, command, `task-${action}-${index}`));
        expect(result.kind).toBe("accepted");
        if (result.kind !== "accepted") continue;
        expect(result.aggregate.state).toBe(to);
        expect(result.aggregate.revision).toBe(state.revision + 1);
        expect(result.events.map((event) => event.kind)).toEqual(["task_transitioned"]);
        expect(result.receipts).toHaveLength(1);
        expect(result.receipts[0]).toMatchObject({
          before_revision: state.revision,
          after_revision: state.revision + 1,
        });
      }
    }
  });

  it("executes every WorkItem action vector with exact event and receipt ordering", () => {
    for (const [action, transitions] of Object.entries(WORK_ITEM_TRANSITION_TABLE)) {
      for (const [index, [from, to]] of transitions.entries()) {
        const baseRuntime = runtime(from);
        const preparedRuntime: WorkItemRuntime =
          action === "complete"
            ? {
                ...baseRuntime,
                result_digest: resultDigest,
                output_manifests: [manifest()],
                validation: validation(resultDigest),
              }
            : baseRuntime;
        const state = aggregate({ work_items: { kernel: preparedRuntime } });
        const command = transitionCommand(
          state,
          action as Extract<TaskCommand, { kind: "transition_work_item" }>["action"],
        );
        const result = reduceTaskCommand(input(state, command, `work-item-${action}-${index}`));
        expect(result.kind).toBe("accepted");
        if (result.kind !== "accepted") continue;
        expect(result.aggregate.work_items.kernel?.state).toBe(to);
        expect(result.events.map((event) => event.kind)).toEqual(["work_item_transitioned"]);
        expect(result.receipts).toHaveLength(1);
      }
    }
  });

  it("rejects every WorkItem edge outside the closed action table", () => {
    const states: readonly WorkItemState[] = [
      "PLANNED",
      "READY",
      "CLAIMED",
      "EXECUTING",
      "RESULT_RECEIVED",
      "INSPECTING",
      "VALIDATING",
      "REWORK_READY",
      "COMPLETED",
      "BLOCKED",
      "EFFECT_IN_DOUBT",
      "CANCELLED",
    ];
    for (const [action, transitions] of Object.entries(WORK_ITEM_TRANSITION_TABLE)) {
      const allowed = new Set(transitions.map(([from]) => from));
      for (const from of states.filter((state) => !allowed.has(state))) {
        const state = aggregate({ work_items: { kernel: runtime(from) } });
        const command = transitionCommand(
          state,
          action as Extract<TaskCommand, { kind: "transition_work_item" }>["action"],
        );
        const result = reduceTaskCommand(input(state, command, `illegal-${action}-${from}`));
        expect(result).toMatchObject({ kind: "rejected", code: "ILLEGAL_WORK_ITEM_TRANSITION" });
        expect(state.work_items.kernel?.state).toBe(from);
      }
    }
  });

  it("rejects every Task action edge outside the closed action table", () => {
    const states = Object.keys(TASK_TRANSITION_TABLE) as TaskState[];
    for (const [action, transitions] of Object.entries(TASK_ACTION_TRANSITION_TABLE)) {
      const allowed = new Set(transitions.map(([from]) => from));
      for (const from of states.filter((state) => !allowed.has(state))) {
        const state = aggregate({ state: from });
        const command: Extract<TaskCommand, { kind: "transition_task" }> = {
          kind: "transition_task",
          task_id: state.id,
          expected_task_revision: state.revision,
          expected_state_fingerprint: fingerprint,
          action: action as Extract<TaskCommand, { kind: "transition_task" }>["action"],
        };
        const result = reduceTaskCommand(input(state, command, `illegal-task-${action}-${from}`));
        expect(result).toMatchObject({ kind: "rejected", code: "ILLEGAL_TASK_TRANSITION" });
        expect(state.state).toBe(from);
      }
    }
  });

  it("publishes closed effect observation transitions", () => {
    expect(EFFECT_OBSERVE_TRANSITION_TABLE).toEqual({
      PREPARED: ["APPLIED", "NOT_APPLIED", "IN_DOUBT"],
      PENDING: ["APPLIED", "NOT_APPLIED", "IN_DOUBT"],
      APPLIED: ["APPLIED"],
      NOT_APPLIED: ["NOT_APPLIED"],
      IN_DOUBT: ["APPLIED", "NOT_APPLIED", "IN_DOUBT"],
      RECONCILED: [],
      SUPERSEDED: [],
    });
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

  it.each<TaskState>(["CANCELLED", "COMPLETED", "PLANNING", "BLOCKED", "FINAL_VALIDATION"])(
    "rejects WorkItem execution while the Task is %s",
    (taskState) => {
      const state = aggregate({ state: taskState });
      expect(reduceTaskCommand(input(state, transitionCommand(state, "claim")))).toMatchObject({
        kind: "rejected",
        code: "ILLEGAL_TASK_TRANSITION",
      });
    },
  );

  it("requires the current approved plan before executing WorkItems", () => {
    for (const current_plan of [null, { ...plan, state: "PROPOSED" as const }]) {
      const state = aggregate({ current_plan });
      expect(reduceTaskCommand(input(state, transitionCommand(state, "claim"))).kind).toBe(
        "rejected",
      );
    }
  });

  it("blocks missing input manifests and permits validated producer outputs", () => {
    const consumer = {
      ...runtime("READY"),
      definition: { ...plan.work_items[0]!, required_inputs: ["upstream"] },
    };
    const current_plan = {
      ...plan,
      work_items: [
        consumer.definition,
        { ...plan.work_items[0]!, id: "producer", expected_outputs: ["upstream"] },
      ],
    };
    const state = aggregate({ current_plan, work_items: { kernel: consumer } });
    const empty = aggregate({ current_plan, work_items: {} });
    expect(
      reduceTaskCommand(
        input(empty, {
          kind: "materialize_work_items",
          task_id: empty.id,
          expected_task_revision: empty.revision,
          expected_state_fingerprint: fingerprint,
          plan_revision: plan.revision,
          plan_digest: plan.digest,
        }),
      ),
    ).toMatchObject({
      kind: "accepted",
      aggregate: {
        work_items: {
          kernel: { state: "PLANNED" },
          producer: { state: "READY" },
        },
      },
    });
    expect(reduceTaskCommand(input(state, transitionCommand(state, "claim")))).toMatchObject({
      kind: "rejected",
      code: "WORK_ITEM_DEPENDENCY_INCOMPLETE",
    });
    const producer = {
      ...runtime("COMPLETED"),
      definition: { ...plan.work_items[0]!, id: "producer", expected_outputs: ["upstream"] },
      result_digest: resultDigest,
      validation: validation(resultDigest),
      output_manifests: [{ ...manifest(), id: "upstream", work_item_id: "producer" }],
    };
    const ready = aggregate({ current_plan, work_items: { kernel: consumer, producer } });
    expect(reduceTaskCommand(input(ready, transitionCommand(ready, "claim"))).kind).toBe(
      "accepted",
    );
    for (const source of [
      { ...producer, state: "EXECUTING" as const },
      { ...producer, output_manifests: [] },
      { ...producer, validation: null },
    ]) {
      const invalid = aggregate({
        current_plan,
        work_items: { kernel: consumer, producer: source },
      });
      expect(reduceTaskCommand(input(invalid, transitionCommand(invalid, "claim"))).kind).toBe(
        "rejected",
      );
    }
    const waiting = aggregate({
      current_plan,
      work_items: {
        kernel: { ...consumer, state: "PLANNED" },
        producer: { ...producer, state: "VALIDATING" },
      },
    });
    const completion = { ...transitionCommand(waiting, "complete"), work_item_id: "producer" };
    expect(reduceTaskCommand(input(waiting, completion))).toMatchObject({
      kind: "accepted",
      aggregate: { work_items: { kernel: { state: "READY" } } },
    });
    const mismatched = aggregate({ work_items: { kernel: consumer } });
    expect(
      reduceTaskCommand(input(mismatched, transitionCommand(mismatched, "claim"))),
    ).toMatchObject({ kind: "rejected", code: "PLAN_DIGEST_MISMATCH" });
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

  it("rejects reuse of a mutation identity with a changed command", () => {
    const state = aggregate();
    const command = transitionCommand(state, "claim");
    const first = reduceTaskCommand(input(state, command));
    expect(first.kind).toBe("accepted");
    if (first.kind !== "accepted") return;

    const changed = { ...command, claim_id: "different-claim" };
    expect(reduceTaskCommand(input(first.aggregate, changed))).toMatchObject({
      kind: "rejected",
      code: "MUTATION_ID_CONFLICT",
    });
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
    for (const missing of [
      null,
      { ...validation(resultDigest), status: "FAILED" as const },
      validation(kernelDigest("stale")),
    ]) {
      const invalid = {
        ...eligible,
        work_items: { kernel: { ...validRuntime, validation: missing } },
      };
      expect(isTaskCompletionEligible(invalid, fingerprint)).toBe(false);
      expect(reduceTaskCommand(input(invalid, complete))).toMatchObject({
        kind: "rejected",
        code: "TASK_COMPLETION_INELIGIBLE",
      });
    }
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
