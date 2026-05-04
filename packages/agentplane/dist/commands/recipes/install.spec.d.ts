import type { CommandSpec } from "../../cli/spec/spec.js";
import type { RecipeConflictMode, RecipeInstallSource } from "@agentplaneorg/recipes";
export type RecipesInstallParsed = {
    source: RecipeInstallSource;
    index?: string;
    refresh: boolean;
    yes: boolean;
    onConflict: RecipeConflictMode;
};
export declare const recipesInstallSpec: CommandSpec<RecipesInstallParsed>;
//# sourceMappingURL=install.spec.d.ts.map