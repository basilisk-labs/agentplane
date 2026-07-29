import { execFile } from "node:child_process";
import { mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import {
  GitContext,
  gitBranchUpstream,
  gitConfigGet,
  gitMergeBase,
  gitRefreshBranchTrackingRef,
} from "./git-client.js";

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

  it("refreshes a configured upstream when the fetch refspec omits its tracking branch", async () => {
    const root = await mkRepo();
    const remotePath = await mkdtemp(path.join(os.tmpdir(), "agentplane-git-client-origin-"));
    await execFileAsync("git", ["init", "--bare", remotePath], { cwd: root });
    await execFileAsync("git", ["remote", "add", "origin", remotePath], { cwd: root });
    await execFileAsync(
      "git",
      ["config", "remote.origin.fetch", "+refs/heads/main:refs/remotes/origin/main"],
      { cwd: root },
    );
    const branch = "task/T-TRACK/constrained-refspec";
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await execFileAsync("git", ["commit", "--allow-empty", "-m", "task head"], { cwd: root });
    await execFileAsync("git", ["push", "-u", "origin", `HEAD:refs/heads/${branch}`], {
      cwd: root,
    });
    await expect(gitBranchUpstream(root, branch)).resolves.toBeNull();

    await gitRefreshBranchTrackingRef(root, branch);

    await expect(gitBranchUpstream(root, branch)).resolves.toBe(`origin/${branch}`);
  });

  it("force refreshes a stale constrained tracking ref after a task branch rewrite", async () => {
    const root = await mkRepo();
    const remotePath = await mkdtemp(path.join(os.tmpdir(), "agentplane-git-client-origin-"));
    await execFileAsync("git", ["init", "--bare", remotePath], { cwd: root });
    await execFileAsync("git", ["remote", "add", "origin", remotePath], { cwd: root });
    await execFileAsync(
      "git",
      ["config", "remote.origin.fetch", "+refs/heads/main:refs/remotes/origin/main"],
      { cwd: root },
    );
    const branch = "task/T-TRACK/rewritten-refspec";
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await execFileAsync("git", ["commit", "--allow-empty", "-m", "original task head"], {
      cwd: root,
    });
    await execFileAsync("git", ["push", "-u", "origin", `HEAD:refs/heads/${branch}`], {
      cwd: root,
    });
    await gitRefreshBranchTrackingRef(root, branch);
    const { stdout: originalHead } = await execFileAsync(
      "git",
      ["rev-parse", `refs/remotes/origin/${branch}`],
      { cwd: root },
    );

    await execFileAsync("git", ["reset", "--hard", "HEAD~1"], { cwd: root });
    await execFileAsync("git", ["commit", "--allow-empty", "-m", "rewritten task head"], {
      cwd: root,
    });
    const { stdout: rewrittenHead } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    await execFileAsync(
      "git",
      [
        "push",
        `--force-with-lease=refs/heads/${branch}:${originalHead.trim()}`,
        "origin",
        `HEAD:refs/heads/${branch}`,
      ],
      { cwd: root },
    );

    await gitRefreshBranchTrackingRef(root, branch);
    const { stdout: trackingHead } = await execFileAsync(
      "git",
      ["rev-parse", `refs/remotes/origin/${branch}`],
      { cwd: root },
    );

    expect(trackingHead.trim()).toBe(rewrittenHead.trim());
  });
});
