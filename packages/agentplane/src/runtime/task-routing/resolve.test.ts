import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";

import {
  reconcileTaskExecutionContract,
  resolveEffectiveTaskWorkflowMode,
  resolveTaskExecutionContract,
  resolveTaskExecutionRoute,
} from "./resolve.js";

describe("task execution route", () => {
  it("keeps legacy task new behavior when repository mode is requested", () => {
    const config = defaultConfig();
    config.workflow_mode = "direct";
    expect(
      resolveTaskExecutionRoute({
        config,
        requestedMode: "repository",
        task: { task_kind: "release", mutation_scope: "release", risk_flags: ["publish"] },
      }),
    ).toMatchObject({ selected_mode: "direct", reason_codes: ["repository_mode_selected"] });
  });

  it("escalates an automatic release task from direct to branch_pr", () => {
    const config = defaultConfig();
    config.workflow_mode = "direct";
    const route = resolveTaskExecutionRoute({
      config,
      requestedMode: "auto",
      task: { task_kind: "release", mutation_scope: "release", risk_flags: ["publish"] },
    });
    expect(route.selected_mode).toBe("branch_pr");
    expect(route.reason_codes).toEqual(["mutation_requires_isolation", "risk_publish"]);
  });

  it("keeps a safe automatic docs task direct", () => {
    const config = defaultConfig();
    config.workflow_mode = "direct";
    expect(
      resolveTaskExecutionRoute({
        config,
        requestedMode: "auto",
        task: { task_kind: "docs", mutation_scope: "docs", risk_flags: [] },
      }).selected_mode,
    ).toBe("direct");
  });

  it("isolates unknown mutation scope even when direct is requested", () => {
    const config = defaultConfig();
    config.workflow_mode = "direct";
    expect(
      resolveTaskExecutionRoute({
        config,
        requestedMode: "direct",
        task: { mutation_scope: "unknown", risk_flags: [] },
      }),
    ).toMatchObject({
      requested_mode: "direct",
      selected_mode: "branch_pr",
      reason_codes: ["direct_request_overridden", "mutation_scope_unknown"],
    });
  });

  it("treats repository branch_pr mode as a non-downgradeable policy floor", () => {
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    const route = resolveTaskExecutionRoute({
      config,
      requestedMode: "direct",
      task: { task_kind: "docs", mutation_scope: "docs", risk_flags: [] },
    });
    expect(route.selected_mode).toBe("branch_pr");
    expect(route.reason_codes).toContain("direct_request_overridden");
  });

  it("lets a persisted route escalate a direct repository", () => {
    const config = defaultConfig();
    config.workflow_mode = "direct";
    expect(
      resolveEffectiveTaskWorkflowMode(
        {
          execution_route: {
            schema_version: 1,
            requested_mode: "auto",
            selected_mode: "branch_pr",
            repository_mode: "direct",
            reason_codes: ["risk_publish"],
            frozen: true,
          },
        },
        config,
      ),
    ).toBe("branch_pr");
  });

  it("respects a compatible agent-selected direct workflow without language classification", () => {
    const config = defaultConfig();
    config.workflow_mode = "direct";
    const contract = resolveTaskExecutionContract({
      config,
      requestedMode: "auto",
      task: {
        task_kind: "code",
        mutation_scope: "code",
        risk_flags: [],
      },
      declaration: {
        schema_version: 1,
        preferred_mode: "direct",
        scope_roots: ["packages/widget/src/parser.ts"],
        repository_effects: ["repository_write", "source_code", "tests"],
        external_effects: [],
        uncertainty: "bounded",
        reversibility: "reversible",
        rationale: ["localized parser fix covered by unit tests"],
      },
    });

    expect(contract).toMatchObject({
      source: "agent_declared",
      selected_mode: "direct",
      reason_codes: ["agent_preferred_direct_compatible"],
      safety: { requires_worktree: false, requires_user_approval: false },
    });
    expect(contract.verification.required_evidence).toContain("repository_effect:tests");
  });

  it("enforces broad declared effects while preserving the agent rationale", () => {
    const config = defaultConfig();
    config.workflow_mode = "direct";
    const contract = resolveTaskExecutionContract({
      config,
      task: { task_kind: "code", mutation_scope: "code", risk_flags: [] },
      declaration: {
        schema_version: 1,
        preferred_mode: "direct",
        scope_roots: ["packages/sdk", "schemas"],
        repository_effects: ["repository_write", "public_api", "schema"],
        external_effects: [],
        uncertainty: "bounded",
        reversibility: "recovery_required",
        rationale: ["SDK contract and stored schema change together"],
      },
    });

    expect(contract.selected_mode).toBe("branch_pr");
    expect(contract.reason_codes).toEqual([
      "effect_public_api",
      "effect_schema",
      "reversibility_recovery_required",
    ]);
    expect(contract.declaration.rationale).toEqual([
      "SDK contract and stored schema change together",
    ]);
  });

  it("escalates underestimated direct work once and preserves observed work", () => {
    const config = defaultConfig();
    config.workflow_mode = "direct";
    const initial = resolveTaskExecutionContract({
      config,
      task: { task_kind: "code", mutation_scope: "code", risk_flags: [] },
      declaration: {
        schema_version: 1,
        preferred_mode: "direct",
        scope_roots: ["."],
        repository_effects: ["repository_write", "source_code", "tests"],
        external_effects: [],
        uncertainty: "bounded",
        reversibility: "reversible",
        rationale: ["expected a localized implementation"],
      },
    });
    const first = reconcileTaskExecutionContract({
      contract: initial,
      changed_paths: ["packages/app/src/index.ts", ".github/workflows/ci.yml"],
      preserved_commit: "abc123",
    });
    const second = reconcileTaskExecutionContract({
      contract: first.contract,
      changed_paths: [".github/workflows/ci.yml", "packages/app/src/index.ts"],
      preserved_commit: "abc123",
    });

    expect(first.escalated).toBe(true);
    expect(first.contract).toMatchObject({
      selected_mode: "branch_pr",
      escalation: {
        from: "direct",
        to: "branch_pr",
        preserved_commit: "abc123",
        preserved_changed_paths: [".github/workflows/ci.yml", "packages/app/src/index.ts"],
      },
    });
    expect(first.contract.verification.required_evidence).toContain("repository_effect:ci");
    expect(second.escalated).toBe(false);
    expect(second.contract).toEqual(first.contract);
  });

  it("never self-authorizes external or destructive effects", () => {
    const config = defaultConfig();
    config.workflow_mode = "direct";
    const contract = resolveTaskExecutionContract({
      config,
      task: { task_kind: "ops", mutation_scope: "ops", risk_flags: [] },
      declaration: {
        schema_version: 1,
        preferred_mode: "direct",
        scope_roots: ["infra"],
        repository_effects: ["repository_write"],
        external_effects: ["deploy", "destructive_git"],
        uncertainty: "bounded",
        reversibility: "irreversible",
        rationale: ["operator requested an external rollout"],
      },
    });

    expect(contract.selected_mode).toBe("branch_pr");
    expect(contract.safety).toEqual({
      requires_worktree: true,
      requires_user_approval: true,
      approval_effects: ["deploy", "destructive_git"],
    });
  });

  it("derives network approval from project policy instead of the agent risk assessment", () => {
    const config = defaultConfig();
    config.workflow_mode = "direct";
    config.agents.approvals.require_network = false;
    const declaration = {
      schema_version: 1 as const,
      preferred_mode: "direct" as const,
      scope_roots: [],
      repository_effects: [],
      external_effects: ["network_read" as const],
      uncertainty: "bounded" as const,
      reversibility: "reversible" as const,
      rationale: ["read public package metadata"],
    };

    const allowed = resolveTaskExecutionContract({
      config,
      task: { task_kind: "analysis", mutation_scope: "none", risk_flags: [] },
      declaration,
    });
    config.agents.approvals.require_network = true;
    const gated = resolveTaskExecutionContract({
      config,
      task: { task_kind: "analysis", mutation_scope: "none", risk_flags: [] },
      declaration,
    });

    expect(allowed.safety).toMatchObject({
      requires_user_approval: false,
      approval_effects: [],
    });
    expect(gated.safety).toMatchObject({
      requires_user_approval: true,
      approval_effects: ["network_read"],
    });
  });

  it("rejects scope roots that normalize outside the repository", () => {
    const config = defaultConfig();
    config.workflow_mode = "direct";

    expect(() =>
      resolveTaskExecutionContract({
        config,
        task: { task_kind: "code", mutation_scope: "code", risk_flags: [] },
        declaration: {
          schema_version: 1,
          preferred_mode: "direct",
          scope_roots: ["packages/app/../../../outside"],
          repository_effects: ["repository_write"],
          external_effects: [],
          uncertainty: "bounded",
          reversibility: "reversible",
          rationale: ["invalid scope"],
        },
      }),
    ).toThrow("scope root must be repository-relative");
  });
});
