import { stat } from "node:fs/promises";
import path from "node:path";

import {
  normalizeRecipeTags,
  readRecipeManifest,
  type ProjectInstalledRecipeEntry,
  type ProjectInstalledRecipesFile,
} from "@agentplaneorg/recipes";

import { invalidFieldMessage, missingFileMessage } from "../../../cli/output.js";
import { readProjectRecipesRegistry } from "./project-registry.js";
import { resolveProjectRecipesDir } from "./paths.js";

function sortInstalledRecipes(
  entries: ProjectInstalledRecipeEntry[],
): ProjectInstalledRecipeEntry[] {
  return [...entries].toSorted((left, right) => left.id.localeCompare(right.id));
}

async function pathExistsAsKind(filePath: string, kind: "file" | "dir"): Promise<boolean> {
  try {
    const stats = await stat(filePath);
    return kind === "dir" ? stats.isDirectory() : stats.isFile();
  } catch {
    return false;
  }
}

export async function readProjectInstalledRecipes(opts: {
  agentplaneDir: string;
}): Promise<ProjectInstalledRecipesFile> {
  const registry = await readProjectRecipesRegistry(opts);
  if (registry.recipes.length === 0) {
    return { schema_version: 1, updated_at: "", recipes: [] };
  }

  const entries: ProjectInstalledRecipeEntry[] = [];
  for (const registryEntry of registry.recipes) {
    const recipeDir = path.join(resolveProjectRecipesDir(opts), registryEntry.path);
    if (!(await pathExistsAsKind(recipeDir, "dir"))) {
      throw new Error(missingFileMessage("vendored recipe directory", recipeDir));
    }
    const manifestPath = path.join(recipeDir, "manifest.json");
    if (!(await pathExistsAsKind(manifestPath, "file"))) {
      throw new Error(missingFileMessage("installed recipe manifest", manifestPath));
    }
    const manifest = await readRecipeManifest(manifestPath);
    if (manifest.id !== registryEntry.id || manifest.version !== registryEntry.version) {
      throw new Error(
        invalidFieldMessage(
          `installed recipe directory ${registryEntry.id}`,
          `manifest.id=${registryEntry.id} and manifest.version=${registryEntry.version}`,
        ),
      );
    }

    entries.push({
      id: manifest.id,
      version: manifest.version,
      source: registryEntry.source_ref,
      source_ref: registryEntry.source_ref,
      source_sha256: registryEntry.source_sha256,
      vendored_sha256: registryEntry.vendored_sha256,
      materialization: registryEntry.materialization,
      installed_at: registryEntry.installed_at,
      project_path: registryEntry.path,
      tags: normalizeRecipeTags(registryEntry.tags ?? manifest.tags ?? []),
      manifest,
    });
  }

  return {
    schema_version: 1,
    updated_at: registry.updated_at,
    recipes: sortInstalledRecipes(entries),
  };
}
