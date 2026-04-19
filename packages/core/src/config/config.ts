import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import type { ZodIssue } from "zod";

import { atomicWriteFile } from "../fs/atomic-write.js";
import {
  AgentplaneConfigSchema,
  type AgentplaneConfig as AgentplaneConfigShape,
} from "./config-zod.js";

export type AgentplaneConfig = AgentplaneConfigShape;

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

export function defaultConfig(): AgentplaneConfig {
  return structuredClone(DEFAULT_CONFIG);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function formatIssuePath(issue: ZodIssue): string {
  if (issue.path.length === 0) return "config";
  return `config/${issue.path.map(String).join("/")}`;
}

function formatIssue(issue: ZodIssue): string {
  const pathLabel = formatIssuePath(issue);

  switch (issue.code) {
    case "invalid_type": {
      if (issue.expected === "object") return `${pathLabel} must be object`;
      if (issue.expected === "boolean") return `${pathLabel} must be boolean`;
      if (issue.expected === "array") return `${pathLabel} must be array`;
      if (issue.expected === "string") return `${pathLabel} must be string`;
      if (issue.expected === "number") return `${pathLabel} must be number`;
      return `${pathLabel} has invalid type`;
    }
    case "invalid_literal":
    case "invalid_enum_value":
    case "too_small":
    case "too_big":
    case "invalid_string": {
      return pathLabel;
    }
    default: {
      return issue.message ? `${pathLabel}: ${issue.message}` : pathLabel;
    }
  }
}

function formatSchemaErrors(issues: ZodIssue[]): string {
  if (issues.length === 0) return "config schema validation failed";
  return issues.map((issue) => formatIssue(issue)).join("; ");
}

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
  for (const key of keys) {
    console.warn(`config key "${key}" is deprecated and ignored`);
  }
}

export function validateConfig(raw: unknown): AgentplaneConfig {
  let candidate =
    raw && typeof raw === "object" ? structuredClone(raw as Record<string, unknown>) : raw;
  if (isRecord(candidate)) {
    candidate = stripDeprecatedConfigKeys(candidate).sanitized;
  }

  const parsed = AgentplaneConfigSchema.safeParse(candidate);
  if (!parsed.success) {
    throw new Error(formatSchemaErrors(parsed.error.issues));
  }

  if (!isRecord(parsed.data)) {
    throw new Error("config must be an object");
  }

  return parsed.data;
}

const DEFAULT_CONFIG = validateConfig({});

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
    const rawRecord = isRecord(parsed) ? parsed : null;
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
  let current: Record<string, unknown> = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!part) continue;
    const next = current[part];
    if (!isRecord(next)) {
      current[part] = {};
    }
    current = current[part] as Record<string, unknown>;
  }
  const last = parts.at(-1);
  if (!last) throw new Error("config key must be non-empty");
  current[last] = parseScalar(value);
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
