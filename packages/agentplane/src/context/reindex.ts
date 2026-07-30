/* eslint-disable @typescript-eslint/no-empty-function, unicorn/no-array-sort */
import { createHash } from "node:crypto";
import { access, stat, mkdir, rm } from "node:fs/promises";
import path from "node:path";

import { infoMessage, warnMessage } from "../cli/output.js";
import { ensureRuntimeSqliteGitignore } from "../runtime/shared/runtime-gitignore.js";
import { resolveAgentplaneCacheSqlitePath } from "../shared/cache-paths.js";
import {
  assertContainedPathChainIdentityUnchanged,
  captureContainedPathChainIdentity,
  readContainedStableTextNoFollow,
} from "../shared/contained-stable-file.js";
import { collectMatchingFiles, fileExists, readText, toPosix } from "./context-utils.js";
import {
  isSupportedProjectionPath,
  projectRowsForFile,
  type ProjectionSourceRow,
} from "./reindex-projection.js";
import {
  readSqliteProjection,
  searchSqliteProjection,
  writeSqliteProjection,
  type SqliteProjectionSearchOptions,
  type SqliteProjectionSearchResult,
} from "./sqlite.js";

export const PROJECTION_VERSION = 2;
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

export async function cmdContextReindex(opts: {
  cwd: string;
  rootOverride?: string;
  parsed: { includeTasks: boolean; includeRaw: boolean; reset: boolean };
}): Promise<number> {
  const root = path.resolve(opts.rootOverride ?? opts.cwd);
  const service = path.join(root, ".agentplane", "context", "service");
  const sqlitePath = resolveAgentplaneCacheSqlitePath(root);

  if (opts.parsed.reset) {
    await rm(sqlitePath, { force: true }).catch(() => {});
  }

  await mkdir(service, { recursive: true });
  await rm(path.join(service, "cache"), { force: true, recursive: true }).catch(() => {});
  await rm(path.join(service, "embeddings"), { force: true, recursive: true }).catch(() => {});
  await rm(path.join(service, "remotes"), { force: true, recursive: true }).catch(() => {});
  await mkdir(path.join(service, "cache"), { recursive: true });
  await mkdir(path.join(service, "embeddings"), { recursive: true });
  await mkdir(path.join(service, "remotes"), { recursive: true });

  const files = await enumerateSourceFiles(root, {
    includeTasks: opts.parsed.includeTasks,
    includeRaw: opts.parsed.includeRaw,
  });
  if (files.length === 0) {
    process.stdout.write(
      warnMessage(`no source files found for reindex under configured scopes\n`),
    );
  }

  const now = new Date().toISOString();
  const projectionStartedAt = performance.now();
  const rows: ProjectionSourceRow[] = [];
  let sourceBytes = 0;
  for (const rel of files) {
    const abs = path.join(root, rel);
    if (!(await fileExists(abs))) {
      continue;
    }
    if (!isSupportedProjectionPath(toPosix(rel))) {
      continue;
    }

    const fileStats = await stat(abs);
    if (!fileStats.isFile()) {
      continue;
    }
    try {
      const text = await readText(abs);
      const nextRows = projectRowsForFile(toPosix(rel), text);
      rows.push(...nextRows);
      sourceBytes += Buffer.byteLength(text, "utf8");
    } catch {
      // Skip unreadable files from projection to keep reindex resilient.
      continue;
    }
  }

  const payload: ProjectionIndex = {
    metadata: {
      projection_version: PROJECTION_VERSION,
      generated_at: now,
      workspace_hash: defaultWorkspaceHash(root),
      include_tasks: opts.parsed.includeTasks,
      include_raw: opts.parsed.includeRaw,
      source_bytes: sourceBytes,
      search_text_bytes: rows.reduce(
        (total, row) => total + Buffer.byteLength(row.search_text, "utf8"),
        0,
      ),
      preview_text_bytes: rows.reduce(
        (total, row) => total + Buffer.byteLength(row.preview_text, "utf8"),
        0,
      ),
      projection_elapsed_ms: Math.round(performance.now() - projectionStartedAt),
    },
    rows: rows.map((row) => ({
      ...row,
      projection_version: PROJECTION_VERSION,
      indexed_at: now,
      size_bytes: row.size_bytes,
    })),
  };
  await ensureRuntimeSqliteGitignore({ gitRoot: root }).catch(() => null);
  await writeSqliteProjection(sqlitePath, payload);

  process.stdout.write(infoMessage(`reindex prepared at ${sqlitePath}`) + "\n");
  process.stdout.write(infoMessage(`rows=${rows.length} files=${files.length}\n`));
  process.stdout.write(
    infoMessage(
      `projection_metrics source_bytes=${payload.metadata.source_bytes} search_text_bytes=${payload.metadata.search_text_bytes} preview_text_bytes=${payload.metadata.preview_text_bytes} elapsed_ms=${payload.metadata.projection_elapsed_ms}`,
    ) + "\n",
  );
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
