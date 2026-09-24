import { execFile } from "node:child_process";
import { mkdir, realpath, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";
import {
  captureStdIO,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  pathExists,
  writeDefaultConfig,
} from "@agentplane/testkit";

import { runCli } from "../../cli/run-cli.js";
import { inspectWorkspaceDisk } from "./inspect.js";

installRunCliIntegrationHarness();
const execFileAsync = promisify(execFile);
const doneId = "202609231200-AAAAAA";
const activeId = "202609231201-BBBBBB";

async function git(cwd: string, ...args: string[]): Promise<void> {
  await execFileAsync("git", args, { cwd, env: cleanGitEnv() });
}

describe("cleanup disk inventory", () => {
  it("reports sizes and retains dirty, active, and separate repositories", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    await writeFile(path.join(root, ".gitignore"), ".agentplane/\n", "utf8");
    await commitAll(root, "initial");

    const worktreesDir = path.join(root, ".agentplane", "worktrees");
    await mkdir(worktreesDir, { recursive: true });
    const donePath = path.join(worktreesDir, "done");
    const activePath = path.join(worktreesDir, "active");
    await git(root, "worktree", "add", "-b", `task/${doneId}/done`, donePath);
    await git(root, "worktree", "add", "-b", `task/${activeId}/active`, activePath);
    await writeFile(path.join(activePath, "uncommitted.txt"), "preserve\n", "utf8");

    const nested = path.join(root, ".agentplane", "release-base");
    await mkdir(nested, { recursive: true });
    await git(nested, "init", "-b", "main");
    await writeFile(path.join(nested, "unique-task.txt"), "preserve\n", "utf8");

    const inventory = await inspectWorkspaceDisk({
      gitRoot: root,
      worktreesDir: ".agentplane/worktrees",
      taskPrefix: "task",
      taskStatus: (id) => Promise.resolve(id === doneId ? "DONE" : "DOING"),
    });
    const entries = new Map(inventory.entries.map((entry) => [entry.path, entry]));
    expect(inventory.agentplane_allocated_bytes).toBeGreaterThan(0);
    expect(entries.get(await realpath(donePath))).toMatchObject({
      task_id: doneId,
      dirty: false,
      cleanup: "proof_required",
      reason: "requires_cleanup_merged_proof",
    });
    expect(entries.get(await realpath(activePath))).toMatchObject({
      task_id: activeId,
      dirty: true,
      cleanup: "retain",
      reason: "dirty_worktree",
    });
    expect(entries.get(await realpath(nested))).toMatchObject({
      kind: "nested_repository",
      cleanup: "retain",
      reason: "separate_repository_requires_manual_review",
    });
    expect(entries.get(await realpath(nested))?.allocated_bytes).toBeGreaterThan(0);
    expect(await pathExists(path.join(activePath, "uncommitted.txt"))).toBe(true);
    expect(await pathExists(path.join(nested, "unique-task.txt"))).toBe(true);

    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      expect(await runCli(["cleanup", "inspect", "--json", "--root", root])).toBe(0);
      const cliInventory = JSON.parse(io.stdout) as { entries: { path: string }[] };
      expect(cliInventory.entries.map((entry) => entry.path)).toContain(await realpath(nested));
    } finally {
      io.restore();
    }
  });
});
