import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import { invalidFieldMessage } from "../../../cli/output.js";
import { isRecord } from "../../../shared/guards.js";
import { writeJsonStableIfChanged } from "../../../shared/write-if-changed.js";
import { normalizeRecipeTags } from "./normalize.js";
import { validateRecipeManifest } from "./manifest.js";
import type { InstalledRecipesFile } from "./types.js";

function validateInstalledRecipesFile(raw: unknown): InstalledRecipesFile {
  if (!isRecord(raw)) throw new Error(invalidFieldMessage("recipes.json", "object"));
  if (raw.schema_version !== 1)
    throw new Error(invalidFieldMessage("recipes.json.schema_version", "1"));
  if (!Array.isArray(raw.recipes))
    throw new Error(invalidFieldMessage("recipes.json.recipes", "array"));
  const updatedAt = typeof raw.updated_at === "string" ? raw.updated_at : "";
  const recipes = raw.recipes
    .filter((entry) => isRecord(entry))
    .map((entry) => {
      const manifest = validateRecipeManifest(entry.manifest);
      const id = typeof entry.id === "string" ? entry.id.trim() : manifest.id;
      const version = typeof entry.version === "string" ? entry.version.trim() : manifest.version;
      const source = typeof entry.source === "string" ? entry.source.trim() : "";
      const installedAt = typeof entry.installed_at === "string" ? entry.installed_at.trim() : "";
      if (!id || !version || !source || !installedAt) {
        throw new Error(
          invalidFieldMessage("recipes.json.recipes[]", "id, version, source, installed_at"),
        );
      }
      if (id !== manifest.id || version !== manifest.version) {
        throw new Error(invalidFieldMessage("recipes.json.recipes[]", "id/version match manifest"));
      }
      const tags = normalizeRecipeTags(entry.tags ?? manifest.tags ?? []);
      return { id, version, source, installed_at: installedAt, tags, manifest };
    });
  return { schema_version: 1, updated_at: updatedAt, recipes };
}

function sortInstalledRecipes(file: InstalledRecipesFile): InstalledRecipesFile {
  const recipes = [...file.recipes].toSorted((a, b) => a.id.localeCompare(b.id));
  return { schema_version: 1, updated_at: file.updated_at, recipes };
}

export async function readInstalledRecipesFile(filePath: string): Promise<InstalledRecipesFile> {
  try {
    const raw = JSON.parse(await readFile(filePath, "utf8")) as unknown;
    return sortInstalledRecipes(validateInstalledRecipesFile(raw));
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return { schema_version: 1, updated_at: "", recipes: [] };
    throw err;
  }
}

export async function writeInstalledRecipesFile(
  filePath: string,
  file: InstalledRecipesFile,
): Promise<void> {
  const sorted = sortInstalledRecipes({
    ...file,
    updated_at: new Date().toISOString(),
  });
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeJsonStableIfChanged(filePath, sorted);
}
