export type {
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
  ProjectRecipeMaterialization,
  ProjectRecipeRegistryEntry,
  ProjectRecipesRegistryFile,
  ProjectRecipesLockEntry,
  ProjectRecipesLockFile,
  RecipeAgentDefinition,
  RecipeCompatibility,
  RecipeConflictMode,
  RecipeInstallMetadata,
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
  ScenarioPackManifest,
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
