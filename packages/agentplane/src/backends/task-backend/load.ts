import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  loadConfig,
  resolveProject,
  type AgentplaneConfig,
  type ResolvedProject,
} from "@agentplaneorg/core";

import { loadDotEnv } from "../../shared/env.js";
import { isRecord } from "../../shared/guards.js";

import { LocalBackend } from "./local-backend.js";
import { RedmineBackend, type RedmineSettings } from "./redmine-backend.js";
import { toStringSafe, type TaskBackend } from "./shared.js";

type BackendConfig = {
  id?: string;
  version?: number;
  module?: string;
  class?: string;
  settings?: Record<string, unknown>;
};

async function loadBackendConfig(configPath: string): Promise<BackendConfig | null> {
  try {
    const raw = JSON.parse(await readFile(configPath, "utf8")) as unknown;
    return isRecord(raw) ? (raw as BackendConfig) : null;
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
}

function resolveMaybeRelative(root: string, input: unknown): string | null {
  if (!input) return null;
  const raw = toStringSafe(input).trim();
  if (!raw) return null;
  return path.isAbsolute(raw) ? raw : path.join(root, raw);
}

function normalizeBackendConfig(raw: unknown): {
  id: string;
  version: number;
  settings: Record<string, unknown>;
} {
  if (!isRecord(raw)) {
    return { id: "local", version: 1, settings: {} };
  }
  const id = toStringSafe(raw.id).trim() || "local";
  const version = typeof raw.version === "number" ? raw.version : 1;
  const settings = isRecord(raw.settings) ? raw.settings : {};
  return { id, version, settings };
}

export async function loadTaskBackend(opts: {
  cwd: string;
  rootOverride?: string | null;
}): Promise<{
  backend: TaskBackend;
  backendId: string;
  resolved: ResolvedProject;
  config: AgentplaneConfig;
  backendConfigPath: string;
}> {
  const resolved = await resolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
  const loaded = await loadConfig(resolved.agentplaneDir);
  const backendConfigPath = path.join(resolved.gitRoot, loaded.config.tasks_backend.config_path);
  const backendConfig = await loadBackendConfig(backendConfigPath);
  const normalized = normalizeBackendConfig(backendConfig);
  const backendId = normalized.id;
  const settings = normalized.settings;

  if (backendId === "redmine") {
    await loadDotEnv(resolved.gitRoot);
    const cacheDirRaw = resolveMaybeRelative(resolved.gitRoot, settings.cache_dir);
    const cacheDir = cacheDirRaw ?? path.join(resolved.gitRoot, loaded.config.paths.workflow_dir);
    const cache = cacheDir ? new LocalBackend({ dir: cacheDir }) : null;
    const redmine = new RedmineBackend(settings as RedmineSettings, { cache });
    return { backend: redmine, backendId, resolved, config: loaded.config, backendConfigPath };
  }

  const localDir =
    resolveMaybeRelative(resolved.gitRoot, settings.dir) ??
    path.join(resolved.gitRoot, loaded.config.paths.workflow_dir);
  const local = new LocalBackend({ dir: localDir });
  return { backend: local, backendId: "local", resolved, config: loaded.config, backendConfigPath };
}
