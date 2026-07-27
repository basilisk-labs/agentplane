import { describe, expect, it } from "vitest";

import {
  createRunnerEffectOperation,
  createRunnerEffectResolution,
  createRunnerEffectResolutionIntent,
  createRunnerEffectResolutionLease,
  createRunnerEffectResolutionRef,
  validateRunnerEffectResolutionIntent,
} from "./runner-effect-operation.js";

function operation() {
  return createRunnerEffectOperation({
    task_id: "T-RESOLVE",
    origin_run_id: "run-1",
    adapter_id: "custom",
    work_order_id: "work-order-1",
    authority_ref: "work-order:work-order-1",
    authority_digest: "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    precondition_fingerprint_digest:
      "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    precondition_policy_digest:
      "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
    invocation_digest: "sha256:dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
    expected_postconditions: ["runner.result.recorded"],
  });
}

describe("RunnerEffectResolution", () => {
  it("canonically binds an operator verdict to one operation, active claim, and evidence", () => {
    const effect = operation();
    const intent = createRunnerEffectResolutionIntent({
      operation: effect,
      active_claim_generation: "claim-generation-1",
      verdict: "applied",
      actor: "operator-1",
      observed_at: "2026-07-27T00:00:00.000Z",
      evidence_ref: "ticket:123",
      evidence_digest: "sha256:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    });
    const lease = createRunnerEffectResolutionLease({
      operation_key: effect.operation_key,
      intent_digest: intent.digest,
    });
    const resolution = createRunnerEffectResolution({ operation: effect, intent, lease });
    const reference = createRunnerEffectResolutionRef({
      run_id: "run-1",
      active_claim_generation: "claim-generation-1",
      operation: effect,
      intent,
      lease,
      resolution,
    });

    expect(lease.lease_generation).toMatch(/^sha256:[0-9a-f]{64}$/u);
    expect(reference.verdict).toBe("applied");
    expect(reference.resolution_digest).toBe(resolution.digest);
    expect(reference.operation_key).toBe(effect.operation_key);
  });

  it("rejects a tampered evidence or verdict declaration", () => {
    const intent = createRunnerEffectResolutionIntent({
      operation: operation(),
      active_claim_generation: "claim-generation-1",
      verdict: "not_applied",
      actor: "operator-1",
      observed_at: "2026-07-27T00:00:00.000Z",
      evidence_ref: "ticket:123",
      evidence_digest: "sha256:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    });
    expect(() => validateRunnerEffectResolutionIntent({ ...intent, verdict: "applied" })).toThrow(
      "digest mismatch",
    );
  });
});
