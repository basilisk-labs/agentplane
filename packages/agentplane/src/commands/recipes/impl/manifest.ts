import {
  readRecipeManifest as readRecipeManifestBase,
  validateRecipeManifest as validateRecipeManifestBase,
  type RecipeManifest,
} from "@agentplaneorg/recipes";

export async function readRecipeManifest(manifestPath: string): Promise<RecipeManifest> {
  return readRecipeManifestBase(manifestPath);
}

export function validateRecipeManifest(raw: unknown): RecipeManifest {
  return validateRecipeManifestBase(raw);
}
