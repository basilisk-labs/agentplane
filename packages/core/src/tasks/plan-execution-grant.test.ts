import { describe, expect, it } from "vitest";

import type { TaskExecutionContract } from "./task-store.js";
import {
  computePlanDigest,
  createExecutionGrant,
  createOperationLease,
  createPlanProposal,
  executionGrantFromExtensions,
  hostUserDecisionDigest,
  isExecutionGrantActive,
  parseHostUserDecision,
} from "./plan-execution-grant.js";

function contract(external_effects: TaskExecutionContract["declaration"]["external_effects"] = []) {
  return {
    schema_version: 1,
    source: "agent_declared",
    declaration: {
      schema_version: 2,
      preferred_mode: "branch_pr",
      scope_roots: ["packages/core"],
      repository_effects: ["source_code", "tests"],
      external_effects,
      requirements_uncertainty: "bounded",
      implementation_uncertainty: "bounded",
      reversibility: "reversible",
      rationale: ["test"],
    },
    selected_mode: "branch_pr",
    repository_mode: "branch_pr",
    reason_codes: [],
    authority: {
      writable_roots: ["packages/core"],
      allowed_repository_effects: ["source_code", "tests"],
      forbidden_repository_effects: [],
      allowed_external_effects: external_effects,
      forbidden_external_effects: [],
    },
    safety: {
      requires_worktree: true,
      requires_user_approval: external_effects.length > 0,
      approval_effects: external_effects,
    },
    verification: { required_evidence: ["task_outcome"] },
    observed: {
      repository_effects: [],
      external_effects: [],
      changed_paths: [],
      changed_components: [],
      verification_results: [],
      authority_violations: [],
    },
  } satisfies TaskExecutionContract;
}

describe("task-scoped execution grants", () => {
  it("normalizes the approved plan before binding its digest", () => {
    expect(computePlanDigest("\r\nPlan\r\n")).toBe(computePlanDigest("Plan"));
  });

  it("compiles plan and execution scope into a durable active grant", () => {
    const executionContract = contract(["external_write"]);
    const proposal = createPlanProposal({
      task_id: "task-1",
      task_revision: 3,
      plan: "Implement and merge",
      execution_contract: executionContract,
    });
    const grant = createExecutionGrant({
      proposal,
      execution_contract: executionContract,
      actor: "HOST:codex:USER",
      approval_kind: "host_user_decision",
      approval_evidence_digest: `sha256:${"a".repeat(64)}`,
      issued_at: "2026-08-21T10:00:00.000Z",
    });

    expect(grant.capabilities).toEqual([
      "provider.merge",
      "provider.pr",
      "repository.integrate",
      "repository.write",
      "task.lifecycle",
    ]);
    expect(
      isExecutionGrantActive({
        grant,
        task_id: "task-1",
        plan: "Implement and merge",
        execution_contract: executionContract,
      }),
    ).toBe(true);
    expect(executionGrantFromExtensions({ "agentplane.execution_grant": grant })?.digest).toBe(
      grant.digest,
    );
  });

  it("invalidates authority when plan or execution scope changes", () => {
    const executionContract = contract();
    const grant = createExecutionGrant({
      proposal: createPlanProposal({
        task_id: "task-1",
        task_revision: 1,
        plan: "Original",
        execution_contract: executionContract,
      }),
      execution_contract: executionContract,
      actor: "USER",
      approval_kind: "manual_operator",
      issued_at: "2026-08-21T10:00:00.000Z",
    });

    expect(
      isExecutionGrantActive({
        grant,
        task_id: "task-1",
        plan: "Changed",
        execution_contract: executionContract,
      }),
    ).toBe(false);
    expect(
      isExecutionGrantActive({
        grant,
        task_id: "task-1",
        plan: "Original",
        execution_contract: contract(["external_write"]),
      }),
    ).toBe(false);
  });

  it("accepts a canonical host-originated user decision and binds operation leases", () => {
    const decision = {
      schema_version: 1,
      kind: "agentplane.host_user_decision",
      origin: "user",
      host_id: "codex",
      conversation_id: "conversation-1",
      message_id: "message-1",
      task_id: "task-1",
      plan_digest: `sha256:${"b".repeat(64)}`,
      state_fingerprint: `sha256:${"c".repeat(64)}`,
      decision: "approved",
      decided_at: "2026-08-21T10:00:00.000Z",
    } as const;
    const parsed = parseHostUserDecision(
      Buffer.from(JSON.stringify(decision), "utf8").toString("base64url"),
    );
    expect(hostUserDecisionDigest(parsed)).toMatch(/^sha256:[0-9a-f]{64}$/u);

    const executionContract = contract(["external_write"]);
    const grant = createExecutionGrant({
      proposal: createPlanProposal({
        task_id: "task-1",
        task_revision: 1,
        plan: "Plan",
        execution_contract: executionContract,
      }),
      execution_contract: executionContract,
      actor: "HOST:codex:USER",
      approval_kind: "host_user_decision",
      approval_evidence_digest: hostUserDecisionDigest(parsed),
      issued_at: decision.decided_at,
    });
    const lease = createOperationLease({
      grant,
      operation_id: "pr.open",
      operation_digest: `sha256:${"d".repeat(64)}`,
      state_fingerprint: decision.state_fingerprint,
      state_scope_digest: `sha256:${"e".repeat(64)}`,
      issued_at: decision.decided_at,
      expires_at: "2026-08-21T10:15:00.000Z",
    });
    expect(lease.grant_digest).toBe(grant.digest);
    expect(lease.digest).toMatch(/^sha256:[0-9a-f]{64}$/u);
  });

  it("rejects an agent-asserted or malformed host decision", () => {
    const encoded = Buffer.from(
      JSON.stringify({
        schema_version: 1,
        kind: "agentplane.host_user_decision",
        origin: "agent",
      }),
      "utf8",
    ).toString("base64url");
    expect(() => parseHostUserDecision(encoded)).toThrow(/fields are malformed/u);
  });
});
