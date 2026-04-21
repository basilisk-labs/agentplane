import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import { atomicWriteFile } from "../fs/atomic-write.js";
import { createLogger } from "../logger.js";
import { defaultConfig, isConfigRecord } from "./defaults.js";
import {
  type AgentplaneConfig as AgentplaneConfigShape,
  validateAgentplaneConfig,
} from "./schema.js";

export type AgentplaneConfig = AgentplaneConfigShape;
export { defaultConfig, setByDottedKey } from "./defaults.js";

export type WorkflowMode = AgentplaneConfig["workflow_mode"];
export type StatusCommitPolicy = AgentplaneConfig["status_commit_policy"];
export type CommitAutomation = AgentplaneConfig["commit_automation"];
export type ExecutionProfile = AgentplaneConfig["execution"]["profile"];
export type ReasoningEffort = AgentplaneConfig["execution"]["reasoning_effort"];
export type RunnerAdapterId = AgentplaneConfig["runner"]["default_adapter"];
export type RunnerTraceMode = AgentplaneConfig["runner"]["trace"]["mode"];
export type RunnerTraceRetention = AgentplaneConfig["runner"]["trace"]["retention"];
export type RunnerTraceCompression = AgentplaneConfig["runner"]["trace"]["compression"];
export type RunnerTimeoutReason = "idle" | "wall_clock";
export type RunnerCustomEnforcementConfig = NonNullable<
  NonNullable<AgentplaneConfig["runner"]["custom"]>["enforcement"]
>;
export type RunnerCustomConfig = NonNullable<AgentplaneConfig["runner"]["custom"]>;
export type RunnerTraceConfig = {
  mode: RunnerTraceMode;
  max_tail_bytes: number;
  capture_stderr: boolean;
  retention?: RunnerTraceRetention;
  compression?: RunnerTraceCompression;
  redact_patterns?: string[];
};
export type RunnerTimeoutConfig = AgentplaneConfig["runner"]["timeouts"];

const DEPRECATED_CONFIG_KEYS = ["base_branch"];

function stripDeprecatedConfigKeys(raw: Record<string, unknown>): {
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

function warnDeprecatedConfigKeys(keys: string[]): void {
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

export type LoadedConfig = {
  path: string;
  exists: boolean;
  config: AgentplaneConfig;
  raw: Record<string, unknown>;
};

function toErrnoException(err: unknown): NodeJS.ErrnoException | null {
  if (!err || typeof err !== "object") return null;
  if (!("code" in err)) return null;
  return err as NodeJS.ErrnoException;
}

export async function loadConfig(agentplaneDir: string): Promise<LoadedConfig> {
  const filePath = path.join(agentplaneDir, "config.json");
  try {
    const rawText = await readFile(filePath, "utf8");
    const parsed = JSON.parse(rawText) as unknown;
    const rawRecord = isConfigRecord(parsed) ? parsed : null;
    const sanitized = rawRecord
      ? stripDeprecatedConfigKeys(rawRecord)
      : { sanitized: parsed, removed: [] };
    if (sanitized.removed.length > 0) warnDeprecatedConfigKeys(sanitized.removed);
    const validated = validateConfig(sanitized.sanitized);
    return {
      path: filePath,
      exists: true,
      config: validated,
      raw: (sanitized.sanitized ?? parsed) as Record<string, unknown>,
    };
  } catch (err) {
    const errno = toErrnoException(err);
    if (errno?.code === "ENOENT") {
      const def = defaultConfig();
      return {
        path: filePath,
        exists: false,
        config: def,
        raw: def as unknown as Record<string, unknown>,
      };
    }
    throw err;
  }
}

export async function saveConfig(
  agentplaneDir: string,
  raw: Record<string, unknown>,
): Promise<AgentplaneConfig> {
  const sanitized = stripDeprecatedConfigKeys(raw);
  if (sanitized.removed.length > 0) warnDeprecatedConfigKeys(sanitized.removed);
  const validated = validateConfig(sanitized.sanitized);
  await mkdir(agentplaneDir, { recursive: true });
  const filePath = path.join(agentplaneDir, "config.json");
  const text = `${JSON.stringify(sanitized.sanitized, null, 2)}\n`;
  await atomicWriteFile(filePath, text, "utf8");
  return validated;
}
