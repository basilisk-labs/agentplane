import {
  invalidPathMessage,
  requiredFieldMessage,
  invalidFieldMessage,
} from "../../../cli/output.js";
import { dedupeStrings } from "../../../shared/strings.js";

function normalizeScopedId(field: string, value: string): string {
  const trimmed = value.trim();
  if (!trimmed) throw new Error(requiredFieldMessage(field));
  if (trimmed.includes("/") || trimmed.includes("\\")) {
    throw new Error(invalidPathMessage(field, "must not contain path separators"));
  }
  if (trimmed === "." || trimmed === "..") {
    throw new Error(invalidPathMessage(field, "must not be '.' or '..'"));
  }
  return trimmed;
}

export function normalizeRecipeId(value: string): string {
  return normalizeScopedId("manifest.id", value);
}

export function normalizeAgentId(value: string): string {
  return normalizeScopedId("agent.id", value);
}

export function normalizeSkillId(value: string): string {
  return normalizeScopedId("skill.id", value);
}

export function normalizeToolId(value: string): string {
  return normalizeScopedId("tool.id", value);
}

export function normalizeScenarioId(value: string): string {
  return normalizeScopedId("scenario.id", value);
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

export function normalizeRecipeRelativePath(field: string, value: string): string {
  const trimmed = value.trim().replaceAll("\\", "/");
  if (!trimmed) throw new Error(requiredFieldMessage(field));
  if (trimmed.startsWith("/")) {
    throw new Error(invalidPathMessage(field, "must be relative"));
  }
  const segments = trimmed.split("/");
  if (segments.some((segment) => !segment || segment === "." || segment === "..")) {
    throw new Error(invalidPathMessage(field, "must stay within the recipe root"));
  }
  return trimmed;
}
