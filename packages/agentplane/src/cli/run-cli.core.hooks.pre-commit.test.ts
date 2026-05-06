import { execFile } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";
import { defaultConfig } from "./core-imports.js";
import {
  captureStdIO,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  runCliSilent,
  writeConfig,
  writeDefaultConfig,
} from "@agentplane/testkit";

import { runCli } from "./run-cli.js";

function restoreEnv(name: string, previous: string | undefined): void {
  if (previous === undefined) delete process.env[name];
  else process.env[name] = previous;
}

describe("runCli hooks pre-commit guards", () => {
  it("hooks run pre-commit allows tasks.json with env override", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await writeDefaultConfig(root);
    await writeFile(`${root}/.agentplane/tasks.json`, "{}", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", ".agentplane/tasks.json"], { cwd: root });

    const prev = process.env.AGENTPLANE_ALLOW_TASKS;
    process.env.AGENTPLANE_ALLOW_TASKS = "1";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      restoreEnv("AGENTPLANE_ALLOW_TASKS", prev);
    }
  });

  it("hooks run pre-commit blocks mutating paths without active task context", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await mkdir(`${root}/src`, { recursive: true });
    await writeFile(`${root}/src/app.ts`, "export const value = 1;\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "src/app.ts"], { cwd: root });

    const prev = process.env.AGENTPLANE_TASK_ID;
    delete process.env.AGENTPLANE_TASK_ID;

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Mutating staged paths require an active AgentPlane task");
    } finally {
      io.restore();
      restoreEnv("AGENTPLANE_TASK_ID", prev);
    }
  });

  it("hooks run pre-commit allows mutating paths on a task branch", async () => {
    const taskId = "202601010101-ABCDEF";
    const root = await mkGitRepoRootWithBranch(`task/${taskId}/hook-scope`);
    await writeDefaultConfig(root);
    await mkdir(`${root}/src`, { recursive: true });
    await writeFile(`${root}/src/app.ts`, "export const value = 1;\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "src/app.ts"], { cwd: root });

    const prev = process.env.AGENTPLANE_TASK_ID;
    delete process.env.AGENTPLANE_TASK_ID;

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      restoreEnv("AGENTPLANE_TASK_ID", prev);
    }
  });

  it("hooks run pre-commit allows explicit task env in detached HEAD", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await writeDefaultConfig(root);
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["config", "user.name", "Test User"], { cwd: root });
    await execFileAsync("git", ["config", "user.email", "test@example.com"], { cwd: root });
    await writeFile(`${root}/README.md`, "base\n", "utf8");
    await execFileAsync("git", ["add", "README.md"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "base"], { cwd: root });
    await execFileAsync("git", ["switch", "--detach", "HEAD"], { cwd: root });
    await mkdir(`${root}/src`, { recursive: true });
    await writeFile(`${root}/src/app.ts`, "export const value = 1;\n", "utf8");
    await execFileAsync("git", ["add", "src/app.ts"], { cwd: root });

    const prev = process.env.AGENTPLANE_TASK_ID;
    process.env.AGENTPLANE_TASK_ID = "202601010101-ABCDEF";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      restoreEnv("AGENTPLANE_TASK_ID", prev);
    }
  });

  it("hooks run pre-commit blocks AGENTS.md without env override", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeFile(`${root}/AGENTS.md`, "# policy\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "AGENTS.md"], { cwd: root });

    const prev = process.env.AGENTPLANE_ALLOW_POLICY;
    process.env.AGENTPLANE_ALLOW_POLICY = "0";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("AGENTS.md is protected by agentplane hooks");
      expect(io.stderr).toContain("AGENTPLANE_ALLOW_POLICY=1");
    } finally {
      io.restore();
      restoreEnv("AGENTPLANE_ALLOW_POLICY", prev);
    }
  });

  it("hooks run pre-commit allows AGENTS.md with env override", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeFile(`${root}/AGENTS.md`, "# policy\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "AGENTS.md"], { cwd: root });

    const prev = process.env.AGENTPLANE_ALLOW_POLICY;
    process.env.AGENTPLANE_ALLOW_POLICY = "1";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      restoreEnv("AGENTPLANE_ALLOW_POLICY", prev);
    }
  });

  it("hooks run pre-commit allows base branch with allowBase", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await mkdir(`${root}/src`, { recursive: true });
    await writeFile(`${root}/src/app.ts`, "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "src/app.ts"], { cwd: root });

    const prev = process.env.AGENTPLANE_ALLOW_BASE;
    const prevTaskId = process.env.AGENTPLANE_TASK_ID;
    process.env.AGENTPLANE_ALLOW_BASE = "1";
    process.env.AGENTPLANE_TASK_ID = "202601010101-ABCDEF";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      restoreEnv("AGENTPLANE_ALLOW_BASE", prev);
      restoreEnv("AGENTPLANE_TASK_ID", prevTaskId);
    }
  });

  it("hooks run pre-commit enforces branch_pr base restrictions", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await mkdir(`${root}/src`, { recursive: true });
    await writeFile(`${root}/src/app.ts`, "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "src/app.ts"], { cwd: root });

    const prev = process.env.AGENTPLANE_ALLOW_BASE;
    delete process.env.AGENTPLANE_ALLOW_BASE;

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("forbidden on main");
    } finally {
      io.restore();
      restoreEnv("AGENTPLANE_ALLOW_BASE", prev);
    }
  });

  it("hooks run pre-commit blocks tasks.json off base in branch_pr", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["checkout", "-b", "feature"], { cwd: root });
    await writeFile(`${root}/.agentplane/tasks.json`, "{}", "utf8");
    await execFileAsync("git", ["add", ".agentplane/tasks.json"], { cwd: root });

    const prev = process.env.AGENTPLANE_ALLOW_TASKS;
    process.env.AGENTPLANE_ALLOW_TASKS = "1";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("allowed only on main");
    } finally {
      io.restore();
      restoreEnv("AGENTPLANE_ALLOW_TASKS", prev);
    }
  });
});
