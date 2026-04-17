import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import {
  createEmptyOverlayBundle,
  hashOverlayInputs,
  type CompiledOverlayBundle,
  type ProjectRecipesLockFile,
} from "@agentplaneorg/recipes";
import { loadConfig, saveConfig } from "@agentplaneorg/core";

import { writeJsonStableIfChanged } from "../../../shared/write-if-changed.js";

import { readProjectInstalledRecipes } from "./project-installed-recipes.js";
import {
  resolveProjectInstalledRecipeDir,
  resolveProjectOverlayBundlePath,
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

export async function readActiveRecipeIds(project: { agentplaneDir: string }): Promise<string[]> {
  const loaded = await loadConfig(project.agentplaneDir);
  return Array.isArray(loaded.config.recipes?.active)
    ? [
        ...new Set(loaded.config.recipes.active.map((value) => value.trim()).filter(Boolean)),
      ].toSorted()
    : [];
}

export async function setRecipeActive(opts: {
  project: { agentplaneDir: string };
  recipeId: string;
  active: boolean;
}): Promise<string[]> {
  const loaded = await loadConfig(opts.project.agentplaneDir);
  const raw = { ...loaded.raw };
  const current = new Set(
    Array.isArray(loaded.config.recipes?.active)
      ? loaded.config.recipes.active.map((value) => value.trim()).filter(Boolean)
      : [],
  );
  if (opts.active) current.add(opts.recipeId);
  else current.delete(opts.recipeId);

  raw.recipes = {
    ...(typeof raw.recipes === "object" && raw.recipes
      ? (raw.recipes as Record<string, unknown>)
      : {}),
    storage_default: loaded.config.recipes?.storage_default ?? "copy",
    active: [...current].toSorted(),
  };
  await saveConfig(opts.project.agentplaneDir, raw);
  return [...current].toSorted();
}

export async function compileProjectOverlayArtifacts(project: {
  agentplaneDir: string;
}): Promise<{ bundle: CompiledOverlayBundle; lock: ProjectRecipesLockFile }> {
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
    const recipeDir = resolveProjectInstalledRecipeDir(project, entry.id);
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

    for (const fragment of manifest.prompts) {
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
  return { bundle, lock };
}

export async function refreshProjectOverlayArtifacts(project: {
  agentplaneDir: string;
}): Promise<{ bundle: CompiledOverlayBundle; lock: ProjectRecipesLockFile }> {
  const compiled = await compileProjectOverlayArtifacts(project);
  const bundlePath = resolveProjectOverlayBundlePath(project);
  const lockPath = resolveProjectRecipesLockPath(project);
  await mkdir(path.dirname(bundlePath), { recursive: true });
  await writeJsonStableIfChanged(bundlePath, compiled.bundle);
  await writeJsonStableIfChanged(lockPath, compiled.lock);
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
