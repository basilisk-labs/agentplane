import type { RecipeRunProfile, RecipeTaskTemplate } from "./manifest-contracts.js";

export type ScenarioEvidence = {
  required: boolean;
  files: string[];
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
  evidence?: ScenarioEvidence;
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
  outputs?: unknown;
  permissions?: string[];
  artifacts?: string[];
  agents_involved?: string[];
  skills_used?: string[];
  tools_used?: string[];
  run_profile?: RecipeRunProfile;
  goal?: string;
  task_template?: RecipeTaskTemplate;
  inputs?: unknown;
  evidence?: ScenarioEvidence;
  file?: string;
  steps?: unknown[];
  source: "definition" | "index" | "manifest";
};
