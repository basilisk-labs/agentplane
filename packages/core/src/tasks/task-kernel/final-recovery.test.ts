import { describe, expect, it } from "vitest";
import { kernelDigest, reduceTaskCommand, isTaskCompletionEligible } from "./kernel.js";
import { planScopeExpansionApprovalDigest } from "./authority-lineage.js";
import {
  aggregate,
  amendmentCommand,
  authority,
  fingerprint,
  input,
  manifest,
  plan,
  resultDigest,
  runtime,
  validation,
} from "./kernel.test-fixtures.js";
import type { TaskCommand } from "./model.js";

describe("failed final validation recovery", () => {
  it.each(["FAILED", "BLOCKED"] as const)(
    "retains %s evidence without completion eligibility",
    (status) => {
      const completed = {
        ...runtime("COMPLETED"),
        result_digest: resultDigest,
        output_manifests: [manifest()],
        validation: validation(resultDigest),
      };
      const state = aggregate({ work_items: { kernel: completed } });
      const command: TaskCommand = {
        kind: "record_final_validation",
        task_id: state.id,
        expected_task_revision: state.revision,
        expected_state_fingerprint: fingerprint,
        validation: { ...validation(fingerprint), status },
      };
      const result = reduceTaskCommand(input(state, command));
      expect(result.kind).toBe("accepted");
      if (result.kind !== "accepted") return;
      expect(result.aggregate.final_validation).toEqual(command.validation);
      expect(result.aggregate.work_items.kernel).toEqual(completed);
      expect(isTaskCompletionEligible(result.aggregate, fingerprint)).toBe(false);
      expect(result.events[0]?.kind).toBe("final_validation_recorded");
      expect(
        reduceTaskCommand(
          input(
            result.aggregate,
            {
              kind: "complete_task",
              task_id: state.id,
              expected_task_revision: result.aggregate.revision,
              expected_state_fingerprint: fingerprint,
            },
            "close",
          ),
        ),
      ).toMatchObject({ kind: "rejected", code: "TASK_COMPLETION_INELIGIBLE" });
    },
  );

  it("requires exact USER approval for corrective work and preserves completed obligations", () => {
    const contract = {
      objective: "Implement scoped change",
      acceptance_criteria: ["Regression passes"],
      verification_commands: ["bun test"],
      role: "EXECUTOR" as const,
    };
    const contractDigest = kernelDigest(contract);
    const definition = { ...plan.work_items[0]!, contract_digest: contractDigest };
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
      id: "correction",
      depends_on: ["kernel"],
      expected_outputs: ["correction-evidence"],
    };
    const amendment = {
      ...amendmentCommand(state, [definition, correction]),
      work_contracts: Object.fromEntries([[contractDigest, contract]]),
    };
    expect(reduceTaskCommand(input(state, amendment))).toMatchObject({
      kind: "rejected",
      code: "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
    });
    const approved = {
      ...amendment,
      authority_delta_digest: planScopeExpansionApprovalDigest({
        task_id: state.id,
        current_plan_digest: current.digest,
        amended_plan_digest: amendment.amended_plan.digest,
        actor_id: "USER",
      }),
    };
    const result = reduceTaskCommand({
      ...input(state, approved),
      actor: { id: "USER", kind: "USER", transport: "manual" },
    });
    expect(result.kind).toBe("accepted");
    if (result.kind !== "accepted") return;
    expect(result.aggregate.work_items.kernel).toEqual(completed);
    expect(result.aggregate.work_items.correction?.state).toBe("READY");
    expect(result.aggregate.final_validation).toBeNull();
    expect(isTaskCompletionEligible(result.aggregate, fingerprint)).toBe(false);
    const premature: TaskCommand = {
      kind: "transition_work_item",
      action: "complete",
      task_id: state.id,
      expected_task_revision: result.aggregate.revision,
      expected_state_fingerprint: fingerprint,
      work_item_id: "correction",
      claim_id: null,
    };
    expect(
      reduceTaskCommand({
        ...input(result.aggregate, premature, "premature"),
        authority: {
          ...authority,
          plan_revision: result.aggregate.current_plan!.revision,
          plan_digest: result.aggregate.current_plan!.digest,
        },
      }),
    ).toMatchObject({ kind: "rejected", code: "ILLEGAL_WORK_ITEM_TRANSITION" });
  });
});
