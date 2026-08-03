function asTrimmedString(value: unknown): string {
  if (value === undefined || value === null) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean" || typeof value === "bigint") {
    return String(value).trim();
  }
  // Treat all other values as invalid for "string list" purposes.
  return "";
}

export function toStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((x) => asTrimmedString(x)).filter(Boolean);
}
