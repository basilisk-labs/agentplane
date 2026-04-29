import { lstat, mkdir, readFile, rename, rm } from "node:fs/promises";
import path from "node:path";

import {
  type CompiledRecipeAssetRegistry,
  type CompiledOverlayBundle,
  validateCompiledOverlayBundle,
  validateCompiledRecipeAssetRegistry,
} from "@agentplaneorg/recipes";
import { atomicWriteFile } from "@agentplaneorg/core/fs";
import { canonicalizeJson } from "@agentplaneorg/core/tasks";

import {
  validatePromptModuleCompiledGraph,
  type PromptModuleCompiledGraph,
} from "../../../runtime/prompt-modules/index.js";
import { writeJsonStableIfChanged } from "../../../shared/write-if-changed.js";
import {
  resolveProjectOverlayBundlePath,
  resolveProjectPromptGraphPath,
  resolveProjectRecipeAssetsPath,
  resolveProjectRecipesRegistryPath,
} from "./paths.js";
import { readProjectRecipesRegistry, stampProjectRecipesRegistry } from "./project-registry.js";
import type { ProjectRecipesRegistryFile } from "./types.js";
import { compileProjectOverlayArtifactsFromRegistry } from "./overlay-compile.js";

let projectRecipePublishNonce = 0;

function jsonText(value: unknown): string {
  return `${JSON.stringify(canonicalizeJson(value), null, 2)}\n`;
}

async function pathExists(filePath: string): Promise<boolean> {
  try {
    await lstat(filePath);
    return true;
  } catch (err) {
    const code = (err as NodeJS.ErrnoException | null)?.code;
    if (code === "ENOENT") return false;
    throw err;
  }
}

async function publishJsonFilesTransactional(
  files: { path: string; value: unknown }[],
): Promise<void> {
  const backups: { path: string; backup: string }[] = [];
  try {
    for (const file of files) {
      if (!(await pathExists(file.path))) continue;
      const backup = `${file.path}.bak-${process.pid}-${Date.now()}-${projectRecipePublishNonce++}`;
      await rename(file.path, backup);
      backups.push({ path: file.path, backup });
    }
    for (const file of files) {
      await mkdir(path.dirname(file.path), { recursive: true });
      await atomicWriteFile(file.path, jsonText(file.value), "utf8");
    }
    for (const entry of backups) {
      await rm(entry.backup, { recursive: true, force: true });
    }
  } catch (err) {
    for (const file of files) {
      await rm(file.path, { recursive: true, force: true }).catch((_error) => null);
    }
    for (const entry of backups.toReversed()) {
      await rename(entry.backup, entry.path).catch((_error) => null);
    }
    throw err;
  }
}

export async function publishProjectRecipesState(opts: {
  project: { agentplaneDir: string };
  registry: ProjectRecipesRegistryFile;
}): Promise<{
  registry: ProjectRecipesRegistryFile;
  bundle: CompiledOverlayBundle;
  assets: CompiledRecipeAssetRegistry;
  promptGraph: PromptModuleCompiledGraph;
}> {
  const registry = stampProjectRecipesRegistry(opts.registry);
  const compiled = await compileProjectOverlayArtifactsFromRegistry(opts.project, registry);
  await publishJsonFilesTransactional([
    { path: resolveProjectOverlayBundlePath(opts.project), value: compiled.bundle },
    { path: resolveProjectRecipeAssetsPath(opts.project), value: compiled.assets },
    { path: resolveProjectPromptGraphPath(opts.project), value: compiled.promptGraph },
    { path: resolveProjectRecipesRegistryPath(opts.project), value: registry },
  ]);
  return { registry, ...compiled };
}

export async function refreshProjectOverlayArtifacts(project: { agentplaneDir: string }): Promise<{
  bundle: CompiledOverlayBundle;
  assets: CompiledRecipeAssetRegistry;
  promptGraph: PromptModuleCompiledGraph;
}> {
  const compiled = await compileProjectOverlayArtifactsFromRegistry(
    project,
    await readProjectRecipesRegistry(project),
  );
  const bundlePath = resolveProjectOverlayBundlePath(project);
  const assetsPath = resolveProjectRecipeAssetsPath(project);
  const promptGraphPath = resolveProjectPromptGraphPath(project);
  await mkdir(path.dirname(bundlePath), { recursive: true });
  await writeJsonStableIfChanged(bundlePath, compiled.bundle);
  await writeJsonStableIfChanged(assetsPath, compiled.assets);
  await writeJsonStableIfChanged(promptGraphPath, compiled.promptGraph);
  return compiled;
}

export async function readProjectOverlayBundle(project: {
  agentplaneDir: string;
}): Promise<CompiledOverlayBundle | null> {
  try {
    return validateCompiledOverlayBundle(
      JSON.parse(await readFile(resolveProjectOverlayBundlePath(project), "utf8")) as unknown,
    );
  } catch (err) {
    const code = (err as NodeJS.ErrnoException | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
}

export async function readProjectRecipeAssetRegistry(project: {
  agentplaneDir: string;
}): Promise<CompiledRecipeAssetRegistry | null> {
  try {
    return validateCompiledRecipeAssetRegistry(
      JSON.parse(await readFile(resolveProjectRecipeAssetsPath(project), "utf8")) as unknown,
    );
  } catch (err) {
    const code = (err as NodeJS.ErrnoException | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
}

export async function readProjectPromptGraph(project: {
  agentplaneDir: string;
}): Promise<PromptModuleCompiledGraph | null> {
  try {
    return validatePromptModuleCompiledGraph(
      JSON.parse(await readFile(resolveProjectPromptGraphPath(project), "utf8")) as unknown,
    );
  } catch (err) {
    const code = (err as NodeJS.ErrnoException | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
}
