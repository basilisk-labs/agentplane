import {
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  rename,
  rm,
  stat,
  symlink,
  utimes,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { writeJsonStableIfChanged, writeTextIfChanged } from "./write-if-changed.js";

async function makeRewriteMtimeVisible(filePath: string): Promise<void> {
  const st = await stat(filePath);
  await utimes(filePath, st.atime, new Date("2020-01-01T00:00:00.000Z"));
}

describe("shared/write-if-changed", () => {
  it("writeTextIfChanged writes when missing and skips when identical", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-write-if-changed-"));
    const filePath = path.join(root, "file.txt");

    expect(await writeTextIfChanged(filePath, "hello\n")).toBe(true);

    await makeRewriteMtimeVisible(filePath);
    const visibleBefore = await stat(filePath);

    expect(await writeTextIfChanged(filePath, "hello\n")).toBe(false);
    const after = await stat(filePath);

    expect(after.mtimeMs).toBe(visibleBefore.mtimeMs);
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
    await makeRewriteMtimeVisible(filePath);
    const before = await stat(filePath);

    const obj2 = { a: { c: 3, d: 2 }, b: 1 };
    expect(await writeJsonStableIfChanged(filePath, obj2)).toBe(false);
    const after = await stat(filePath);
    expect(after.mtimeMs).toBe(before.mtimeMs);
  });

  it("rejects a contained parent symlink swap before atomic publication", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-write-if-changed-"));
    const outside = await mkdtemp(path.join(os.tmpdir(), "agentplane-write-if-changed-outside-"));
    const taskDirectory = path.join(root, "tasks", "task-1");
    const displacedDirectory = path.join(root, "tasks", "task-1-displaced");
    const filePath = path.join(taskDirectory, "README.md");
    const outsideFilePath = path.join(outside, "README.md");
    await mkdir(taskDirectory, { recursive: true });
    await writeFile(outsideFilePath, "outside sentinel\n", "utf8");

    try {
      await expect(
        writeTextIfChanged(filePath, "new contents\n", {
          containedRoot: root,
          label: "task README",
          afterObservation: async () => {
            await rename(taskDirectory, displacedDirectory);
            await symlink(outside, taskDirectory, "dir");
          },
        }),
      ).rejects.toThrow("Refusing symlinked task README path");

      await expect(readFile(outsideFilePath, "utf8")).resolves.toBe("outside sentinel\n");
      await expect(readdir(outside)).resolves.toEqual(["README.md"]);
    } finally {
      await rm(root, { recursive: true, force: true });
      await rm(outside, { recursive: true, force: true });
    }
  });
});
