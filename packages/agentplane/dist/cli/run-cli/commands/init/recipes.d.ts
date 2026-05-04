type CachedRecipeInfo = {
    id: string;
    summary: string;
    version: string;
};
export declare function listCachedRecipes(): Promise<CachedRecipeInfo[]>;
export declare function validateCachedRecipesSelection(recipes: string[]): Promise<void>;
export declare function maybeAddCachedRecipes(opts: {
    recipes: string[];
    cwd: string;
    rootOverride?: string;
}): Promise<string[]>;
export {};
//# sourceMappingURL=recipes.d.ts.map