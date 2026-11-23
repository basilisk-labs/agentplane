import { mkdtemp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { parseTaskReadme } from "@agentplaneorg/core/tasks";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  PARSED_README_CACHE_MIN_CHARS,
  parseTaskReadmeCached,
  parsedReadmeCacheDir,
} from "./parsed-readme-cache.js";

function largeReadme(title: string): string {
  const padding = "x".repeat(PARSED_README_CACHE_MIN_CHARS);
  return `---\nid: "202611230000-ABCDEF"\ntitle: "${title}"\nnotes: "${padding}"\n---\n\n## Summary\n\n${title}\n`;
}

describe("parsed Task README cache", () => {
  let root: string;
  let tasksDir: string;
  let readmePath: string;

  beforeEach(async () => {
    root = await mkdtemp(path.join(os.tmpdir(), "agentplane-parsed-readme-"));
    tasksDir = path.join(root, ".agentplane", "tasks");
    readmePath = path.join(tasksDir, "202611230000-ABCDEF", "README.md");
    await mkdir(path.dirname(readmePath), { recursive: true });
  });

  afterEach(async () => {
    await rm(root, { recursive: true, force: true });
  });

  it("returns the same value as a direct parse and reuses it on the next read", async () => {
    const text = largeReadme("first");
    const first = await parseTaskReadmeCached({ tasksDir, readmePath, text });
    expect(first).toEqual(parseTaskReadme(text));
    const entries = await readdir(parsedReadmeCacheDir(tasksDir));
    expect(entries).toHaveLength(1);
    expect(parsedReadmeCacheDir(tasksDir)).toBe(
      path.join(root, ".agentplane", "cache", "parsed-readmes-v1"),
    );
    const second = await parseTaskReadmeCached({ tasksDir, readmePath, text });
    expect(second).toEqual(first);
    expect(second).not.toBe(first);
  });

  it("never serves a stale parse after the README text changes", async () => {
    await parseTaskReadmeCached({ tasksDir, readmePath, text: largeReadme("before") });
    const changed = largeReadme("after");
    const result = await parseTaskReadmeCached({ tasksDir, readmePath, text: changed });
    expect(result.frontmatter.title).toBe("after");
    // One entry per README path: the changed text replaces the old entry.
    expect(await readdir(parsedReadmeCacheDir(tasksDir))).toHaveLength(1);
  });

  it("ignores a tampered entry whose digest does not match the text", async () => {
    const text = largeReadme("original");
    await parseTaskReadmeCached({ tasksDir, readmePath, text });
    const directory = parsedReadmeCacheDir(tasksDir);
    const [entryName] = await readdir(directory);
    const entryPath = path.join(directory, entryName!);
    const entry = JSON.parse(await readFile(entryPath, "utf8")) as Record<string, unknown>;
    await writeFile(
      entryPath,
      JSON.stringify({ ...entry, frontmatter: { title: "forged" }, digest: "0".repeat(64) }),
    );
    const result = await parseTaskReadmeCached({ tasksDir, readmePath, text });
    expect(result.frontmatter.title).toBe("original");
  });

  it("falls back to a direct parse for a corrupt entry", async () => {
    const text = largeReadme("corrupt");
    await parseTaskReadmeCached({ tasksDir, readmePath, text });
    const directory = parsedReadmeCacheDir(tasksDir);
    const [entryName] = await readdir(directory);
    await writeFile(path.join(directory, entryName!), "{not json");
    const result = await parseTaskReadmeCached({ tasksDir, readmePath, text });
    expect(result).toEqual(parseTaskReadme(text));
  });

  it("does not cache small READMEs", async () => {
    const text = `---\nid: "202611230000-ABCDEF"\ntitle: "small"\n---\n\nbody\n`;
    expect(await parseTaskReadmeCached({ tasksDir, readmePath, text })).toEqual(
      parseTaskReadme(text),
    );
    await expect(readdir(parsedReadmeCacheDir(tasksDir))).rejects.toMatchObject({
      code: "ENOENT",
    });
  });

  it("can be disabled with AGENTPLANE_README_PARSE_CACHE=0", async () => {
    const previous = process.env.AGENTPLANE_README_PARSE_CACHE;
    process.env.AGENTPLANE_README_PARSE_CACHE = "0";
    try {
      await parseTaskReadmeCached({ tasksDir, readmePath, text: largeReadme("disabled") });
      await expect(readdir(parsedReadmeCacheDir(tasksDir))).rejects.toMatchObject({
        code: "ENOENT",
      });
    } finally {
      if (previous === undefined) delete process.env.AGENTPLANE_README_PARSE_CACHE;
      else process.env.AGENTPLANE_README_PARSE_CACHE = previous;
    }
  });
});
