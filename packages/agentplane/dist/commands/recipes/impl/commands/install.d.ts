import { type RecipeConflictMode, type RecipeInstallSource } from "@agentplaneorg/recipes";
export declare function cmdRecipeInstall(opts: {
    cwd: string;
    rootOverride?: string;
    source: RecipeInstallSource;
    index?: string;
    refresh: boolean;
    onConflict: RecipeConflictMode;
    yes: boolean;
}): Promise<number>;
//# sourceMappingURL=install.d.ts.map