import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { projectRowsForFile } from "./reindex-projection.js";
import { createProjectionFreshnessCache } from "./search-freshness.js";

let tempRoots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-search-freshness-"));
  tempRoots.push(root);
  return root;
}

afterEach(async () => {
  await Promise.all(tempRoots.map((root) => rm(root, { recursive: true, force: true })));
  tempRoots = [];
});

describe("projection search freshness cache", () => {
  it("projects one source once while checking several matching canonical rows", async () => {
    const root = await tempRoot();
    const sourcePath = "context/wiki/freshness.md";
    const sourceText = "# Freshness\n\nneedle\n\n## Detail\n\nneedle detail\n";
    const absolute = path.join(root, sourcePath);
    await mkdir(path.dirname(absolute), { recursive: true });
    await writeFile(absolute, sourceText, "utf8");
    const rows = projectRowsForFile(sourcePath, sourceText);
    let projectCalls = 0;
    const freshnessForRow = createProjectionFreshnessCache(root, (filePath, content) => {
      projectCalls += 1;
      return projectRowsForFile(filePath, content);
    });

    const freshness = await Promise.all(rows.map((row) => freshnessForRow(row.path, row.sha256)));

    expect(rows.length).toBeGreaterThan(1);
    expect(projectCalls).toBe(1);
    expect(freshness).toEqual(
      rows.map((row) => ({
        projection_sha256: row.sha256,
        file_sha256: row.sha256,
        stale: false,
      })),
    );
  });
});
