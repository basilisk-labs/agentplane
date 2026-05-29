/* eslint-disable @typescript-eslint/no-empty-function, unicorn/no-array-sort */
import { createHash } from "node:crypto";
import { access, stat, mkdir, rm, readFile } from "node:fs/promises";
import path from "node:path";

import { infoMessage, warnMessage } from "../cli/output.js";
import { ensureRuntimeSqliteGitignore } from "../runtime/shared/runtime-gitignore.js";
import { resolveAgentplaneCacheSqlitePath } from "../shared/cache-paths.js";
import { collectMatchingFiles, fileExists, readText, toPosix } from "./context-utils.js";
import {
  isSupportedProjectionPath,
  projectRowsForFile,
  type ProjectionSourceRow,
} from "./reindex-projection.js";
import { readSqliteProjection, writeSqliteProjection } from "./sqlite.js";

const PROJECTION_VERSION = 1;

type ProjectionIndex = {
  metadata: {
    projection_version: number;
    generated_at: string;
    workspace_hash: string;
    include_tasks: boolean;
    include_raw: boolean;
  };
  rows: {
    path: string;
    sha256: string;
    content_type: string;
    projection_version: number;
    indexed_at: string;
    size_bytes: number;
    kind: string;
    body: string;
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
  const rows: ProjectionSourceRow[] = [];
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
  return 0;
}

export async function readContextProjection(root: string): Promise<ProjectionIndex | null> {
  const sqlitePath = resolveAgentplaneCacheSqlitePath(root);
  const sqliteProjection = await readSqliteProjection(sqlitePath).catch(() => null);
  if (sqliteProjection) return sqliteProjection;
  try {
    const raw = await readFile(sqlitePath, "utf8");
    return JSON.parse(raw) as ProjectionIndex;
  } catch {
    return null;
  }
}
