import { type ProjectRecipeRegistryEntry, type ProjectRecipesRegistryFile } from "@agentplaneorg/recipes";
export declare function stampProjectRecipesRegistry(file: ProjectRecipesRegistryFile, updatedAt?: string): ProjectRecipesRegistryFile;
export declare function replaceProjectRecipeRegistryEntry(registry: ProjectRecipesRegistryFile, entry: ProjectRecipeRegistryEntry): ProjectRecipesRegistryFile;
export declare function removeProjectRecipeRegistryEntryFromFile(registry: ProjectRecipesRegistryFile, recipeId: string): ProjectRecipesRegistryFile;
export declare function setProjectRecipeActiveInFile(registry: ProjectRecipesRegistryFile, recipeId: string, active: boolean): ProjectRecipesRegistryFile;
export declare function readProjectRecipesRegistry(opts: {
    agentplaneDir: string;
}): Promise<ProjectRecipesRegistryFile>;
export declare function writeProjectRecipesRegistry(opts: {
    agentplaneDir: string;
}, file: ProjectRecipesRegistryFile): Promise<void>;
export declare function upsertProjectRecipeRegistryEntry(opts: {
    project: {
        agentplaneDir: string;
    };
    entry: ProjectRecipeRegistryEntry;
}): Promise<ProjectRecipesRegistryFile>;
export declare function removeProjectRecipeRegistryEntry(opts: {
    project: {
        agentplaneDir: string;
    };
    recipeId: string;
}): Promise<ProjectRecipesRegistryFile>;
//# sourceMappingURL=project-registry.d.ts.map