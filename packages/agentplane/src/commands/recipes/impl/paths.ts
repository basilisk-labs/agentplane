import os from "node:os";
import path from "node:path";

import {
  AGENTPLANE_HOME_ENV,
  GLOBAL_RECIPES_DIR_NAME,
  INSTALLED_RECIPES_NAME,
  RECIPE_INSTALL_META_NAME,
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

export function resolveProjectInstalledRecipeDir(
  resolved: { agentplaneDir: string },
  recipeId: string,
): string {
  return path.join(resolveProjectRecipesDir(resolved), recipeId);
}

export function resolveProjectRecipeInstallMetaPath(
  resolved: { agentplaneDir: string },
  recipeId: string,
): string {
  return path.join(resolveProjectInstalledRecipeDir(resolved, recipeId), RECIPE_INSTALL_META_NAME);
}

export function resolveProjectRecipesCacheDir(resolved: { agentplaneDir: string }): string {
  return path.join(resolved.agentplaneDir, PROJECT_RECIPES_CACHE_DIR_NAME);
}
