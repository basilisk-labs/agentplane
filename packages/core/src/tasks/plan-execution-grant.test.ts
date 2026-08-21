import { describe, expect, it } from "vitest";

import type { TaskExecutionContract } from "./task-store.js";
import {
  computePlanDigest,
  createExecutionGrant,
  createOperationLease,
  createPlanProposal,
  executionGrantDigest,
  executionGrantForContextFromExtensions,
  executionGrantFromExtensions,
  hostUserDecisionDigest,
  isExecutionGrantActive,
  parseHostUserDecision,
  parseOperationLease,
  parsePlanProposal,
} from "./plan-execution-grant.js";

const REPOSITORY_IDENTITY = `sha256:${"f".repeat(64)}`;

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
      repository_identity: REPOSITORY_IDENTITY,
    });
    expect(parsePlanProposal(proposal)).toEqual(proposal);
    expect(parsePlanProposal({ ...proposal, repository_identity: "moved-path" })).toBeNull();
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
      "task.scope.extend",
    ]);
    expect(
      isExecutionGrantActive({
        grant,
        task_id: "task-1",
        plan: "Implement and merge",
        execution_contract: executionContract,
        repository_identity: REPOSITORY_IDENTITY,
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
        repository_identity: REPOSITORY_IDENTITY,
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
        repository_identity: REPOSITORY_IDENTITY,
      }),
    ).toBe(false);
    expect(
      isExecutionGrantActive({
        grant,
        task_id: "task-1",
        plan: "Original",
        execution_contract: executionContract,
        repository_identity: `sha256:${"e".repeat(64)}`,
      }),
    ).toBe(false);
    expect(
      isExecutionGrantActive({
        grant,
        task_id: "task-1",
        plan: "Original",
        execution_contract: contract(["external_write"]),
        repository_identity: REPOSITORY_IDENTITY,
      }),
    ).toBe(false);
  });

  it("keeps authority active for path-only scope extension and rejects new effects", () => {
    const initial = contract();
    const grant = createExecutionGrant({
      proposal: createPlanProposal({
        task_id: "task-1",
        task_revision: 1,
        plan: "Implement the approved repository change",
        execution_contract: initial,
        repository_identity: REPOSITORY_IDENTITY,
      }),
      execution_contract: initial,
      actor: "USER",
      approval_kind: "manual_operator",
      issued_at: "2026-08-21T10:00:00.000Z",
    });
    const expanded = {
      ...initial,
      declaration: {
        ...initial.declaration,
        scope_roots: [...initial.declaration.scope_roots, "packages/agentplane"],
      },
      authority: {
        ...initial.authority,
        writable_roots: [...initial.authority.writable_roots, "packages/agentplane"],
      },
    } satisfies TaskExecutionContract;

    expect(
      isExecutionGrantActive({
        grant,
        task_id: "task-1",
        plan: "Implement the approved repository change",
        execution_contract: expanded,
        repository_identity: REPOSITORY_IDENTITY,
      }),
    ).toBe(true);

    const materiallyExpanded = {
      ...expanded,
      declaration: {
        ...expanded.declaration,
        repository_effects: [...expanded.declaration.repository_effects, "documentation"],
      },
      authority: {
        ...expanded.authority,
        allowed_repository_effects: [
          ...expanded.authority.allowed_repository_effects,
          "documentation",
        ],
      },
    } satisfies TaskExecutionContract;
    expect(
      isExecutionGrantActive({
        grant,
        task_id: "task-1",
        plan: "Implement the approved repository change",
        execution_contract: materiallyExpanded,
        repository_identity: REPOSITORY_IDENTITY,
      }),
    ).toBe(false);
  });

  it("deterministically upgrades a valid legacy grant without changing historical evidence", () => {
    const executionContract = contract();
    const current = createExecutionGrant({
      proposal: createPlanProposal({
        task_id: "task-legacy",
        task_revision: 4,
        plan: "Legacy approved plan",
        execution_contract: executionContract,
        repository_identity: REPOSITORY_IDENTITY,
      }),
      execution_contract: executionContract,
      actor: "USER",
      approval_kind: "manual_operator",
      issued_at: "2026-08-20T10:00:00.000Z",
    });
    const {
      repository_identity: _repositoryIdentity,
      completion_contract_digest: _completionDigest,
      digest: _currentDigest,
      ...legacyUnsigned
    } = current;
    const legacy = { ...legacyUnsigned, digest: executionGrantDigest(legacyUnsigned) };

    const migrated = executionGrantForContextFromExtensions({
      extensions: { "agentplane.execution_grant": legacy },
      repository_identity: REPOSITORY_IDENTITY,
      execution_contract: executionContract,
    });

    expect(migrated).toMatchObject({
      task_id: "task-legacy",
      repository_identity: REPOSITORY_IDENTITY,
      approval_kind: "manual_operator",
    });
    expect(legacy).not.toHaveProperty("repository_identity");
    expect(
      executionGrantForContextFromExtensions({
        extensions: {
          "agentplane.execution_grant": { ...legacy, actor: "AGENT" },
        },
        repository_identity: REPOSITORY_IDENTITY,
        execution_contract: executionContract,
      }),
    ).toBeNull();
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
        repository_identity: REPOSITORY_IDENTITY,
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
    expect(parseOperationLease(lease)).toEqual(lease);
    expect(parseOperationLease({ ...lease, task_id: "task-2" })).toBeNull();
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

  it("rejects excessive base64url padding without a backtracking expression", () => {
    const encoded = Buffer.from('{"origin":"user"}', "utf8").toString("base64url");
    expect(() => parseHostUserDecision(`${encoded}${"=".repeat(100_000)}`)).toThrow(
      /canonical base64url/u,
    );
  });
});
