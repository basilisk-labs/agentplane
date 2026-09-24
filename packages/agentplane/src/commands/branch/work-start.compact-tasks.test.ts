import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, mkdir, realpath, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";
import { LocalBackend, loadTaskBackend, type TaskData } from "../../backends/task-backend.js";
import { canCompactTaskHistory, checkoutCompactTaskHistory } from "./work-start.compact-tasks.js";
import { materializeLocalBackendReadmesForWorktree } from "./work-start.materialize.js";

const roots: string[] = [];

function git(cwd: string, ...args: string[]): string {
  return execFileSync("git", args, { cwd, encoding: "utf8" }).trim();
}

afterEach(async () => {
  for (const root of roots.splice(0)) await rm(root, { recursive: true, force: true });
});

describe("compact task worktree checkout", () => {
  it("keeps a tracked current task README in the primary checkout", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "agentplane-compact-tracked-"));
    roots.push(root);
    const repo = path.join(root, "repo");
    const worktree = path.join(root, "worktree");
    const taskId = "202601300003-ABCD";
    await mkdir(repo, { recursive: true });
    git(repo, "init", "-b", "main");
    const backend = new LocalBackend({ dir: path.join(repo, ".agentplane", "tasks") });
    await backend.writeTask({
      id: taskId,
      title: "Tracked task",
      description: "Existing task",
      status: "DOING",
      priority: "med",
      owner: "tester",
      depends_on: [],
      tags: [],
      verify: [],
      doc: "## Summary\n\nTracked",
    });
    git(repo, "add", ".");
    git(
      repo,
      "-c",
      "user.name=Test",
      "-c",
      "user.email=test@example.com",
      "commit",
      "-qm",
      "fixture",
    );
    git(repo, "worktree", "add", "--no-checkout", "-b", `task/${taskId}/compact`, worktree, "HEAD");

    await checkoutCompactTaskHistory({ worktreePath: worktree, taskId });
    await materializeLocalBackendReadmesForWorktree({
      backend,
      repoRoot: repo,
      worktreePath: worktree,
      taskId,
      workflowDir: ".agentplane/tasks",
    });

    expect(existsSync(path.join(repo, ".agentplane", "tasks", taskId, "README.md"))).toBe(true);
    expect(existsSync(path.join(worktree, ".agentplane", "tasks", taskId, "README.md"))).toBe(true);
    expect(git(repo, "status", "--porcelain")).toBe("");
    expect(git(worktree, "status", "--porcelain")).toBe("");
  });

  it("checks out the current task and ordinary source without materializing old tasks", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "agentplane-compact-tasks-"));
    roots.push(root);
    const repo = path.join(root, "repo");
    const worktree = path.join(root, "worktree");
    const fullWorktree = path.join(root, "full-worktree");
    const activeId = "202601300001-ABCD";
    const oldId = "202601300002-EFGH";
    await mkdir(path.join(repo, "src"), { recursive: true });
    const canonical = new LocalBackend({ dir: path.join(repo, ".agentplane", "tasks") });
    const task: TaskData = {
      id: activeId,
      title: "Active task",
      description: "Current work",
      status: "DOING",
      priority: "med",
      owner: "tester",
      depends_on: [],
      tags: [],
      verify: [],
      doc: "## Summary\n\nActive",
    };
    await canonical.writeTask({ ...task, id: oldId, title: "Old task", status: "DONE" });
    await writeFile(
      path.join(repo, ".agentplane", "tasks", oldId, "artifact.bin"),
      Buffer.alloc(1024 * 1024),
    );
    await writeFile(path.join(repo, "src", "app.ts"), "export const value = 1;\n");
    git(repo, "init", "-b", "main");
    git(repo, "add", ".");
    git(
      repo,
      "-c",
      "user.name=Test",
      "-c",
      "user.email=test@example.com",
      "commit",
      "-qm",
      "fixture",
    );
    await canonical.writeTask(task);
    const compactOptions = {
      backend: canonical,
      repoRoot: repo,
      workflowDir: ".agentplane/tasks",
    };
    await expect(canCompactTaskHistory(compactOptions)).resolves.toBe(true);
    git(repo, "config", "core.sparseCheckout", "true");
    await expect(canCompactTaskHistory(compactOptions)).rejects.toThrow(
      "Cannot use a sparse primary checkout",
    );
    git(repo, "config", "--unset", "core.sparseCheckout");
    git(repo, "worktree", "add", "-b", "comparison/full", fullWorktree, "HEAD");
    git(
      repo,
      "worktree",
      "add",
      "--no-checkout",
      "-b",
      `task/${activeId}/compact`,
      worktree,
      "HEAD",
    );

    await checkoutCompactTaskHistory({ worktreePath: worktree, taskId: activeId });
    expect(git(worktree, "status", "--porcelain")).toBe("");
    await materializeLocalBackendReadmesForWorktree({
      backend: canonical,
      repoRoot: repo,
      worktreePath: worktree,
      taskId: activeId,
      workflowDir: ".agentplane/tasks",
    });

    expect(existsSync(path.join(worktree, ".agentplane", "tasks", activeId, "README.md"))).toBe(
      true,
    );
    expect(existsSync(path.join(worktree, ".agentplane", "tasks", oldId))).toBe(false);
    expect(existsSync(path.join(worktree, "src", "app.ts"))).toBe(true);
    expect(git(worktree, "status", "--porcelain")).toContain(activeId);
    expect(git(worktree, "config", "--worktree", "--get", "agentplane.compactTaskHistory")).toBe(
      "true",
    );
    expect(existsSync(path.join(repo, ".agentplane", "tasks", oldId, "README.md"))).toBe(true);
    if (process.platform !== "win32") {
      const duKb = (target: string): number =>
        Number(execFileSync("du", ["-sk", target], { encoding: "utf8" }).split("\t")[0]);
      const fullKb = duKb(path.join(fullWorktree, ".agentplane", "tasks"));
      const compactKb = duKb(path.join(worktree, ".agentplane", "tasks"));
      expect(fullKb - compactKb).toBeGreaterThan(900);
    }

    const loaded = await loadTaskBackend({ cwd: worktree, config: defaultConfig() });
    expect(loaded.backend).toBeInstanceOf(LocalBackend);
    expect((loaded.backend as LocalBackend).historyRoot).toBe(
      path.join(await realpath(repo), ".agentplane", "tasks"),
    );
    const oldTask = await loaded.backend.getTask(oldId);
    const tasks = await loaded.backend.listTasks();
    expect(oldTask?.title).toBe("Old task");
    expect(tasks.map((entry) => entry.id)).toEqual([activeId, oldId]);

    await rm(path.join(repo, ".agentplane", "tasks"), { recursive: true });
    await expect(loadTaskBackend({ cwd: worktree, config: defaultConfig() })).rejects.toThrow(
      "Canonical task store is unavailable or unsafe",
    );
  });
});
