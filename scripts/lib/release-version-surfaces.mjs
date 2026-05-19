import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const MANIFEST_PATH = "scripts/release/version-surfaces.json";

function readJson(absPath) {
  return JSON.parse(readFileSync(absPath, "utf8"));
}

function writeJson(absPath, value) {
  writeFileSync(absPath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function assertStringArray(value, label) {
  if (!Array.isArray(value) || !value.every((entry) => typeof entry === "string")) {
    throw new Error(`Invalid release version surface manifest: ${label} must be a string array.`);
  }
  return value;
}

function normalizeSurface(raw) {
  const id = typeof raw?.id === "string" ? raw.id.trim() : "";
  const file = typeof raw?.file === "string" ? raw.file.trim() : "";
  const kind = typeof raw?.kind === "string" ? raw.kind.trim() : "";
  if (!id || !file || !kind) {
    throw new Error(
      "Invalid release version surface manifest: every surface needs id, file, kind.",
    );
  }
  return {
    ...raw,
    id,
    file,
    kind,
    required: raw.required === true,
  };
}

export function readReleaseVersionSurfaceManifest(rootDir) {
  const repoManifestPath = path.join(rootDir, MANIFEST_PATH);
  const manifestPath = existsSync(repoManifestPath)
    ? repoManifestPath
    : new URL("../release/version-surfaces.json", import.meta.url);
  const manifest = readJson(manifestPath);
  const surfaces = Array.isArray(manifest?.version_surfaces)
    ? manifest.version_surfaces.map((surface) => normalizeSurface(surface))
    : [];
  if (surfaces.length === 0) {
    throw new Error("Release version surface manifest must declare at least one surface.");
  }
  return {
    relPath: MANIFEST_PATH,
    schemaVersion: manifest.schema_version,
    surfaces,
  };
}

function getByPath(value, keys) {
  let current = value;
  for (const key of keys) {
    if (current === null || typeof current !== "object") return undefined;
    current = current[key];
  }
  return current;
}

function setByPath(value, keys, nextValue) {
  let current = value;
  for (const key of keys.slice(0, -1)) {
    if (current[key] === null || typeof current[key] !== "object") current[key] = {};
    current = current[key];
  }
  current[keys[keys.length - 1]] = nextValue;
}

function findArrayMatch(root, surface) {
  const arrayPath = assertStringArray(surface.arrayPath, `${surface.id}.arrayPath`);
  const array = getByPath(root, arrayPath);
  if (!Array.isArray(array)) return null;
  const match = surface.match && typeof surface.match === "object" ? surface.match : {};
  return (
    array.find((entry) => {
      if (entry === null || typeof entry !== "object") return false;
      return Object.entries(match).every(([key, value]) => entry[key] === value);
    }) ?? null
  );
}

function readTextConst(text, surface) {
  const name = typeof surface.name === "string" ? surface.name.trim() : "";
  if (!name) throw new Error(`Invalid release version surface manifest: ${surface.id}.name.`);
  const pattern = new RegExp(
    `export\\s+const\\s+${name.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&")}\\s*=\\s*["']([^"']+)["']\\s*;`,
    "u",
  );
  const match = pattern.exec(text);
  return typeof match?.[1] === "string" ? match[1].trim() : null;
}

function writeTextConst(text, surface, nextVersion) {
  const name = typeof surface.name === "string" ? surface.name.trim() : "";
  const pattern = new RegExp(
    `export\\s+const\\s+${name.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&")}\\s*=\\s*["'][^"']*["']\\s*;`,
    "u",
  );
  const next = text.replace(pattern, `export const ${name} = "${nextVersion}";`);
  if (next === text) {
    throw new Error(`${surface.file} must export ${name} as a string literal.`);
  }
  return next;
}

export function readReleaseVersionSurfaces(rootDir) {
  const manifest = readReleaseVersionSurfaceManifest(rootDir);
  const values = [];
  const errors = [];

  for (const surface of manifest.surfaces) {
    const absPath = path.join(rootDir, surface.file);
    if (!existsSync(absPath)) {
      if (surface.required)
        errors.push(`${surface.file}: required release version surface is missing.`);
      values.push({ ...surface, exists: false, value: null });
      continue;
    }

    try {
      if (surface.kind === "json") {
        const keys = assertStringArray(surface.path, `${surface.id}.path`);
        const value = getByPath(readJson(absPath), keys);
        values.push({
          ...surface,
          exists: true,
          value: typeof value === "string" ? value.trim() : null,
        });
        continue;
      }
      if (surface.kind === "json_array_match") {
        const keys = assertStringArray(surface.path, `${surface.id}.path`);
        const root = readJson(absPath);
        const item = findArrayMatch(root, surface);
        const value = item ? getByPath(item, keys) : undefined;
        values.push({
          ...surface,
          exists: true,
          value: typeof value === "string" ? value.trim() : null,
        });
        continue;
      }
      if (surface.kind === "typescript_string_const") {
        const value = readTextConst(readFileSync(absPath, "utf8"), surface);
        values.push({ ...surface, exists: true, value });
        continue;
      }
      errors.push(`${surface.id}: unsupported release version surface kind ${surface.kind}.`);
    } catch (error) {
      errors.push(`${surface.file}: ${error instanceof Error ? error.message : String(error)}`);
      values.push({ ...surface, exists: true, value: null });
    }
  }

  return { manifest, values, errors };
}

export function listReleaseVersionSurfacePaths(rootDir) {
  const manifest = readReleaseVersionSurfaceManifest(rootDir);
  return [...new Set(manifest.surfaces.map((surface) => surface.file))].toSorted();
}

export function applyReleaseVersionSurfaces(rootDir, nextVersion) {
  const manifest = readReleaseVersionSurfaceManifest(rootDir);
  const changedPaths = [];

  for (const surface of manifest.surfaces) {
    const absPath = path.join(rootDir, surface.file);
    if (!existsSync(absPath)) {
      if (surface.required)
        throw new Error(`${surface.file}: required release version surface is missing.`);
      continue;
    }

    if (surface.kind === "json") {
      const value = readJson(absPath);
      setByPath(value, assertStringArray(surface.path, `${surface.id}.path`), nextVersion);
      writeJson(absPath, value);
      changedPaths.push(surface.file);
      continue;
    }
    if (surface.kind === "json_array_match") {
      const value = readJson(absPath);
      const item = findArrayMatch(value, surface);
      if (!item) throw new Error(`${surface.file}: missing array entry for ${surface.id}.`);
      setByPath(item, assertStringArray(surface.path, `${surface.id}.path`), nextVersion);
      writeJson(absPath, value);
      changedPaths.push(surface.file);
      continue;
    }
    if (surface.kind === "typescript_string_const") {
      const before = readFileSync(absPath, "utf8");
      writeFileSync(absPath, writeTextConst(before, surface, nextVersion), "utf8");
      changedPaths.push(surface.file);
      continue;
    }
    throw new Error(`${surface.id}: unsupported release version surface kind ${surface.kind}.`);
  }

  return [...new Set(changedPaths)].toSorted();
}
