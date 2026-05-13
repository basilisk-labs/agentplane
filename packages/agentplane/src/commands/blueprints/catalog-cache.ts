import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { ValidationError } from "../../shared/errors.js";
import { writeJsonStableIfChanged } from "../../shared/write-if-changed.js";
import type { CatalogBlueprintManifest, CatalogEntry } from "./catalog.js";

function isHttpUrl(value: string): boolean {
  return value.startsWith("http://") || value.startsWith("https://");
}

function assertSafeCatalogPathSegment(value: string, label: string): void {
  if (
    !value ||
    value === "." ||
    value === ".." ||
    value.includes("..") ||
    value.includes("/") ||
    value.includes("\\")
  ) {
    throw new ValidationError({
      message: `${label} must be a safe path segment.`,
      context: { value },
    });
  }
}

export function pickLatestVersion(
  entry: CatalogEntry,
  opts: { agentplaneVersion?: string | null } = {},
): NonNullable<CatalogEntry["versions"]>[number] {
  const versions = entry.versions ?? [];
  if (versions.length === 0) {
    throw new ValidationError({ message: `Blueprint ${entry.id} has no installable versions.` });
  }
  const candidates =
    opts.agentplaneVersion && parseSemver(opts.agentplaneVersion)
      ? versions.filter((version) =>
          isVersionCompatible(opts.agentplaneVersion!, version.min_agentplane_version),
        )
      : versions;
  if (candidates.length === 0) {
    throw new ValidationError({
      message: `Blueprint ${entry.id} has no installable versions compatible with AgentPlane ${opts.agentplaneVersion}.`,
    });
  }
  return candidates.toSorted((a, b) => compareSemverish(a.version, b.version)).at(-1)!;
}

function parseSemver(version: string): [number, number, number] | null {
  const match = /^v?(\d+)\.(\d+)\.(\d+)(?:[-+].*)?$/u.exec(version.trim());
  if (!match) return null;
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function compareSemverish(left: string, right: string): number {
  const parsedLeft = parseSemver(left);
  const parsedRight = parseSemver(right);
  if (parsedLeft && parsedRight) {
    for (let idx = 0; idx < parsedLeft.length; idx += 1) {
      const delta = parsedLeft[idx] - parsedRight[idx];
      if (delta !== 0) return delta;
    }
    return 0;
  }
  return left.localeCompare(right, undefined, { numeric: true });
}

function isVersionCompatible(agentplaneVersion: string, minAgentplaneVersion?: string): boolean {
  if (!minAgentplaneVersion) return true;
  const current = parseSemver(agentplaneVersion);
  const minimum = parseSemver(minAgentplaneVersion);
  if (!current || !minimum) return true;
  return compareSemverish(agentplaneVersion, minAgentplaneVersion) >= 0;
}

export async function resolvePackageRoot(extractedDir: string): Promise<string> {
  const rootManifest = path.join(extractedDir, "blueprint.json");
  try {
    await readFile(rootManifest, "utf8");
    return extractedDir;
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code !== "ENOENT") throw err;
  }

  const entries = await readdir(extractedDir, { withFileTypes: true });
  const dirs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  if (dirs.length !== 1) {
    throw new ValidationError({
      message:
        "Blueprint package archive must contain blueprint.json at root or exactly one root directory.",
    });
  }

  const candidate = path.join(extractedDir, dirs[0]);
  await readFile(path.join(candidate, "blueprint.json"), "utf8");
  return candidate;
}

export async function cacheBlueprintPackage(opts: {
  agentplaneHome: string;
  manifest: CatalogBlueprintManifest;
  manifestSource: string;
  definitionText: string;
}): Promise<string> {
  assertSafeCatalogPathSegment(opts.manifest.id, "Catalog blueprint manifest id");
  assertSafeCatalogPathSegment(opts.manifest.version, "Catalog blueprint manifest version");
  const catalogTarget = path.join(
    opts.agentplaneHome,
    "blueprint-catalog",
    opts.manifest.id,
    opts.manifest.version,
  );
  await rm(catalogTarget, { recursive: true, force: true });
  await mkdir(path.dirname(catalogTarget), { recursive: true });

  if (!isHttpUrl(opts.manifestSource)) {
    await cp(path.dirname(opts.manifestSource), catalogTarget, { recursive: true });
    return catalogTarget;
  }

  await mkdir(catalogTarget, { recursive: true });
  await writeJsonStableIfChanged(path.join(catalogTarget, "blueprint.json"), opts.manifest);
  const definitionTarget = path.resolve(catalogTarget, opts.manifest.definition.path);
  const catalogRoot = `${catalogTarget}${path.sep}`;
  if (!definitionTarget.startsWith(catalogRoot)) {
    throw new ValidationError({
      message: "Catalog blueprint definition.path must stay within the blueprint package.",
      context: { path: opts.manifest.definition.path },
    });
  }

  await mkdir(path.dirname(definitionTarget), { recursive: true });
  await writeFile(definitionTarget, opts.definitionText, "utf8");
  return catalogTarget;
}
