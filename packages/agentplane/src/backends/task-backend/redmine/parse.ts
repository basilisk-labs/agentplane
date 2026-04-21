import type { TaskDocVersion } from "@agentplaneorg/core/tasks";

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

export function coerceDocVersion(value: unknown): TaskDocVersion | null {
  if (value === null || value === undefined) return null;
  if (value === 2 || value === 3) return value;
  const raw = toStringSafe(value).trim();
  if (raw === "2") return 2;
  if (raw === "3") return 3;
  return null;
}
