export type RecipeKind = "project_overlay";

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
  writes_artifacts_to?: string[];
};

export type RecipeTaskTemplateDoc = {
  summary?: string;
  scope?: string;
  plan?: string;
  verify_steps?: string;
  rollback_plan?: string;
  findings?: string;
};

export type RecipeTaskTemplate = {
  title: string;
  description: string;
  owner: string;
  priority?: "low" | "normal" | "med" | "high";
  tags?: string[];
  verify?: string[];
  doc?: RecipeTaskTemplateDoc;
};

export type RecipeSkillDefinition = {
  id: string;
  summary: string;
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

export type OverlaySurface =
  | "planning"
  | "execution"
  | "coding"
  | "debugging"
  | "review"
  | "verification"
  | "docs"
  | "finish";

export type OverlayStrength = "required" | "default" | "advisory";

export type OverlayWhen = {
  task_kinds?: ("feature" | "bugfix" | "refactor" | "docs" | "research")[];
  commands?: string[];
  tags_any?: string[];
  repo_types?: string[];
};

export type OverlayPromptFragment = {
  id: string;
  surface: OverlaySurface;
  strength?: OverlayStrength;
  file: string;
  order?: number;
  when?: OverlayWhen;
};

export type OverlayValidator =
  | {
      id: string;
      phase: "coding" | "verification" | "review" | "finish" | "debugging";
      kind: "required_evidence";
      required: true;
      evidence: string[];
      when?: OverlayWhen;
    }
  | {
      id: string;
      phase: "verification" | "finish" | "docs";
      kind: "required_command";
      command: string;
      required: boolean;
      when?: OverlayWhen;
    }
  | {
      id: string;
      phase: "verification" | "docs";
      kind: "check_script";
      runtime: "bash" | "node";
      entrypoint: string;
      required: boolean;
      when?: OverlayWhen;
    };

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

export type ProjectOverlayManifestV2 = {
  schema_version: "1" | "2";
  kind: "project_overlay";
  id: string;
  version: string;
  name: string;
  summary: string;
  description?: string;
  tags?: string[];
  compatibility?: RecipeCompatibility;
  requires?: string[];
  conflicts?: { recipe_id: string; reason: string }[];
  prompts?: OverlayPromptFragment[];
  validators?: OverlayValidator[];
  templates?: Record<string, string>;
  skills?: RecipeSkillDefinition[];
  agents?: RecipeAgentDefinition[];
  tools?: RecipeToolDefinition[];
  scenarios?: RecipeScenarioDescriptor[];
};

export type RecipeManifest = ProjectOverlayManifestV2;

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

export type RecipeConflictMode = "fail" | "rename" | "overwrite";

export type RecipeInstallMetadata = {
  schema_version: 1;
  id: string;
  version: string;
  source: string;
  installed_at: string;
  tags?: string[];
  install_mode?: "cache" | "project-copy" | "project-link";
};

export type InstalledRecipeEntry = {
  id: string;
  version: string;
  source: string;
  installed_at: string;
  project_path?: string;
  tags: string[];
  manifest: RecipeManifest;
};

export type InstalledRecipesFile = {
  schema_version: 1;
  updated_at: string;
  recipes: InstalledRecipeEntry[];
};

export type ProjectRecipeMaterialization = "copy" | "link";
export type ProjectRecipeState = "clean" | "modified" | "diverged_from_cache";

export type ProjectRecipeRegistryEntry = {
  id: string;
  version: string;
  path: string;
  active: boolean;
  materialization: ProjectRecipeMaterialization;
  source_ref: string;
  source_sha256: string;
  vendored_sha256: string;
  installed_at: string;
  tags?: string[];
};

export type ProjectRecipesRegistryFile = {
  schema_version: 1;
  updated_at: string;
  recipes: ProjectRecipeRegistryEntry[];
};

export type ProjectInstalledRecipeEntry = InstalledRecipeEntry & {
  project_path: string;
  materialization: ProjectRecipeMaterialization;
  source_ref: string;
  source_sha256: string;
  vendored_sha256: string;
};

export type ProjectInstalledRecipesFile = {
  schema_version: 1;
  updated_at: string;
  recipes: ProjectInstalledRecipeEntry[];
};

export type ScenarioDefinition = {
  schema_version: "1";
  id: string;
  summary?: string;
  description?: string;
  goal: string;
  task_template: RecipeTaskTemplate;
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
  task_template?: RecipeTaskTemplate;
  inputs?: unknown;
  outputs?: unknown;
  evidence?: ScenarioDefinition["evidence"];
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

export type CompiledOverlayPromptFragment = OverlayPromptFragment & {
  recipe_id: string;
  recipe_version: string;
  recipe_name: string;
  summary?: string;
  content: string;
  source: string;
};

export type CompiledOverlayValidator = OverlayValidator & {
  recipe_id: string;
  recipe_version: string;
};

export type CompiledOverlayTraceEntry = {
  recipe_id: string;
  recipe_version: string;
  accepted: boolean;
  reason: string;
  source?: string;
  surface?: OverlaySurface;
  fragment_id?: string;
  validator_id?: string;
};

export type CompiledOverlayBundle = {
  schema_version: 1;
  kind: "overlay_bundle";
  active: { id: string; version: string; name: string; summary: string }[];
  surfaces: Record<OverlaySurface, CompiledOverlayPromptFragment[]>;
  validators: CompiledOverlayValidator[];
  templates: Record<string, string>;
  agents: RecipeAgentDefinition[];
  tools: RecipeToolDefinition[];
  trace: CompiledOverlayTraceEntry[];
};

export type CompiledRecipeAssetKind = "agent" | "skill" | "tool" | "scenario" | "template";

export type CompiledRecipeAssetBase = {
  id: string;
  kind: CompiledRecipeAssetKind;
  recipe_id: string;
  recipe_version: string;
  recipe_name: string;
  asset_id: string;
  source: string;
  summary?: string;
};

export type CompiledRecipeAgentAsset = CompiledRecipeAssetBase & {
  kind: "agent";
  definition: RecipeAgentDefinition;
  content: string;
};

export type CompiledRecipeSkillAsset = CompiledRecipeAssetBase & {
  kind: "skill";
  definition: RecipeSkillDefinition;
  content: string;
};

export type CompiledRecipeToolAsset = CompiledRecipeAssetBase & {
  kind: "tool";
  definition: RecipeToolDefinition;
};

export type CompiledRecipeScenarioAsset = CompiledRecipeAssetBase & {
  kind: "scenario";
  definition: RecipeScenarioDescriptor;
};

export type CompiledRecipeTemplateAsset = CompiledRecipeAssetBase & {
  kind: "template";
  content: string;
};

export type CompiledRecipeAssetEntry =
  | CompiledRecipeAgentAsset
  | CompiledRecipeSkillAsset
  | CompiledRecipeToolAsset
  | CompiledRecipeScenarioAsset
  | CompiledRecipeTemplateAsset;

export type CompiledRecipeAssetRegistry = {
  schema_version: 1;
  kind: "recipe_asset_registry";
  entries: CompiledRecipeAssetEntry[];
};

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
