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
    const content = await readFile(absolutePath);
    files.push({
      path: normalizePath(path.relative(packageDir, absolutePath)),
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
