import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { promisify } from "node:util";
import path from "node:path";
import { gunzipSync } from "node:zlib";

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
  const { entries, symlinks } = await listTarGzEntries(archivePath);
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

function parseTarOctal(field: Buffer): number {
  const text = field.toString("utf8").replace(/\0.*$/u, "").trim();
  if (!text) return 0;
  const n = Number.parseInt(text, 8);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function isAllZeroBlock(block: Buffer): boolean {
  for (const b of block) if (b !== 0) return false;
  return true;
}

async function listTarGzEntries(
  archivePath: string,
): Promise<{ entries: string[]; symlinks: string[] }> {
  let gz: Buffer;
  try {
    gz = await readFile(archivePath);
  } catch (err) {
    const e = err as { message?: string } | null;
    throw new CliError({
      exitCode: exitCodeForError("E_IO"),
      code: "E_IO",
      message: `Failed to read archive: ${archivePath}${e?.message ? `\n${e.message}` : ""}`,
    });
  }

  let tar: Buffer;
  try {
    tar = gunzipSync(gz);
  } catch (err) {
    const e = err as { message?: string } | null;
    throw new CliError({
      exitCode: exitCodeForError("E_IO"),
      code: "E_IO",
      message:
        `Failed to gunzip tar archive: ${archivePath}` + (e?.message ? `\n${e.message}` : ""),
    });
  }

  const entries: string[] = [];
  const symlinks: string[] = [];

  let offset = 0;
  while (offset + 512 <= tar.length) {
    const header = tar.subarray(offset, offset + 512);
    offset += 512;
    if (isAllZeroBlock(header)) break;

    const nameRaw = header.subarray(0, 100).toString("utf8").replace(/\0.*$/u, "");
    const prefixRaw = header.subarray(345, 500).toString("utf8").replace(/\0.*$/u, "");
    const name = prefixRaw ? `${prefixRaw}/${nameRaw}` : nameRaw;
    const size = parseTarOctal(header.subarray(124, 136));
    const typeflag = header.subarray(156, 157).toString("utf8");

    if (name) {
      entries.push(name);
      if (typeflag === "2") symlinks.push(name);
    }

    const blocks = Math.ceil(size / 512);
    offset += blocks * 512;
  }

  return { entries, symlinks };
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
