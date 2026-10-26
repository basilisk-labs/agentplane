import { describe, expect, it } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { planScopeExpansionApprovalDigest } from "../../../../core/src/tasks/task-kernel/authority-lineage.js";
import {
  aggregate,
  amendmentCommand,
  fingerprint,
  input,
  manifest,
  plan,
  resultDigest,
  runtime,
  validation,
} from "../../../../core/src/tasks/task-kernel/kernel.test-fixtures.js";
import { assertCanonicalPlanVerificationPolicy } from "./kernel-plan-authority.js";

describe("historical empty-check Plan recovery", () => {
  it("preserves completed work, requires a checked correction and exact USER approval, then rejects stale replay", () => {
    const historicalContract = {
      objective: "Implement approved source change",
      acceptance_criteria: ["Implementation complete"],
      verification_commands: [],
      role: "EXECUTOR" as const,
    };
    const checkedContract = {
      objective: "Verify the approved implementation",
      acceptance_criteria: ["Full local regression passes"],
      verification_commands: ["bun run ci:local:full"],
      role: "EXECUTOR" as const,
    };
    const definition = {
      ...plan.work_items[0]!,
      contract_digest: k.kernelDigest(historicalContract),
    };
    const current = { ...plan, work_items: [definition] };
    const completed = {
      ...runtime("COMPLETED"),
      definition,
      result_digest: resultDigest,
      output_manifests: [manifest()],
      validation: validation(resultDigest),
    };
    const state = aggregate({
      state: "FINAL_VALIDATION",
      current_plan: current,
      final_validation: { ...validation(fingerprint), status: "FAILED" },
      work_items: { kernel: completed },
    });
    const correction = {
      ...definition,
      id: "final-correction",
      contract_digest: k.kernelDigest(checkedContract),
      depends_on: ["kernel"],
      expected_outputs: ["verification-evidence"],
    };
    const requirements = {
      task_kind: "code" as const,
      mutation_scope: "code" as const,
      execution_contract: undefined,
    };
    const proposal = {
      work_items: [
        { ...definition, contract: historicalContract },
        { ...correction, contract: checkedContract },
      ],
    };
    expect(() =>
      assertCanonicalPlanVerificationPolicy(requirements, proposal, current),
    ).not.toThrow();
    expect(() =>
      assertCanonicalPlanVerificationPolicy(
        requirements,
        {
          work_items: [
            proposal.work_items[0]!,
            {
              ...proposal.work_items[1]!,
              contract: { ...checkedContract, verification_commands: [] },
            },
          ],
        },
        current,
      ),
    ).toThrow("executable verification");
    const amendment = {
      ...amendmentCommand(state, [definition, correction]),
      work_contracts: {
        [String(k.kernelDigest(historicalContract))]: historicalContract,
        [String(k.kernelDigest(checkedContract))]: checkedContract,
      },
    };
    expect(k.reduceTaskCommand(input(state, amendment))).toMatchObject({
      kind: "rejected",
      code: "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
    });
    const authorized = {
      ...amendment,
      authority_delta_digest: planScopeExpansionApprovalDigest({
        task_id: state.id,
        current_plan_digest: current.digest,
        amended_plan_digest: amendment.amended_plan.digest,
        actor_id: "USER",
      }),
    };
    const approved = k.reduceTaskCommand({
      ...input(state, authorized),
      actor: { id: "USER", kind: "USER", transport: "manual" },
    });
    expect(approved.kind).toBe("accepted");
    if (approved.kind !== "accepted") return;
    expect(approved.aggregate.work_items.kernel).toEqual(completed);
    expect(approved.aggregate.work_items[correction.id]?.state).toBe("READY");
    expect(approved.aggregate.final_validation).toBeNull();
    const stale = k.reduceTaskCommand({
      ...input(approved.aggregate, authorized, "stale-repeated-resume"),
      actor: { id: "USER", kind: "USER", transport: "manual" },
    });
    expect(stale).toMatchObject({ kind: "rejected" });
  });
});
