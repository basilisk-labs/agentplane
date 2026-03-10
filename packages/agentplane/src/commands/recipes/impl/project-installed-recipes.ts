import { mkdir, readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { fileExists, getPathKind } from "../../../cli/fs-utils.js";
import { invalidFieldMessage, missingFileMessage } from "../../../cli/output.js";
import { isRecord } from "../../../shared/guards.js";
import { writeJsonStableIfChanged } from "../../../shared/write-if-changed.js";

import { readRecipeManifest } from "./manifest.js";
import { normalizeRecipeTags } from "./normalize.js";
import {
  resolveProjectInstalledRecipeDir,
  resolveProjectRecipeInstallMetaPath,
  resolveProjectRecipesDir,
} from "./paths.js";
import type { InstalledRecipeEntry, InstalledRecipesFile, RecipeInstallMetadata } from "./types.js";

function validateRecipeInstallMetadata(raw: unknown): RecipeInstallMetadata {
  if (!isRecord(raw)) throw new Error(invalidFieldMessage("recipe install metadata", "object"));
  const id = typeof raw.id === "string" ? raw.id.trim() : "";
  const version = typeof raw.version === "string" ? raw.version.trim() : "";
  const source = typeof raw.source === "string" ? raw.source.trim() : "";
  const installedAt = typeof raw.installed_at === "string" ? raw.installed_at.trim() : "";
  const installMode =
    raw.install_mode === undefined || raw.install_mode === "project-local"
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
    throw new Error(invalidFieldMessage("recipe install metadata.install_mode", '"project-local"'));
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
  const recipesDir = resolveProjectRecipesDir(opts);
  if ((await getPathKind(recipesDir)) !== "dir") {
    return { schema_version: 1, updated_at: "", recipes: [] };
  }

  const entries: InstalledRecipeEntry[] = [];
  const dirs = await readdir(recipesDir, { withFileTypes: true });
  for (const dirent of dirs) {
    if (!dirent.isDirectory()) continue;
    const recipeDir = resolveProjectInstalledRecipeDir(opts, dirent.name);
    const manifestPath = path.join(recipeDir, "manifest.json");
    if (!(await fileExists(manifestPath))) {
      throw new Error(missingFileMessage("installed recipe manifest", manifestPath));
    }
    const manifest = await readRecipeManifest(manifestPath);
    if (manifest.id !== dirent.name) {
      throw new Error(
        invalidFieldMessage(
          `installed recipe directory ${dirent.name}`,
          `manifest.id=${dirent.name}`,
        ),
      );
    }

    const metadata = await readRecipeInstallMetadata(
      resolveProjectRecipeInstallMetaPath(opts, dirent.name),
    );
    if (metadata && (metadata.id !== manifest.id || metadata.version !== manifest.version)) {
      throw new Error(
        invalidFieldMessage(
          `recipe install metadata ${dirent.name}`,
          "id/version matching manifest",
        ),
      );
    }

    entries.push({
      id: manifest.id,
      version: manifest.version,
      source: metadata?.source ?? "project-local",
      installed_at: metadata?.installed_at ?? "",
      tags: normalizeRecipeTags(metadata?.tags ?? manifest.tags ?? []),
      manifest,
    });
  }

  const sorted = sortInstalledRecipes(entries);
  const updatedAt = sorted
    .map((entry) => entry.installed_at)
    .filter(Boolean)
    .toSorted()
    .at(-1);
  return {
    schema_version: 1,
    updated_at: updatedAt ?? "",
    recipes: sorted,
  };
}
