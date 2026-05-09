import { execFile } from "node:child_process";
import { mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import { gitDiffNameStatus, gitDiffNumstat } from "./git-diff.js";

const execFileAsync = promisify(execFile);

async function mkRepo(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-git-diff-test-"));
  await execFileAsync("git", ["init", "-q"], { cwd: root });
  await execFileAsync("git", ["config", "user.email", "agentplane@example.com"], { cwd: root });
  await execFileAsync("git", ["config", "user.name", "Agentplane"], { cwd: root });
  await writeFile(path.join(root, "tracked.txt"), "seed\n", "utf8");
  await execFileAsync("git", ["add", "tracked.txt"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });
  return root;
}

describe("git-diff", () => {
  it("reports two-dot name status and numstat entries", async () => {
    const root = await mkRepo();
    const { stdout: baseOut } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    await writeFile(path.join(root, "tracked.txt"), "seed\nchanged\n", "utf8");
    await writeFile(path.join(root, "added.txt"), "new\n", "utf8");
    await execFileAsync("git", ["add", "tracked.txt", "added.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "change"], { cwd: root });
    const { stdout: headOut } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });

    await expect(
      gitDiffNameStatus(root, baseOut.trim(), headOut.trim(), { range: "two-dot" }),
    ).resolves.toEqual([
      { statusCode: "A", path: "added.txt" },
      { statusCode: "M", path: "tracked.txt" },
    ]);
    await expect(
      gitDiffNumstat(root, baseOut.trim(), headOut.trim(), { range: "two-dot" }),
    ).resolves.toEqual([
      { insertions: 1, deletions: 0, path: "added.txt" },
      { insertions: 1, deletions: 0, path: "tracked.txt" },
    ]);
  });
});
