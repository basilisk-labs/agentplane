import { execFile } from "node:child_process";
import { mkdtemp, mkdir, rename, rm, writeFile, stat, readFile, readdir } from "node:fs/promises";
import type * as FsPromises from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it, vi } from "vitest";

import { createTaskExecutionBaseIdentity } from "@agentplaneorg/core/tasks";

import { resolveLogicalRepositoryIdentity } from "./execution-authority-context.js";

const execFileAsync = promisify(execFile);

vi.mock("node:fs/promises", async (importOriginal) => {
  const actual = await importOriginal<typeof FsPromises>();
  return { ...actual, writeFile: vi.fn(actual.writeFile) };
});

describe("logical repository authority identity", () => {
  it("publishes one complete identity while another initializer is still writing", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-concurrent-id-"));
    let markWriting!: () => void;
    let releaseWriter!: () => void;
    const writing = new Promise<void>((resolve) => {
      markWriting = resolve;
    });
    const release = new Promise<void>((resolve) => {
      releaseWriter = resolve;
    });
    let first: Promise<string> | undefined;
    try {
      await execFileAsync("git", ["init", "-b", "main"], { cwd: root });
      const actual = await vi.importActual<typeof FsPromises>("node:fs/promises");
      vi.mocked(writeFile).mockImplementationOnce(async (file, data, options) => {
        const handle = await actual.open(file, "wx", 0o600);
        try {
          markWriting();
          await release;
          await handle.writeFile(data, options);
        } finally {
          await handle.close();
        }
      });
      first = resolveLogicalRepositoryIdentity({ git_root: root, task: {} });
      await writing;
      const winner = await resolveLogicalRepositoryIdentity({ git_root: root, task: {} });
      releaseWriter();
      expect(await first).toBe(winner);
      const directory = path.join(root, ".git", "agentplane");
      expect(
        JSON.parse(await readFile(path.join(directory, "repository-identity.json"), "utf8")),
      ).toEqual({ schema_version: 1, repository_identity: winner });
      expect(await readdir(directory)).toEqual(["repository-identity.json"]);
    } finally {
      releaseWriter();
      await first?.catch(() => null);
      await rm(root, { recursive: true, force: true });
    }
  });

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
