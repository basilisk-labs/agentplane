import { describe, expect, it } from "vitest";

import { authorityDigest } from "./authority-lineage.js";
import { kernelDigest, reduceTaskCommand } from "./kernel.js";
import type { ExecutionAuthority, KernelInput, TaskCommand } from "./model.js";
import { prospectiveScopeApprovalEvidence, type ProspectiveScopeRequest } from "./prospective-scope.js";
import { aggregate, authority, fingerprint, input, manifest, plan, resultDigest, runtime, transitionCommand, validation } from "./kernel.test-fixtures.js";

function rejection(state: ReturnType<typeof aggregate>, withEvidence: boolean): TaskCommand {
  return {
    kind: "reject_plan",
    task_id: state.id,
    expected_task_revision: state.revision,
    expected_state_fingerprint: fingerprint,
    plan_revision: plan.revision,
    plan_digest: plan.digest,
    ...(withEvidence ? { rejection_evidence_digest: kernelDigest("explicit-user-rejection") } : {}),
  };
}

function planningAuthority(parent: ExecutionAuthority = authority) {
  const { digest: _fixtureDigest, ...authorityContents } = parent;
  const contents = {
    ...authorityContents,
    scope_roots: [],
    repository_effects: [],
    external_effects: [],
    capabilities: [],
    resources: [],
    provenance: {
      kind: "SYSTEM" as const,
      actor_id: "agentplane:kernel-controller",
      evidence_digest: kernelDigest({ kind: "native_planning", task_id: authority.task_id }),
      parent_authority_digest: null,
    },
  };
  return { ...contents, digest: authorityDigest(contents) };
}

function proposalInput(state: ReturnType<typeof aggregate>, authority = planningAuthority()): KernelInput {
  const revision = state.current_plan!.revision + 1;
  const work_items = state.current_plan!.work_items;
  const proposed = {
    revision, work_items, digest: kernelDigest({ revision, work_items }),
    state: "PROPOSED" as const, approval_actor_id: null, approval_evidence_digest: null,
  };
  return {
    ...input(state, {
      kind: "propose_plan", task_id: state.id, expected_task_revision: state.revision,
      expected_state_fingerprint: fingerprint, plan: proposed,
    }, `result:${kernelDigest(proposed)}`),
    authority,
    actor: { id: "agentplane:kernel-controller", kind: "SYSTEM", transport: "managed", capabilities: [] },
  };
}

function scopeFixture() {
  const blockedDefinition = { ...plan.work_items[0]!, depends_on: ["producer"], required_inputs: ["producer-output"], contract_digest: kernelDigest("blocked-contract") };
  const completed = {
    ...runtime("COMPLETED"),
    definition: { ...plan.work_items[0]!, id: "producer", expected_outputs: ["producer-output"], contract_digest: kernelDigest("producer-contract") },
    result_digest: resultDigest,
    output_manifests: [{ ...manifest(), id: "producer-output", work_item_id: "producer" }],
    validation: validation(resultDigest),
  };
  const work_items = [completed.definition, blockedDefinition];
  const current_plan = { ...plan, work_items, digest: kernelDigest({ revision: plan.revision, work_items }) };
  const parentContents = { ...authority, plan_digest: current_plan.digest };
  const parent = { ...parentContents, digest: authorityDigest(parentContents) };
  const state = aggregate({
    current_plan,
    work_items: {
      producer: completed,
      kernel: { ...runtime("EXECUTING"), definition: blockedDefinition, claim_id: kernelDigest("claim") },
    },
    authority_lineage: [{ authority: parent, approval_mode: "manual_operator", observation: null }],
  });
  const workOrderId = kernelDigest("blocked-order");
  const stopped = reduceTaskCommand({
    ...input(state, {
      ...transitionCommand(state, "block"), claim_id: state.work_items.kernel!.claim_id,
      semantic_result_digest: kernelDigest("stop-result"),
    }, `semantic-stop:${workOrderId}`),
    authority: parent,
  });
  if (stopped.kind !== "accepted") throw new Error("fixture stop rejected");
  const blocked = stopped.aggregate;
  const request: ProspectiveScopeRequest = {
    task_id: blocked.id, record_digest: kernelDigest(blocked), task_revision: blocked.revision,
    plan_revision: current_plan.revision, plan_digest: current_plan.digest, work_item_id: "kernel",
    attempt: blocked.work_items.kernel!.attempt, claim_id: blocked.work_items.kernel!.claim_id!,
    contract_digest: blockedDefinition.contract_digest, work_order_id: workOrderId,
    result_digest: kernelDigest("stop-result"), result_authentication: "native_stop_receipt",
    stop_receipt_digest: kernelDigest(blocked.mutation_receipts[String(`semantic-stop:${workOrderId}`)]),
    parent_authority_digest: parent.digest, repository_fingerprint: fingerprint,
    intake_before_digest: kernelDigest("before"), intake_after_digest: kernelDigest("after"),
    scope_roots: ["fixture.test.ts"], repository_effects: [],
  };
  const child = {
    ...parent, scope_roots: [...parent.scope_roots, ...request.scope_roots].toSorted(),
    provenance: { ...parent.provenance, actor_id: "USER", parent_authority_digest: parent.digest },
  };
  const record = {
    authority: { ...child, digest: authorityDigest(child) },
    approval_mode: "manual_operator" as const,
    observation: {
      kind: "prospective_scope_request" as const, scope_request: request,
      request_digest: kernelDigest(request), evidence_digest: prospectiveScopeApprovalEvidence(request, "USER"),
      previous_fingerprint: fingerprint, changed_paths: [],
    },
  };
  const grantMutationId = `scope-request:${kernelDigest(request)}`;
  const command: Extract<TaskCommand, { kind: "approve_scope_request" }> = {
    kind: "approve_scope_request", task_id: blocked.id, expected_task_revision: blocked.revision,
    expected_state_fingerprint: fingerprint, record,
  };
  const grantInput = {
    ...input(blocked, command, grantMutationId), command,
    authority: null, actor: { id: "USER", kind: "USER" as const, transport: "manual" as const },
  };
  const approved = reduceTaskCommand(grantInput);
  if (approved.kind !== "accepted") throw new Error("fixture scope approval rejected");
  return { blocked, parent, request, grantInput, grantMutationId, granted: approved.aggregate };
}

describe("canonical blocked-plan replanning", () => {
  it("preserves blocked work and authority evidence when explicit rejection enters replanning", () => {
    const blocked = runtime("BLOCKED");
    const { digest: _fixtureDigest, ...authorityContents } = authority;
    const validAuthority = { ...authorityContents, digest: authorityDigest(authorityContents) };
    const lineage = [{ authority: validAuthority }] as const;
    const state = aggregate({
      work_items: { kernel: blocked },
      authority_lineage: lineage,
    });

    const result = reduceTaskCommand({
      ...input(state, rejection(state, true)),
      authority: planningAuthority(),
      actor: {
        id: "USER",
        kind: "USER",
        transport: "manual",
        capabilities: [],
      },
    });

    expect(result.kind).toBe("accepted");
    if (result.kind !== "accepted") return;
    expect(result.aggregate).toMatchObject({
      state: "PLANNING",
      current_plan: { state: "REJECTED", digest: plan.digest },
      work_items: { kernel: blocked },
      authority_lineage: lineage,
    });
    expect(result.events.map((event) => event.kind)).toEqual(["plan_rejected"]);
    expect(state.current_plan?.state).toBe("APPROVED");
    expect(state.work_items.kernel?.state).toBe("BLOCKED");
  });

  it("keeps approved plans fail-closed without blocked work or explicit rejection evidence", () => {
    const ready = aggregate();
    const blocked = aggregate({ work_items: { kernel: runtime("BLOCKED") } });

    expect(reduceTaskCommand(input(ready, rejection(ready, true)))).toMatchObject({
      kind: "rejected",
      code: "ILLEGAL_TASK_TRANSITION",
    });
    expect(reduceTaskCommand(input(blocked, rejection(blocked, false)))).toMatchObject({
      kind: "rejected",
      code: "ILLEGAL_TASK_TRANSITION",
    });
    expect(reduceTaskCommand(input(blocked, rejection(blocked, true)))).toMatchObject({
      kind: "rejected",
      code: "ILLEGAL_TASK_TRANSITION",
    });

    const { digest: _fixtureDigest, ...authorityContents } = authority;
    const validAuthority = { ...authorityContents, digest: authorityDigest(authorityContents) };
    const protectedState = aggregate({
      work_items: { kernel: runtime("BLOCKED") },
      authority_lineage: [{ authority: validAuthority }],
    });
    expect(
      reduceTaskCommand({
        ...input(protectedState, rejection(protectedState, true)),
        actor: {
          id: "agentplane:kernel-controller",
          kind: "SYSTEM",
          transport: "managed",
          capabilities: [],
        },
        authority: planningAuthority(),
      }),
    ).toMatchObject({
      kind: "rejected",
      code: "AUTHORITY_SCOPE_EXCEEDED",
      facts: ["canonical_authority_lineage"],
    });
  });

  it("rejects replacement of retained blocked work without authenticated scope admission", () => {
    const { digest: _fixtureDigest, ...authorityContents } = authority;
    const approvedAuthority = { ...authorityContents, digest: authorityDigest(authorityContents) };
    const state = aggregate({
      state: "PLANNING",
      current_plan: { ...plan, state: "REJECTED" },
      work_items: { kernel: runtime("BLOCKED") },
      authority_lineage: [{ authority: approvedAuthority }],
    });
    const before = structuredClone(state);
    expect(reduceTaskCommand(proposalInput(state))).toMatchObject({
      kind: "rejected",
      code: "ILLEGAL_WORK_ITEM_TRANSITION",
      facts: ["retained_work_requires_bound_replan"],
    });
    expect(state).toEqual(before);
  });

  it("accepts a fresh proposal with genuinely empty initial runtime and rejects tampered authority", () => {
    const state = aggregate({
      state: "PLANNING",
      current_plan: { ...plan, state: "REJECTED" },
      work_items: {},
      authority_lineage: [{ authority: planningAuthority() }],
    });
    const call = proposalInput(state);
    const before = structuredClone(state);
    expect(reduceTaskCommand(call)).toMatchObject({
      kind: "accepted",
      aggregate: { state: "AWAITING_PLAN_APPROVAL", current_plan: call.command.kind === "propose_plan" ? call.command.plan : undefined },
    });
    expect(reduceTaskCommand({
      ...call,
      authority: { ...call.authority!, digest: kernelDigest("tampered-authority") },
    })).toMatchObject({
      kind: "rejected", code: "AUTHORITY_SCOPE_EXCEEDED", facts: ["authority_digest"],
    });
    expect(state).toEqual(before);
    expect(state.work_items).toEqual({});
  });

  it("proposes scoped replacement only after actual USER approval creates the authentic receipt", () => {
    const f = scopeFixture();
    const before = structuredClone(f.granted);
    const result = reduceTaskCommand(proposalInput(f.granted, planningAuthority(f.parent)));
    expect(result.kind).toBe("accepted");
    if (result.kind !== "accepted") throw new Error("fixture replacement rejected");
    expect(f.granted.mutation_receipts[f.grantMutationId]).toMatchObject({
      command_digest: kernelDigest(f.grantInput.command),
      before_revision: f.blocked.revision,
      after_revision: f.blocked.revision + 1,
    });
    expect(result.aggregate.state).toBe("AWAITING_PLAN_APPROVAL");
    expect(result.aggregate.work_items).toEqual(f.blocked.work_items);
    expect(result.aggregate.work_items.kernel).toBe(f.blocked.work_items.kernel);
    expect(result.aggregate.work_items.producer).toBe(f.blocked.work_items.producer);
    expect(result.aggregate.plan_history).toEqual([...f.granted.plan_history, f.granted.current_plan]);
    expect(result.aggregate.authority_lineage).toEqual(f.granted.authority_lineage);
    expect(Object.keys(result.aggregate.mutation_receipts)).toEqual(
      expect.arrayContaining(Object.keys(f.granted.mutation_receipts)),
    );
    expect(f.granted).toEqual(before);
  });

  it.each(["missing", "tampered"] as const)("rejects %s scope grant receipt without resetting retained work", (kind) => {
    const f = scopeFixture();
    const state = structuredClone(f.granted);
    if (kind === "missing") delete state.mutation_receipts[f.grantMutationId];
    else state.mutation_receipts[f.grantMutationId] = {
      ...state.mutation_receipts[f.grantMutationId]!, command_digest: kernelDigest("wrong-grant"),
    };
    const before = structuredClone(state);
    expect(reduceTaskCommand(proposalInput(state, planningAuthority(f.parent)))).toMatchObject({
      kind: "rejected", code: "ILLEGAL_WORK_ITEM_TRANSITION",
      facts: ["retained_work_requires_bound_replan"],
    });
    expect(state).toEqual(before);
  });

  it.each(["task_id", "plan_digest"] as const)("rejects scope request with wrong %s before approval", (field) => {
    const f = scopeFixture();
    const request = { ...f.request, [field]: kernelDigest("other") };
    const record = {
      ...f.grantInput.command.record,
      observation: {
        ...f.grantInput.command.record.observation!, scope_request: request,
        request_digest: kernelDigest(request),
        evidence_digest: prospectiveScopeApprovalEvidence(request, "USER"),
      },
    };
    const before = structuredClone(f.blocked);
    expect(reduceTaskCommand({ ...f.grantInput, command: { ...f.grantInput.command, record } })).toMatchObject({
      kind: "rejected", code: "AUTHORITY_SCOPE_EXCEEDED", facts: [field === "task_id" ? "scope_request_lineage" : "scope_request_binding"],
    });
    expect(f.blocked).toEqual(before);
  });
});
