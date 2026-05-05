import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import { resolveProject, type ResolvedProject } from "@agentplaneorg/core/project";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { loadConfig } from "@agentplaneorg/core/config";

import { loadDotEnv } from "../../shared/env.js";
import { isRecord } from "../../shared/guards.js";

import { LocalBackend } from "./local-backend.js";
import { RedmineBackend, type RedmineSettings } from "./redmine-backend.js";
import { CloudBackend, type CloudBackendSettings } from "./cloud-backend.js";
import { toStringSafe, type TaskBackend } from "./shared.js";

type BackendConfig = {
  id?: string;
  version?: number;
  module?: string;
  class?: string;
  settings?: Record<string, unknown>;
};

type NormalizedBackendConfig = {
  id: string;
  version: number;
  settings: Record<string, unknown>;
};

type TaskBackendLoaderContext = {
  resolved: ResolvedProject;
  config: AgentplaneConfig;
  settings: Record<string, unknown>;
};

type TaskBackendLoaderResult = {
  backend: TaskBackend;
  backendId: string;
};

type TaskBackendLoader = (
  ctx: TaskBackendLoaderContext,
) => TaskBackendLoaderResult | Promise<TaskBackendLoaderResult>;

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

function loadLocalTaskBackend(ctx: TaskBackendLoaderContext): TaskBackendLoaderResult {
  const localDir =
    resolveMaybeRelative(ctx.resolved.gitRoot, ctx.settings.dir) ??
    path.join(ctx.resolved.gitRoot, ctx.config.paths.workflow_dir);
  return {
    backend: new LocalBackend({ dir: localDir }),
    backendId: "local",
  };
}

async function loadRedmineTaskBackend(
  ctx: TaskBackendLoaderContext,
): Promise<TaskBackendLoaderResult> {
  await loadDotEnv(ctx.resolved.gitRoot);
  const cacheDirRaw = resolveMaybeRelative(ctx.resolved.gitRoot, ctx.settings.cache_dir);
  const cacheDir = cacheDirRaw ?? path.join(ctx.resolved.gitRoot, ctx.config.paths.workflow_dir);
  const cache = cacheDir ? new LocalBackend({ dir: cacheDir }) : null;
  return {
    backend: new RedmineBackend(ctx.settings as RedmineSettings, { cache }),
    backendId: "redmine",
  };
}

async function loadCloudTaskBackend(
  ctx: TaskBackendLoaderContext,
): Promise<TaskBackendLoaderResult> {
  const cacheDirRaw = resolveMaybeRelative(ctx.resolved.gitRoot, ctx.settings.cache_dir);
  const cacheDir = cacheDirRaw ?? path.join(ctx.resolved.gitRoot, ctx.config.paths.workflow_dir);
  const cache = new LocalBackend({ dir: cacheDir });
  return {
    backend: await CloudBackend.create({
      root: ctx.resolved.gitRoot,
      settings: ctx.settings as CloudBackendSettings,
      cache,
    }),
    backendId: "cloud",
  };
}

const TASK_BACKEND_LOADERS: Record<string, TaskBackendLoader> = {
  local: loadLocalTaskBackend,
  redmine: loadRedmineTaskBackend,
  cloud: loadCloudTaskBackend,
};

function resolveTaskBackendLoader(backendId: string): TaskBackendLoader {
  return TASK_BACKEND_LOADERS[backendId] ?? TASK_BACKEND_LOADERS.local;
}

async function instantiateTaskBackend(opts: {
  resolved: ResolvedProject;
  config: AgentplaneConfig;
}): Promise<{
  backend: TaskBackend;
  backendId: string;
  resolved: ResolvedProject;
  config: AgentplaneConfig;
  backendConfigPath: string;
}> {
  const backendConfigPath = path.join(opts.resolved.gitRoot, opts.config.tasks_backend.config_path);
  const backendConfig = await loadBackendConfig(backendConfigPath);
  const normalized = normalizeBackendConfig(backendConfig);
  const backendId = normalized.id;
  const settings = normalized.settings;
  const loaded = await resolveTaskBackendLoader(backendId)({
    resolved: opts.resolved,
    config: opts.config,
    settings,
  });
  return {
    backend: loaded.backend,
    backendId: loaded.backendId,
    resolved: opts.resolved,
    config: opts.config,
    backendConfigPath,
  };
}

function resolveMaybeRelative(root: string, input: unknown): string | null {
  if (!input) return null;
  const raw = toStringSafe(input).trim();
  if (!raw) return null;
  return path.isAbsolute(raw) ? raw : path.join(root, raw);
}

function normalizeBackendConfig(raw: unknown): NormalizedBackendConfig {
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
  resolvedProject?: ResolvedProject;
  config?: AgentplaneConfig;
}): Promise<{
  backend: TaskBackend;
  backendId: string;
  resolved: ResolvedProject;
  config: AgentplaneConfig;
  backendConfigPath: string;
}> {
  const resolved =
    opts.resolvedProject ??
    (await resolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  if (opts.config) {
    return await instantiateTaskBackend({ resolved, config: opts.config });
  }
  const loadedConfig = await loadConfig(resolved.agentplaneDir);
  const config = loadedConfig.config;
  return await instantiateTaskBackend({ resolved, config });
}
