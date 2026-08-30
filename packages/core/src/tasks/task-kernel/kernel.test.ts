import { createHash } from "node:crypto";

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
import type { TaskCommand, TaskState, WorkItemRuntime, WorkItemState } from "./model.js";
import {
  fingerprint,
  resultDigest,
  requirements,
  plan,
  authority,
  effect,
  runtime,
  aggregate,
  input,
  transitionCommand,
  manifest,
  validation,
  amendmentCommand,
} from "./kernel.test-fixtures.js";

describe("canonical task kernel reducer", () => {
  it("orders digest keys by code units independent of locale", () => {
    const expected = createHash("sha256").update('{"Z":2,"a":3,"ä":1}').digest("hex");
    expect(kernelDigest({ ä: 1, Z: 2, a: 3 })).toBe(`sha256:${expected}`);
  });

  it("applies a bounded amendment and preserves unchanged completed WorkItems", () => {
    const later = { ...plan.work_items[0]!, id: "later", expected_outputs: ["later-output"] };
    const completed = {
      ...runtime("COMPLETED"),
      result_digest: resultDigest,
      output_manifests: [manifest()],
      validation: validation(resultDigest),
    };
    const state = aggregate({
      current_plan: { ...plan, work_items: [plan.work_items[0]!, later] },
      work_items: { kernel: completed, later: { ...runtime("READY"), definition: later } },
    });
    const replacement = { ...later, expected_outputs: ["later-output", "changed-output"] };
    const command = amendmentCommand(state, [plan.work_items[0]!, replacement]);
    const result = reduceTaskCommand(input(state, command));
    expect(result.kind).toBe("accepted");
    if (result.kind !== "accepted") return;
    expect(result.aggregate.current_plan).toEqual({
      ...state.current_plan,
      ...command.amended_plan,
    });
    expect(result.aggregate.plan_history).toEqual([
      ...state.plan_history,
      { ...state.current_plan, state: "SUPERSEDED" },
    ]);
    expect(result.aggregate.work_items.kernel).toBe(completed);
    expect(result.aggregate.work_items.later).toMatchObject({
      definition: replacement,
      state: "READY",
      result_digest: null,
      validation: null,
      output_manifests: [],
    });
    expect(result.aggregate.final_validation).toBeNull();
    expect(result.events.map((event) => event.kind)).toEqual(["plan_amended"]);
    expect(reduceTaskCommand(input(result.aggregate, command))).toMatchObject({
      kind: "accepted",
      events: [],
      receipts: result.receipts,
    });
  });

  it("rejects widened, stale or malformed plan amendments", () => {
    const state = aggregate();
    const definition = plan.work_items[0]!;
    const widened = {
      ...definition,
      execution_requirements: { ...requirements, scope_roots: ["outside"] },
    };
    expect(reduceTaskCommand(input(state, amendmentCommand(state, [widened])))).toMatchObject({
      kind: "rejected",
      code: "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
    });
    const cyclic = { ...definition, depends_on: [definition.id] };
    expect(reduceTaskCommand(input(state, amendmentCommand(state, [cyclic])))).toMatchObject({
      kind: "rejected",
      code: "WORK_ITEM_DEPENDENCY_INCOMPLETE",
    });
    const command = amendmentCommand(state, [definition]);
    for (const weakened of [
      { ...definition, optional: true },
      { ...definition, expected_outputs: [] },
    ]) {
      expect(reduceTaskCommand(input(state, amendmentCommand(state, [weakened])))).toMatchObject({
        kind: "rejected",
        code: "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
      });
    }
    expect(
      reduceTaskCommand(input(state, { ...command, amendment_digest: kernelDigest("wrong") })),
    ).toMatchObject({ kind: "rejected", code: "PLAN_DIGEST_MISMATCH" });
    expect(
      reduceTaskCommand(
        input(state, { ...command, authority_delta_digest: kernelDigest("delta") }),
      ),
    ).toMatchObject({ kind: "rejected", code: "PLAN_SCOPE_EXPANSION_REQUIRES_USER" });
  });

  it.each([
    "CLAIMED",
    "EXECUTING",
    "RESULT_RECEIVED",
    "INSPECTING",
    "VALIDATING",
    "COMPLETED",
  ] as const)("does not replace %s work with an amendment", (workState) => {
    const state = aggregate({ work_items: { kernel: runtime(workState) } });
    const changed = { ...plan.work_items[0]!, expected_outputs: ["kernel-source", "new-output"] };
    expect(reduceTaskCommand(input(state, amendmentCommand(state, [changed])))).toMatchObject({
      kind: "rejected",
      code: "ILLEGAL_WORK_ITEM_TRANSITION",
    });
  });

  it("requires exact USER identity and root decision evidence for plan approval", () => {
    const state = aggregate({
      state: "AWAITING_PLAN_APPROVAL",
      current_plan: {
        ...plan,
        state: "PROPOSED",
        approval_actor_id: null,
        approval_evidence_digest: null,
      },
    });
    const command: TaskCommand = {
      kind: "approve_plan",
      task_id: state.id,
      expected_task_revision: state.revision,
      expected_state_fingerprint: fingerprint,
      plan_revision: plan.revision,
      plan_digest: plan.digest,
      approval_evidence_digest: authority.provenance.evidence_digest,
    };
    const correct = {
      ...input(state, command),
      actor: {
        ...input(state, command).actor,
        id: "user-1",
        kind: "USER" as const,
        transport: "host" as const,
      },
    };
    expect(reduceTaskCommand(correct)).toMatchObject({
      kind: "accepted",
      aggregate: {
        current_plan: {
          approval_actor_id: "user-1",
          approval_evidence_digest: authority.provenance.evidence_digest,
        },
      },
    });
    for (const invocation of [
      input(state, command),
      { ...correct, actor: { ...correct.actor, id: "another-user" } },
      {
        ...correct,
        authority: {
          ...authority,
          provenance: {
            ...authority.provenance,
            kind: "DELEGATED" as const,
            parent_authority_digest: kernelDigest("parent"),
          },
        },
      },
      { ...correct, command: { ...command, approval_evidence_digest: kernelDigest("invented") } },
    ])
      expect(reduceTaskCommand(invocation)).toMatchObject({
        kind: "rejected",
        code: "AUTHORITY_PROVENANCE_ESCALATION",
      });
  });

  it("enforces WorkItem execution requirements and actor capabilities", () => {
    const state = aggregate();
    for (const key of ["scope_roots", "repository_effects", "capabilities", "resources"] as const) {
      const invocation = input(state, transitionCommand(state, "claim"));
      expect(
        reduceTaskCommand({ ...invocation, authority: { ...authority, [key]: [] } }),
      ).toMatchObject({ kind: "rejected", code: "AUTHORITY_SCOPE_EXCEEDED" });
    }
    const invocation = input(state, transitionCommand(state, "claim"));
    expect(
      reduceTaskCommand({ ...invocation, actor: { ...invocation.actor, capabilities: [] } }),
    ).toMatchObject({ kind: "rejected", code: "AUTHORITY_SCOPE_EXCEEDED" });
  });

  it("requires complete work and full validation identity before final validation", () => {
    const state = aggregate();
    const command: TaskCommand = {
      kind: "record_final_validation",
      task_id: state.id,
      expected_task_revision: state.revision,
      expected_state_fingerprint: fingerprint,
      validation: validation(fingerprint),
    };
    expect(reduceTaskCommand(input(state, command))).toMatchObject({
      kind: "rejected",
      code: "TASK_COMPLETION_INELIGIBLE",
    });
    const completed = aggregate({
      work_items: {
        kernel: {
          ...runtime("COMPLETED"),
          result_digest: resultDigest,
          output_manifests: [manifest()],
          validation: validation(resultDigest),
        },
      },
    });
    expect(reduceTaskCommand(input(completed, command))).toMatchObject({
      kind: "accepted",
      aggregate: { state: "FINAL_VALIDATION" },
    });
    expect(
      reduceTaskCommand(
        input(completed, {
          ...command,
          validation: { ...command.validation, evidence_digests: [] },
        }),
      ),
    ).toMatchObject({ kind: "rejected", code: "VALIDATION_IDENTITY_MISMATCH" });
    for (const key of [
      "check_id",
      "command_digest",
      "toolchain_digest",
      "environment_digest",
    ] as const) {
      const malformed = {
        ...command,
        validation: {
          ...command.validation,
          identity: { ...command.validation.identity, [key]: "" },
        },
      };
      expect(reduceTaskCommand(input(completed, malformed))).toMatchObject({
        kind: "rejected",
        code: "VALIDATION_IDENTITY_MISMATCH",
      });
    }
  });
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
    for (const terminal of ["COMPLETED", "CANCELLED"] as const) {
      const terminalState = { ...first.aggregate, state: terminal };
      expect(reduceTaskCommand(input(terminalState, command))).toMatchObject({
        kind: "accepted",
        aggregate: terminalState,
        events: [],
        receipts: first.receipts,
      });
    }
  });

  it("requires active execution and matching authority to prepare effects", () => {
    const state = aggregate();
    const command: TaskCommand = {
      kind: "prepare_effect",
      task_id: state.id,
      expected_task_revision: state.revision,
      expected_state_fingerprint: fingerprint,
      effect: effect("merge", "PREPARED"),
    };
    for (const external_effects of [[], ["publish"]]) {
      expect(
        reduceTaskCommand({
          ...input(state, command),
          authority: { ...authority, external_effects },
        }),
      ).toMatchObject({ kind: "rejected", code: "AUTHORITY_SCOPE_EXCEEDED" });
    }
    const granted = {
      ...authority,
      external_effects: ["pr.merge"],
      capabilities: ["provider_write"],
      resources: ["pull:1"],
    };
    for (const key of ["capabilities", "resources"] as const) {
      expect(
        reduceTaskCommand({ ...input(state, command), authority: { ...granted, [key]: [] } }),
      ).toMatchObject({ kind: "rejected", code: "AUTHORITY_SCOPE_EXCEEDED" });
    }
    for (const active of ["ACTIVE", "FINAL_VALIDATION"] as const) {
      expect(
        reduceTaskCommand({ ...input({ ...state, state: active }, command), authority: granted })
          .kind,
      ).toBe("accepted");
    }
    for (const inactive of [
      "CAPTURED",
      "PLANNING",
      "AWAITING_PLAN_APPROVAL",
      "HUMAN_REQUIRED",
      "BLOCKED",
      "COMPLETED",
      "CANCELLED",
    ] as const) {
      expect(
        reduceTaskCommand({ ...input({ ...state, state: inactive }, command), authority: granted }),
      ).toMatchObject({ kind: "rejected", code: "ILLEGAL_TASK_TRANSITION" });
    }
  });

  it.each(["COMPLETED", "CANCELLED"] as const)(
    "rejects new mutations on terminal %s tasks",
    (state) => {
      const task = aggregate({ state, effects: [effect("merge", "PREPARED")] });
      const command: TaskCommand = {
        kind: "observe_effect",
        task_id: task.id,
        expected_task_revision: task.revision,
        expected_state_fingerprint: fingerprint,
        effect_id: "merge",
        observed_state: "IN_DOUBT",
        observation_digest: kernelDigest("timeout"),
      };
      expect(reduceTaskCommand(input(task, command))).toMatchObject({
        kind: "rejected",
        code: "ILLEGAL_TASK_TRANSITION",
      });
    },
  );

  it.each(["APPLIED", "NOT_APPLIED"] as const)(
    "resumes after observing an uncertain effect as %s",
    (observed_state) => {
      for (const more of [false, true]) {
        const task = aggregate({
          state: "EFFECT_IN_DOUBT",
          effects: [effect("merge", "IN_DOUBT"), ...(more ? [effect("other", "IN_DOUBT")] : [])],
        });
        const command: TaskCommand = {
          kind: "observe_effect",
          task_id: task.id,
          expected_task_revision: task.revision,
          expected_state_fingerprint: fingerprint,
          effect_id: "merge",
          observed_state,
          observation_digest: kernelDigest("observed"),
        };
        const result = reduceTaskCommand(input(task, command));
        expect(result).toMatchObject({
          kind: "accepted",
          aggregate: { state: more ? "EFFECT_IN_DOUBT" : "ACTIVE" },
        });
        if (result.kind === "accepted" && !more) {
          expect(
            reduceTaskCommand(
              input(result.aggregate, transitionCommand(result.aggregate, "claim"), "next"),
            ),
          ).toMatchObject({ kind: "accepted" });
        }
      }
    },
  );

  it.each(["reconcile_effect", "supersede_effect"] as const)(
    "keeps Task recovery consistent after %s",
    (kind) => {
      for (const more of [false, true]) {
        const task = aggregate({
          state: "EFFECT_IN_DOUBT",
          effects: [
            effect("merge", "IN_DOUBT"),
            effect("replacement", "PREPARED"),
            ...(more ? [effect("other", "IN_DOUBT")] : []),
          ],
        });
        const envelope = {
          task_id: task.id,
          expected_task_revision: task.revision,
          expected_state_fingerprint: fingerprint,
          effect_id: "merge",
        };
        const command: TaskCommand =
          kind === "reconcile_effect"
            ? {
                ...envelope,
                kind,
                resolution: "APPLIED",
                provider_receipt_digest: kernelDigest("receipt"),
              }
            : { ...envelope, kind, replacement_effect_id: "replacement" };
        expect(reduceTaskCommand(input(task, command))).toMatchObject({
          kind: "accepted",
          aggregate: { state: more ? "EFFECT_IN_DOUBT" : "ACTIVE" },
        });
      }
    },
  );

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
