export function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

export function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

export function isNonEmptyStringArray(value: unknown): value is string[] {
  return isStringArray(value) && value.every((item) => item.trim().length > 0);
}
