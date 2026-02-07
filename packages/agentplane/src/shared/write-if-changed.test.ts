import { mkdtemp, readFile, stat } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { writeJsonStableIfChanged, writeTextIfChanged } from "./write-if-changed.js";

describe("shared/write-if-changed", () => {
  it("writeTextIfChanged writes when missing and skips when identical", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-write-if-changed-"));
    const filePath = path.join(root, "file.txt");

    expect(await writeTextIfChanged(filePath, "hello\n")).toBe(true);
    const before = await stat(filePath);

    // Give the filesystem a chance to tick; we assert mtime doesn't change.
    await new Promise((resolve) => setTimeout(resolve, 10));

    expect(await writeTextIfChanged(filePath, "hello\n")).toBe(false);
    const after = await stat(filePath);

    expect(after.mtimeMs).toBe(before.mtimeMs);
    expect(await readFile(filePath, "utf8")).toBe("hello\n");
  });

  it("writeJsonStableIfChanged canonicalizes key order and is write-if-changed", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-write-if-changed-"));
    const filePath = path.join(root, "data.json");

    const obj1 = { b: 1, a: { d: 2, c: 3 } };
    expect(await writeJsonStableIfChanged(filePath, obj1)).toBe(true);
    const text1 = await readFile(filePath, "utf8");
    expect(text1).toBe('{\n  "a": {\n    "c": 3,\n    "d": 2\n  },\n  "b": 1\n}\n');

    // Same content with different insertion order should not rewrite.
    const before = await stat(filePath);
    await new Promise((resolve) => setTimeout(resolve, 10));

    const obj2 = { a: { c: 3, d: 2 }, b: 1 };
    expect(await writeJsonStableIfChanged(filePath, obj2)).toBe(false);
    const after = await stat(filePath);
    expect(after.mtimeMs).toBe(before.mtimeMs);
  });
});
