import { computeAcrRecordDigest, type AgentChangeRecord } from "@agentplaneorg/core/schemas";
import { describe, expect, it } from "vitest";

import { assertAcrCiSemantics } from "./acr.command.js";

const ciOptions = {
  requirePlanApproved: true,
  requireVerification: true,
  requirePolicyPass: true,
  allowWaivedVerification: false,
  allowManualOverride: false,
};

function mergeReadyRecord(): AgentChangeRecord {
  const record: AgentChangeRecord = {
    acr_version: "0.1.0",
    record_type: "agent_change_record",
    record_id: "acr_202605031856_H059JF",
    created_at: "2026-05-03T18:56:00.000Z",
    producer: { name: "agentplane", version: "0.4.2" },
    repository: {
      vcs: "git",
      base_ref: "main",
      base_commit: "1111111111111111111111111111111111111111",
      work_ref: "task/202605031856-H059JF/acr-validation-contract",
      work_commit: "2222222222222222222222222222222222222222",
    },
    task: {
      task_id: "202605031856-H059JF",
      title: "ACR validation contract",
      intent: "Harden ACR validation semantics.",
    },
    agent: {
      id: "CODER",
      name: "Codex",
      agent_type: "coding_agent",
      model: { provider: "openai", name: "unknown", version: "unknown" },
      toolchain: [{ name: "agentplane", version: "0.4.2" }],
    },
    plan: {
      status: "approved",
      artifact: {
        path: ".agentplane/tasks/202605031856-H059JF/README.md",
        sha256: "sha256:1111111111111111111111111111111111111111111111111111111111111111",
      },
      approved_at: "2026-05-03T18:57:00.000Z",
      approved_by: { type: "agentplane_role", id: "ORCHESTRATOR" },
    },
    permissions: {
      network: { mode: "approval_required" },
      secrets: { access: "none" },
      tools: [{ name: "shell", allowed: true }],
    },
    policy: {
      policy_version: "0.1.0",
      decisions: [
        { rule_id: "plan.required", decision: "pass", reason: "Approved plan exists." },
        { rule_id: "verification.required", decision: "pass", reason: "Verification passed." },
      ],
    },
    changes: {
      summary: "Harden ACR validation.",
      diff_stats: { files_changed: 1, insertions: 1, deletions: 0 },
      files: [
        {
          path: "packages/core/src/tasks/task-artifact-schema.acr.ts",
          status: "modified",
          risk_categories: ["schema"],
        },
      ],
      risk: { level: "medium", categories: ["schema"], protected_paths_touched: false },
    },
    verification: {
      status: "passed",
      checks: [
        {
          check_id: "typecheck",
          type: "typecheck",
          command: "bun run --filter=agentplane typecheck",
          status: "passed",
          exit_code: 0,
        },
      ],
    },
    approvals: [
      {
        approval_id: "approval_plan",
        type: "plan_approval",
        decision: "approved",
        approved_by: { type: "agentplane_role", id: "ORCHESTRATOR" },
        approved_at: "2026-05-03T18:57:00.000Z",
        scope: "task",
      },
    ],
    evidence: [
      {
        type: "plan",
        path: ".agentplane/tasks/202605031856-H059JF/README.md",
        sha256: "sha256:1111111111111111111111111111111111111111111111111111111111111111",
      },
      {
        type: "verification_log",
        path: ".agentplane/tasks/202605031856-H059JF/README.md",
        sha256: "sha256:1111111111111111111111111111111111111111111111111111111111111111",
      },
    ],
    result: { status: "verified", merge_ready: true, residual_risks: [] },
    integrity: {
      digest_algorithm: "sha256",
      record_digest: null,
      canonicalization: "rfc8785-jcs",
      signatures: [],
    },
  };
  record.integrity.record_digest = computeAcrRecordDigest(record);
  return record;
}

describe("ACR CI semantics", () => {
  it("accepts a merge-ready record", () => {
    expect(() => assertAcrCiSemantics(mergeReadyRecord(), ciOptions)).not.toThrow();
  });

  it("rejects merge-ready records without plan approval", () => {
    const record = mergeReadyRecord();
    record.approvals = [];

    expect(() => assertAcrCiSemantics(record, ciOptions)).toThrow("ACR_E_PLAN_APPROVAL_REQUIRED");
  });

  it("rejects null digest on merge-ready records", () => {
    const record = mergeReadyRecord();
    record.integrity.record_digest = null;

    expect(() => assertAcrCiSemantics(record, ciOptions)).toThrow("ACR_E_DIGEST_REQUIRED");
  });

  it("rejects failed policy decisions", () => {
    const record = mergeReadyRecord();
    record.policy.decisions.push({
      rule_id: "policy.failed",
      decision: "fail",
      reason: "Policy failed.",
    });

    expect(() => assertAcrCiSemantics(record, ciOptions)).toThrow("ACR_E_POLICY_FAILED");
  });

  it("rejects manual override without explicit allowance", () => {
    const record = mergeReadyRecord();
    record.policy.decisions.push({
      rule_id: "policy.override",
      decision: "manual_override",
      reason: "Manual override requested.",
    });
    record.approvals.push({
      approval_id: "approval_policy_override",
      type: "policy_override",
      decision: "overridden",
      approved_by: { type: "agentplane_role", id: "ORCHESTRATOR" },
      approved_at: "2026-05-03T18:58:00.000Z",
      scope: "policy",
    });

    expect(() => assertAcrCiSemantics(record, ciOptions)).toThrow(
      "ACR_E_MANUAL_OVERRIDE_NOT_ALLOWED",
    );
  });

  it("rejects passed verification without checks", () => {
    const record = mergeReadyRecord();
    record.verification.checks = [];

    expect(() => assertAcrCiSemantics(record, ciOptions)).toThrow(
      "ACR_E_VERIFICATION_CHECK_REQUIRED",
    );
  });
});
