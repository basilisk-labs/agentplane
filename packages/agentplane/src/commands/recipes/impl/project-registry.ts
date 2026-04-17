import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import {
  normalizeRecipeId,
  normalizeRecipeTags,
  type ProjectRecipeMaterialization,
  type ProjectRecipeRegistryEntry,
  type ProjectRecipesRegistryFile,
} from "@agentplaneorg/recipes";

import { invalidFieldMessage } from "../../../cli/output.js";
import { isRecord } from "../../../shared/guards.js";
import { writeJsonStableIfChanged } from "../../../shared/write-if-changed.js";
import { resolveProjectRecipesRegistryPath } from "./paths.js";

function validateMaterialization(raw: unknown): ProjectRecipeMaterialization {
  if (raw === "copy" || raw === "link") return raw;
  throw new Error(invalidFieldMessage("recipes registry materialization", '"copy" | "link"'));
}

function validateRegistryEntry(raw: unknown): ProjectRecipeRegistryEntry {
  if (!isRecord(raw)) throw new Error(invalidFieldMessage("recipes registry entry", "object"));
  const id = normalizeRecipeId(typeof raw.id === "string" ? raw.id.trim() : "");
  const version = typeof raw.version === "string" ? raw.version.trim() : "";
  const entryPath = typeof raw.path === "string" ? raw.path.trim() : "";
  const sourceRef = typeof raw.source_ref === "string" ? raw.source_ref.trim() : "";
  const sourceSha256 = typeof raw.source_sha256 === "string" ? raw.source_sha256.trim() : "";
  const vendoredSha256 = typeof raw.vendored_sha256 === "string" ? raw.vendored_sha256.trim() : "";
  const installedAt = typeof raw.installed_at === "string" ? raw.installed_at.trim() : "";
  if (
    !id ||
    !version ||
    !entryPath ||
    !sourceRef ||
    !sourceSha256 ||
    !vendoredSha256 ||
    !installedAt
  ) {
    throw new Error(
      invalidFieldMessage(
        "recipes registry entry",
        "id, version, path, source_ref, source_sha256, vendored_sha256, installed_at",
      ),
    );
  }
  return {
    id,
    version,
    path: entryPath,
    active: raw.active === true,
    materialization: validateMaterialization(raw.materialization),
    source_ref: sourceRef,
    source_sha256: sourceSha256,
    vendored_sha256: vendoredSha256,
    installed_at: installedAt,
    tags: normalizeRecipeTags(raw.tags ?? []),
  };
}

function sortRegistry(file: ProjectRecipesRegistryFile): ProjectRecipesRegistryFile {
  return {
    schema_version: 1,
    updated_at: file.updated_at,
    recipes: [...file.recipes].toSorted((left, right) => left.id.localeCompare(right.id)),
  };
}

export function stampProjectRecipesRegistry(
  file: ProjectRecipesRegistryFile,
  updatedAt = new Date().toISOString(),
): ProjectRecipesRegistryFile {
  return sortRegistry({
    schema_version: 1,
    updated_at: updatedAt,
    recipes: file.recipes,
  });
}

export function replaceProjectRecipeRegistryEntry(
  registry: ProjectRecipesRegistryFile,
  entry: ProjectRecipeRegistryEntry,
): ProjectRecipesRegistryFile {
  const recipes = registry.recipes.filter((candidate) => candidate.id !== entry.id);
  recipes.push(entry);
  return sortRegistry({
    schema_version: 1,
    updated_at: registry.updated_at,
    recipes,
  });
}

export function removeProjectRecipeRegistryEntryFromFile(
  registry: ProjectRecipesRegistryFile,
  recipeId: string,
): ProjectRecipesRegistryFile {
  return sortRegistry({
    schema_version: 1,
    updated_at: registry.updated_at,
    recipes: registry.recipes.filter((entry) => entry.id !== recipeId),
  });
}

export function setProjectRecipeActiveInFile(
  registry: ProjectRecipesRegistryFile,
  recipeId: string,
  active: boolean,
): ProjectRecipesRegistryFile {
  return sortRegistry({
    schema_version: 1,
    updated_at: registry.updated_at,
    recipes: registry.recipes.map((entry) =>
      entry.id === recipeId ? { ...entry, active } : entry,
    ),
  });
}

export async function readProjectRecipesRegistry(opts: {
  agentplaneDir: string;
}): Promise<ProjectRecipesRegistryFile> {
  try {
    const raw = JSON.parse(
      await readFile(resolveProjectRecipesRegistryPath(opts), "utf8"),
    ) as unknown;
    if (!isRecord(raw)) throw new Error(invalidFieldMessage("recipes registry", "object"));
    if (raw.schema_version !== 1) {
      throw new Error(invalidFieldMessage("recipes registry.schema_version", "1"));
    }
    if (!Array.isArray(raw.recipes)) {
      throw new Error(invalidFieldMessage("recipes registry.recipes", "array"));
    }
    return sortRegistry({
      schema_version: 1,
      updated_at: typeof raw.updated_at === "string" ? raw.updated_at : "",
      recipes: raw.recipes.map((entry) => validateRegistryEntry(entry)),
    });
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") {
      return { schema_version: 1, updated_at: "", recipes: [] };
    }
    throw err;
  }
}

export async function writeProjectRecipesRegistry(
  opts: { agentplaneDir: string },
  file: ProjectRecipesRegistryFile,
): Promise<void> {
  const sorted = stampProjectRecipesRegistry(file);
  const filePath = resolveProjectRecipesRegistryPath(opts);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeJsonStableIfChanged(filePath, sorted);
}

export async function upsertProjectRecipeRegistryEntry(opts: {
  project: { agentplaneDir: string };
  entry: ProjectRecipeRegistryEntry;
}): Promise<ProjectRecipesRegistryFile> {
  const registry = await readProjectRecipesRegistry(opts.project);
  const next = replaceProjectRecipeRegistryEntry(registry, opts.entry);
  await writeProjectRecipesRegistry(opts.project, next);
  return readProjectRecipesRegistry(opts.project);
}

export async function removeProjectRecipeRegistryEntry(opts: {
  project: { agentplaneDir: string };
  recipeId: string;
}): Promise<ProjectRecipesRegistryFile> {
  const registry = await readProjectRecipesRegistry(opts.project);
  const next = removeProjectRecipeRegistryEntryFromFile(registry, opts.recipeId);
  await writeProjectRecipesRegistry(opts.project, next);
  return readProjectRecipesRegistry(opts.project);
}
