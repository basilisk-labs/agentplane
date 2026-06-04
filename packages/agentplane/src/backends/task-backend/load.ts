import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import { resolveProject, type ResolvedProject } from "@agentplaneorg/core/project";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { loadConfig } from "@agentplaneorg/core/config";

import { isRecord } from "../../shared/guards.js";

import { LocalBackend } from "./local-backend.js";
import { CloudBackend, type CloudBackendSettings } from "./cloud-backend.js";
import { BackendError, toStringSafe, type TaskBackend } from "./shared.js";

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

async function loadCloudTaskBackend(
  ctx: TaskBackendLoaderContext,
): Promise<TaskBackendLoaderResult> {
  const cacheDirRaw = resolveMaybeRelative(ctx.resolved.gitRoot, ctx.settings.cache_dir);
  const cacheDir = cacheDirRaw ?? path.join(ctx.resolved.gitRoot, ctx.config.paths.workflow_dir);
  const cache = new LocalBackend({ dir: cacheDir });
  const autoSyncNetworkAllowed = ctx.config.agents?.approvals?.require_network !== true;
  return {
    backend: await CloudBackend.create({
      root: ctx.resolved.gitRoot,
      settings: ctx.settings as CloudBackendSettings,
      cache,
      autoSyncNetworkAllowed,
    }),
    backendId: "cloud",
  };
}

const TASK_BACKEND_LOADERS: Record<string, TaskBackendLoader> = {
  local: loadLocalTaskBackend,
  cloud: loadCloudTaskBackend,
};

function describeBackendConfigPath(opts: { gitRoot: string; backendConfigPath: string }): string {
  const relative = path.relative(opts.gitRoot, opts.backendConfigPath).replaceAll("\\", "/");
  return relative.length > 0 && !relative.startsWith("..") ? relative : opts.backendConfigPath;
}

function movedRedmineBackendMessage(opts: { gitRoot: string; backendConfigPath: string }): string {
  const configPath = describeBackendConfigPath(opts);
  return [
    "The direct Redmine task backend has moved to AgentPlane Cloud sync.",
    "Why: Redmine is no longer supported as a direct local backend adapter.",
    `Fix: edit ${configPath} and set \`"id": "cloud"\` to use AgentPlane Cloud sync, or \`"id": "local"\` to fall back to repo-local task files under \`.agentplane/tasks\`.`,
    "Safe command: agentplane config show",
    "Stop condition: stop if another tool manages this backend config and would immediately overwrite the manual change.",
  ].join("\n");
}

function unsupportedBackendMessage(opts: {
  backendId: string;
  gitRoot: string;
  backendConfigPath: string;
}): string {
  const configPath = describeBackendConfigPath(opts);
  return [
    `Unsupported task backend '${opts.backendId}'. Supported backends: local, cloud.`,
    `Fix: edit ${configPath} and set \`"id": "local"\` to use repo-local task files under \`.agentplane/tasks\`, or \`"id": "cloud"\` to use AgentPlane Cloud sync.`,
    "Safe command: agentplane config show",
    "Stop condition: stop if this backend id came from automation you do not intend to replace manually.",
  ].join("\n");
}

function resolveTaskBackendLoader(opts: {
  backendId: string;
  gitRoot: string;
  backendConfigPath: string;
}): TaskBackendLoader {
  const loader = TASK_BACKEND_LOADERS[opts.backendId];
  if (loader) return loader;
  if (opts.backendId === "redmine") {
    throw new BackendError(movedRedmineBackendMessage(opts), "E_BACKEND");
  }
  throw new BackendError(unsupportedBackendMessage(opts), "E_BACKEND");
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
  const loaded = await resolveTaskBackendLoader({
    backendId,
    gitRoot: opts.resolved.gitRoot,
    backendConfigPath,
  })({
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
