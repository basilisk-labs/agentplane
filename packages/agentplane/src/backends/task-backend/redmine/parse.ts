import { toStringSafe } from "../shared.js";

export function maybeParseJson(value: unknown): unknown {
  if (value === null || value === undefined) return null;
  const raw = toStringSafe(value).trim();
  if (!raw) return null;
  if (raw.startsWith("{") || raw.startsWith("[")) {
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  }
  return raw;
}

export function coerceDocVersion(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return value;
  const raw = toStringSafe(value).trim();
  if (/^\d+$/u.test(raw)) return Number(raw);
  return null;
}
