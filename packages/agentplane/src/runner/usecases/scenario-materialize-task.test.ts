import { readFile } from "node:fs/promises";

import { describe, expect, it } from "vitest";

import { loadCommandContext } from "../../commands/shared/task-backend.js";
import { runCliSilent } from "@agentplane/testkit";
import {
  createRecipeArchive,
  installRecipesCommandHarness,
  mkGitRepoRoot,
  writeDefaultConfig,
} from "@agentplane/testkit/recipes";
import {
  materializeRecipeScenarioTask,
  buildMaterializedRecipeTask,
} from "./scenario-materialize-task.js";
import { prepareTaskRunnerExecution } from "./task-run.js";

installRecipesCommandHarness();

describe("materializeRecipeScenarioTask", () => {
  it("materializes a task with recipe provenance and seeded README sections", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const { archivePath, manifest } = await createRecipeArchive();
    expect(await runCliSilent(["recipes", "install", "--path", archivePath, "--root", root])).toBe(
      0,
    );
    expect(
      await runCliSilent([
        "recipes",
        "add",
        `${String(manifest.id)}@${String(manifest.version)}`,
        "--root",
        root,
      ]),
    ).toBe(0);

    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const materialized = await materializeRecipeScenarioTask({
      ctx,
      cwd: root,
      rootOverride: root,
      recipe_id: String(manifest.id),
      scenario_id: "RECIPE_SCENARIO",
      run_id: "recipe-run-123",
    });

    expect(materialized.task.origin).toEqual({
      system: "recipe",
      recipe_id: String(manifest.id),
      scenario_id: "RECIPE_SCENARIO",
      recipe_version: String(manifest.version),
      run_id: "recipe-run-123",
    });
    expect(materialized.recipe_context.recipe_id).toBe(String(manifest.id));
    expect(materialized.recipe_context.agents).toHaveLength(1);
    expect(materialized.recipe_context.skills).toHaveLength(1);
    expect(materialized.recipe_context.tools).toHaveLength(1);
    expect(materialized.recipe_context.capabilities?.entries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: `recipe:${String(manifest.id)}/scenario:RECIPE_SCENARIO`,
          availability: "available",
        }),
        expect.objectContaining({
          id: `recipe:${String(manifest.id)}/agent:RECIPE_AGENT`,
          availability: "available",
        }),
        expect.objectContaining({
          id: `recipe:${String(manifest.id)}/skill:RECIPE_SKILL`,
          availability: "available",
        }),
        expect.objectContaining({
          id: `recipe:${String(manifest.id)}/tool:RECIPE_TOOL`,
          availability: "available",
        }),
      ]),
    );

    const readme = await readFile(materialized.readme_path, "utf8");
    expect(readme).toContain("Recipe-backed task execution.");
    expect(readme).toContain("Run the scenario without task materialization heuristics.");
    expect(readme).toContain("1. Materialize the task. 2. Execute the shared runner.");
    expect(readme).toContain("1. Run scenario execution tests.");
  });

  it("builds deterministic task data for the same recipe input", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const { archivePath, manifest } = await createRecipeArchive();
    expect(await runCliSilent(["recipes", "install", "--path", archivePath, "--root", root])).toBe(
      0,
    );
    expect(
      await runCliSilent([
        "recipes",
        "add",
        `${String(manifest.id)}@${String(manifest.version)}`,
        "--root",
        root,
      ]),
    ).toBe(0);

    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const materialized = await materializeRecipeScenarioTask({
      ctx,
      cwd: root,
      rootOverride: root,
      recipe_id: String(manifest.id),
      scenario_id: "RECIPE_SCENARIO",
      run_id: "recipe-run-123",
    });

    const left = buildMaterializedRecipeTask({
      envelope: {
        entry: materialized.entry,
        selection: materialized.selection,
        scenario: materialized.scenario,
        recipe: materialized.recipe_context,
      },
      task_id: "TASK-1",
      run_id: "recipe-run-123",
      created_at: "2026-03-23T15:00:00.000Z",
    });
    const right = buildMaterializedRecipeTask({
      envelope: {
        entry: materialized.entry,
        selection: materialized.selection,
        scenario: materialized.scenario,
        recipe: materialized.recipe_context,
      },
      task_id: "TASK-1",
      run_id: "recipe-run-123",
      created_at: "2026-03-23T15:00:00.000Z",
    });

    expect(left).toEqual(right);
  });

  it("carries recipe blueprint scenario fixtures into runner blueprint resolution", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const { archivePath, manifest } = await createRecipeArchive({
      tags: ["analysis"],
      scenarioTags: ["analysis", "recipes"],
      blueprintExtensions: [
        {
          id: "viewer.sources",
          kind: "evidence_requirement",
          summary: "Require source-backed recipe evidence",
          target_node_kind: "verify_record",
          evidence: ["sources"],
        },
        {
          id: "viewer.route",
          kind: "preferred_blueprint",
          summary: "Prefer an incompatible route",
          blueprint_id: "code.branch_pr",
        },
      ],
    });
    expect(await runCliSilent(["recipes", "install", "--path", archivePath, "--root", root])).toBe(
      0,
    );
    expect(
      await runCliSilent([
        "recipes",
        "add",
        `${String(manifest.id)}@${String(manifest.version)}`,
        "--root",
        root,
      ]),
    ).toBe(0);

    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const materialized = await materializeRecipeScenarioTask({
      ctx,
      cwd: root,
      rootOverride: root,
      recipe_id: String(manifest.id),
      scenario_id: "RECIPE_SCENARIO",
      run_id: "recipe-run-blueprint",
    });
    await ctx.taskBackend.writeTask({
      ...materialized.task,
      status: "DOING",
      tags: ["analysis", "recipes"],
      verify: [],
    });

    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: materialized.task_id,
      mode: "dry_run",
      run_id: "runner-blueprint-fixture",
      recipe: materialized.recipe_context,
    });

    expect(prepared.bundle.blueprint?.blueprintId).toBe("analysis.light");
    expect(prepared.bundle.blueprint?.acceptedRecipeExtensions).toEqual([
      expect.objectContaining({
        recipeId: String(manifest.id),
        recipeVersion: String(manifest.version),
        extensionId: "viewer.sources",
        kind: "evidence_requirement",
        nodeKind: "verify_record",
        reason: "Recipe hint evidence_requirement accepted for verify_record.",
      }),
    ]);
    expect(prepared.bundle.blueprint?.rejectedRecipeExtensions).toEqual([
      expect.objectContaining({
        recipeId: String(manifest.id),
        recipeVersion: String(manifest.version),
        extensionId: "viewer.route",
        kind: "preferred_blueprint",
        reason:
          "Recipe preferred blueprint code.branch_pr did not match the resolved safe route analysis.light.",
      }),
    ]);
    const executionPlan = JSON.parse(
      await readFile(
        prepared.bundle.execution.artifact_paths.blueprint_execution_plan_path,
        "utf8",
      ),
    ) as {
      artifactKind?: string;
      blueprintId?: string;
      runId?: string;
      steps?: { nodeId: string; dependsOn: string[] }[];
      nodeContracts?: unknown[];
    };
    expect(executionPlan).toMatchObject({
      artifactKind: "agentplane.blueprint.execution_plan",
      blueprintId: "analysis.light",
      runId: "runner-blueprint-fixture",
    });
    expect(executionPlan.steps?.[0]).toMatchObject({ nodeId: "intake", dependsOn: [] });
    expect(executionPlan.nodeContracts?.length).toBe(executionPlan.steps?.length);
    const executionState = JSON.parse(
      await readFile(
        prepared.bundle.execution.artifact_paths.blueprint_execution_state_path,
        "utf8",
      ),
    ) as {
      artifactKind?: string;
      blueprintId?: string;
      history?: { type: string }[];
      nodes?: { nodeId: string; status: string }[];
    };
    expect(executionState).toMatchObject({
      artifactKind: "agentplane.blueprint.execution_state",
      blueprintId: "analysis.light",
      history: [{ type: "planned" }],
    });
    expect(executionState.nodes?.[0]).toMatchObject({ nodeId: "intake", status: "ready" });
  });
});
