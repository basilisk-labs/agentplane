import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { validateRecipeManifest } from "@agentplaneorg/recipes";
import { describe, expect, it } from "vitest";

import { collectRecipePromptBlocks } from "./recipe-prompt-blocks.js";

async function withRecipeDir<T>(run: (recipeDir: string) => Promise<T>): Promise<T> {
  const recipeDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipe-v1-context-"));
  try {
    return await run(recipeDir);
  } finally {
    await rm(recipeDir, { recursive: true, force: true });
  }
}

describe("Recipe V1 prompt conversion", () => {
  it("projects advisory surfaces separately from required evidence", async () => {
    await withRecipeDir(async (recipeDir) => {
      const manifest = validateRecipeManifest({
        schema_version: "2",
        kind: "project_overlay",
        id: "research",
        version: "1.0.0",
        name: "Research",
        summary: "Research guidance",
        blueprint_extensions: [
          {
            id: "research.context",
            kind: "context_hint",
            summary: "Use supplied research context",
            value: { sources: ["research.md"] },
          },
          {
            id: "research.sources",
            kind: "evidence_requirement",
            summary: "Require source evidence",
            evidence: ["sources"],
          },
          {
            id: "research.route",
            kind: "preferred_blueprint",
            summary: "Prefer analysis",
            blueprint_id: "analysis.light",
          },
        ],
      });

      const blocks = await collectRecipePromptBlocks({
        git_root: recipeDir,
        recipe: {
          recipe_id: manifest.id,
          recipe_name: manifest.name,
          recipe_version: manifest.version,
          scenario_id: "research",
          recipe_dir: recipeDir,
          manifest: manifest as unknown as Record<string, unknown>,
          scenario: {},
        },
      });

      expect(blocks).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: "recipe.v1.native_surfaces",
            role: "context",
          }),
          expect.objectContaining({
            id: "recipe.v1.required_evidence",
            role: "policy",
            surface: "verification",
            strength: "required",
          }),
        ]),
      );
      const guidance = blocks.find((block) => block.id === "recipe.v1.native_surfaces");
      expect(guidance?.content).toContain('"authority": "advisory_only"');
      expect(guidance?.content).toContain('"legacy_blueprint_id": "analysis.light"');
      const evidence = blocks.find((block) => block.id === "recipe.v1.required_evidence");
      expect(evidence?.content).toContain('"evidence_id": "sources"');
      expect(evidence?.content).toContain('"required": true');
    });
  });

  it("stops before prompt assembly and exports diagnostics for a custom graph", async () => {
    await withRecipeDir(async (recipeDir) => {
      const manifest = validateRecipeManifest({
        schema_version: "2",
        kind: "project_overlay",
        id: "custom",
        version: "1.0.0",
        name: "Custom",
        summary: "Custom graph",
        blueprint_extensions: [
          {
            id: "custom.route",
            kind: "preferred_blueprint",
            summary: "Custom route",
            blueprint_id: "company.custom_graph",
          },
        ],
      });

      await expect(
        collectRecipePromptBlocks({
          git_root: recipeDir,
          recipe: {
            recipe_id: manifest.id,
            recipe_name: manifest.name,
            recipe_version: manifest.version,
            scenario_id: "custom",
            recipe_dir: recipeDir,
            manifest: manifest as unknown as Record<string, unknown>,
            scenario: {},
          },
        }),
      ).rejects.toThrow(/RECIPE_V1_MANUAL_CONVERSION_REQUIRED[\s\S]*company\.custom_graph/u);
    });
  });
});
