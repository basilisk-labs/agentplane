import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type WorkflowMode = "direct" | "branch_pr";
export type StatusCommitPolicy = "off" | "warn" | "confirm";

export type AgentplaneConfig = {
  schema_version: 1;
  workflow_mode: WorkflowMode;
  status_commit_policy: StatusCommitPolicy;
  finish_auto_status_commit: boolean;
  base_branch: string;
  paths: {
    agents_dir: string;
    agentctl_docs_path: string;
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
  return {
    schema_version: 1,
    workflow_mode: "direct",
    status_commit_policy: "warn",
    finish_auto_status_commit: true,
    base_branch: "main",
    paths: {
      agents_dir: ".agentplane/agents",
      agentctl_docs_path: ".agentplane/agentctl.md",
      tasks_path: ".agentplane/tasks.json",
      workflow_dir: ".agentplane/tasks",
      worktrees_dir: ".agentplane/worktrees",
    },
    branch: { task_prefix: "task" },
    framework: { source: "https://github.com/basilisk-labs/agent-plane", last_update: null },
    tasks: {
      id_suffix_length_default: 6,
      verify: { required_tags: ["code", "backend", "frontend"] },
      doc: {
        sections: [
          "Summary",
          "Context",
          "Scope",
          "Risks",
          "Verify Steps",
          "Rollback Plan",
          "Notes",
        ],
        required_sections: ["Summary", "Scope", "Risks", "Verify Steps", "Rollback Plan"],
      },
      comments: {
        start: { prefix: "Start:", min_chars: 40 },
        blocked: { prefix: "Blocked:", min_chars: 40 },
        verified: { prefix: "Verified:", min_chars: 60 },
      },
    },
    commit: {
      generic_tokens: ["start", "status", "mark", "done", "wip", "update", "tasks", "task"],
    },
    tasks_backend: { config_path: ".agentplane/backends/local/backend.json" },
    closure_commit_requires_approval: false,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

export function validateConfig(raw: unknown): AgentplaneConfig {
  if (!isRecord(raw)) throw new TypeError("config must be an object");
  if (raw.schema_version !== 1) throw new Error("config.schema_version must be 1");
  if (raw.workflow_mode !== "direct" && raw.workflow_mode !== "branch_pr") {
    throw new Error("config.workflow_mode must be 'direct' or 'branch_pr'");
  }
  if (
    raw.status_commit_policy !== "off" &&
    raw.status_commit_policy !== "warn" &&
    raw.status_commit_policy !== "confirm"
  ) {
    throw new Error("config.status_commit_policy must be 'off' | 'warn' | 'confirm'");
  }
  if (typeof raw.finish_auto_status_commit !== "boolean")
    throw new Error("config.finish_auto_status_commit must be boolean");
  if (typeof raw.base_branch !== "string" || raw.base_branch.length === 0)
    throw new Error("config.base_branch must be string");
  if (!isRecord(raw.paths)) throw new Error("config.paths must be object");
  if (!isRecord(raw.branch)) throw new Error("config.branch must be object");
  if (!isRecord(raw.framework)) throw new Error("config.framework must be object");
  if (!isRecord(raw.tasks)) throw new Error("config.tasks must be object");
  if (!isRecord(raw.commit)) throw new Error("config.commit must be object");
  if (!isRecord(raw.tasks_backend)) throw new Error("config.tasks_backend must be object");
  if (typeof raw.closure_commit_requires_approval !== "boolean") {
    throw new Error("config.closure_commit_requires_approval must be boolean");
  }

  // Minimal path fields validation.
  for (const key of [
    "agents_dir",
    "agentctl_docs_path",
    "tasks_path",
    "workflow_dir",
    "worktrees_dir",
  ] as const) {
    const v = raw.paths[key];
    if (typeof v !== "string" || v.length === 0)
      throw new Error(`config.paths.${key} must be string`);
  }
  if (typeof raw.branch.task_prefix !== "string" || raw.branch.task_prefix.length === 0) {
    throw new Error("config.branch.task_prefix must be string");
  }
  if (typeof raw.framework.source !== "string" || raw.framework.source.length === 0) {
    throw new Error("config.framework.source must be string");
  }
  if (raw.framework.last_update !== null && typeof raw.framework.last_update !== "string") {
    throw new Error("config.framework.last_update must be string or null");
  }
  if (!isRecord(raw.tasks.verify) || !Array.isArray(raw.tasks.verify.required_tags)) {
    throw new Error("config.tasks.verify.required_tags must be array");
  }
  if (
    typeof raw.tasks.id_suffix_length_default !== "number" ||
    !Number.isInteger(raw.tasks.id_suffix_length_default)
  ) {
    throw new Error("config.tasks.id_suffix_length_default must be integer");
  }
  if (
    !isRecord(raw.tasks.doc) ||
    !Array.isArray(raw.tasks.doc.sections) ||
    !Array.isArray(raw.tasks.doc.required_sections)
  ) {
    throw new Error("config.tasks.doc.sections and required_sections must be arrays");
  }
  if (!isRecord(raw.tasks.comments)) throw new Error("config.tasks.comments must be object");
  for (const k of ["start", "blocked", "verified"] as const) {
    const policy = raw.tasks.comments[k];
    if (
      !isRecord(policy) ||
      typeof policy.prefix !== "string" ||
      typeof policy.min_chars !== "number"
    ) {
      throw new Error(`config.tasks.comments.${k} must have prefix/min_chars`);
    }
  }
  if (!Array.isArray(raw.commit.generic_tokens))
    throw new Error("config.commit.generic_tokens must be array");
  if (
    typeof raw.tasks_backend.config_path !== "string" ||
    raw.tasks_backend.config_path.length === 0
  ) {
    throw new Error("config.tasks_backend.config_path must be string");
  }

  // At this point, raw satisfies the minimal contract; keep unknown fields by returning it as-is.
  return raw as unknown as AgentplaneConfig;
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
    const validated = validateConfig(parsed);
    return {
      path: filePath,
      exists: true,
      config: validated,
      raw: parsed as Record<string, unknown>,
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
  const validated = validateConfig(raw);
  await mkdir(agentplaneDir, { recursive: true });
  const filePath = path.join(agentplaneDir, "config.json");
  const text = `${JSON.stringify(raw, null, 2)}\n`;
  await writeFile(filePath, text, "utf8");
  return validated;
}
