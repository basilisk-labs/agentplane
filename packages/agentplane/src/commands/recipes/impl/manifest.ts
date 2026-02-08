import { readFile } from "node:fs/promises";

import { invalidFieldMessage, requiredFieldMessage } from "../../../cli/output.js";
import { isRecord } from "../../../shared/guards.js";

import { normalizeRecipeId, normalizeRecipeTags } from "./normalize.js";
import type { RecipeManifest } from "./types.js";

export function validateRecipeManifest(raw: unknown): RecipeManifest {
  if (!isRecord(raw)) throw new Error(invalidFieldMessage("manifest", "object"));
  if (raw.schema_version !== "1")
    throw new Error(invalidFieldMessage("manifest.schema_version", '"1"'));
  if (typeof raw.id !== "string") throw new Error(invalidFieldMessage("manifest.id", "string"));
  if (typeof raw.version !== "string")
    throw new Error(invalidFieldMessage("manifest.version", "string"));
  if (typeof raw.name !== "string") throw new Error(invalidFieldMessage("manifest.name", "string"));
  if (typeof raw.summary !== "string")
    throw new Error(invalidFieldMessage("manifest.summary", "string"));
  if (typeof raw.description !== "string")
    throw new Error(invalidFieldMessage("manifest.description", "string"));

  const id = normalizeRecipeId(raw.id);
  const version = raw.version.trim();
  if (!version) throw new Error(requiredFieldMessage("manifest.version"));
  const tags = normalizeRecipeTags(raw.tags);

  return {
    schema_version: "1",
    id,
    version,
    name: raw.name.trim(),
    summary: raw.summary.trim(),
    description: raw.description.trim(),
    tags: tags.length > 0 ? tags : undefined,
    agents: Array.isArray(raw.agents) ? (raw.agents as RecipeManifest["agents"]) : undefined,
    tools: Array.isArray(raw.tools) ? (raw.tools as RecipeManifest["tools"]) : undefined,
    scenarios: Array.isArray(raw.scenarios)
      ? (raw.scenarios as RecipeManifest["scenarios"])
      : undefined,
  };
}

export async function readRecipeManifest(manifestPath: string): Promise<RecipeManifest> {
  const raw = JSON.parse(await readFile(manifestPath, "utf8")) as unknown;
  return validateRecipeManifest(raw);
}
