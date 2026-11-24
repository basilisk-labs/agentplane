import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import path from "node:path";
import { lstat, readFile, stat } from "node:fs/promises";
import {
  collectWatchedRuntimeSnapshot,
  compareWatchedRuntimeSnapshots,
  isRuntimeRelevantWatchedFile,
} from "./runtime-watch.js";

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function readJsonIfExists(p) {
  let raw = "";
  try {
    raw = await readFile(p, "utf8");
  } catch {
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function resolveGitHead(cwd) {
  try {
    return (
      execFileSync("git", ["rev-parse", "HEAD"], {
        cwd,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim() || null
    );
  } catch {
    return null;
  }
}

function listGitPaths(cwd, args, options = {}) {
  const trimLines = options.trimLines ?? true;
  try {
    const out = execFileSync("git", args, {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    return out
      .split(/\r?\n/u)
      .map((line) => (trimLines ? line.trim() : line))
      .filter(Boolean);
  } catch {
    return [];
  }
}

function tryListGitPaths(cwd, args, options = {}) {
  const trimLines = options.trimLines ?? true;
  try {
    const out = execFileSync("git", args, {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    return {
      ok: true,
      paths: out
        .split(/\r?\n/u)
        .map((line) => (trimLines ? line.trim() : line))
        .filter(Boolean),
    };
  } catch {
    return { ok: false, paths: [] };
  }
}

function uniqueSorted(values) {
  return [...new Set(values)].toSorted((a, b) => a.localeCompare(b));
}

function workingTreeChangedPaths(cwd, watchedPaths) {
  const lines = listGitPaths(
    cwd,
    ["status", "--porcelain", "--untracked-files=all", "--", ...watchedPaths],
    { trimLines: false },
  );
  return uniqueSorted(
    lines
      .map((line) => {
        const normalized = String(line ?? "");
        return normalized.length > 3 ? normalized.slice(3).trim() : "";
      })
      .filter((filePath) => Boolean(filePath) && isRuntimeRelevantWatchedFile(filePath)),
  );
}

function tryWorkingTreeChangedPaths(cwd, watchedPaths) {
  const result = tryListGitPaths(
    cwd,
    ["status", "--porcelain", "--untracked-files=all", "--", ...watchedPaths],
    { trimLines: false },
  );
  return {
    ok: result.ok,
    paths: uniqueSorted(
      result.paths
        .map((line) => {
          const normalized = String(line ?? "");
          return normalized.length > 3 ? normalized.slice(3).trim() : "";
        })
        .filter((filePath) => Boolean(filePath) && isRuntimeRelevantWatchedFile(filePath)),
    ),
  };
}

function committedChangedPathsSince(cwd, fromGitHead, watchedPaths) {
  if (!fromGitHead) return [];
  return uniqueSorted(
    listGitPaths(cwd, [
      "diff",
      "--name-only",
      `${fromGitHead}..HEAD`,
      "--",
      ...watchedPaths,
    ]).filter((filePath) => isRuntimeRelevantWatchedFile(filePath)),
  );
}

function tryCommittedChangedPathsSince(cwd, fromGitHead, watchedPaths) {
  if (!fromGitHead) return { ok: false, paths: [] };
  // --no-renames reports a committed rename as a deletion plus an addition, so the
  // incremental manifest comparison sees both paths.
  const result = tryListGitPaths(cwd, [
    "diff",
    "--name-only",
    "--no-renames",
    `${fromGitHead}..HEAD`,
    "--",
    ...watchedPaths,
  ]);
  return {
    ok: result.ok,
    paths: uniqueSorted(result.paths.filter((filePath) => isRuntimeRelevantWatchedFile(filePath))),
  };
}

async function fileMtimeMs(p) {
  try {
    const s = await stat(p);
    if (!s.isFile()) return null;
    return s.mtimeMs;
  } catch {
    return null;
  }
}

function parseManifestSnapshot(manifest) {
  if (
    !Array.isArray(manifest?.watched_runtime_paths) ||
    !Array.isArray(manifest?.watched_runtime_files) ||
    typeof manifest?.watched_runtime_snapshot_hash !== "string"
  ) {
    return null;
  }

  const watchedPaths = manifest.watched_runtime_paths.filter((value) => typeof value === "string");
  const files = manifest.watched_runtime_files
    .filter(
      (value) =>
        value &&
        typeof value === "object" &&
        typeof value.path === "string" &&
        typeof value.sha256 === "string" &&
        typeof value.size_bytes === "number",
    )
    .map((value) => ({
      path: value.path,
      sha256: value.sha256,
      size_bytes: value.size_bytes,
    }));

  if (
    watchedPaths.length !== manifest.watched_runtime_paths.length ||
    files.length !== manifest.watched_runtime_files.length
  ) {
    return null;
  }

  return {
    watchedPaths,
    files,
    snapshotHash: manifest.watched_runtime_snapshot_hash,
  };
}

function resolveGitPrefix(cwd) {
  try {
    return execFileSync("git", ["rev-parse", "--show-prefix"], {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return null;
  }
}

async function readRegularFileSha256(absolutePath) {
  let fileStat;
  try {
    fileStat = await lstat(absolutePath);
  } catch (error) {
    if (error?.code === "ENOENT") return { kind: "missing" };
    return { kind: "ambiguous" };
  }
  if (!fileStat.isFile()) return { kind: "ambiguous" };
  const content = await readFile(absolutePath);
  return { kind: "file", sha256: createHash("sha256").update(content).digest("hex") };
}

// Verifies only the git-reported changed paths against the per-file hashes in the
// build manifest. Unreported paths are trusted exactly as the zero-change quick
// check trusts them. Returns null when git output is ambiguous, so the caller can
// fall back to the full watched-tree snapshot.
async function compareChangedFilesWithManifest(packageRoot, manifestSnapshot, repoChangedPaths) {
  const prefix = resolveGitPrefix(packageRoot);
  if (prefix === null) return null;
  const recorded = new Map(manifestSnapshot.files.map((file) => [file.path, file.sha256]));
  const changedPaths = [];
  for (const repoPath of repoChangedPaths) {
    if (repoPath.startsWith('"') || repoPath.includes(" -> ")) return null;
    if (!repoPath.startsWith(prefix)) return null;
    const packagePath = repoPath.slice(prefix.length);
    if (!packagePath) return null;
    const current = await readRegularFileSha256(path.join(packageRoot, packagePath));
    if (current.kind === "ambiguous") return null;
    const currentSha = current.kind === "file" ? current.sha256 : undefined;
    if (recorded.get(packagePath) !== currentSha) changedPaths.push(packagePath);
  }
  return uniqueSorted(changedPaths);
}

export async function isPackageBuildFresh(packageRoot, options = {}) {
  const watchedPaths = options.watchedPaths ?? ["src"];
  const manifestPath = path.join(packageRoot, "dist", ".build-manifest.json");
  const manifest = await readJsonIfExists(manifestPath);
  if (!manifest || manifest.schema_version !== 1) {
    return { ok: false, reason: "manifest_missing", changedPaths: [] };
  }

  const currentHead = resolveGitHead(packageRoot);
  const manifestSnapshot = parseManifestSnapshot(manifest);
  if (manifestSnapshot) {
    const committedQuickCheck = tryCommittedChangedPathsSince(
      packageRoot,
      manifest.git_head,
      manifestSnapshot.watchedPaths,
    );
    const workingTreeQuickCheck = tryWorkingTreeChangedPaths(
      packageRoot,
      manifestSnapshot.watchedPaths,
    );
    const changedPaths = uniqueSorted([
      ...committedQuickCheck.paths,
      ...workingTreeQuickCheck.paths,
    ]);
    if (committedQuickCheck.ok && workingTreeQuickCheck.ok && changedPaths.length === 0) {
      if (manifest.git_head && currentHead && manifest.git_head !== currentHead) {
        return { ok: true, reason: "fresh_after_git_quick_check", changedPaths: [] };
      }
      return { ok: true, reason: "fresh", changedPaths: [] };
    }

    const incrementalChangedPaths =
      committedQuickCheck.ok && workingTreeQuickCheck.ok
        ? await compareChangedFilesWithManifest(packageRoot, manifestSnapshot, changedPaths)
        : null;
    const comparison =
      incrementalChangedPaths === null
        ? compareWatchedRuntimeSnapshots(
            manifestSnapshot,
            await collectWatchedRuntimeSnapshot(packageRoot, manifestSnapshot.watchedPaths),
          )
        : { ok: incrementalChangedPaths.length === 0, changedPaths: incrementalChangedPaths };
    if (!comparison.ok) {
      return {
        ok: false,
        reason: "watched_runtime_snapshot_changed",
        changedPaths: comparison.changedPaths,
      };
    }

    if (manifest.git_head && currentHead && manifest.git_head !== currentHead) {
      return { ok: true, reason: "fresh_after_snapshot_match", changedPaths: [] };
    }

    return { ok: true, reason: "fresh", changedPaths: [] };
  }

  const changedPaths = uniqueSorted([
    ...committedChangedPathsSince(packageRoot, manifest.git_head, watchedPaths),
    ...workingTreeChangedPaths(packageRoot, watchedPaths),
  ]);

  if (changedPaths.length > 0) {
    return { ok: false, reason: "watched_paths_changed", changedPaths };
  }

  const srcCliMtimeMs = await fileMtimeMs(path.join(packageRoot, "src", "cli.ts"));
  const srcIndexMtimeMs = await fileMtimeMs(path.join(packageRoot, "src", "index.ts"));
  if (
    typeof manifest.src_cli_mtime_ms === "number" &&
    typeof srcCliMtimeMs === "number" &&
    srcCliMtimeMs > manifest.src_cli_mtime_ms
  ) {
    return { ok: false, reason: "src_cli_newer_than_manifest", changedPaths: [] };
  }
  if (
    typeof manifest.src_index_mtime_ms === "number" &&
    typeof srcIndexMtimeMs === "number" &&
    srcIndexMtimeMs > manifest.src_index_mtime_ms
  ) {
    return { ok: false, reason: "src_index_newer_than_manifest", changedPaths: [] };
  }

  if (manifest.git_head && currentHead && manifest.git_head !== currentHead) {
    return { ok: true, reason: "fresh_after_non_runtime_head_change", changedPaths: [] };
  }

  return { ok: true, reason: "fresh", changedPaths: [] };
}

export async function distExists(packageRoot) {
  return await exists(path.join(packageRoot, "dist"));
}
