import { type ProjectInstalledRecipesFile, type ProjectRecipesRegistryFile } from "@agentplaneorg/recipes";
export declare function readProjectInstalledRecipesFromRegistry(opts: {
    agentplaneDir: string;
}, registry: ProjectRecipesRegistryFile): Promise<ProjectInstalledRecipesFile>;
export declare function readProjectInstalledRecipes(opts: {
    agentplaneDir: string;
}): Promise<ProjectInstalledRecipesFile>;
//# sourceMappingURL=project-installed-recipes.d.ts.map