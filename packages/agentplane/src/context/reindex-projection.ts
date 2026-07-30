import { createHash } from "node:crypto";

import {
  createMarkdownSectionSlugger,
  jsonlRowIdentity,
  parseJsonlLines,
  toPosix,
} from "./context-utils.js";

export type ProjectionSourceRow = {
  path: string;
  sha256: string;
  content_type: string;
  kind: string;
  /** Complete unit content used by search and FTS. */
  search_text: string;
  /** A UTF-8-bounded, human-readable excerpt used only for result display. */
  preview_text: string;
  size_bytes: number;
  source_refs?: string[];
};

export const PROJECTION_PREVIEW_MAX_BYTES = 2 * 1024;
export const PROJECTION_PREVIEW_MAX_LINES = 20;
export const PROJECTION_WINDOW_MAX_LINES = 80;

function byteLength(input: string): number {
  return Buffer.byteLength(input, "utf8");
}

function truncateUtf8(input: string, maxBytes: number): string {
  if (byteLength(input) <= maxBytes) return input;
  const marker = "…";
  const markerBytes = byteLength(marker);
  let consumed = 0;
  let end = 0;
  for (const character of input) {
    const next = byteLength(character);
    if (consumed + next + markerBytes > maxBytes) break;
    consumed += next;
    end += character.length;
  }
  return `${input.slice(0, end)}${marker}`;
}

function previewText(input: string): string {
  const lines = input.split(/\r?\n/);
  return truncateUtf8(
    lines.slice(0, PROJECTION_PREVIEW_MAX_LINES).join("\n"),
    PROJECTION_PREVIEW_MAX_BYTES,
  );
}

function projectionTextFields(
  input: string,
): Pick<ProjectionSourceRow, "search_text" | "preview_text"> {
  return {
    search_text: input,
    preview_text: previewText(input),
  };
}

function lineWindowRef(filePath: string, start: number, end: number): string {
  return `${toPosix(filePath)}#lines=${start}-${end}`;
}

function canonicalSelectorValue(value: string): string {
  return encodeURIComponent(value).replaceAll("%3A", ":");
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
  if (normalized.endsWith("/edges.jsonl") || normalized.endsWith("/provenance_edges.jsonl")) {
    return "edge";
  }
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
  const nextSectionSlug = createMarkdownSectionSlugger();
  const rows: ProjectionSourceRow[] = [
    {
      path: rel,
      sha256: fileSha256,
      content_type: deriveContentType(filePath),
      kind: "markdown",
      source_refs: [rel],
      ...projectionTextFields(content),
      size_bytes: byteLength(content),
    },
  ];
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index] ?? "";
    if (!/^#{1,6}\s+/.test(line)) continue;
    const heading = line.replace(/^#{1,6}\s+/, "").trim();
    const sectionSlug = nextSectionSlug(heading);
    if (!sectionSlug) continue;
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
      ...projectionTextFields(body),
      size_bytes: byteLength(body),
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
      ...projectionTextFields(content),
      size_bytes: byteLength(content),
    },
  ];
  for (let start = 0; start < lines.length; start += PROJECTION_WINDOW_MAX_LINES) {
    const body = lines.slice(start, start + PROJECTION_WINDOW_MAX_LINES).join("\n");
    if (!body.trim()) continue;
    const startLine = start + 1;
    const endLine = Math.min(lines.length, start + PROJECTION_WINDOW_MAX_LINES);
    rows.push({
      path: lineWindowRef(rel, startLine, endLine),
      sha256: `sha256:${createHash("sha256").update(body).digest("hex")}`,
      content_type: deriveContentType(filePath),
      kind: "text-window",
      source_refs: [lineWindowRef(rel, startLine, endLine)],
      ...projectionTextFields(body),
      size_bytes: byteLength(body),
    });
  }
  return rows;
}

function projectStructuredJsonRows(filePath: string, content: string): ProjectionSourceRow[] {
  const rel = toPosix(filePath);
  const fileSha256 = `sha256:${createHash("sha256").update(content).digest("hex")}`;
  const lines = content.split(/\r?\n/);
  const rows: ProjectionSourceRow[] = [
    {
      path: rel,
      sha256: fileSha256,
      content_type: deriveContentType(filePath),
      kind: "json",
      source_refs: [rel],
      ...projectionTextFields(content),
      size_bytes: byteLength(content),
    },
  ];
  for (let start = 0; start < lines.length; start += PROJECTION_WINDOW_MAX_LINES) {
    const body = lines.slice(start, start + PROJECTION_WINDOW_MAX_LINES).join("\n");
    if (!body.trim()) continue;
    const startLine = start + 1;
    const endLine = Math.min(lines.length, start + PROJECTION_WINDOW_MAX_LINES);
    rows.push({
      path: lineWindowRef(rel, startLine, endLine),
      sha256: `sha256:${createHash("sha256").update(body).digest("hex")}`,
      content_type: deriveContentType(filePath),
      kind: "json-window",
      source_refs: [lineWindowRef(rel, startLine, endLine)],
      ...projectionTextFields(body),
      size_bytes: byteLength(body),
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
          ...projectionTextFields(content),
          size_bytes: byteLength(content),
        },
      ];
    }
    return rows.map((row, index) => {
      const serialized = JSON.stringify(row);
      const id = jsonlRowIdentity(row, index);
      const selectorValue = canonicalSelectorValue(id);
      const ref = `${rel}#${selector}=${selectorValue}`;
      return {
        path: ref,
        sha256: `sha256:${createHash("sha256").update(serialized).digest("hex")}`,
        content_type: deriveContentType(filePath),
        kind: "jsonl-row",
        source_refs: sourceRefsForJsonlRow(row, ref),
        ...projectionTextFields(serialized),
        size_bytes: byteLength(serialized),
      };
    });
  }
  if (filePath.endsWith(".json")) {
    return projectStructuredJsonRows(filePath, content);
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
      ...projectionTextFields(content),
      size_bytes: byteLength(content),
    },
  ];
}
