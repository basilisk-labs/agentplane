import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";

import { resolveExecutionProfileRuntime } from "../execution-profile/index.js";
import {
  nativeTaskContextBudgetProblems,
  resolveNativeSemanticToolClasses,
  resolveNativeTaskObligations,
  type NativeTaskObligationInput,
} from "./index.js";

function input(overrides: Partial<NativeTaskObligationInput> = {}): NativeTaskObligationInput {
  return {
    task_kind: "code",
    mutation_scope: "code",
    risk_flags: [],
    selected_mode: "branch_pr",
    route_reason_codes: ["repository_branch_pr_floor"],
    execution_profile: resolveExecutionProfileRuntime(defaultConfig()),
    ...overrides,
  };
}

describe("native task obligations", () => {
  it("owns branch route policy, protected lifecycle stages, stops, and evidence", () => {
    const resolved = resolveNativeTaskObligations(input());

    expect(resolved.kind).toBe("agentplane.native_task_obligations");
    expect(resolved.source).toBe("task_execution_contract");
    expect(resolved.profile).toBe("code");
    expect(resolved.route).toEqual({
      selected_mode: "branch_pr",
      reason_codes: ["repository_branch_pr_floor"],
    });
    expect(resolved.policy_modules).toEqual([
      ".agentplane/policy/dod.code.md",
      ".agentplane/policy/dod.core.md",
      ".agentplane/policy/security.must.md",
      ".agentplane/policy/workflow.branch_pr.md",
    ]);
    expect(resolved.context_budget.max_prompt_blocks).toBe(18);
    expect(
      resolved.mandatory_stages.filter((stage) => stage.required).map((stage) => stage.id),
    ).toEqual([
      "planning",
      "user_approval",
      "implementation",
      "independent_evaluation",
      "deterministic_verification",
      "hosted_integration",
      "effect_in_doubt_stop",
    ]);
    expect(
      resolved.mandatory_stages.filter((stage) => stage.protected).map((stage) => stage.id),
    ).toContain("independent_evaluation");
    expect(resolved.evidence_requirements.map((requirement) => requirement.id)).toEqual(
      expect.arrayContaining([
        "code_pr.fast_checks",
        "code_pr.quality",
        "code_pr.hosted",
        "code_pr.commit",
      ]),
    );
    expect(resolved.stop_rules.map((rule) => rule.id)).toEqual(
      expect.arrayContaining([
        "required_evidence_missing",
        "protected_lifecycle_override",
        "effect_in_doubt",
      ]),
    );
  });

  it("keeps required policy visible and stops when the execution profile budget is too small", () => {
    const executionProfile = resolveExecutionProfileRuntime(defaultConfig());
    executionProfile.context_budget = {
      max_policy_modules: 2,
      max_prompt_blocks: 8,
    };

    const resolved = resolveNativeTaskObligations(
      input({
        task_kind: "release",
        mutation_scope: "release",
        compatibility_preference: "release.strict",
        execution_profile: executionProfile,
      }),
    );

    expect(resolved.policy_modules).toHaveLength(5);
    expect(resolved.context_budget.max_policy_modules).toBe(2);
    expect(resolved.stop_rules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "required_policy_budget_exceeded", severity: "stop" }),
        expect.objectContaining({ id: "required_prompt_budget_exceeded", severity: "stop" }),
      ]),
    );
    expect(nativeTaskContextBudgetProblems(resolved, 9)).toEqual(
      expect.arrayContaining([
        "policy_modules=5 max_policy_modules=2",
        "prompt_blocks=9 max_prompt_blocks=8",
        expect.stringContaining("required_policy_budget_exceeded"),
        expect.stringContaining("required_prompt_budget_exceeded"),
      ]),
    );
  });

  it("preserves rollback and approval floors for operational work", () => {
    const resolved = resolveNativeTaskObligations(
      input({
        task_kind: "code",
        risk_flags: ["deploy"],
      }),
    );

    expect(resolved.profile).toBe("ops");
    expect(resolved.evidence_requirements.map((requirement) => requirement.kind)).toEqual(
      expect.arrayContaining(["approval", "rollback", "quality_report"]),
    );
    expect(resolved.mandatory_stages.find((stage) => stage.id === "user_approval")).toMatchObject({
      required: true,
      protected: true,
      owner: "authority_admission",
    });
  });

  it("admits semantic capabilities only from native authority inputs", () => {
    expect(
      resolveNativeSemanticToolClasses({
        can_mutate: false,
        role: "PLANNER",
        has_knowledge: false,
      }),
    ).not.toContain("workspace_write");
    expect(
      resolveNativeSemanticToolClasses({
        can_mutate: true,
        role: "EXECUTOR",
        has_knowledge: true,
      }),
    ).toEqual(expect.arrayContaining(["workspace_write", "knowledge_read", "knowledge_request"]));
  });

  it("does not emit supervisor command traces into semantic obligations", () => {
    const serialized = JSON.stringify(resolveNativeTaskObligations(input()));

    expect(serialized).not.toMatch(/agentplane (?:integrate|finish|verify|work|pr)|git commit/u);
    expect(serialized).not.toContain("allowedCommands");
  });
});
