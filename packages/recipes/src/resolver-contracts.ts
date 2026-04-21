import type { RecipeTaskTemplate } from "./manifest-contracts.js";

export type RecipeResolverContext = {
  agentplane_version: string;
  manifest_api_version: "1" | "2";
  scenario_api_version: "1";
  runtime_api_version: "1";
  platform: string;
  repo_types: string[];
};

export type RecipeResolverCompatibilityFailure = {
  field:
    | "min_agentplane_version"
    | "manifest_api_version"
    | "scenario_api_version"
    | "runtime_api_version"
    | "platforms"
    | "repo_types";
  expected: string | string[];
  actual: string | string[] | null;
  reason: string;
};

export type RecipeResolverCompatibility = {
  ok: boolean;
  reasons: string[];
  failures: RecipeResolverCompatibilityFailure[];
};

export type ResolvedRecipeRunProfile = {
  mode: string;
  sandbox?: string;
  writes_artifacts_to: string[];
};

export type ResolvedRecipeScenario = {
  recipe_id: string;
  recipe_version: string;
  recipe_name: string;
  recipe_summary: string;
  recipe_tags: string[];
  recipe_dir: string;
  scenario_id: string;
  scenario_name: string;
  scenario_summary: string;
  scenario_description?: string;
  use_when: string[];
  avoid_when: string[];
  required_inputs: string[];
  outputs: string[];
  permissions: string[];
  artifacts: string[];
  agents_involved: string[];
  skills_used: string[];
  tools_used: string[];
  scenario_file: string;
  compatibility: RecipeResolverCompatibility;
  run_profile: ResolvedRecipeRunProfile;
  task_template?: RecipeTaskTemplate;
};

export type ResolveRecipeScenarioSelectionFlags = {
  recipeId?: string;
  scenarioId?: string;
  tags?: string[];
  mode?: string;
  available_inputs?: string[];
  includeIncompatible?: boolean;
};

export type ResolvedRecipeScenarioSelection = ResolvedRecipeScenario & {
  selection_reasons: string[];
};
