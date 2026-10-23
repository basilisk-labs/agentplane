import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import { PROJECTION_VERSION } from "../../context/reindex.js";
import { materializeKnowledgeRef, resolveKnowledgeRef } from "../../context/knowledge-ref.js";
import { showContext } from "./show.js";
import { cmdContextReindex, readContextProjection, searchContextProjection } from "./reindex.js";
import { readSqliteProjectionState, writeSqliteProjection } from "../../context/sqlite.js";
import * as sqlite from "../../context/sqlite.js";

let tempRoots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-context-incremental-"));
  tempRoots.push(root);
  return root;
}

async function write(root: string, rel: string, text: string): Promise<void> {
  const target = path.join(root, rel);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, text, "utf8");
}

async function reindex(root: string, includeRaw = false, reset = false): Promise<string> {
  const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
  await cmdContextReindex({
    cwd: root,
    parsed: { includeTasks: false, includeRaw, reset },
  });
  return out.mock.calls.map(([chunk]) => String(chunk)).join("");
}

function normalizeProjection(projection: Awaited<ReturnType<typeof readContextProjection>>) {
  if (!projection) return null;
  return {
    metadata: {
      projection_version: projection.metadata.projection_version,
      include_tasks: projection.metadata.include_tasks,
      include_raw: projection.metadata.include_raw,
      source_bytes: projection.metadata.source_bytes,
      search_text_bytes: projection.metadata.search_text_bytes,
      preview_text_bytes: projection.metadata.preview_text_bytes,
    },
    rows: projection.rows
      .map(({ indexed_at: _indexedAt, ...row }) => row)
      .toSorted((left, right) => left.path.localeCompare(right.path)),
  };
}

afterEach(async () => {
  vi.restoreAllMocks();
  await Promise.all(tempRoots.map((root) => rm(root, { recursive: true, force: true })));
  tempRoots = [];
});

describe("incremental context reindex", () => {
  it("indexes duplicate raw JSONL ids and resolves every projected selector", async () => {
    const root = await tempRoot();
    const rawPath = "context/raw/demo/posts.jsonl";
    const factsPath = ".agentplane/context/derived/facts/facts.jsonl";
    await write(
      root,
      rawPath,
      [
        '{"id":"post","text":"first raw marker"}',
        '{"id":"post","text":"second raw marker"}',
        '{"id":"post-2","text":"reserved raw marker"}',
      ].join("\n"),
    );
    await write(
      root,
      factsPath,
      [
        "not-json",
        '{"id":"fact-a","fact":"first fact marker"}',
        "",
        '{"id":"fact-a","fact":"second fact marker"}',
      ].join("\n"),
    );

    const output = await reindex(root, true);
    const projection = await readContextProjection(root);
    const rawRefs = projection?.rows
      .filter((row) => row.path.startsWith(`${rawPath}#`))
      .map((row) => row.path);
    expect(output).toContain("strategy=full-rebuild reason=missing-index");
    expect(rawRefs?.toSorted()).toEqual(
      [`${rawPath}#row=post`, `${rawPath}#row=post-3`, `${rawPath}#row=post-2`].toSorted(),
    );
    const rawSearch = await searchContextProjection(root, {
      query: "second raw marker",
      scopes: ["raw"],
      limit: 10,
      offset: 0,
    });
    expect(rawSearch?.rows.some((row) => row.path === `${rawPath}#row=post-3`)).toBe(true);
    const rawShown = await showContext({ cwd: root, parsed: { ref: `${rawPath}#row=post-3` } });
    expect(JSON.parse(rawShown.content)).toMatchObject({ text: "second raw marker" });

    const factRef = `${factsPath}#fact=fact-a-2`;
    const factShown = await showContext({ cwd: root, parsed: { ref: factRef } });
    expect(JSON.parse(factShown.content)).toMatchObject({ fact: "second fact marker" });
    const knowledgeRef = await materializeKnowledgeRef({
      repository_root: root,
      ref: factRef,
      kind: "fact",
      reason: "Resolve the duplicate fact independently.",
      retrieval: "exact",
      required: true,
      index_snapshot: null,
    });
    const resolved = await resolveKnowledgeRef({
      repository_root: root,
      knowledge_ref: knowledgeRef,
    });
    expect(resolved).toMatchObject({
      status: "fresh",
      source: { line_start: 4, line_end: 4 },
      index_freshness: { status: "fresh" },
    });
    expect(resolved.status === "fresh" && resolved.content).toContain(
      '"fact": "second fact marker"',
    );
  });

  it("retains one source identity and leaves an unchanged projection byte-for-byte intact", async () => {
    const root = await tempRoot();
    await write(
      root,
      "context/wiki/one.md",
      "# One\n\n## Detail\n\nrepeatable source fingerprint\n",
    );

    const firstOutput = await reindex(root);
    const dbPath = path.join(root, ".agentplane", "cache.sqlite");
    const before = await readFile(dbPath);
    const state = await readSqliteProjectionState(dbPath);
    const secondOutput = await reindex(root);
    const after = await readFile(dbPath);

    expect(firstOutput).toContain("strategy=full-rebuild reason=missing-index");
    expect(state?.sourceHashes).toEqual(
      new Map([["context/wiki/one.md", expect.stringMatching(/^sha256:/u)]]),
    );
    expect(state?.rowCount).toBeGreaterThan(1);
    expect(secondOutput).toContain("strategy=no-op reason=source-fingerprints-unchanged");
    expect(after).toEqual(before);
  });

  it("applies add, change, and delete deltas equivalently to a clean full rebuild", async () => {
    const incrementalRoot = await tempRoot();
    const cleanRoot = await tempRoot();
    await write(incrementalRoot, "context/wiki/a.md", "# A\n\nold marker\n");
    await write(incrementalRoot, "context/wiki/b.md", "# B\n\nremove marker\n");
    await reindex(incrementalRoot);

    await write(incrementalRoot, "context/wiki/a.md", "# A\n\nupdated marker\n");
    await rm(path.join(incrementalRoot, "context/wiki/b.md"));
    await write(incrementalRoot, "context/wiki/c.md", "# C\n\nadded marker\n");
    const deltaOutput = await reindex(incrementalRoot);

    await write(cleanRoot, "context/wiki/a.md", "# A\n\nupdated marker\n");
    await write(cleanRoot, "context/wiki/c.md", "# C\n\nadded marker\n");
    await reindex(cleanRoot);

    expect(deltaOutput).toContain("strategy=incremental reason=source-fingerprints-changed");
    expect(deltaOutput).toContain("added=1 changed=1 removed=1 unchanged=0");
    expect(normalizeProjection(await readContextProjection(incrementalRoot))).toEqual(
      normalizeProjection(await readContextProjection(cleanRoot)),
    );

    const search = await searchContextProjection(incrementalRoot, {
      query: "updated marker",
      scopes: ["wiki"],
      limit: 10,
      offset: 0,
    });
    expect(search?.rows.some((row) => row.path.startsWith("context/wiki/a.md"))).toBe(true);
    expect(search?.rows.some((row) => row.path.startsWith("context/wiki/b.md"))).toBe(false);
  });

  it("performs a controlled full rebuild for an incompatible projection version", async () => {
    const root = await tempRoot();
    await write(root, "context/wiki/recovery.md", "# Recovery\n\nversion sentinel\n");
    const dbPath = path.join(root, ".agentplane", "cache.sqlite");

    await writeSqliteProjection(dbPath, {
      metadata: {
        projection_version: PROJECTION_VERSION - 1,
        generated_at: "2026-07-30T00:00:00.000Z",
        workspace_hash: "old-version",
        include_tasks: false,
        include_raw: false,
        source_bytes: 1,
        search_text_bytes: 1,
        preview_text_bytes: 1,
        projection_elapsed_ms: 1,
      },
      rows: [
        {
          path: "context/wiki/recovery.md",
          sha256: "old",
          content_type: "text/markdown",
          projection_version: PROJECTION_VERSION - 1,
          indexed_at: "2026-07-30T00:00:00.000Z",
          size_bytes: 1,
          kind: "markdown",
          search_text: "old",
          preview_text: "old",
        },
      ],
    });

    const output = await reindex(root);
    const projection = await readContextProjection(root);

    expect(output).toContain("strategy=full-rebuild reason=projection-version-mismatch");
    expect(projection?.metadata.projection_version).toBe(PROJECTION_VERSION);
    expect(projection?.rows.some((row) => row.search_text.includes("version sentinel"))).toBe(true);
  });

  it("repairs a corrupt cache before returning projection rows", async () => {
    const root = await tempRoot();
    await write(root, "context/wiki/recovery.md", "# Recovery\n\ncorruption sentinel\n");
    await reindex(root);
    await writeFile(
      path.join(root, ".agentplane", "cache.sqlite"),
      "not a sqlite database",
      "utf8",
    );

    const output = await reindex(root);
    const projection = await readContextProjection(root);

    expect(output).toContain("strategy=full-rebuild reason=integrity-failure");
    expect(projection?.metadata.projection_version).toBe(PROJECTION_VERSION);
    expect(projection?.rows.some((row) => row.search_text.includes("corruption sentinel"))).toBe(
      true,
    );
  });

  it("keeps the last readable projection if reset validation fails", async () => {
    const root = await tempRoot();
    const source = "context/wiki/one.md";
    await write(root, source, "# One\n\nold marker\n");
    await reindex(root);
    const dbPath = path.join(root, ".agentplane", "cache.sqlite");
    const before = await readFile(dbPath);
    const oldProjection = normalizeProjection(await readContextProjection(root));

    await write(root, source, "# One\n\nnew marker\n");
    const check = sqlite.checkSqliteProjection;
    vi.spyOn(sqlite, "checkSqliteProjection").mockImplementation((candidate) =>
      candidate.includes(".rebuild-") ? Promise.resolve(false) : check(candidate),
    );
    await expect(reindex(root, false, true)).rejects.toThrow("integrity check");
    expect(await readFile(dbPath)).toEqual(before);
    expect(normalizeProjection(await readContextProjection(root))).toEqual(oldProjection);
  });

  it("keeps the last readable projection if reset writing fails", async () => {
    const root = await tempRoot();
    const source = "context/wiki/one.md";
    await write(root, source, "# One\n\nold marker\n");
    await reindex(root);
    const dbPath = path.join(root, ".agentplane", "cache.sqlite");
    const before = await readFile(dbPath);
    const oldProjection = normalizeProjection(await readContextProjection(root));

    await write(root, source, "# One\n\nnew marker\n");
    vi.spyOn(sqlite, "writeSqliteProjection").mockRejectedValueOnce(
      new Error("injected write failure"),
    );
    await expect(reindex(root, false, true)).rejects.toThrow("injected write failure");
    expect(await readFile(dbPath)).toEqual(before);
    expect(normalizeProjection(await readContextProjection(root))).toEqual(oldProjection);
  });

  it("replaces the projection after a successful reset", async () => {
    const root = await tempRoot();
    const source = "context/wiki/one.md";
    await write(root, source, "# One\n\nold marker\n");
    await reindex(root);
    await write(root, source, "# One\n\nnew marker\n");

    const output = await reindex(root, false, true);
    const projection = await readContextProjection(root);
    expect(output).toContain("strategy=full-rebuild reason=reset-requested");
    expect(projection?.rows.some((row) => row.search_text.includes("new marker"))).toBe(true);
    expect(projection?.rows.some((row) => row.search_text.includes("old marker"))).toBe(false);
  });
});
