import { createHash } from "node:crypto";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const WATCHED_RUNTIME_PATHS = {
  agentplane: [
    "src",
    "bin/agentplane.js",
    "bin/dist-guard.js",
    "bin/runtime-context.js",
    "bin/stale-dist-policy.js",
  ],
  "@agentplaneorg/core": ["src"],
};

function normalizePath(value) {
  return value.split(path.sep).join("/");
}

export function isRuntimeRelevantWatchedFile(filePath) {
  const normalized = normalizePath(filePath);
  const inSourceTree = normalized.startsWith("src/") || normalized.includes("/src/");
  if (!inSourceTree) return true;
  if (normalized.includes("/__snapshots__/")) return false;
  const baseName = path.posix.basename(normalized);
  return !/\.(?:test)\.[cm]?[jt]sx?$/u.test(baseName);
}

async function exists(targetPath) {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function walkFiles(targetPath) {
  const targetStat = await stat(targetPath);
  if (targetStat.isFile()) return [targetPath];
  if (!targetStat.isDirectory()) return [];

  const entries = await readdir(targetPath, { withFileTypes: true });
  const files = [];
  for (const entry of entries.toSorted((a, b) => a.name.localeCompare(b.name))) {
    const childPath = path.join(targetPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkFiles(childPath)));
      continue;
    }
    if (entry.isFile()) files.push(childPath);
  }
  return files;
}

function fileHash(content) {
  return createHash("sha256").update(content).digest("hex");
}

function snapshotHash(files) {
  const digest = createHash("sha256");
  for (const file of files) {
    digest.update(file.path);
    digest.update(":");
    digest.update(file.sha256);
    digest.update("\n");
  }
  return digest.digest("hex");
}

export function getWatchedRuntimePathsForPackage(packageName) {
  return [...(WATCHED_RUNTIME_PATHS[packageName] ?? ["src"])];
}

export async function collectWatchedRuntimeSnapshot(packageDir, watchedPaths) {
  const normalizedWatchedPaths = [...new Set(watchedPaths.map((entry) => normalizePath(entry)))];

  const absoluteFiles = [];
  for (const watchedPath of normalizedWatchedPaths) {
    const absolutePath = path.join(packageDir, watchedPath);
    if (!(await exists(absolutePath))) continue;
    absoluteFiles.push(...(await walkFiles(absolutePath)));
  }

  const uniqueAbsoluteFiles = [...new Set(absoluteFiles)].toSorted((a, b) => a.localeCompare(b));
  const files = [];
  for (const absolutePath of uniqueAbsoluteFiles) {
    const relativePath = normalizePath(path.relative(packageDir, absolutePath));
    if (!isRuntimeRelevantWatchedFile(relativePath)) continue;
    const content = await readFile(absolutePath);
    files.push({
      path: relativePath,
      sha256: fileHash(content),
      size_bytes: content.byteLength,
    });
  }

  return {
    watchedPaths: normalizedWatchedPaths,
    files,
    snapshotHash: snapshotHash(files),
  };
}

function snapshotFileMap(snapshot) {
  return new Map(snapshot.files.map((file) => [file.path, file.sha256]));
}

export function compareWatchedRuntimeSnapshots(recordedSnapshot, currentSnapshot) {
  const recordedFiles = recordedSnapshot.files.filter((file) =>
    isRuntimeRelevantWatchedFile(file.path),
  );
  const currentFiles = currentSnapshot.files.filter((file) =>
    isRuntimeRelevantWatchedFile(file.path),
  );
  if (
    snapshotHash(recordedFiles) === snapshotHash(currentFiles) &&
    recordedFiles.length === currentFiles.length
  ) {
    return { ok: true, changedPaths: [] };
  }

  const recordedMap = snapshotFileMap({ ...recordedSnapshot, files: recordedFiles });
  const currentMap = snapshotFileMap({ ...currentSnapshot, files: currentFiles });
  const changedPaths = [...new Set([...recordedMap.keys(), ...currentMap.keys()])]
    .filter((filePath) => recordedMap.get(filePath) !== currentMap.get(filePath))
    .toSorted((a, b) => a.localeCompare(b));

  return {
    ok: changedPaths.length === 0,
    changedPaths,
  };
}
