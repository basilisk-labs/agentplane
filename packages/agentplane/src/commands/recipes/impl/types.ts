export type {
  CompiledRecipeAssetEntry,
  CompiledRecipeAssetRegistry,
  CompiledOverlayBundle,
  CompiledOverlayPromptFragment,
  CompiledOverlayTraceEntry,
  CompiledOverlayValidator,
  InstalledRecipeEntry,
  InstalledRecipesFile,
  OverlayPromptFragment,
  OverlayStrength,
  OverlaySurface,
  OverlayValidator,
  OverlayWhen,
  ProjectOverlayManifestV2,
  ProjectInstalledRecipeEntry,
  ProjectInstalledRecipesFile,
  ProjectRecipeMaterialization,
  ProjectRecipeRegistryEntry,
  ProjectRecipesRegistryFile,
  ProjectRecipeState,
  RecipeAgentDefinition,
  RecipeCompatibility,
  RecipeConflictMode,
  RecipeInstallSource,
  RecipeKind,
  RecipeManifest,
  RecipeResolverCompatibility,
  RecipeResolverCompatibilityFailure,
  RecipeResolverContext,
  RecipeRunProfile,
  RecipeScenarioDescriptor,
  RecipeScenarioDetail,
  RecipeSkillDefinition,
  RecipeTaskTemplate,
  RecipeTaskTemplateDoc,
  RecipeToolDefinition,
  RecipesIndex,
  RecipesIndexSignature,
  ResolveRecipeScenarioSelectionFlags,
  ResolvedRecipeRunProfile,
  ResolvedRecipeScenario,
  ResolvedRecipeScenarioSelection,
  ScenarioDefinition,
} from "@agentplaneorg/recipes";

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
