import { mkdtemp, mkdir, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { scanTaskReadmes } from "./task-readme-scan.js";

async function writeReadme(tasksDir: string, id: string, title: string) {
  await mkdir(path.join(tasksDir, id), { recursive: true });
  await writeFile(
    path.join(tasksDir, id, "README.md"),
    `---\nid: "${id}"\ntitle: "${title}"\n---\n\nbody ${title}\n`,
  );
}

describe("doctor Task README scan", () => {
  let root: string;
  let tasksDir: string;

  beforeEach(async () => {
    root = await mkdtemp(path.join(os.tmpdir(), "agentplane-doctor-scan-"));
    tasksDir = path.join(root, ".agentplane", "tasks");
    await mkdir(tasksDir, { recursive: true });
  });

  afterEach(async () => {
    await rm(root, { recursive: true, force: true });
  });

  it("returns parsed frontmatter and body for every readable README", async () => {
    await writeReadme(tasksDir, "B", "second");
    await writeReadme(tasksDir, "A", "first");
    await mkdir(path.join(tasksDir, "EMPTY"));
    await mkdir(path.join(tasksDir, "BROKEN"));
    await writeFile(path.join(tasksDir, "BROKEN", "README.md"), "---\n: [\n---\n");
    const scanned = await scanTaskReadmes(tasksDir);
    expect(scanned.map((entry) => [entry.dirName, entry.frontmatter.title])).toEqual([
      ["A", "first"],
      ["B", "second"],
    ]);
    expect(scanned[0]!.body).toContain("body first");
  });

  it("rescans after a README changes and does not share the result array", async () => {
    await writeReadme(tasksDir, "A", "before");
    const first = await scanTaskReadmes(tasksDir);
    first.pop();
    expect(await scanTaskReadmes(tasksDir)).toHaveLength(1);
    await writeReadme(tasksDir, "A", "after-change");
    const second = await scanTaskReadmes(tasksDir);
    expect(second[0]!.frontmatter.title).toBe("after-change");
  });

  it("skips a symlinked README", async () => {
    await writeReadme(tasksDir, "A", "real");
    await mkdir(path.join(tasksDir, "LINK"));
    await symlink(path.join(tasksDir, "A", "README.md"), path.join(tasksDir, "LINK", "README.md"));
    const scanned = await scanTaskReadmes(tasksDir);
    expect(scanned.map((entry) => entry.dirName)).toEqual(["A"]);
  });

  it("returns an empty list when the task directory is absent", async () => {
    expect(await scanTaskReadmes(path.join(root, "missing"))).toEqual([]);
  });
});
