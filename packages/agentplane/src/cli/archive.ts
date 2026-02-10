import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

import yauzl from "yauzl";

import { CliError } from "../shared/errors.js";
import { exitCodeForError } from "./exit-codes.js";

const execFileAsync = promisify(execFile);

type ArchiveType = "tar" | "zip";

type ZipEntryInfo = {
  name: string;
  isSymlink: boolean;
};

export type ArchiveEntryIssue = {
  entry: string;
  reason: string;
};

export async function validateArchive(
  archivePath: string,
  type: ArchiveType,
): Promise<ArchiveEntryIssue[]> {
  if (type === "zip") {
    const entries = await listZipEntries(archivePath);
    const entryNames = entries.map((entry) => entry.name);
    const symlinks = entries.filter((entry) => entry.isSymlink).map((entry) => entry.name);
    return validateArchiveEntries(entryNames, symlinks);
  }
  const entries = await listArchiveEntries(archivePath, type);
  const symlinks = await listArchiveSymlinks(archivePath, type);
  return validateArchiveEntries(entries, symlinks);
}

export function detectArchiveType(filePath: string): ArchiveType | null {
  const lower = filePath.toLowerCase();
  if (lower.endsWith(".tar.gz") || lower.endsWith(".tgz")) return "tar";
  if (lower.endsWith(".zip")) return "zip";
  return null;
}

export async function extractArchive(opts: {
  archivePath: string;
  destDir: string;
}): Promise<void> {
  const archiveType = detectArchiveType(opts.archivePath);
  if (!archiveType) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Unsupported archive type: ${opts.archivePath} (expected .tar.gz, .tgz, or .zip)`,
    });
  }
  const issues = await validateArchive(opts.archivePath, archiveType);
  if (issues.length > 0) {
    const first = issues[0];
    const suffix = issues.length > 1 ? ` (+${issues.length - 1} more)` : "";
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Unsafe archive entry: ${first.entry} (${first.reason})${suffix}`,
    });
  }
  if (archiveType === "tar") {
    await execFileAsync("tar", ["-xzf", opts.archivePath, "-C", opts.destDir]);
    return;
  }
  await execFileAsync("unzip", ["-q", opts.archivePath, "-d", opts.destDir]);
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

async function execFileCapture(
  file: string,
  args: string[],
  opts?: Parameters<typeof execFile>[2],
): Promise<{ stdout: string; stderr: string; error: Error | null }> {
  return await new Promise((resolve) => {
    execFile(file, args, opts ?? {}, (error, stdout, stderr) => {
      resolve({ error: error ?? null, stdout: String(stdout ?? ""), stderr: String(stderr ?? "") });
    });
  });
}

async function listArchiveEntries(archivePath: string, type: ArchiveType): Promise<string[]> {
  if (type === "tar") {
    const res = await execFileCapture("tar", ["-tzf", archivePath]);
    const stdout = res.stdout;
    // GNU tar may exit non-zero for warnings while still printing the member list.
    if (res.error && !stdout.trim()) {
      throw new CliError({
        exitCode: exitCodeForError("E_IO"),
        code: "E_IO",
        message:
          "Failed to list tar archive entries.\n" +
          `archive=${archivePath}\n` +
          (res.stderr.trim() ? `stderr=${res.stderr.trim()}` : ""),
      });
    }
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
    const res = await execFileCapture("tar", ["-tvzf", archivePath]);
    const stdout = res.stdout;
    if (res.error && !stdout.trim()) {
      throw new CliError({
        exitCode: exitCodeForError("E_IO"),
        code: "E_IO",
        message:
          "Failed to list tar archive symlinks.\n" +
          `archive=${archivePath}\n` +
          (res.stderr.trim() ? `stderr=${res.stderr.trim()}` : ""),
      });
    }
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

function listZipEntries(archivePath: string): Promise<ZipEntryInfo[]> {
  return new Promise((resolve, reject) => {
    yauzl.open(
      archivePath,
      { lazyEntries: true },
      (openErr: Error | null, zipfile?: yauzl.ZipFile) => {
        if (openErr || !zipfile) {
          reject(openErr ?? new Error("Failed to open zip archive"));
          return;
        }
        const entries: ZipEntryInfo[] = [];
        zipfile.readEntry();
        zipfile.on("entry", (entry: yauzl.Entry) => {
          entries.push({
            name: entry.fileName,
            isSymlink: isZipEntrySymlink(entry),
          });
          zipfile.readEntry();
        });
        zipfile.on("end", () => {
          zipfile.close();
          resolve(entries);
        });
        zipfile.on("error", (err: Error) => {
          zipfile.close();
          reject(err);
        });
      },
    );
  });
}

function isZipEntrySymlink(entry: yauzl.Entry): boolean {
  const attrs = entry.externalFileAttributes >>> 16;
  const fileType = attrs & 0xf0_00;
  return fileType === 0xa0_00;
}
