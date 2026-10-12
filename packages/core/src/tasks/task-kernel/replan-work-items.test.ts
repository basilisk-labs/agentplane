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
import { authorityDigest } from "./authority-lineage.js";
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
    "valid",
    "missing",
    "tampered",
    "ambiguous",
    "unapproved",
    "wrong-task",
    "wrong-attempt",
    "unrelated-concurrent",
  ])("retains a formerly approved rejected replacement: %s", (kind) => {
    const { state, command, proposalId } = historyFixture("operator");
    const source = state.plan_history[0]!;
    const request = state.authority_lineage[0]!.observation!.scope_request!;
    source.work_items.find((item) => item.id === "consumer")!.contract_digest =
      kernelDigest("source contract");
    if (kind === "unrelated-concurrent") {
      const producer = source.work_items.find((item) => item.id === "kernel")!;
      producer.contract_digest = kernelDigest("producer contract");
      producer.execution_requirements = {
        ...producer.execution_requirements,
        resources: ["other-work"],
      };
      command.plan.digest = kernelDigest({
        revision: command.plan.revision,
        work_items: command.plan.work_items,
      });
      const old = state.mutation_receipts[proposalId]!;
      delete state.mutation_receipts[proposalId];
      state.mutation_receipts[String(`plan:${command.plan.digest}`)] = {
        ...old,
        mutation_id: `plan:${command.plan.digest}`,
        command_digest: kernelDigest(command),
      };
    }
    source.digest = kernelDigest({ revision: source.revision, work_items: source.work_items });
    request.plan_digest = source.digest;
    request.contract_digest = kernelDigest("source contract");
    const grantId = `scope-request:${kernelDigest(request)}`;
    const grantCommand: TaskCommand = {
      kind: "approve_scope_request",
      task_id: state.id,
      expected_task_revision: 7,
      expected_state_fingerprint: authority.repository_fingerprint,
      record: state.authority_lineage[0]!,
    };
    state.mutation_receipts = {
      ...state.mutation_receipts,
      [grantId]: {
        ...state.mutation_receipts[Object.keys(state.mutation_receipts)[0]!]!,
        mutation_id: grantId,
        command_digest: kernelDigest(grantCommand),
      },
    };
    delete state.mutation_receipts[Object.keys(state.mutation_receipts)[0]!];
    const approved = {
      ...command.plan,
      state: "REJECTED" as const,
      approval_actor_id: "USER",
      approval_evidence_digest: kernelDigest("actual approval"),
    };
    const root = {
      ...authority,
      task_id: state.id,
      plan_digest: approved.digest,
      plan_revision: approved.revision,
      provenance: {
        kind: "USER" as const,
        actor_id: "USER",
        evidence_digest: approved.approval_evidence_digest,
        parent_authority_digest: null,
      },
    };
    root.digest = authorityDigest(root);
    const approval: TaskCommand = {
      kind: "approve_plan",
      task_id: state.id,
      expected_task_revision: 9,
      expected_state_fingerprint: root.repository_fingerprint,
      plan_revision: approved.revision,
      plan_digest: approved.digest,
      approval_evidence_digest: approved.approval_evidence_digest,
      authority_mode: "manual_operator",
    };
    const receipt = {
      mutation_id: "approval",
      command_digest: kernelDigest(approval),
      before_revision: 9,
      after_revision: 10,
      aggregate_digest: kernelDigest("approved"),
      event_digests: [],
      effect_ids: [],
    };
    const revision = approved.revision + 1;
    const next = {
      ...approved,
      revision,
      state: "APPROVED" as const,
      digest: kernelDigest({ revision, work_items: approved.work_items }),
    };
    const nextCommand: TaskCommand = {
      kind: "propose_plan",
      task_id: state.id,
      expected_task_revision: 10,
      expected_state_fingerprint: root.repository_fingerprint,
      plan: { ...next, state: "PROPOSED", approval_actor_id: null, approval_evidence_digest: null },
    };
    const nextRoot = { ...root, plan_digest: next.digest, plan_revision: next.revision };
    nextRoot.digest = authorityDigest(nextRoot);
    const finalApproval = {
      ...approval,
      expected_task_revision: 11,
      plan_revision: revision,
      plan_digest: next.digest,
    };
    const record = {
      ...state,
      plan_history: [source, approved],
      current_plan: next,
      work_items: {
        ...state.work_items,
        consumer: {
          ...state.work_items.consumer!,
          state: "EXECUTING" as const,
          attempt: request.attempt + 1,
          definition: next.work_items.find((item) => item.id === "consumer")!,
        },
      },
      authority_lineage: [
        ...state.authority_lineage,
        { authority: root, observation: null, approval_mode: "manual_operator" as const },
        { authority: nextRoot, observation: null, approval_mode: "manual_operator" as const },
      ],
      mutation_receipts: {
        ...state.mutation_receipts,
        approval: receipt,
        [`plan:${next.digest}`]: {
          ...receipt,
          mutation_id: `plan:${next.digest}`,
          before_revision: 10,
          after_revision: 11,
          command_digest: kernelDigest(nextCommand),
        },
        final: {
          ...receipt,
          mutation_id: "final",
          before_revision: 11,
          after_revision: 12,
          command_digest: kernelDigest(finalApproval),
        },
      },
    };
    if (kind === "unrelated-concurrent") {
      const unrelatedRequest = {
        ...request,
        work_item_id: "kernel",
        task_revision: 10,
        plan_revision: approved.revision,
        plan_digest: approved.digest,
        contract_digest: kernelDigest("producer contract"),
      };
      const unrelated = {
        ...record.authority_lineage[0]!,
        authority: root,
        observation: {
          ...record.authority_lineage[0]!.observation!,
          scope_request: unrelatedRequest,
        },
      };
      const unrelatedCommand: TaskCommand = {
        ...grantCommand,
        expected_task_revision: 10,
        record: unrelated,
      };
      const id = `scope-request:${kernelDigest(unrelatedRequest)}`;
      record.authority_lineage.push(unrelated);
      Object.assign(record.mutation_receipts, {
        [id]: {
          ...receipt,
          mutation_id: id,
          before_revision: 10,
          after_revision: 11,
          command_digest: kernelDigest(unrelatedCommand),
        },
      });
      nextCommand.expected_task_revision = 11;
      record.mutation_receipts[String(`plan:${next.digest}`)] = {
        ...receipt,
        mutation_id: `plan:${next.digest}`,
        before_revision: 11,
        after_revision: 12,
        command_digest: kernelDigest(nextCommand),
      };
      finalApproval.expected_task_revision = 12;
      record.mutation_receipts.final = {
        ...receipt,
        mutation_id: "final",
        before_revision: 12,
        after_revision: 13,
        command_digest: kernelDigest(finalApproval),
      };
      Object.assign(record.work_items, {
        kernel: {
          ...state.work_items.kernel!,
          state: "EXECUTING" as const,
          attempt: request.attempt + 1,
        },
      });
      expect(authenticatedScopeReplanHistory(record, true)).toBeNull();
    }
    if (kind === "missing") delete (record.mutation_receipts as Record<string, unknown>).approval;
    if (kind === "tampered")
      receipt.command_digest = kernelDigest({ ...approval, plan_digest: source.digest });
    if (kind === "ambiguous")
      Object.assign(record.mutation_receipts, {
        duplicate: { ...receipt, mutation_id: "duplicate" },
      });
    if (kind === "unapproved") approved.approval_evidence_digest = null as never;
    if (kind === "wrong-task") request.task_id = "other-task";
    if (kind === "wrong-attempt") record.work_items.consumer.attempt++;
    expect(authenticatedScopeReplanHistory(record, true, "consumer") !== null).toBe(
      kind === "valid" || kind === "unrelated-concurrent",
    );
    expect(authenticatedScopeReplanHistory(record, true, "missing")).toBeNull();
  });

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
