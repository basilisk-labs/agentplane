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

export type RecipePromptModuleDefinition = {
  id: string;
  summary: string;
  file: string;
};

export type RecipePromptMutationSetDefinition = {
  id: string;
  summary: string;
  file: string;
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
  prompt_modules?: RecipePromptModuleDefinition[];
  prompt_mutation_sets?: RecipePromptMutationSetDefinition[];
};

export type RecipeManifest = ProjectOverlayManifestV2;
