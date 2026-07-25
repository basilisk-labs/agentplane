import { createHash } from "node:crypto";

import { z } from "zod";

import {
  assertValid,
  buildJsonSchemaDocument,
  schemaErrors,
} from "../tasks/task-artifact-schema.shared.js";

export const KNOWLEDGE_REF_SCHEMA_VERSION = 1 as const;
export const KNOWLEDGE_REF_KIND_VALUES = ["wiki", "fact", "entity", "edge", "source"] as const;
export const KNOWLEDGE_REF_RETRIEVAL_VALUES = [
  "exact",
  "fts",
  "alias",
  "graph",
  "semantic_rerank",
] as const;
export const KNOWLEDGE_INDEX_FRESHNESS_VALUES = [
  "fresh",
  "stale",
  "missing",
  "unavailable",
] as const;
export const PREPARED_KNOWLEDGE_EXCERPT_SCHEMA_VERSION = 1 as const;
export const PREPARED_KNOWLEDGE_EXCERPT_KIND = "prepared_knowledge_excerpt" as const;
export const MAX_PREPARED_KNOWLEDGE_EXCERPT_BYTES = 256 * 1024;
export const MAX_PREPARED_KNOWLEDGE_EXCERPT_LINES = 2000;

const KNOWLEDGE_REF_REASON_MAX_LENGTH = 4096;
const KNOWLEDGE_REF_MAX_LENGTH = 2048;
const MAX_CANONICAL_LINE_NUMBER = 999_999_999;
const MAX_CANONICAL_LINE_NUMBER_DIGITS = String(MAX_CANONICAL_LINE_NUMBER).length;
const SHA256_DIGEST_SCHEMA = z.string().regex(/^sha256:[0-9a-f]{64}$/u);
const NO_EDGE_WHITESPACE_PATTERN = /^\S(?:[\s\S]*\S)?$/u;

function hasAtMostCodePoints(value: string, maximum: number): boolean {
  let count = 0;
  for (const _character of value) {
    count += 1;
    if (count > maximum) return false;
  }
  return true;
}

const CANONICAL_NON_EMPTY_STRING_SCHEMA = z
  .string()
  .min(1)
  .max(KNOWLEDGE_REF_MAX_LENGTH * 2)
  .refine((value) => hasAtMostCodePoints(value, KNOWLEDGE_REF_MAX_LENGTH))
  .regex(NO_EDGE_WHITESPACE_PATTERN);
const KNOWLEDGE_REF_REASON_SCHEMA = z
  .string()
  .min(1)
  .max(KNOWLEDGE_REF_REASON_MAX_LENGTH * 2)
  .refine((value) => hasAtMostCodePoints(value, KNOWLEDGE_REF_REASON_MAX_LENGTH))
  .regex(NO_EDGE_WHITESPACE_PATTERN);
const SAFE_NONNEGATIVE_INTEGER_SCHEMA = z.number().int().nonnegative().safe();
const SAFE_POSITIVE_INTEGER_SCHEMA = z.number().int().positive().safe();

// Draft-07 cannot compare two integers embedded in one string. Bounding line numbers to nine
// digits makes the relation finite: fixed-width alternatives encode start <= end without a
// custom format. Every branch consumes at most nine digits per side, bounding backtracking.
function buildAscendingLineRangePattern(maxDigits: number): string {
  const alternatives: string[] = [];
  let nextCaptureGroup = 1;
  for (let startDigits = 1; startDigits < maxDigits; startDigits += 1) {
    alternatives.push(
      String.raw`[1-9]\d{${startDigits - 1}}-[1-9]\d{${startDigits},${maxDigits - 1}}`,
    );
  }
  for (let digits = 1; digits <= maxDigits; digits += 1) {
    const equalCaptureGroup = nextCaptureGroup;
    nextCaptureGroup += 1;
    alternatives.push(`([1-9]\\d{${digits - 1}})-\\${equalCaptureGroup}`);
    for (let position = 0; position < digits; position += 1) {
      const remaining = digits - position - 1;
      const prefixCaptureGroup = nextCaptureGroup;
      if (position > 0) nextCaptureGroup += 1;
      const greaterDigits: string[] = [];
      for (let digit = position === 0 ? 1 : 0; digit <= 8; digit += 1) {
        greaterDigits.push(
          `${digit}${String.raw`\d{${remaining}}`}-${position === 0 ? "" : `\\${prefixCaptureGroup}`}[${digit + 1}-9]${String.raw`\d{${remaining}}`}`,
        );
      }
      alternatives.push(
        position === 0
          ? `(?:${greaterDigits.join("|")})`
          : `([1-9]\\d{${position - 1}})(?:${greaterDigits.join("|")})`,
      );
    }
  }
  return `(?:${alternatives.join("|")})`;
}

const POSITIVE_LINE_PATTERN_SOURCE = String.raw`[1-9]\d{0,${MAX_CANONICAL_LINE_NUMBER_DIGITS - 1}}`;
const LINE_RANGE_SYNTAX_PATTERN_SOURCE = `${POSITIVE_LINE_PATTERN_SOURCE}-${POSITIVE_LINE_PATTERN_SOURCE}`;
const ASCENDING_LINE_RANGE_PATTERN_SOURCE = buildAscendingLineRangePattern(
  MAX_CANONICAL_LINE_NUMBER_DIGITS,
);
const CANONICAL_SECTION_PATTERN_SOURCE = String.raw`[a-z0-9]+(?:-[a-z0-9]+)*`;
const RAW_SELECTOR_CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_.!~*'():-";
const RAW_SELECTOR_TOKEN_PATTERN_SOURCE = String.raw`[A-Za-z0-9_.!~*'():-]`;
const ENCODED_ASCII_SELECTOR_TOKENS = Array.from(
  { length: 0x7f - 0x20 },
  (_, index) => index + 0x20,
)
  .map((codePoint) => String.fromCodePoint(codePoint))
  .filter((character) => !RAW_SELECTOR_CHARACTERS.includes(character))
  .map((character) => encodeURIComponent(character));
const ENCODED_ASCII_SELECTOR_TOKEN_PATTERN_SOURCE = `(?:${ENCODED_ASCII_SELECTOR_TOKENS.join("|")})`;
const ENCODED_ASCII_NONSPACE_SELECTOR_TOKEN_PATTERN_SOURCE = `(?:${ENCODED_ASCII_SELECTOR_TOKENS.filter((token) => token !== "%20").join("|")})`;
const ENCODED_UTF8_SELECTOR_TOKEN_PATTERN_SOURCE = String.raw`(?:%(?:C[2-9A-F]|D[0-9A-F])%[89AB][0-9A-F]|%E0%[AB][0-9A-F]%[89AB][0-9A-F]|%E[1-9ABC]%[89AB][0-9A-F]%[89AB][0-9A-F]|%ED%[89][0-9A-F]%[89AB][0-9A-F]|%E[EF]%[89AB][0-9A-F]%[89AB][0-9A-F]|%F0%(?:9[0-9A-F]|[AB][0-9A-F])%[89AB][0-9A-F]%[89AB][0-9A-F]|%F[1-3]%[89AB][0-9A-F]%[89AB][0-9A-F]%[89AB][0-9A-F]|%F4%8[0-9A-F]%[89AB][0-9A-F]%[89AB][0-9A-F])`;
const ENCODED_SELECTOR_EDGE_WHITESPACE_PATTERN_SOURCE = [
  "\u00A0",
  "\u1680",
  "\u2000",
  "\u2001",
  "\u2002",
  "\u2003",
  "\u2004",
  "\u2005",
  "\u2006",
  "\u2007",
  "\u2008",
  "\u2009",
  "\u200A",
  "\u2028",
  "\u2029",
  "\u202F",
  "\u205F",
  "\u3000",
  "\uFEFF",
]
  .map((character) => encodeURIComponent(character))
  .join("|");
const ENCODED_UNICODE_EDGE_SELECTOR_TOKEN_PATTERN_SOURCE = `(?!(?:${ENCODED_SELECTOR_EDGE_WHITESPACE_PATTERN_SOURCE}))${ENCODED_UTF8_SELECTOR_TOKEN_PATTERN_SOURCE}`;
const CANONICAL_SELECTOR_TOKEN_PATTERN_SOURCE = `(?:${RAW_SELECTOR_TOKEN_PATTERN_SOURCE}|${ENCODED_ASCII_SELECTOR_TOKEN_PATTERN_SOURCE}|${ENCODED_UTF8_SELECTOR_TOKEN_PATTERN_SOURCE})`;
const CANONICAL_SELECTOR_EDGE_TOKEN_PATTERN_SOURCE = `(?:${RAW_SELECTOR_TOKEN_PATTERN_SOURCE}|${ENCODED_ASCII_NONSPACE_SELECTOR_TOKEN_PATTERN_SOURCE}|${ENCODED_UNICODE_EDGE_SELECTOR_TOKEN_PATTERN_SOURCE})`;
const CANONICAL_SELECTOR_VALUE_PATTERN_SOURCE = `${CANONICAL_SELECTOR_EDGE_TOKEN_PATTERN_SOURCE}(?:${CANONICAL_SELECTOR_TOKEN_PATTERN_SOURCE}*${CANONICAL_SELECTOR_EDGE_TOKEN_PATTERN_SOURCE})?`;

function canonicalContextPathPattern(prefix: "context/wiki/" | "context/raw/"): string {
  return (
    prefix +
    String.raw`(?!\.{1,2}(?:/|#|$))(?![^#]*/\.{1,2}(?:/|#|$))(?![^#]*//)(?![^#]*[?\\\u0000-\u001F\u007F])(?=[^#]*[^\s#](?:#|$))[^#]+`
  );
}

const WIKI_REF_PATTERN_SOURCE =
  canonicalContextPathPattern("context/wiki/") +
  `(?:#(?:line=${POSITIVE_LINE_PATTERN_SOURCE}|lines=${LINE_RANGE_SYNTAX_PATTERN_SOURCE}|section=${CANONICAL_SECTION_PATTERN_SOURCE}))?`;
const SOURCE_REF_PATTERN_SOURCE =
  canonicalContextPathPattern("context/raw/") +
  `(?:#(?:line=${POSITIVE_LINE_PATTERN_SOURCE}|lines=${LINE_RANGE_SYNTAX_PATTERN_SOURCE}|section=${CANONICAL_SECTION_PATTERN_SOURCE}))?`;
const FACT_REF_PATTERN_SOURCE =
  String.raw`\.agentplane/context/derived/facts/facts\.jsonl#fact=` +
  CANONICAL_SELECTOR_VALUE_PATTERN_SOURCE;
const ENTITY_REF_PATTERN_SOURCE =
  String.raw`\.agentplane/context/derived/graph/entities\.jsonl#entity=` +
  CANONICAL_SELECTOR_VALUE_PATTERN_SOURCE;
const EDGE_REF_PATTERN_SOURCE =
  String.raw`\.agentplane/context/derived/graph/(?:edges|provenance_edges)\.jsonl#edge=` +
  CANONICAL_SELECTOR_VALUE_PATTERN_SOURCE;
const CANONICAL_CONTEXT_REF_PATTERN = new RegExp(
  `^(?:${[
    WIKI_REF_PATTERN_SOURCE,
    SOURCE_REF_PATTERN_SOURCE,
    FACT_REF_PATTERN_SOURCE,
    ENTITY_REF_PATTERN_SOURCE,
    EDGE_REF_PATTERN_SOURCE,
  ].join("|")})$`,
  "u",
);
const CANONICAL_CONTEXT_REF_SCHEMA = z
  .string()
  .min(1)
  .max(KNOWLEDGE_REF_MAX_LENGTH * 2)
  .refine((value) => hasAtMostCodePoints(value, KNOWLEDGE_REF_MAX_LENGTH))
  .regex(CANONICAL_CONTEXT_REF_PATTERN);
const KNOWLEDGE_REF_SCORE_SCHEMA = z.number().min(0).max(1);

export type CanonicalKnowledgeSelector = {
  key: "line" | "lines" | "section" | "fact" | "entity" | "edge";
  value: string;
};

export type ParsedCanonicalKnowledgeRef = {
  path: string;
  selector: CanonicalKnowledgeSelector | null;
};

function containsControlCharacter(value: string): boolean {
  return [...value].some((character) => {
    const codePoint = character.codePointAt(0);
    return codePoint !== undefined && (codePoint <= 0x1f || codePoint === 0x7f);
  });
}

function canonicalPath(rawPath: string): string {
  if (
    rawPath !== rawPath.trim() ||
    rawPath.startsWith("/") ||
    rawPath.includes("\\") ||
    rawPath.includes("?") ||
    containsControlCharacter(rawPath)
  ) {
    throw new Error("KnowledgeRef path must be a canonical relative POSIX path.");
  }
  const segments = rawPath.split("/");
  if (
    segments.length < 2 ||
    segments.some((segment) => segment.length === 0 || segment === "." || segment === "..")
  ) {
    throw new Error("KnowledgeRef path must not contain empty, current, or parent segments.");
  }
  return rawPath;
}

function decodeCanonicalSelectorValue(rawValue: string): string {
  let decoded: string;
  try {
    decoded = decodeURIComponent(rawValue);
  } catch {
    throw new Error("KnowledgeRef selector must use valid percent encoding.");
  }
  if (
    decoded.length === 0 ||
    decoded !== decoded.trim() ||
    containsControlCharacter(decoded) ||
    encodeURIComponent(decoded).replaceAll("%3A", ":") !== rawValue
  ) {
    throw new Error("KnowledgeRef selector value is not canonical.");
  }
  return decoded;
}

function parseCanonicalLineNumber(value: string): number | null {
  if (!/^[1-9]\d{0,8}$/u.test(value)) return null;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed <= MAX_CANONICAL_LINE_NUMBER ? parsed : null;
}

function validateLineSelector(key: "line" | "lines", value: string): void {
  if (key === "line") {
    if (parseCanonicalLineNumber(value) === null) {
      throw new Error(
        `KnowledgeRef line selector must be between 1 and ${MAX_CANONICAL_LINE_NUMBER}.`,
      );
    }
    return;
  }
  const match = /^([1-9]\d{0,8})-([1-9]\d{0,8})$/u.exec(value);
  const start = match ? parseCanonicalLineNumber(match[1]) : null;
  const end = match ? parseCanonicalLineNumber(match[2]) : null;
  if (start === null || end === null || end < start) {
    throw new Error("KnowledgeRef lines selector must be an ascending positive range.");
  }
}

function canonicalSectionSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/gu, "-")
    .replaceAll(/^-+|-+$/gu, "");
}

function canonicalKnowledgeRefKind(
  parsed: ParsedCanonicalKnowledgeRef,
): (typeof KNOWLEDGE_REF_KIND_VALUES)[number] | null {
  const selector = parsed.selector?.key ?? null;
  if (
    parsed.path.startsWith("context/wiki/") &&
    (selector === null || selector === "line" || selector === "lines" || selector === "section")
  ) {
    return "wiki";
  }
  if (
    parsed.path.startsWith("context/raw/") &&
    (selector === null || selector === "line" || selector === "lines" || selector === "section")
  ) {
    return "source";
  }
  if (parsed.path === ".agentplane/context/derived/facts/facts.jsonl" && selector === "fact") {
    return "fact";
  }
  if (parsed.path === ".agentplane/context/derived/graph/entities.jsonl" && selector === "entity") {
    return "entity";
  }
  if (
    (parsed.path === ".agentplane/context/derived/graph/edges.jsonl" ||
      parsed.path === ".agentplane/context/derived/graph/provenance_edges.jsonl") &&
    selector === "edge"
  ) {
    return "edge";
  }
  return null;
}

function assertCanonicalKnowledgeRefRoute(parsed: ParsedCanonicalKnowledgeRef): void {
  if (canonicalKnowledgeRefKind(parsed) === null) {
    throw new Error(
      `KnowledgeRef path and selector do not form a supported canonical ref: ${parsed.path}`,
    );
  }
}

export function parseCanonicalKnowledgeRef(rawRef: string): ParsedCanonicalKnowledgeRef {
  if (
    rawRef !== rawRef.trim() ||
    rawRef.length === 0 ||
    !hasAtMostCodePoints(rawRef, KNOWLEDGE_REF_MAX_LENGTH)
  ) {
    throw new Error("KnowledgeRef ref must be a non-empty canonical string.");
  }
  const firstHash = rawRef.indexOf("#");
  if (firstHash !== -1 && rawRef.slice(firstHash + 1).includes("#")) {
    throw new Error("KnowledgeRef ref must contain at most one selector fragment.");
  }
  const rawPath = firstHash === -1 ? rawRef : rawRef.slice(0, firstHash);
  const path = canonicalPath(rawPath);
  if (firstHash === -1) {
    const parsed = { path, selector: null };
    assertCanonicalKnowledgeRefRoute(parsed);
    return parsed;
  }

  const fragment = rawRef.slice(firstHash + 1);
  if (!fragment || fragment.includes("&")) {
    throw new Error("KnowledgeRef ref must contain exactly one canonical selector.");
  }
  const separator = fragment.indexOf("=");
  if (separator <= 0 || fragment.slice(separator + 1).includes("=")) {
    throw new Error("KnowledgeRef selector must use key=value syntax.");
  }
  const rawKey = fragment.slice(0, separator);
  if (!["line", "lines", "section", "fact", "entity", "edge"].includes(rawKey)) {
    throw new Error(`Unsupported KnowledgeRef selector: ${rawKey}`);
  }
  const key = rawKey as CanonicalKnowledgeSelector["key"];
  const value = decodeCanonicalSelectorValue(fragment.slice(separator + 1));
  if (key === "line" || key === "lines") validateLineSelector(key, value);
  if (key === "section" && canonicalSectionSlug(value) !== value) {
    throw new Error("KnowledgeRef section selector must use the canonical lowercase slug.");
  }
  const parsed = { path, selector: { key, value } };
  assertCanonicalKnowledgeRefRoute(parsed);
  return parsed;
}

function assertKindMatchesRef(
  kind: (typeof KNOWLEDGE_REF_KIND_VALUES)[number],
  parsed: ParsedCanonicalKnowledgeRef,
): void {
  if (canonicalKnowledgeRefKind(parsed) !== kind) {
    throw new Error(`KnowledgeRef kind ${kind} does not match canonical ref ${parsed.path}.`);
  }
}

export const KNOWLEDGE_REF_ZOD_SCHEMA = z
  .object({
    schema_version: z.literal(KNOWLEDGE_REF_SCHEMA_VERSION),
    ref: CANONICAL_CONTEXT_REF_SCHEMA,
    digest: SHA256_DIGEST_SCHEMA,
    kind: z.enum(KNOWLEDGE_REF_KIND_VALUES),
    reason: KNOWLEDGE_REF_REASON_SCHEMA,
    retrieval: z.enum(KNOWLEDGE_REF_RETRIEVAL_VALUES),
    required: z.boolean(),
    score: KNOWLEDGE_REF_SCORE_SCHEMA.optional(),
  })
  .strict()
  .superRefine((value, context) => {
    try {
      assertKindMatchesRef(value.kind, parseCanonicalKnowledgeRef(value.ref));
    } catch (error) {
      context.addIssue({
        code: "custom",
        path: ["ref"],
        message: error instanceof Error ? error.message : String(error),
      });
    }
  });

export type KnowledgeRef = z.infer<typeof KNOWLEDGE_REF_ZOD_SCHEMA>;
export type KnowledgeRefKind = (typeof KNOWLEDGE_REF_KIND_VALUES)[number];
export type KnowledgeRefRetrieval = (typeof KNOWLEDGE_REF_RETRIEVAL_VALUES)[number];

export const KNOWLEDGE_INDEX_FRESHNESS_ZOD_SCHEMA = z
  .object({
    status: z.enum(KNOWLEDGE_INDEX_FRESHNESS_VALUES),
    projection_version: SAFE_POSITIVE_INTEGER_SCHEMA.nullable(),
    generated_at: z.string().datetime({ offset: true }).nullable(),
    indexed_digest: SHA256_DIGEST_SCHEMA.nullable(),
    observed_digest: SHA256_DIGEST_SCHEMA.nullable(),
  })
  .strict()
  .superRefine((value, context) => {
    const metadataPresent = value.projection_version !== null && value.generated_at !== null;
    if (value.status === "unavailable") {
      if (
        value.projection_version !== null ||
        value.generated_at !== null ||
        value.indexed_digest !== null
      ) {
        context.addIssue({
          code: "custom",
          path: ["status"],
          message:
            "Unavailable knowledge index freshness cannot claim projection metadata or an indexed digest.",
        });
      }
      return;
    }
    if (!metadataPresent) {
      context.addIssue({
        code: "custom",
        path: ["projection_version"],
        message: "Available knowledge index freshness requires complete projection metadata.",
      });
    }
    if (value.status === "missing" && value.indexed_digest !== null) {
      context.addIssue({
        code: "custom",
        path: ["indexed_digest"],
        message: "Missing knowledge index freshness cannot contain an indexed digest.",
      });
    }
    if (
      value.status === "fresh" &&
      (value.indexed_digest === null ||
        value.observed_digest === null ||
        value.indexed_digest !== value.observed_digest)
    ) {
      context.addIssue({
        code: "custom",
        path: ["status"],
        message: "Fresh knowledge index state requires matching indexed and observed digests.",
      });
    }
    if (
      value.status === "stale" &&
      value.indexed_digest !== null &&
      value.indexed_digest === value.observed_digest
    ) {
      context.addIssue({
        code: "custom",
        path: ["status"],
        message: "Stale knowledge index state cannot contain matching non-null digests.",
      });
    }
  });

export type KnowledgeIndexFreshness = z.infer<typeof KNOWLEDGE_INDEX_FRESHNESS_ZOD_SCHEMA>;

export const KNOWLEDGE_SOURCE_IDENTITY_ZOD_SCHEMA = z
  .object({
    ref: CANONICAL_CONTEXT_REF_SCHEMA,
    path: CANONICAL_NON_EMPTY_STRING_SCHEMA,
    selector: z
      .object({
        key: z.enum(["line", "lines", "section", "fact", "entity", "edge"]),
        value: CANONICAL_NON_EMPTY_STRING_SCHEMA,
      })
      .strict()
      .nullable(),
    line_start: SAFE_POSITIVE_INTEGER_SCHEMA.nullable(),
    line_end: SAFE_POSITIVE_INTEGER_SCHEMA.nullable(),
    observed_source_digest: SHA256_DIGEST_SCHEMA,
    content_digest: SHA256_DIGEST_SCHEMA,
    content_bytes: SAFE_NONNEGATIVE_INTEGER_SCHEMA,
    content_lines: SAFE_NONNEGATIVE_INTEGER_SCHEMA,
  })
  .strict()
  .superRefine((value, context) => {
    try {
      const parsed = parseCanonicalKnowledgeRef(value.ref);
      if (value.path !== parsed.path) {
        context.addIssue({
          code: "custom",
          path: ["path"],
          message: "Knowledge source path must equal the canonical path parsed from ref.",
        });
      }
      if (!selectorsEqual(value.selector, parsed.selector)) {
        context.addIssue({
          code: "custom",
          path: ["selector"],
          message: "Knowledge source selector must equal the selector parsed from ref.",
        });
      }
      if (parsed.selector === null && value.observed_source_digest !== value.content_digest) {
        context.addIssue({
          code: "custom",
          path: ["content_digest"],
          message:
            "An unselected knowledge source must hash its complete content as the observed source digest.",
        });
      }
    } catch (error) {
      context.addIssue({
        code: "custom",
        path: ["ref"],
        message: error instanceof Error ? error.message : String(error),
      });
    }
    if ((value.line_start === null) !== (value.line_end === null)) {
      context.addIssue({
        code: "custom",
        path: ["line_end"],
        message: "Knowledge source line_start and line_end must both be null or both be present.",
      });
    } else if (
      value.line_start !== null &&
      value.line_end !== null &&
      value.line_end < value.line_start
    ) {
      context.addIssue({
        code: "custom",
        path: ["line_end"],
        message: "Knowledge source line span must be ascending.",
      });
    }
    const emptyContent = value.content_bytes === 0 && value.content_lines === 0;
    if ((value.content_bytes === 0) !== (value.content_lines === 0)) {
      context.addIssue({
        code: "custom",
        path: ["content_lines"],
        message: "Knowledge source byte and line counters must agree on empty content.",
      });
    }
    const spanMissing = value.line_start === null && value.line_end === null;
    if (
      (!emptyContent && spanMissing) ||
      (emptyContent &&
        !spanMissing &&
        value.selector?.key !== "line" &&
        value.selector?.key !== "lines")
    ) {
      context.addIssue({
        code: "custom",
        path: ["line_start"],
        message:
          "Knowledge source spans are required for content and may cover empty content only for explicit line selectors.",
      });
    }
  });

export type KnowledgeSourceIdentity = z.infer<typeof KNOWLEDGE_SOURCE_IDENTITY_ZOD_SCHEMA>;

function utf8Digest(content: string): string {
  return `sha256:${createHash("sha256").update(content, "utf8").digest("hex")}`;
}

function contentLineCount(content: string): number {
  return content.length === 0 ? 0 : content.split(/\r?\n/u).length;
}

function selectorsEqual(
  left: CanonicalKnowledgeSelector | null,
  right: CanonicalKnowledgeSelector | null,
): boolean {
  return (
    (left === null && right === null) ||
    (left !== null && right !== null && left.key === right.key && left.value === right.value)
  );
}

function usesIndexDependentRetrieval(retrieval: KnowledgeRefRetrieval): boolean {
  return retrieval === "fts" || retrieval === "semantic_rerank";
}

const PREPARED_KNOWLEDGE_EXCERPT_BASE = {
  schema_version: z.literal(PREPARED_KNOWLEDGE_EXCERPT_SCHEMA_VERSION),
  kind: z.literal(PREPARED_KNOWLEDGE_EXCERPT_KIND),
  knowledge_ref: KNOWLEDGE_REF_ZOD_SCHEMA,
  index_freshness: KNOWLEDGE_INDEX_FRESHNESS_ZOD_SCHEMA,
  limits: z
    .object({
      max_bytes: SAFE_POSITIVE_INTEGER_SCHEMA.max(MAX_PREPARED_KNOWLEDGE_EXCERPT_BYTES),
      max_lines: SAFE_POSITIVE_INTEGER_SCHEMA.max(MAX_PREPARED_KNOWLEDGE_EXCERPT_LINES),
    })
    .strict(),
  observed: z
    .object({
      original_bytes: SAFE_NONNEGATIVE_INTEGER_SCHEMA,
      emitted_bytes: SAFE_NONNEGATIVE_INTEGER_SCHEMA,
      original_lines: SAFE_NONNEGATIVE_INTEGER_SCHEMA,
      emitted_lines: SAFE_NONNEGATIVE_INTEGER_SCHEMA,
    })
    .strict(),
} as const;

const PREPARED_KNOWLEDGE_EXCERPT_VARIANTS_ZOD_SCHEMA = z.discriminatedUnion("status", [
  z
    .object({
      ...PREPARED_KNOWLEDGE_EXCERPT_BASE,
      status: z.literal("included"),
      reason_code: z.literal("included"),
      source: KNOWLEDGE_SOURCE_IDENTITY_ZOD_SCHEMA,
      content: z.string(),
    })
    .strict(),
  z
    .object({
      ...PREPARED_KNOWLEDGE_EXCERPT_BASE,
      status: z.literal("omitted"),
      reason_code: z.enum(["max_bytes_exceeded", "max_lines_exceeded"]),
      source: KNOWLEDGE_SOURCE_IDENTITY_ZOD_SCHEMA,
    })
    .strict(),
  z
    .object({
      ...PREPARED_KNOWLEDGE_EXCERPT_BASE,
      status: z.literal("missing"),
      reason_code: z.enum(["source_missing", "selected_item_missing"]),
      source: z.null(),
    })
    .strict(),
  z
    .object({
      ...PREPARED_KNOWLEDGE_EXCERPT_BASE,
      status: z.literal("stale"),
      reason_code: z.enum([
        "digest_mismatch",
        "knowledge_index_stale",
        "knowledge_index_missing",
        "knowledge_index_unavailable",
      ]),
      source: KNOWLEDGE_SOURCE_IDENTITY_ZOD_SCHEMA,
    })
    .strict(),
]);

export const PREPARED_KNOWLEDGE_EXCERPT_ZOD_SCHEMA =
  PREPARED_KNOWLEDGE_EXCERPT_VARIANTS_ZOD_SCHEMA.superRefine((value, context) => {
    const addIssue = (path: (string | number)[], message: string): void => {
      context.addIssue({ code: "custom", path, message });
    };
    const source = value.source;
    let parsedRef: ParsedCanonicalKnowledgeRef | null = null;
    try {
      parsedRef = parseCanonicalKnowledgeRef(value.knowledge_ref.ref);
    } catch {
      // The nested KnowledgeRef schema owns the canonical-ref issue.
    }

    if (value.observed.emitted_bytes > value.observed.original_bytes) {
      addIssue(
        ["observed", "emitted_bytes"],
        "Emitted knowledge bytes cannot exceed original bytes.",
      );
    }
    if (value.observed.emitted_lines > value.observed.original_lines) {
      addIssue(
        ["observed", "emitted_lines"],
        "Emitted knowledge lines cannot exceed original lines.",
      );
    }

    if (source === null) {
      if (
        value.status === "missing" &&
        value.reason_code === "selected_item_missing" &&
        parsedRef?.selector === null
      ) {
        addIssue(
          ["reason_code"],
          "selected_item_missing requires an explicit KnowledgeRef selector.",
        );
      }
      if (
        value.observed.original_bytes !== 0 ||
        value.observed.emitted_bytes !== 0 ||
        value.observed.original_lines !== 0 ||
        value.observed.emitted_lines !== 0
      ) {
        addIssue(
          ["observed"],
          "A missing knowledge source must report zero original and emitted counters.",
        );
      }
      if (value.index_freshness.observed_digest !== null) {
        addIssue(
          ["index_freshness", "observed_digest"],
          "A missing knowledge source cannot report an observed projection digest.",
        );
      }
      return;
    }

    if (source.ref !== value.knowledge_ref.ref) {
      addIssue(["source", "ref"], "Knowledge source ref must equal knowledge_ref.ref.");
    }
    if (parsedRef !== null) {
      if (source.path !== parsedRef.path) {
        addIssue(
          ["source", "path"],
          "Knowledge source path must equal the canonical path parsed from knowledge_ref.ref.",
        );
      }
      if (!selectorsEqual(source.selector, parsedRef.selector)) {
        addIssue(
          ["source", "selector"],
          "Knowledge source selector must equal the selector parsed from knowledge_ref.ref.",
        );
      }
      const lineStart = source.line_start;
      const lineEnd = source.line_end;
      const selector = parsedRef.selector;
      if (
        selector === null &&
        source.content_lines > 0 &&
        (lineStart !== 1 || lineEnd !== source.content_lines)
      ) {
        addIssue(
          ["source", "line_start"],
          "An unselected knowledge source must span its complete content.",
        );
      } else if (selector?.key === "line") {
        const expectedLine = parseCanonicalLineNumber(selector.value);
        if (lineStart !== expectedLine || lineEnd !== expectedLine) {
          addIssue(
            ["source", "line_start"],
            "A line selector must resolve to that exact source line.",
          );
        }
      } else if (selector?.key === "lines") {
        const match = /^([1-9]\d{0,8})-([1-9]\d{0,8})$/u.exec(selector.value);
        const expectedStart = match ? parseCanonicalLineNumber(match[1]) : null;
        const expectedEnd = match ? parseCanonicalLineNumber(match[2]) : null;
        if (
          expectedStart === null ||
          expectedEnd === null ||
          lineStart !== expectedStart ||
          lineEnd === null ||
          lineEnd > expectedEnd
        ) {
          addIssue(
            ["source", "line_start"],
            "A line-range source span must start at the selected line and cannot exceed its end.",
          );
        }
      } else if (
        selector !== null &&
        selector.key !== "section" &&
        (lineStart === null || lineEnd === null || lineStart !== lineEnd)
      ) {
        addIssue(
          ["source", "line_start"],
          "A selected JSONL item must map to exactly one source line.",
        );
      }
    }

    if (
      value.observed.original_bytes !== source.content_bytes ||
      value.observed.original_lines !== source.content_lines
    ) {
      addIssue(
        ["observed"],
        "Original excerpt counters must equal the selected source content counters.",
      );
    }

    if (value.status === "included") {
      const actualBytes = Buffer.byteLength(value.content, "utf8");
      const actualLines = contentLineCount(value.content);
      if (source.content_digest !== utf8Digest(value.content)) {
        addIssue(
          ["source", "content_digest"],
          "Included knowledge content must match source.content_digest.",
        );
      }
      if (source.content_bytes !== actualBytes || source.content_lines !== actualLines) {
        addIssue(
          ["source", "content_bytes"],
          "Included knowledge content must match source byte and line counters.",
        );
      }
      if (
        value.observed.emitted_bytes !== source.content_bytes ||
        value.observed.emitted_lines !== source.content_lines
      ) {
        addIssue(
          ["observed"],
          "An included excerpt must emit the complete selected source content.",
        );
      }
      if (
        source.content_bytes > value.limits.max_bytes ||
        source.content_lines > value.limits.max_lines
      ) {
        addIssue(["limits"], "Included knowledge content must fit both excerpt limits.");
      }
    } else if (value.observed.emitted_bytes !== 0 || value.observed.emitted_lines !== 0) {
      addIssue(["observed"], "Non-included excerpts cannot report emitted content.");
    }

    if (value.status === "omitted") {
      if (
        value.reason_code === "max_bytes_exceeded" &&
        source.content_bytes <= value.limits.max_bytes
      ) {
        addIssue(
          ["reason_code"],
          "max_bytes_exceeded requires source content larger than max_bytes.",
        );
      }
      if (
        value.reason_code === "max_lines_exceeded" &&
        (source.content_bytes > value.limits.max_bytes ||
          source.content_lines <= value.limits.max_lines)
      ) {
        addIssue(
          ["reason_code"],
          "max_lines_exceeded requires bytes within max_bytes and lines above max_lines.",
        );
      }
    }

    if (value.status === "stale") {
      if (
        value.reason_code === "digest_mismatch" &&
        source.observed_source_digest === value.knowledge_ref.digest
      ) {
        addIssue(
          ["reason_code"],
          "digest_mismatch requires the observed source digest to differ from KnowledgeRef.digest.",
        );
      }
      if (
        value.reason_code !== "digest_mismatch" &&
        source.observed_source_digest !== value.knowledge_ref.digest
      ) {
        addIssue(
          ["source", "observed_source_digest"],
          "Index-only stale states require a matching KnowledgeRef source digest.",
        );
      }
      const expectedFreshness = {
        knowledge_index_stale: "stale",
        knowledge_index_missing: "missing",
        knowledge_index_unavailable: "unavailable",
      } as const;
      if (
        value.reason_code !== "digest_mismatch" &&
        value.index_freshness.status !== expectedFreshness[value.reason_code]
      ) {
        addIssue(
          ["reason_code"],
          "Knowledge-index stale reason must match index_freshness.status.",
        );
      }
      if (
        (value.reason_code === "knowledge_index_missing" ||
          value.reason_code === "knowledge_index_unavailable") &&
        !usesIndexDependentRetrieval(value.knowledge_ref.retrieval)
      ) {
        addIssue(
          ["knowledge_ref", "retrieval"],
          "Missing or unavailable index staleness requires index-dependent retrieval.",
        );
      }
      return;
    }

    if (source.observed_source_digest !== value.knowledge_ref.digest) {
      addIssue(
        ["source", "observed_source_digest"],
        "Included and omitted excerpts require the digest-addressed source to match.",
      );
    }
    if (value.index_freshness.status === "stale") {
      addIssue(
        ["index_freshness", "status"],
        "Included and omitted excerpts cannot use a stale knowledge index.",
      );
    }
    if (
      usesIndexDependentRetrieval(value.knowledge_ref.retrieval) &&
      value.index_freshness.status !== "fresh"
    ) {
      addIssue(
        ["index_freshness", "status"],
        "Index-dependent retrieval can be included or omitted only with a fresh index.",
      );
    }
  });

export type PreparedKnowledgeExcerpt = z.infer<typeof PREPARED_KNOWLEDGE_EXCERPT_ZOD_SCHEMA>;

const GENERATED_KNOWLEDGE_REF_SCHEMA = buildJsonSchemaDocument(KNOWLEDGE_REF_ZOD_SCHEMA, {
  $id: "https://agentplane.org/schemas/knowledge-ref.schema.json",
  title: "KnowledgeRef (v1)",
  description:
    "Digest-addressed reference into AgentPlane's existing context knowledge plane. The contract references knowledge; it does not copy or persist a second knowledge store.",
});
const GENERATED_KNOWLEDGE_REF_PROPERTIES = GENERATED_KNOWLEDGE_REF_SCHEMA.properties as Record<
  string,
  Record<string, unknown>
>;

const KIND_REF_PUBLIC_SCHEMA_BRANCHES = [
  ["wiki", String.raw`^context/wiki/[^#]+(?:#(?:line|lines|section)=[^#]+)?$`],
  ["source", String.raw`^context/raw/[^#]+(?:#(?:line|lines|section)=[^#]+)?$`],
  ["fact", String.raw`^\.agentplane/context/derived/facts/facts\.jsonl#fact=[^#]+$`],
  ["entity", String.raw`^\.agentplane/context/derived/graph/entities\.jsonl#entity=[^#]+$`],
  [
    "edge",
    String.raw`^\.agentplane/context/derived/graph/(?:edges|provenance_edges)\.jsonl#edge=[^#]+$`,
  ],
] as const;

const KNOWLEDGE_REF_SCHEMA = {
  ...GENERATED_KNOWLEDGE_REF_SCHEMA,
  properties: {
    ...GENERATED_KNOWLEDGE_REF_PROPERTIES,
    ref: {
      ...GENERATED_KNOWLEDGE_REF_PROPERTIES.ref,
      maxLength: KNOWLEDGE_REF_MAX_LENGTH,
    },
    reason: {
      ...GENERATED_KNOWLEDGE_REF_PROPERTIES.reason,
      maxLength: KNOWLEDGE_REF_REASON_MAX_LENGTH,
    },
  },
  allOf: [
    {
      oneOf: KIND_REF_PUBLIC_SCHEMA_BRANCHES.map(([kind, pattern]) => ({
        properties: {
          kind: { const: kind },
          ref: { type: "string", pattern },
        },
        required: ["kind", "ref"],
      })),
    },
    {
      anyOf: [
        {
          properties: {
            ref: { type: "string", pattern: String.raw`^(?!.*#lines=)` },
          },
          required: ["ref"],
        },
        {
          properties: {
            ref: {
              type: "string",
              pattern: `^(?:context/wiki/|context/raw/)[^#]+#lines=${ASCENDING_LINE_RANGE_PATTERN_SOURCE}$`,
            },
          },
          required: ["ref"],
        },
      ],
    },
  ],
};

export const KNOWLEDGE_REF_V1_VALID_FIXTURE: KnowledgeRef = {
  schema_version: KNOWLEDGE_REF_SCHEMA_VERSION,
  ref: "context/wiki/architecture.md#section=execution-boundary",
  digest: `sha256:${"1".repeat(64)}`,
  kind: "wiki",
  reason: "The executor needs the canonical execution-boundary decision.",
  retrieval: "exact",
  required: true,
  score: 1,
};

export function listKnowledgeRefSchemaErrors(value: unknown): string[] {
  return schemaErrors("KnowledgeRef", KNOWLEDGE_REF_ZOD_SCHEMA, value);
}

export function validateKnowledgeRef(value: unknown): KnowledgeRef {
  return assertValid("KnowledgeRef", KNOWLEDGE_REF_ZOD_SCHEMA, value);
}

export function validatePreparedKnowledgeExcerpt(value: unknown): PreparedKnowledgeExcerpt {
  return assertValid("prepared knowledge excerpt", PREPARED_KNOWLEDGE_EXCERPT_ZOD_SCHEMA, value);
}

export function renderKnowledgeRefSchemaJson(): string {
  return `${JSON.stringify(KNOWLEDGE_REF_SCHEMA, null, 2)}\n`;
}

export function renderKnowledgeRefV1ValidFixtureJson(): string {
  return `${JSON.stringify(KNOWLEDGE_REF_V1_VALID_FIXTURE, null, 2)}\n`;
}
