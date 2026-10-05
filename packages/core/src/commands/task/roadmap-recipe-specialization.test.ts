import { buildAgentSemanticPayloadSchema } from "../../runner/agent-semantic-result.js";
import { describe, expect, it } from "vitest";
import {
  kernelPlanInputSchema,
  resolveKernelPlanInput,
  type KernelWorkContract,
} from "../../tasks/kernel-plan-refinement.js";
import { kernelDigest, reduceTaskCommand } from "../../tasks/task-kernel/kernel.js";
import {
  planScopeExpansionApprovalDigest,
  authorityDigest,
  continuationAdmissionIssues,
} from "../../tasks/task-kernel/authority-lineage.js";
import {
  aggregate,
  amendmentCommand,
  authority,
  fingerprint,
  input,
  plan,
  runtime,
  manifest,
  validation,
} from "../../tasks/task-kernel/kernel.test-fixtures.js";
import type { KernelPlanProposal } from "../../tasks/kernel-semantic.js";
import type { PlanRecord } from "../../tasks/task-kernel/model.js";

const contract: KernelWorkContract = {
  objective: "Implement safely",
  acceptance_criteria: ["Behavior is correct"],
  verification_commands: ["bun test"],
  role: "EXECUTOR",
};
const definition = { ...plan.work_items[0]!, contract_digest: kernelDigest(contract) };
const current: PlanRecord = {
  ...plan,
  work_items: [definition],
  digest: kernelDigest({ revision: 1, work_items: [definition] }),
};
const contracts = { [String(kernelDigest(contract))]: contract };
const workItem = { ...definition, contract_digest: undefined, contract };
const item = kernelPlanInputSchema.parse({
  work_items: [
    Object.fromEntries(Object.entries(workItem).filter(([key]) => key !== "contract_digest")),
  ],
}) as KernelPlanProposal;
const repair = {
  ...item.work_items[0]!,
  id: "bounded-test-budget",
  depends_on: [definition.id],
  required_inputs: ["kernel-source"],
  expected_outputs: ["budget-evidence"],
  contract: { ...contract, objective: "Repair bounded test budget" },
};
const refinement = (operations: unknown[]) => ({
  schema_version: 1,
  kind: "plan_refinement",
  task_id: "task-1",
  base_plan_digest: current.digest,
  operations,
});
const resolve = (value: unknown) =>
  resolveKernelPlanInput({ task_id: "task-1", value, current, contracts });
function definitions(proposal: KernelPlanProposal) {
  return proposal.work_items.map(({ contract, ...definition }) => ({
    ...definition,
    contract_digest: kernelDigest(contract),
  }));
}
function recovery(completed = true) {
  const state = aggregate({
    current_plan: current,
    final_validation: { ...validation(kernelDigest("final-check")), status: "FAILED" },
    work_items: {
      kernel: {
        ...runtime(completed ? "COMPLETED" : "READY"),
        definition,
        attempt: completed ? 1 : 0,
        claim_id: null,
        ...(completed
          ? {
              result_digest: kernelDigest("completed-result"),
              output_manifests: [manifest()],
              validation: validation(kernelDigest("completed-result")),
            }
          : {}),
      },
    },
  });
  const proposal = resolve(refinement([{ kind: "add", work_item: repair }]));
  const command = {
    ...amendmentCommand(state, definitions(proposal)),
    work_contracts: {
      ...contracts,
      ...Object.fromEntries(
        proposal.work_items.map(({ contract }) => [kernelDigest(contract), contract]),
      ),
    },
  };
  const actor = {
    id: "USER",
    kind: "USER" as const,
    transport: "manual" as const,
    capabilities: [],
  };
  const approval = planScopeExpansionApprovalDigest({
    task_id: state.id,
    current_plan_digest: current.digest,
    amended_plan_digest: command.amended_plan.digest,
    actor_id: actor.id,
  });
  const invocation = {
    ...input(state, { ...command, authority_delta_digest: approval }),
    actor,
    authority: { ...authority, plan_digest: current.digest },
  };
  return { state, proposal, command, invocation };
}

describe("common Kernel Plan specialization", () => {
  it("negotiates bounded refinement only through the existing canonical planning payload", () => {
    const payload = {
      work_order_id: "issued",
      status: "completed",
      summary: "Refine bounded work",
      findings: [],
      uncertainty: [],
      canonical_plan: refinement([{ kind: "add", work_item: repair }]),
    };
    expect(
      buildAgentSemanticPayloadSchema({ role: "PLANNER", phase: "planning" }).safeParse(payload)
        .success,
    ).toBe(true);
    expect(
      buildAgentSemanticPayloadSchema({ role: "EXECUTOR", phase: "implementation" }).safeParse(
        payload,
      ).success,
    ).toBe(false);
    expect(
      buildAgentSemanticPayloadSchema({ role: "PLANNER", phase: "planning" }).safeParse({
        ...payload,
        canonical_plan: { ...payload.canonical_plan, approved_by: "USER" },
      }).success,
    ).toBe(false);
  });
  it("expands a pinned add without mutating its source and accepts a full proposal", () => {
    const original = JSON.stringify(current);
    const proposal = resolve(refinement([{ kind: "add", work_item: repair }]));
    expect(proposal.work_items.map((item) => item.id)).toEqual(["kernel", "bounded-test-budget"]);
    expect(resolve(proposal)).toEqual(proposal);
    expect(JSON.stringify(current)).toBe(original);
  });
  it.each([
    { ...refinement([{ kind: "add", work_item: repair }]), task_id: "another-task" },
    {
      ...refinement([{ kind: "add", work_item: repair }]),
      base_plan_digest: kernelDigest("stale"),
    },
    refinement([
      { kind: "add", work_item: repair },
      { kind: "remove", work_item_id: repair.id },
    ]),
    refinement([{ kind: "add", work_item: item.work_items[0] }]),
    refinement([{ kind: "remove", work_item_id: "missing" }]),
    refinement([{ kind: "replace", work_item: repair }]),
  ])("rejects cross-task, stale, duplicate, or invalid operations atomically", (value) => {
    expect(() => resolve(value)).toThrow();
    expect(current.work_items).toEqual([definition]);
  });
  it("supports remove plus replacement while conserving required outputs, criteria and checks", () => {
    const replacement = {
      ...repair,
      depends_on: [],
      required_inputs: [],
      expected_outputs: definition.expected_outputs,
    };
    expect(
      resolve(
        refinement([
          { kind: "remove", work_item_id: definition.id },
          { kind: "add", work_item: replacement },
        ]),
      ).work_items,
    ).toEqual([replacement]);
    for (const changed of [
      { ...replacement, expected_outputs: ["other"] },
      { ...replacement, contract: { ...contract, acceptance_criteria: ["weaker"] } },
      { ...replacement, contract: { ...contract, verification_commands: [] } },
      { ...replacement, optional: true },
    ])
      expect(() =>
        resolve(
          refinement([
            { kind: "remove", work_item_id: definition.id },
            { kind: "add", work_item: changed },
          ]),
        ),
      ).toThrow(/mandatory_/u);
  });
  it("validates the resulting full graph including input-only cycles and malformed checks", () => {
    expect(() =>
      resolve(
        refinement([
          {
            kind: "replace",
            work_item: { ...item.work_items[0], required_inputs: ["budget-evidence"] },
          },
          { kind: "add", work_item: repair },
        ]),
      ),
    ).toThrow(/cycle/u);
    expect(() =>
      resolve(
        refinement([
          { kind: "replace", work_item: { ...item.work_items[0], depends_on: ["missing"] } },
        ]),
      ),
    ).toThrow();
    expect(() =>
      resolve(
        refinement([
          {
            kind: "replace",
            work_item: {
              ...item.work_items[0],
              contract: { ...contract, verification_commands: [""] },
            },
          },
        ]),
      ),
    ).toThrow();
  });
  it("adds bounded recovery to ACTIVE after completed work, preserving exact completed evidence and approval history", () => {
    const { state, invocation } = recovery();
    const result = reduceTaskCommand(invocation);
    expect(result.kind).toBe("accepted");
    if (result.kind !== "accepted") return;
    expect(result.aggregate.work_items.kernel).toEqual(state.work_items.kernel);
    expect(result.aggregate.work_items[repair.id]).toMatchObject({
      state: "READY",
      attempt: 0,
      result_digest: null,
    });
    expect(result.aggregate.plan_history).toEqual([{ ...current, state: "SUPERSEDED" }]);
    expect(result.aggregate.current_plan?.approval_evidence_digest).toBe(
      invocation.command.authority_delta_digest,
    );
    expect(result.aggregate.final_validation).toBeNull();
    expect(result.aggregate.state).toBe("ACTIVE");
  });
  it("requires exact USER approval and digest-bound contracts, without widening capability authority", () => {
    const { invocation } = recovery();
    for (const changed of [
      { ...invocation, actor: { ...invocation.actor, kind: "AGENT" as const } },
      { ...invocation, command: { ...invocation.command, authority_delta_digest: null } },
      { ...invocation, command: { ...invocation.command, work_contracts: {} } },
      {
        ...invocation,
        command: { ...invocation.command, authority_delta_digest: kernelDigest("another-plan") },
      },
      { ...invocation, authority: { ...invocation.authority!, capabilities: [] } },
    ])
      expect(reduceTaskCommand(changed).kind).toBe("rejected");
  });
  it("rejects completed contract replacement or removal even with exact USER approval", () => {
    const { state, invocation } = recovery();
    const changed = {
      ...definition,
      contract_digest: kernelDigest({ ...contract, objective: "different" }),
    };
    for (const defs of [[changed], [{ ...definition, id: "replacement" }]]) {
      const command = {
        ...amendmentCommand(state, defs),
        work_contracts: {
          ...contracts,
          [String(changed.contract_digest)]: { ...contract, objective: "different" },
        },
      };
      command.authority_delta_digest = planScopeExpansionApprovalDigest({
        task_id: state.id,
        current_plan_digest: current.digest,
        amended_plan_digest: command.amended_plan.digest,
        actor_id: "USER",
      });
      expect(reduceTaskCommand({ ...invocation, command })).toMatchObject({
        kind: "rejected",
        code: "ILLEGAL_WORK_ITEM_TRANSITION",
      });
    }
  });
  it("applies replace and remove atomically through Kernel while retaining mandatory work", () => {
    const { state, invocation } = recovery(false);
    for (const replacement of [
      {
        ...item.work_items[0]!,
        contract: { ...contract, objective: "Clarified bounded objective" },
      },
      { ...item.work_items[0]!, id: "replacement" },
    ]) {
      const operations =
        replacement.id === definition.id
          ? [{ kind: "replace", work_item: replacement }]
          : [
              { kind: "remove", work_item_id: definition.id },
              { kind: "add", work_item: replacement },
            ];
      const proposal = resolve(refinement(operations));
      const command = {
        ...amendmentCommand(state, definitions(proposal)),
        work_contracts: {
          ...contracts,
          [String(kernelDigest(replacement.contract))]: replacement.contract,
        },
      };
      command.authority_delta_digest = planScopeExpansionApprovalDigest({
        task_id: state.id,
        current_plan_digest: current.digest,
        amended_plan_digest: command.amended_plan.digest,
        actor_id: "USER",
      });
      const result = reduceTaskCommand({ ...invocation, command });
      expect(result.kind).toBe("accepted");
      if (result.kind !== "accepted") continue;
      expect(Object.keys(result.aggregate.work_items)).toEqual([replacement.id]);
      expect(result.aggregate.work_items[replacement.id]?.state).toBe("READY");
      expect(result.aggregate.plan_history[0]?.work_items).toEqual(current.work_items);
    }
  });
  it("rejects mandatory loss even when a full proposal bypasses the operation expander", () => {
    const { state, invocation } = recovery(false);
    const weakened = {
      ...item.work_items[0]!,
      contract: { ...contract, verification_commands: [] },
    };
    const command = {
      ...amendmentCommand(state, definitions({ work_items: [weakened] })),
      work_contracts: {
        ...contracts,
        [String(kernelDigest(weakened.contract))]: weakened.contract,
      },
    };
    command.authority_delta_digest = planScopeExpansionApprovalDigest({
      task_id: state.id,
      current_plan_digest: current.digest,
      amended_plan_digest: command.amended_plan.digest,
      actor_id: "USER",
    });
    expect(reduceTaskCommand({ ...invocation, command })).toMatchObject({
      kind: "rejected",
      facts: ["mandatory_check_removed:bun test"],
    });
  });
  it("allows native continuation to bind exactly the approved new Plan", () => {
    const { invocation } = recovery();
    const result = reduceTaskCommand(invocation);
    if (result.kind !== "accepted") throw new Error("amendment rejected");
    const parent = invocation.authority!;
    const amended = result.aggregate.current_plan!;
    // Continuation still validates the complete authority record; a changed capability is not allowed.
    const contents = {
      ...parent,
      plan_digest: amended.digest,
      plan_revision: amended.revision,
      provenance: {
        ...parent.provenance,
        kind: "SYSTEM" as const,
        actor_id: "native",
        parent_authority_digest: parent.digest,
      },
    };
    const record = {
      authority: { ...contents, digest: authorityDigest(contents) },
      approval_mode: null,
      observation: {
        kind: "plan_amendment" as const,
        evidence_digest: kernelDigest("native observation"),
        previous_fingerprint: fingerprint,
        changed_paths: [],
        added_scope_roots: [],
      },
    };
    expect(
      continuationAdmissionIssues(
        {
          ...invocation,
          aggregate: { ...result.aggregate, authority_lineage: [{ authority: parent }] },
          actor: {
            id: "native",
            kind: "SYSTEM",
            transport: "managed",
            capabilities: ["authority.observe"],
          },
        },
        record,
      ),
    ).toEqual([]);
  });
});
