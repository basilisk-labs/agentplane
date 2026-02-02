import { BUNDLED_RECIPES_CATALOG } from "../bundled-recipes.js";
import { CliError } from "../errors.js";

export type BundledRecipeInfo = { id: string; summary: string; version: string };

export function listBundledRecipes(): BundledRecipeInfo[] {
  return BUNDLED_RECIPES_CATALOG.recipes.map((recipe) => ({
    id: recipe.id,
    summary: recipe.summary,
    version: recipe.versions.at(-1)?.version ?? "unknown",
  }));
}

export function renderBundledRecipesHint(): string {
  const entries = listBundledRecipes();
  if (entries.length === 0) {
    return "Available bundled recipes: none";
  }
  return `Available bundled recipes: ${entries.map((entry) => entry.id).join(", ")}`;
}

export function validateBundledRecipesSelection(recipes: string[]): void {
  if (recipes.length === 0) return;
  const available = listBundledRecipes().map((entry) => entry.id);
  if (available.length === 0) {
    process.stdout.write(`${renderBundledRecipesHint()}\n`);
    return;
  }
  const missing = recipes.filter((recipe) => !available.includes(recipe));
  if (missing.length > 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Unknown recipes: ${missing.join(", ")}. ${renderBundledRecipesHint()}`,
    });
  }
}
