import { describe, expect, it } from "vitest";

import {
  diagnoseGpt55PromptContract,
  loadFrameworkPromptModules,
  type PromptModule,
} from "./index.js";
import { PROMPT_MODULE_CONTRACT_SCHEMA_VERSION } from "./model.js";

function agentWorkflowModule(opts: {
  roleId: string;
  text: string;
  name?: string;
}): PromptModule {
  return {
    schema_version: PROMPT_MODULE_CONTRACT_SCHEMA_VERSION,
    address: {
      value: `framework/agent_profile/.agentplane~agents/workflow/${opts.name ?? "workflow"}`,
      namespace: "framework",
      surface: "agent_profile",
      target: ".agentplane/agents",
      slot: "workflow",
      name: opts.name ?? "workflow",
    },
    owner: {
      kind: "framework",
      package_name: "agentplane",
    },
    title: `${opts.roleId} workflow`,
    content_kind: "text",
    content: opts.text,
    mutability: "replaceable",
    merge: {
      mode: "pick_one",
      conflict: "error",
    },
    provenance: {
      source_kind: "framework_builtin",
      source_ref: `packages/agentplane/assets/agents/${opts.roleId}.json#${opts.name ?? "workflow"}`,
    },
  };
}

describe("GPT-5.5 prompt contract diagnostics", () => {
  it("accepts an outcome-first role workflow contract", () => {
    const diagnostics = diagnoseGpt55PromptContract([
      agentWorkflowModule({
        roleId: "CODER",
        text: [
          "Goal: implement approved scope with the smallest coherent diff.",
          "Success criteria: checks pass and evidence is recorded.",
          "Constraints: use loaded gateway and policy modules as binding constraints.",
          "Stop rules: stop on approval, security, or verification drift.",
          "Output: changed files, checks, blockers, and residual risk.",
        ].join("\n"),
      }),
    ]);

    expect(diagnostics).toEqual([]);
  });

  it("reports missing outcome sections without failing active prompt loading", () => {
    const diagnostics = diagnoseGpt55PromptContract([
      agentWorkflowModule({
        roleId: "CODER",
        text: "Keep diffs minimal, task-scoped, and easy to review.",
      }),
    ]);

    expect(diagnostics).toMatchObject([
      {
        severity: "warning",
        code: "gpt55_missing_outcome_contract",
        role_id: "CODER",
      },
    ]);
    expect(diagnostics[0]?.message).toContain("Goal");
    expect(diagnostics[0]?.message).toContain("Stop rules");
  });

  it("flags absolute rule language in role workflow prompts", () => {
    const diagnostics = diagnoseGpt55PromptContract([
      agentWorkflowModule({
        roleId: "CODER",
        text: [
          "Goal: implement approved scope.",
          "Success criteria: checks pass.",
          "Constraints: MUST always follow local style.",
          "Stop rules: stop on drift.",
          "Output: summary.",
        ].join("\n"),
      }),
    ]);

    expect(diagnostics).toContainEqual(
      expect.objectContaining({
        severity: "warning",
        code: "gpt55_absolute_rule_in_role_prompt",
        role_id: "CODER",
        evidence: "MUST",
      }),
    );
  });

  it("reports role references that do not resolve to installed profiles", () => {
    const diagnostics = diagnoseGpt55PromptContract([
      agentWorkflowModule({
        roleId: "ORCHESTRATOR",
        text: [
          "Goal: produce an approved plan.",
          "Success criteria: plan is approved.",
          "Constraints: stay within policy.",
          "Stop rules: stop on drift.",
          "Output: plan and approval prompt.",
          "When optimization is requested, invoke UPDATER.",
        ].join("\n"),
      }),
    ]);

    expect(diagnostics).toContainEqual(
      expect.objectContaining({
        severity: "error",
        code: "gpt55_missing_referenced_role",
        role_id: "ORCHESTRATOR",
        evidence: "UPDATER",
      }),
    );
  });

  it("treats current framework profile gaps as migration diagnostics, not loader failures", async () => {
    const diagnostics = diagnoseGpt55PromptContract(await loadFrameworkPromptModules());

    expect(diagnostics.some((diagnostic) => diagnostic.code === "gpt55_missing_outcome_contract"))
      .toBe(true);
    expect(
      diagnostics.filter((diagnostic) => diagnostic.code === "gpt55_missing_referenced_role"),
    ).toEqual([]);
  });
});
