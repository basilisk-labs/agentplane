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
import {
  readProjectRecipesRegistry,
  setProjectRecipeActiveInFile,
  writeProjectRecipesRegistry,
} from "./project-registry.js";
import type { ProjectRecipesRegistryFile } from "./types.js";

export async function readActiveRecipeIds(project: { agentplaneDir: string }): Promise<string[]> {
  const registry = await readProjectRecipesRegistry(project);
  return readActiveRecipeIdsFromRegistry(registry);
}

export async function setRecipeActive(opts: {
  project: { agentplaneDir: string };
  recipeId: string;
  active: boolean;
}): Promise<string[]> {
  const registry = await readProjectRecipesRegistry(opts.project);
  const next = setProjectRecipeActiveInFile(registry, opts.recipeId, opts.active);
  await writeProjectRecipesRegistry(opts.project, next);
  return readActiveRecipeIdsFromRegistry(next);
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

export async function compileProjectOverlayArtifacts(project: { agentplaneDir: string }): Promise<{
  bundle: CompiledOverlayBundle;
  assets: CompiledRecipeAssetRegistry;
  promptGraph: PromptModuleCompiledGraph;
}> {
  const registry = await readProjectRecipesRegistry(project);
  return await compileProjectOverlayArtifactsFromRegistryImpl(project, registry);
}
