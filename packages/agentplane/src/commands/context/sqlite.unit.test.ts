import { rm } from "node:fs/promises";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { mkTempDir } from "@agentplane/testkit";

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
    const dbPath = path.join(tempDir, ".agentplane", "context", "service", "local.sqlite");

    await writeSqliteProjection(dbPath, {
      metadata: {
        projection_version: 1,
        generated_at: "2026-01-01T00:00:00.000Z",
        workspace_hash: "workspace",
        include_tasks: true,
        include_raw: false,
      },
      rows: [
        {
          path: "README.md",
          sha256: "hash",
          content_type: "text/markdown",
          projection_version: 1,
          indexed_at: "2026-01-01T00:00:00.000Z",
          size_bytes: 42,
          kind: "doc",
          body: "Context body",
          source_refs: ["README.md"],
        },
      ],
    });

    const projection = await readSqliteProjection(dbPath);

    expect(await checkSqliteProjection(dbPath)).toBe(true);
    expect(projection?.metadata).toEqual({
      projection_version: 1,
      generated_at: "2026-01-01T00:00:00.000Z",
      workspace_hash: "workspace",
      include_tasks: true,
      include_raw: false,
    });
    expect(projection?.rows).toEqual([
      {
        path: "README.md",
        sha256: "hash",
        content_type: "text/markdown",
        projection_version: 1,
        indexed_at: "2026-01-01T00:00:00.000Z",
        size_bytes: 42,
        kind: "doc",
        body: "Context body",
        source_refs: ["README.md"],
      },
    ]);
  });
});
