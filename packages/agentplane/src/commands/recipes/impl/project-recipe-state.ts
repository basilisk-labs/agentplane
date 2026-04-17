import { createHash } from "node:crypto";
import { lstat, readFile, readdir } from "node:fs/promises";
import path from "node:path";

import type { ProjectInstalledRecipeEntry, ProjectRecipeState } from "./types.js";
import { readProjectInstalledRecipes } from "./project-installed-recipes.js";
import { resolveInstalledRecipeDir, resolveProjectVendoredRecipeDir } from "./paths.js";

async function hashTreeEntry(
  rootDir: string,
  relativeDir: string,
  hash: ReturnType<typeof createHash>,
): Promise<void> {
  const directoryPath = relativeDir ? path.join(rootDir, relativeDir) : rootDir;
  const entries = (await readdir(directoryPath, { withFileTypes: true })).toSorted((left, right) =>
    left.name.localeCompare(right.name),
  );
  for (const entry of entries) {
    const relativePath = relativeDir ? path.posix.join(relativeDir, entry.name) : entry.name;
    const absolutePath = path.join(rootDir, relativePath);
    if (entry.isDirectory()) {
      hash.update(`dir:${relativePath}\n`);
      await hashTreeEntry(rootDir, relativePath, hash);
      continue;
    }
    if (entry.isSymbolicLink()) {
      hash.update(`symlink:${relativePath}\n`);
      continue;
    }
    const data = await readFile(absolutePath);
    hash.update(`file:${relativePath}\n`);
    hash.update(data);
    hash.update("\n");
  }
}

export async function hashRecipeTree(rootDir: string): Promise<string> {
  const hash = createHash("sha256");
  await hashTreeEntry(rootDir, "", hash);
  return hash.digest("hex");
}

export type ProjectRecipeInspection = {
  entry: ProjectInstalledRecipeEntry;
  recipe_dir: string;
  source_dir: string;
  cache_present: boolean;
  current_source_sha256?: string;
  current_vendored_sha256: string;
  state: ProjectRecipeState;
};

function classifyRecipeState(opts: {
  entry: ProjectInstalledRecipeEntry;
  cachePresent: boolean;
  currentSourceSha256?: string;
  currentVendoredSha256: string;
  vendoredPathIsSymlink: boolean;
}): ProjectRecipeState {
  if (opts.entry.materialization === "link" && !opts.vendoredPathIsSymlink) {
    return "modified";
  }
  const vendoredModified = opts.currentVendoredSha256 !== opts.entry.vendored_sha256;
  const cacheDiverged =
    opts.cachePresent && opts.currentSourceSha256 !== undefined
      ? opts.currentSourceSha256 !== opts.entry.source_sha256
      : false;
  if (opts.entry.materialization === "link") {
    if (cacheDiverged) return "diverged_from_cache";
    if (vendoredModified) return "modified";
    return "clean";
  }
  if (vendoredModified) return "modified";
  if (cacheDiverged) return "diverged_from_cache";
  return "clean";
}

export async function inspectProjectRecipe(opts: {
  project: { agentplaneDir: string };
  recipeId: string;
}): Promise<ProjectRecipeInspection> {
  const installed = await readProjectInstalledRecipes(opts.project);
  const entry = installed.recipes.find((recipe) => recipe.id === opts.recipeId);
  if (!entry) {
    throw new Error(`Recipe not installed: ${opts.recipeId}`);
  }
  const recipeDir = resolveProjectVendoredRecipeDir(opts.project, entry.id);
  const sourceDir = resolveInstalledRecipeDir({ id: entry.id, version: entry.version });
  const vendoredPathStat = await lstat(recipeDir);
  const vendoredPathIsSymlink = vendoredPathStat.isSymbolicLink();
  const currentVendoredSha256 = await hashRecipeTree(recipeDir);

  let cachePresent = false;
  let currentSourceSha256: string | undefined;
  try {
    const sourceStat = await lstat(sourceDir);
    if (sourceStat.isDirectory() || sourceStat.isSymbolicLink()) {
      cachePresent = true;
      currentSourceSha256 = await hashRecipeTree(sourceDir);
    }
  } catch (error) {
    const code = (error as { code?: string } | null)?.code;
    if (code !== "ENOENT") throw error;
  }

  return {
    entry,
    recipe_dir: recipeDir,
    source_dir: sourceDir,
    cache_present: cachePresent,
    current_source_sha256: currentSourceSha256,
    current_vendored_sha256: currentVendoredSha256,
    state: classifyRecipeState({
      entry,
      cachePresent,
      currentSourceSha256,
      currentVendoredSha256,
      vendoredPathIsSymlink,
    }),
  };
}
