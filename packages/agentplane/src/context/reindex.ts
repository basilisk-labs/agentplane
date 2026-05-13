/* eslint-disable @typescript-eslint/no-base-to-string, @typescript-eslint/no-empty-function, unicorn/no-array-sort */
import { createHash } from "node:crypto";
import { access, stat, mkdir, rm, readFile } from "node:fs/promises";
import path from "node:path";

import { infoMessage, warnMessage } from "../../cli/output.js";
import { resolveAgentplaneCacheSqlitePath } from "../../shared/cache-paths.js";
import {
  collectMatchingFiles,
  parseJsonlLines,
  fileExists,
  readText,
  toPosix,
} from "./context-utils.js";
import { readSqliteProjection, writeSqliteProjection } from "./sqlite.js";

const PROJECTION_VERSION = 1;

type ProjectionSourceRow = {
  path: string;
  sha256: string;
  content_type: string;
  kind: string;
  body: string;
  size_bytes: number;
  source_refs?: string[];
};

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

function pickProjectionPayload(input: string): string {
  const text = input.toLowerCase();
  const lines = text.split(/\r?\n/);
  if (lines.length <= 40) return text;
  return lines.slice(0, 36).join("\n");
}

function slug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/gu, "-")
    .replaceAll(/^-+|-+$/gu, "");
}

function lineWindowRef(filePath: string, start: number, end: number): string {
  return `${toPosix(filePath)}#lines=${start}-${end}`;
}

function isSupportedProjectionPath(filePath: string): boolean {
  if (filePath.includes("/.git/")) return false;
  const lower = filePath.toLowerCase();
  return (
    lower.endsWith(".md") ||
    lower.endsWith(".mdx") ||
    lower.endsWith(".json") ||
    lower.endsWith(".jsonl") ||
    lower.endsWith(".yaml") ||
    lower.endsWith(".yml") ||
    lower.endsWith(".txt") ||
    lower.endsWith(".rst") ||
    lower.endsWith(".ts") ||
    lower.endsWith(".tsx") ||
    lower.endsWith(".js") ||
    lower.endsWith(".jsx") ||
    lower.endsWith(".py")
  );
}

function deriveContentType(filePath: string): string {
  const lower = filePath.toLowerCase();
  if (lower.endsWith(".md") || lower.endsWith(".mdx")) return "text/markdown";
  if (lower.endsWith(".json") || lower.endsWith(".jsonl")) return "application/json";
  if (lower.endsWith(".yaml") || lower.endsWith(".yml")) return "text/yaml";
  if (lower.endsWith(".txt") || lower.endsWith(".rst")) return "text/plain";
  if (/\.(ts|tsx|js|jsx|py|rs|go|sh|java|cpp|c|h|cs|rb|php|swift|kt|scala)$/.test(lower))
    return "text/plain";
  return "application/octet-stream";
}

function toProjectionRowKind(filePath: string): string {
  if (filePath.endsWith(".jsonl")) return "jsonl";
  if (filePath.endsWith(".json")) return "json";
  if (filePath.endsWith(".md") || filePath.endsWith(".mdx")) return "markdown";
  return "text";
}

function selectorForJsonlRow(filePath: string): string {
  const normalized = toPosix(filePath);
  if (normalized.includes("/facts/")) return "fact";
  if (normalized.endsWith("/entities.jsonl")) return "entity";
  if (normalized.endsWith("/edges.jsonl")) return "edge";
  if (normalized.includes("/capabilities/")) return "capability";
  if (normalized.includes("/tasks/")) return "task";
  return "row";
}

function projectMarkdownRows(filePath: string, content: string): ProjectionSourceRow[] {
  const rel = toPosix(filePath);
  const lines = content.split(/\r?\n/);
  const fileSha256 = `sha256:${createHash("sha256").update(content).digest("hex")}`;
  const sectionSlugCounts = new Map<string, number>();
  const rows: ProjectionSourceRow[] = [
    {
      path: rel,
      sha256: fileSha256,
      content_type: deriveContentType(filePath),
      kind: "markdown",
      source_refs: [rel],
      body: pickProjectionPayload(content),
      size_bytes: content.length,
    },
  ];
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index] ?? "";
    if (!/^#{1,6}\s+/.test(line)) continue;
    const heading = line.replace(/^#{1,6}\s+/, "").trim();
    const headingSlug = slug(heading);
    if (!headingSlug) continue;
    const slugCount = (sectionSlugCounts.get(headingSlug) ?? 0) + 1;
    sectionSlugCounts.set(headingSlug, slugCount);
    const sectionSlug = slugCount === 1 ? headingSlug : `${headingSlug}-${slugCount}`;
    let end = lines.length;
    for (let next = index + 1; next < lines.length; next += 1) {
      if (/^#{1,6}\s+/.test(lines[next] ?? "")) {
        end = next;
        break;
      }
    }
    const startLine = index + 1;
    const endLine = Math.max(startLine, end);
    const body = lines.slice(index, end).join("\n");
    rows.push({
      path: `${rel}#section=${sectionSlug}`,
      sha256: fileSha256,
      content_type: deriveContentType(filePath),
      kind: "markdown-section",
      source_refs: [`${rel}#section=${sectionSlug}`, lineWindowRef(rel, startLine, endLine)],
      body: pickProjectionPayload(body),
      size_bytes: body.length,
    });
  }
  return rows;
}

function projectPlainTextRows(filePath: string, content: string): ProjectionSourceRow[] {
  const rel = toPosix(filePath);
  const lines = content.split(/\r?\n/);
  const rows: ProjectionSourceRow[] = [
    {
      path: rel,
      sha256: `sha256:${createHash("sha256").update(content).digest("hex")}`,
      content_type: deriveContentType(filePath),
      kind: toProjectionRowKind(filePath),
      source_refs: [rel],
      body: pickProjectionPayload(content),
      size_bytes: content.length,
    },
  ];
  const windowSize = 80;
  for (let start = 0; start < lines.length; start += windowSize) {
    const body = lines.slice(start, start + windowSize).join("\n");
    if (!body.trim()) continue;
    const startLine = start + 1;
    const endLine = Math.min(lines.length, start + windowSize);
    rows.push({
      path: lineWindowRef(rel, startLine, endLine),
      sha256: `sha256:${createHash("sha256").update(body).digest("hex")}`,
      content_type: deriveContentType(filePath),
      kind: "text-window",
      source_refs: [lineWindowRef(rel, startLine, endLine)],
      body: pickProjectionPayload(body),
      size_bytes: body.length,
    });
  }
  return rows;
}

function projectRowsForFile(filePath: string, content: string): ProjectionSourceRow[] {
  const rel = toPosix(filePath);
  if (filePath.endsWith(".jsonl")) {
    const rows = parseJsonlLines(content);
    const selector = selectorForJsonlRow(filePath);
    if (rows.length === 0) {
      return [
        {
          path: rel,
          sha256: `sha256:${createHash("sha256").update(content).digest("hex")}`,
          content_type: deriveContentType(filePath),
          kind: "jsonl-file",
          source_refs: [toPosix(filePath)],
          body: pickProjectionPayload(content),
          size_bytes: content.length,
        },
      ];
    }
    return rows.map((row, index) => {
      const serialized = JSON.stringify(row);
      const id = String((row as { id?: unknown }).id ?? index + 1);
      return {
        path: `${rel}#${selector}=${id}`,
        sha256: `sha256:${createHash("sha256").update(serialized).digest("hex")}`,
        content_type: deriveContentType(filePath),
        kind: "jsonl-row",
        source_refs: [`${rel}#${selector}=${id}`],
        body: serialized,
        size_bytes: serialized.length,
      };
    });
  }
  if (filePath.endsWith(".json")) {
    return [
      {
        path: rel,
        sha256: `sha256:${createHash("sha256").update(content).digest("hex")}`,
        content_type: deriveContentType(filePath),
        kind: toProjectionRowKind(filePath),
        source_refs: [toPosix(filePath)],
        body: pickProjectionPayload(content),
        size_bytes: content.length,
      },
    ];
  }
  if (filePath.endsWith(".md") || filePath.endsWith(".mdx")) {
    return projectMarkdownRows(filePath, content);
  }
  if (deriveContentType(filePath) === "text/plain") {
    return projectPlainTextRows(filePath, content);
  }
  return [
    {
      path: rel,
      sha256: `sha256:${createHash("sha256").update(content).digest("hex")}`,
      content_type: deriveContentType(filePath),
      kind: toProjectionRowKind(filePath),
      source_refs: [toPosix(filePath)],
      body: pickProjectionPayload(content),
      size_bytes: content.length,
    },
  ];
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
        if (toPosix(match).startsWith("context/raw/private/")) continue;
        out.add(match);
      }
    } else {
      if (toPosix(rel).startsWith("context/raw/private/")) continue;
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
