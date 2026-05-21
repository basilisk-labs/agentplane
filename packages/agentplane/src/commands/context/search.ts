/* eslint-disable unicorn/no-array-sort */
import path from "node:path";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";

import { CliError } from "../../shared/errors.js";
import {
  buildSnippet,
  fileExists,
  normalizeScopeList,
  pathMatchesScopes,
  parseJsonlLines,
  readText,
  scoreMatch,
  walkScopeFiles,
} from "./context-utils.js";
import { readContextProjection } from "./reindex.js";

type SearchResult = {
  path: string;
  score: number;
  snippet: string;
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
  const results: SearchResult[] = [];
  let usedSQLite = false;
  const projection = await readContextProjection(root);
  if (projection) {
    for (const row of projection.rows) {
      if (!pathMatchesScopes(row.path, scopes)) continue;
      if (row.body.toLowerCase().includes(query)) {
        const freshness = await buildFreshness(root, row.path, row.sha256);
        if (freshness.stale) continue;
        usedSQLite = true;
        results.push({
          path: row.path,
          score: scoreMatch(row.body, query),
          snippet: buildSnippet(row.body.split("\n"), 1, Math.min(row.body.split("\n").length, 4)),
          refs: [row.path],
          freshness,
        });
      }
    }
  }

  const files = await walkScopeFiles(root, scopes);

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
        if (!haystack.includes(query)) continue;
        const id = String(row.id ?? index + 1);
        results.push({
          path: `${relative}#entity=${id}`,
          score: scoreMatch(haystack, query),
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
      .map((line, index) => (line.toLowerCase().includes(query) ? index + 1 : 0))
      .filter(Boolean);
    if (matches.length === 0) continue;
    const start = matches[0] ?? 1;
    const end = Math.min(lines.length, start + 5);
    results.push({
      path: relative,
      score: scoreMatch(text, query),
      snippet: buildSnippet(lines, start, end),
      line: start,
      freshness: { projection_sha256: null, file_sha256: null, stale: false },
    });
  }

  if (opts.parsed.format === "json") {
    process.stdout.write(
      JSON.stringify(
        {
          query,
          scope: scopes,
          adapter: usedSQLite ? "sqlite" : "local-stub",
          explain: opts.parsed.explain,
          count: results.length,
          results: results
            .map((item) => ({
              ref: item.path,
              title: item.path.split("/").at(-1),
              kind: item.path.endsWith(".jsonl") ? "jsonl" : "document",
              score: item.score,
              snippet: item.snippet,
              line: item.line,
              source_refs: item.refs ?? [],
              freshness: item.freshness,
            }))
            .sort((left, right) => right.score - left.score),
        },
        null,
        2,
      ),
    );
    process.stdout.write("\n");
    return 0;
  }

  if (results.length === 0) {
    process.stdout.write("No matches\n");
    return 0;
  }

  for (const result of results.sort((left, right) => right.score - left.score)) {
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

async function buildFreshness(
  root: string,
  rowPath: string,
  projectionSha256: string,
): Promise<{ projection_sha256: string; file_sha256: string | null; stale: boolean }> {
  const base = rowPath.split("#", 1)[0];
  const absolute = path.join(root, base);
  try {
    const st = await stat(absolute);
    if (!st.isFile()) {
      return { projection_sha256: projectionSha256, file_sha256: null, stale: true };
    }
  } catch {
    return { projection_sha256: projectionSha256, file_sha256: null, stale: true };
  }
  if (base.endsWith(".jsonl") && rowPath.includes("#")) {
    return buildJsonlRowFreshness(absolute, rowPath, projectionSha256);
  }
  const fileSha256 = await calculateSha256(absolute);
  return {
    projection_sha256: projectionSha256,
    file_sha256: fileSha256,
    stale: fileSha256 !== projectionSha256,
  };
}

async function buildJsonlRowFreshness(
  filePath: string,
  rowPath: string,
  projectionSha256: string,
): Promise<{ projection_sha256: string; file_sha256: string | null; stale: boolean }> {
  const marker = rowPath.slice(rowPath.indexOf("#") + 1);
  const separator = marker.indexOf("=");
  if (separator === -1) {
    const fileSha256 = await calculateSha256(filePath);
    return {
      projection_sha256: projectionSha256,
      file_sha256: fileSha256,
      stale: fileSha256 !== projectionSha256,
    };
  }
  const expectedId = marker.slice(separator + 1);
  const rows = parseJsonlLines(await readText(filePath));
  for (const [index, row] of rows.entries()) {
    const id = String(row.id ?? index + 1);
    if (id !== expectedId) continue;
    const rowSha256 = `sha256:${createHash("sha256").update(JSON.stringify(row)).digest("hex")}`;
    return {
      projection_sha256: projectionSha256,
      file_sha256: rowSha256,
      stale: rowSha256 !== projectionSha256,
    };
  }
  return { projection_sha256: projectionSha256, file_sha256: null, stale: true };
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
