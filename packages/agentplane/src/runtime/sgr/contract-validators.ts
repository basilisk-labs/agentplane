import { isRecord } from "../../shared/guards.js";
import { SGR_CONTRACT_SCHEMA_VERSION, type SgrSourceRef } from "./contract-types.js";

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

function requireNumber(raw: unknown, field: string): number {
  if (typeof raw !== "number" || Number.isNaN(raw)) throw invalid(field, "number");
  return raw;
}

export function optionalNumber(raw: unknown, field: string): number | undefined {
  if (raw === undefined) return undefined;
  return requireNumber(raw, field);
}

export function requireSchemaVersion(raw: Record<string, unknown>, field: string): void {
  if (raw.schema_version !== SGR_CONTRACT_SCHEMA_VERSION) {
    throw invalid(`${field}.schema_version`, String(SGR_CONTRACT_SCHEMA_VERSION));
  }
}

export function requireEnum<T extends string>(
  raw: unknown,
  field: string,
  allowed: readonly T[],
): T {
  const value = requireString(raw, field);
  if (!allowed.includes(value as T)) {
    throw invalid(field, allowed.map((item) => `"${item}"`).join(" | "));
  }
  return value as T;
}

export function requireStringArray(raw: unknown, field: string): string[] {
  if (!Array.isArray(raw)) throw invalid(field, "string[]");
  return raw.map((entry, index) => requireString(entry, `${field}[${index}]`));
}

export function optionalStringArray(raw: unknown, field: string): string[] | undefined {
  if (raw === undefined) return undefined;
  return requireStringArray(raw, field);
}

export function requireArray<T>(
  raw: unknown,
  field: string,
  validate: (entry: unknown, entryField: string) => T,
): T[] {
  if (!Array.isArray(raw)) throw invalid(field, "array");
  return raw.map((entry, index) => validate(entry, `${field}[${index}]`));
}

export function requireNonEmptyArray<T>(
  raw: unknown,
  field: string,
  validate: (entry: unknown, entryField: string) => T,
): T[] {
  const items = requireArray(raw, field, validate);
  if (items.length === 0) throw invalid(field, "non-empty array");
  return items;
}

export function optionalSourceRefs(
  raw: unknown,
  field: string,
  validateSourceRef: (entry: unknown, entryField: string) => SgrSourceRef,
): SgrSourceRef[] | undefined {
  if (raw === undefined) return undefined;
  return requireNonEmptyArray(raw, field, validateSourceRef);
}

export function validateConfidence(raw: unknown, field: string): number {
  const confidence = requireNumber(raw, field);
  if (confidence < 0 || confidence > 1) throw invalid(field, "number between 0 and 1");
  return confidence;
}
