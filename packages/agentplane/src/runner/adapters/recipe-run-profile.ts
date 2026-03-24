import type { RunnerRecipeContext } from "../types.js";
import { normalizeRecipeArtifactPrefixes } from "../result-manifest-policy.js";

export type RecipeRunProfileMetadata = {
  sandbox?: string;
  writes_artifacts_to?: string[];
};

function normalizeOptionalString(value: unknown): string | undefined {
  const normalized = typeof value === "string" ? value.trim() : "";
  return normalized.length > 0 ? normalized : undefined;
}

function normalizeStringList(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  return value
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
}

function setStringEnv(env: Record<string, string>, key: string, value: string | undefined): void {
  if (value) env[key] = value;
}

function setJsonEnv(
  env: Record<string, string>,
  key: string,
  value: Record<string, unknown> | string[] | undefined,
): void {
  if (value === undefined) return;
  env[key] = JSON.stringify(value);
}

export function readRecipeRunProfile(
  recipe: RunnerRecipeContext | undefined,
): RecipeRunProfileMetadata | null {
  const profile = recipe?.run_profile;
  if (!profile || typeof profile !== "object") return null;
  const candidate = profile;
  return {
    sandbox: normalizeOptionalString(candidate.sandbox),
    writes_artifacts_to: normalizeStringList(candidate.writes_artifacts_to),
  };
}

export function buildRecipeRunnerEnv(
  recipe: RunnerRecipeContext | undefined,
): Record<string, string> {
  const env: Record<string, string> = {};
  const recipeId = normalizeOptionalString(recipe?.recipe_id);
  const scenarioId = normalizeOptionalString(recipe?.scenario_id);
  if (recipeId) env.AGENTPLANE_RECIPE_ID = recipeId;
  if (scenarioId) env.AGENTPLANE_SCENARIO_ID = scenarioId;

  const profile = readRecipeRunProfile(recipe);
  if (!profile) return env;

  setStringEnv(env, "AGENTPLANE_RECIPE_SANDBOX", profile.sandbox);
  const normalizedArtifactPrefixes = normalizeRecipeArtifactPrefixes(profile.writes_artifacts_to);
  const normalizedProfile = {
    ...profile,
    writes_artifacts_to: normalizedArtifactPrefixes,
  };
  setJsonEnv(env, "AGENTPLANE_RECIPE_WRITES_ARTIFACTS_TO", normalizedArtifactPrefixes);
  setJsonEnv(env, "AGENTPLANE_RECIPE_RUN_PROFILE", normalizedProfile as Record<string, unknown>);
  return env;
}
