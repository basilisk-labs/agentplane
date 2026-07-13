import { describe, expect, it } from "vitest";

import {
  diagnoseGpt55PromptContract,
  diagnoseGpt56PromptContract,
  loadFrameworkPromptModules,
  type PromptModule,
} from "./index.js";
import { PROMPT_MODULE_CONTRACT_SCHEMA_VERSION } from "./model.js";

function agentWorkflowModule(opts: { roleId: string; text: string }): PromptModule {
  return {
    schema_version: PROMPT_MODULE_CONTRACT_SCHEMA_VERSION,
    address: {
      value: `framework/agent_profile/.agentplane~agents/workflow/${opts.roleId.toLowerCase()}`,
      namespace: "framework",
      surface: "agent_profile",
      target: ".agentplane/agents",
      slot: "workflow",
      name: opts.roleId.toLowerCase(),
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
      source_ref: `packages/agentplane/assets/agents/${opts.roleId}.json#workflow`,
    },
  };
}

describe("GPT-5.6 prompt contract diagnostics", () => {
  it("uses GPT-5.6 diagnostic codes and messages", () => {
    const diagnostics = diagnoseGpt56PromptContract([
      agentWorkflowModule({
        roleId: "CODER",
        text: "Keep diffs minimal and task-scoped.",
      }),
    ]);

    expect(diagnostics).toMatchObject([
      {
        severity: "warning",
        code: "gpt56_missing_outcome_contract",
        role_id: "CODER",
      },
    ]);
    expect(diagnostics[0]?.message).toContain("GPT-5.6");
  });

  it("flags shared gateway scaffolding repeated in a role prompt", () => {
    const diagnostics = diagnoseGpt56PromptContract([
      agentWorkflowModule({
        roleId: "CODER",
        text: [
          "Goal: implement approved scope.",
          "Success criteria: checks pass.",
          "Constraints: use loaded gateway and policy modules as binding constraints.",
          "Stop rules: stop on drift.",
          "Output: changed files and checks.",
        ].join("\n"),
      }),
    ]);

    expect(diagnostics).toContainEqual(
      expect.objectContaining({
        severity: "warning",
        code: "gpt56_repeated_gateway_contract",
        role_id: "CODER",
      }),
    );
  });

  it("preserves the GPT-5.5 diagnostic API for compatibility", () => {
    const diagnostics = diagnoseGpt55PromptContract([
      agentWorkflowModule({
        roleId: "CODER",
        text: "Keep diffs minimal and task-scoped.",
      }),
    ]);

    expect(diagnostics[0]?.code).toBe("gpt55_missing_outcome_contract");
    expect(diagnostics[0]?.message).toContain("GPT-5.5");
  });

  it("keeps every bundled agent profile on the lean GPT-5.6 contract", async () => {
    const bundledRoles = new Set([
      "CODER",
      "CREATOR",
      "CURATOR",
      "DOCS",
      "EVALUATOR",
      "EXTRACTOR",
      "INTAKE",
      "INTEGRATOR",
      "ORCHESTRATOR",
      "PLANNER",
      "REDMINE",
      "REVIEWER",
      "TESTER",
      "UPDATER",
      "UPGRADER",
    ]);
    const diagnostics = diagnoseGpt56PromptContract(await loadFrameworkPromptModules()).filter(
      (diagnostic) => diagnostic.role_id && bundledRoles.has(diagnostic.role_id),
    );

    expect(diagnostics).toEqual([]);
  });
});
