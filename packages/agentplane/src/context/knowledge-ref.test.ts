import { mkdir, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import { cmdContextShow } from "../commands/context/show.js";
import {
  materializeKnowledgeRef,
  prepareKnowledgeExcerpt,
  resolveKnowledgeRef,
  type KnowledgeIndexSnapshot,
} from "./knowledge-ref.js";
import { projectRowsForFile } from "./reindex-projection.js";

const roots: string[] = [];

async function makeRepository(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-knowledge-ref-"));
  roots.push(root);
  return root;
}

async function write(root: string, relative: string, content: string): Promise<void> {
  const target = path.join(root, relative);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content, "utf8");
}

async function buildIndex(root: string, paths: string[]): Promise<KnowledgeIndexSnapshot> {
  const rows = [];
  for (const relative of paths) {
    const content = await readFile(path.join(root, relative), "utf8");
    rows.push(...projectRowsForFile(relative, content));
  }
  return {
    metadata: {
      projection_version: 1,
      generated_at: "2026-07-24T00:00:00.000Z",
    },
    rows,
  };
}

afterEach(async () => {
  vi.restoreAllMocks();
  await Promise.all(
    roots.splice(0).map(async (root) => rm(root, { recursive: true, force: true })),
  );
});

describe("KnowledgeRef resolution", () => {
  it("reproduces every supported kind and retrieval provenance with fresh index identity", async () => {
    const root = await makeRepository();
    const files = {
      wiki: "context/wiki/architecture.md",
      fact: ".agentplane/context/derived/facts/facts.jsonl",
      entity: ".agentplane/context/derived/graph/entities.jsonl",
      edge: ".agentplane/context/derived/graph/edges.jsonl",
      source: "context/raw/design-notes.txt",
    } as const;
    await write(root, files.wiki, "# Architecture\n\n## Overview\nCanonical boundary.\n");
    await write(
      root,
      files.fact,
      `${JSON.stringify({ id: "fact / one", fact: "Use one knowledge plane." })}\n`,
    );
    await write(
      root,
      files.entity,
      `${JSON.stringify({ id: "entity-1", entity: { name: "Knowledge plane" } })}\n`,
    );
    await write(
      root,
      files.edge,
      `${JSON.stringify({ id: "edge-1", edge: "prepares", from: "cli", to: "agent" })}\n`,
    );
    await write(root, files.source, "Source line one.\nSource line two.\n");

    const specs = [
      {
        ref: `${files.wiki}#section=overview`,
        kind: "wiki" as const,
        retrieval: "semantic_rerank" as const,
      },
      {
        ref: `${files.fact}#fact=fact%20%2F%20one`,
        kind: "fact" as const,
        retrieval: "fts" as const,
      },
      {
        ref: `${files.entity}#entity=entity-1`,
        kind: "entity" as const,
        retrieval: "alias" as const,
      },
      {
        ref: `${files.edge}#edge=edge-1`,
        kind: "edge" as const,
        retrieval: "graph" as const,
      },
      {
        ref: files.source,
        kind: "source" as const,
        retrieval: "exact" as const,
      },
    ];
    const index = await buildIndex(root, Object.values(files));
    const refs = await Promise.all(
      specs.map(async (spec) =>
        materializeKnowledgeRef({
          repository_root: root,
          ...spec,
          reason: `Need ${spec.kind} evidence.`,
          required: true,
          index_snapshot: index,
        }),
      ),
    );

    const resolved = await Promise.all(
      refs.map(async (knowledgeRef) =>
        resolveKnowledgeRef({
          repository_root: root,
          knowledge_ref: knowledgeRef,
          index_snapshot: index,
        }),
      ),
    );

    expect(resolved.map((entry) => entry.status)).toEqual([
      "fresh",
      "fresh",
      "fresh",
      "fresh",
      "fresh",
    ]);
    expect(resolved.map((entry) => entry.knowledge_ref.retrieval)).toEqual([
      "semantic_rerank",
      "fts",
      "alias",
      "graph",
      "exact",
    ]);
    for (const entry of resolved) {
      expect(entry.index_freshness.status).toBe("fresh");
      expect(entry.source?.ref).toBe(entry.knowledge_ref.ref);
      expect(entry.source?.observed_source_digest).toBe(entry.knowledge_ref.digest);
      expect(entry.source?.content_digest).toMatch(/^sha256:[0-9a-f]{64}$/u);
    }

    const stdout = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    await cmdContextShow({
      cwd: root,
      parsed: { ref: specs[1].ref },
    });
    expect(
      JSON.parse(stdout.mock.calls.map((call) => String(call[0])).join("")) as {
        id: string;
      },
    ).toMatchObject({ id: "fact / one" });
  });

  it("returns explicit stale, missing, and index-dependent states without stale content", async () => {
    const root = await makeRepository();
    const wikiPath = "context/wiki/runtime.md";
    const sourcePath = "context/raw/source.txt";
    await write(root, wikiPath, "# Runtime\n\n## Contract\nOriginal contract.\n");
    await write(root, sourcePath, "Original source.\n");
    const wikiRef = await materializeKnowledgeRef({
      repository_root: root,
      ref: `${wikiPath}#section=contract`,
      kind: "wiki",
      reason: "Need the runtime contract.",
      retrieval: "exact",
      required: true,
      index_snapshot: null,
    });
    const sourceRef = await materializeKnowledgeRef({
      repository_root: root,
      ref: sourcePath,
      kind: "source",
      reason: "Need the original source.",
      retrieval: "exact",
      required: true,
      index_snapshot: null,
    });
    const index = await buildIndex(root, [wikiPath, sourcePath]);

    const malformedIndex = {
      ...index,
      metadata: {
        projection_version: 0,
        generated_at: "not-a-date",
      },
    };
    const exactWithMalformedIndex = await resolveKnowledgeRef({
      repository_root: root,
      knowledge_ref: sourceRef,
      index_snapshot: malformedIndex,
    });
    expect(exactWithMalformedIndex).toMatchObject({
      status: "fresh",
      index_freshness: {
        status: "unavailable",
        projection_version: null,
        generated_at: null,
        indexed_digest: null,
      },
    });
    const ftsWithMalformedIndex = await resolveKnowledgeRef({
      repository_root: root,
      knowledge_ref: { ...wikiRef, retrieval: "fts" },
      index_snapshot: malformedIndex,
    });
    expect(ftsWithMalformedIndex).toMatchObject({
      status: "stale",
      reason_code: "knowledge_index_unavailable",
      index_freshness: { status: "unavailable" },
    });

    const staleIndex = {
      ...index,
      rows: index.rows.map((row) =>
        row.path === wikiRef.ref ? { ...row, sha256: `sha256:${"f".repeat(64)}` } : row,
      ),
    };
    const staleProjection = await resolveKnowledgeRef({
      repository_root: root,
      knowledge_ref: wikiRef,
      index_snapshot: staleIndex,
    });
    expect(staleProjection).toMatchObject({
      status: "stale",
      reason_code: "knowledge_index_stale",
      content: null,
    });

    const ftsWithoutIndex = await resolveKnowledgeRef({
      repository_root: root,
      knowledge_ref: { ...wikiRef, retrieval: "fts" },
      index_snapshot: null,
    });
    expect(ftsWithoutIndex).toMatchObject({
      status: "stale",
      reason_code: "knowledge_index_unavailable",
      content: null,
    });

    await write(root, wikiPath, "# Runtime\n\n## Contract\nChanged contract.\n");
    const staleDigest = await resolveKnowledgeRef({
      repository_root: root,
      knowledge_ref: wikiRef,
      index_snapshot: index,
    });
    expect(staleDigest).toMatchObject({
      status: "stale",
      reason_code: "digest_mismatch",
      content: null,
    });

    await rm(path.join(root, sourcePath));
    const missing = await resolveKnowledgeRef({
      repository_root: root,
      knowledge_ref: sourceRef,
      index_snapshot: index,
    });
    expect(missing).toMatchObject({
      status: "missing",
      reason_code: "source_missing",
      source: null,
      content: null,
    });
  });

  it("emits bounded omission receipts and leaves context-pack.md untouched", async () => {
    const root = await makeRepository();
    const sourcePath = "context/raw/long-source.txt";
    const contextPackPath = ".agentplane/tasks/TASK-1/context-pack.md";
    await write(root, sourcePath, "one\ntwo\nthree\n");
    await write(root, contextPackPath, "# Existing assimilation context pack\n");
    const knowledgeRef = await materializeKnowledgeRef({
      repository_root: root,
      ref: sourcePath,
      kind: "source",
      reason: "Need bounded source evidence.",
      retrieval: "exact",
      required: false,
      index_snapshot: null,
    });
    const before = await readFile(path.join(root, contextPackPath), "utf8");

    const omitted = await prepareKnowledgeExcerpt({
      repository_root: root,
      knowledge_ref: knowledgeRef,
      max_bytes: 1024,
      max_lines: 1,
      index_snapshot: null,
    });
    const included = await prepareKnowledgeExcerpt({
      repository_root: root,
      knowledge_ref: knowledgeRef,
      max_bytes: 1024,
      max_lines: 10,
      index_snapshot: null,
    });

    expect(omitted).toMatchObject({
      status: "omitted",
      reason_code: "max_lines_exceeded",
      observed: {
        emitted_bytes: 0,
        emitted_lines: 0,
      },
    });
    expect("content" in omitted).toBe(false);
    expect(included).toMatchObject({
      status: "included",
      reason_code: "included",
      content: "one\ntwo\nthree\n",
    });
    await expect(
      materializeKnowledgeRef({
        repository_root: root,
        ref: sourcePath,
        kind: "source",
        reason: "Reject an unbounded source read.",
        retrieval: "exact",
        required: false,
        index_snapshot: null,
        max_source_bytes: 16 * 1024 * 1024 + 1,
      }),
    ).rejects.toThrow("max_source_bytes must be between");
    expect(await readFile(path.join(root, contextPackPath), "utf8")).toBe(before);
  });

  it("refuses a knowledge source reached through a symlink", async () => {
    const root = await makeRepository();
    const outside = await makeRepository();
    const ref = "context/raw/leak.txt";
    await write(outside, "secret.txt", "outside repository\n");
    await mkdir(path.dirname(path.join(root, ref)), { recursive: true });
    await symlink(path.join(outside, "secret.txt"), path.join(root, ref));

    await expect(
      materializeKnowledgeRef({
        repository_root: root,
        ref,
        kind: "source",
        reason: "Must not follow a source symlink.",
        retrieval: "exact",
        required: true,
        index_snapshot: null,
      }),
    ).rejects.toThrow("Refusing symlinked KnowledgeRef source path");
  });

  it("treats an absent default projection cache as unavailable", async () => {
    const root = await makeRepository();
    const ref = "context/wiki/no-cache.md";
    await write(root, ref, "# No cache\n\nRepository-owned content.\n");

    await expect(
      materializeKnowledgeRef({
        repository_root: root,
        ref,
        kind: "wiki",
        reason: "Exact retrieval does not require an index.",
        retrieval: "exact",
        required: true,
      }),
    ).resolves.toMatchObject({ ref, retrieval: "exact" });
  });

  it.each(["cache-file", "cache-ancestor"] as const)(
    "refuses a repository-escaping projection %s symlink",
    async (variant) => {
      const root = await makeRepository();
      const outside = await makeRepository();
      const ref = "context/wiki/indexed.md";
      await write(root, ref, "# Indexed\n\nRepository-owned content.\n");
      const index = await buildIndex(root, [ref]);
      await write(outside, "cache.json", JSON.stringify(index));

      if (variant === "cache-file") {
        await mkdir(path.join(root, ".agentplane"), { recursive: true });
        await symlink(
          path.join(outside, "cache.json"),
          path.join(root, ".agentplane/cache.sqlite"),
        );
      } else {
        await write(outside, ".agentplane/cache.sqlite", JSON.stringify(index));
        await symlink(path.join(outside, ".agentplane"), path.join(root, ".agentplane"));
      }

      await expect(
        materializeKnowledgeRef({
          repository_root: root,
          ref,
          kind: "wiki",
          reason: "Must not trust an external projection.",
          retrieval: "fts",
          required: true,
        }),
      ).rejects.toThrow(/Refusing symlinked context projection cache path/u);
    },
  );

  it("keeps legacy human-heading selectors readable through context show", async () => {
    const root = await makeRepository();
    const wikiPath = "context/wiki/legacy.md";
    await write(root, wikiPath, "# Human Heading\nLegacy-compatible body.\n");
    const stdout = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    await cmdContextShow({
      cwd: root,
      parsed: { ref: `${wikiPath}#section=Human%20Heading` },
    });

    expect(stdout.mock.calls.map((call) => String(call[0])).join("")).toContain(
      "Legacy-compatible body.",
    );
  });

  it("uses the projection ordinal for JSONL rows without an id", async () => {
    const root = await makeRepository();
    const factPath = ".agentplane/context/derived/facts/facts.jsonl";
    await write(
      root,
      factPath,
      '\nnot-json\n["not-a-row"]\n{"id":"","fact":"empty id"}\n{"fact":"anonymous fact"}\n',
    );
    const projected = projectRowsForFile(
      factPath,
      await readFile(path.join(root, factPath), "utf8"),
    );
    expect(projected.map((row) => row.path)).toEqual([`${factPath}#fact=1`, `${factPath}#fact=2`]);

    const knowledgeRef = await materializeKnowledgeRef({
      repository_root: root,
      ref: projected[1].path,
      kind: "fact",
      reason: "Need the anonymous projected fact.",
      retrieval: "exact",
      required: true,
      index_snapshot: null,
    });
    const resolved = await resolveKnowledgeRef({
      repository_root: root,
      knowledge_ref: knowledgeRef,
      index_snapshot: await buildIndex(root, [factPath]),
    });

    expect(resolved).toMatchObject({
      status: "fresh",
      source: { line_start: 5, line_end: 5 },
      index_freshness: { status: "fresh" },
    });
  });

  it("reproduces duplicate and empty sections plus provenance edges from projection refs", async () => {
    const root = await makeRepository();
    const wikiPath = "context/wiki/repeated.md";
    const provenancePath = ".agentplane/context/derived/graph/provenance_edges.jsonl";
    await write(
      root,
      wikiPath,
      "# Repeated\nFirst body.\n# Repeated\nSecond body.\n# Repeated 2\nNamed collision body.\n# Empty\n# Next\nNext body.\n",
    );
    await write(
      root,
      provenancePath,
      `${JSON.stringify({ id: "prov-1", from: "source", to: "fact", relation: "supports" })}\n`,
    );

    const repeated = await materializeKnowledgeRef({
      repository_root: root,
      ref: `${wikiPath}#section=repeated-2`,
      kind: "wiki",
      reason: "Need the second repeated section.",
      retrieval: "exact",
      required: true,
      index_snapshot: null,
    });
    const empty = await materializeKnowledgeRef({
      repository_root: root,
      ref: `${wikiPath}#section=empty`,
      kind: "wiki",
      reason: "Need the explicitly empty section.",
      retrieval: "exact",
      required: false,
      index_snapshot: null,
    });
    const namedCollision = await materializeKnowledgeRef({
      repository_root: root,
      ref: `${wikiPath}#section=repeated-2-2`,
      kind: "wiki",
      reason: "Need the uniquely projected named collision section.",
      retrieval: "exact",
      required: true,
      index_snapshot: null,
    });
    const provenance = await materializeKnowledgeRef({
      repository_root: root,
      ref: `${provenancePath}#edge=prov-1`,
      kind: "edge",
      reason: "Need the provenance edge.",
      retrieval: "graph",
      required: true,
      index_snapshot: null,
    });
    const index = await buildIndex(root, [wikiPath, provenancePath]);

    const [resolvedRepeated, resolvedEmpty, resolvedNamedCollision, resolvedProvenance] =
      await Promise.all([
        resolveKnowledgeRef({
          repository_root: root,
          knowledge_ref: repeated,
          index_snapshot: index,
        }),
        resolveKnowledgeRef({
          repository_root: root,
          knowledge_ref: empty,
          index_snapshot: index,
        }),
        resolveKnowledgeRef({
          repository_root: root,
          knowledge_ref: namedCollision,
          index_snapshot: index,
        }),
        resolveKnowledgeRef({
          repository_root: root,
          knowledge_ref: provenance,
          index_snapshot: index,
        }),
      ]);

    expect(resolvedRepeated).toMatchObject({
      status: "fresh",
      content: "Second body.",
      index_freshness: { status: "fresh" },
    });
    expect(resolvedEmpty).toMatchObject({
      status: "fresh",
      content: "",
      source: { line_start: null, line_end: null, content_lines: 0 },
      index_freshness: { status: "fresh" },
    });
    expect(resolvedNamedCollision).toMatchObject({
      status: "fresh",
      content: "Named collision body.",
      index_freshness: { status: "fresh" },
    });
    expect(resolvedProvenance).toMatchObject({
      status: "fresh",
      index_freshness: { status: "fresh" },
      source: {
        ref: `${provenancePath}#edge=prov-1`,
        selector: { key: "edge", value: "prov-1" },
      },
    });
  });
});
