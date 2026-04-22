import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  baseRecipeEntry,
  baseRecipeManifest,
  installRecipesCommandHarness,
  requireRecipesTempHome,
  scenarioDescriptor,
} from "@agentplane/testkit/recipes";

import { listCachedRecipes } from "./run-cli/commands/init/recipes.js";

installRecipesCommandHarness();

describe("init cached recipes", () => {
  it("lists cached legacy scenario manifests that omit modern scenario metadata", async () => {
    const scenario = {
      ...scenarioDescriptor(),
      name: undefined,
      use_when: undefined,
      required_inputs: undefined,
      outputs: undefined,
      agents_involved: undefined,
      run_profile: undefined,
      file: undefined,
    };
    const manifest = baseRecipeManifest({ scenarios: [scenario] });
    await writeFile(
      path.join(requireRecipesTempHome(), "recipes.json"),
      JSON.stringify(
        {
          schema_version: 1,
          updated_at: "2026-04-22T00:00:00.000Z",
          recipes: [baseRecipeEntry({ manifest })],
        },
        null,
        2,
      ),
      "utf8",
    );

    await expect(listCachedRecipes()).resolves.toEqual([
      { id: "viewer", summary: "Preview tasks", version: "1.2.3" },
    ]);

    const migrated = JSON.parse(
      await readFile(path.join(requireRecipesTempHome(), "recipes.json"), "utf8"),
    ) as {
      recipes: [{ manifest: { scenarios: [{ file: string; use_when: string[] }] } }];
    };
    expect(migrated.recipes[0]?.manifest.scenarios[0]?.file).toBe(
      `scenarios/${scenario.id}.json`,
    );
    expect(migrated.recipes[0]?.manifest.scenarios[0]?.use_when).toEqual([scenario.summary]);
  });
});
