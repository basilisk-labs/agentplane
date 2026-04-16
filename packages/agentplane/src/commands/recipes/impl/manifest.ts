import {
  readRecipeManifest as readRecipeManifestBase,
  validateRecipeManifest as validateRecipeManifestBase,
  type RecipeManifest,
} from "@agentplaneorg/recipes";

function normalizeManifestKind(manifest: RecipeManifest): RecipeManifest {
  const legacyManifest = manifest as Record<string, unknown> & {
    schema_version?: "1" | "2";
    kind?: string;
  };
  if (legacyManifest.kind === "scenario_pack" || legacyManifest.kind === "project_overlay") {
    return manifest;
  }
  if (legacyManifest.schema_version === "1") {
    return { ...legacyManifest, kind: "scenario_pack" } as RecipeManifest;
  }
  return { ...legacyManifest, kind: "project_overlay" } as RecipeManifest;
}

export async function readRecipeManifest(manifestPath: string): Promise<RecipeManifest> {
  return normalizeManifestKind(await readRecipeManifestBase(manifestPath));
}

export function validateRecipeManifest(raw: unknown): RecipeManifest {
  return normalizeManifestKind(validateRecipeManifestBase(raw));
}
