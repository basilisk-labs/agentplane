import { execFile } from "node:child_process";
import { mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import { GitContext, gitConfigGet, gitMergeBase } from "./git-client.js";

const execFileAsync = promisify(execFile);

async function mkRepo(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-git-client-test-"));
  await execFileAsync("git", ["init", "-q"], { cwd: root });
  await execFileAsync("git", ["config", "user.email", "agentplane@example.com"], { cwd: root });
  await execFileAsync("git", ["config", "user.name", "Agentplane"], { cwd: root });
  await writeFile(path.join(root, "tracked.txt"), "seed\n", "utf8");
  await execFileAsync("git", ["add", "tracked.txt"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });
  return root;
}

describe("git-client", () => {
  it("reports changed and untracked paths from real porcelain status", async () => {
    const root = await mkRepo();
    await writeFile(path.join(root, "tracked.txt"), "changed\n", "utf8");
    await writeFile(path.join(root, "untracked.txt"), "new\n", "utf8");

    const git = new GitContext({ gitRoot: root });
    await expect(git.statusChangedPaths()).resolves.toEqual(["tracked.txt", "untracked.txt"]);
    await expect(git.statusUntrackedPaths()).resolves.toEqual(["untracked.txt"]);
    await expect(git.statusUnstagedTrackedPaths()).resolves.toEqual(["tracked.txt"]);
  });

  it("includes both sides of staged renames", async () => {
    const root = await mkRepo();
    await execFileAsync("git", ["mv", "tracked.txt", "renamed.txt"], { cwd: root });

    const git = new GitContext({ gitRoot: root });
    await expect(git.statusStagedPaths()).resolves.toEqual(["renamed.txt", "tracked.txt"]);
  });

  it("resolves merge-base for two commits", async () => {
    const root = await mkRepo();
    const { stdout: baseOut } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    await writeFile(path.join(root, "tracked.txt"), "changed\n", "utf8");
    await execFileAsync("git", ["add", "tracked.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "change"], { cwd: root });
    const { stdout: headOut } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });

    await expect(gitMergeBase(root, baseOut.trim(), headOut.trim())).resolves.toBe(baseOut.trim());
  });

  it("reads optional git config values", async () => {
    const root = await mkRepo();
    await execFileAsync("git", ["config", "remote.origin.url", "git@example.com:repo.git"], {
      cwd: root,
    });

    await expect(gitConfigGet(root, "remote.origin.url")).resolves.toBe("git@example.com:repo.git");
    await expect(gitConfigGet(root, "remote.missing.url")).resolves.toBeNull();
  });
});
