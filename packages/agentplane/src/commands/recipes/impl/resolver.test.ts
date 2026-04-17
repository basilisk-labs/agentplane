import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import type { ResolvedProject } from "@agentplaneorg/core";
import { describe, expect, it } from "vitest";

import { resolveRecipeScenarioSelection } from "./resolver.js";

async function createRecipeProject(opts?: {
  scenarioDefinition?: Record<string, unknown>;
}): Promise<{ project: ResolvedProject; tempDir: string }> {
  const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipe-resolver-"));
  const agentplaneDir = path.join(tempDir, ".agentplane");
  const recipesDir = path.join(agentplaneDir, "recipes");
  const recipeDir = path.join(recipesDir, "packages", "viewer");
  const scenariosDir = path.join(recipeDir, "scenarios");
  const registryPath = path.join(recipesDir, "registry.json");

  await mkdir(path.join(tempDir, ".git"), { recursive: true });
  await mkdir(scenariosDir, { recursive: true });

  await writeFile(
    path.join(recipeDir, "manifest.json"),
    JSON.stringify(
      {
        schema_version: "1",
        id: "viewer",
        version: "1.0.0",
        name: "Viewer",
        summary: "Recipe viewer",
        description: "Recipe viewer description",
        agents: [
          {
            id: "RECIPE_AGENT",
            display_name: "Recipe Agent",
            role: "executor",
            summary: "Recipe agent",
            file: "agents/recipe.md",
          },
        ],
        scenarios: [
          {
            id: "RECIPE_SCENARIO",
            name: "Recipe Scenario",
            summary: "Recipe scenario",
            use_when: ["Inspect tasks"],
            required_inputs: [],
            outputs: ["report"],
            permissions: [],
            artifacts: [],
            agents_involved: ["RECIPE_AGENT"],
            skills_used: [],
            tools_used: [],
            run_profile: {
              mode: "analysis",
            },
            file: "scenarios/recipe-scenario.json",
          },
        ],
      },
      null,
      2,
    ),
    "utf8",
  );

  await writeFile(
    path.join(scenariosDir, "recipe-scenario.json"),
    JSON.stringify(
      opts?.scenarioDefinition ?? {
        schema_version: "1",
        id: "RECIPE_SCENARIO",
        summary: "Recipe scenario",
        goal: "Inspect tasks.",
        task_template: {
          title: "Recipe scenario task",
          description: "Create a task from the scenario.",
          owner: "CODER",
          priority: "med",
          tags: ["recipes", "runner"],
          verify: [
            "bunx vitest run packages/agentplane/src/commands/recipes/impl/resolver.test.ts",
          ],
          doc: {
            summary: "Recipe-backed execution.",
            scope: "Materialize a task from recipe context.",
          },
        },
        inputs: [],
        outputs: [],
        steps: [],
      },
      null,
      2,
    ),
    "utf8",
  );

  await writeFile(
    registryPath,
    JSON.stringify(
      {
        schema_version: 1,
        updated_at: "2026-04-17T00:00:00.000Z",
        recipes: [
          {
            id: "viewer",
            version: "1.0.0",
            path: "packages/viewer",
            active: true,
            materialization: "copy",
            source_ref: "viewer@1.0.0",
            source_sha256: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            vendored_sha256: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
            installed_at: "2026-04-17T00:00:00.000Z",
            tags: [],
          },
        ],
      },
      null,
      2,
    ),
    "utf8",
  );

  return {
    tempDir,
    project: {
      gitRoot: tempDir,
      agentplaneDir,
    },
  };
}

describe("resolveRecipeScenarioSelection", () => {
  it("hydrates task_template from the scenario definition for the selected scenario", async () => {
    const { project, tempDir } = await createRecipeProject();

    try {
      const selection = await resolveRecipeScenarioSelection({
        project,
        flags: {
          recipeId: "viewer",
          scenarioId: "RECIPE_SCENARIO",
          includeIncompatible: true,
        },
      });

      expect(selection.task_template).toEqual({
        title: "Recipe scenario task",
        description: "Create a task from the scenario.",
        owner: "CODER",
        priority: "med",
        tags: ["recipes", "runner"],
        verify: ["bunx vitest run packages/agentplane/src/commands/recipes/impl/resolver.test.ts"],
        doc: {
          summary: "Recipe-backed execution.",
          scope: "Materialize a task from recipe context.",
        },
      });
      expect(selection.required_inputs).toEqual([]);
      expect(selection.outputs).toEqual(["report"]);
      expect(selection.permissions).toEqual([]);
      expect(selection.artifacts).toEqual([]);
      expect(selection.agents_involved).toEqual(["RECIPE_AGENT"]);
    } finally {
      await rm(tempDir, { recursive: true, force: true });
    }
  });

  it("surfaces a precise validation error when task_template is invalid", async () => {
    const { project, tempDir } = await createRecipeProject({
      scenarioDefinition: {
        schema_version: "1",
        id: "RECIPE_SCENARIO",
        summary: "Recipe scenario",
        goal: "Inspect tasks.",
        task_template: {
          title: "Recipe scenario task",
          description: "Create a task from the scenario.",
          owner: 123,
        },
        inputs: [],
        outputs: [],
        steps: [],
      },
    });

    try {
      await expect(
        resolveRecipeScenarioSelection({
          project,
          flags: {
            recipeId: "viewer",
            scenarioId: "RECIPE_SCENARIO",
            includeIncompatible: true,
          },
        }),
      ).rejects.toThrow("Invalid field scenario.task_template.owner");
    } finally {
      await rm(tempDir, { recursive: true, force: true });
    }
  });
});
