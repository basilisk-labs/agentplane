import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { describe, expect, it } from "vitest";

import {
  cleanGitEnv,
  ensureDir,
  expectCliError,
  gitHead,
  gitInit,
  makeTempDir,
  runCli,
} from "./critical/harness.js";

const execFileAsync = promisify(execFile);

describe("critical: git e2e edges", () => {
  it("detached HEAD produces a deterministic E_GIT error for branch commands", async () => {
    const root = await makeTempDir("agentplane-critical-detached-");
    await ensureDir(root);
    await gitInit(root);

    // Minimal commit so we can detach.
    await execFileAsync("git", ["commit", "--allow-empty", "-m", "init"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const sha = await gitHead(root);
    await execFileAsync("git", ["checkout", "-q", sha], { cwd: root, env: cleanGitEnv() });

    // branch status calls into git branch resolution; detached HEAD should not proceed silently.
    const res = await runCli(["branch", "status"], { cwd: root });
    expectCliError(res, 5, "E_GIT");
  }, 60_000);

  it("base branch explain is deterministic without a remote origin", async () => {
    const root = await makeTempDir("agentplane-critical-no-origin-");
    await ensureDir(root);

    // init creates a repo and pins base branch; no remotes are configured.
    const init = await runCli(["init", "--yes"], { cwd: root });
    expect(init.code).toBe(0);

    const explain = await runCli(["branch", "base", "explain"], { cwd: root });
    // If this ever changes, we at least want a stable error code and stderr signature.
    expect(explain.code).toBe(0);
    expect(explain.stdout).toContain("effective_base=");
  }, 60_000);
});
