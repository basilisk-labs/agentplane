import { describe, expect, it } from "vitest";

import { makeRunnerContextBundle } from "@agentplane/testkit/runner";

import { buildRunnerExecutionPlaybookContract } from "../playbooks.js";
import { assertRunnerBlueprintPolicyModuleBudget, renderTaskRunnerBootstrap } from "./task-run.js";

describe("runner blueprint guards", () => {
  it("rejects bundle policy modules that exceed the resolved blueprint budget", () => {
    const bundle = makeRunnerContextBundle();
    bundle.blueprint = {
      schemaVersion: 1,
      blueprintId: "code.branch_pr",
      blueprintVersion: 1,
      title: "Code PR",
      taskIntent: {},
      whySelected: [],
      states: [],
      requiredEvidence: [],
      policyModules: [".agentplane/policy/security.must.md", ".agentplane/policy/dod.core.md"],
      allowedCommands: [],
      contextBudget: { maxPolicyModules: 1, maxPromptBlocks: 8, rationale: "test budget" },
      contextManifest: [
        {
          id: ".agentplane/policy/security.must.md",
          kind: "policy_module",
          reason: "test",
          source: ".agentplane/policy/security.must.md",
        },
        {
          id: ".agentplane/policy/dod.core.md",
          kind: "policy_module",
          reason: "test",
          source: ".agentplane/policy/dod.core.md",
        },
      ],
      acceptedRecipeExtensions: [],
      rejectedRecipeExtensions: [],
      stopReasons: [],
    };

    expect(() => assertRunnerBlueprintPolicyModuleBudget(bundle)).toThrow(
      "Runner blueprint policy module budget exceeded.",
    );
  });

  it("renders blueprint stop rules into the runner bootstrap", () => {
    const bundle = makeRunnerContextBundle();
    bundle.blueprint = {
      schemaVersion: 1,
      blueprintId: "analysis.light",
      blueprintVersion: 1,
      title: "Analysis",
      taskIntent: {},
      whySelected: [],
      states: [],
      requiredEvidence: [],
      policyModules: [],
      allowedCommands: [],
      contextBudget: { maxPolicyModules: 0, maxPromptBlocks: 8, rationale: "test budget" },
      contextManifest: [],
      acceptedRecipeExtensions: [],
      rejectedRecipeExtensions: [],
      stopReasons: [{ id: "scope_drift", severity: "hard", reason: "Task scope changed." }],
    };

    expect(renderTaskRunnerBootstrap(bundle)).toContain("Blueprint stop rules:");
    expect(renderTaskRunnerBootstrap(bundle)).toContain("hard: Task scope changed. (scope_drift)");
  });

  it("renders execution playbook verifier checks into the runner bootstrap", () => {
    const bundle = makeRunnerContextBundle({
      title: "Capture inbox item",
      description: "Create capture, distill card, thread update, and retire the source.",
    });
    bundle.playbook = buildRunnerExecutionPlaybookContract(bundle);

    const bootstrap = renderTaskRunnerBootstrap(bundle);

    expect(bootstrap).toContain("Execution playbook contract:");
    expect(bootstrap).toContain("selected_playbook: knowledge_capture_pipeline");
    expect(bootstrap).toContain("source_retired");
  });
});
