import { rm } from "node:fs/promises";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { mkTempDir } from "@agentplane/testkit";

import { PROJECTION_VERSION, readContextProjection } from "../../context/reindex.js";
import {
  checkSqliteProjection,
  readSqliteProjection,
  searchSqliteProjection,
  writeSqliteProjection,
} from "./sqlite.js";

describe("context SQLite projection", () => {
  let tempDir = "";

  beforeEach(async () => {
    tempDir = await mkTempDir();
  });

  afterEach(async () => {
    if (tempDir) {
      await rm(tempDir, { recursive: true, force: true });
    }
  });

  it("writes, reads, and integrity-checks projections through the embedded driver", async () => {
    const dbPath = path.join(tempDir, ".agentplane", "cache.sqlite");

    await writeSqliteProjection(dbPath, {
      metadata: {
        projection_version: 2,
        generated_at: "2026-01-01T00:00:00.000Z",
        workspace_hash: "workspace",
        include_tasks: true,
        include_raw: false,
        source_bytes: 42,
        search_text_bytes: 42,
        preview_text_bytes: 12,
        projection_elapsed_ms: 3,
      },
      rows: [
        {
          path: "README.md",
          sha256: "hash",
          content_type: "text/markdown",
          projection_version: 2,
          indexed_at: "2026-01-01T00:00:00.000Z",
          size_bytes: 42,
          kind: "doc",
          search_text: "Context body",
          preview_text: "Context body",
          source_refs: ["README.md"],
        },
      ],
    });

    const projection = await readSqliteProjection(dbPath);

    expect(await checkSqliteProjection(dbPath)).toBe(true);
    expect(projection?.metadata).toEqual({
      projection_version: 2,
      generated_at: "2026-01-01T00:00:00.000Z",
      workspace_hash: "workspace",
      include_tasks: true,
      include_raw: false,
      source_bytes: 42,
      search_text_bytes: 42,
      preview_text_bytes: 12,
      projection_elapsed_ms: 3,
    });
    expect(projection?.rows).toEqual([
      {
        path: "README.md",
        sha256: "hash",
        content_type: "text/markdown",
        projection_version: 2,
        indexed_at: "2026-01-01T00:00:00.000Z",
        size_bytes: 42,
        kind: "doc",
        search_text: "Context body",
        preview_text: "Context body",
        source_refs: ["README.md"],
      },
    ]);
  });

  it("requires a full rebuild before consuming an older projection version", async () => {
    const dbPath = path.join(tempDir, ".agentplane", "cache.sqlite");
    await writeSqliteProjection(dbPath, {
      metadata: {
        projection_version: PROJECTION_VERSION - 1,
        generated_at: "2026-01-01T00:00:00.000Z",
        workspace_hash: "workspace",
        include_tasks: false,
        include_raw: true,
        source_bytes: 9,
        search_text_bytes: 9,
        preview_text_bytes: 9,
        projection_elapsed_ms: 1,
      },
      rows: [
        {
          path: "context/wiki/legacy.md",
          sha256: "hash",
          content_type: "text/markdown",
          projection_version: PROJECTION_VERSION - 1,
          indexed_at: "2026-01-01T00:00:00.000Z",
          size_bytes: 9,
          kind: "markdown",
          search_text: "legacy row",
          preview_text: "legacy row",
          source_refs: ["context/wiki/legacy.md"],
        },
      ],
    });

    const legacyProjection = await readSqliteProjection(dbPath);
    expect(legacyProjection?.metadata.projection_version).toBe(PROJECTION_VERSION - 1);
    expect(await readContextProjection(tempDir)).toBeNull();
  });

  it("uses FTS5/BM25 with stable scope filtering and pagination", async () => {
    const dbPath = path.join(tempDir, ".agentplane", "cache.sqlite");
    await writeSqliteProjection(dbPath, {
      metadata: {
        projection_version: PROJECTION_VERSION,
        generated_at: "2026-01-01T00:00:00.000Z",
        workspace_hash: "digest-fts",
        include_tasks: false,
        include_raw: true,
        source_bytes: 90,
        search_text_bytes: 90,
        preview_text_bytes: 30,
        projection_elapsed_ms: 3,
      },
      rows: [
        {
          path: "context/wiki/a.md#section=alpha",
          sha256: "hash-a",
          content_type: "text/markdown",
          projection_version: PROJECTION_VERSION,
          indexed_at: "2026-01-01T00:00:00.000Z",
          size_bytes: 30,
          kind: "markdown-section",
          search_text: "shared fts sentinel alpha",
          preview_text: "shared sentinel alpha",
          source_refs: ["context/wiki/a.md#section=alpha"],
        },
        {
          path: "context/wiki/b.md#section=beta",
          sha256: "hash-b",
          content_type: "text/markdown",
          projection_version: PROJECTION_VERSION,
          indexed_at: "2026-01-01T00:00:00.000Z",
          size_bytes: 30,
          kind: "markdown-section",
          search_text: "shared fts sentinel beta",
          preview_text: "shared sentinel beta",
          source_refs: ["context/wiki/b.md#section=beta"],
        },
        {
          path: "context/raw/private/hidden.md",
          sha256: "hash-private",
          content_type: "text/markdown",
          projection_version: PROJECTION_VERSION,
          indexed_at: "2026-01-01T00:00:00.000Z",
          size_bytes: 30,
          kind: "markdown",
          search_text: "shared fts sentinel private",
          preview_text: "shared sentinel private",
          source_refs: ["context/raw/private/hidden.md"],
        },
      ],
    });

    const first = await searchSqliteProjection(dbPath, {
      query: "fts sentinel",
      scopes: ["wiki"],
      limit: 1,
      offset: 0,
    });
    const second = await searchSqliteProjection(dbPath, {
      query: "fts sentinel",
      scopes: ["wiki"],
      limit: 1,
      offset: 1,
    });
    const raw = await searchSqliteProjection(dbPath, {
      query: "fts sentinel",
      scopes: ["raw"],
      limit: 10,
      offset: 0,
    });

    expect(first?.metadata.workspace_hash).toBe("digest-fts");
    expect(first?.rows).toHaveLength(1);
    expect(second?.rows).toHaveLength(1);
    expect(first?.rows[0]?.path).toBe("context/wiki/a.md#section=alpha");
    expect(second?.rows[0]?.path).toBe("context/wiki/b.md#section=beta");
    expect(first?.rows[0]?.highlight).toContain("[fts]");
    expect(raw?.rows).toEqual([]);
  });
});
