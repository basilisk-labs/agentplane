import type { CompiledOverlayBundle, CompiledRecipeAssetRegistry } from "@agentplaneorg/recipes";
import type { PromptModuleCompiledGraph } from "../../../runtime/prompt-modules/index.js";
import {
  compileProjectOverlayArtifactsFromRegistry as compileProjectOverlayArtifactsFromRegistryImpl,
  readActiveRecipeIdsFromRegistry,
} from "./overlay-compile.js";
export {
  publishProjectRecipesState,
  refreshProjectOverlayArtifacts,
  readProjectOverlayBundle,
  readProjectPromptGraph,
  readProjectRecipeAssetRegistry,
} from "./overlay-publish.js";
import { readProjectRecipesRegistry } from "./project-registry.js";
import type { ProjectRecipesRegistryFile } from "./types.js";

export async function readActiveRecipeIds(project: { agentplaneDir: string }): Promise<string[]> {
  const registry = await readProjectRecipesRegistry(project);
  return readActiveRecipeIdsFromRegistry(registry);
}
export async function compileProjectOverlayArtifactsFromRegistry(
  project: { agentplaneDir: string },
  registry: ProjectRecipesRegistryFile,
): Promise<{
  bundle: CompiledOverlayBundle;
  assets: CompiledRecipeAssetRegistry;
  promptGraph: PromptModuleCompiledGraph;
}> {
  return compileProjectOverlayArtifactsFromRegistryImpl(project, registry);
}
