import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

const execFileAsync = promisify(execFile);

type ArchiveType = "tar" | "zip";

export type ArchiveEntryIssue = {
  entry: string;
  reason: string;
};

export async function validateArchive(
  archivePath: string,
  type: ArchiveType,
): Promise<ArchiveEntryIssue[]> {
  const entries = await listArchiveEntries(archivePath, type);
  const symlinks = await listArchiveSymlinks(archivePath, type);
  return validateArchiveEntries(entries, symlinks);
}

export function validateArchiveEntries(entries: string[], symlinks: string[]): ArchiveEntryIssue[] {
  const issues: ArchiveEntryIssue[] = [];
  const symlinkSet = new Set(symlinks);
  for (const rawEntry of entries) {
    const entry = rawEntry.replaceAll("\\", "/");
    if (entry.includes("\u0000")) {
      issues.push({ entry: rawEntry, reason: "null byte" });
      continue;
    }
    if (entry.startsWith("/") || entry.startsWith("\\")) {
      issues.push({ entry: rawEntry, reason: "absolute path" });
      continue;
    }
    if (/^[A-Za-z]:/.test(entry)) {
      issues.push({ entry: rawEntry, reason: "drive letter path" });
      continue;
    }
    const normalized = path.posix.normalize(entry);
    if (normalized === ".." || normalized.startsWith("../")) {
      issues.push({ entry: rawEntry, reason: "path traversal" });
      continue;
    }
    if (symlinkSet.has(rawEntry) || symlinkSet.has(entry) || symlinkSet.has(normalized)) {
      issues.push({ entry: rawEntry, reason: "symlink entry" });
    }
  }
  return issues;
}

async function listArchiveEntries(archivePath: string, type: ArchiveType): Promise<string[]> {
  if (type === "tar") {
    const { stdout } = await execFileAsync("tar", ["-tzf", archivePath]);
    return stdout
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  }
  const { stdout } = await execFileAsync("unzip", ["-Z1", archivePath]);
  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

async function listArchiveSymlinks(archivePath: string, type: ArchiveType): Promise<string[]> {
  if (type === "tar") {
    const { stdout } = await execFileAsync("tar", ["-tvzf", archivePath]);
    return stdout
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("l"))
      .map((line) => {
        const arrowIndex = line.indexOf(" -> ");
        const left = arrowIndex === -1 ? line : line.slice(0, arrowIndex);
        const tokens = left.trim().split(/\s+/);
        return tokens.at(-1) ?? "";
      })
      .filter((entry) => entry.length > 0);
  }
  const { stdout } = await execFileAsync("unzip", ["-Z", "-v", archivePath]);
  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /\bsymlink\b/i.test(line) || /\blrwx/.test(line))
    .map((line) => line.split(/\s+/).at(-1) ?? "")
    .filter((entry) => entry.length > 0);
}
