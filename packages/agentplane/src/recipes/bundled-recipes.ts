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

export const BUNDLED_RECIPES_CATALOG: BundledRecipesCatalog = {
  schema_version: 1,
  recipes: [
    {
      id: "workflow-playbooks",
      summary: "Operational playbooks for debug, sync, and land workflows.",
      description:
        "Provides deterministic playbooks for common repository operations with mandatory evidence capture.",
      source_path: "recipes/workflow-playbooks",
      versions: [{ version: "0.1.0" }],
    },
  ],
};

export function resolveBundledRecipeSourcePath(recipeId: string): string | null {
  const entry = BUNDLED_RECIPES_CATALOG.recipes.find((recipe) => recipe.id === recipeId);
  const sourcePath = entry?.source_path?.trim();
  if (!sourcePath) return null;
  return fileURLToPath(new URL(`../../assets/${sourcePath.replace(/^\/+/, "")}`, import.meta.url));
}
