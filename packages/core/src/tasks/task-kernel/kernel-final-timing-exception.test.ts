import { describe, expect, it } from "vitest";

import { isTaskCompletionEligible, kernelDigest, reduceTaskCommand } from "./kernel.js";
import type { TaskCommand } from "./model.js";
import {
  aggregate,
  effect,
  fingerprint,
  input,
  manifest,
  resultDigest,
  runtime,
  validation,
} from "./kernel.test-fixtures.js";

function expectRejection(invocation: Parameters<typeof reduceTaskCommand>[0], code: string): void {
  expect(reduceTaskCommand(invocation)).toMatchObject({ kind: "rejected", code });
}

describe("canonical final timing exception", () => {
  it("keeps FAILED validation while a bounded USER timing exception permits exact completion", () => {
    const failedValidation = { ...validation(fingerprint), status: "FAILED" as const };
    const state = aggregate({
      state: "FINAL_VALIDATION",
      final_validation: failedValidation,
      work_items: {
        kernel: {
          ...runtime("COMPLETED"),
          result_digest: resultDigest,
          output_manifests: [manifest()],
          validation: validation(resultDigest),
        },
      },
    });
    const exception = {
      schema_version: 1 as const,
      kind: "timing_only" as const,
      task_id: state.id,
      plan_revision: state.current_plan!.revision,
      plan_digest: state.current_plan!.digest,
      validation_digest: kernelDigest(failedValidation),
      failed_check_id: "full-suite",
      failure_evidence_digest: failedValidation.evidence_digests[0]!,
      implementation_identity: fingerprint,
      acceptance_fingerprint: fingerprint,
      command_digest: failedValidation.identity.command_digest,
      environment_digest: failedValidation.identity.environment_digest,
      budget_ms: 1_440_000,
      duration_ms: 1_463_240,
      max_overage_ms: 30_000,
      hosted_head_sha: "a".repeat(40),
      hosted_required_checks: ["unit", "lint"],
      hosted_evidence_digest: kernelDigest("hosted-green"),
      approval_evidence_digest: kernelDigest("signed-user-receipt"),
      approval_mode: "signed_user_receipt" as const,
      approval_actor_id: "USER:release-owner@trusted-issuer",
      approved_by: "USER" as const,
      accepted_at: "2026-08-29T20:00:00.000Z",
    };
    const command: TaskCommand = {
      kind: "accept_final_timing_exception",
      task_id: state.id,
      expected_task_revision: state.revision,
      expected_state_fingerprint: fingerprint,
      exception,
    };
    const asUser = (candidate: TaskCommand) => ({
      ...input(state, candidate),
      actor: {
        id: "USER:release-owner@trusted-issuer",
        kind: "USER" as const,
        transport: "manual" as const,
        capabilities: [],
      },
    });
    expect(isTaskCompletionEligible(state, fingerprint)).toBe(false);
    expectRejection(input(state, command), "TASK_COMPLETION_INELIGIBLE");
    const accepted = reduceTaskCommand(asUser(command));
    expect(accepted.kind).toBe("accepted");
    if (accepted.kind !== "accepted") return;
    expect(accepted.aggregate.final_validation).toEqual(failedValidation);
    expect(accepted.aggregate.final_timing_exception).toEqual(exception);
    expect(isTaskCompletionEligible(accepted.aggregate, fingerprint)).toBe(true);
    expect(isTaskCompletionEligible(accepted.aggregate, kernelDigest("changed-source"))).toBe(
      false,
    );
    expect(
      isTaskCompletionEligible(
        {
          ...accepted.aggregate,
          current_plan: { ...state.current_plan!, digest: kernelDigest("new-plan") },
        },
        fingerprint,
      ),
    ).toBe(false);
    expect(
      isTaskCompletionEligible(
        { ...accepted.aggregate, effects: [effect("pending", "PENDING")] },
        fingerprint,
      ),
    ).toBe(false);
    expect(
      reduceTaskCommand(
        asUser({ ...command, exception: { ...exception, duration_ms: 1_600_000 } }),
      ),
    ).toMatchObject({ kind: "rejected", code: "TASK_COMPLETION_INELIGIBLE" });
    const manual = {
      ...exception,
      approval_mode: "manual_operator" as const,
      approval_actor_id: "USER",
    };
    expect(
      reduceTaskCommand({
        ...asUser({ ...command, exception: manual }),
        actor: { ...asUser(command).actor, id: "USER" },
      }),
    ).toMatchObject({ kind: "accepted" });
    expect(reduceTaskCommand(asUser({ ...command, exception: manual }))).toMatchObject({
      kind: "rejected",
      code: "TASK_COMPLETION_INELIGIBLE",
    });
    expect(
      reduceTaskCommand(
        asUser({ ...command, exception: { ...exception, hosted_required_checks: [] } }),
      ),
    ).toMatchObject({ kind: "rejected", code: "TASK_COMPLETION_INELIGIBLE" });
    expect(
      reduceTaskCommand(
        asUser({
          ...command,
          exception: { ...exception, failure_evidence_digest: kernelDigest("other") },
        }),
      ),
    ).toMatchObject({ kind: "rejected", code: "TASK_COMPLETION_INELIGIBLE" });
  });
});
