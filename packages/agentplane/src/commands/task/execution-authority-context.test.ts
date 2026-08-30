import { execFile } from "node:child_process";
import { mkdtemp, mkdir, rename, rm, writeFile, stat } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import { createTaskExecutionBaseIdentity } from "@agentplaneorg/core/tasks";

import { resolveLogicalRepositoryIdentity } from "./execution-authority-context.js";

const execFileAsync = promisify(execFile);

describe("logical repository authority identity", () => {
  it("does not create an unborn identity during read-only inspection", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-read-only-id-"));
    try {
      await execFileAsync("git", ["init", "-b", "main"], { cwd: root });
      await expect(
        resolveLogicalRepositoryIdentity({
          git_root: root,
          task: {},
          create_if_missing: false,
        }),
      ).rejects.toThrow("unavailable for read-only inspection");
      await expect(
        stat(path.join(root, ".git", "agentplane", "repository-identity.json")),
      ).rejects.toMatchObject({ code: "ENOENT" });
      const identity = await resolveLogicalRepositoryIdentity({ git_root: root, task: {} });
      expect(
        await resolveLogicalRepositoryIdentity({
          git_root: root,
          task: {},
          create_if_missing: false,
        }),
      ).toBe(identity);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
  it("survives long-lived branch changes and repository relocation", async () => {
    const parent = await mkdtemp(path.join(os.tmpdir(), "agentplane-repository-id-"));
    const original = path.join(parent, "before");
    const moved = path.join(parent, "after");
    try {
      await mkdir(original, { recursive: true });
      await execFileAsync("git", ["init", "-b", "main"], { cwd: original });
      await execFileAsync("git", ["config", "user.name", "AgentPlane Test"], { cwd: original });
      await execFileAsync("git", ["config", "user.email", "test@agentplane.local"], {
        cwd: original,
      });
      await writeFile(path.join(original, "README.md"), "main\n", "utf8");
      await execFileAsync("git", ["add", "README.md"], { cwd: original });
      await execFileAsync("git", ["commit", "-m", "main root"], { cwd: original });
      const first = await resolveLogicalRepositoryIdentity({ git_root: original, task: {} });

      await execFileAsync("git", ["switch", "-c", "typescript"], { cwd: original });
      await writeFile(path.join(original, "typescript.txt"), "migration\n", "utf8");
      await execFileAsync("git", ["add", "typescript.txt"], { cwd: original });
      await execFileAsync("git", ["commit", "-m", "typescript history"], { cwd: original });
      const onDevelopmentBranch = await resolveLogicalRepositoryIdentity({
        git_root: original,
        task: {},
      });

      await rename(original, moved);
      const afterRelocation = await resolveLogicalRepositoryIdentity({
        git_root: moved,
        task: {},
      });

      expect(onDevelopmentBranch).toBe(first);
      expect(afterRelocation).toBe(first);
    } finally {
      await rm(parent, { recursive: true, force: true });
    }
  });

  it("rejects a persisted task identity whose base is outside the current repository", async () => {
    const parent = await mkdtemp(path.join(os.tmpdir(), "agentplane-repository-cross-use-"));
    const first = path.join(parent, "first");
    const second = path.join(parent, "second");
    try {
      for (const [root, body] of [
        [first, "first\n"],
        [second, "second\n"],
      ] as const) {
        await mkdir(root, { recursive: true });
        await execFileAsync("git", ["init", "-b", "main"], { cwd: root });
        await execFileAsync("git", ["config", "user.name", "AgentPlane Test"], { cwd: root });
        await execFileAsync("git", ["config", "user.email", "test@agentplane.local"], {
          cwd: root,
        });
        await writeFile(path.join(root, "README.md"), body, "utf8");
        await execFileAsync("git", ["add", "README.md"], { cwd: root });
        await execFileAsync("git", ["commit", "-m", "root"], { cwd: root });
      }
      const identity = await resolveLogicalRepositoryIdentity({ git_root: first, task: {} });
      const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: first });
      const copiedTask = {
        extensions: {
          task_execution_context: createTaskExecutionBaseIdentity({
            base_ref: "main",
            base_sha: stdout.trim(),
            repository_identity: identity,
            source: "explicit",
          }),
        },
      };

      await expect(
        resolveLogicalRepositoryIdentity({ git_root: second, task: copiedTask }),
      ).rejects.toThrow(/does not belong|does not match/u);
    } finally {
      await rm(parent, { recursive: true, force: true });
    }
  });
});
