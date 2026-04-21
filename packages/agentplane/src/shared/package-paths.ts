import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const PACKAGE_NAME = "agentplane";
const ACTIVE_BIN_ENV = "AGENTPLANE_RUNTIME_ACTIVE_BIN";

type PackageJsonLike = {
  name?: unknown;
};

function pathExists(absPath: string): boolean {
  try {
    fs.accessSync(absPath);
    return true;
  } catch {
    return false;
  }
}

function readPackageName(packageRoot: string): string | null {
  try {
    const parsed = JSON.parse(
      fs.readFileSync(path.join(packageRoot, "package.json"), "utf8"),
    ) as PackageJsonLike;
    return typeof parsed.name === "string" ? parsed.name : null;
  } catch {
    return null;
  }
}

function findPackageRoot(startPath: string, expectedName = PACKAGE_NAME): string | null {
  let dir = path.resolve(startPath);
  if (path.extname(dir)) dir = path.dirname(dir);
  for (;;) {
    if (
      pathExists(path.join(dir, "package.json")) &&
      (!expectedName || readPackageName(dir) === expectedName)
    ) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

function resolveFromActiveBin(): string | null {
  const activeBin = String(process.env[ACTIVE_BIN_ENV] ?? "").trim();
  if (!activeBin) return null;
  return findPackageRoot(activeBin);
}

function resolveFromPackageJson(entryModuleUrl: string): string | null {
  try {
    const req = createRequire(entryModuleUrl);
    return findPackageRoot(req.resolve("agentplane/package.json"));
  } catch {
    return null;
  }
}

export function resolveAgentplanePackageRoot(entryModuleUrl = import.meta.url): string {
  const entryPath = fileURLToPath(entryModuleUrl);
  const packageRoot =
    resolveFromActiveBin() ?? findPackageRoot(entryPath) ?? resolveFromPackageJson(entryModuleUrl);
  if (!packageRoot) {
    throw new Error("Unable to resolve agentplane package root.");
  }
  return packageRoot;
}

export function resolveAgentplanePackageJsonPath(entryModuleUrl = import.meta.url): string {
  return path.join(resolveAgentplanePackageRoot(entryModuleUrl), "package.json");
}

export function resolveAgentplaneAssetPath(...segments: string[]): string {
  return path.join(resolveAgentplanePackageRoot(), "assets", ...segments);
}

export function resolveAgentplaneAssetUrl(...segments: string[]): URL {
  return pathToFileURL(resolveAgentplaneAssetPath(...segments));
}

export function resolveAgentplaneAssetDirUrl(...segments: string[]): URL {
  return pathToFileURL(`${resolveAgentplaneAssetPath(...segments)}${path.sep}`);
}

export function resolveAgentplaneBinPath(): string {
  return path.join(resolveAgentplanePackageRoot(), "bin", "agentplane.js");
}

export function resolveAgentplaneRepoScriptPath(...segments: string[]): string {
  return path.resolve(resolveAgentplanePackageRoot(), "..", "..", "scripts", ...segments);
}
