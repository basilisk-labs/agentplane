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
} from "@agentplane/recipes";

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
