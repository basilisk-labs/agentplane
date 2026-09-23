import { describe, expect, it } from "vitest";
import { taskKernel as k, type TaskExecutionContract } from "@agentplaneorg/core/tasks";

import {
  canonicalPlanContractViolations,
  repositoryPolicyApprovalEligible,
} from "./kernel-plan-authority.js";
import { resolveExplicitExecutionContract } from "./create.command.js";

function contract(): TaskExecutionContract {
  return {
    schema_version: 1,
    source: "agent_declared",
    declaration: {
      schema_version: 2,
      preferred_mode: "direct",
      scope_roots: ["src"],
      repository_effects: ["source_code", "tests"],
      external_effects: [],
      requirements_uncertainty: "bounded",
      implementation_uncertainty: "bounded",
      reversibility: "reversible",
      rationale: ["explicit intake"],
    },
    selected_mode: "direct",
    repository_mode: "direct",
    reason_codes: ["agent_preferred_direct_compatible"],
    authority: {
      writable_roots: ["src"],
      allowed_repository_effects: ["repository_write", "source_code", "tests"],
      forbidden_repository_effects: [],
      allowed_external_effects: [],
      forbidden_external_effects: [],
      allowed_capabilities: ["repository_write"],
      allowed_resources: ["source-lock"],
    },
    safety: { requires_worktree: false, requires_user_approval: false, approval_effects: [] },
    verification: { required_evidence: ["task_outcome"] },
    observed: {
      repository_effects: [],
      external_effects: [],
      changed_paths: [],
      changed_components: [],
      verification_results: [],
      authority_violations: [],
    },
  };
}

function plan(overrides: Partial<k.ExecutionRequirements> = {}): k.PlanRecord {
  const workItems = [
    {
      id: "build",
      depends_on: [],
      required_inputs: [],
      expected_outputs: ["source"],
      execution_requirements: {
        scope_roots: ["src"],
        repository_effects: ["source_code"],
        external_effects: [],
        capabilities: ["repository_write"],
        resources: ["source-lock"],
        ...overrides,
      },
      optional: false,
    },
  ];
  return {
    revision: 1,
    digest: k.kernelDigest({ revision: 1, work_items: workItems }),
    state: "PROPOSED",
    approval_actor_id: null,
    approval_evidence_digest: null,
    work_items: workItems,
  };
}

const config = (requirePlan: boolean) =>
  ({ agents: { approvals: { require_plan: requirePlan, require_network: true } } }) as never;

describe("canonical Plan execution-contract admission", () => {
  it("preserves explicitly requested test, documentation, schema, and CI effects at intake", () => {
    const executionContract = resolveExplicitExecutionContract({
      config: {
        workflow_mode: "direct",
        agents: { approvals: { require_network: true } },
      } as never,
      intent: {
        taskKind: "docs",
        mutationScope: "docs",
        riskFlags: [],
        tags: ["docs"],
        source: "explicit",
        code: "explicit_structured_intent",
        confirmation_required: false,
      },
      parsed: {
        outcome: "Update schema documentation and CI tests",
        owner: "CODER",
        priority: "med",
        route: "auto",
        tags: ["docs"],
        taskKind: "docs",
        mutationScope: "docs",
        riskFlags: [],
        verify: ["bun test docs"],
        scopeRoots: ["docs", "schemas", ".github"],
        repositoryEffects: ["schema", "ci"],
        externalEffects: [],
        capabilities: [],
        resources: ["docs-contract"],
        allowDuplicate: false,
        json: true,
      },
    });
    expect(executionContract.declaration.repository_effects).toEqual([
      "ci",
      "documentation",
      "repository_write",
      "schema",
      "tests",
    ]);
    expect(executionContract.authority.allowed_resources).toEqual(["docs-contract"]);
    expect(executionContract.source).toBe("agent_declared");
  });

  it("admits an exact contract subset for repository-policy approval", () => {
    const task = { execution_contract: contract() };
    expect(canonicalPlanContractViolations(task, plan())).toEqual([]);
    expect(repositoryPolicyApprovalEligible({ config: config(false), task, plan: plan() })).toBe(
      true,
    );
  });

  it.each([
    ["scope_roots", { scope_roots: ["outside"] }],
    ["repository_effects", { repository_effects: ["schema"] }],
    ["external_effects", { external_effects: ["credentials"] }],
    ["capabilities", { capabilities: ["provider_write"] }],
    ["resources", { resources: ["undeclared-lock"] }],
  ] as const)("rejects undeclared %s", (violation, requirements) => {
    expect(
      canonicalPlanContractViolations({ execution_contract: contract() }, plan(requirements)),
    ).toContain(violation);
  });

  it("keeps explicit approval and material-risk contracts at a human boundary", () => {
    const task = { execution_contract: contract() };
    expect(repositoryPolicyApprovalEligible({ config: config(true), task, plan: plan() })).toBe(
      false,
    );
    task.execution_contract.declaration.requirements_uncertainty = "material";
    expect(repositoryPolicyApprovalEligible({ config: config(false), task, plan: plan() })).toBe(
      false,
    );
  });
});
