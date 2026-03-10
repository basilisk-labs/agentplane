export type RecipeCompatibility = {
  min_agentplane_version?: string;
  manifest_api_version?: string;
  scenario_api_version?: string;
  runtime_api_version?: string;
  platforms?: string[];
  repo_types?: string[];
};

export type RecipeRunProfile = {
  mode: string;
  sandbox?: string;
  network?: boolean;
  requires_human_approval?: boolean;
  writes_artifacts_to?: string[];
  expected_exit_contract?: string;
};

export type RecipeSkillDefinition = {
  id: string;
  summary: string;
  kind: string;
  file: string;
};

export type RecipeToolDefinition = {
  id: string;
  summary: string;
  runtime: "node" | "bash";
  entrypoint: string;
  permissions?: string[];
  timeout_ms?: number;
  cwd_policy?: string;
};

export type RecipeAgentDefinition = {
  id: string;
  display_name: string;
  role: string;
  summary: string;
  skills?: string[];
  tools?: string[];
  file: string;
};

export type RecipeScenarioDescriptor = {
  id: string;
  name: string;
  summary: string;
  description?: string;
  use_when: string[];
  avoid_when?: string[];
  required_inputs: string[];
  outputs: string[];
  permissions: string[];
  artifacts: string[];
  agents_involved: string[];
  skills_used: string[];
  tools_used: string[];
  run_profile: RecipeRunProfile;
  file: string;
};

export type RecipeManifest = {
  schema_version: "1";
  id: string;
  version: string;
  name: string;
  summary: string;
  description: string;
  tags?: string[];
  compatibility?: RecipeCompatibility;
  skills?: RecipeSkillDefinition[];
  agents?: RecipeAgentDefinition[];
  tools?: RecipeToolDefinition[];
  scenarios: RecipeScenarioDescriptor[];
};

export type RecipeConflictMode = "fail" | "rename" | "overwrite";

export type InstalledRecipeEntry = {
  id: string;
  version: string;
  source: string;
  installed_at: string;
  tags: string[];
  manifest: RecipeManifest;
};

export type InstalledRecipesFile = {
  schema_version: 1;
  updated_at: string;
  recipes: InstalledRecipeEntry[];
};

export type ScenarioDefinition = {
  schema_version: "1";
  id: string;
  summary?: string;
  description?: string;
  goal: string;
  inputs: unknown;
  outputs: unknown;
  evidence?: {
    required: boolean;
    files: string[];
  };
  steps: unknown[];
};

export type RecipeScenarioDetail = {
  id: string;
  name?: string;
  summary?: string;
  description?: string;
  use_when?: string[];
  avoid_when?: string[];
  required_inputs?: string[];
  permissions?: string[];
  artifacts?: string[];
  agents_involved?: string[];
  skills_used?: string[];
  tools_used?: string[];
  run_profile?: RecipeRunProfile;
  goal?: string;
  inputs?: unknown;
  outputs?: unknown;
  file?: string;
  steps?: unknown[];
  source: "definition" | "index" | "manifest";
};

export type RecipesIndex = {
  schema_version: 1;
  recipes: {
    id: string;
    summary: string;
    description?: string;
    versions: {
      version: string;
      url: string;
      sha256: string;
      min_agentplane_version?: string;
      tags?: string[];
    }[];
  }[];
};

export type RecipesIndexSignature = {
  schema_version: 1;
  key_id: string;
  signature: string;
  algorithm?: string;
};

export type RecipeInstallSource =
  | { type: "name"; value: string }
  | { type: "path"; value: string }
  | { type: "url"; value: string }
  | { type: "auto"; value: string };

export type RecipeCachePruneFlags = {
  dryRun: boolean;
  all: boolean;
};

export type RecipeListFlags = {
  full: boolean;
  tag?: string;
};

export type RecipeListRemoteFlags = {
  refresh: boolean;
  index?: string;
  yes: boolean;
};
