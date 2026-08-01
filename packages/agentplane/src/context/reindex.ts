/* eslint-disable @typescript-eslint/no-empty-function, unicorn/no-array-sort */
import { createHash } from "node:crypto";
import { access, stat, mkdir, rm } from "node:fs/promises";
import path from "node:path";

import { createCliEmitter, infoMessage, warnMessage } from "../cli/output.js";
import { ensureRuntimeSqliteGitignore } from "../runtime/shared/runtime-gitignore.js";
import { resolveAgentplaneCacheSqlitePath } from "../shared/cache-paths.js";
import {
  assertContainedPathChainIdentityUnchanged,
  captureContainedPathChainIdentity,
  readContainedStableTextNoFollow,
} from "../shared/contained-stable-file.js";
import { collectMatchingFiles, readText, toPosix } from "./context-utils.js";
import { isSupportedProjectionPath, projectRowsForFile } from "./reindex-projection.js";
import {
  applySqliteProjectionDelta,
  checkSqliteProjection,
  readSqliteProjection,
  readSqliteProjectionState,
  searchSqliteProjection,
  writeSqliteProjection,
  type SqliteProjectionSearchOptions,
  type SqliteProjectionSearchResult,
} from "./sqlite.js";

export const PROJECTION_VERSION = 3;
const MAX_LEGACY_JSON_PROJECTION_BYTES = 256 * 1024 * 1024;

type ProjectionIndex = {
  metadata: {
    projection_version: number;
    generated_at: string;
    workspace_hash: string;
    include_tasks: boolean;
    include_raw: boolean;
    source_bytes: number;
    search_text_bytes: number;
    preview_text_bytes: number;
    projection_elapsed_ms: number;
  };
  rows: {
    source_path?: string;
    path: string;
    sha256: string;
    content_type: string;
    projection_version: number;
    indexed_at: string;
    size_bytes: number;
    kind: string;
    search_text: string;
    preview_text: string;
    source_refs?: string[];
  }[];
};

type SourceSnapshot = {
  source_path: string;
  sha256: string;
  size_bytes: number;
  text: string;
};

type ReindexStrategy = "no-op" | "incremental" | "full-rebuild";

type ReindexReceipt = {
  strategy: ReindexStrategy;
  reason: string;
  added: number;
  changed: number;
  removed: number;
  unchanged: number;
  rows: number;
};

export type ContextReindexResult = {
  sqlite_path: string;
  receipt: ReindexReceipt;
  metadata: ProjectionIndex["metadata"];
  warnings: string[];
};

const output = createCliEmitter();

function defaultWorkspaceHash(root: string): string {
  return `sha256:${createHash("sha256").update(root).digest("hex").slice(0, 16)}`;
}

async function enumerateSourceFiles(
  root: string,
  opts: { includeTasks: boolean; includeRaw: boolean },
): Promise<string[]> {
  const roots: string[] = [];
  if (opts.includeRaw) roots.push("context/raw");
  roots.push(
    "context/wiki",
    "context/capabilities",
    ".agentplane/context/derived/facts",
    ".agentplane/context/derived/graph",
    ".agentplane/context/derived/capabilities",
    ".agentplane/context/derived/reports",
  );
  if (opts.includeTasks) {
    roots.push(".agentplane/tasks");
  }

  const out = new Set<string>();
  for (const rel of roots) {
    const full = path.join(root, rel);
    try {
      await access(full);
    } catch {
      continue;
    }
    const st = await stat(full);
    if (st.isDirectory()) {
      const matches = await collectMatchingFiles(root, rel);
      for (const match of matches) {
        out.add(match);
      }
    } else {
      out.add(toPosix(rel));
    }
  }
  return [...out].sort();
}

async function captureSourceSnapshots(root: string, files: string[]): Promise<SourceSnapshot[]> {
  const snapshots: SourceSnapshot[] = [];
  for (const rel of files) {
    const sourcePath = toPosix(rel);
    if (!isSupportedProjectionPath(sourcePath)) continue;
    const abs = path.join(root, sourcePath);
    try {
      const fileStats = await stat(abs);
      if (!fileStats.isFile()) continue;
      const text = await readText(abs);
      snapshots.push({
        source_path: sourcePath,
        sha256: `sha256:${createHash("sha256").update(text).digest("hex")}`,
        size_bytes: Buffer.byteLength(text, "utf8"),
        text,
      });
    } catch {
      // A file can disappear or become unreadable while the source tree is traversed.
    }
  }
  return snapshots;
}

function projectSnapshotRows(snapshot: SourceSnapshot, indexedAt: string): ProjectionIndex["rows"] {
  return projectRowsForFile(snapshot.source_path, snapshot.text, snapshot.sha256).map((row) => ({
    ...row,
    source_path: snapshot.source_path,
    projection_version: PROJECTION_VERSION,
    indexed_at: indexedAt,
  }));
}

function projectionMetadata(
  root: string,
  parsed: { includeTasks: boolean; includeRaw: boolean },
  generatedAt: string,
  elapsedMs: number,
): ProjectionIndex["metadata"] {
  return {
    projection_version: PROJECTION_VERSION,
    generated_at: generatedAt,
    workspace_hash: defaultWorkspaceHash(root),
    include_tasks: parsed.includeTasks,
    include_raw: parsed.includeRaw,
    source_bytes: 0,
    search_text_bytes: 0,
    preview_text_bytes: 0,
    projection_elapsed_ms: elapsedMs,
  };
}

async function isExistingFile(filePath: string): Promise<boolean> {
  try {
    const fileStats = await stat(filePath);
    return fileStats.isFile();
  } catch {
    return false;
  }
}

async function removeProjectionFiles(sqlitePath: string): Promise<void> {
  await Promise.all(
    [sqlitePath, `${sqlitePath}-wal`, `${sqlitePath}-shm`].map((filePath) =>
      rm(filePath, { force: true }).catch(() => {}),
    ),
  );
}

export function renderContextReindexResult(result: ContextReindexResult): void {
  for (const warning of result.warnings) output.line(warnMessage(warning));
  output.lines([
    infoMessage(`reindex prepared at ${result.sqlite_path}`),
    infoMessage(
      `reindex_receipt strategy=${result.receipt.strategy} reason=${result.receipt.reason} added=${result.receipt.added} changed=${result.receipt.changed} removed=${result.receipt.removed} unchanged=${result.receipt.unchanged}`,
    ),
    infoMessage(
      `rows=${result.receipt.rows} files=${result.receipt.added + result.receipt.changed + result.receipt.unchanged}`,
    ),
    infoMessage(
      `projection_metrics source_bytes=${result.metadata.source_bytes} search_text_bytes=${result.metadata.search_text_bytes} preview_text_bytes=${result.metadata.preview_text_bytes} elapsed_ms=${result.metadata.projection_elapsed_ms}`,
    ),
  ]);
}

export async function runContextReindex(opts: {
  cwd: string;
  rootOverride?: string;
  parsed: { includeTasks: boolean; includeRaw: boolean; reset: boolean };
}): Promise<ContextReindexResult> {
  const root = path.resolve(opts.rootOverride ?? opts.cwd);
  const service = path.join(root, ".agentplane", "context", "service");
  const sqlitePath = resolveAgentplaneCacheSqlitePath(root);

  if (opts.parsed.reset) {
    await removeProjectionFiles(sqlitePath);
  }

  await mkdir(service, { recursive: true });
  await mkdir(path.join(service, "cache"), { recursive: true });
  await mkdir(path.join(service, "embeddings"), { recursive: true });
  await mkdir(path.join(service, "remotes"), { recursive: true });

  const files = await enumerateSourceFiles(root, {
    includeTasks: opts.parsed.includeTasks,
    includeRaw: opts.parsed.includeRaw,
  });
  const projectionStartedAt = performance.now();
  const snapshots = await captureSourceSnapshots(root, files);
  const warnings =
    snapshots.length === 0 ? ["no source files found for reindex under configured scopes"] : [];
  const now = new Date().toISOString();

  let state = null;
  let rebuildReason: string | null = null;
  if (opts.parsed.reset) {
    rebuildReason = "reset-requested";
  } else if (!(await isExistingFile(sqlitePath))) {
    rebuildReason = "missing-index";
  } else if (await checkSqliteProjection(sqlitePath)) {
    state = await readSqliteProjectionState(sqlitePath);
    if (!state) {
      rebuildReason = "schema-or-state-unavailable";
    } else if (state.metadata.projection_version !== PROJECTION_VERSION) {
      rebuildReason = "projection-version-mismatch";
    } else if (
      state.metadata.include_tasks !== opts.parsed.includeTasks ||
      state.metadata.include_raw !== opts.parsed.includeRaw
    ) {
      rebuildReason = "index-scope-changed";
    }
  } else {
    rebuildReason = "integrity-failure";
  }

  if (rebuildReason) {
    if (rebuildReason === "integrity-failure") {
      await removeProjectionFiles(sqlitePath);
    }
    const rows = snapshots.flatMap((snapshot) => projectSnapshotRows(snapshot, now));
    const metadata = projectionMetadata(
      root,
      opts.parsed,
      now,
      Math.round(performance.now() - projectionStartedAt),
    );
    metadata.source_bytes = snapshots.reduce((total, snapshot) => total + snapshot.size_bytes, 0);
    metadata.search_text_bytes = rows.reduce(
      (total, row) => total + Buffer.byteLength(row.search_text, "utf8"),
      0,
    );
    metadata.preview_text_bytes = rows.reduce(
      (total, row) => total + Buffer.byteLength(row.preview_text, "utf8"),
      0,
    );
    await ensureRuntimeSqliteGitignore({ gitRoot: root }).catch(() => null);
    await writeSqliteProjection(sqlitePath, {
      metadata,
      sources: snapshots.map(({ source_path, sha256, size_bytes }) => ({
        source_path,
        sha256,
        size_bytes,
      })),
      rows,
    });
    if (!(await checkSqliteProjection(sqlitePath))) {
      throw new Error("Context projection rebuild did not pass SQLite integrity check.");
    }
    return {
      sqlite_path: sqlitePath,
      receipt: {
        strategy: "full-rebuild",
        reason: rebuildReason,
        added: snapshots.length,
        changed: 0,
        removed: 0,
        unchanged: 0,
        rows: rows.length,
      },
      metadata,
      warnings,
    };
  }

  if (!state) {
    throw new Error("Context projection state was unavailable after rebuild routing.");
  }
  const currentByPath = new Map(snapshots.map((snapshot) => [snapshot.source_path, snapshot]));
  const added = snapshots.filter((snapshot) => !state.sourceHashes.has(snapshot.source_path));
  const changed = snapshots.filter(
    (snapshot) =>
      state.sourceHashes.has(snapshot.source_path) &&
      state.sourceHashes.get(snapshot.source_path) !== snapshot.sha256,
  );
  const removed = [...state.sourceHashes.keys()].filter(
    (sourcePath) => !currentByPath.has(sourcePath),
  );
  const unchanged = snapshots.length - added.length - changed.length;

  if (added.length === 0 && changed.length === 0 && removed.length === 0) {
    return {
      sqlite_path: sqlitePath,
      receipt: {
        strategy: "no-op",
        reason: "source-fingerprints-unchanged",
        added: 0,
        changed: 0,
        removed: 0,
        unchanged,
        rows: state.rowCount,
      },
      metadata: state.metadata,
      warnings,
    };
  }

  const replacementSnapshots = [...added, ...changed];
  const metadata = projectionMetadata(
    root,
    opts.parsed,
    now,
    Math.round(performance.now() - projectionStartedAt),
  );
  await ensureRuntimeSqliteGitignore({ gitRoot: root }).catch(() => null);
  let result: ContextReindexResult;
  try {
    const nextMetadata = await applySqliteProjectionDelta(sqlitePath, {
      metadata,
      changed: replacementSnapshots.map((snapshot) => ({
        source_path: snapshot.source_path,
        sha256: snapshot.sha256,
        size_bytes: snapshot.size_bytes,
        rows: projectSnapshotRows(snapshot, now),
      })),
      removed_source_paths: removed,
    });
    const nextState = await readSqliteProjectionState(sqlitePath);
    if (!nextState || !(await checkSqliteProjection(sqlitePath))) {
      throw new Error("incremental projection did not produce a readable index");
    }
    result = {
      sqlite_path: sqlitePath,
      receipt: {
        strategy: "incremental",
        reason: "source-fingerprints-changed",
        added: added.length,
        changed: changed.length,
        removed: removed.length,
        unchanged,
        rows: nextState.rowCount,
      },
      metadata: nextMetadata,
      warnings,
    };
  } catch {
    const rows = snapshots.flatMap((snapshot) => projectSnapshotRows(snapshot, now));
    const repairedMetadata = projectionMetadata(
      root,
      opts.parsed,
      now,
      Math.round(performance.now() - projectionStartedAt),
    );
    repairedMetadata.source_bytes = snapshots.reduce(
      (total, snapshot) => total + snapshot.size_bytes,
      0,
    );
    repairedMetadata.search_text_bytes = rows.reduce(
      (total, row) => total + Buffer.byteLength(row.search_text, "utf8"),
      0,
    );
    repairedMetadata.preview_text_bytes = rows.reduce(
      (total, row) => total + Buffer.byteLength(row.preview_text, "utf8"),
      0,
    );
    await writeSqliteProjection(sqlitePath, {
      metadata: repairedMetadata,
      sources: snapshots.map(({ source_path, sha256, size_bytes }) => ({
        source_path,
        sha256,
        size_bytes,
      })),
      rows,
    });
    if (!(await checkSqliteProjection(sqlitePath))) {
      throw new Error("Context projection repair did not pass SQLite integrity check.");
    }
    result = {
      sqlite_path: sqlitePath,
      receipt: {
        strategy: "full-rebuild",
        reason: "incremental-write-repair",
        added: added.length,
        changed: changed.length,
        removed: removed.length,
        unchanged,
        rows: rows.length,
      },
      metadata: repairedMetadata,
      warnings,
    };
  }
  return result;
}

export async function cmdContextReindex(
  opts: Parameters<typeof runContextReindex>[0],
): Promise<number> {
  renderContextReindexResult(await runContextReindex(opts));
  return 0;
}

export async function readContextProjection(root: string): Promise<ProjectionIndex | null> {
  const sqlitePath = resolveAgentplaneCacheSqlitePath(root);
  let pathIdentity;
  try {
    pathIdentity = await captureContainedPathChainIdentity({
      repository_root: root,
      file_path: sqlitePath,
      label: "context projection cache",
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return null;
    throw error;
  }
  if (!pathIdentity.target_exists) return null;

  const sqliteProjection = await readSqliteProjection(pathIdentity.file_path).catch(() => null);
  await assertContainedPathChainIdentityUnchanged(pathIdentity, "context projection cache");
  if (sqliteProjection) {
    return sqliteProjection.metadata.projection_version === PROJECTION_VERSION
      ? sqliteProjection
      : null;
  }

  const expectedIdentity = pathIdentity.identities.at(-1);
  if (!expectedIdentity) {
    throw new Error(`Refusing invalid context projection cache path: ${pathIdentity.file_path}`);
  }
  try {
    const raw = await readContainedStableTextNoFollow({
      repository_root: pathIdentity.repository_root,
      file_path: pathIdentity.file_path,
      label: "context projection cache",
      max_bytes: MAX_LEGACY_JSON_PROJECTION_BYTES,
      expected_identity: expectedIdentity,
    });
    return JSON.parse(raw) as ProjectionIndex;
  } catch (error) {
    if (
      (error as NodeJS.ErrnoException | null)?.code === "ELOOP" ||
      (error instanceof Error &&
        (error.message.startsWith("Refusing ") || error.message.includes(" path changed")))
    ) {
      throw error;
    }
    return null;
  }
}

export async function searchContextProjection(
  root: string,
  opts: SqliteProjectionSearchOptions,
): Promise<SqliteProjectionSearchResult | null> {
  const sqlitePath = resolveAgentplaneCacheSqlitePath(root);
  let pathIdentity;
  try {
    pathIdentity = await captureContainedPathChainIdentity({
      repository_root: root,
      file_path: sqlitePath,
      label: "context projection cache",
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return null;
    throw error;
  }
  if (!pathIdentity.target_exists) return null;

  const result = await searchSqliteProjection(pathIdentity.file_path, opts).catch(() => null);
  await assertContainedPathChainIdentityUnchanged(pathIdentity, "context projection cache");
  return result?.metadata.projection_version === PROJECTION_VERSION ? result : null;
}
