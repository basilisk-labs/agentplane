import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";

import {
  reconcileTaskExecutionContract,
  resolveEffectiveTaskWorkflowMode,
  resolveTaskExecutionContract,
  resolveTaskExecutionRoute,
} from "./resolve.js";

describe("task execution route", () => {
  it("derives general repository-write authority from concrete declared effects", () => {
    const config = defaultConfig();
    config.workflow_mode = "direct";
    const contract = resolveTaskExecutionContract({
      config,
      task: {},
      requestedMode: "direct",
      declaration: {
        schema_version: 2,
        preferred_mode: "direct",
        scope_roots: ["packages/agentplane/src/feature"],
        repository_effects: ["source_code", "tests"],
        external_effects: [],
        requirements_uncertainty: "bounded",
        implementation_uncertainty: "bounded",
        reversibility: "reversible",
        rationale: ["localized reversible code change"],
      },
    });

    expect(contract.authority.allowed_repository_effects).toEqual([
      "repository_write",
      "source_code",
      "tests",
    ]);
    expect(contract.authority.forbidden_repository_effects).not.toContain("repository_write");
  });

  it("accepts general repository writes for compatible persisted concrete authority", () => {
    const config = defaultConfig();
    config.workflow_mode = "direct";
    const initial = resolveTaskExecutionContract({
      config,
      task: {},
      requestedMode: "direct",
      declaration: {
        schema_version: 2,
        preferred_mode: "direct",
        scope_roots: ["src"],
        repository_effects: ["source_code"],
        external_effects: [],
        requirements_uncertainty: "bounded",
        implementation_uncertainty: "bounded",
        reversibility: "reversible",
        rationale: ["localized source change"],
      },
    });
    const persisted = structuredClone(initial);
    persisted.authority.allowed_repository_effects = ["source_code"];

    const reconciled = reconcileTaskExecutionContract({
      contract: persisted,
      changed_paths: ["src/feature.ts"],
    });

    expect(reconciled.contract.observed.authority_violations).toEqual([]);
  });

  it("treats the general repository-write observation as an umbrella, not a separate effect", () => {
    const config = defaultConfig();
    config.workflow_mode = "direct";
    const initial = resolveTaskExecutionContract({
      config,
      task: {},
      requestedMode: "direct",
    });

    const reconciled = reconcileTaskExecutionContract({
      contract: initial,
      changed_paths: ["artifact.unknown"],
    });

    expect(reconciled.contract.observed.authority_violations).toEqual([]);
    expect(reconciled.contract.verification.contract).toMatchObject({
      requires_full_regression: true,
      escalation_reasons: ["unknown_path:artifact.unknown"],
    });
  });

  it("computes one monotonic verification contract from declared and observed effects", () => {
    const config = defaultConfig();
    config.workflow_mode = "direct";
    const initial = resolveTaskExecutionContract({
      config,
      task: {},
      requestedMode: "direct",
      declaration: {
        schema_version: 2,
        preferred_mode: "direct",
        scope_roots: ["packages/agentplane/src/feature"],
        repository_effects: ["repository_write", "source_code", "tests"],
        external_effects: [],
        requirements_uncertainty: "bounded",
        implementation_uncertainty: "bounded",
        reversibility: "reversible",
        rationale: ["localized reversible code change"],
      },
    });
    expect(initial.verification.contract).toMatchObject({
      schema_version: 2,
      declared: {
        components: ["packages/agentplane/src/feature"],
        risk: {
          requirements_uncertainty: "bounded",
          implementation_uncertainty: "bounded",
          reversibility: "reversible",
        },
      },
      selected_checks: ["affected_unit_integration", "critical_paths", "task_outcome"],
      requires_full_regression: false,
      requires_real_e2e: false,
    });

    const escalated = reconcileTaskExecutionContract({
      contract: initial,
      changed_paths: ["schemas/task.json"],
      observed_external_effects: ["deploy"],
    }).contract;
    expect(escalated.verification.contract).toMatchObject({
      requires_full_regression: true,
      requires_real_e2e: true,
    });
    expect(escalated.verification.contract?.selected_checks).toEqual(
      expect.arrayContaining([
        "affected_unit_integration",
        "critical_paths",
        "full_regression",
        "real_e2e",
      ]),
    );
    expect(escalated.verification.contract?.declared.repository_effects).toContain("source_code");
    expect(escalated.verification.contract?.observed.repository_effects).toContain("schema");
  });

  it("strengthens verification monotonically from semantic risk and observed effects", () => {
    const config = defaultConfig();
    config.workflow_mode = "direct";
    const initial = resolveTaskExecutionContract({
      config,
      task: {},
      declaration: {
        schema_version: 2,
        preferred_mode: "direct",
        scope_roots: ["packages/app"],
        repository_effects: ["source_code"],
        external_effects: [],
        requirements_uncertainty: "material",
        implementation_uncertainty: "bounded",
        reversibility: "recovery_required",
        rationale: ["recovery-sensitive change with open requirements"],
      },
    });
    expect(initial.verification.contract).toMatchObject({
      requires_full_regression: true,
      requires_real_e2e: true,
      declared: {
        components: ["packages/app"],
        evidence_requirements: [
          "hosted_integration",
          "repository_effect:source_code",
          "requirements_resolution",
          "task_outcome",
        ],
      },
    });

    const observed = reconcileTaskExecutionContract({
      contract: initial,
      changed_paths: ["packages/app/src/feature.ts"],
      observed_external_effects: ["deploy"],
    }).contract;
    expect(observed.verification.contract?.requires_full_regression).toBe(true);
    expect(observed.verification.contract?.requires_real_e2e).toBe(true);
    expect(observed.verification.contract?.observed.external_effects).toContain("deploy");
    expect(observed.verification.contract?.selected_checks).toEqual(
      expect.arrayContaining(["full_regression", "real_e2e", "requirements_resolution"]),
    );
  });

  it("fails closed when an observed changed path has no effect mapping", () => {
    const config = defaultConfig();
    config.workflow_mode = "direct";
    const initial = resolveTaskExecutionContract({
      config,
      task: {},
      requestedMode: "direct",
      declaration: {
        schema_version: 2,
        preferred_mode: "direct",
        scope_roots: ["assets"],
        repository_effects: ["repository_write"],
        external_effects: [],
        requirements_uncertainty: "bounded",
        implementation_uncertainty: "bounded",
        reversibility: "reversible",
        rationale: ["localized reversible artifact change"],
      },
    });
    const reconciled = reconcileTaskExecutionContract({
      contract: initial,
      changed_paths: ["assets/opaque-model.unknown"],
    });
    expect(reconciled.contract.verification.contract).toMatchObject({
      requires_full_regression: true,
      escalation_reasons: ["unknown_path:assets/opaque-model.unknown"],
    });
  });

  it("preserves path-based escalation when a later observation has no changed paths", () => {
    const config = defaultConfig();
    config.workflow_mode = "direct";
    const initial = resolveTaskExecutionContract({
      config,
      task: {},
      declaration: {
        schema_version: 2,
        preferred_mode: "direct",
        scope_roots: ["assets"],
        repository_effects: ["repository_write"],
        external_effects: [],
        requirements_uncertainty: "bounded",
        implementation_uncertainty: "bounded",
        reversibility: "reversible",
        rationale: ["bounded repository change"],
      },
    });
    const observed = reconcileTaskExecutionContract({
      contract: initial,
      changed_paths: ["assets/opaque-model.unknown"],
    }).contract;
    const rereconciled = reconcileTaskExecutionContract({
      contract: observed,
      changed_paths: [],
      verification_results: [{ id: "task_outcome", result: "pass" }],
    }).contract;

    expect(rereconciled.observed.changed_paths).toContain("assets/opaque-model.unknown");
    expect(rereconciled.verification.contract).toMatchObject({
      requires_full_regression: true,
      escalation_reasons: ["unknown_path:assets/opaque-model.unknown"],
    });
  });

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

  it.each([
    {
      requirements: "bounded" as const,
      implementation: "bounded" as const,
      mode: "direct",
      reasons: ["agent_preferred_direct_compatible"],
      evidence: [],
    },
    {
      requirements: "material" as const,
      implementation: "bounded" as const,
      mode: "branch_pr",
      reasons: ["material_requirements_uncertainty"],
      evidence: ["requirements_resolution"],
    },
    {
      requirements: "bounded" as const,
      implementation: "material" as const,
      mode: "branch_pr",
      reasons: ["material_implementation_uncertainty"],
      evidence: ["implementation_risk_validation"],
    },
    {
      requirements: "material" as const,
      implementation: "material" as const,
      mode: "branch_pr",
      reasons: ["material_implementation_uncertainty", "material_requirements_uncertainty"],
      evidence: ["implementation_risk_validation", "requirements_resolution"],
    },
  ])(
    "resolves requirements=$requirements and implementation=$implementation independently",
    ({ requirements, implementation, mode, reasons, evidence }) => {
      const config = defaultConfig();
      config.workflow_mode = "direct";
      const contract = resolveTaskExecutionContract({
        config,
        task: { task_kind: "code", mutation_scope: "code", risk_flags: [] },
        declaration: {
          schema_version: 2,
          preferred_mode: "direct",
          scope_roots: ["packages/app"],
          repository_effects: ["repository_write", "source_code"],
          external_effects: [],
          requirements_uncertainty: requirements,
          implementation_uncertainty: implementation,
          reversibility: "reversible",
          rationale: ["independent uncertainty assessment"],
        },
      });

      expect(contract.selected_mode).toBe(mode);
      expect(contract.reason_codes).toEqual(reasons);
      for (const evidenceId of evidence) {
        expect(contract.verification.required_evidence).toContain(evidenceId);
      }
    },
  );

  it("normalizes legacy combined uncertainty without weakening branch or evidence", () => {
    const config = defaultConfig();
    config.workflow_mode = "direct";
    const contract = resolveTaskExecutionContract({
      config,
      task: { task_kind: "code", mutation_scope: "code", risk_flags: [] },
      declaration: {
        schema_version: 1,
        preferred_mode: "direct",
        scope_roots: ["packages/app"],
        repository_effects: ["repository_write", "source_code"],
        external_effects: [],
        uncertainty: "material",
        reversibility: "reversible",
        rationale: ["legacy combined uncertainty"],
      },
    });

    expect(contract.declaration).toMatchObject({
      schema_version: 2,
      requirements_uncertainty: "material",
      implementation_uncertainty: "material",
    });
    expect(contract.selected_mode).toBe("branch_pr");
    expect(contract.reason_codes).toEqual([
      "material_implementation_uncertainty",
      "material_requirements_uncertainty",
    ]);
    expect(contract.verification.required_evidence).toEqual(
      expect.arrayContaining(["requirements_resolution", "implementation_risk_validation"]),
    );
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
    expect(first.contract.observed.changed_components).toEqual([".github", "packages/app"]);
    expect(first.contract.observed.repository_effects).toEqual(
      expect.arrayContaining(["ci", "source_code", "repository_write"]),
    );
    expect(first.contract.observed.authority_violations).toContain("repository_effect:ci");
    expect(second.escalated).toBe(false);
    expect(second.contract).toEqual(first.contract);
  });

  it("classifies documentation, source, and test paths structurally without task-text keywords", () => {
    const config = defaultConfig();
    config.workflow_mode = "direct";
    const contract = resolveTaskExecutionContract({
      config,
      task: { task_kind: "code", mutation_scope: "code", risk_flags: [] },
      declaration: {
        schema_version: 1,
        preferred_mode: "direct",
        scope_roots: ["."],
        repository_effects: ["repository_write", "source_code", "tests", "documentation"],
        external_effects: [],
        uncertainty: "bounded",
        reversibility: "reversible",
        rationale: ["mixed repository update"],
      },
    });

    const observed = reconcileTaskExecutionContract({
      contract,
      changed_paths: ["docs/guide.mdx", "packages/app/src/index.ts", "tests/app.test.ts"],
    }).contract.observed;
    expect(observed.repository_effects).toEqual([
      "documentation",
      "public_api",
      "repository_write",
      "source_code",
      "tests",
    ]);
    expect(observed.changed_components).toEqual(["docs", "packages/app", "tests"]);
  });

  it("stops undeclared observed external effects and strengthens evidence monotonically", () => {
    const config = defaultConfig();
    config.workflow_mode = "direct";
    const initial = resolveTaskExecutionContract({
      config,
      task: { task_kind: "code", mutation_scope: "code", risk_flags: [] },
      declaration: {
        schema_version: 1,
        preferred_mode: "direct",
        scope_roots: ["packages/app"],
        repository_effects: ["repository_write", "source_code"],
        external_effects: [],
        uncertainty: "bounded",
        reversibility: "reversible",
        rationale: ["local implementation"],
      },
    });
    const reconciled = reconcileTaskExecutionContract({
      contract: initial,
      changed_paths: ["packages/app/src/feature.ts"],
      observed_external_effects: ["network_read"],
      verification_results: [{ id: "unit-tests", result: "fail" }],
      preserved_commit: "abc123",
    });

    expect(initial.authority).toMatchObject({
      writable_roots: ["packages/app"],
      allowed_external_effects: [],
    });
    expect(initial.authority.forbidden_external_effects).toEqual(
      expect.arrayContaining(["network_read", "deploy"]),
    );
    expect(reconciled.escalated).toBe(true);
    expect(reconciled.contract.selected_mode).toBe("branch_pr");
    expect(reconciled.contract.observed).toMatchObject({
      external_effects: ["network_read"],
      changed_components: ["packages/app"],
      verification_results: [{ id: "unit-tests", result: "fail" }],
    });
    expect(reconciled.contract.observed.authority_violations).toEqual(
      expect.arrayContaining(["external_effect:network_read", "verification:unit-tests:fail"]),
    );
    expect(reconciled.contract.verification.required_evidence).toEqual(
      expect.arrayContaining([
        "external_effect:network_read",
        "verification_recovery:unit-tests",
        "hosted_integration",
      ]),
    );
  });

  it("records path authority drift even when the observed effect category was declared", () => {
    const config = defaultConfig();
    config.workflow_mode = "direct";
    const initial = resolveTaskExecutionContract({
      config,
      task: { task_kind: "code", mutation_scope: "code", risk_flags: [] },
      declaration: {
        schema_version: 1,
        preferred_mode: "direct",
        scope_roots: ["packages/app"],
        repository_effects: ["repository_write", "source_code"],
        external_effects: [],
        uncertainty: "bounded",
        reversibility: "reversible",
        rationale: ["localized application implementation"],
      },
    });
    const reconciled = reconcileTaskExecutionContract({
      contract: initial,
      changed_paths: ["packages/other/src/feature.ts"],
      preserved_commit: "abc123",
    });

    expect(reconciled.escalated).toBe(true);
    expect(reconciled.contract.selected_mode).toBe("branch_pr");
    expect(reconciled.contract.observed.changed_components).toEqual(["packages/other"]);
    expect(reconciled.contract.observed.authority_violations).toContain(
      "writable_scope:packages/other/src/feature.ts",
    );
    expect(reconciled.contract.escalation).toMatchObject({
      from: "direct",
      to: "branch_pr",
      preserved_commit: "abc123",
      reason_codes: ["observed_path_outside_scope:packages/other/src/feature.ts"],
    });
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
    expect(allowed.authority).toMatchObject({
      allowed_external_effects: ["network_read"],
    });
    expect(allowed.authority.forbidden_external_effects).not.toContain("network_read");
    expect(gated.safety).toMatchObject({
      requires_user_approval: true,
      approval_effects: ["network_read"],
    });
    expect(gated.authority.allowed_external_effects).toEqual(["network_read"]);
    expect(gated.authority.forbidden_external_effects).not.toContain("network_read");
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
