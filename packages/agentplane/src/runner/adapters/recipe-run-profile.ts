import type { RunnerRecipeContext } from "../types.js";

export type RecipeRunProfileMetadata = {
  mode?: string;
  sandbox?: string;
  requires_human_approval?: boolean;
  writes_artifacts_to?: string[];
  expected_exit_contract?: string;
  permissions?: string[];
  agents_involved?: string[];
  skills_used?: string[];
  tools_used?: string[];
  required_inputs?: string[];
  outputs?: string[];
  artifacts?: string[];
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

function setBooleanEnv(env: Record<string, string>, key: string, value: boolean | undefined): void {
  if (typeof value === "boolean") env[key] = String(value);
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
    mode: normalizeOptionalString(candidate.mode),
    sandbox: normalizeOptionalString(candidate.sandbox),
    requires_human_approval:
      typeof candidate.requires_human_approval === "boolean"
        ? candidate.requires_human_approval
        : undefined,
    writes_artifacts_to: normalizeStringList(candidate.writes_artifacts_to),
    expected_exit_contract: normalizeOptionalString(candidate.expected_exit_contract),
    permissions: normalizeStringList(candidate.permissions),
    agents_involved: normalizeStringList(candidate.agents_involved),
    skills_used: normalizeStringList(candidate.skills_used),
    tools_used: normalizeStringList(candidate.tools_used),
    required_inputs: normalizeStringList(candidate.required_inputs),
    outputs: normalizeStringList(candidate.outputs),
    artifacts: normalizeStringList(candidate.artifacts),
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

  setStringEnv(env, "AGENTPLANE_RECIPE_MODE", profile.mode);
  setStringEnv(env, "AGENTPLANE_RECIPE_SANDBOX", profile.sandbox);
  setBooleanEnv(env, "AGENTPLANE_RECIPE_REQUIRES_HUMAN_APPROVAL", profile.requires_human_approval);
  setStringEnv(env, "AGENTPLANE_RECIPE_EXPECTED_EXIT_CONTRACT", profile.expected_exit_contract);
  setJsonEnv(env, "AGENTPLANE_RECIPE_WRITES_ARTIFACTS_TO", profile.writes_artifacts_to);
  setJsonEnv(env, "AGENTPLANE_RECIPE_PERMISSIONS", profile.permissions);
  setJsonEnv(env, "AGENTPLANE_RECIPE_AGENTS_INVOLVED", profile.agents_involved);
  setJsonEnv(env, "AGENTPLANE_RECIPE_SKILLS_USED", profile.skills_used);
  setJsonEnv(env, "AGENTPLANE_RECIPE_TOOLS_USED", profile.tools_used);
  setJsonEnv(env, "AGENTPLANE_RECIPE_REQUIRED_INPUTS", profile.required_inputs);
  setJsonEnv(env, "AGENTPLANE_RECIPE_OUTPUTS", profile.outputs);
  setJsonEnv(env, "AGENTPLANE_RECIPE_ARTIFACTS", profile.artifacts);
  setJsonEnv(env, "AGENTPLANE_RECIPE_RUN_PROFILE", profile as Record<string, unknown>);
  return env;
}
