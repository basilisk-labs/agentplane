import { createHash } from "node:crypto";
import path from "node:path";

import {
  KNOWLEDGE_REF_SCHEMA_VERSION,
  MAX_PREPARED_KNOWLEDGE_EXCERPT_BYTES,
  MAX_PREPARED_KNOWLEDGE_EXCERPT_LINES,
  PREPARED_KNOWLEDGE_EXCERPT_SCHEMA_VERSION,
  parseCanonicalKnowledgeRef,
  validateKnowledgeRef,
  validatePreparedKnowledgeExcerpt,
  type KnowledgeIndexFreshness,
  type KnowledgeRef,
  type KnowledgeSourceIdentity,
  type PreparedKnowledgeExcerpt,
} from "@agentplaneorg/core/schemas";

import { readContainedStableTextNoFollow } from "../shared/contained-stable-file.js";
import {
  buildSnippet,
  jsonlRowIdentity,
  locateMarkdownSection,
  parseLineRange,
} from "./context-utils.js";
import { projectRowsForFile } from "./reindex-projection.js";
import { readContextProjection } from "./reindex.js";

const DEFAULT_MAX_SOURCE_BYTES = 16 * 1024 * 1024;

export type KnowledgeIndexSnapshot = {
  metadata: {
    projection_version: number;
    generated_at: string;
  };
  rows: {
    path: string;
    sha256: string;
  }[];
};
type KnowledgeResolutionStaleReason =
  | "digest_mismatch"
  | "knowledge_index_stale"
  | "knowledge_index_missing"
  | "knowledge_index_unavailable";
type KnowledgeResolutionBase = {
  knowledge_ref: KnowledgeRef;
  index_freshness: KnowledgeIndexFreshness;
};
export type ResolvedKnowledgeRef =
  | (KnowledgeResolutionBase & {
      status: "fresh";
      reason_code: "fresh";
      source: KnowledgeSourceIdentity;
      content: string;
    })
  | (KnowledgeResolutionBase & {
      status: "stale";
      reason_code: KnowledgeResolutionStaleReason;
      source: KnowledgeSourceIdentity;
      content: null;
    })
  | (KnowledgeResolutionBase & {
      status: "missing";
      reason_code: "source_missing" | "selected_item_missing";
      source: null;
      content: null;
    });
type TargetInspection =
  | {
      status: "found";
      source: KnowledgeSourceIdentity;
      content: string;
      projected_digest: string | null;
    }
  | {
      status: "missing";
      reason_code: "source_missing" | "selected_item_missing";
      projected_digest: string | null;
    };
function sha256(content: string): string {
  return `sha256:${createHash("sha256").update(content, "utf8").digest("hex")}`;
}
function contentLineCount(content: string): number {
  return content.length === 0 ? 0 : content.split(/\r?\n/u).length;
}
function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function normalizeProjectionVersion(value: number): number | null {
  return Number.isSafeInteger(value) && value > 0 ? value : null;
}
function normalizeGeneratedAt(value: string): string | null {
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) return null;
  try {
    return new Date(timestamp).toISOString();
  } catch {
    return null;
  }
}
function validDigest(value: string): string | null {
  return /^sha256:[0-9a-f]{64}$/u.test(value) ? value : null;
}

function indexFreshness(opts: {
  snapshot: KnowledgeIndexSnapshot | null;
  ref: string;
  projected_digest: string | null;
}): KnowledgeIndexFreshness {
  if (!opts.snapshot) {
    return {
      status: "unavailable",
      projection_version: null,
      generated_at: null,
      indexed_digest: null,
      observed_digest: opts.projected_digest,
    };
  }
  const snapshot = opts.snapshot as unknown;
  if (!isRecord(snapshot) || !isRecord(snapshot.metadata) || !Array.isArray(snapshot.rows)) {
    return {
      status: "unavailable",
      projection_version: null,
      generated_at: null,
      indexed_digest: null,
      observed_digest: opts.projected_digest,
    };
  }
  const projectionVersion =
    typeof snapshot.metadata.projection_version === "number"
      ? normalizeProjectionVersion(snapshot.metadata.projection_version)
      : null;
  const generatedAt =
    typeof snapshot.metadata.generated_at === "string"
      ? normalizeGeneratedAt(snapshot.metadata.generated_at)
      : null;
  if (projectionVersion === null || generatedAt === null) {
    return {
      status: "unavailable",
      projection_version: null,
      generated_at: null,
      indexed_digest: null,
      observed_digest: opts.projected_digest,
    };
  }
  const indexed = snapshot.rows.find((row) => isRecord(row) && row.path === opts.ref) as
    | Record<string, unknown>
    | undefined;
  if (!indexed) {
    return {
      status: "missing",
      projection_version: projectionVersion,
      generated_at: generatedAt,
      indexed_digest: null,
      observed_digest: opts.projected_digest,
    };
  }
  const indexedDigest = typeof indexed.sha256 === "string" ? validDigest(indexed.sha256) : null;
  const fresh =
    indexedDigest !== null &&
    opts.projected_digest !== null &&
    indexedDigest === opts.projected_digest;
  return {
    status: fresh ? "fresh" : "stale",
    projection_version: projectionVersion,
    generated_at: generatedAt,
    indexed_digest: indexedDigest,
    observed_digest: opts.projected_digest,
  };
}

function isMissingPathError(error: unknown): boolean {
  return (error as NodeJS.ErrnoException | null)?.code === "ENOENT";
}

function resolveJsonlItem(opts: {
  raw: string;
  selector: { key: "fact" | "entity" | "edge"; value: string };
}): { content: string; digest: string; line: number } | null {
  const lines = opts.raw.split(/\r?\n/u);
  let projectedIndex = 0;
  for (const [index, line] of lines.entries()) {
    if (!line.trim()) continue;
    let row: Record<string, unknown>;
    try {
      const parsed = JSON.parse(line) as unknown;
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) continue;
      row = parsed as Record<string, unknown>;
    } catch {
      continue;
    }
    projectedIndex += 1;
    const identity = jsonlRowIdentity(row, projectedIndex - 1);
    if (identity !== opts.selector.value) {
      continue;
    }
    return {
      content: JSON.stringify(row, null, 2),
      digest: sha256(JSON.stringify(row)),
      line: index + 1,
    };
  }
  return null;
}

function selectKnowledgeContent(opts: {
  ref: string;
  raw: string;
  parsed: ReturnType<typeof parseCanonicalKnowledgeRef>;
}):
  | {
      status: "found";
      content: string;
      source_digest: string;
      line_start: number | null;
      line_end: number | null;
    }
  | { status: "missing" } {
  const selector = opts.parsed.selector;
  const lines = opts.raw.split(/\r?\n/u);
  if (!selector) {
    const count = contentLineCount(opts.raw);
    return {
      status: "found",
      content: opts.raw,
      source_digest: sha256(opts.raw),
      line_start: count === 0 ? null : 1,
      line_end: count === 0 ? null : count,
    };
  }
  if (selector.key === "line" || selector.key === "lines") {
    const range = parseLineRange(selector.value);
    if (!range || range[0] > lines.length) return { status: "missing" };
    const end = Math.min(range[1], lines.length);
    return {
      status: "found",
      content: buildSnippet(lines, range[0], end),
      source_digest: sha256(opts.raw),
      line_start: range[0],
      line_end: end,
    };
  }
  if (selector.key === "section") {
    const section = locateMarkdownSection(opts.raw, selector.value);
    if (!section) return { status: "missing" };
    const content = buildSnippet(lines, section.start, section.end);
    const hasContent = content.length > 0;
    return {
      status: "found",
      content,
      source_digest: sha256(opts.raw),
      line_start: hasContent ? section.start : null,
      line_end: hasContent ? section.end : null,
    };
  }
  if (selector.key !== "fact" && selector.key !== "entity" && selector.key !== "edge") {
    return { status: "missing" };
  }
  const row = resolveJsonlItem({
    raw: opts.raw,
    selector: { key: selector.key, value: selector.value },
  });
  if (!row) return { status: "missing" };
  return {
    status: "found",
    content: row.content,
    source_digest: row.digest,
    line_start: row.line,
    line_end: row.line,
  };
}

async function inspectKnowledgeTarget(opts: {
  repository_root: string;
  knowledge_ref: KnowledgeRef;
  max_source_bytes: number;
}): Promise<TargetInspection> {
  const parsed = parseCanonicalKnowledgeRef(opts.knowledge_ref.ref);
  const filePath = path.join(opts.repository_root, parsed.path);
  let raw: string;
  try {
    raw = await readContainedStableTextNoFollow({
      repository_root: opts.repository_root,
      file_path: filePath,
      label: "KnowledgeRef source",
      max_bytes: opts.max_source_bytes,
    });
  } catch (error) {
    if (isMissingPathError(error)) {
      return { status: "missing", reason_code: "source_missing", projected_digest: null };
    }
    throw error;
  }

  const selected = selectKnowledgeContent({
    ref: opts.knowledge_ref.ref,
    raw,
    parsed,
  });
  const projectedDigest =
    projectRowsForFile(parsed.path, raw).find((row) => row.path === opts.knowledge_ref.ref)
      ?.sha256 ?? null;
  if (selected.status === "missing") {
    return {
      status: "missing",
      reason_code: "selected_item_missing",
      projected_digest: projectedDigest,
    };
  }
  const source: KnowledgeSourceIdentity = {
    ref: opts.knowledge_ref.ref,
    path: parsed.path,
    selector: parsed.selector,
    line_start: selected.line_start,
    line_end: selected.line_end,
    observed_source_digest: selected.source_digest,
    content_digest: sha256(selected.content),
    content_bytes: Buffer.byteLength(selected.content, "utf8"),
    content_lines: contentLineCount(selected.content),
  };
  return {
    status: "found",
    source,
    content: selected.content,
    projected_digest: projectedDigest,
  };
}

function assertSourceBudget(maxSourceBytes: number): void {
  if (
    !Number.isSafeInteger(maxSourceBytes) ||
    maxSourceBytes <= 0 ||
    maxSourceBytes > DEFAULT_MAX_SOURCE_BYTES
  ) {
    throw new Error(
      `KnowledgeRef max_source_bytes must be between 1 and ${DEFAULT_MAX_SOURCE_BYTES}.`,
    );
  }
}

async function resolveIndexSnapshot(
  repositoryRoot: string,
  supplied: KnowledgeIndexSnapshot | null | undefined,
): Promise<KnowledgeIndexSnapshot | null> {
  if (supplied !== undefined) return supplied;
  return (await readContextProjection(repositoryRoot)) as KnowledgeIndexSnapshot | null;
}

function staleReason(opts: {
  knowledge_ref: KnowledgeRef;
  source: KnowledgeSourceIdentity;
  index_freshness: KnowledgeIndexFreshness;
}): KnowledgeResolutionStaleReason | null {
  if (opts.source.observed_source_digest !== opts.knowledge_ref.digest) {
    return "digest_mismatch";
  }
  if (opts.index_freshness.status === "stale") return "knowledge_index_stale";
  if (
    opts.knowledge_ref.retrieval === "fts" ||
    opts.knowledge_ref.retrieval === "semantic_rerank"
  ) {
    if (opts.index_freshness.status === "missing") return "knowledge_index_missing";
    if (opts.index_freshness.status === "unavailable") return "knowledge_index_unavailable";
  }
  return null;
}

export async function resolveKnowledgeRef(opts: {
  repository_root: string;
  knowledge_ref: KnowledgeRef;
  index_snapshot?: KnowledgeIndexSnapshot | null;
  max_source_bytes?: number;
}): Promise<ResolvedKnowledgeRef> {
  const knowledgeRef = validateKnowledgeRef(opts.knowledge_ref);
  const maxSourceBytes = opts.max_source_bytes ?? DEFAULT_MAX_SOURCE_BYTES;
  assertSourceBudget(maxSourceBytes);
  const [inspection, snapshot] = await Promise.all([
    inspectKnowledgeTarget({
      repository_root: path.resolve(opts.repository_root),
      knowledge_ref: knowledgeRef,
      max_source_bytes: maxSourceBytes,
    }),
    resolveIndexSnapshot(path.resolve(opts.repository_root), opts.index_snapshot),
  ]);
  const freshness = indexFreshness({
    snapshot,
    ref: knowledgeRef.ref,
    projected_digest: inspection.projected_digest,
  });
  if (inspection.status === "missing") {
    return {
      status: "missing",
      reason_code: inspection.reason_code,
      knowledge_ref: knowledgeRef,
      source: null,
      content: null,
      index_freshness: freshness,
    };
  }
  const reasonCode = staleReason({
    knowledge_ref: knowledgeRef,
    source: inspection.source,
    index_freshness: freshness,
  });
  if (reasonCode) {
    return {
      status: "stale",
      reason_code: reasonCode,
      knowledge_ref: knowledgeRef,
      source: inspection.source,
      content: null,
      index_freshness: freshness,
    };
  }
  return {
    status: "fresh",
    reason_code: "fresh",
    knowledge_ref: knowledgeRef,
    source: inspection.source,
    content: inspection.content,
    index_freshness: freshness,
  };
}

export async function materializeKnowledgeRef(opts: {
  repository_root: string;
  ref: string;
  kind: KnowledgeRef["kind"];
  reason: string;
  retrieval: KnowledgeRef["retrieval"];
  required: boolean;
  score?: number;
  index_snapshot?: KnowledgeIndexSnapshot | null;
  max_source_bytes?: number;
}): Promise<KnowledgeRef> {
  const provisional = validateKnowledgeRef({
    schema_version: KNOWLEDGE_REF_SCHEMA_VERSION,
    ref: opts.ref,
    digest: `sha256:${"0".repeat(64)}`,
    kind: opts.kind,
    reason: opts.reason,
    retrieval: opts.retrieval,
    required: opts.required,
    ...(opts.score === undefined ? {} : { score: opts.score }),
  });
  const maxSourceBytes = opts.max_source_bytes ?? DEFAULT_MAX_SOURCE_BYTES;
  assertSourceBudget(maxSourceBytes);
  const inspection = await inspectKnowledgeTarget({
    repository_root: path.resolve(opts.repository_root),
    knowledge_ref: provisional,
    max_source_bytes: maxSourceBytes,
  });
  if (inspection.status === "missing") {
    throw new Error(`Cannot materialize missing KnowledgeRef target: ${opts.ref}`);
  }
  const knowledgeRef = validateKnowledgeRef({
    ...provisional,
    digest: inspection.source.observed_source_digest,
  });
  const resolved = await resolveKnowledgeRef({
    repository_root: opts.repository_root,
    knowledge_ref: knowledgeRef,
    index_snapshot: opts.index_snapshot,
    max_source_bytes: maxSourceBytes,
  });
  if (resolved.status !== "fresh") {
    throw new Error(
      `Cannot materialize non-fresh KnowledgeRef (${resolved.reason_code}): ${opts.ref}`,
    );
  }
  return knowledgeRef;
}

function assertExcerptLimits(maxBytes: number, maxLines: number): void {
  if (
    !Number.isSafeInteger(maxBytes) ||
    maxBytes <= 0 ||
    maxBytes > MAX_PREPARED_KNOWLEDGE_EXCERPT_BYTES
  ) {
    throw new Error(
      `Knowledge excerpt max_bytes must be between 1 and ${MAX_PREPARED_KNOWLEDGE_EXCERPT_BYTES}.`,
    );
  }
  if (
    !Number.isSafeInteger(maxLines) ||
    maxLines <= 0 ||
    maxLines > MAX_PREPARED_KNOWLEDGE_EXCERPT_LINES
  ) {
    throw new Error(
      `Knowledge excerpt max_lines must be between 1 and ${MAX_PREPARED_KNOWLEDGE_EXCERPT_LINES}.`,
    );
  }
}

export async function prepareKnowledgeExcerpt(opts: {
  repository_root: string;
  knowledge_ref: KnowledgeRef;
  max_bytes: number;
  max_lines: number;
  index_snapshot?: KnowledgeIndexSnapshot | null;
  max_source_bytes?: number;
}): Promise<PreparedKnowledgeExcerpt> {
  assertExcerptLimits(opts.max_bytes, opts.max_lines);
  const resolution = await resolveKnowledgeRef({
    repository_root: opts.repository_root,
    knowledge_ref: opts.knowledge_ref,
    index_snapshot: opts.index_snapshot,
    max_source_bytes: opts.max_source_bytes,
  });
  const limits = { max_bytes: opts.max_bytes, max_lines: opts.max_lines };
  if (resolution.status === "missing") {
    return validatePreparedKnowledgeExcerpt({
      schema_version: PREPARED_KNOWLEDGE_EXCERPT_SCHEMA_VERSION,
      kind: "prepared_knowledge_excerpt",
      knowledge_ref: resolution.knowledge_ref,
      index_freshness: resolution.index_freshness,
      status: "missing",
      reason_code: resolution.reason_code,
      source: null,
      limits,
      observed: {
        original_bytes: 0,
        emitted_bytes: 0,
        original_lines: 0,
        emitted_lines: 0,
      },
    });
  }
  const observedBase = {
    original_bytes: resolution.source.content_bytes,
    emitted_bytes: 0,
    original_lines: resolution.source.content_lines,
    emitted_lines: 0,
  };
  if (resolution.status === "stale") {
    return validatePreparedKnowledgeExcerpt({
      schema_version: PREPARED_KNOWLEDGE_EXCERPT_SCHEMA_VERSION,
      kind: "prepared_knowledge_excerpt",
      knowledge_ref: resolution.knowledge_ref,
      index_freshness: resolution.index_freshness,
      status: "stale",
      reason_code: resolution.reason_code,
      source: resolution.source,
      limits,
      observed: observedBase,
    });
  }
  if (resolution.source.content_bytes > opts.max_bytes) {
    return validatePreparedKnowledgeExcerpt({
      schema_version: PREPARED_KNOWLEDGE_EXCERPT_SCHEMA_VERSION,
      kind: "prepared_knowledge_excerpt",
      knowledge_ref: resolution.knowledge_ref,
      index_freshness: resolution.index_freshness,
      status: "omitted",
      reason_code: "max_bytes_exceeded",
      source: resolution.source,
      limits,
      observed: observedBase,
    });
  }
  if (resolution.source.content_lines > opts.max_lines) {
    return validatePreparedKnowledgeExcerpt({
      schema_version: PREPARED_KNOWLEDGE_EXCERPT_SCHEMA_VERSION,
      kind: "prepared_knowledge_excerpt",
      knowledge_ref: resolution.knowledge_ref,
      index_freshness: resolution.index_freshness,
      status: "omitted",
      reason_code: "max_lines_exceeded",
      source: resolution.source,
      limits,
      observed: observedBase,
    });
  }
  return validatePreparedKnowledgeExcerpt({
    schema_version: PREPARED_KNOWLEDGE_EXCERPT_SCHEMA_VERSION,
    kind: "prepared_knowledge_excerpt",
    knowledge_ref: resolution.knowledge_ref,
    index_freshness: resolution.index_freshness,
    status: "included",
    reason_code: "included",
    source: resolution.source,
    limits,
    observed: {
      ...observedBase,
      emitted_bytes: resolution.source.content_bytes,
      emitted_lines: resolution.source.content_lines,
    },
    content: resolution.content,
  });
}
