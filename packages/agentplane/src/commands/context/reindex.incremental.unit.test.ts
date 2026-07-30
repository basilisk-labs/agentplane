import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import { PROJECTION_VERSION } from "../../context/reindex.js";
import { cmdContextReindex, readContextProjection, searchContextProjection } from "./reindex.js";
import { readSqliteProjectionState, writeSqliteProjection } from "../../context/sqlite.js";

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

async function reindex(root: string): Promise<string> {
  const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
  await cmdContextReindex({
    cwd: root,
    parsed: { includeTasks: false, includeRaw: false, reset: false },
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
});
