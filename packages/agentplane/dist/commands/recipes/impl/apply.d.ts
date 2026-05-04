import { type RecipeConflictMode, type RecipeManifest } from "@agentplaneorg/recipes";
export declare function moveRecipeDir(opts: {
    from: string;
    to: string;
}): Promise<void>;
export declare function validateRecipeAssets(opts: {
    manifest: RecipeManifest;
    recipeDir: string;
}): Promise<void>;
export declare function applyRecipeAgents(opts: {
    manifest: RecipeManifest;
    recipeDir: string;
    agentplaneDir: string;
    onConflict: RecipeConflictMode;
}): Promise<void>;
export declare function applyRecipeScenarios(opts: {
    manifest: RecipeManifest;
    recipeDir: string;
}): Promise<void>;
//# sourceMappingURL=apply.d.ts.map