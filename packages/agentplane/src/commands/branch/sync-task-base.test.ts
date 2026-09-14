import { chmod, mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { execFileAsync } from "@agentplaneorg/core/process";
import { validateCommitSubject } from "@agentplaneorg/core/commit";
import { describe, expect, it } from "vitest";

import { synchronizeTaskBranchBase } from "./sync-task-base.js";

async function git(cwd: string, ...args: string[]): Promise<string> {
  const result = await execFileAsync("git", args, { cwd });
  return result.stdout.trim();
}

async function fixture(conflict = false) {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-sync-task-base-"));
  await git(root, "init", "-b", "main");
  await git(root, "config", "user.name", "Test User");
  await git(root, "config", "user.email", "test@example.com");
  await writeFile(path.join(root, ".gitignore"), ".agentplane/cache/\n", "utf8");
  await writeFile(path.join(root, "shared.txt"), "initial\n", "utf8");
  await git(root, "add", ".");
  await git(root, "commit", "-m", "test: initial");
  const initial = await git(root, "rev-parse", "HEAD");
  const taskId = "202609140657-5REY71";
  const branch = `task/${taskId}/sync-base`;
  await git(root, "checkout", "-b", branch);
  await writeFile(path.join(root, conflict ? "shared.txt" : "task.txt"), "task\n", "utf8");
  await git(root, "add", ".");
  await git(root, "commit", "-m", "feat: task candidate");
  const expectedHeadSha = await git(root, "rev-parse", "HEAD");
  await git(root, "checkout", "main");
  await writeFile(path.join(root, conflict ? "shared.txt" : "base.txt"), "base\n", "utf8");
  await git(root, "add", ".");
  await git(root, "commit", "-m", "feat: advance base");
  const expectedBaseSha = await git(root, "rev-parse", "HEAD");
  const worktreePath = path.join(root, "task-worktree");
  await git(root, "worktree", "add", worktreePath, branch);
  return { root, worktreePath, taskId, branch, initial, expectedHeadSha, expectedBaseSha };
}

describe("task branch base synchronization", () => {
  it("creates one merge commit with the exact previous head and plan-bound base", async () => {
    const f = await fixture();
    const taskDir = path.join(f.worktreePath, ".agentplane", "tasks", f.taskId);
    await mkdir(taskDir, { recursive: true });
    await writeFile(path.join(taskDir, "README.md"), "task artifact\n", "utf8");
    const hookPath = path.join(f.root, ".git", "hooks", "commit-msg");
    await writeFile(hookPath, ["#!/bin/sh", 'cp "$1" .commit-msg-invoked', ""].join("\n"), "utf8");
    await chmod(hookPath, 0o755);

    const result = await synchronizeTaskBranchBase({
      gitRoot: f.root,
      worktreePath: f.worktreePath,
      workflowDir: ".agentplane/tasks",
      tasksPath: ".agentplane/tasks.json",
      taskId: f.taskId,
      branch: f.branch,
      baseBranch: "main",
      expectedHeadSha: f.expectedHeadSha,
      expectedBaseSha: f.expectedBaseSha,
    });

    expect(result.state).toBe("updated");
    expect(await git(f.worktreePath, "rev-list", "--parents", "-n", "1", result.headSha)).toBe(
      `${result.headSha} ${f.expectedHeadSha} ${f.expectedBaseSha}`,
    );
    const subject = await git(f.worktreePath, "show", "-s", "--format=%s", result.headSha);
    expect(
      validateCommitSubject({
        subject,
        taskId: f.taskId,
        genericTokens: ["update", "tasks"],
        taskIntent: { taskKind: "code", mutationScope: "code" },
      }),
    ).toEqual({ ok: true, errors: [] });
    const dcoTrailer = /^Signed-off-by: [^<>\r\n]+ <[^<>\s]+@[^<>\s]+>$/mu;
    expect(await git(f.worktreePath, "show", "-s", "--format=%B", result.headSha)).toMatch(
      dcoTrailer,
    );
    const hookMessage = await readFile(path.join(f.worktreePath, ".commit-msg-invoked"), "utf8");
    expect(hookMessage.split(/\r?\n/u)[0]).toBe(subject);
    expect(hookMessage).toMatch(dcoTrailer);
    await expect(
      git(f.worktreePath, "merge-base", "--is-ancestor", f.expectedHeadSha, result.headSha),
    ).resolves.toBe("");
    await expect(
      git(f.worktreePath, "merge-base", "--is-ancestor", f.expectedBaseSha, result.headSha),
    ).resolves.toBe("");
  });

  it("refuses a semantic conflict without changing task HEAD", async () => {
    const f = await fixture(true);

    await expect(
      synchronizeTaskBranchBase({
        gitRoot: f.root,
        worktreePath: f.worktreePath,
        workflowDir: ".agentplane/tasks",
        tasksPath: ".agentplane/tasks.json",
        taskId: f.taskId,
        branch: f.branch,
        baseBranch: "main",
        expectedHeadSha: f.expectedHeadSha,
        expectedBaseSha: f.expectedBaseSha,
      }),
    ).rejects.toThrow("require semantic conflict resolution");
    expect(await git(f.worktreePath, "rev-parse", "HEAD")).toBe(f.expectedHeadSha);
    expect(await git(f.worktreePath, "status", "--porcelain")).toBe("");
  });

  it("refuses stale identity and unrelated dirty content before mutation", async () => {
    const f = await fixture();
    await writeFile(path.join(f.worktreePath, "dirty.txt"), "dirty\n", "utf8");

    await expect(
      synchronizeTaskBranchBase({
        gitRoot: f.root,
        worktreePath: f.worktreePath,
        workflowDir: ".agentplane/tasks",
        tasksPath: ".agentplane/tasks.json",
        taskId: f.taskId,
        branch: f.branch,
        baseBranch: "main",
        expectedHeadSha: f.expectedHeadSha,
        expectedBaseSha: f.initial,
      }),
    ).rejects.toThrow("base main changed");

    await expect(
      synchronizeTaskBranchBase({
        gitRoot: f.root,
        worktreePath: f.worktreePath,
        workflowDir: ".agentplane/tasks",
        tasksPath: ".agentplane/tasks.json",
        taskId: f.taskId,
        branch: f.branch,
        baseBranch: "main",
        expectedHeadSha: f.expectedHeadSha,
        expectedBaseSha: f.expectedBaseSha,
      }),
    ).rejects.toThrow("task worktree is dirty: dirty.txt");
    expect(await git(f.worktreePath, "rev-parse", "HEAD")).toBe(f.expectedHeadSha);
  });
});
