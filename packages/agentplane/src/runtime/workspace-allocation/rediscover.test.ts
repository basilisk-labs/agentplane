import { execFile } from "node:child_process";
import { mkdir, mkdtemp, realpath, rename, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import { findRelocatableWorktreeForBranch } from "./rediscover.js";

const execFileAsync = promisify(execFile);

describe("relocatable task worktrees", () => {
  it("repairs a linked worktree after the repository directory is renamed", async () => {
    const parent = await mkdtemp(path.join(os.tmpdir(), "agentplane-relocation-"));
    const original = path.join(parent, "project-before");
    const moved = path.join(parent, "project-after");
    const branch = "task/TASK-1/relocation";
    try {
      await mkdir(original, { recursive: true });
      await execFileAsync("git", ["init", "-b", "main"], { cwd: original });
      await execFileAsync("git", ["config", "user.name", "AgentPlane Test"], { cwd: original });
      await execFileAsync("git", ["config", "user.email", "test@agentplane.local"], {
        cwd: original,
      });
      await writeFile(path.join(original, "README.md"), "test\n", "utf8");
      await execFileAsync("git", ["add", "README.md"], { cwd: original });
      await execFileAsync("git", ["commit", "-m", "initial"], { cwd: original });
      const worktree = path.join(original, ".agentplane", "worktrees", "TASK-1");
      await mkdir(path.dirname(worktree), { recursive: true });
      await execFileAsync("git", ["worktree", "add", "-b", branch, worktree], {
        cwd: original,
      });

      await rename(original, moved);
      const expected = path.join(moved, ".agentplane", "worktrees", "TASK-1");
      const recovered = await findRelocatableWorktreeForBranch(moved, branch);

      expect(recovered).not.toBeNull();
      expect(await realpath(recovered!)).toBe(await realpath(expected));
      const { stdout } = await execFileAsync("git", ["rev-parse", "--abbrev-ref", "HEAD"], {
        cwd: expected,
      });
      expect(stdout.trim()).toBe(branch);
    } finally {
      await rm(parent, { recursive: true, force: true });
    }
  });
});
