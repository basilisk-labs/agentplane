import { readFileSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import type { ErrorObject, Options, ValidateFunction } from "ajv";
import AjvModule from "ajv";
import AjvFormatsModule from "ajv-formats";

export type WorkflowMode = "direct" | "branch_pr";
export type StatusCommitPolicy = "off" | "warn" | "confirm";

export type AgentplaneConfig = {
  schema_version: 1;
  workflow_mode: WorkflowMode;
  status_commit_policy: StatusCommitPolicy;
  finish_auto_status_commit: boolean;
  agents?: {
    approvals: {
      require_plan: boolean;
      require_network: boolean;
      require_verify: boolean;
    };
  };
  recipes?: {
    storage_default: "link" | "copy" | "global";
  };
  paths: {
    agents_dir: string;
    tasks_path: string;
    workflow_dir: string;
    worktrees_dir: string;
  };
  branch: { task_prefix: string };
  framework: { source: string; last_update: string | null };
  tasks: {
    id_suffix_length_default: number;
    verify: { required_tags: string[] };
    doc: { sections: string[]; required_sections: string[] };
    comments: {
      start: { prefix: string; min_chars: number };
      blocked: { prefix: string; min_chars: number };
      verified: { prefix: string; min_chars: number };
    };
  };
  commit: { generic_tokens: string[] };
  tasks_backend: { config_path: string };
  closure_commit_requires_approval: boolean;
};

export function defaultConfig(): AgentplaneConfig {
  return structuredClone(DEFAULT_CONFIG);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

const CONFIG_SCHEMA_URL = new URL("../../schemas/config.schema.json", import.meta.url);
const CONFIG_SCHEMA = JSON.parse(readFileSync(fileURLToPath(CONFIG_SCHEMA_URL), "utf8")) as Record<
  string,
  unknown
>;

type AjvInstance = {
  compile: <T>(schema: unknown) => ValidateFunction<T>;
  errorsText: (errors?: ErrorObject[] | null, opts?: { dataVar?: string }) => string;
};

type AjvConstructor = new (opts?: Options) => AjvInstance;
type AjvFormats = (ajv: AjvInstance) => void;

const Ajv =
  (AjvModule as unknown as { default?: AjvConstructor }).default ??
  (AjvModule as unknown as AjvConstructor);

const addFormats =
  (AjvFormatsModule as unknown as { default?: AjvFormats }).default ??
  (AjvFormatsModule as unknown as AjvFormats);

const AJV = new Ajv({
  allErrors: true,
  allowUnionTypes: true,
  useDefaults: true,
  strict: false,
});
addFormats(AJV);

const validateSchema = AJV.compile<AgentplaneConfig>(CONFIG_SCHEMA);

function formatSchemaErrors(errors: ErrorObject[] | null | undefined): string {
  if (!errors || errors.length === 0) return "config schema validation failed";
  return AJV.errorsText(errors, { dataVar: "config" });
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
  if (!validateSchema(candidate)) {
    throw new Error(formatSchemaErrors(validateSchema.errors));
  }
  if (!isRecord(candidate)) {
    throw new Error("config must be an object");
  }
  return candidate;
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
  await writeFile(filePath, text, "utf8");
  return validated;
}
