import type { PromptModuleMutability, PromptModuleSlot } from "../prompt-modules/index.js";

const PROMPT_MODULE_SLOTS = new Set<PromptModuleSlot>([
  "frontmatter",
  "purpose",
  "startup",
  "commands",
  "load_rules",
  "source_of_truth",
  "hard_constraint",
  "body",
  "example",
  "identity",
  "inputs",
  "outputs",
  "permissions",
  "workflow",
  "cli_notes",
  "context",
  "schema",
  "check",
  "partial",
  "file",
]);

const PROMPT_FRAGMENT_MUTABILITIES = new Set<PromptModuleMutability>([
  "locked",
  "replaceable",
  "extendable",
  "append_only",
]);

const FRAGMENT_ID_RE = /^[a-z][a-z0-9_-]*(?:\.[a-z0-9][a-z0-9_-]*)+$/;

export function isPromptFragmentId(value: string): boolean {
  return FRAGMENT_ID_RE.test(value);
}

export function validatePromptFragmentId(value: unknown, field = "fragment id"): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Invalid ${field}: expected non-empty lowercase dot-case id`);
  }
  const trimmed = value.trim();
  if (!isPromptFragmentId(trimmed)) {
    throw new Error(`Invalid ${field}: expected lowercase dot-case id`);
  }
  return trimmed;
}

export function validatePromptFragmentSlot(
  value: unknown,
  field = "fragment slot",
): PromptModuleSlot {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Invalid ${field}: expected prompt module slot`);
  }
  if (!PROMPT_MODULE_SLOTS.has(value as PromptModuleSlot)) {
    throw new Error(`Invalid ${field}: expected prompt module slot`);
  }
  return value as PromptModuleSlot;
}

export function validatePromptFragmentMutability(
  value: unknown,
  field = "fragment mutability",
): PromptModuleMutability {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Invalid ${field}: expected prompt fragment mutability`);
  }
  if (!PROMPT_FRAGMENT_MUTABILITIES.has(value as PromptModuleMutability)) {
    throw new Error(`Invalid ${field}: expected prompt fragment mutability`);
  }
  return value as PromptModuleMutability;
}

export function generatedPromptFragmentId(prefix: string, index: number): string {
  const normalizedPrefix = validatePromptFragmentId(prefix, "fragment id prefix");
  return `${normalizedPrefix}.compat.${index + 1}`;
}

export function generatedWholeFileFragmentId(sourceRef: string | undefined): string {
  const source = sourceRef?.trim() ?? "inline";
  const normalized = source
    .replaceAll(/[^A-Za-z0-9]+/g, ".")
    .replaceAll(/^\.+|\.+$/g, "")
    .toLowerCase();
  const suffix = normalized || "inline";
  return `markdown.${suffix}.file`;
}
