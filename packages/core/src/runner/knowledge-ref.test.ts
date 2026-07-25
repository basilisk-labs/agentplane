import { createHash } from "node:crypto";

import { describe, expect, it } from "vitest";

import {
  KNOWLEDGE_REF_RETRIEVAL_VALUES,
  KNOWLEDGE_REF_V1_VALID_FIXTURE,
  KNOWLEDGE_SOURCE_IDENTITY_ZOD_SCHEMA,
  listKnowledgeRefSchemaErrors,
  parseCanonicalKnowledgeRef,
  renderKnowledgeRefSchemaJson,
  validateKnowledgeRef,
  validatePreparedKnowledgeExcerpt,
} from "./knowledge-ref.js";

type JsonSchema = Record<string, unknown>;
const SCHEMA_PATTERN_CACHE = new Map<string, RegExp>();

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function schemaAccepts(schema: unknown, value: unknown): boolean {
  if (schema === true) return true;
  if (schema === false || !isRecord(schema)) return false;
  if (
    Array.isArray(schema.allOf) &&
    !schema.allOf.every((branch) => schemaAccepts(branch, value))
  ) {
    return false;
  }
  if (
    Array.isArray(schema.oneOf) &&
    schema.oneOf.filter((branch) => schemaAccepts(branch, value)).length !== 1
  ) {
    return false;
  }
  if (Array.isArray(schema.anyOf) && !schema.anyOf.some((branch) => schemaAccepts(branch, value))) {
    return false;
  }
  if (Object.hasOwn(schema, "const") && value !== schema.const) return false;
  if (Array.isArray(schema.enum) && !schema.enum.includes(value)) return false;
  if (schema.type === "object" && !isRecord(value)) return false;
  if (schema.type === "string" && typeof value !== "string") return false;
  if (schema.type === "number" && typeof value !== "number") return false;
  if (schema.type === "integer" && !Number.isInteger(value)) return false;
  if (schema.type === "boolean" && typeof value !== "boolean") return false;
  if (typeof value === "string") {
    const codePointLength = [...value].length;
    if (typeof schema.minLength === "number" && codePointLength < schema.minLength) return false;
    if (typeof schema.maxLength === "number" && codePointLength > schema.maxLength) return false;
    if (typeof schema.pattern === "string") {
      const pattern = SCHEMA_PATTERN_CACHE.get(schema.pattern) ?? new RegExp(schema.pattern, "u");
      SCHEMA_PATTERN_CACHE.set(schema.pattern, pattern);
      if (!pattern.test(value)) return false;
    }
  }
  if (typeof value === "number") {
    if (typeof schema.minimum === "number" && value < schema.minimum) return false;
    if (typeof schema.maximum === "number" && value > schema.maximum) return false;
  }
  if (isRecord(value)) {
    const properties = isRecord(schema.properties) ? schema.properties : {};
    if (
      Array.isArray(schema.required) &&
      schema.required.some((key) => typeof key === "string" && !Object.hasOwn(value, key))
    ) {
      return false;
    }
    for (const [key, item] of Object.entries(value)) {
      if (Object.hasOwn(properties, key)) {
        if (!schemaAccepts(properties[key], item)) return false;
      } else if (schema.additionalProperties === false) {
        return false;
      }
    }
  }
  return true;
}

function sha256(content: string): string {
  return `sha256:${createHash("sha256").update(content, "utf8").digest("hex")}`;
}

const INCLUDED_CONTENT = "alpha\nbeta";
const INCLUDED_CONTENT_DIGEST = sha256(INCLUDED_CONTENT);
const ALTERNATE_DIGEST = `sha256:${"2".repeat(64)}`;
const INDEX_DIGEST = `sha256:${"3".repeat(64)}`;
const OTHER_INDEX_DIGEST = `sha256:${"4".repeat(64)}`;
const INDEX_METADATA = {
  projection_version: 1,
  generated_at: "2026-07-24T00:00:00.000Z",
} as const;

function includedExcerpt() {
  return {
    schema_version: 1,
    kind: "prepared_knowledge_excerpt",
    knowledge_ref: KNOWLEDGE_REF_V1_VALID_FIXTURE,
    index_freshness: {
      status: "unavailable",
      projection_version: null,
      generated_at: null,
      indexed_digest: null,
      observed_digest: KNOWLEDGE_REF_V1_VALID_FIXTURE.digest,
    },
    status: "included",
    reason_code: "included",
    source: {
      ref: KNOWLEDGE_REF_V1_VALID_FIXTURE.ref,
      path: "context/wiki/architecture.md",
      selector: { key: "section", value: "execution-boundary" },
      line_start: 2,
      line_end: 3,
      observed_source_digest: KNOWLEDGE_REF_V1_VALID_FIXTURE.digest,
      content_digest: INCLUDED_CONTENT_DIGEST,
      content_bytes: Buffer.byteLength(INCLUDED_CONTENT, "utf8"),
      content_lines: 2,
    },
    limits: { max_bytes: 64, max_lines: 4 },
    observed: {
      original_bytes: Buffer.byteLength(INCLUDED_CONTENT, "utf8"),
      emitted_bytes: Buffer.byteLength(INCLUDED_CONTENT, "utf8"),
      original_lines: 2,
      emitted_lines: 2,
    },
    content: INCLUDED_CONTENT,
  };
}

function nonIncludedExcerptBase() {
  const included = includedExcerpt();
  return {
    schema_version: included.schema_version,
    kind: included.kind,
    knowledge_ref: included.knowledge_ref,
    index_freshness: included.index_freshness,
    source: included.source,
    limits: included.limits,
    observed: {
      ...included.observed,
      emitted_bytes: 0,
      emitted_lines: 0,
    },
  };
}

describe("KnowledgeRef contract", () => {
  it("accepts the public fixture and every retrieval provenance", () => {
    for (const retrieval of KNOWLEDGE_REF_RETRIEVAL_VALUES) {
      expect(
        validateKnowledgeRef({
          ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
          retrieval,
        }),
      ).toMatchObject({ retrieval, kind: "wiki" });
    }
    expect(parseCanonicalKnowledgeRef(KNOWLEDGE_REF_V1_VALID_FIXTURE.ref)).toEqual({
      path: "context/wiki/architecture.md",
      selector: { key: "section", value: "execution-boundary" },
    });
    expect(
      validateKnowledgeRef({
        ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
        ref: ".agentplane/context/derived/facts/facts.jsonl#fact=fact:runtime:contract",
        kind: "fact",
      }).ref,
    ).toContain("#fact=fact:runtime:contract");
  });

  it.each([
    [
      "missing schema version",
      {
        ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
        schema_version: undefined,
      },
    ],
    [
      "path traversal",
      {
        ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
        ref: "context/wiki/../raw/private.md",
      },
    ],
    [
      "non-canonical selector",
      {
        ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
        ref: "context/wiki/architecture.md#section=Execution%20Boundary",
      },
    ],
    [
      "descending line range",
      {
        ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
        ref: "context/wiki/architecture.md#lines=20-10",
      },
    ],
    [
      "oversized line number",
      {
        ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
        ref: "context/wiki/architecture.md#line=1000000000",
      },
    ],
    [
      "kind/ref mismatch",
      {
        ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
        kind: "fact",
      },
    ],
    [
      "invalid digest",
      {
        ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
        digest: "sha256:not-a-digest",
      },
    ],
    [
      "out-of-range score",
      {
        ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
        score: 1.1,
      },
    ],
    [
      "unbounded reason",
      {
        ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
        reason: "r".repeat(4097),
      },
    ],
    [
      "whitespace-only reason",
      {
        ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
        reason: "   ",
      },
    ],
    [
      "non-canonical encoded selector",
      {
        ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
        ref: ".agentplane/context/derived/facts/facts.jsonl#fact=%41",
        kind: "fact",
      },
    ],
    [
      "unknown field",
      {
        ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
        copied_knowledge: "must not be embedded",
      },
    ],
  ])("rejects %s", (_label, value) => {
    expect(listKnowledgeRefSchemaErrors(value)).not.toEqual([]);
    expect(() => validateKnowledgeRef(value)).toThrow(/KnowledgeRef schema validation failed/u);
  });

  it("accepts only bounded ascending canonical line selectors", () => {
    for (const selector of [
      "line=1",
      "line=999999999",
      "lines=1-1",
      "lines=9-10",
      "lines=99-100",
      "lines=999999998-999999999",
    ]) {
      expect(
        parseCanonicalKnowledgeRef(`context/wiki/architecture.md#${selector}`).selector,
      ).not.toBeNull();
    }
    for (const selector of [
      "line=0",
      "line=01",
      "line=1000000000",
      "lines=2-1",
      "lines=10-9",
      "lines=100-99",
      "lines=999999999-999999998",
    ]) {
      expect(() =>
        parseCanonicalKnowledgeRef(`context/wiki/architecture.md#${selector}`),
      ).toThrow();
    }
  });

  it("keeps the exported parser on the public KnowledgeRef route grammar", () => {
    for (const ref of [
      "foo/bar",
      "context/wiki/a.md#fact=x",
      "context/raw/a.txt#entity=x",
      ".agentplane/context/derived/facts/facts.jsonl",
      ".agentplane/context/derived/graph/edges.jsonl#entity=x",
    ]) {
      expect(() => parseCanonicalKnowledgeRef(ref)).toThrow(
        /do not form a supported canonical ref/u,
      );
    }
  });

  it("keeps public-schema and runtime selector encoding canonicalization aligned", () => {
    const rendered = JSON.parse(renderKnowledgeRefSchemaJson()) as JsonSchema;
    for (const selector of [
      "alpha%20beta",
      "%23issue%2Fone",
      "%D0%A2%D0%B5%D1%81%D1%82",
      "alpha%C2%A0beta",
    ]) {
      const candidate = {
        ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
        ref: `.agentplane/context/derived/facts/facts.jsonl#fact=${selector}`,
        kind: "fact",
      };
      expect(schemaAccepts(rendered, candidate)).toBe(true);
      expect(listKnowledgeRefSchemaErrors(candidate)).toEqual([]);
    }
    for (const selector of [
      "%41",
      "%3A",
      "%20alpha",
      "alpha%20",
      "%C2%A0alpha",
      "alpha%C2%A0",
      "%E0%A4",
      "%ED%A0%80",
      "%FF",
      "%0A",
    ]) {
      const candidate = {
        ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
        ref: `.agentplane/context/derived/facts/facts.jsonl#fact=${selector}`,
        kind: "fact",
      };
      expect(schemaAccepts(rendered, candidate)).toBe(false);
      expect(listKnowledgeRefSchemaErrors(candidate)).not.toEqual([]);
    }
  });

  it("matches Draft-07 Unicode code-point length semantics", () => {
    const rendered = JSON.parse(renderKnowledgeRefSchemaJson()) as JsonSchema;
    const validReason = {
      ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
      reason: "😀".repeat(4096),
    };
    const oversizedReason = {
      ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
      reason: "😀".repeat(4097),
    };
    const pathPrefix = "context/wiki/";
    const pathSuffix = ".md";
    const validPath = `${pathPrefix}${"😀".repeat(2048 - [...pathPrefix, ...pathSuffix].length)}${pathSuffix}`;
    const oversizedPath = `${pathPrefix}${"😀".repeat(2049 - [...pathPrefix, ...pathSuffix].length)}${pathSuffix}`;
    const validRef = { ...KNOWLEDGE_REF_V1_VALID_FIXTURE, ref: validPath };
    const oversizedRef = { ...KNOWLEDGE_REF_V1_VALID_FIXTURE, ref: oversizedPath };

    for (const candidate of [validReason, validRef]) {
      expect(schemaAccepts(rendered, candidate)).toBe(true);
      expect(listKnowledgeRefSchemaErrors(candidate)).toEqual([]);
    }
    for (const candidate of [oversizedReason, oversizedRef]) {
      expect(schemaAccepts(rendered, candidate)).toBe(false);
      expect(listKnowledgeRefSchemaErrors(candidate)).not.toEqual([]);
    }
    expect(parseCanonicalKnowledgeRef(validPath)).toMatchObject({ path: validPath });
    expect(() => parseCanonicalKnowledgeRef(oversizedPath)).toThrow(/non-empty canonical string/u);
  });

  it("renders a strict, versioned, discriminated public JSON Schema", () => {
    const rendered = JSON.parse(renderKnowledgeRefSchemaJson()) as JsonSchema;
    expect(rendered.$id).toBe("https://agentplane.org/schemas/knowledge-ref.schema.json");
    expect(rendered.additionalProperties).toBe(false);
    expect(rendered.required).toEqual([
      "schema_version",
      "ref",
      "digest",
      "kind",
      "reason",
      "retrieval",
      "required",
    ]);
    expect((rendered.properties as JsonSchema).reason).toMatchObject({ maxLength: 4096 });
    expect(schemaAccepts(rendered, KNOWLEDGE_REF_V1_VALID_FIXTURE)).toBe(true);
    for (const invalid of [
      { ...KNOWLEDGE_REF_V1_VALID_FIXTURE, schema_version: 2 },
      { ...KNOWLEDGE_REF_V1_VALID_FIXTURE, kind: "fact" },
      {
        ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
        ref: ".agentplane/context/derived/facts/facts.jsonl#fact=fact-1",
      },
      {
        ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
        ref: "context/wiki/architecture.md#section=Execution",
      },
      {
        ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
        ref: "context/wiki/architecture.md#line=0",
      },
      {
        ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
        ref: "context/wiki/architecture.md#lines=20-10",
      },
      {
        ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
        ref: "context/raw/architecture.md",
      },
      {
        ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
        reason: "r".repeat(4097),
      },
      {
        ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
        reason: "   ",
      },
      {
        ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
        ref: ".agentplane/context/derived/facts/facts.jsonl#fact=%41",
        kind: "fact",
      },
    ]) {
      expect(schemaAccepts(rendered, invalid)).toBe(false);
    }
  });

  it("keeps public-schema and runtime range ordering aligned for all small pairs", () => {
    const rendered = JSON.parse(renderKnowledgeRefSchemaJson()) as JsonSchema;
    const failures: string[] = [];
    for (const [kind, path] of [
      ["wiki", "context/wiki/ranges.md"],
      ["source", "context/raw/ranges.txt"],
    ] as const) {
      for (let start = 1; start <= 32; start += 1) {
        for (let end = 1; end <= 32; end += 1) {
          const candidate = {
            ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
            kind,
            ref: `${path}#lines=${start}-${end}`,
          };
          const expected = start <= end;
          const publicAccepted = schemaAccepts(rendered, candidate);
          const runtimeAccepted = listKnowledgeRefSchemaErrors(candidate).length === 0;
          if (publicAccepted !== expected || runtimeAccepted !== expected) {
            failures.push(
              `${kind}:${start}-${end}: public=${publicAccepted} runtime=${runtimeAccepted}`,
            );
          }
        }
      }
    }
    for (const [range, expected] of [
      ["999-1000", true],
      ["1000-1001", true],
      ["1001-1000", false],
      ["123456788-123456789", true],
      ["123456789-123456788", false],
    ] as const) {
      const candidate = {
        ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
        ref: `context/wiki/ranges.md#lines=${range}`,
      };
      const publicAccepted = schemaAccepts(rendered, candidate);
      const runtimeAccepted = listKnowledgeRefSchemaErrors(candidate).length === 0;
      if (publicAccepted !== expected || runtimeAccepted !== expected) {
        failures.push(`wiki:${range}: public=${publicAccepted} runtime=${runtimeAccepted}`);
      }
    }
    expect(failures).toEqual([]);
  });

  it("enforces ref/path/selector linkage on standalone source identities", () => {
    const source = includedExcerpt().source;
    expect(KNOWLEDGE_SOURCE_IDENTITY_ZOD_SCHEMA.safeParse(source).success).toBe(true);
    expect(
      KNOWLEDGE_SOURCE_IDENTITY_ZOD_SCHEMA.safeParse({
        ...source,
        path: "context/wiki/other.md",
      }).success,
    ).toBe(false);
    expect(
      KNOWLEDGE_SOURCE_IDENTITY_ZOD_SCHEMA.safeParse({
        ...source,
        selector: { key: "section", value: "other" },
      }).success,
    ).toBe(false);
  });

  it("keeps prepared excerpt contents exclusive to included receipts", () => {
    expect(() =>
      validatePreparedKnowledgeExcerpt({
        schema_version: 1,
        kind: "prepared_knowledge_excerpt",
        knowledge_ref: KNOWLEDGE_REF_V1_VALID_FIXTURE,
        index_freshness: {
          status: "unavailable",
          projection_version: null,
          generated_at: null,
          indexed_digest: null,
          observed_digest: null,
        },
        status: "omitted",
        reason_code: "max_bytes_exceeded",
        source: {
          ref: KNOWLEDGE_REF_V1_VALID_FIXTURE.ref,
          path: "context/wiki/architecture.md",
          selector: { key: "section", value: "execution-boundary" },
          line_start: 2,
          line_end: 3,
          observed_source_digest: KNOWLEDGE_REF_V1_VALID_FIXTURE.digest,
          content_digest: KNOWLEDGE_REF_V1_VALID_FIXTURE.digest,
          content_bytes: 64,
          content_lines: 2,
        },
        limits: { max_bytes: 16, max_lines: 4 },
        observed: {
          original_bytes: 64,
          emitted_bytes: 0,
          original_lines: 2,
          emitted_lines: 0,
        },
        content: "must be rejected",
      }),
    ).toThrow(/prepared knowledge excerpt schema validation failed/u);
  });

  it("accepts an internally consistent included excerpt", () => {
    expect(validatePreparedKnowledgeExcerpt(includedExcerpt())).toMatchObject({
      status: "included",
      reason_code: "included",
      content: INCLUDED_CONTENT,
    });
  });

  it("allows an explicitly selected blank line with an empty content digest", () => {
    const emptyContent = "";
    expect(
      validatePreparedKnowledgeExcerpt({
        ...includedExcerpt(),
        knowledge_ref: {
          ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
          ref: "context/wiki/architecture.md#line=2",
        },
        source: {
          ...includedExcerpt().source,
          ref: "context/wiki/architecture.md#line=2",
          selector: { key: "line", value: "2" },
          line_start: 2,
          line_end: 2,
          content_digest: sha256(emptyContent),
          content_bytes: 0,
          content_lines: 0,
        },
        observed: {
          original_bytes: 0,
          emitted_bytes: 0,
          original_lines: 0,
          emitted_lines: 0,
        },
        content: emptyContent,
      }).content,
    ).toBe("");
  });

  it.each([
    [
      "source ref",
      {
        ...includedExcerpt(),
        source: {
          ...includedExcerpt().source,
          ref: "context/wiki/other.md#section=execution-boundary",
        },
      },
    ],
    [
      "source path",
      {
        ...includedExcerpt(),
        source: { ...includedExcerpt().source, path: "context/wiki/other.md" },
      },
    ],
    [
      "non-canonical source path",
      {
        ...includedExcerpt(),
        source: {
          ...includedExcerpt().source,
          path: " context/wiki/architecture.md",
        },
      },
    ],
    [
      "source selector",
      {
        ...includedExcerpt(),
        source: {
          ...includedExcerpt().source,
          selector: { key: "section", value: "other" },
        },
      },
    ],
    [
      "descending source span",
      {
        ...includedExcerpt(),
        source: { ...includedExcerpt().source, line_start: 4, line_end: 3 },
      },
    ],
  ])("rejects inconsistent %s linkage", (_label, value) => {
    expect(() => validatePreparedKnowledgeExcerpt(value)).toThrow(
      /prepared knowledge excerpt schema validation failed/u,
    );
  });

  it.each([
    [
      "content digest",
      {
        ...includedExcerpt(),
        source: { ...includedExcerpt().source, content_digest: ALTERNATE_DIGEST },
      },
    ],
    [
      "content bytes",
      {
        ...includedExcerpt(),
        source: { ...includedExcerpt().source, content_bytes: 11 },
        observed: { ...includedExcerpt().observed, original_bytes: 11, emitted_bytes: 11 },
      },
    ],
    [
      "content lines",
      {
        ...includedExcerpt(),
        source: { ...includedExcerpt().source, content_lines: 3 },
        observed: { ...includedExcerpt().observed, original_lines: 3, emitted_lines: 3 },
      },
    ],
    [
      "original counters",
      {
        ...includedExcerpt(),
        observed: { ...includedExcerpt().observed, original_bytes: 9 },
      },
    ],
    [
      "emitted counters",
      {
        ...includedExcerpt(),
        observed: { ...includedExcerpt().observed, emitted_lines: 1 },
      },
    ],
    [
      "byte limit",
      {
        ...includedExcerpt(),
        limits: { ...includedExcerpt().limits, max_bytes: 9 },
      },
    ],
    [
      "runtime limit ceiling",
      {
        ...includedExcerpt(),
        limits: { ...includedExcerpt().limits, max_bytes: 256 * 1024 + 1 },
      },
    ],
    [
      "forged selectorless source digest",
      {
        ...includedExcerpt(),
        knowledge_ref: {
          ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
          ref: "context/wiki/architecture.md",
        },
        source: {
          ...includedExcerpt().source,
          ref: "context/wiki/architecture.md",
          selector: null,
          line_start: 1,
          line_end: 2,
        },
      },
    ],
  ])("rejects inconsistent %s", (_label, value) => {
    expect(() => validatePreparedKnowledgeExcerpt(value)).toThrow(
      /prepared knowledge excerpt schema validation failed/u,
    );
  });

  it("rejects impossible freshness and status combinations", () => {
    const base = includedExcerpt();
    const impossible = [
      {
        ...base,
        index_freshness: {
          status: "fresh",
          ...INDEX_METADATA,
          indexed_digest: INDEX_DIGEST,
          observed_digest: OTHER_INDEX_DIGEST,
        },
      },
      {
        ...base,
        index_freshness: {
          status: "stale",
          ...INDEX_METADATA,
          indexed_digest: INDEX_DIGEST,
          observed_digest: OTHER_INDEX_DIGEST,
        },
      },
      {
        ...nonIncludedExcerptBase(),
        status: "omitted",
        reason_code: "max_bytes_exceeded",
      },
      {
        ...nonIncludedExcerptBase(),
        status: "stale",
        reason_code: "digest_mismatch",
      },
      {
        schema_version: 1,
        kind: "prepared_knowledge_excerpt",
        knowledge_ref: KNOWLEDGE_REF_V1_VALID_FIXTURE,
        index_freshness: {
          status: "unavailable",
          projection_version: null,
          generated_at: null,
          indexed_digest: null,
          observed_digest: null,
        },
        status: "missing",
        reason_code: "source_missing",
        source: null,
        limits: { max_bytes: 64, max_lines: 4 },
        observed: {
          original_bytes: 1,
          emitted_bytes: 0,
          original_lines: 1,
          emitted_lines: 0,
        },
      },
      {
        schema_version: 1,
        kind: "prepared_knowledge_excerpt",
        knowledge_ref: {
          ...KNOWLEDGE_REF_V1_VALID_FIXTURE,
          ref: "context/wiki/architecture.md",
        },
        index_freshness: {
          status: "unavailable",
          projection_version: null,
          generated_at: null,
          indexed_digest: null,
          observed_digest: null,
        },
        status: "missing",
        reason_code: "selected_item_missing",
        source: null,
        limits: { max_bytes: 64, max_lines: 4 },
        observed: {
          original_bytes: 0,
          emitted_bytes: 0,
          original_lines: 0,
          emitted_lines: 0,
        },
      },
    ];
    for (const value of impossible) {
      expect(() => validatePreparedKnowledgeExcerpt(value)).toThrow(
        /prepared knowledge excerpt schema validation failed/u,
      );
    }
  });

  it("allows legitimate digest and index stale receipts", () => {
    const base = nonIncludedExcerptBase();
    const staleDigest = {
      ...base,
      status: "stale",
      reason_code: "digest_mismatch",
      source: { ...base.source, observed_source_digest: ALTERNATE_DIGEST },
      index_freshness: {
        status: "fresh",
        ...INDEX_METADATA,
        indexed_digest: INDEX_DIGEST,
        observed_digest: INDEX_DIGEST,
      },
    };
    const staleIndex = {
      ...base,
      status: "stale",
      reason_code: "knowledge_index_stale",
      index_freshness: {
        status: "stale",
        ...INDEX_METADATA,
        indexed_digest: INDEX_DIGEST,
        observed_digest: OTHER_INDEX_DIGEST,
      },
    };
    const missingIndex = {
      ...base,
      knowledge_ref: { ...base.knowledge_ref, retrieval: "fts" },
      status: "stale",
      reason_code: "knowledge_index_missing",
      index_freshness: {
        status: "missing",
        ...INDEX_METADATA,
        indexed_digest: null,
        observed_digest: INDEX_DIGEST,
      },
    };
    const unavailableIndex = {
      ...base,
      knowledge_ref: { ...base.knowledge_ref, retrieval: "semantic_rerank" },
      status: "stale",
      reason_code: "knowledge_index_unavailable",
      index_freshness: {
        status: "unavailable",
        projection_version: null,
        generated_at: null,
        indexed_digest: null,
        observed_digest: INDEX_DIGEST,
      },
    };
    for (const value of [staleDigest, staleIndex, missingIndex, unavailableIndex]) {
      expect(validatePreparedKnowledgeExcerpt(value).status).toBe("stale");
    }
  });
});
