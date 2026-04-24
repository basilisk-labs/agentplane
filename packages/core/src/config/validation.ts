import { createLogger } from "../logger.js";
import { isConfigRecord } from "./defaults.js";
import {
  type AgentplaneConfig as AgentplaneConfigShape,
  validateAgentplaneConfig,
} from "./schema.impl.js";

export type AgentplaneConfig = AgentplaneConfigShape;

const DEPRECATED_CONFIG_KEYS = ["base_branch"];

export function stripDeprecatedConfigKeys(raw: Record<string, unknown>): {
  sanitized: Record<string, unknown>;
  removed: string[];
} {
  const sanitized = { ...raw };
  const removed: string[] = [];
  for (const key of DEPRECATED_CONFIG_KEYS) {
    if (key in sanitized) {
      delete sanitized[key];
      removed.push(key);
    }
  }
  return { sanitized, removed };
}

export function warnDeprecatedConfigKeys(keys: string[]): void {
  const logger = createLogger();
  for (const key of keys) {
    logger.write({
      kind: "event",
      level: "warn",
      stream: "stderr",
      action: "config.deprecated",
      target: key,
      message: `config key "${key}" is deprecated and ignored`,
    });
  }
}

export function validateConfig(raw: unknown): AgentplaneConfig {
  let candidate =
    raw && typeof raw === "object" ? structuredClone(raw as Record<string, unknown>) : raw;
  if (isConfigRecord(candidate)) {
    candidate = stripDeprecatedConfigKeys(candidate).sanitized;
  }
  return validateAgentplaneConfig(candidate);
}
