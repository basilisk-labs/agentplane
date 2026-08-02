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

async function writeDocsTask(root: string, taskId: string): Promise<void> {
  await mkdir(`${root}/.agentplane/tasks/${taskId}`, { recursive: true });
  await writeFile(
    `${root}/.agentplane/tasks/${taskId}/README.md`,
    [
      "---",
      `id: "${taskId}"`,
      'title: "Documentation task"',
      'status: "DOING"',
      'priority: "med"',
      'owner: "CODER"',
      "depends_on: []",
      'tags: ["docs"]',
      'task_kind: "docs"',
      'mutation_scope: "docs"',
      'blueprint_request: "docs.change"',
      "verify: []",
      "comments: []",
      "doc_version: 3",
      'doc_updated_at: "2026-01-01T00:00:00.000Z"',
      'doc_updated_by: "CODER"',
      'description: "Documentation task."',
      "---",
      "",
    ].join("\n"),
    "utf8",
  );
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

  it("hooks run pre-commit ignores untracked ignored tasks.json while allowing active task artifacts", async () => {
    const taskId = "202601010101-ABCDEF";
    const root = await mkGitRepoRootWithBranch(`task/${taskId}/hook-scope`);
    await writeDefaultConfig(root);
    await writeFile(`${root}/.gitignore`, ".agentplane/tasks.json\n", "utf8");
    await writeFile(`${root}/README.md`, "base\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", ".gitignore", "README.md"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "base"], { cwd: root });
    await mkdir(`${root}/.agentplane/tasks/${taskId}`, { recursive: true });
    await writeFile(`${root}/.agentplane/tasks.json`, "{}\n", "utf8");
    await writeFile(`${root}/.agentplane/tasks/${taskId}/README.md`, "# Task\n", "utf8");
    await execFileAsync("git", ["add", `.agentplane/tasks/${taskId}/README.md`], {
      cwd: root,
    });

    const prev = process.env.AGENTPLANE_ALLOW_TASKS;
    delete process.env.AGENTPLANE_ALLOW_TASKS;

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(0);
      expect(io.stderr).not.toContain(".agentplane/tasks.json is protected");
    } finally {
      io.restore();
      restoreEnv("AGENTPLANE_ALLOW_TASKS", prev);
    }
  });

  it("hooks run pre-commit still blocks force-staged ignored tasks.json", async () => {
    const taskId = "202601010101-ABCDEF";
    const root = await mkGitRepoRootWithBranch(`task/${taskId}/hook-scope`);
    await writeDefaultConfig(root);
    await writeFile(`${root}/.gitignore`, ".agentplane/tasks.json\n", "utf8");
    await writeFile(`${root}/README.md`, "base\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", ".gitignore", "README.md"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "base"], { cwd: root });
    await writeFile(`${root}/.agentplane/tasks.json`, "{}\n", "utf8");
    await execFileAsync("git", ["add", "-f", ".agentplane/tasks.json"], { cwd: root });

    const prev = process.env.AGENTPLANE_ALLOW_TASKS;
    delete process.env.AGENTPLANE_ALLOW_TASKS;

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain(".agentplane/tasks.json is protected by agentplane hooks");
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
    const prevAllowTasks = process.env.AGENTPLANE_ALLOW_TASKS;
    delete process.env.AGENTPLANE_TASK_ID;
    process.env.AGENTPLANE_ALLOW_TASKS = "1";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Mutating staged paths require an active AgentPlane task");
    } finally {
      io.restore();
      restoreEnv("AGENTPLANE_TASK_ID", prev);
      restoreEnv("AGENTPLANE_ALLOW_TASKS", prevAllowTasks);
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
    const prevAllowTasks = process.env.AGENTPLANE_ALLOW_TASKS;
    delete process.env.AGENTPLANE_TASK_ID;
    process.env.AGENTPLANE_ALLOW_TASKS = "1";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      restoreEnv("AGENTPLANE_TASK_ID", prev);
      restoreEnv("AGENTPLANE_ALLOW_TASKS", prevAllowTasks);
    }
  });

  it("hooks run pre-commit blocks generated active task artifacts that are not staged", async () => {
    const taskId = "202601010101-ABCDEF";
    const root = await mkGitRepoRootWithBranch(`task/${taskId}/hook-scope`);
    await writeDefaultConfig(root);
    await mkdir(`${root}/src`, { recursive: true });
    await mkdir(`${root}/.agentplane/tasks/${taskId}/quality/run`, { recursive: true });
    await writeFile(`${root}/src/app.ts`, "export const value = 1;\n", "utf8");
    await writeFile(
      `${root}/.agentplane/tasks/${taskId}/quality/run/quality-report.json`,
      "{}\n",
      "utf8",
    );
    await writeFile(
      `${root}/.agentplane/tasks/${taskId}/quality/run/evaluator-opinion.md`,
      "# Opinion\n",
      "utf8",
    );
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "src/app.ts"], { cwd: root });

    const prev = process.env.AGENTPLANE_TASK_ID;
    delete process.env.AGENTPLANE_TASK_ID;

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Generated task artifacts are not staged.");
      expect(io.stderr).toContain(`.agentplane/tasks/${taskId}/quality/run/quality-report.json`);
      expect(io.stderr).toContain(`.agentplane/tasks/${taskId}/quality/run/evaluator-opinion.md`);
      expect(io.stderr).toContain("agentplane commit <task-id>");
    } finally {
      io.restore();
      restoreEnv("AGENTPLANE_TASK_ID", prev);
    }
  });

  it("hooks run pre-commit blocks partially staged generated active task artifacts", async () => {
    const taskId = "202601010101-ABCDEF";
    const root = await mkGitRepoRootWithBranch(`task/${taskId}/hook-scope`);
    await writeDefaultConfig(root);
    await mkdir(`${root}/src`, { recursive: true });
    await mkdir(`${root}/.agentplane/tasks/${taskId}/quality/run`, { recursive: true });
    const reportPath = `.agentplane/tasks/${taskId}/quality/run/quality-report.json`;
    await writeFile(`${root}/src/app.ts`, "export const value = 1;\n", "utf8");
    await writeFile(`${root}/${reportPath}`, '{"status":"staged"}\n', "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "src/app.ts", reportPath], { cwd: root });
    await writeFile(`${root}/${reportPath}`, '{"status":"unstaged"}\n', "utf8");

    const prev = process.env.AGENTPLANE_TASK_ID;
    delete process.env.AGENTPLANE_TASK_ID;

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Generated task artifacts are not staged.");
      expect(io.stderr).toContain(reportPath);
    } finally {
      io.restore();
      restoreEnv("AGENTPLANE_TASK_ID", prev);
    }
  });

  it("hooks run pre-commit does not infer active task context from unstaged task artifacts", async () => {
    const taskId = "202601010101-ABCDEF";
    const root = await mkGitRepoRootWithBranch("main");
    await writeDefaultConfig(root);
    await mkdir(`${root}/src`, { recursive: true });
    await mkdir(`${root}/.agentplane/tasks/${taskId}/quality/run`, { recursive: true });
    await writeFile(`${root}/src/app.ts`, "export const value = 1;\n", "utf8");
    await writeFile(
      `${root}/.agentplane/tasks/${taskId}/quality/run/quality-report.json`,
      "{}\n",
      "utf8",
    );
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "src/app.ts"], { cwd: root });

    const prev = process.env.AGENTPLANE_TASK_ID;
    const prevAllowTasks = process.env.AGENTPLANE_ALLOW_TASKS;
    delete process.env.AGENTPLANE_TASK_ID;
    process.env.AGENTPLANE_ALLOW_TASKS = "1";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Mutating staged paths require an active AgentPlane task");
      expect(io.stderr).not.toContain("Generated task artifacts are not staged.");
    } finally {
      io.restore();
      restoreEnv("AGENTPLANE_TASK_ID", prev);
      restoreEnv("AGENTPLANE_ALLOW_TASKS", prevAllowTasks);
    }
  });

  it("hooks run pre-commit allows generated active task artifacts when they are staged", async () => {
    const taskId = "202601010101-ABCDEF";
    const root = await mkGitRepoRootWithBranch(`task/${taskId}/hook-scope`);
    await writeDefaultConfig(root);
    await mkdir(`${root}/src`, { recursive: true });
    await mkdir(`${root}/.agentplane/tasks/${taskId}/blueprint`, { recursive: true });
    await writeFile(`${root}/src/app.ts`, "export const value = 1;\n", "utf8");
    await writeFile(
      `${root}/.agentplane/tasks/${taskId}/blueprint/resolved-snapshot.json`,
      "{}\n",
      "utf8",
    );
    const execFileAsync = promisify(execFile);
    await execFileAsync(
      "git",
      ["add", "src/app.ts", `.agentplane/tasks/${taskId}/blueprint/resolved-snapshot.json`],
      { cwd: root },
    );

    const prev = process.env.AGENTPLANE_TASK_ID;
    const prevAllowTasks = process.env.AGENTPLANE_ALLOW_TASKS;
    delete process.env.AGENTPLANE_TASK_ID;
    process.env.AGENTPLANE_ALLOW_TASKS = "1";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      restoreEnv("AGENTPLANE_TASK_ID", prev);
      restoreEnv("AGENTPLANE_ALLOW_TASKS", prevAllowTasks);
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
      const stagedAfterRefusal = await execFileAsync("git", ["diff", "--cached", "--name-only"], {
        cwd: root,
      });
      expect(stagedAfterRefusal.stdout.trim()).toBe("AGENTS.md");

      process.env.AGENTPLANE_ALLOW_POLICY = "1";
      const retryCode = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(retryCode).toBe(0);
      const stagedAfterRetry = await execFileAsync("git", ["diff", "--cached", "--name-only"], {
        cwd: root,
      });
      expect(stagedAfterRetry.stdout.trim()).toBe("AGENTS.md");
    } finally {
      io.restore();
      restoreEnv("AGENTPLANE_ALLOW_POLICY", prev);
    }
  });

  it("hooks run pre-commit rejects traversal task env for protected policy paths", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await mkdir(`${root}/.agentplane/policy`, { recursive: true });
    await writeFile(`${root}/.agentplane/policy/foo.md`, "# policy\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", ".agentplane/policy/foo.md"], { cwd: root });

    const prevTaskId = process.env.AGENTPLANE_TASK_ID;
    const prevAllowPolicy = process.env.AGENTPLANE_ALLOW_POLICY;
    process.env.AGENTPLANE_TASK_ID = "../policy";
    process.env.AGENTPLANE_ALLOW_POLICY = "0";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain(".agentplane/policy/foo.md is protected by agentplane hooks");
      expect(io.stderr).toContain("AGENTPLANE_ALLOW_POLICY=1");
    } finally {
      io.restore();
      restoreEnv("AGENTPLANE_TASK_ID", prevTaskId);
      restoreEnv("AGENTPLANE_ALLOW_POLICY", prevAllowPolicy);
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

  it("attributes a configured-base merge to the task-side docs diff", async () => {
    const taskId = "202601010101-ABCDEF";
    const otherTaskId = "202601010102-OTHER1";
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await writeDocsTask(root, taskId);
    await writeFile(`${root}/README.md`, "base\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "chore: establish base"], { cwd: root });

    await execFileAsync("git", ["checkout", "-b", `task/${taskId}/docs-sync`], { cwd: root });
    await mkdir(`${root}/docs`, { recursive: true });
    await writeFile(`${root}/docs/guide.mdx`, "# Guide\n", "utf8");
    await execFileAsync("git", ["add", "docs/guide.mdx"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "docs: add guide"], { cwd: root });

    await execFileAsync("git", ["checkout", "main"], { cwd: root });
    await mkdir(`${root}/.agentplane/tasks/${otherTaskId}/quality/run`, { recursive: true });
    await mkdir(`${root}/src`, { recursive: true });
    await writeFile(
      `${root}/.agentplane/tasks/${otherTaskId}/quality/run/evaluator-result.json`,
      "{}\n",
      "utf8",
    );
    await writeFile(`${root}/src/base-fix.ts`, "export const baseFix = true;\n", "utf8");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "fix: advance base"], { cwd: root });

    await execFileAsync("git", ["checkout", `task/${taskId}/docs-sync`], { cwd: root });
    await execFileAsync("git", ["merge", "--no-ff", "--no-commit", "main"], { cwd: root });

    const messagePath = `${root}/COMMIT_EDITMSG`;
    await writeFile(
      messagePath,
      "🔀 ABCDEF task: sync configured base\n\nSigned-off-by: Test User <test@example.com>\n",
      "utf8",
    );
    const io = captureStdIO();
    try {
      await expect(runCli(["hooks", "run", "pre-commit", "--root", root])).resolves.toBe(0);
      await expect(
        runCli(["hooks", "run", "commit-msg", messagePath, "--root", root]),
      ).resolves.toBe(0);
    } finally {
      io.restore();
    }
  });

  it("still rejects a task-side implementation diff during a configured-base merge", async () => {
    const taskId = "202601010101-ABCDEF";
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await writeDocsTask(root, taskId);
    await writeFile(`${root}/README.md`, "base\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "chore: establish base"], { cwd: root });

    await execFileAsync("git", ["checkout", "-b", `task/${taskId}/docs-sync`], { cwd: root });
    await mkdir(`${root}/src`, { recursive: true });
    await writeFile(`${root}/src/task-change.ts`, "export const taskChange = true;\n", "utf8");
    await execFileAsync("git", ["add", "src/task-change.ts"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: seed invalid task change"], { cwd: root });

    await execFileAsync("git", ["checkout", "main"], { cwd: root });
    await writeFile(`${root}/README.md`, "advanced base\n", "utf8");
    await execFileAsync("git", ["add", "README.md"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "docs: advance base"], { cwd: root });
    await execFileAsync("git", ["checkout", `task/${taskId}/docs-sync`], { cwd: root });
    await execFileAsync("git", ["merge", "--no-ff", "--no-commit", "main"], { cwd: root });

    const io = captureStdIO();
    try {
      await expect(runCli(["hooks", "run", "pre-commit", "--root", root])).resolves.toBe(5);
      expect(io.stderr).toContain("src/task-change.ts");
      expect(io.stderr).not.toContain("README.md");
    } finally {
      io.restore();
    }
  });

  it("does not treat a reachable topic merge as a configured-base merge", async () => {
    const taskId = "202601010101-ABCDEF";
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await writeDocsTask(root, taskId);
    await writeFile(`${root}/README.md`, "base\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "chore: establish base"], { cwd: root });
    const revParseResult = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    const baseSha = revParseResult.stdout.trim();

    await execFileAsync("git", ["checkout", "-b", "topic/already-merged"], { cwd: root });
    await mkdir(`${root}/src`, { recursive: true });
    await writeFile(`${root}/src/topic-change.ts`, "export const topicChange = true;\n", "utf8");
    await execFileAsync("git", ["add", "src/topic-change.ts"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "feat: add topic change"], { cwd: root });

    await execFileAsync("git", ["checkout", "main"], { cwd: root });
    await execFileAsync("git", ["merge", "--no-ff", "topic/already-merged", "-m", "merge topic"], {
      cwd: root,
    });

    await execFileAsync("git", ["checkout", "-b", `task/${taskId}/docs-sync`, baseSha], {
      cwd: root,
    });
    await mkdir(`${root}/docs`, { recursive: true });
    await writeFile(`${root}/docs/guide.mdx`, "# Guide\n", "utf8");
    await execFileAsync("git", ["add", "docs/guide.mdx"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "docs: add guide"], { cwd: root });
    await execFileAsync("git", ["merge", "--no-ff", "--no-commit", "topic/already-merged"], {
      cwd: root,
    });

    const messagePath = `${root}/COMMIT_EDITMSG`;
    await writeFile(
      messagePath,
      "🔀 ABCDEF task: merge topic branch\n\nSigned-off-by: Test User <test@example.com>\n",
      "utf8",
    );
    const preCommitIo = captureStdIO();
    try {
      await expect(runCli(["hooks", "run", "pre-commit", "--root", root])).resolves.toBe(5);
      expect(preCommitIo.stderr).toContain("src/topic-change.ts");
    } finally {
      preCommitIo.restore();
    }

    const commitMsgIo = captureStdIO();
    try {
      await expect(
        runCli(["hooks", "run", "commit-msg", messagePath, "--root", root]),
      ).resolves.toBe(5);
      expect(commitMsgIo.stderr).toContain("src/topic-change.ts");
    } finally {
      commitMsgIo.restore();
    }
  });
});
