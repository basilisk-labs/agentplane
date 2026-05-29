import { isRecord } from "../../shared/guards.js";
import type { PromptModuleAddress } from "./model.js";

export function invalid(field: string, expected: string): Error {
  return new Error(`Invalid field ${field}: expected ${expected}`);
}

export function requireRecord(raw: unknown, field: string): Record<string, unknown> {
  if (!isRecord(raw)) throw invalid(field, "object");
  return raw;
}

export function requireString(raw: unknown, field: string): string {
  if (typeof raw !== "string" || !raw.trim()) throw invalid(field, "non-empty string");
  return raw.trim();
}

export function optionalString(raw: unknown, field: string): string | undefined {
  if (raw === undefined) return undefined;
  return requireString(raw, field);
}

export function optionalBoolean(raw: unknown, field: string): boolean | undefined {
  if (raw === undefined) return undefined;
  if (typeof raw !== "boolean") throw invalid(field, "boolean");
  return raw;
}

export function optionalNumber(raw: unknown, field: string): number | undefined {
  if (raw === undefined) return undefined;
  if (typeof raw !== "number" || Number.isNaN(raw)) throw invalid(field, "number");
  return raw;
}

export function validateEnum<T extends string>(
  raw: unknown,
  field: string,
  allowed: readonly T[],
): T {
  const value = requireString(raw, field);
  if (!allowed.includes(value as T))
    throw invalid(field, allowed.map((item) => `"${item}"`).join(" | "));
  return value as T;
}

export function validateOptionalStringList(raw: unknown, field: string): string[] | undefined {
  if (raw === undefined) return undefined;
  if (!Array.isArray(raw)) throw invalid(field, "string[]");
  return raw.map((entry, index) => requireString(entry, `${field}[${index}]`));
}

export function validateOptionalEnumList<T extends string>(
  raw: unknown,
  field: string,
  allowed: readonly T[],
): T[] | undefined {
  if (raw === undefined) return undefined;
  if (!Array.isArray(raw)) throw invalid(field, "array");
  return raw.map((entry, index) => validateEnum(entry, `${field}[${index}]`, allowed));
}

export function validateNamespace(raw: unknown, field: string): PromptModuleAddress["namespace"] {
  const namespace = requireString(raw, field);
  if (
    namespace === "framework" ||
    namespace === "project" ||
    namespace === "runtime" ||
    /^recipe\.[^/\\\s]+$/.test(namespace)
  ) {
    return namespace as PromptModuleAddress["namespace"];
  }
  throw invalid(field, '"framework" | "project" | "runtime" | "recipe.<id>"');
}
