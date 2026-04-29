import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { cmdRecipeAddParsed } from "./recipes/impl/commands/add.js";
import { cmdRecipeDisableParsed } from "./recipes/impl/commands/disable.js";
import { cmdRecipeEnableParsed } from "./recipes/impl/commands/enable.js";
import { cmdRecipeRemoveParsed } from "./recipes/impl/commands/remove.js";
import { cmdRecipeUpdateParsed } from "./recipes/impl/commands/update.js";
import {
  readProjectPromptGraph,
  refreshProjectOverlayArtifacts,
} from "./recipes/impl/overlay-project.js";
import { createRecipeArchiveWithManifest, pathExists } from "@agentplane/testkit";
import {
  baseRecipeManifest,
  installRecipe,
  installRecipesCommandHarness,
  mkGitRepoRoot,
  requireRecipesTempHome,
  resolveProjectRecipeDir,
  resolveProjectRecipesRegistryPath,
  writeDefaultConfig,
} from "@agentplane/testkit/recipes";

installRecipesCommandHarness();

function cachedManifestPath(recipeId: string, version: string): string {
  return path.join(requireRecipesTempHome(), "recipes-store", recipeId, version, "manifest.json");
}

function overlayBundlePath(root: string): string {
  return path.join(root, ".agentplane", "generated", "overlay-bundle.json");
}

async function readRegistry(root: string): Promise<{ recipes: Record<string, unknown>[] }> {
  if (!(await pathExists(resolveProjectRecipesRegistryPath(root)))) {
    return { recipes: [] };
  }
  return JSON.parse(await readFile(resolveProjectRecipesRegistryPath(root), "utf8")) as {
    recipes: Record<string, unknown>[];
  };
}

async function writeRegistry(
  root: string,
  update: (recipes: Record<string, unknown>[]) => Record<string, unknown>[],
): Promise<void> {
  const current = JSON.parse(await readFile(resolveProjectRecipesRegistryPath(root), "utf8")) as {
    schema_version: number;
    updated_at: string;
    recipes: Record<string, unknown>[];
  };
  await writeFile(
    resolveProjectRecipesRegistryPath(root),
    JSON.stringify(
      {
        schema_version: 1,
        updated_at: current.updated_at,
        recipes: update(current.recipes),
      },
      null,
      2,
    ),
    "utf8",
  );
}

async function createOverlayArchive(opts: {
  id: string;
  version: string;
  requires?: string[];
}): Promise<string> {
  return await createRecipeArchiveWithManifest({
    manifest: baseRecipeManifest({
      id: opts.id,
      version: opts.version,
      name: opts.id,
      summary: `${opts.id} summary`,
      description: `${opts.id} description`,
      requires: opts.requires,
    }),
    files: {
      "agents/recipe.md": "# Agent\n\nExecute the recipe.\n",
      "skills/recipe.md": "# Skill\n\nUse the recipe skill.\n",
      "tools/run.mjs": "console.log('ok');\n",
      "scenarios/recipe.json": JSON.stringify(
        {
          schema_version: "1",
          id: "RECIPE_SCENARIO",
          summary: "Scenario summary",
          goal: "Scenario goal",
          task_template: {
            title: "Scenario task",
            description: "Scenario description",
            owner: "CODER",
          },
          inputs: [],
          outputs: [],
          steps: [],
        },
        null,
        2,
      ),
    },
  });
}

describe("recipes transactional mutations", () => {
  it("recipes add removes a vendored copy when candidate publish fails", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const archivePath = await createOverlayArchive({ id: "broken-add", version: "1.0.0" });
    await installRecipe({ projectDir: root, archivePath, vendor: false });

    const cachedManifest = JSON.parse(
      await readFile(cachedManifestPath("broken-add", "1.0.0"), "utf8"),
    ) as Record<string, unknown>;
    cachedManifest.agents = [
      {
        id: "BROKEN_AGENT",
        display_name: "Broken Agent",
        role: "executor",
        summary: "Broken agent",
        skills: ["RECIPE_SKILL"],
        tools: ["RECIPE_TOOL"],
        file: "agents/missing.md",
      },
    ];
    await writeFile(
      cachedManifestPath("broken-add", "1.0.0"),
      JSON.stringify(cachedManifest, null, 2),
      "utf8",
    );

    await expect(
      cmdRecipeAddParsed({ cwd: root, recipeRef: "broken-add@1.0.0" }),
    ).rejects.toBeTruthy();

    expect(await pathExists(resolveProjectRecipeDir(root, "broken-add"))).toBe(false);
    const registry = await readRegistry(root);
    expect(registry.recipes).toEqual([]);
  });

  it("recipes update restores the previous vendored tree when candidate publish fails", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const archivePath = await createOverlayArchive({ id: "broken-update", version: "1.0.0" });
    await installRecipe({ projectDir: root, archivePath, vendor: true });

    const registryBefore = await readRegistry(root);
    const vendoredManifestPath = path.join(
      resolveProjectRecipeDir(root, "broken-update"),
      "manifest.json",
    );
    const vendoredManifestBefore = JSON.parse(
      await readFile(vendoredManifestPath, "utf8"),
    ) as Record<string, unknown>;

    const cachedManifest = JSON.parse(
      await readFile(cachedManifestPath("broken-update", "1.0.0"), "utf8"),
    ) as Record<string, unknown>;
    cachedManifest.summary = "Broken from cache";
    cachedManifest.skills = [
      {
        id: "BROKEN_SKILL",
        summary: "Broken skill",
        file: "skills/missing.md",
      },
    ];
    await writeFile(
      cachedManifestPath("broken-update", "1.0.0"),
      JSON.stringify(cachedManifest, null, 2),
      "utf8",
    );

    await expect(
      cmdRecipeUpdateParsed({ cwd: root, id: "broken-update", force: true }),
    ).rejects.toBeTruthy();

    expect(JSON.parse(await readFile(vendoredManifestPath, "utf8"))).toMatchObject(
      vendoredManifestBefore,
    );
    const registryAfter = await readRegistry(root);
    expect(registryAfter.recipes).toEqual(registryBefore.recipes);
  });

  it("recipes enable leaves registry and bundle unchanged when overlay activation is invalid", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const archivePath = await createOverlayArchive({
      id: "dependent",
      version: "1.0.0",
      requires: ["missing-base"],
    });
    await installRecipe({ projectDir: root, archivePath, vendor: true });

    const registryBefore = await readRegistry(root);
    const bundleBefore = JSON.parse(await readFile(overlayBundlePath(root), "utf8")) as {
      active: unknown[];
    };

    await expect(cmdRecipeEnableParsed({ cwd: root, id: "dependent" })).rejects.toBeTruthy();

    const registryAfter = await readRegistry(root);
    expect(registryAfter.recipes).toEqual(registryBefore.recipes);
    const bundleAfter = JSON.parse(await readFile(overlayBundlePath(root), "utf8")) as {
      active: unknown[];
    };
    expect(bundleAfter.active).toEqual(bundleBefore.active);
  });

  it("recipes enable leaves registry and prompt graph unchanged when prompt mutations fail", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await installRecipe({
      projectDir: root,
      archivePath: await createOverlayArchive({ id: "broken-prompt-graph", version: "1.0.0" }),
      vendor: true,
    });
    const agentplaneDir = path.join(root, ".agentplane");
    const vendoredManifestPath = path.join(
      resolveProjectRecipeDir(root, "broken-prompt-graph"),
      "manifest.json",
    );
    const promptModulesDir = path.join(
      resolveProjectRecipeDir(root, "broken-prompt-graph"),
      "prompt-modules",
    );
    await mkdir(promptModulesDir, { recursive: true });
    const vendoredManifest = JSON.parse(await readFile(vendoredManifestPath, "utf8")) as Record<
      string,
      unknown
    >;
    vendoredManifest.prompt_mutation_sets = [
      {
        id: "missing-target",
        summary: "Mutations targeting a missing prompt module.",
        file: "prompt-modules/missing-target.json",
      },
    ];
    await writeFile(vendoredManifestPath, JSON.stringify(vendoredManifest, null, 2), "utf8");
    await writeFile(
      path.join(promptModulesDir, "missing-target.json"),
      JSON.stringify(
        {
          schema_version: 1,
          recipe_id: "broken-prompt-graph",
          mutations: [
            {
              id: "broken-prompt-graph.patch.missing",
              op: "patch_module",
              source: {
                owner: {
                  kind: "recipe",
                  recipe_id: "broken-prompt-graph",
                  version: "1.0.0",
                },
                provenance: {
                  source_kind: "recipe_asset",
                  source_ref: "prompt-modules/missing-target.json",
                  recipe_id: "broken-prompt-graph",
                  recipe_version: "1.0.0",
                },
              },
              target: {
                address: "recipe.broken-prompt-graph/policy/.agentplane/policy/body/missing",
              },
              patch: {
                summary: "Cannot apply because the target module is absent.",
              },
            },
          ],
        },
        null,
        2,
      ),
      "utf8",
    );

    const registryBefore = await readRegistry(root);
    const promptGraphBefore = await readProjectPromptGraph({ agentplaneDir });
    expect(promptGraphBefore?.ok).toBe(true);
    expect(
      promptGraphBefore?.nodes.some((node) => node.module.address.namespace === "framework"),
    ).toBe(true);

    await expect(cmdRecipeEnableParsed({ cwd: root, id: "broken-prompt-graph" })).rejects.toThrow(
      "Failed to compile recipe prompt graph",
    );

    const registryAfter = await readRegistry(root);
    const promptGraphAfter = await readProjectPromptGraph({ agentplaneDir });
    expect(registryAfter.recipes).toEqual(registryBefore.recipes);
    expect(promptGraphAfter).toEqual(promptGraphBefore);
  });

  it("recipes disable restores the active registry when dependent overlays would break", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await installRecipe({
      projectDir: root,
      archivePath: await createOverlayArchive({ id: "base", version: "1.0.0" }),
      vendor: true,
    });
    await installRecipe({
      projectDir: root,
      archivePath: await createOverlayArchive({
        id: "dependent",
        version: "1.0.0",
        requires: ["base"],
      }),
      vendor: true,
    });

    await writeRegistry(root, (recipes) =>
      recipes.map((entry) => ({
        ...entry,
        active: entry.id === "base" || entry.id === "dependent",
      })),
    );
    await refreshProjectOverlayArtifacts({ agentplaneDir: path.join(root, ".agentplane") });
    const registryBefore = await readRegistry(root);

    await expect(cmdRecipeDisableParsed({ cwd: root, id: "base" })).rejects.toBeTruthy();

    const registryAfter = await readRegistry(root);
    expect(registryAfter.recipes).toEqual(registryBefore.recipes);
  });

  it("recipes remove restores the vendored tree when removing it would break active overlays", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await installRecipe({
      projectDir: root,
      archivePath: await createOverlayArchive({ id: "base", version: "1.0.0" }),
      vendor: true,
    });
    await installRecipe({
      projectDir: root,
      archivePath: await createOverlayArchive({
        id: "dependent",
        version: "1.0.0",
        requires: ["base"],
      }),
      vendor: true,
    });

    await writeRegistry(root, (recipes) =>
      recipes.map((entry) => ({
        ...entry,
        active: entry.id === "base" || entry.id === "dependent",
      })),
    );
    await refreshProjectOverlayArtifacts({ agentplaneDir: path.join(root, ".agentplane") });

    await expect(cmdRecipeRemoveParsed({ cwd: root, id: "base" })).rejects.toBeTruthy();

    expect(await pathExists(resolveProjectRecipeDir(root, "base"))).toBe(true);
    const registryAfter = await readRegistry(root);
    expect(registryAfter.recipes).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: "base", active: true })]),
    );
  });
});
