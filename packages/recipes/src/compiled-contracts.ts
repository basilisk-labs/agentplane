import type {
  OverlayPromptFragment,
  OverlaySurface,
  OverlayValidator,
  RecipeAgentDefinition,
  RecipePromptModuleDefinition,
  RecipePromptMutationSetDefinition,
  RecipeScenarioDescriptor,
  RecipeSkillDefinition,
  RecipeToolDefinition,
} from "./manifest-contracts.js";

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

export type CompiledRecipeAssetKind =
  | "agent"
  | "skill"
  | "tool"
  | "scenario"
  | "template"
  | "prompt_module"
  | "prompt_mutation_set";

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

export type CompiledRecipePromptModuleAsset = CompiledRecipeAssetBase & {
  kind: "prompt_module";
  definition: RecipePromptModuleDefinition;
  content: string;
};

export type CompiledRecipePromptMutationSetAsset = CompiledRecipeAssetBase & {
  kind: "prompt_mutation_set";
  definition: RecipePromptMutationSetDefinition;
  content: string;
};

export type CompiledRecipeAssetEntry =
  | CompiledRecipeAgentAsset
  | CompiledRecipeSkillAsset
  | CompiledRecipeToolAsset
  | CompiledRecipeScenarioAsset
  | CompiledRecipeTemplateAsset
  | CompiledRecipePromptModuleAsset
  | CompiledRecipePromptMutationSetAsset;

export type CompiledRecipeAssetRegistry = {
  schema_version: 1;
  kind: "recipe_asset_registry";
  entries: CompiledRecipeAssetEntry[];
};
