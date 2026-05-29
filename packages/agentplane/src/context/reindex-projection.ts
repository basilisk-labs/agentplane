/* eslint-disable @typescript-eslint/no-base-to-string */
import { createHash } from "node:crypto";

import { parseJsonlLines, toPosix } from "./context-utils.js";

export type ProjectionSourceRow = {
  path: string;
  sha256: string;
  content_type: string;
  kind: string;
  body: string;
  size_bytes: number;
  source_refs?: string[];
};

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

export function isSupportedProjectionPath(filePath: string): boolean {
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

function sourceRefsForJsonlRow(row: unknown, fallback: string): string[] {
  if (!row || typeof row !== "object") return [fallback];
  const record = row as Record<string, unknown>;
  const refs: string[] = [];
  if (typeof record.source_ref === "string" && record.source_ref.trim()) {
    refs.push(record.source_ref);
  }
  if (typeof record.source === "string" && record.source.trim()) {
    refs.push(record.source);
  }
  if (Array.isArray(record.source_refs)) {
    refs.push(...record.source_refs.filter((value): value is string => typeof value === "string"));
  }
  return refs.length > 0 ? [...new Set(refs)] : [fallback];
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

export function projectRowsForFile(filePath: string, content: string): ProjectionSourceRow[] {
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
        source_refs: sourceRefsForJsonlRow(row, `${rel}#${selector}=${id}`),
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
