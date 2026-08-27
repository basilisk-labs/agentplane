import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { describe, expect, it } from "vitest";

import {
  cleanGitEnv,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  mkGitRepoRootWithCommit,
  splitOutputLines,
} from "./cli.js";

const execFileAsync = promisify(execFile);

describe("@agentplane/testkit/cli", () => {
  it("exports CLI harness helpers", () => {
    expect(cleanGitEnv).toBeTypeOf("function");
    expect(splitOutputLines("a\nb\n")).toEqual(["a", "b"]);
  });

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
