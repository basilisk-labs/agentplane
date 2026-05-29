import { readdir, stat } from "node:fs/promises";
import path from "node:path";

import { CliError } from "../shared/errors.js";

import { selectedSourceRows } from "./ingest-task.js";
import {
  calculateSha256,
  contentTypeForPath,
  ensureWithinRoot,
  isServiceCandidate,
  isUnsupportedPath,
  toPosix,
  type ContextIngestParsed,
  type ManifestEntry,
  type ManifestLock,
} from "./ingest-manifest.js";

async function walkFiles(root: string, relDir: string): Promise<string[]> {
  const absolute = path.join(root, relDir);
  const entries = await readdir(absolute, { withFileTypes: true });
  const out: string[] = [];
  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "service") continue;
    const nextRel = toPosix(path.join(relDir, entry.name));
    if (isServiceCandidate(nextRel)) continue;
    if (entry.isDirectory()) {
      out.push(...(await walkFiles(root, nextRel)));
      continue;
    }
    if (!entry.isFile()) continue;
    out.push(nextRel);
  }
  return out;
}

export async function collectCandidateRows(
  root: string,
  opts: ContextIngestParsed,
  lock: ManifestLock,
): Promise<ManifestEntry[]> {
  const requestedPaths =
    opts.mode === "sources" ? opts.sources : await walkFiles(root, "context/raw");

  const candidates = new Set<string>();
  for (const raw of requestedPaths) {
    if (opts.mode === "sources") {
      const abs = path.resolve(root, raw);
      if (!ensureWithinRoot(root, abs)) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `source path outside project root: ${raw}`,
        });
      }
      let statRaw: { isDirectory: () => boolean };
      try {
        statRaw = await stat(abs);
      } catch {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `source path does not exist: ${raw}`,
        });
      }
      if (statRaw.isDirectory()) {
        for (const nested of await walkFiles(root, toPosix(path.relative(root, abs)))) {
          if (isServiceCandidate(nested)) continue;
          candidates.add(toPosix(nested));
        }
        continue;
      }
      candidates.add(toPosix(path.relative(root, abs)));
      continue;
    }
    candidates.add(toPosix(raw));
  }

  const lockByPath = new Map<string, ManifestEntry>(
    lock.sources.map((entry) => [entry.path, entry]),
  );
  const rows: ManifestEntry[] = [];
  const processed = new Set<string>();
  for (const candidate of candidates) {
    const abs = path.join(root, candidate);
    processed.add(candidate);
    try {
      const st = await stat(abs);
      if (!st.isFile()) continue;
      const sha256 = await calculateSha256(abs);
      const status = isUnsupportedPath(candidate)
        ? "unsupported"
        : lockByPath.has(candidate)
          ? lockByPath.get(candidate)?.sha256 === sha256
            ? "unchanged"
            : "changed"
          : "new";
      rows.push({
        path: candidate,
        sha256,
        size_bytes: st.size,
        mtime: new Date(st.mtimeMs).toISOString(),
        content_type: contentTypeForPath(candidate),
        status,
      });
    } catch {
      rows.push({
        path: candidate,
        sha256: "sha256:0",
        size_bytes: 0,
        mtime: new Date().toISOString(),
        content_type: contentTypeForPath(candidate),
        status: "error",
      });
    }
  }

  if (opts.mode === "changed") {
    for (const existing of lock.sources) {
      if (!processed.has(existing.path)) {
        rows.push({
          ...existing,
          status: "deleted",
        });
      }
    }
  }
  return rows;
}

export function finalizeManifestRows(allRows: ManifestEntry[]): ManifestEntry[] {
  const seen = new Set<string>();
  const out: ManifestEntry[] = [];
  for (const row of allRows) {
    if (seen.has(row.path)) continue;
    seen.add(row.path);
    out.push({
      ...row,
      sha256: row.sha256 || "sha256:0",
      size_bytes: Number.isFinite(row.size_bytes) ? row.size_bytes : 0,
      mtime: row.mtime || new Date().toISOString(),
      status: row.status || "unsupported",
      content_type: row.content_type || contentTypeForPath(row.path),
    });
  }
  return out;
}

export async function mergeCompleteSourceInventory(
  root: string,
  lock: ManifestLock,
  rows: ManifestEntry[],
): Promise<ManifestEntry[]> {
  const byPath = new Map<string, ManifestEntry>();
  for (const existing of lock.sources) {
    byPath.set(existing.path, existing);
  }
  for (const row of rows) {
    byPath.set(row.path, row);
  }

  const merged: ManifestEntry[] = [];
  for (const row of byPath.values()) {
    if (rows.some((candidate) => candidate.path === row.path)) {
      merged.push(row);
      continue;
    }
    try {
      const abs = path.join(root, row.path);
      const st = await stat(abs);
      if (!st.isFile()) {
        merged.push({ ...row, status: "deleted" });
        continue;
      }
      const sha256 = await calculateSha256(abs);
      merged.push({
        ...row,
        sha256,
        size_bytes: st.size,
        mtime: new Date(st.mtimeMs).toISOString(),
        content_type: row.content_type || contentTypeForPath(row.path),
        status: row.sha256 === sha256 ? "unchanged" : "changed",
      });
    } catch {
      merged.push({ ...row, status: "deleted" });
    }
  }
  return finalizeManifestRows(merged).toSorted((left, right) =>
    left.path.localeCompare(right.path),
  );
}

export function buildIndexModeSourceRows(
  opts: ContextIngestParsed,
  rows: ManifestEntry[],
): ManifestEntry[] {
  return selectedSourceRows(opts, rows);
}
