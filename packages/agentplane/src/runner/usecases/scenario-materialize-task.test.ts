import { readFile } from "node:fs/promises";

import { describe, expect, it } from "vitest";

import { loadCommandContext } from "../../commands/shared/task-backend.js";
import { runCliSilent } from "../../cli/run-cli.test-helpers.js";
import {
  createRecipeArchive,
  installRecipesCommandHarness,
  mkGitRepoRoot,
  writeDefaultConfig,
} from "../../commands/recipes.test-helpers.js";
import {
  materializeRecipeScenarioTask,
  buildMaterializedRecipeTask,
} from "./scenario-materialize-task.js";

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
});
