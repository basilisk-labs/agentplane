import type { ProjectInstalledRecipeEntry, ProjectRecipeState } from "@agentplaneorg/recipes";
export declare function hashRecipeTree(rootDir: string): Promise<string>;
export type ProjectRecipeInspection = {
    entry: ProjectInstalledRecipeEntry;
    recipe_dir: string;
    source_dir: string;
    cache_present: boolean;
    current_source_sha256?: string;
    current_vendored_sha256: string;
    state: ProjectRecipeState;
};
export declare function inspectProjectRecipe(opts: {
    project: {
        agentplaneDir: string;
    };
    recipeId: string;
}): Promise<ProjectRecipeInspection>;
//# sourceMappingURL=project-recipe-state.d.ts.map