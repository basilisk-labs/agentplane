/**
 * Type guard for plain object-like values (`Record<string, unknown>`).
 */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
