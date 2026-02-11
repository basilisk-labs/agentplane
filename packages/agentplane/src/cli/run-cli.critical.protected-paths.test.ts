import { execFile } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";

import { describe, expect, it } from "vitest";

import {
  cleanGitEnv,
  ensureDir,
  expectCliError,
  gitCommitAll,
  gitInit,
  makeTempDir,
  runCli,
  writeText,
} from "./critical/harness.js";

const execFileAsync = promisify(execFile);

describe("critical: protected paths (staged)", () => {
  it("blocks staged rename of AGENTS.md", async () => {
    const root = await makeTempDir("agentplane-critical-protected-");
    await ensureDir(root);
    await gitInit(root);

    await writeText(path.join(root, "AGENTS.md"), "# AGENTS\n\nLocal\n");
    await gitCommitAll(root, "chore: add agents");

    await execFileAsync("git", ["mv", "AGENTS.md", "AGENTS-renamed.md"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["add", "-A"], { cwd: root, env: cleanGitEnv() });

    const res = await runCli(["hooks", "run", "pre-commit"], { cwd: root });
    expectCliError(res, 5, "E_GIT");
    expect(res.stderr).toMatch(/protected/i);
  }, 60_000);

  it("blocks delete + re-add of AGENTS.md", async () => {
    const root = await makeTempDir("agentplane-critical-protected-");
    await ensureDir(root);
    await gitInit(root);

    await writeText(path.join(root, "AGENTS.md"), "# AGENTS\n\nv1\n");
    await gitCommitAll(root, "chore: add agents");

    await execFileAsync("git", ["rm", "-f", "AGENTS.md"], { cwd: root, env: cleanGitEnv() });
    await writeText(path.join(root, "AGENTS.md"), "# AGENTS\n\nv2\n");
    await execFileAsync("git", ["add", "-A"], { cwd: root, env: cleanGitEnv() });

    const res = await runCli(["hooks", "run", "pre-commit"], { cwd: root });
    expectCliError(res, 5, "E_GIT");
    expect(res.stderr).toMatch(/AGENTS\.md/i);
  }, 60_000);

  it("blocks staging .agentplane/tasks.json without explicit allow env", async () => {
    const root = await makeTempDir("agentplane-critical-protected-");
    await ensureDir(root);
    const init = await runCli(["init", "--yes"], { cwd: root });
    expect(init.code).toBe(0);

    await writeText(path.join(root, ".agentplane", "tasks.json"), "{}\n");
    await execFileAsync("git", ["add", "-f", ".agentplane/tasks.json"], {
      cwd: root,
      env: cleanGitEnv(),
    });

    const res = await runCli(["hooks", "run", "pre-commit"], { cwd: root });
    expectCliError(res, 5, "E_GIT");
    expect(res.stderr).toMatch(/tasks\.json/i);
  }, 60_000);
});
