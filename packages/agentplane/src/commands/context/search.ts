/* eslint-disable unicorn/no-array-sort */
import path from "node:path";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";

import { CliError } from "../../shared/errors.js";
import {
  buildSnippet,
  fileExists,
  normalizeScopeList,
  parseJsonlLines,
  readText,
  scoreMatch,
  walkScopeFiles,
} from "./context-utils.js";
import { createProjectionFreshnessCache } from "../../context/search-freshness.js";
import { searchContextProjection } from "./reindex.js";

const MAX_FALLBACK_FILES = 200;
const DEFAULT_TOP_K = 20;
const MAX_TOP_K = 100;

type SearchResult = {
  path: string;
  score: number;
  snippet: string;
  highlight?: string;
  line?: number;
  refs?: string[];
  freshness: {
    projection_sha256: string | null;
    file_sha256: string | null;
    stale: boolean;
  };
};

export async function cmdContextSearch(opts: {
  cwd: string;
  parsed: {
    query: string;
    scope: string;
    format: "text" | "json";
    explain: boolean;
    topK?: string;
    page?: string;
    projectRoot?: string;
  };
  rootOverride?: string;
}): Promise<number> {
  const query = opts.parsed.query?.trim().toLowerCase();
  if (!query) {
    throw new CliError({ exitCode: 2, code: "E_USAGE", message: "query is required" });
  }

  const root = path.resolve(opts.rootOverride ?? opts.cwd);
  const scopes = normalizeScopeList(opts.parsed.scope);
  const pagination = parsePagination(opts.parsed);
  const indexed = await searchContextProjection(root, {
    query,
    scopes,
    limit: pagination.topK * pagination.page,
    offset: 0,
  });
  const results: SearchResult[] = [];
  const freshnessForRow = createProjectionFreshnessCache(root);
  let fallbackReason: string | null = indexed ? null : "missing_or_unreadable_index";

  if (indexed) {
    for (const row of indexed.rows) {
      const freshness = await freshnessForRow(row.path, row.sha256);
      if (freshness.stale) {
        fallbackReason ??= "stale_projection_row";
        continue;
      }
      results.push({
        path: row.path,
        score: Number.isFinite(row.rank) ? -row.rank : 0,
        snippet: row.preview_text,
        highlight: row.highlight,
        refs: row.source_refs?.length ? row.source_refs : [row.path],
        freshness,
      });
    }
    if (requiresUnindexedFallback(indexed.metadata, scopes)) {
      fallbackReason ??= "unindexed_scope";
    }
  }

  if (fallbackReason) {
    results.push(
      ...(await searchLiveFallback(root, scopes, query, pagination.topK * pagination.page)),
    );
  }

  const ordered = dedupeAndSort(results).slice(
    pagination.offset,
    pagination.offset + pagination.topK,
  );

  if (opts.parsed.format === "json") {
    process.stdout.write(
      JSON.stringify(
        {
          query,
          scope: scopes,
          adapter: indexed ? "sqlite" : "local-stub",
          strategy: indexed
            ? fallbackReason
              ? "fts5-bm25+bounded-live-fallback"
              : "fts5-bm25"
            : "bounded-live-fallback",
          index_digest: indexed?.metadata.workspace_hash ?? null,
          fallback: {
            used: fallbackReason !== null,
            reason: fallbackReason,
            max_files: fallbackReason ? MAX_FALLBACK_FILES : 0,
          },
          pagination: { top_k: pagination.topK, page: pagination.page },
          explain: opts.parsed.explain,
          count: ordered.length,
          results: ordered.map((item) => ({
            ref: item.path,
            title: item.path.split("/").at(-1),
            kind: item.path.endsWith(".jsonl") ? "jsonl" : "document",
            score: item.score,
            snippet: item.snippet,
            highlight: item.highlight ?? null,
            line: item.line,
            source_refs: item.refs ?? [],
            freshness: item.freshness,
          })),
        },
        null,
        2,
      ),
    );
    process.stdout.write("\n");
    return 0;
  }

  if (ordered.length === 0) {
    process.stdout.write("No matches\n");
    return 0;
  }

  for (const result of ordered) {
    const score = result.score.toFixed(2);
    process.stdout.write(`${score} ${result.path}\n`);
    if (result.line) process.stdout.write(`  line: ${result.line}\n`);
    if (result.freshness.stale) {
      process.stdout.write(
        `  stale_projection=true (projection=${result.freshness.projection_sha256 ?? "n/a"})\n`,
      );
    }
    process.stdout.write(`  ${result.snippet.replaceAll("\n", String.raw`\n`)}\n`);
  }
  return 0;
}

function parsePagination(parsed: { topK?: string; page?: string }): {
  topK: number;
  page: number;
  offset: number;
} {
  const requestedTopK = Number(parsed.topK ?? DEFAULT_TOP_K);
  const requestedPage = Number(parsed.page ?? 1);
  const topK = Number.isInteger(requestedTopK)
    ? Math.min(MAX_TOP_K, Math.max(1, requestedTopK))
    : DEFAULT_TOP_K;
  const page = Number.isInteger(requestedPage) ? Math.max(1, requestedPage) : 1;
  return { topK, page, offset: (page - 1) * topK };
}

function requiresUnindexedFallback(
  metadata: { include_tasks: boolean; include_raw: boolean },
  scopes: ReturnType<typeof normalizeScopeList>,
): boolean {
  return (
    (scopes.includes("raw") && !metadata.include_raw) ||
    (scopes.some((scope) => scope === "tasks" || scope === "tasks-acr") && !metadata.include_tasks)
  );
}

async function searchLiveFallback(
  root: string,
  scopes: ReturnType<typeof normalizeScopeList>,
  query: string,
  resultLimit: number,
): Promise<SearchResult[]> {
  const results: SearchResult[] = [];
  const scopedFiles = await walkScopeFiles(root, scopes);
  const files = scopedFiles.slice(0, MAX_FALLBACK_FILES);
  for (const relative of files) {
    const abs = path.join(root, relative);
    if (!(await fileExists(abs))) continue;
    if (!relative.endsWith(".md") && !relative.endsWith(".jsonl") && !relative.endsWith(".json")) {
      continue;
    }

    const text = await readText(abs);
    if (relative.endsWith(".jsonl")) {
      const rows = parseJsonlLines(text);
      const lines = text.split(/\r?\n/);
      for (const [index, row] of rows.entries()) {
        const haystack = JSON.stringify(row).toLowerCase();
        if (!matchesQuery(haystack, query)) continue;
        const id = String(row.id ?? index + 1);
        results.push({
          path: `${relative}#entity=${id}`,
          score: scoreSearchText(haystack, query),
          snippet: buildSnippet(lines, index + 1, index + 1),
          refs: Array.isArray((row as { source_refs?: unknown })?.source_refs)
            ? ((row as { source_refs?: unknown }).source_refs as string[])
            : undefined,
          freshness: {
            projection_sha256: null,
            file_sha256: await calculateSha256(abs),
            stale: false,
          },
        });
      }
      continue;
    }

    const lines = text.split(/\r?\n/);
    const matches = lines
      .map((line, index) => (matchesQuery(line, query) ? index + 1 : 0))
      .filter(Boolean);
    if (matches.length === 0) continue;
    const start = matches[0] ?? 1;
    const end = Math.min(lines.length, start + 5);
    results.push({
      path: relative,
      score: scoreSearchText(text, query),
      snippet: buildSnippet(lines, start, end),
      line: start,
      freshness: { projection_sha256: null, file_sha256: null, stale: false },
    });
  }
  return dedupeAndSort(results).slice(0, resultLimit);
}

function dedupeAndSort(results: SearchResult[]): SearchResult[] {
  const byPath = new Map<string, SearchResult>();
  for (const result of results) {
    const existing = byPath.get(result.path);
    if (!existing || result.score > existing.score) byPath.set(result.path, result);
  }
  return [...byPath.values()].sort(
    (left, right) => right.score - left.score || left.path.localeCompare(right.path),
  );
}

function queryTokens(query: string): string[] {
  return query
    .toLowerCase()
    .split(/\s+/u)
    .map((token) => token.trim())
    .filter(Boolean);
}

function matchesQuery(text: string, query: string): boolean {
  const haystack = text.toLowerCase();
  if (haystack.includes(query)) return true;
  const tokens = queryTokens(query);
  return tokens.length > 1 && tokens.every((token) => haystack.includes(token));
}

function scoreSearchText(text: string, query: string): number {
  const exact = scoreMatch(text, query);
  if (exact > 0.1 || text.toLowerCase().includes(query)) return exact;
  const haystack = text.toLowerCase();
  const tokens = queryTokens(query);
  if (tokens.length === 0) return 0;
  const matched = tokens.filter((token) => haystack.includes(token)).length;
  return Math.min(1, matched / tokens.length);
}

async function calculateSha256(filePath: string): Promise<string> {
  const hash = createHash("sha256");
  return await new Promise((resolve, reject) => {
    const stream = createReadStream(filePath);
    stream.on("data", (chunk: Buffer) => hash.update(chunk));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(`sha256:${hash.digest("hex")}`));
  });
}
