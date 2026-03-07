import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

import {
  resolveFrameworkBinaryContext,
  type FrameworkBinaryContext,
} from "../../bin/runtime-context.js";

const ACTIVE_BIN_ENV = "AGENTPLANE_RUNTIME_ACTIVE_BIN";
const HANDOFF_FROM_ENV = "AGENTPLANE_RUNTIME_HANDOFF_FROM";
const HANDOFF_FLAG_ENV = "AGENTPLANE_REPO_LOCAL_HANDOFF";
const FORCE_GLOBAL_ENV = "AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK";

export type RuntimeMode =
  | "global-installed"
  | "global-in-framework"
  | "global-forced-in-framework"
  | "repo-local"
  | "repo-local-handoff";

export type ResolvedPackageInfo = {
  name: string;
  version: string | null;
  packageRoot: string | null;
  packageJsonPath: string | null;
};

export type RuntimeSourceInfo = {
  cwd: string;
  activeBinaryPath: string | null;
  handoffFromBinaryPath: string | null;
  mode: RuntimeMode;
  framework: FrameworkBinaryContext;
  frameworkSources: {
    repoRoot: string | null;
    agentplaneRoot: string | null;
    coreRoot: string | null;
  };
  agentplane: ResolvedPackageInfo;
  core: ResolvedPackageInfo;
};

export type ResolveRuntimeSourceInfoOptions = {
  cwd?: string;
  env?: NodeJS.ProcessEnv;
  activeBinaryPath?: string | null;
  entryModuleUrl?: string;
  agentplanePackageRoot?: string | null;
  corePackageJsonPath?: string | null;
};

type PackageJsonLike = {
  name?: unknown;
  version?: unknown;
};

function pathExists(absPath: string): boolean {
  try {
    fs.accessSync(absPath);
    return true;
  } catch {
    return false;
  }
}

function readJsonFile(absPath: string): PackageJsonLike | null {
  try {
    return JSON.parse(fs.readFileSync(absPath, "utf8")) as PackageJsonLike;
  } catch {
    return null;
  }
}

function resolvePackageInfo(packageJsonPath: string | null): ResolvedPackageInfo {
  if (!packageJsonPath) {
    return {
      name: "unknown",
      version: null,
      packageRoot: null,
      packageJsonPath: null,
    };
  }
  const parsed = readJsonFile(packageJsonPath);
  return {
    name:
      typeof parsed?.name === "string" ? parsed.name : path.basename(path.dirname(packageJsonPath)),
    version: typeof parsed?.version === "string" ? parsed.version : null,
    packageRoot: path.dirname(packageJsonPath),
    packageJsonPath,
  };
}

function findPackageRoot(startPath: string, expectedName?: string): string | null {
  let dir = path.resolve(startPath);
  if (path.extname(dir)) dir = path.dirname(dir);
  for (;;) {
    const packageJsonPath = path.join(dir, "package.json");
    if (pathExists(packageJsonPath)) {
      if (!expectedName) return dir;
      const parsed = readJsonFile(packageJsonPath);
      if (parsed?.name === expectedName) return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

function resolveAgentplanePackageInfo(
  options: ResolveRuntimeSourceInfoOptions,
): ResolvedPackageInfo {
  const explicitRoot = options.agentplanePackageRoot
    ? path.resolve(options.agentplanePackageRoot)
    : null;
  const entryModuleUrl = options.entryModuleUrl ?? import.meta.url;
  const inferredRoot =
    explicitRoot ??
    findPackageRoot(fileURLToPath(entryModuleUrl), "agentplane") ??
    findPackageRoot(fileURLToPath(entryModuleUrl));
  if (!inferredRoot) {
    return { name: "agentplane", version: null, packageRoot: null, packageJsonPath: null };
  }
  return resolvePackageInfo(path.join(inferredRoot, "package.json"));
}

function resolveCorePackageInfo(options: ResolveRuntimeSourceInfoOptions): ResolvedPackageInfo {
  if (options.corePackageJsonPath) {
    return resolvePackageInfo(path.resolve(options.corePackageJsonPath));
  }
  try {
    const req = createRequire(options.entryModuleUrl ?? import.meta.url);
    const entryPath = req.resolve("@agentplaneorg/core");
    const packageRoot = findPackageRoot(entryPath, "@agentplaneorg/core");
    return resolvePackageInfo(packageRoot ? path.join(packageRoot, "package.json") : null);
  } catch {
    return { name: "@agentplaneorg/core", version: null, packageRoot: null, packageJsonPath: null };
  }
}

function normalizePath(value: string | null | undefined): string | null {
  const trimmed = String(value ?? "").trim();
  return trimmed.length > 0 ? path.resolve(trimmed) : null;
}

function inferRuntimeMode(context: FrameworkBinaryContext, env: NodeJS.ProcessEnv): RuntimeMode {
  const handoff = (env[HANDOFF_FLAG_ENV] ?? "").trim() === "1";
  const handoffFrom = normalizePath(env[HANDOFF_FROM_ENV]);
  if (handoff && handoffFrom && context.inFrameworkCheckout && context.isRepoLocalRuntime) {
    return "repo-local-handoff";
  }
  if (context.inFrameworkCheckout && context.isRepoLocalRuntime) {
    return "repo-local";
  }
  if (context.inFrameworkCheckout && (env[FORCE_GLOBAL_ENV] ?? "").trim() === "1") {
    return "global-forced-in-framework";
  }
  if (context.inFrameworkCheckout) {
    return "global-in-framework";
  }
  return "global-installed";
}

function resolveFrameworkCoreRoot(repoRoot: string | null): string | null {
  if (!repoRoot) return null;
  const coreRoot = path.join(repoRoot, "packages", "core");
  return pathExists(path.join(coreRoot, "package.json")) ? coreRoot : null;
}

export function describeRuntimeMode(mode: RuntimeMode): string {
  return {
    "repo-local-handoff": "repo-local binary reached via handoff from a global install",
    "repo-local": "repo-local framework binary",
    "global-forced-in-framework": "global installed binary forced inside a framework checkout",
    "global-in-framework": "global installed binary running inside a framework checkout",
    "global-installed": "global installed binary",
  }[mode];
}

export function resolveRuntimeSourceInfo(
  options: ResolveRuntimeSourceInfoOptions = {},
): RuntimeSourceInfo {
  const cwd = path.resolve(options.cwd ?? process.cwd());
  const env = options.env ?? process.env;
  const agentplane = resolveAgentplanePackageInfo(options);
  const core = resolveCorePackageInfo(options);
  const fallbackBin =
    agentplane.packageRoot === null
      ? null
      : path.join(agentplane.packageRoot, "bin", "agentplane.js");
  const activeBinaryPath =
    normalizePath(options.activeBinaryPath) ??
    normalizePath(env[ACTIVE_BIN_ENV]) ??
    normalizePath(process.argv[1]) ??
    normalizePath(fallbackBin);
  const framework = resolveFrameworkBinaryContext({
    cwd,
    thisBin: activeBinaryPath ?? fallbackBin ?? cwd,
  });

  return {
    cwd,
    activeBinaryPath,
    handoffFromBinaryPath: normalizePath(env[HANDOFF_FROM_ENV]),
    mode: inferRuntimeMode(framework, env),
    framework,
    frameworkSources: {
      repoRoot: framework.checkout?.repoRoot ?? null,
      agentplaneRoot: framework.checkout?.packageRoot ?? agentplane.packageRoot,
      coreRoot: resolveFrameworkCoreRoot(framework.checkout?.repoRoot ?? null),
    },
    agentplane,
    core,
  };
}
