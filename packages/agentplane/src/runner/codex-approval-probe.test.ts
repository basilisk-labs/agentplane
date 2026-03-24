import { describe, expect, it } from "vitest";

import {
  assessCodexApprovalMode,
  type CodexApprovalMode,
  type CodexApprovalProbeAction,
  type CodexApprovalProbeObservation,
} from "./codex-approval-probe.js";

function makeObservation(opts: {
  mode?: CodexApprovalMode;
  action: CodexApprovalProbeAction;
  exit_code: number | null;
  timed_out?: boolean;
  target_exists_after: boolean;
}): CodexApprovalProbeObservation {
  return {
    mode: opts.mode ?? "untrusted",
    action: opts.action,
    exit_code: opts.exit_code,
    timed_out: opts.timed_out ?? false,
    target_exists_after: opts.target_exists_after,
  };
}

describe("assessCodexApprovalMode", () => {
  it("classifies permissive approval modes when both write and delete succeed", () => {
    const assessment = assessCodexApprovalMode({
      mode: "untrusted",
      write_probe: makeObservation({
        action: "write_probe",
        exit_code: 0,
        target_exists_after: true,
      }),
      delete_probe: makeObservation({
        action: "delete_probe",
        exit_code: 0,
        target_exists_after: false,
      }),
    });

    expect(assessment.verdict).toBe("permissive");
    expect(assessment.summary).toContain("allowed the destructive delete probe");
  });

  it("classifies restrictive approval modes when delete is blocked after a successful write", () => {
    const assessment = assessCodexApprovalMode({
      mode: "on-request",
      write_probe: makeObservation({
        action: "write_probe",
        exit_code: 0,
        target_exists_after: true,
      }),
      delete_probe: makeObservation({
        action: "delete_probe",
        exit_code: 2,
        target_exists_after: true,
      }),
    });

    expect(assessment.verdict).toBe("restrictive");
    expect(assessment.summary).toContain("blocked or failed");
  });

  it("classifies failed control probes as unknown", () => {
    const assessment = assessCodexApprovalMode({
      mode: "never",
      write_probe: makeObservation({
        action: "write_probe",
        exit_code: 1,
        target_exists_after: false,
      }),
      delete_probe: makeObservation({
        action: "delete_probe",
        exit_code: 0,
        target_exists_after: false,
      }),
    });

    expect(assessment.verdict).toBe("unknown");
    expect(assessment.summary).toContain("did not complete the control write probe");
  });
});
