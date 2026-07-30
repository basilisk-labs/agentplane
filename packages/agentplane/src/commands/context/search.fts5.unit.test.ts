import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import { cmdContextReindex } from "./reindex.js";
import { cmdContextSearch } from "./search.js";

let tempRoots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-context-fts5-"));
  tempRoots.push(root);
  return root;
}

async function write(root: string, rel: string, text: string): Promise<void> {
  const target = path.join(root, rel);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, text, "utf8");
}

afterEach(async () => {
  vi.restoreAllMocks();
  await Promise.all(tempRoots.map((root) => rm(root, { recursive: true, force: true })));
  tempRoots = [];
});

describe("context search FTS5", () => {
  it("paginates FTS results by stable canonical ref without a live fallback", async () => {
    const root = await tempRoot();
    await write(root, "context/wiki/a.md", "# A\n\npaged needle\n");
    await write(root, "context/wiki/b.md", "# B\n\npaged needle\n");
    await write(root, "context/wiki/c.md", "# C\n\npaged needle\n");
    await cmdContextReindex({
      cwd: root,
      parsed: { includeTasks: false, includeRaw: false, reset: false },
    });
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    await cmdContextSearch({
      cwd: root,
      parsed: {
        query: "paged needle",
        scope: "wiki",
        format: "json",
        explain: false,
        topK: "1",
        page: "2",
      },
    });

    const payload = JSON.parse(out.mock.calls.map((call) => String(call[0])).join("")) as {
      pagination: { top_k: number; page: number };
      fallback: { used: boolean };
      results: { ref: string }[];
    };
    expect(payload.pagination).toEqual({ top_k: 1, page: 2 });
    expect(payload.fallback.used).toBe(false);
    expect(payload.results.map((result) => result.ref)).toEqual(["context/wiki/b.md"]);
  });
});
