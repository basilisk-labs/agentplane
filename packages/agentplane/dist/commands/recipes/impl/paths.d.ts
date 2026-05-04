export declare function resolveAgentplaneHome(): string;
export declare function resolveGlobalRecipesDir(): string;
export declare function resolveInstalledRecipesPath(): string;
export declare function resolveRecipesIndexCachePath(): string;
export declare function resolveRecipesIndexCacheSigPath(): string;
export declare function resolveInstalledRecipeDir(entry: {
    id: string;
    version: string;
}): string;
export declare function resolveProjectRecipesDir(resolved: {
    agentplaneDir: string;
}): string;
export declare function resolveProjectRecipesPackagesDir(resolved: {
    agentplaneDir: string;
}): string;
export declare function resolveProjectRecipesRegistryPath(resolved: {
    agentplaneDir: string;
}): string;
export declare function resolveProjectVendoredRecipeDir(resolved: {
    agentplaneDir: string;
}, recipeId: string): string;
export declare function resolveProjectInstalledRecipeDir(resolved: {
    agentplaneDir: string;
}, recipeId: string): string;
export declare function resolveProjectRecipesCacheDir(resolved: {
    agentplaneDir: string;
}): string;
export declare function resolveProjectGeneratedDir(resolved: {
    agentplaneDir: string;
}): string;
export declare function resolveProjectOverlayBundlePath(resolved: {
    agentplaneDir: string;
}): string;
export declare function resolveProjectRecipeAssetsPath(resolved: {
    agentplaneDir: string;
}): string;
export declare function resolveProjectPromptGraphPath(resolved: {
    agentplaneDir: string;
}): string;
//# sourceMappingURL=paths.d.ts.map