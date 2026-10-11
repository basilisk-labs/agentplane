import { describe, expect, it } from "vitest";
import {
  aggregate,
  authority,
  manifest,
  runtime,
  validation,
  resultDigest,
} from "./kernel.test-fixtures.js";
import { kernelDigest } from "./digest.js";
import {
  authenticatedScopeReplanHistory,
  reconcileReplannedWorkItems,
} from "./replan-work-items.js";
import type { CanonicalAuthorityRecord, PlanRecord, TaskCommand } from "./model.js";

function fixture() {
  const completed = {
    ...runtime("COMPLETED"),
    result_digest: resultDigest,
    output_manifests: [manifest()],
    validation: validation(resultDigest),
  };
  const consumer = {
    ...runtime("BLOCKED"),
    definition: {
      ...completed.definition,
      id: "consumer",
      depends_on: ["kernel"],
      required_inputs: ["kernel-source"],
      expected_outputs: ["consumer-output"],
    },
  };
  const state = aggregate({
    work_items: { kernel: completed, consumer },
    current_plan: {
      ...aggregate().current_plan!,
      state: "REJECTED",
      work_items: [completed.definition, consumer.definition],
    },
  });
  const prep = {
    ...consumer.definition,
    id: "prep",
    depends_on: ["kernel"],
    expected_outputs: ["prep-output"],
  };
  const proposed: PlanRecord = {
    ...state.current_plan!,
    revision: 2,
    state: "PROPOSED",
    work_items: [
      completed.definition,
      prep,
      { ...consumer.definition, depends_on: ["kernel", "prep"] },
    ],
  };
  return {
    state,
    proposed: {
      ...proposed,
      digest: kernelDigest({ revision: proposed.revision, work_items: proposed.work_items }),
    },
    completed,
  };
}

describe("scope replan runtime preservation", () => {
  it("preserves accepted producer evidence and initializes only new or changed unfinished work", () => {
    const { state, proposed, completed } = fixture();
    const next = reconcileReplannedWorkItems(state, proposed);
    expect(next.issues).toEqual([]);
    expect(next.workItems.kernel).toBe(completed);
    expect(next.workItems.consumer).toMatchObject({
      state: "PLANNED",
      attempt: 1,
      result_digest: null,
    });
    expect(next.workItems.prep).toMatchObject({ state: "PLANNED", attempt: 0 });
    expect(state.work_items.consumer!.state).toBe("BLOCKED");
  });
  it.each(["change", "remove"])("rejects %s of completed work", (action) => {
    const { state, proposed } = fixture();
    const work_items =
      action === "remove"
        ? proposed.work_items.slice(1)
        : proposed.work_items.map((item) =>
            item.id === "kernel" ? { ...item, optional: true } : item,
          );
    expect(reconcileReplannedWorkItems(state, { ...proposed, work_items }).issues).not.toEqual([]);
  });
  it("rejects a new active execution or mismatched runtime definition", () => {
    const { state, proposed } = fixture();
    expect(
      reconcileReplannedWorkItems(
        {
          ...state,
          work_items: {
            ...state.work_items,
            consumer: { ...state.work_items.consumer!, state: "EXECUTING" },
          },
        },
        proposed,
      ).issues,
    ).not.toEqual([]);
    expect(
      reconcileReplannedWorkItems(
        {
          ...state,
          work_items: {
            ...state.work_items,
            kernel: {
              ...state.work_items.kernel!,
              definition: { ...state.work_items.kernel!.definition, optional: true },
            },
          },
        },
        proposed,
      ).issues,
    ).not.toEqual([]);
  });
});

function proposalHistory(kind: "operator" | "semantic") {
  const { state, proposed } = fixture();
  const source = { ...state.current_plan!, state: "REJECTED" as const };
  source.digest = kernelDigest({ revision: source.revision, work_items: source.work_items });
  const request = {
    task_id: state.id,
    record_digest: kernelDigest("record"),
    task_revision: 3,
    plan_revision: source.revision,
    plan_digest: source.digest,
    work_item_id: "consumer",
    attempt: 1,
    claim_id: "claim",
    contract_digest: kernelDigest("contract"),
    work_order_id: kernelDigest("order"),
    result_authentication: "native_stop_receipt" as const,
    result_digest: kernelDigest("stop"),
    stop_receipt_digest: kernelDigest("stop-receipt"),
    parent_authority_digest: authority.digest,
    repository_fingerprint: authority.repository_fingerprint,
    intake_before_digest: kernelDigest("before"),
    intake_after_digest: kernelDigest("after"),
    scope_roots: ["fixture.ts"],
    repository_effects: [],
  };
  const grant: CanonicalAuthorityRecord = {
    authority,
    approval_mode: "manual_operator",
    observation: {
      kind: "prospective_scope_request",
      scope_request: request,
      evidence_digest: kernelDigest("approval"),
      previous_fingerprint: authority.repository_fingerprint,
      changed_paths: [],
      request_digest: kernelDigest(request),
    },
  };
  const grantCommand: TaskCommand = {
    kind: "approve_scope_request",
    task_id: state.id,
    expected_task_revision: 3,
    expected_state_fingerprint: authority.repository_fingerprint,
    record: grant,
  };
  const plan = { ...proposed, approval_actor_id: null, approval_evidence_digest: null };
  const command: TaskCommand = {
    kind: "propose_plan",
    task_id: state.id,
    expected_task_revision: 4,
    expected_state_fingerprint: authority.repository_fingerprint,
    plan,
  };
  const id = kind === "operator" ? `plan:${plan.digest}` : `result:${kernelDigest("semantic")}`;
  const receipt = (mutation_id: string, value: TaskCommand, before_revision: number) => ({
    mutation_id,
    command_digest: kernelDigest(value),
    before_revision,
    after_revision: before_revision + 1,
    aggregate_digest: kernelDigest("aggregate"),
    event_digests: [],
    effect_ids: [],
  });
  const grantId = `scope-request:${kernelDigest(request)}`;
  return {
    id,
    command,
    state: {
      ...state,
      plan_history: [source],
      current_plan: {
        ...plan,
        state: "APPROVED" as const,
        approval_actor_id: "USER",
        approval_evidence_digest: kernelDigest("approved"),
      },
      authority_lineage: [grant],
      mutation_receipts: {
        [grantId]: receipt(grantId, grantCommand, 3),
        [id]: receipt(id, command, 4),
      },
    },
  };
}

describe("authenticated proposal provenance", () => {
  it.each(["operator", "semantic"] as const)("retains exact %s command authentication", (kind) => {
    const f = proposalHistory(kind);
    expect(authenticatedScopeReplanHistory(f.state, true)?.proposals).toEqual([
      { mutation_id: f.id, command: f.command },
    ]);
  });
  it.each(["missing", "wrong-id", "forged", "duplicate", "stale", "foreign-task"])(
    "rejects %s operator proposal evidence",
    (variant) => {
      const f = proposalHistory("operator");
      const receipt = f.state.mutation_receipts[f.id]!;
      if (variant === "missing") delete f.state.mutation_receipts[f.id];
      if (variant === "wrong-id") receipt.mutation_id = `plan:${kernelDigest("foreign-plan")}`;
      if (variant === "forged") receipt.command_digest = kernelDigest("forged");
      if (variant === "duplicate") f.state.mutation_receipts.alias = { ...receipt };
      if (variant === "stale") {
        receipt.before_revision = 2;
        receipt.after_revision = 3;
      }
      if (variant === "foreign-task")
        receipt.command_digest = kernelDigest({ ...f.command, task_id: "foreign" });
      expect(authenticatedScopeReplanHistory(f.state, true)).toBeNull();
    },
  );
});
