import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

export type TaskProjectionCacheKey =
  | {
      mode: "git";
      gitRoot: string;
      tasksPath: string;
      head: string;
      status: string[];
      dirtyFiles: { path: string; sha256: string | null; size: number | null }[];
    }
  | {
      mode: "fingerprint";
      entries: { path: string; mtimeMs: number; size: number }[];
    };

function toPosix(value: string): string {
  return value.split(path.sep).join("/");
}

function sha256Buffer(value: Buffer): string {
  return createHash("sha256").update(value).digest("hex");
}

export function maybeRepoRootFromTasksDir(tasksDir: string): string | null {
  const resolved = path.resolve(tasksDir);
  if (path.basename(resolved) !== "tasks") return null;
  const agentplaneDir = path.dirname(resolved);
  if (path.basename(agentplaneDir) !== ".agentplane") return null;
  const gitRoot = path.dirname(agentplaneDir);
  if (!existsSync(path.join(gitRoot, ".git"))) return null;
  return gitRoot;
}

function gitOutput(gitRoot: string, args: string[]): string {
  return execFileSync("git", args, {
    cwd: gitRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

function gitStatusPorcelainRecords(gitRoot: string, args: string[]): string[] {
  const out = execFileSync("git", args, {
    cwd: gitRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });
  if (!out) return [];
  const parts = out.split("\0").filter((part) => part.length > 0);
  const records: string[] = [];
  for (let index = 0; index < parts.length; index += 1) {
    const record = parts[index] ?? "";
    records.push(record);
    if (/[RC]/u.test(record.slice(0, 2))) {
      index += 1;
    }
  }
  return records;
}

function walkFilesSync(targetPath: string): string[] {
  const details = statSync(targetPath);
  if (details.isFile()) return [targetPath];
  if (!details.isDirectory()) return [];
  const files: string[] = [];
  const entries = readdirSync(targetPath, { withFileTypes: true }).toSorted((a, b) =>
    a.name.localeCompare(b.name),
  );
  for (const entry of entries) {
    const childPath = path.join(targetPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFilesSync(childPath));
      continue;
    }
    if (entry.isFile()) files.push(childPath);
  }
  return files;
}

export function parseTaskProjectionPorcelainPath(line: string): string | null {
  const statusCode = line.slice(0, 2);
  const raw = line.length > 3 ? line.slice(3).trim() : "";
  if (!raw) return null;
  const renameSeparator = " -> ";
  const pathToken =
    /[RC]/u.test(statusCode) && raw.includes(renameSeparator)
      ? (raw.split(renameSeparator).at(-1) ?? "")
      : raw;
  return unquotePorcelainPath(pathToken);
}

function unquotePorcelainPath(raw: string): string {
  if (!(raw.startsWith('"') && raw.endsWith('"'))) return raw;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed === "string") return parsed;
  } catch {
    // Fall through to a conservative dequote below.
  }
  return raw
    .slice(1, -1)
    .replaceAll(String.raw`\"`, '"')
    .replaceAll(String.raw`\\`, "\\");
}

function dirtyFileEntries(
  gitRoot: string,
  status: string[],
): { path: string; sha256: string | null; size: number | null }[] {
  const seen = new Set<string>();
  const files: { path: string; sha256: string | null; size: number | null }[] = [];
  for (const line of status) {
    const relPath = parseTaskProjectionPorcelainPath(line);
    if (!relPath || seen.has(relPath)) continue;
    seen.add(relPath);
    const absolutePath = path.join(gitRoot, relPath);
    if (!existsSync(absolutePath)) {
      files.push({ path: toPosix(relPath), sha256: null, size: null });
      continue;
    }
    let targetFiles: string[] = [];
    try {
      targetFiles = walkFilesSync(absolutePath);
    } catch {
      files.push({ path: toPosix(relPath), sha256: null, size: null });
      continue;
    }
    for (const targetFile of targetFiles) {
      const relativeFile = toPosix(path.relative(gitRoot, targetFile));
      if (seen.has(relativeFile)) continue;
      seen.add(relativeFile);
      const content = readFileSync(targetFile);
      files.push({
        path: relativeFile,
        sha256: sha256Buffer(content),
        size: content.byteLength,
      });
    }
  }
  return files.toSorted((a, b) => a.path.localeCompare(b.path));
}

export function buildGitCacheKey(tasksDir: string): TaskProjectionCacheKey | null {
  const gitRoot = maybeRepoRootFromTasksDir(tasksDir);
  if (!gitRoot) return null;
  const relativeTasksPath = toPosix(path.relative(gitRoot, path.resolve(tasksDir)));
  try {
    const head = gitOutput(gitRoot, ["rev-parse", "HEAD"]);
    const status = gitStatusPorcelainRecords(gitRoot, [
      "status",
      "--porcelain=v1",
      "-z",
      "--untracked-files=all",
      "--",
      relativeTasksPath,
    ]);
    return {
      mode: "git",
      gitRoot,
      tasksPath: relativeTasksPath,
      head,
      status,
      dirtyFiles: dirtyFileEntries(gitRoot, status),
    };
  } catch {
    return null;
  }
}

export function buildFingerprintCacheKey(
  entries: readonly { path: string; mtimeMs: number; size: number }[],
): TaskProjectionCacheKey {
  return {
    mode: "fingerprint",
    entries: entries.map((entry) => ({
      path: entry.path,
      mtimeMs: entry.mtimeMs,
      size: entry.size,
    })),
  };
}

export function buildReadmeFingerprintEntriesFromTasksDir(
  tasksDir: string,
): { path: string; mtimeMs: number; size: number }[] | null {
  try {
    const entries = readdirSync(tasksDir, { withFileTypes: true });
    const readmes: { path: string; mtimeMs: number; size: number }[] = [];
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const readmePath = path.join(tasksDir, entry.name, "README.md");
      const stats = statSync(readmePath);
      if (!stats.isFile()) return null;
      readmes.push({
        path: readmePath,
        mtimeMs: stats.mtimeMs,
        size: stats.size,
      });
    }
    return readmes.toSorted((a, b) => a.path.localeCompare(b.path));
  } catch {
    return null;
  }
}

export function stableCacheKeyJson(key: TaskProjectionCacheKey): string {
  return JSON.stringify(key);
}
