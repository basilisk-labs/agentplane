import { describe, expect, it } from "vitest";

import { buildBlueprintExecutionPlanArtifact } from "./execution.js";
import type { BlueprintPlanArtifact } from "./model.js";

function plan(): BlueprintPlanArtifact {
  return {
    schemaVersion: 1,
    blueprintId: "analysis.light",
    blueprintVersion: 1,
    title: "Analysis",
    taskId: "TASK-1",
    workflowMode: "direct",
    taskIntent: { taskKind: "analysis", mutationScope: "none" },
    whySelected: ["task kind resolved to analysis"],
    states: [
      {
        id: "intake",
        kind: "intake",
        mode: "deterministic",
        required: true,
        protected: false,
        allowedCommands: [],
        policyModules: [],
        evidenceKinds: [],
      },
      {
        id: "work_unit",
        kind: "work_unit",
        mode: "agentic",
        required: true,
        protected: false,
        allowedCommands: [],
        policyModules: [],
        evidenceKinds: ["final_output"],
      },
    ],
    requiredEvidence: [],
    policyModules: [],
    allowedCommands: [],
    contextBudget: { maxPolicyModules: 0, rationale: "test" },
    contextManifest: [],
    acceptedRecipeExtensions: [
      {
        recipeId: "viewer",
        recipeVersion: "1.0.0",
        extensionId: "viewer.sources",
        nodeKind: "work_unit",
        kind: "output_schema",
        value: { type: "object" },
        reason: "Recipe hint output_schema accepted for work_unit.",
      },
    ],
    rejectedRecipeExtensions: [],
    stopReasons: [{ id: "scope_drift", severity: "stop", reason: "Scope changed." }],
  };
}

describe("blueprint execution contract", () => {
  it("builds deterministic node execution contracts from a resolved plan", () => {
    const artifact = buildBlueprintExecutionPlanArtifact({
      plan: plan(),
      runId: "run-1",
      generatedAt: "2026-05-06T10:00:00.000Z",
    });

    expect(artifact).toMatchObject({
      schemaVersion: 1,
      artifactKind: "agentplane.blueprint.execution_plan",
      blueprintId: "analysis.light",
      blueprintVersion: 1,
      taskId: "TASK-1",
      runId: "run-1",
      generatedAt: "2026-05-06T10:00:00.000Z",
    });
    expect(artifact.steps.map((step) => [step.nodeId, step.dependsOn])).toEqual([
      ["intake", []],
      ["work_unit", ["intake"]],
    ]);
    expect(artifact.nodeContracts[1]).toMatchObject({
      artifactKind: "agentplane.blueprint.node_execution_contract",
      blueprintId: "analysis.light",
      runId: "run-1",
      step: {
        nodeId: "work_unit",
        expectedEvidence: ["final_output"],
      },
      acceptedRecipeExtensions: [
        expect.objectContaining({
          recipeId: "viewer",
          extensionId: "viewer.sources",
        }),
      ],
      stopReasons: [{ id: "scope_drift", severity: "stop", reason: "Scope changed." }],
    });
  });
});
