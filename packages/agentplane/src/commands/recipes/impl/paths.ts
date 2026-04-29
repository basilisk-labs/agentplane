import os from "node:os";
import path from "node:path";

import {
  AGENTPLANE_HOME_ENV,
  GLOBAL_RECIPES_DIR_NAME,
  INSTALLED_RECIPES_NAME,
  PROJECT_RECIPES_PACKAGES_DIR_NAME,
  PROJECT_RECIPES_REGISTRY_NAME,
  PROJECT_RECIPES_CACHE_DIR_NAME,
  RECIPES_DIR_NAME,
  RECIPES_REMOTE_INDEX_NAME,
  RECIPES_REMOTE_INDEX_SIG_NAME,
} from "./constants.js";

export function resolveAgentplaneHome(): string {
  const overridden = process.env[AGENTPLANE_HOME_ENV]?.trim();
  if (overridden) return overridden;
  return path.join(os.homedir(), ".agentplane");
}

export function resolveGlobalRecipesDir(): string {
  return path.join(resolveAgentplaneHome(), GLOBAL_RECIPES_DIR_NAME);
}

export function resolveInstalledRecipesPath(): string {
  return path.join(resolveAgentplaneHome(), INSTALLED_RECIPES_NAME);
}

export function resolveRecipesIndexCachePath(): string {
  return path.join(resolveAgentplaneHome(), RECIPES_REMOTE_INDEX_NAME);
}

export function resolveRecipesIndexCacheSigPath(): string {
  return path.join(resolveAgentplaneHome(), RECIPES_REMOTE_INDEX_SIG_NAME);
}

export function resolveInstalledRecipeDir(entry: { id: string; version: string }): string {
  return path.join(resolveGlobalRecipesDir(), entry.id, entry.version);
}

export function resolveProjectRecipesDir(resolved: { agentplaneDir: string }): string {
  return path.join(resolved.agentplaneDir, RECIPES_DIR_NAME);
}

export function resolveProjectRecipesPackagesDir(resolved: { agentplaneDir: string }): string {
  return path.join(resolveProjectRecipesDir(resolved), PROJECT_RECIPES_PACKAGES_DIR_NAME);
}

export function resolveProjectRecipesRegistryPath(resolved: { agentplaneDir: string }): string {
  return path.join(resolveProjectRecipesDir(resolved), PROJECT_RECIPES_REGISTRY_NAME);
}

export function resolveProjectVendoredRecipeDir(
  resolved: { agentplaneDir: string },
  recipeId: string,
): string {
  return path.join(resolveProjectRecipesPackagesDir(resolved), recipeId);
}

export function resolveProjectInstalledRecipeDir(
  resolved: { agentplaneDir: string },
  recipeId: string,
): string {
  return resolveProjectVendoredRecipeDir(resolved, recipeId);
}

export function resolveProjectRecipesCacheDir(resolved: { agentplaneDir: string }): string {
  return path.join(resolved.agentplaneDir, PROJECT_RECIPES_CACHE_DIR_NAME);
}

export function resolveProjectGeneratedDir(resolved: { agentplaneDir: string }): string {
  return path.join(resolved.agentplaneDir, "generated");
}

export function resolveProjectOverlayBundlePath(resolved: { agentplaneDir: string }): string {
  return path.join(resolveProjectGeneratedDir(resolved), "overlay-bundle.json");
}

export function resolveProjectRecipeAssetsPath(resolved: { agentplaneDir: string }): string {
  return path.join(resolveProjectGeneratedDir(resolved), "recipe-assets.json");
}

export function resolveProjectPromptGraphPath(resolved: { agentplaneDir: string }): string {
  return path.join(resolveProjectGeneratedDir(resolved), "prompt-graph.json");
}
