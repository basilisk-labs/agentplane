import type { KernelWorkContract } from "../kernel-plan-refinement.js";
import { describe, expect, it } from "vitest";
import { kernelDigest, reduceTaskCommand } from "./kernel.js";
import {
  correctiveGrantDigest,
  correctiveRequirements,
  correctiveVerificationCommands,
} from "./corrective-authority.js";
import {
  aggregate,
  amendmentCommand,
  authority,
  fingerprint,
  input,
  plan,
  resultDigest,
  runtime,
  validation,
  effect,
} from "./kernel.test-fixtures.js";
import type { CorrectiveAuthorityGrant, KernelInput, TaskAggregate, TaskCommand } from "./model.js";

const contract: KernelWorkContract = {
  objective: "Repair scoped source",
  acceptance_criteria: ["Preserve behavior"],
  verification_commands: ["bun test focused"],
  role: "EXECUTOR",
};
const contracts = Object.fromEntries([[kernelDigest(contract), contract]]);
const verificationContract = kernelDigest("unchanged native verification contract");
function fixture() {
  const definition = { ...plan.work_items[0]!, contract_digest: kernelDigest(contract) };
  const current = {
    ...plan,
    work_items: [definition],
    digest: kernelDigest({ revision: 1, work_items: [definition] }),
  };
  const state = aggregate({
    current_plan: current,
    state: "FINAL_VALIDATION",
    work_items: { kernel: { ...runtime("COMPLETED"), definition, result_digest: resultDigest } },
    final_validation: { ...validation(fingerprint), status: "FAILED" },
    effects: [effect("preserved", "REQUESTED")],
  });
  const initial = {
    task_id: state.id,
    initial_plan_digest: current.digest,
    actor_id: "USER",
    issued_at: "2026-08-29T20:00:00.000Z",
    expires_at: "2026-08-29T21:00:00.000Z",
    max_attempts: 1,
    requirements: correctiveRequirements(current),
    verification_commands: correctiveVerificationCommands(current, contracts),
    verification_contract_digest: verificationContract,
    policy_digest: kernelDigest(authority.policy_digests),
    revoked_at: null,
    uses: [],
  };
  const grant: CorrectiveAuthorityGrant = { ...initial, digest: correctiveGrantDigest(initial) };
  return { state, grant };
}
function invocation(state: TaskAggregate, command: TaskCommand, mutation = "corrective") {
  return {
    ...input(state, command, mutation),
    authority: {
      ...authority,
      plan_revision: state.current_plan!.revision,
      plan_digest: state.current_plan!.digest,
    },
  };
}
function grantInput(state: TaskAggregate, grant: CorrectiveAuthorityGrant): KernelInput {
  return {
    ...invocation(
      state,
      {
        kind: "grant_corrective_authority",
        task_id: state.id,
        expected_task_revision: state.revision,
        expected_state_fingerprint: fingerprint,
        grant,
        work_contracts: contracts,
      },
      "grant",
    ),
    actor: { id: "USER", kind: "USER", transport: "manual", capabilities: authority.capabilities },
  };
}
function admitted() {
  const { state, grant } = fixture();
  const result = reduceTaskCommand(grantInput(state, grant));
  if (result.kind !== "accepted") throw new Error(JSON.stringify(result));
  return { state: result.aggregate, grant };
}
function correction(state: TaskAggregate, grant: CorrectiveAuthorityGrant) {
  const digest = state.final_validation!.evidence_digests[0]!;
  const id = `final-correction-${digest.slice(7, 19)}`;
  const definition = {
    id,
    depends_on: state.current_plan!.work_items.map((item) => item.id),
    required_inputs: [],
    expected_outputs: [id + "-evidence"],
    optional: false,
    execution_requirements: grant.requirements,
    contract_digest: kernelDigest(contract),
  };
  return {
    ...amendmentCommand(state, [...state.current_plan!.work_items, definition]),
    corrective_grant_digest: grant.digest,
    verification_contract_digest: verificationContract,
    work_contracts: contracts,
  };
}

describe("bounded corrective authority", () => {
  it.each(["destructive_git", "publish", "deploy", "external_write", "provider_write"])(
    "refuses automatic correction inheriting %s from original authority",
    (sensitive) => {
      const initial = fixture();
      const requirements = {
        ...initial.grant.requirements,
        repository_effects: [
          ...initial.grant.requirements.repository_effects,
          sensitive,
        ].toSorted(),
      };
      const work_items = initial.state.current_plan!.work_items.map((item) => ({
        ...item,
        execution_requirements: requirements,
      }));
      const current = {
        ...initial.state.current_plan!,
        work_items,
        digest: kernelDigest({ revision: initial.state.current_plan!.revision, work_items }),
      };
      const state = { ...initial.state, current_plan: current };
      const value = { ...initial.grant, requirements, initial_plan_digest: current.digest };
      const grant = { ...value, digest: correctiveGrantDigest(value) };
      const request = grantInput(state, grant);
      const result = reduceTaskCommand({
        ...request,
        authority: {
          ...request.authority!,
          repository_effects: [...request.authority!.repository_effects, sensitive],
        },
      });
      expect(result.kind).toBe("rejected");
    },
  );

  it("requires explicit manual USER admission and retains an auditable grant", () => {
    const { state, grant } = fixture();
    const candidate = grantInput(state, grant);
    expect(
      reduceTaskCommand({ ...candidate, actor: { ...candidate.actor, kind: "AGENT" } }).kind,
    ).toBe("rejected");
    expect(
      reduceTaskCommand({ ...candidate, actor: { ...candidate.actor, transport: "managed" } }).kind,
    ).toBe("rejected");
    const result = reduceTaskCommand(candidate);
    expect(result.kind).toBe("accepted");
    if (result.kind === "accepted") expect(result.aggregate.corrective_authority).toEqual([grant]);
  });
  it("consumes exactly one attempt atomically, preserves prior work/effects, and rejects competing admission", () => {
    const { state, grant } = admitted();
    const request = invocation(state, correction(state, grant));
    const result = reduceTaskCommand(request);
    expect(result.kind, JSON.stringify(result)).toBe("accepted");
    if (result.kind !== "accepted") return;
    expect(result.aggregate.effects).toEqual(state.effects);
    expect(result.aggregate.work_items.kernel).toEqual(state.work_items.kernel);
    expect(result.aggregate.corrective_authority![0]!.uses).toHaveLength(1);
    expect(
      reduceTaskCommand({ ...request, aggregate: result.aggregate, mutation_id: "competing" }).kind,
    ).toBe("rejected");
    const replay = reduceTaskCommand({ ...request, aggregate: result.aggregate });
    expect(replay.kind).toBe("accepted");
    if (replay.kind === "accepted") {
      expect(replay.events).toEqual([]);
      expect(replay.aggregate.corrective_authority![0]!.uses).toHaveLength(1);
    }
  });

  it("revokes through a manual native command and rejects further correction", () => {
    const { state, grant } = admitted();
    const command: TaskCommand = {
      kind: "revoke_corrective_authority",
      task_id: state.id,
      expected_task_revision: state.revision,
      expected_state_fingerprint: fingerprint,
      grant_digest: grant.digest,
    };
    const request = invocation(state, command, "revoke");
    expect(reduceTaskCommand(request).kind).toBe("rejected");
    const result = reduceTaskCommand({
      ...request,
      actor: { ...request.actor, id: "USER", kind: "USER", transport: "manual" },
    });
    expect(result.kind).toBe("accepted");
    if (result.kind !== "accepted") return;
    expect(result.aggregate.corrective_authority![0]!.revoked_at).toBe(request.occurred_at);
    expect(
      reduceTaskCommand(invocation(result.aggregate, correction(result.aggregate, grant))).kind,
    ).toBe("rejected");
  });
  it.each([
    "revoke",
    "expire",
    "budget",
    "scope",
    "effects",
    "checks",
    "contract",
    "policy",
    "infrastructure",
  ] as const)("rejects %s before consuming a grant", (kind) => {
    const { state: original, grant } = admitted();
    let state = original;
    let command = correction(state, grant);
    let request = invocation(state, command);
    if (kind === "revoke")
      state = { ...state, corrective_authority: [{ ...grant, revoked_at: request.occurred_at }] };
    if (kind === "expire") request = { ...request, occurred_at: grant.expires_at };
    if (kind === "budget")
      state = {
        ...state,
        corrective_authority: [
          {
            ...grant,
            uses: [
              {
                from_plan_digest: grant.initial_plan_digest,
                to_plan_digest: state.current_plan!.digest,
                failure_digest: state.final_validation!.evidence_digests[0]!,
                consumed_at: request.occurred_at,
              },
            ],
          },
        ],
      };
    if (kind === "policy")
      request = {
        ...request,
        authority: { ...request.authority!, policy_digests: [kernelDigest("changed policy")] },
      };
    if (kind === "infrastructure")
      state = { ...state, final_validation: { ...state.final_validation!, status: "BLOCKED" } };
    if (kind === "contract")
      command = { ...command, verification_contract_digest: kernelDigest("changed contract") };
    if (["scope", "effects", "checks"].includes(kind)) {
      const items = [...command.amended_plan.work_items];
      const last = items.at(-1)!;
      if (kind === "checks") {
        const weaker = { ...contract, verification_commands: [] };
        items[items.length - 1] = { ...last, contract_digest: kernelDigest(weaker) };
        command = {
          ...command,
          work_contracts: Object.fromEntries([
            ...Object.entries(contracts),
            [kernelDigest(weaker), weaker],
          ]),
        };
      } else
        items[items.length - 1] = {
          ...last,
          execution_requirements: {
            ...last.execution_requirements,
            ...(kind === "scope" ? { scope_roots: ["."] } : { external_effects: ["pr.merge"] }),
          },
        };
      command = { ...command, ...amendmentCommand(state, items) };
    }
    const before = structuredClone(state);
    const result = reduceTaskCommand({ ...request, aggregate: state, command });
    expect(result.kind, JSON.stringify(result)).toBe("rejected");
    expect(state).toEqual(before);
    expect(original.corrective_authority![0]!.uses).toHaveLength(0);
  });
});
