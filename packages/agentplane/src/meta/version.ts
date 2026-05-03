import { readFileSync } from "node:fs";

import { resolveAgentplanePackageJsonPath } from "../shared/package-paths.js";

declare const __AGENTPLANE_PACKAGE_VERSION__: string | undefined;

let cachedVersion: string | null = null;

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
    const raw = readFileSync(resolveAgentplanePackageJsonPath(), "utf8");
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
