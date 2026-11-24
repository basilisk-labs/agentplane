import { writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { resolveProject } from "@agentplaneorg/core/project";

import {
  buildRecipeResolverContext,
  listResolvedRecipeScenarios,
  resolveRecipeScenarioSelection,
} from "./recipes/impl/resolver.js";
import {
  baseRecipeEntry,
  baseRecipeManifest,
  installRecipesCommandHarness,
  mkGitRepoRoot,
  scenarioDescriptor,
  writeDefaultConfig,
  writeInstalledRecipes,
} from "@agentplane/testkit/recipes";

installRecipesCommandHarness();

describe("commands/recipes scenario", () => {
  it("builds deterministic resolver context and normalized run profiles", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await writeFile(
      path.join(projectDir, "package.json"),
      JSON.stringify({ name: "resolver-fixture", private: true }, null, 2),
      "utf8",
    );
    await writeInstalledRecipes(projectDir, [baseRecipeEntry()]);
    const project = await resolveProject({ cwd: projectDir, rootOverride: projectDir });

    const context = await buildRecipeResolverContext({ project });
    const resolvedScenarios = await listResolvedRecipeScenarios({ project });

    expect(context).toMatchObject({
      manifest_api_version: "1",
      scenario_api_version: "1",
      runtime_api_version: "1",
      repo_types: ["generic", "node"],
    });
    expect(resolvedScenarios).toHaveLength(1);
    expect(resolvedScenarios[0]).toMatchObject({
      recipe_id: "viewer",
      scenario_id: "RECIPE_SCENARIO",
      required_inputs: [],
      outputs: [],
      permissions: [],
      artifacts: [],
      agents_involved: ["RECIPE_AGENT"],
      skills_used: ["RECIPE_SKILL"],
      tools_used: ["RECIPE_TOOL"],
      compatibility: { ok: true },
      run_profile: {
        mode: "analysis",
        writes_artifacts_to: [],
      },
    });
    expect(resolvedScenarios[0].compatibility.reasons).toEqual(
      expect.arrayContaining([
        expect.stringContaining("agentplane"),
        "manifest_api_version=1",
        "scenario_api_version=1",
        "runtime_api_version=1",
      ]),
    );
  });

  it("selects a single scenario with explicit resolver reasons", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await writeInstalledRecipes(projectDir, [
      baseRecipeEntry({
        manifest: baseRecipeManifest({
          scenarios: [
            scenarioDescriptor({
              required_inputs: ["task_id"],
              permissions: ["network"],
              run_profile: {
                mode: "analysis",
                sandbox: "read-only",
              },
            }),
          ],
        }),
      }),
    ]);
    const project = await resolveProject({ cwd: projectDir, rootOverride: projectDir });

    const selection = await resolveRecipeScenarioSelection({
      project,
      flags: {
        recipeId: "viewer",
        scenarioId: "RECIPE_SCENARIO",
        tags: ["docs"],
        mode: "analysis",
        available_inputs: ["task_id"],
      },
    });

    expect(selection.run_profile).toMatchObject({
      mode: "analysis",
      sandbox: "read-only",
    });
    expect(selection.required_inputs).toEqual(["task_id"]);
    expect(selection.permissions).toEqual(["network"]);
    expect(selection.selection_reasons).toEqual(
      expect.arrayContaining([
        "recipe compatibility satisfied",
        "matches requested recipe: viewer",
        "matches requested scenario: RECIPE_SCENARIO",
        "matches required tags: docs",
        "matches requested mode: analysis",
        "required inputs satisfied: task_id",
      ]),
    );
  });

  it("rejects ambiguous resolver selection instead of guessing", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await writeInstalledRecipes(projectDir, [
      baseRecipeEntry({
        manifest: baseRecipeManifest({
          scenarios: [
            scenarioDescriptor({
              id: "alpha",
              name: "Alpha Scenario",
              file: "scenarios/alpha.json",
            }),
            scenarioDescriptor({
              id: "beta",
              name: "Beta Scenario",
              file: "scenarios/beta.json",
            }),
          ],
        }),
      }),
    ]);
    const project = await resolveProject({ cwd: projectDir, rootOverride: projectDir });

    await expect(
      resolveRecipeScenarioSelection({
        project,
        flags: { recipeId: "viewer" },
      }),
    ).rejects.toThrow("Scenario selection is ambiguous: viewer:alpha, viewer:beta");
  });
});
