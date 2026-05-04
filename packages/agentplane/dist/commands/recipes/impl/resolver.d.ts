import type { ResolvedProject } from "@agentplaneorg/core/project";
import { type RecipeCompatibility, type RecipeResolverCompatibility, type RecipeResolverContext, type RecipeScenarioDescriptor, type ResolveRecipeScenarioSelectionFlags, type ResolvedRecipeRunProfile, type ResolvedRecipeScenario, type ResolvedRecipeScenarioSelection } from "@agentplaneorg/recipes";
export declare function buildRecipeResolverContext(opts: {
    project: ResolvedProject;
}): Promise<RecipeResolverContext>;
export declare function resolveRecipeCompatibility(opts: {
    compatibility?: RecipeCompatibility;
    context: RecipeResolverContext;
}): RecipeResolverCompatibility;
export declare function normalizeResolvedRecipeRunProfile(scenario: RecipeScenarioDescriptor): ResolvedRecipeRunProfile;
export declare function listResolvedRecipeScenarios(opts: {
    project: ResolvedProject;
    recipeId?: string;
    includeIncompatible?: boolean;
}): Promise<ResolvedRecipeScenario[]>;
export declare function resolveRecipeScenarioSelection(opts: {
    project: ResolvedProject;
    flags: ResolveRecipeScenarioSelectionFlags;
}): Promise<ResolvedRecipeScenarioSelection>;
//# sourceMappingURL=resolver.d.ts.map