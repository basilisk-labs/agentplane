import type { RecipeManifest } from "@agentplaneorg/recipes";
import { type PromptModule, type PromptModuleMutationSet } from "../../../runtime/prompt-modules/index.js";
export declare function readRecipePromptModuleAsset(opts: {
    manifest: RecipeManifest;
    recipeDir: string;
    file: string;
}): Promise<PromptModule>;
export declare function readRecipePromptMutationSetAsset(opts: {
    manifest: RecipeManifest;
    recipeDir: string;
    file: string;
}): Promise<PromptModuleMutationSet>;
//# sourceMappingURL=prompt-assets.d.ts.map