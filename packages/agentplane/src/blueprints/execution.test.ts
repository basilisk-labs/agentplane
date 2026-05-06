import { describe, expect, it } from "vitest";

import {
  buildBlueprintExecutionPlanArtifact,
  buildBlueprintExecutionStateArtifact,
  checkBlueprintExecutionReplay,
  checkBlueprintExecutionResume,
} from "./execution.js";
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
    const blueprintPlan = plan();
    const artifact = buildBlueprintExecutionPlanArtifact({
      plan: blueprintPlan,
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
    expect(
      buildBlueprintExecutionStateArtifact({
        plan: blueprintPlan,
        executionPlan: artifact,
        runId: "run-1",
        at: "2026-05-06T10:00:00.000Z",
      }),
    ).toMatchObject({
      artifactKind: "agentplane.blueprint.execution_state",
      blueprintId: "analysis.light",
      nodes: [
        { nodeId: "intake", status: "ready", evidenceRefs: [] },
        { nodeId: "work_unit", status: "pending", evidenceRefs: [] },
      ],
      history: [
        {
          type: "planned",
          message: "Blueprint execution state initialized from deterministic plan.",
        },
      ],
    });
  });

  it("checks replay consistency and derives the next resumable node", () => {
    const blueprintPlan = plan();
    const executionPlan = buildBlueprintExecutionPlanArtifact({
      plan: blueprintPlan,
      runId: "run-1",
      generatedAt: "2026-05-06T10:00:00.000Z",
    });
    const executionState = buildBlueprintExecutionStateArtifact({
      plan: blueprintPlan,
      executionPlan,
      runId: "run-1",
      at: "2026-05-06T10:00:00.000Z",
    });

    expect(checkBlueprintExecutionReplay({ executionPlan, executionState })).toEqual({
      ok: true,
      problems: [],
    });
    expect(checkBlueprintExecutionResume({ executionPlan, executionState })).toEqual({
      ok: true,
      problems: [],
      nextNodeId: "intake",
    });
    expect(
      checkBlueprintExecutionResume({
        executionPlan,
        executionState: {
          ...executionState,
          nodes: [
            { ...executionState.nodes[0], status: "succeeded" },
            { ...executionState.nodes[1], status: "ready" },
          ],
        },
      }),
    ).toEqual({ ok: true, problems: [], nextNodeId: "work_unit" });
  });

  it("rejects replay drift before deriving a resume point", () => {
    const blueprintPlan = plan();
    const executionPlan = buildBlueprintExecutionPlanArtifact({
      plan: blueprintPlan,
      runId: "run-1",
      generatedAt: "2026-05-06T10:00:00.000Z",
    });
    const executionState = buildBlueprintExecutionStateArtifact({
      plan: blueprintPlan,
      executionPlan,
      runId: "other-run",
      at: "2026-05-06T10:00:00.000Z",
    });

    expect(checkBlueprintExecutionReplay({ executionPlan, executionState })).toMatchObject({
      ok: false,
      problems: [{ code: "execution_run_mismatch", path: "runId" }],
    });
    expect(checkBlueprintExecutionResume({ executionPlan, executionState })).toMatchObject({
      ok: false,
      problems: [{ code: "execution_run_mismatch", path: "runId" }],
    });
  });
});
