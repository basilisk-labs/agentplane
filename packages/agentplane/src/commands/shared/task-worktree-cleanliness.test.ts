import { execFile } from "node:child_process";
import { mkdtemp, realpath, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

import { CliError } from "../../shared/errors.js";
import {
  assertTaskWorktreeClean,
  inspectTaskWorktreeCleanliness,
} from "./task-worktree-cleanliness.js";

const execFileAsync = promisify(execFile);

describe("task worktree cleanliness", () => {
  const roots: string[] = [];

  afterEach(async () => {
    await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
  });

  async function makeRepo(): Promise<string> {
    const root = await mkdtemp(path.join(tmpdir(), "agentplane-task-worktree-clean-"));
    roots.push(root);
    await execFileAsync("git", ["init", "-b", "task/T-1/work"], { cwd: root });
    await execFileAsync("git", ["config", "user.name", "AgentPlane Test"], { cwd: root });
    await execFileAsync("git", ["config", "user.email", "agentplane@example.invalid"], {
      cwd: root,
    });
    await writeFile(path.join(root, "tracked.txt"), "base\n", "utf8");
    await execFileAsync("git", ["add", "tracked.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "base"], { cwd: root });
    return root;
  }

  it("reports a clean registered task worktree", async () => {
    const root = await makeRepo();
    const canonicalRoot = await realpath(root);

    await expect(
      inspectTaskWorktreeCleanliness({ gitRoot: root, branch: "task/T-1/work" }),
    ).resolves.toMatchObject({
      state: "clean",
      branch: "task/T-1/work",
      worktreePath: canonicalRoot,
      changedPaths: [],
    });
  });

  it.each(["staged", "unstaged", "untracked"] as const)(
    "reports %s changes from the actual task worktree",
    async (kind) => {
      const root = await makeRepo();
      const canonicalRoot = await realpath(root);
      const changedPath = kind === "untracked" ? "untracked.txt" : "tracked.txt";
      await writeFile(path.join(root, changedPath), `${kind}\n`, "utf8");
      if (kind === "staged") {
        await execFileAsync("git", ["add", changedPath], { cwd: root });
      }

      const probe = await inspectTaskWorktreeCleanliness({
        gitRoot: root,
        branch: "task/T-1/work",
      });

      expect(probe).toMatchObject({
        state: "dirty",
        branch: "task/T-1/work",
        worktreePath: canonicalRoot,
        changedPaths: [changedPath],
      });
      try {
        assertTaskWorktreeClean({ taskId: "T-1", probe });
        throw new Error("expected task worktree cleanliness assertion to fail");
      } catch (error) {
        expect(error).toBeInstanceOf(CliError);
        if (!(error instanceof CliError)) throw error;
        expect(error.code).toBe("E_VALIDATION");
        expect(error.context).toMatchObject({ reason_code: "task_worktree_dirty" });
      }
    },
  );

  it("allows a committed branch that has no registered worktree", async () => {
    const root = await makeRepo();

    await expect(
      inspectTaskWorktreeCleanliness({ gitRoot: root, branch: "task/T-2/missing" }),
    ).resolves.toMatchObject({
      state: "not_present",
      worktreePath: null,
      changedPaths: [],
    });
  });
});
