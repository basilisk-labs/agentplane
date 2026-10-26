import { describe, expect, it } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import {
  classifyBoundedTimingFailure,
  parseFinalTimingOutcomeReport,
  type FinalValidationFailureEvidence,
  type FinalTimingOutcomeReport,
} from "./kernel-final-timing-exception-evidence.js";

const identity = k.kernelDigest("implementation");
const command = "bun run ci:local:full";
const planDigest = k.kernelDigest("plan");
const record = {
  aggregate: {
    id: "T-1",
    current_plan: { digest: planDigest },
    final_validation: {
      status: "FAILED",
      identity: { implementation_identity: identity, command_digest: k.kernelDigest("commands") },
      evidence_digests: [k.kernelDigest("failed-final-validation")],
    },
  },
} as KernelRecord;
const evidence: FinalValidationFailureEvidence = {
  binding: { commands: [command], plan_digest: planDigest, repository_fingerprint: identity },
  checks: {
    status: "failed",
    artifact_path: "/retained/verification.json",
    reason: null,
    checks: [
      {
        command,
        script: "ci:local:full",
        check_ids: ["ci:local:full"],
        exit_code: 1,
        duration_ms: 1_463_240,
        stdout_tail:
          "5236 passed, 3 skipped\nsuite budget exceeded: duration=1463.240s budget=1440s",
        stderr_tail: "",
      },
    ],
  },
};
const report: FinalTimingOutcomeReport = {
  schema_version: 1,
  kind: "user_attested_final_timing_outcome",
  task_id: "T-1",
  plan_digest: planDigest,
  failure_evidence_digest: k.kernelDigest("failed-final-validation"),
  failed_check_id: command,
  implementation_identity: identity,
  command_digest: k.kernelDigest("commands"),
  budget_ms: 1_440_000,
  duration_ms: 1_463_240,
  functional: { total: 5239, passed: 5236, failed: 0, skipped: 3, incomplete: 0 },
  required_hosted_checks: ["test"],
};

const encoded = (value: unknown) => Buffer.from(JSON.stringify(value)).toString("base64url");

describe("canonical timing-only failure classification", () => {
  it("requires structured zero-failure counts and a declared hosted-check set", () => {
    expect(parseFinalTimingOutcomeReport(encoded(report))).toEqual(report);
    expect(() =>
      parseFinalTimingOutcomeReport(
        encoded({
          ...report,
          functional: { ...report.functional, failed: 1 },
        }),
      ),
    ).toThrow();
    expect(() =>
      parseFinalTimingOutcomeReport(
        encoded({
          ...report,
          required_hosted_checks: [],
        }),
      ),
    ).toThrow();
    expect(() =>
      parseFinalTimingOutcomeReport(encoded({ ...report, required_hosted_checks: [" "] })),
    ).toThrow();
  });

  it("accepts the observed bounded budget failure with completed functional checks", () => {
    expect(
      classifyBoundedTimingFailure({
        evidence,
        record,
        failed_command: command,
        max_overage_ms: 30_000,
        report,
      }),
    ).toEqual({ budget_ms: 1_440_000, duration_ms: 1_463_240, failed_check_id: command });
  });

  it("rejects a failed test even when the timing marker is also present", () => {
    const functional = structuredClone(evidence);
    functional.checks.checks[0]!.stdout_tail += "\n1 failed";
    expect(() =>
      classifyBoundedTimingFailure({
        evidence: functional,
        record,
        failed_command: command,
        max_overage_ms: 30_000,
        report,
      }),
    ).toThrow(/conflicts/);
  });

  it("rejects a functional error even when one sub-suite passed", () => {
    const ambiguous = structuredClone(evidence);
    ambiguous.checks.checks[0]!.stdout_tail =
      "1 passed\nsuite budget exceeded: duration=1463.240s budget=1440s";
    ambiguous.checks.checks[0]!.stderr_tail = "TypeError: test setup failed";
    expect(() =>
      classifyBoundedTimingFailure({
        evidence: ambiguous,
        record,
        failed_command: command,
        max_overage_ms: 30_000,
        report,
      }),
    ).toThrow(/conflicts/);
  });

  it("rejects a stale binding and an overage beyond the approved bound", () => {
    const stale = structuredClone(evidence);
    stale.binding.repository_fingerprint = k.kernelDigest("other");
    expect(() =>
      classifyBoundedTimingFailure({
        evidence: stale,
        record,
        failed_command: command,
        max_overage_ms: 30_000,
        report,
      }),
    ).toThrow(/binding/);
    expect(() =>
      classifyBoundedTimingFailure({
        evidence,
        record,
        failed_command: command,
        max_overage_ms: 20_000,
        report,
      }),
    ).toThrow(/overage/);
  });
});
