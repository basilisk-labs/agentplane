import type { AgentplaneConfig as AgentplaneConfigShape } from "./schema.impl.js";

export { defaultAgentplaneConfig as defaultConfig } from "./schema.impl.js";

const PROTOTYPE_POLLUTION_KEYS = new Set(["__proto__", "prototype", "constructor"]);

export function isConfigRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function parseScalar(value: string): unknown {
  const trimmed = value.trim();
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed === "null") return null;
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return value;
    }
  }
  if (/^-?\d+(?:\.\d+)?$/.test(trimmed)) return Number(trimmed);
  return value;
}

export function setByDottedKey(
  obj: Record<string, unknown>,
  dottedKey: string,
  value: string,
): void {
  const parts = dottedKey.split(".").filter(Boolean);
  if (parts.length === 0) throw new Error("config key must be non-empty");
  for (const part of parts) {
    if (PROTOTYPE_POLLUTION_KEYS.has(part)) {
      throw new Error(`config key segment "${part}" is not allowed`);
    }
  }
  let current: Record<string, unknown> = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!part) continue;
    const next = current[part];
    if (!isConfigRecord(next)) {
      current[part] = {};
    }
    current = current[part] as Record<string, unknown>;
  }
  const last = parts.at(-1);
  if (!last) throw new Error("config key must be non-empty");
  current[last] = parseScalar(value);
}

export type AgentplaneConfig = AgentplaneConfigShape;
