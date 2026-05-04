import { type CompiledRecipeAssetRegistry, type CompiledOverlayBundle } from "@agentplaneorg/recipes";
import { type PromptModuleCompiledGraph } from "../../../runtime/prompt-modules/index.js";
import type { ProjectRecipesRegistryFile } from "./types.js";
export declare function readActiveRecipeIdsFromRegistry(registry: ProjectRecipesRegistryFile): string[];
export declare function compileProjectOverlayArtifactsFromRegistry(project: {
    agentplaneDir: string;
}, registry: ProjectRecipesRegistryFile): Promise<{
    bundle: CompiledOverlayBundle;
    assets: CompiledRecipeAssetRegistry;
    promptGraph: PromptModuleCompiledGraph;
}>;
//# sourceMappingURL=overlay-compile.d.ts.map