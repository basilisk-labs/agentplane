import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

import type { ManifestEntry } from "./ingest-manifest.js";

export type SourceSpanSkeletonRow = {
  span_id: string;
  source_path: string;
  start_line: number;
  end_line: number;
  content_sha256: string;
  text_preview: string;
  suggested_span_type: "markdown_section" | "jsonl_row" | "text_block";
  classification_required: true;
  coverage_status: "unclassified";
};

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function normalizeSpanText(text: string): string {
  return text
    .replaceAll(/\r\n?/gu, "\n")
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .trim();
}

function spanId(sourcePath: string, text: string, occurrence: number): string {
  return `span.${sha256(sourcePath).slice(0, 12)}.${sha256(normalizeSpanText(text)).slice(0, 12)}.${occurrence}`;
}

function isTextSource(row: ManifestEntry): boolean {
  return (
    row.content_type.startsWith("text/") ||
    row.content_type === "application/json" ||
    row.path.toLowerCase().endsWith(".jsonl")
  );
}

function preview(text: string): string {
  return normalizeSpanText(text).replaceAll(/\s+/gu, " ").slice(0, 160);
}

function makeRow(
  sourcePath: string,
  startLine: number,
  endLine: number,
  text: string,
  suggestedSpanType: SourceSpanSkeletonRow["suggested_span_type"],
  occurrenceByContent: Map<string, number>,
): SourceSpanSkeletonRow | null {
  const normalized = normalizeSpanText(text);
  if (!normalized) return null;
  const contentKey = sha256(`${sourcePath}\0${normalized}`);
  const occurrence = (occurrenceByContent.get(contentKey) ?? 0) + 1;
  occurrenceByContent.set(contentKey, occurrence);
  return {
    span_id: spanId(sourcePath, normalized, occurrence),
    source_path: sourcePath,
    start_line: startLine,
    end_line: endLine,
    content_sha256: `sha256:${sha256(normalized)}`,
    text_preview: preview(normalized),
    suggested_span_type: suggestedSpanType,
    classification_required: true,
    coverage_status: "unclassified",
  };
}

function buildJsonlSpans(
  sourcePath: string,
  lines: string[],
  occurrenceByContent: Map<string, number>,
): SourceSpanSkeletonRow[] {
  return lines
    .map((line, index) =>
      makeRow(sourcePath, index + 1, index + 1, line, "jsonl_row", occurrenceByContent),
    )
    .filter((row): row is SourceSpanSkeletonRow => row !== null);
}

function buildMarkdownSpans(
  sourcePath: string,
  lines: string[],
  occurrenceByContent: Map<string, number>,
): SourceSpanSkeletonRow[] {
  const headingIndexes = lines
    .map((line, index) => (/^#{1,6}\s+\S/u.test(line) ? index : -1))
    .filter((index) => index >= 0);
  if (headingIndexes.length === 0)
    return buildTextBlockSpans(sourcePath, lines, occurrenceByContent);

  const spans: SourceSpanSkeletonRow[] = [];
  const firstHeading = headingIndexes[0] ?? 0;
  if (firstHeading > 0) {
    const row = makeRow(
      sourcePath,
      1,
      firstHeading,
      lines.slice(0, firstHeading).join("\n"),
      "markdown_section",
      occurrenceByContent,
    );
    if (row) spans.push(row);
  }
  for (let i = 0; i < headingIndexes.length; i += 1) {
    const start = headingIndexes[i] ?? 0;
    const next = headingIndexes[i + 1] ?? lines.length;
    const row = makeRow(
      sourcePath,
      start + 1,
      next,
      lines.slice(start, next).join("\n"),
      "markdown_section",
      occurrenceByContent,
    );
    if (row) spans.push(row);
  }
  return spans;
}

function buildTextBlockSpans(
  sourcePath: string,
  lines: string[],
  occurrenceByContent: Map<string, number>,
): SourceSpanSkeletonRow[] {
  const spans: SourceSpanSkeletonRow[] = [];
  let start: number | null = null;
  for (let i = 0; i <= lines.length; i += 1) {
    const line = lines[i] ?? "";
    const isBoundary = i === lines.length || line.trim() === "";
    if (!isBoundary && start === null) start = i;
    if (isBoundary && start !== null) {
      const row = makeRow(
        sourcePath,
        start + 1,
        i,
        lines.slice(start, i).join("\n"),
        "text_block",
        occurrenceByContent,
      );
      if (row) spans.push(row);
      start = null;
    }
  }
  return spans;
}

export async function buildSourceSpanSkeleton(opts: {
  root: string;
  sources: ManifestEntry[];
}): Promise<SourceSpanSkeletonRow[]> {
  const rows: SourceSpanSkeletonRow[] = [];
  for (const source of opts.sources.toSorted((left, right) =>
    left.path.localeCompare(right.path),
  )) {
    if (source.status === "deleted" || source.status === "unsupported" || !isTextSource(source)) {
      continue;
    }
    const abs = path.join(opts.root, source.path);
    let text: string;
    try {
      text = await readFile(abs, "utf8");
    } catch {
      continue;
    }
    const lines = text.replaceAll(/\r\n?/gu, "\n").split("\n");
    const occurrenceByContent = new Map<string, number>();
    if (source.path.toLowerCase().endsWith(".jsonl"))
      rows.push(...buildJsonlSpans(source.path, lines, occurrenceByContent));
    else if (source.content_type === "text/markdown")
      rows.push(...buildMarkdownSpans(source.path, lines, occurrenceByContent));
    else rows.push(...buildTextBlockSpans(source.path, lines, occurrenceByContent));
  }
  return rows;
}
