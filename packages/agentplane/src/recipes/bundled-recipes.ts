import { fileURLToPath } from "node:url";

export type BundledRecipesCatalog = {
  schema_version: 1;
  recipes: {
    id: string;
    summary: string;
    description?: string;
    source_path?: string;
    versions: { version: string }[];
  }[];
};

export type BundledRecipeEntry = BundledRecipesCatalog["recipes"][number];

export const BUNDLED_RECIPES_CATALOG: BundledRecipesCatalog = {
  schema_version: 1,
  recipes: [],
};

export function resolveBundledRecipeSourcePath(recipeId: string): string | null {
  const entry = getBundledRecipeEntry(recipeId);
  const sourcePath = entry?.source_path?.trim();
  if (!sourcePath) return null;
  return fileURLToPath(new URL(`../../assets/${sourcePath.replace(/^\/+/, "")}`, import.meta.url));
}

export function getBundledRecipeEntry(recipeId: string): BundledRecipeEntry | null {
  return BUNDLED_RECIPES_CATALOG.recipes.find((recipe) => recipe.id === recipeId) ?? null;
}
