import type { RunnerRecipeContext } from "../types.js";
export type RecipeRunProfileMetadata = {
    sandbox?: string;
    writes_artifacts_to?: string[];
};
export declare function readRecipeRunProfile(recipe: RunnerRecipeContext | undefined): RecipeRunProfileMetadata | null;
export declare function buildRecipeRunnerEnv(recipe: RunnerRecipeContext | undefined): Record<string, string>;
//# sourceMappingURL=recipe-run-profile.d.ts.map