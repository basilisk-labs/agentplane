import { type CompiledRecipeAssetRegistry, type CompiledOverlayBundle } from "@agentplaneorg/recipes";
import { type PromptModuleCompiledGraph } from "../../../runtime/prompt-modules/index.js";
import type { ProjectRecipesRegistryFile } from "./types.js";
export declare function publishProjectRecipesState(opts: {
    project: {
        agentplaneDir: string;
    };
    registry: ProjectRecipesRegistryFile;
}): Promise<{
    registry: ProjectRecipesRegistryFile;
    bundle: CompiledOverlayBundle;
    assets: CompiledRecipeAssetRegistry;
    promptGraph: PromptModuleCompiledGraph;
}>;
export declare function refreshProjectOverlayArtifacts(project: {
    agentplaneDir: string;
}): Promise<{
    bundle: CompiledOverlayBundle;
    assets: CompiledRecipeAssetRegistry;
    promptGraph: PromptModuleCompiledGraph;
}>;
export declare function readProjectOverlayBundle(project: {
    agentplaneDir: string;
}): Promise<CompiledOverlayBundle | null>;
export declare function readProjectRecipeAssetRegistry(project: {
    agentplaneDir: string;
}): Promise<CompiledRecipeAssetRegistry | null>;
export declare function readProjectPromptGraph(project: {
    agentplaneDir: string;
}): Promise<PromptModuleCompiledGraph | null>;
//# sourceMappingURL=overlay-publish.d.ts.map