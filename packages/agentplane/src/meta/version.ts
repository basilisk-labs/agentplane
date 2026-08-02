import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

declare const __AGENTPLANE_PACKAGE_VERSION__: string | undefined;

let cachedVersion: string | null = null;

function resolveLocalPackageJsonPath(): string | null {
  let directory = path.dirname(fileURLToPath(import.meta.url));
  for (;;) {
    const candidate = path.join(directory, "package.json");
    try {
      const parsed = JSON.parse(readFileSync(candidate, "utf8")) as { name?: unknown };
      if (parsed.name === "agentplane") return candidate;
    } catch {
      // Keep walking toward the package root.
    }
    const parent = path.dirname(directory);
    if (parent === directory) return null;
    directory = parent;
  }
}

function getEmbeddedVersion(): string | null {
  try {
    if (typeof __AGENTPLANE_PACKAGE_VERSION__ === "string") {
      const version = __AGENTPLANE_PACKAGE_VERSION__.trim();
      return version || null;
    }
  } catch {
    return null;
  }
  return null;
}

export function getVersion(): string {
  if (cachedVersion) return cachedVersion;
  const embeddedVersion = getEmbeddedVersion();
  if (embeddedVersion) {
    cachedVersion = embeddedVersion;
    return cachedVersion;
  }
  try {
    const packageJsonPath = resolveLocalPackageJsonPath();
    if (!packageJsonPath) return "0.0.0";
    const raw = readFileSync(packageJsonPath, "utf8");
    const parsed = JSON.parse(raw) as { version?: string };
    if (parsed.version) {
      cachedVersion = String(parsed.version).trim();
      if (cachedVersion) return cachedVersion;
    }
  } catch {
    // Fall through to default.
  }
  return "0.0.0";
}
