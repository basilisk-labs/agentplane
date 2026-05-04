import type { InitFlags, SetupProfilePreset } from "../model.js";
import type { InitSetupProfileMode, InitPromptClack, RecipeSelectionStepAnswers } from "./contracts.js";
type InitRecipeSelectionItem = {
    id: string;
    label?: string;
};
export declare function promptRecipeSelectionStep(opts: {
    clack: InitPromptClack;
    flags: Pick<InitFlags, "recipes">;
    setupProfilePreset: SetupProfilePreset;
    setupProfileMode: InitSetupProfileMode;
    cachedRecipes: readonly (InitRecipeSelectionItem | string)[];
}): Promise<RecipeSelectionStepAnswers>;
export {};
//# sourceMappingURL=recipe-selection.d.ts.map