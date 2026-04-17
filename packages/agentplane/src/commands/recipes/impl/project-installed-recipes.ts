import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import { fileExists, getPathKind } from "../../../cli/fs-utils.js";
import { invalidFieldMessage, missingFileMessage } from "../../../cli/output.js";
import { isRecord } from "../../../shared/guards.js";
import { writeJsonStableIfChanged } from "../../../shared/write-if-changed.js";
import {
  resolveProjectRecipeInstallMetaPath,
  resolveProjectRecipesDir,
} from "./paths.js";
import { readRecipeManifest } from "./manifest.js";
import { normalizeRecipeTags } from "./normalize.js";
import { readProjectRecipesRegistry } from "./project-registry.js";
import type { InstalledRecipeEntry, InstalledRecipesFile, RecipeInstallMetadata } from "./types.js";

function validateRecipeInstallMetadata(raw: unknown): RecipeInstallMetadata {
  if (!isRecord(raw)) throw new Error(invalidFieldMessage("recipe install metadata", "object"));
  const id = typeof raw.id === "string" ? raw.id.trim() : "";
  const version = typeof raw.version === "string" ? raw.version.trim() : "";
  const source = typeof raw.source === "string" ? raw.source.trim() : "";
  const installedAt = typeof raw.installed_at === "string" ? raw.installed_at.trim() : "";
  const installMode =
    raw.install_mode === undefined ||
    raw.install_mode === "project-copy" ||
    raw.install_mode === "project-link"
      ? raw.install_mode
      : null;
  if (raw.schema_version !== 1) {
    throw new Error(invalidFieldMessage("recipe install metadata.schema_version", "1"));
  }
  if (!id || !version || !source || !installedAt) {
    throw new Error(
      invalidFieldMessage("recipe install metadata", "id, version, source, installed_at"),
    );
  }
  if (installMode === null) {
    throw new Error(
      invalidFieldMessage("recipe install metadata.install_mode", '"project-copy" | "project-link"'),
    );
  }
  const tags = normalizeRecipeTags(raw.tags ?? []);
  return {
    schema_version: 1,
    id,
    version,
    source,
    installed_at: installedAt,
    tags,
    install_mode: installMode,
  };
}

function sortInstalledRecipes(entries: InstalledRecipeEntry[]): InstalledRecipeEntry[] {
  return [...entries].toSorted((a, b) => a.id.localeCompare(b.id));
}

export async function readRecipeInstallMetadata(
  filePath: string,
): Promise<RecipeInstallMetadata | null> {
  try {
    const raw = JSON.parse(await readFile(filePath, "utf8")) as unknown;
    return validateRecipeInstallMetadata(raw);
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
}

export async function writeRecipeInstallMetadata(
  filePath: string,
  metadata: RecipeInstallMetadata,
): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeJsonStableIfChanged(filePath, metadata);
}

export async function readProjectInstalledRecipes(opts: {
  agentplaneDir: string;
}): Promise<InstalledRecipesFile> {
  const registry = await readProjectRecipesRegistry(opts);
  if (registry.recipes.length === 0) {
    return { schema_version: 1, updated_at: "", recipes: [] };
  }

  const entries: InstalledRecipeEntry[] = [];
  for (const registryEntry of registry.recipes) {
    const recipeDir = path.join(resolveProjectRecipesDir(opts), registryEntry.path);
    if ((await getPathKind(recipeDir)) !== "dir") {
      throw new Error(missingFileMessage("vendored recipe directory", recipeDir));
    }
    const manifestPath = path.join(recipeDir, "manifest.json");
    if (!(await fileExists(manifestPath))) {
      throw new Error(missingFileMessage("installed recipe manifest", manifestPath));
    }
    const manifest = await readRecipeManifest(manifestPath);
    if (manifest.id !== registryEntry.id) {
      throw new Error(
        invalidFieldMessage(
          `installed recipe directory ${registryEntry.id}`,
          `manifest.id=${registryEntry.id}`,
        ),
      );
    }

    const metadata = await readRecipeInstallMetadata(
      resolveProjectRecipeInstallMetaPath(opts, registryEntry.id),
    );
    if (metadata && (metadata.id !== manifest.id || metadata.version !== manifest.version)) {
      throw new Error(
        invalidFieldMessage(
          `recipe install metadata ${registryEntry.id}`,
          "id/version matching manifest",
        ),
      );
    }

    entries.push({
      id: manifest.id,
      version: manifest.version,
      source: metadata?.source ?? registryEntry.source_ref,
      installed_at: metadata?.installed_at ?? registryEntry.installed_at,
      project_path: registryEntry.path,
      tags: normalizeRecipeTags(metadata?.tags ?? registryEntry.tags ?? manifest.tags ?? []),
      manifest,
    });
  }

  const sorted = sortInstalledRecipes(entries);
  return {
    schema_version: 1,
    updated_at: registry.updated_at,
    recipes: sorted,
  };
}
