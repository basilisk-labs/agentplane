import { buildAgentSemanticResultV2ValidFixtures } from "@agentplaneorg/core/schemas";
import { describe, expect, it } from "vitest";

import { isRunnerResult } from "./runner-result-validation.js";

function richResult() {
  return {
    status: "success",
    exit_code: 0,
    started_at: "2026-07-24T00:00:00.000Z",
    ended_at: "2026-07-24T00:01:00.000Z",
    summary: "completed",
    timeout_reason: null,
    output_paths: ["/repo/output"],
    artifacts: [{ path: "/repo/output", label: "output" }],
    findings: ["finding"],
    verification_hints: ["run tests"],
    capabilities_used: ["codex.exec"],
    metrics: {
      duration_ms: 60_000,
      stdout_bytes: 10,
      stderr_bytes: 0,
      output_last_message_bytes: null,
    },
    evidence: {
      provenance: "supervisor_observed",
      evidence_paths: ["/repo/output"],
      changed_paths: ["output"],
      conflict_paths: [],
      files_changed_count: 1,
      tests_run: ["test"],
      observed_checks: [{ id: "test", status: "passed" }],
      receipt_path: "/run/execution-receipt.json",
      receipt_sha256: `sha256:${"a".repeat(64)}`,
      verification_candidates: ["test"],
    },
    semantic_result: {
      provenance: "agent_reported",
      value: buildAgentSemanticResultV2ValidFixtures("run-1").completed,
    },
    agent_reported_claims: [
      {
        field: "summary",
        value: "agent summary",
        provenance: "agent_reported",
      },
    ],
    claim_conflicts: [
      {
        field: "status",
        agent_reported: "failed",
        observed: "success",
        resolution: "observed_wins",
      },
    ],
    manifest_warnings: [
      {
        code: "legacy_agent_observed_claim",
        field: "status",
        message: "observed status wins",
      },
    ],
    execution_receipt: {
      path: "/run/execution-receipt.json",
      sha256: `sha256:${"a".repeat(64)}`,
      verification_state: "observed_success",
      observed_by: "agentplane",
    },
  };
}

describe("runner result validation", () => {
  it("accepts a complete supervisor-owned result", () => {
    expect(isRunnerResult(richResult())).toBe(true);
  });

  it("accepts a strict legacy semantic result inside a current supervisor result", () => {
    expect(
      isRunnerResult({
        ...richResult(),
        semantic_result: {
          provenance: "agent_reported",
          value: {
            schema_version: 2,
            kind: "legacy_agent_semantic_result",
            work_order_id: "run-1",
            status: "completed",
            summary: "legacy result",
            findings: [],
          },
        },
      }),
    ).toBe(true);
  });

  it.each([
    ["negative exit code", { exit_code: -1 }],
    ["reversed timestamps", { ended_at: "2026-07-23T23:59:59.000Z" }],
    ["malformed artifacts", { artifacts: [{ path: 1 }] }],
    ["negative metrics", { metrics: { stdout_bytes: -1 } }],
    ["forged evidence provenance", { evidence: { provenance: "agent_reported" } }],
    ["malformed semantic result", { semantic_result: { provenance: "agent_reported", value: {} } }],
    [
      "forged receipt observer",
      {
        execution_receipt: {
          path: "/run/execution-receipt.json",
          sha256: `sha256:${"a".repeat(64)}`,
          verification_state: "observed_success",
          observed_by: "agent",
        },
      },
    ],
    [
      "malformed receipt digest",
      {
        execution_receipt: {
          path: "/run/execution-receipt.json",
          sha256: "not-a-digest",
          verification_state: "observed_success",
          observed_by: "agentplane",
        },
      },
    ],
    [
      "receipt and evidence disagreement",
      {
        execution_receipt: {
          path: "/run/other-receipt.json",
          sha256: `sha256:${"a".repeat(64)}`,
          verification_state: "observed_success",
          observed_by: "agentplane",
        },
      },
    ],
  ])("rejects %s", (_label, replacement) => {
    expect(isRunnerResult({ ...richResult(), ...replacement })).toBe(false);
  });
});
