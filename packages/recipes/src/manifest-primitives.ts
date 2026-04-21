import { dedupeStrings, invalidFieldMessage, requiredFieldMessage } from "./internal-utils.js";

export function normalizeRequiredString(raw: unknown, field: string): string {
  if (typeof raw !== "string") throw new Error(invalidFieldMessage(field, "string"));
  const value = raw.trim();
  if (!value) throw new Error(requiredFieldMessage(field));
  return value;
}

export function normalizeOptionalString(raw: unknown, field: string): string | undefined {
  if (raw === undefined) return undefined;
  if (typeof raw !== "string") throw new Error(invalidFieldMessage(field, "string"));
  const value = raw.trim();
  return value || undefined;
}

export function normalizeStringList(
  raw: unknown,
  field: string,
  opts?: { minLength?: number },
): string[] {
  if (!Array.isArray(raw)) throw new Error(invalidFieldMessage(field, "string[]"));
  const values = raw.map((value) => {
    if (typeof value !== "string") throw new Error(invalidFieldMessage(field, "string[]"));
    const trimmed = value.trim();
    if (!trimmed) throw new Error(invalidFieldMessage(field, "string[]"));
    return trimmed;
  });
  const deduped = dedupeStrings(values);
  if ((opts?.minLength ?? 0) > 0 && deduped.length < (opts?.minLength ?? 0)) {
    throw new Error(invalidFieldMessage(field, `string[${opts?.minLength ?? 0}+]`));
  }
  return deduped;
}

export function normalizeOptionalStringList(raw: unknown, field: string): string[] | undefined {
  if (raw === undefined) return undefined;
  return normalizeStringList(raw, field);
}

export function normalizeNumber(raw: unknown, field: string): number | undefined {
  if (raw === undefined) return undefined;
  if (typeof raw !== "number" || Number.isNaN(raw)) {
    throw new Error(invalidFieldMessage(field, "number"));
  }
  return raw;
}
