import { execFile } from "node:child_process";
import { realpath, symlink } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { describe, expect, it, vi } from "vitest";

import {
  cleanGitEnv,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  mkGitRepoRootWithCommit,
  mkTempDir,
  splitOutputLines,
} from "./cli.js";

const execFileAsync = promisify(execFile);

describe("@agentplane/testkit/cli", () => {
  it("exports CLI harness helpers", () => {
    expect(cleanGitEnv).toBeTypeOf("function");
    expect(splitOutputLines("a\nb\n")).toEqual(["a", "b"]);
  });

  it.each([mkGitRepoRoot, mkTempDir])(
    "returns a canonical fixture path through an aliased temporary directory (%#)",
    async (createRoot) => {
      const parent = await mkTempDir();
      const alias = path.join(parent, "alias");
      await symlink(os.tmpdir(), alias, process.platform === "win32" ? "junction" : "dir");
      for (const name of ["TMPDIR", "TMP", "TEMP"]) vi.stubEnv(name, alias);
      try {
        const root = await createRoot();
        expect(root).toBe(await realpath(root));
      } finally {
        vi.unstubAllEnvs();
      }
    },
  );

  it("creates deterministic main-branch repositories without host Git configuration", async () => {
    const root = await mkGitRepoRoot();
    const { stdout } = await execFileAsync("git", ["symbolic-ref", "--short", "HEAD"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    expect(stdout.trim()).toBe("main");
    await expect(
      execFileAsync("git", ["rev-parse", "--verify", "HEAD"], { cwd: root, env: cleanGitEnv() }),
    ).rejects.toMatchObject({ code: 128 });
  });

  it("keeps an explicitly named branch fixture unborn", async () => {
    const root = await mkGitRepoRootWithBranch("fixture-branch");
    const { stdout } = await execFileAsync("git", ["symbolic-ref", "--short", "HEAD"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    expect(stdout.trim()).toBe("fixture-branch");
    await expect(
      execFileAsync("git", ["rev-parse", "--verify", "HEAD"], { cwd: root, env: cleanGitEnv() }),
    ).rejects.toMatchObject({ code: 128 });
  });

  it("creates an opt-in committed fixture with a real clean main base", async () => {
    const root = await mkGitRepoRootWithCommit();
    const { stdout: head } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const { stdout: base } = await execFileAsync("git", ["rev-parse", "refs/heads/main"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    expect(head.trim()).toMatch(/^[0-9a-f]{40}$/u);
    expect(head.trim()).not.toBe("0".repeat(40));
    expect(base.trim()).toBe(head.trim());
    const { stdout: status } = await execFileAsync("git", ["status", "--porcelain"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    expect(status).toBe("");
  });
});
