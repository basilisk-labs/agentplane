import { rm } from "node:fs/promises";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { mkTempDir } from "@agentplane/testkit";

import { PROJECTION_VERSION, readContextProjection } from "../../context/reindex.js";
import { checkSqliteProjection, readSqliteProjection, writeSqliteProjection } from "./sqlite.js";

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
});
