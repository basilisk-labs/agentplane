import type { CompiledRecipeAssetEntry, InstalledRecipeEntry, ResolvedRecipeScenarioSelection } from "@agentplaneorg/recipes";
import type { AgentplaneCapabilityRegistry } from "./model.js";
type RecipeSelection = Pick<ResolvedRecipeScenarioSelection, "scenario_id" | "agents_involved" | "skills_used" | "tools_used">;
type RecipeEntry = Pick<InstalledRecipeEntry, "id" | "version" | "manifest">;
export declare function resolveRecipeCapabilityRegistry(opts: {
    entry: RecipeEntry;
    assets?: CompiledRecipeAssetEntry[];
    selection?: RecipeSelection | null;
}): AgentplaneCapabilityRegistry;
export {};
//# sourceMappingURL=recipe.d.ts.map