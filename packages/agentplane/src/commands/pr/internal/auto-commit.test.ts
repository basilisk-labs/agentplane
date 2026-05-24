import { execFile } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { afterEach, describe, expect, it, vi } from "vitest";

import { maybeAutoCommitTaskPrArtifacts } from "./auto-commit.js";

const execFileAsync = promisify(execFile);

async function mkRepo(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-pr-auto-commit-"));
  await execFileAsync("git", ["init", "-q"], { cwd: root });
  await execFileAsync("git", ["config", "user.name", "Test User"], { cwd: root });
  await execFileAsync("git", ["config", "user.email", "test@example.com"], { cwd: root });
  await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
  await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });
  await execFileAsync("git", ["checkout", "-b", "task/202601010101-ABCDEF/pr"], { cwd: root });
  return root;
}

function makeCtx(root: string, git: Record<string, unknown>) {
  return {
    config: {
      workflow_mode: "branch_pr",
      paths: { workflow_dir: ".agentplane/tasks" },
      commit: { dco: { enabled: false } },
    },
    resolvedProject: { gitRoot: root },
    git,
  } as never;
}

describe("maybeAutoCommitTaskPrArtifacts", () => {
  const roots: string[] = [];

  afterEach(async () => {
    for (const root of roots.splice(0)) {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("creates a new artifact commit when HEAD is task-only for the same task", async () => {
    const root = await mkRepo();
    roots.push(root);
    const taskId = "202601010101-ABCDEF";
    const taskDir = path.join(root, ".agentplane", "tasks", taskId);
    await mkdir(taskDir, { recursive: true });
    await writeFile(path.join(taskDir, "README.md"), "verification\n", "utf8");
    await execFileAsync("git", ["add", `.agentplane/tasks/${taskId}/README.md`], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "🧾 ABCDEF task: record verification"], {
      cwd: root,
    });
    const git = {
      statusChangedPaths: vi.fn().mockResolvedValue([`.agentplane/tasks/${taskId}/pr/meta.json`]),
      stage: vi.fn().mockResolvedValue(),
      commit: vi.fn().mockResolvedValue(),
      commitAmendNoEdit: vi.fn().mockResolvedValue(),
      invalidateStatus: vi.fn(),
    };

    await expect(
      maybeAutoCommitTaskPrArtifacts({
        ctx: makeCtx(root, git),
        taskId,
        branch: "task/202601010101-ABCDEF/pr",
      }),
    ).resolves.toBe(true);

    expect(git.commit).toHaveBeenCalledTimes(1);
    expect(git.commitAmendNoEdit).not.toHaveBeenCalled();
  });

  it("amends when HEAD is same-task implementation code", async () => {
    const root = await mkRepo();
    roots.push(root);
    const taskId = "202601010101-ABCDEF";
    await writeFile(path.join(root, "code.ts"), "export const value = 1;\n", "utf8");
    await execFileAsync("git", ["add", "code.ts"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "✨ ABCDEF code: implement change"], { cwd: root });
    const git = {
      statusChangedPaths: vi.fn().mockResolvedValue([`.agentplane/tasks/${taskId}/pr/meta.json`]),
      stage: vi.fn().mockResolvedValue(),
      commit: vi.fn().mockResolvedValue(),
      commitAmendNoEdit: vi.fn().mockResolvedValue(),
      invalidateStatus: vi.fn(),
    };

    await expect(
      maybeAutoCommitTaskPrArtifacts({
        ctx: makeCtx(root, git),
        taskId,
        branch: "task/202601010101-ABCDEF/pr",
      }),
    ).resolves.toBe(true);

    expect(git.commit).not.toHaveBeenCalled();
    expect(git.commitAmendNoEdit).toHaveBeenCalledTimes(1);
  });
});
