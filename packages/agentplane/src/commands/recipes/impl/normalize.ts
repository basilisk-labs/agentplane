import {
  invalidPathMessage,
  requiredFieldMessage,
  invalidFieldMessage,
} from "../../../cli/output.js";
import { dedupeStrings } from "../../../shared/strings.js";

export function normalizeRecipeId(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) throw new Error(requiredFieldMessage("manifest.id"));
  if (trimmed.includes("/") || trimmed.includes("\\")) {
    throw new Error(invalidPathMessage("manifest.id", "must not contain path separators"));
  }
  if (trimmed === "." || trimmed === "..") {
    throw new Error(invalidPathMessage("manifest.id", "must not be '.' or '..'"));
  }
  return trimmed;
}

export function normalizeAgentId(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) throw new Error(requiredFieldMessage("agent.id"));
  if (trimmed.includes("/") || trimmed.includes("\\")) {
    throw new Error(invalidPathMessage("agent.id", "must not contain path separators"));
  }
  if (trimmed === "." || trimmed === "..") {
    throw new Error(invalidPathMessage("agent.id", "must not be '.' or '..'"));
  }
  return trimmed;
}

export function normalizeScenarioId(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) throw new Error(requiredFieldMessage("scenario.id"));
  if (trimmed.includes("/") || trimmed.includes("\\")) {
    throw new Error(invalidPathMessage("scenario.id", "must not contain path separators"));
  }
  if (trimmed === "." || trimmed === "..") {
    throw new Error(invalidPathMessage("scenario.id", "must not be '.' or '..'"));
  }
  return trimmed;
}

export function normalizeRecipeTags(value: unknown): string[] {
  if (value === undefined) return [];
  if (!Array.isArray(value)) throw new Error(invalidFieldMessage("manifest.tags", "string[]"));
  const tags = value.map((tag) => {
    if (typeof tag !== "string") throw new Error(invalidFieldMessage("manifest.tags", "string[]"));
    return tag.trim();
  });
  return dedupeStrings(tags);
}
