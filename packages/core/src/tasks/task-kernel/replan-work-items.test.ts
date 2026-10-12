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
import type { ProspectiveScopeRequest } from "./prospective-scope.js";

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

describe("scope replan proposal provenance", () => {
  function historyFixture(transport: "operator" | "result") {
    const { state, proposed } = fixture();
    const proposal = { ...proposed, approval_actor_id: null, approval_evidence_digest: null };
    const source = {
      ...state.current_plan!,
      digest: kernelDigest({ revision: 1, work_items: state.current_plan!.work_items }),
    };
    const request: ProspectiveScopeRequest = {
      task_id: state.id,
      record_digest: kernelDigest("record"),
      task_revision: 7,
      plan_revision: source.revision,
      plan_digest: source.digest,
      work_item_id: "consumer",
      attempt: 1,
      claim_id: "claim-1",
      contract_digest: kernelDigest("contract"),
      work_order_id: kernelDigest("order"),
      result_authentication: "native_stop_receipt",
      result_digest: resultDigest,
      stop_receipt_digest: kernelDigest("stop"),
      parent_authority_digest: authority.digest,
      repository_fingerprint: authority.repository_fingerprint,
      intake_before_digest: kernelDigest("before"),
      intake_after_digest: kernelDigest("after"),
      scope_roots: ["fixture.test.ts"],
      repository_effects: ["tests"],
    };
    const grant: CanonicalAuthorityRecord = {
      authority,
      observation: {
        kind: "prospective_scope_request",
        evidence_digest: kernelDigest("grant"),
        previous_fingerprint: authority.repository_fingerprint,
        changed_paths: [],
        scope_request: request,
      },
    };
    const grantCommand: TaskCommand = {
      kind: "approve_scope_request",
      task_id: state.id,
      expected_task_revision: 7,
      expected_state_fingerprint: authority.repository_fingerprint,
      record: grant,
    };
    const command: Extract<TaskCommand, { kind: "propose_plan" }> = {
      kind: "propose_plan",
      task_id: state.id,
      expected_task_revision: 8,
      expected_state_fingerprint: authority.repository_fingerprint,
      plan: proposal,
    };
    const grantId = `scope-request:${kernelDigest(request)}`;
    const proposalId =
      transport === "operator"
        ? `plan:${proposed.digest}`
        : `result:${kernelDigest("planner-order")}`;
    const receipt = (mutation_id: string, command: TaskCommand, before_revision: number) => ({
      mutation_id,
      command_digest: kernelDigest(command),
      before_revision,
      after_revision: before_revision + 1,
      aggregate_digest: kernelDigest("aggregate"),
      event_digests: [],
      effect_ids: [],
    });
    return {
      command,
      proposalId,
      state: {
        ...state,
        plan_history: [source],
        current_plan: { ...proposal, state: "REJECTED" as const },
        authority_lineage: [grant],
        mutation_receipts: {
          [grantId]: receipt(grantId, grantCommand, 7),
          [proposalId]: receipt(proposalId, command, 8),
        },
      },
    };
  }

  it.each(["operator", "result"] as const)(
    "authenticates the exact %s proposal command and preserves completed work",
    (transport) => {
      const { state, command, proposalId } = historyFixture(transport);
      const before = structuredClone(state);
      expect(authenticatedScopeReplanHistory(state)?.proposals).toEqual([
        { mutation_id: proposalId, command },
      ]);
      expect(state).toEqual(before);
      expect(reconcileReplannedWorkItems(state, command.plan).workItems.kernel).toBe(
        state.work_items.kernel,
      );
    },
  );

  it.each([
    "missing",
    "wrong-id",
    "tampered-command",
    "stale-revision",
    "after-revision",
    "wrong-fingerprint",
    "ambiguous",
    "source-digest",
  ])("rejects %s operator provenance", (change) => {
    const { state, proposalId, command } = historyFixture("operator");
    const receipt = state.mutation_receipts[proposalId]!;
    if (change === "missing") delete state.mutation_receipts[proposalId];
    if (change === "wrong-id") receipt.mutation_id = `plan:${kernelDigest("another-plan")}`;
    if (change === "tampered-command")
      receipt.command_digest = kernelDigest({ ...command, task_id: "other-task" });
    if (change === "stale-revision") receipt.before_revision = 6;
    if (change === "after-revision") receipt.after_revision = 10;
    if (change === "wrong-fingerprint")
      receipt.command_digest = kernelDigest({
        ...command,
        expected_state_fingerprint: kernelDigest("another-repository"),
      });
    if (change === "ambiguous") {
      const id = `result:${kernelDigest("second-order")}`;
      state.mutation_receipts[id] = { ...receipt, mutation_id: id };
    }
    if (change === "source-digest") state.plan_history[0]!.digest = kernelDigest("changed-source");
    expect(authenticatedScopeReplanHistory(state)).toBeNull();
  });
});
