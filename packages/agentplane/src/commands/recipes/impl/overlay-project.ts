import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import {
  createEmptyOverlayBundle,
  hashOverlayInputs,
  type CompiledRecipeAssetEntry,
  type CompiledRecipeAssetRegistry,
  type CompiledOverlayBundle,
  type ProjectRecipesLockFile,
} from "@agentplaneorg/recipes";

import { writeJsonStableIfChanged } from "../../../shared/write-if-changed.js";

import { readProjectInstalledRecipes } from "./project-installed-recipes.js";
import { readProjectRecipesRegistry, writeProjectRecipesRegistry } from "./project-registry.js";
import {
  resolveProjectInstalledRecipeDir,
  resolveProjectOverlayBundlePath,
  resolveProjectRecipeAssetsPath,
  resolveProjectRecipesDir,
  resolveProjectRecipesLockPath,
} from "./paths.js";

function ensureTrailingNewline(text: string): string {
  return text.endsWith("\n") ? text : `${text}\n`;
}

function stripMarkdownFrontmatter(text: string): string {
  if (!text.startsWith("---\n")) return text;
  const end = text.indexOf("\n---\n", 4);
  if (end === -1) return text;
  return text.slice(end + 5);
}

function normalizePromptContent(text: string): string {
  return ensureTrailingNewline(stripMarkdownFrontmatter(text).trim());
}

function normalizeRecipeAssetContent(text: string): string {
  return ensureTrailingNewline(text.trimEnd());
}

function uniqueById<T extends { id: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  const result: T[] = [];
  for (const item of items) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    result.push(item);
  }
  return result;
}

function recipeAssetId(recipeId: string, kind: string, assetId: string): string {
  return `recipe:${recipeId}/${kind}:${assetId}`;
}

function relativeSource(project: { agentplaneDir: string }, absolutePath: string): string {
  return path.relative(project.agentplaneDir, absolutePath).replaceAll("\\", "/");
}

async function compileProjectRecipeAssets(opts: {
  project: { agentplaneDir: string };
  installed: Awaited<ReturnType<typeof readProjectInstalledRecipes>>;
}): Promise<CompiledRecipeAssetRegistry> {
  const entries: CompiledRecipeAssetEntry[] = [];

  for (const recipe of opts.installed.recipes) {
    const recipeDir = recipe.project_path
      ? path.join(resolveProjectRecipesDir(opts.project), recipe.project_path)
      : resolveProjectInstalledRecipeDir(opts.project, recipe.id);
    const manifest = recipe.manifest;

    for (const agent of manifest.agents ?? []) {
      const sourcePath = path.join(recipeDir, agent.file);
      entries.push({
        id: recipeAssetId(recipe.id, "agent", agent.id),
        kind: "agent",
        recipe_id: recipe.id,
        recipe_version: recipe.version,
        recipe_name: manifest.name,
        asset_id: agent.id,
        source: relativeSource(opts.project, sourcePath),
        summary: agent.summary,
        definition: agent,
        content: normalizeRecipeAssetContent(await readFile(sourcePath, "utf8")),
      });
    }

    for (const skill of manifest.skills ?? []) {
      const sourcePath = path.join(recipeDir, skill.file);
      entries.push({
        id: recipeAssetId(recipe.id, "skill", skill.id),
        kind: "skill",
        recipe_id: recipe.id,
        recipe_version: recipe.version,
        recipe_name: manifest.name,
        asset_id: skill.id,
        source: relativeSource(opts.project, sourcePath),
        summary: skill.summary,
        definition: skill,
        content: normalizeRecipeAssetContent(await readFile(sourcePath, "utf8")),
      });
    }

    for (const tool of manifest.tools ?? []) {
      entries.push({
        id: recipeAssetId(recipe.id, "tool", tool.id),
        kind: "tool",
        recipe_id: recipe.id,
        recipe_version: recipe.version,
        recipe_name: manifest.name,
        asset_id: tool.id,
        source: relativeSource(opts.project, path.join(recipeDir, tool.entrypoint)),
        summary: tool.summary,
        definition: tool,
      });
    }

    for (const scenario of manifest.scenarios ?? []) {
      entries.push({
        id: recipeAssetId(recipe.id, "scenario", scenario.id),
        kind: "scenario",
        recipe_id: recipe.id,
        recipe_version: recipe.version,
        recipe_name: manifest.name,
        asset_id: scenario.id,
        source: relativeSource(opts.project, path.join(recipeDir, scenario.file)),
        summary: scenario.summary,
        definition: scenario,
      });
    }

    for (const [templateKey, content] of Object.entries(manifest.templates ?? {})) {
      entries.push({
        id: recipeAssetId(recipe.id, "template", templateKey),
        kind: "template",
        recipe_id: recipe.id,
        recipe_version: recipe.version,
        recipe_name: manifest.name,
        asset_id: templateKey,
        source: relativeSource(opts.project, path.join(recipeDir, "manifest.json")),
        content,
      });
    }
  }

  return {
    schema_version: 1,
    kind: "recipe_asset_registry",
    entries: uniqueById(entries).toSorted((left, right) => left.id.localeCompare(right.id)),
  };
}

export async function readActiveRecipeIds(project: { agentplaneDir: string }): Promise<string[]> {
  const registry = await readProjectRecipesRegistry(project);
  return registry.recipes
    .filter((entry) => entry.active)
    .map((entry) => entry.id)
    .toSorted();
}

export async function setRecipeActive(opts: {
  project: { agentplaneDir: string };
  recipeId: string;
  active: boolean;
}): Promise<string[]> {
  const registry = await readProjectRecipesRegistry(opts.project);
  const current = new Set<string>();
  const recipes = registry.recipes.map((entry) => {
    const isTarget = entry.id === opts.recipeId;
    const active = isTarget ? opts.active : entry.active;
    if (active) current.add(entry.id);
    return isTarget ? { ...entry, active } : entry;
  });
  await writeProjectRecipesRegistry(opts.project, {
    schema_version: 1,
    updated_at: registry.updated_at,
    recipes,
  });
  return [...current].toSorted();
}

export async function compileProjectOverlayArtifacts(project: {
  agentplaneDir: string;
}): Promise<{
  bundle: CompiledOverlayBundle;
  lock: ProjectRecipesLockFile;
  assets: CompiledRecipeAssetRegistry;
}> {
  const [activeIds, installed] = await Promise.all([
    readActiveRecipeIds(project),
    readProjectInstalledRecipes(project),
  ]);
  const bundle = createEmptyOverlayBundle();
  const lock: ProjectRecipesLockFile = { schema_version: 1, active: [] };

  for (const recipeId of activeIds) {
    const entry = installed.recipes.find((candidate) => candidate.id === recipeId);
    if (!entry) {
      throw new Error(`Active overlay is not installed: ${recipeId}`);
    }
    if (entry.manifest.kind !== "project_overlay") {
      throw new Error(`Active recipe ${recipeId} is not a project overlay`);
    }
    const manifest = entry.manifest;
    const recipeDir = entry.project_path
      ? path.join(resolveProjectRecipesDir(project), entry.project_path)
      : resolveProjectInstalledRecipeDir(project, entry.id);
    const promptInputs: { id: string; content: string }[] = [];

    if (manifest.requires) {
      for (const required of manifest.requires) {
        if (!activeIds.includes(required)) {
          throw new Error(`Overlay ${manifest.id} requires active overlay ${required}`);
        }
      }
    }
    if (manifest.conflicts) {
      for (const conflict of manifest.conflicts) {
        if (activeIds.includes(conflict.recipe_id)) {
          throw new Error(
            `Overlay ${manifest.id} conflicts with ${conflict.recipe_id}: ${conflict.reason}`,
          );
        }
      }
    }

    for (const fragment of manifest.prompts ?? []) {
      const absPath = path.join(recipeDir, fragment.file);
      const content = normalizePromptContent(await readFile(absPath, "utf8"));
      promptInputs.push({ id: fragment.id, content });
      bundle.surfaces[fragment.surface].push({
        ...fragment,
        recipe_id: manifest.id,
        recipe_version: manifest.version,
        recipe_name: manifest.name,
        summary: manifest.summary,
        source: path.relative(project.agentplaneDir, absPath).replaceAll("\\", "/"),
        content,
      });
      bundle.trace.push({
        recipe_id: manifest.id,
        recipe_version: manifest.version,
        accepted: true,
        reason: "compiled prompt fragment",
        source: fragment.file,
        surface: fragment.surface,
        fragment_id: fragment.id,
      });
    }

    for (const validator of manifest.validators ?? []) {
      bundle.validators.push({
        ...validator,
        recipe_id: manifest.id,
        recipe_version: manifest.version,
      });
      bundle.trace.push({
        recipe_id: manifest.id,
        recipe_version: manifest.version,
        accepted: true,
        reason: "compiled validator",
        validator_id: validator.id,
      });
    }

    bundle.active.push({
      id: manifest.id,
      version: manifest.version,
      name: manifest.name,
      summary: manifest.summary,
    });
    bundle.agents.push(...(manifest.agents ?? []));
    bundle.tools.push(...(manifest.tools ?? []));
    Object.assign(bundle.templates, manifest.templates ?? {});

    lock.active.push({
      id: manifest.id,
      version: manifest.version,
      kind: manifest.kind,
      source: entry.source,
      hash: hashOverlayInputs({ manifest, prompts: promptInputs }),
    });
  }

  bundle.agents = uniqueById(bundle.agents);
  bundle.tools = uniqueById(bundle.tools);
  for (const surface of Object.keys(bundle.surfaces) as (keyof typeof bundle.surfaces)[]) {
    bundle.surfaces[surface] = bundle.surfaces[surface].toSorted(
      (left, right) =>
        (left.order ?? 0) - (right.order ?? 0) ||
        left.recipe_id.localeCompare(right.recipe_id) ||
        left.id.localeCompare(right.id),
    );
  }
  lock.active = lock.active.toSorted((left, right) => left.id.localeCompare(right.id));
  return {
    bundle,
    lock,
    assets: await compileProjectRecipeAssets({ project, installed }),
  };
}

export async function refreshProjectOverlayArtifacts(project: {
  agentplaneDir: string;
}): Promise<{
  bundle: CompiledOverlayBundle;
  lock: ProjectRecipesLockFile;
  assets: CompiledRecipeAssetRegistry;
}> {
  const compiled = await compileProjectOverlayArtifacts(project);
  const bundlePath = resolveProjectOverlayBundlePath(project);
  const lockPath = resolveProjectRecipesLockPath(project);
  const assetsPath = resolveProjectRecipeAssetsPath(project);
  await mkdir(path.dirname(bundlePath), { recursive: true });
  await writeJsonStableIfChanged(bundlePath, compiled.bundle);
  await writeJsonStableIfChanged(lockPath, compiled.lock);
  await writeJsonStableIfChanged(assetsPath, compiled.assets);
  return compiled;
}

export async function readProjectOverlayBundle(project: {
  agentplaneDir: string;
}): Promise<CompiledOverlayBundle | null> {
  try {
    return JSON.parse(
      await readFile(resolveProjectOverlayBundlePath(project), "utf8"),
    ) as CompiledOverlayBundle;
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
    return JSON.parse(
      await readFile(resolveProjectRecipeAssetsPath(project), "utf8"),
    ) as CompiledRecipeAssetRegistry;
  } catch (err) {
    const code = (err as NodeJS.ErrnoException | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
}
