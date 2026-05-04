import type { CompiledOverlayBundle, CompiledRecipeAssetRegistry } from "@agentplaneorg/recipes";
import type { PromptModuleCompiledGraph } from "../../../runtime/prompt-modules/index.js";
export { publishProjectRecipesState, refreshProjectOverlayArtifacts, readProjectOverlayBundle, readProjectPromptGraph, readProjectRecipeAssetRegistry, } from "./overlay-publish.js";
import type { ProjectRecipesRegistryFile } from "./types.js";
export declare function readActiveRecipeIds(project: {
    agentplaneDir: string;
}): Promise<string[]>;
export declare function setRecipeActive(opts: {
    project: {
        agentplaneDir: string;
    };
    recipeId: string;
    active: boolean;
}): Promise<string[]>;
export declare function compileProjectOverlayArtifactsFromRegistry(project: {
    agentplaneDir: string;
}, registry: ProjectRecipesRegistryFile): Promise<{
    bundle: CompiledOverlayBundle;
    assets: CompiledRecipeAssetRegistry;
    promptGraph: PromptModuleCompiledGraph;
}>;
export declare function compileProjectOverlayArtifacts(project: {
    agentplaneDir: string;
}): Promise<{
    bundle: CompiledOverlayBundle;
    assets: CompiledRecipeAssetRegistry;
    promptGraph: PromptModuleCompiledGraph;
}>;
//# sourceMappingURL=overlay-project.d.ts.map