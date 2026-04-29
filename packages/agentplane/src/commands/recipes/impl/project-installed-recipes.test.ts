import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { validateRecipeAssets } from "./apply.js";
import {
  readProjectOverlayBundle,
  readProjectRecipeAssetRegistry,
  refreshProjectOverlayArtifacts,
} from "./overlay-project.js";
import { readProjectInstalledRecipes } from "./project-installed-recipes.js";

const tempDirs = new Set<string>();

function promptModule(recipeId = "modular", version = "1.0.0"): Record<string, unknown> {
  return {
    schema_version: 1,
    address: {
      value: `recipe.${recipeId}/policy/.agentplane/policy/body/modular-guidance`,
      namespace: `recipe.${recipeId}`,
      surface: "policy",
      target: ".agentplane/policy",
      slot: "body",
      name: "modular-guidance",
    },
    owner: {
      kind: "recipe",
      recipe_id: recipeId,
      version,
    },
    title: "Modular recipe guidance",
    summary: "Adds recipe-owned prompt module guidance.",
    content_kind: "markdown",
    content: "Use the recipe guidance during policy compilation.\n",
    mutability: "extendable",
    merge: {
      mode: "append",
      conflict: "keep_all",
      precedence: 400,
    },
    load: {
      recipe_ids: [recipeId],
    },
    provenance: {
      source_kind: "recipe_asset",
      source_ref: "prompt-modules/policy.json",
      recipe_id: recipeId,
      recipe_version: version,
    },
  };
}

function promptMutationSet(recipeId = "modular", version = "1.0.0"): Record<string, unknown> {
  return {
    schema_version: 1,
    recipe_id: recipeId,
    mutations: [
      {
        id: `${recipeId}.patch.gateway-load-rules`,
        op: "patch_module",
        source: {
          owner: {
            kind: "recipe",
            recipe_id: recipeId,
            version,
          },
          provenance: {
            source_kind: "recipe_asset",
            source_ref: "prompt-modules/mutations.json",
            recipe_id: recipeId,
            recipe_version: version,
          },
        },
        target: {
          address: "framework/gateway/AGENTS.md/load_rules/base",
        },
        patch: {
          load: {
            recipe_ids: [recipeId],
          },
        },
      },
    ],
  };
}

async function makeRecipeProject(opts?: {
  moduleAsset?: Record<string, unknown>;
  mutationSetAsset?: Record<string, unknown>;
}): Promise<{ agentplaneDir: string; recipeDir: string }> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-project-recipes-"));
  tempDirs.add(root);
  const agentplaneDir = path.join(root, ".agentplane");
  const recipesDir = path.join(agentplaneDir, "recipes");
  const recipeDir = path.join(recipesDir, "packages", "modular");
  await mkdir(path.join(recipeDir, "prompt-modules"), { recursive: true });

  await writeFile(
    path.join(recipeDir, "manifest.json"),
    JSON.stringify(
      {
        schema_version: "2",
        kind: "project_overlay",
        id: "modular",
        version: "1.0.0",
        name: "Modular Prompt Recipe",
        summary: "Adds modular prompt assets.",
        prompt_modules: [
          {
            id: "policy-guidance",
            summary: "Recipe policy guidance module.",
            file: "prompt-modules/policy.json",
          },
        ],
        prompt_mutation_sets: [
          {
            id: "gateway-load-rules",
            summary: "Recipe gateway load-rule mutations.",
            file: "prompt-modules/mutations.json",
          },
        ],
      },
      null,
      2,
    ),
    "utf8",
  );
  await writeFile(
    path.join(recipeDir, "prompt-modules", "policy.json"),
    JSON.stringify(opts?.moduleAsset ?? promptModule(), null, 2),
    "utf8",
  );
  await writeFile(
    path.join(recipeDir, "prompt-modules", "mutations.json"),
    JSON.stringify(opts?.mutationSetAsset ?? promptMutationSet(), null, 2),
    "utf8",
  );
  await writeFile(
    path.join(recipesDir, "registry.json"),
    JSON.stringify(
      {
        schema_version: 1,
        updated_at: "2026-04-29T00:00:00.000Z",
        recipes: [
          {
            id: "modular",
            version: "1.0.0",
            path: "packages/modular",
            active: true,
            materialization: "copy",
            source_ref: "modular@1.0.0",
            source_sha256: "a".repeat(64),
            vendored_sha256: "b".repeat(64),
            installed_at: "2026-04-29T00:00:00.000Z",
            tags: ["prompt-assembly"],
          },
        ],
      },
      null,
      2,
    ),
    "utf8",
  );
  return { agentplaneDir, recipeDir };
}

afterEach(async () => {
  const dirs = [...tempDirs];
  tempDirs.clear();
  await Promise.all(dirs.map((dir) => rm(dir, { recursive: true, force: true })));
});

describe("project installed recipe prompt assets", () => {
  it("loads prompt module declarations and publishes them as recipe assets", async () => {
    const { agentplaneDir, recipeDir } = await makeRecipeProject();
    const installed = await readProjectInstalledRecipes({ agentplaneDir });
    const manifest = installed.recipes[0].manifest;

    expect(manifest.prompt_modules).toEqual([
      {
        id: "policy-guidance",
        summary: "Recipe policy guidance module.",
        file: "prompt-modules/policy.json",
      },
    ]);
    expect(manifest.prompt_mutation_sets?.[0]?.id).toBe("gateway-load-rules");
    await expect(validateRecipeAssets({ manifest, recipeDir })).resolves.toBeUndefined();

    await refreshProjectOverlayArtifacts({ agentplaneDir });
    const assets = await readProjectRecipeAssetRegistry({ agentplaneDir });
    const bundle = await readProjectOverlayBundle({ agentplaneDir });
    const promptAssets = assets?.entries.filter(
      (entry) => entry.kind === "prompt_module" || entry.kind === "prompt_mutation_set",
    );

    expect(Object.values(bundle?.surfaces ?? {}).flat()).toEqual([]);
    expect(
      promptAssets?.map((entry) => ({
        id: entry.id,
        kind: entry.kind,
        asset_id: entry.asset_id,
        source: entry.source,
      })),
    ).toEqual([
      {
        id: "recipe:modular/prompt_module:policy-guidance",
        kind: "prompt_module",
        asset_id: "policy-guidance",
        source: "recipes/packages/modular/prompt-modules/policy.json",
      },
      {
        id: "recipe:modular/prompt_mutation_set:gateway-load-rules",
        kind: "prompt_mutation_set",
        asset_id: "gateway-load-rules",
        source: "recipes/packages/modular/prompt-modules/mutations.json",
      },
    ]);
    expect(promptAssets?.[0]).toHaveProperty(
      "content",
      expect.stringContaining('"namespace": "recipe.modular"'),
    );
    expect(promptAssets?.[1]).toHaveProperty(
      "content",
      expect.stringContaining('"op": "patch_module"'),
    );

    const rawAssets = JSON.parse(
      await readFile(path.join(agentplaneDir, "generated", "recipe-assets.json"), "utf8"),
    ) as { entries: unknown[] };
    expect(rawAssets.entries).toHaveLength(2);
  });

  it("rejects unsupported prompt mutation operations during recipe asset validation", async () => {
    const badMutationSet = promptMutationSet();
    badMutationSet.mutations = [
      {
        id: "modular.raw",
        op: "raw_patch",
        source: {
          owner: {
            kind: "recipe",
            recipe_id: "modular",
            version: "1.0.0",
          },
          provenance: {
            source_kind: "recipe_asset",
            source_ref: "prompt-modules/mutations.json",
            recipe_id: "modular",
            recipe_version: "1.0.0",
          },
        },
      },
    ];
    const { agentplaneDir, recipeDir } = await makeRecipeProject({
      mutationSetAsset: badMutationSet,
    });
    const installed = await readProjectInstalledRecipes({ agentplaneDir });

    await expect(
      validateRecipeAssets({ manifest: installed.recipes[0].manifest, recipeDir }),
    ).rejects.toThrow("recipe prompt mutation set file.mutations[0].op");
  });
});
