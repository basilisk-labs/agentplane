/* eslint-disable @typescript-eslint/no-unused-vars */
import { execFile, execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import {
  chmod,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  realpath,
  rm,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { describe, expect, it, vi } from "vitest";
import {
  HOOKS_SUITE_TIMEOUT_MS,
  TEST_WORKFLOW_GITIGNORE,
  markTaskDoneWithCommit,
  withInstalledAgentplaneRuntime,
} from "@agentplane/testkit/hooks";
import { defaultConfig, extractTaskSuffix, type ResolvedProject } from "./core-imports.js";
import { readTask, renderTaskReadme } from "@agentplaneorg/core/tasks";

import { runCli } from "./run-cli.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
} from "../agents/agents-template.js";
import type * as taskBackend from "../backends/task-backend.js";
import {
  captureStdIO,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  createUpgradeBundle,
  getAgentplaneHome,
  gitBranchExists,
  installRunCliIntegrationHarness,
  runCliSilent,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  pathExists,
  stageGitignoreIfPresent,
  stubTaskBackend,
  writeConfig,
  writeDefaultConfig,
} from "@agentplane/testkit";
import { resolveUpdateCheckCachePath } from "./update-check.js";
import { resolvePrePushHookScriptPath } from "../commands/hooks/index.js";
import * as prompts from "./prompts.js";

installRunCliIntegrationHarness();

const PRE_PUSH_HOOK_SCRIPT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../../scripts/run-pre-push-hook.mjs",
);

describe("runCli hooks run", { timeout: HOOKS_SUITE_TIMEOUT_MS }, () => {
  it("hooks run commit-msg requires a message file", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "commit-msg", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Missing commit message file");
    } finally {
      io.restore();
    }
  });

  it("hooks run commit-msg enforces task id env", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const messagePath = path.join(root, "COMMIT_EDITMSG");
    await writeFile(messagePath, "✨ ABCDEF guard: add checks\n", "utf8");
    const prev = process.env.AGENTPLANE_TASK_ID;
    process.env.AGENTPLANE_TASK_ID = "202601010101-ABCDEF";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "commit-msg", messagePath, "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_TASK_ID;
      else process.env.AGENTPLANE_TASK_ID = prev;
    }
  });

  it("hooks run commit-msg requires a valid DCO sign-off without forcing one identity", async () => {
    const root = await mkGitRepoRoot();
    await writeConfig(root, {
      ...defaultConfig(),
      commit: {
        ...defaultConfig().commit,
        dco: { enabled: true, name: "Denis Smirnov", email: "densmirnov@me.com" },
      },
    });
    const messagePath = path.join(root, "COMMIT_EDITMSG");
    const prev = process.env.AGENTPLANE_TASK_ID;
    process.env.AGENTPLANE_TASK_ID = "202601010101-ABCDEF";

    const io = captureStdIO();
    try {
      await writeFile(messagePath, "✨ ABCDEF guard: add checks\n", "utf8");
      expect(await runCli(["hooks", "run", "commit-msg", messagePath, "--root", root])).toBe(5);
      expect(io.stderr).toContain("DCO sign-off is required");

      await writeFile(
        messagePath,
        "✨ ABCDEF guard: add checks\n\nSigned-off-by: Ada Lovelace <ada@example.com>\n",
        "utf8",
      );
      expect(await runCli(["hooks", "run", "commit-msg", messagePath, "--root", root])).toBe(0);
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_TASK_ID;
      else process.env.AGENTPLANE_TASK_ID = prev;
    }
  });

  it("hooks run commit-msg rejects generic subjects even with task env", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const messagePath = path.join(root, "COMMIT_EDITMSG");
    await writeFile(messagePath, "✨ ABCDEF task: update\n", "utf8");
    const prev = process.env.AGENTPLANE_TASK_ID;
    process.env.AGENTPLANE_TASK_ID = "202601010101-ABCDEF";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "commit-msg", messagePath, "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("commit subject is too generic");
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_TASK_ID;
      else process.env.AGENTPLANE_TASK_ID = prev;
    }
  });

  it("hooks run commit-msg rejects scopes that contradict structured task intent", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202601010101-ABCDEF";
    await mkdir(path.join(root, ".agentplane", "tasks", taskId), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      [
        "---",
        `id: "${taskId}"`,
        'title: "Analysis task"',
        'status: "TODO"',
        'priority: "med"',
        'owner: "CODER"',
        "depends_on: []",
        'tags: ["content"]',
        'task_kind: "analysis"',
        'mutation_scope: "none"',
        'blueprint_request: "analysis.light"',
        "verify: []",
        "comments: []",
        "doc_version: 3",
        'doc_updated_at: "2026-01-01T00:00:00.000Z"',
        'doc_updated_by: "CODER"',
        'description: "Read-only analysis."',
        "---",
        "",
      ].join("\n"),
      "utf8",
    );
    const messagePath = path.join(root, "COMMIT_EDITMSG");
    await writeFile(messagePath, "✨ ABCDEF code: implement resolver\n", "utf8");
    const prev = process.env.AGENTPLANE_TASK_ID;
    process.env.AGENTPLANE_TASK_ID = taskId;

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "commit-msg", messagePath, "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("commit scope 'code' does not match task intent");
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_TASK_ID;
      else process.env.AGENTPLANE_TASK_ID = prev;
    }
  });

  it("hooks run rejects unknown hook", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "nope", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane hooks run");
    } finally {
      io.restore();
    }
  });

  it("hooks run commit-msg rejects empty subject", async () => {
    const root = await mkGitRepoRoot();
    const messagePath = path.join(root, "COMMIT_EDITMSG");
    await writeFile(messagePath, "# comment\n\n", "utf8");
    const prev = process.env.AGENTPLANE_TASK_ID;
    delete process.env.AGENTPLANE_TASK_ID;

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "commit-msg", messagePath, "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Commit message subject is empty");
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_TASK_ID;
      else process.env.AGENTPLANE_TASK_ID = prev;
    }
  });

  it("hooks run commit-msg rejects missing suffix", async () => {
    const root = await mkGitRepoRoot();
    const messagePath = path.join(root, "COMMIT_EDITMSG");
    await writeFile(messagePath, "chore: update\n", "utf8");
    const prev = process.env.AGENTPLANE_TASK_ID;
    process.env.AGENTPLANE_TASK_ID = "202601010101-ABCDEF";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "commit-msg", messagePath, "--root", root]);
      expect(code).toBe(5);
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_TASK_ID;
      else process.env.AGENTPLANE_TASK_ID = prev;
    }
  });

  it("hooks run commit-msg rejects when task env is unset", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const messagePath = path.join(root, "COMMIT_EDITMSG");
    await writeFile(messagePath, "✨ ABCDEF task: add hooks\n", "utf8");
    const prev = process.env.AGENTPLANE_TASK_ID;
    delete process.env.AGENTPLANE_TASK_ID;

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "commit-msg", messagePath, "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("task-like commit subject found");
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_TASK_ID;
      else process.env.AGENTPLANE_TASK_ID = prev;
    }
  });

  it("hooks run commit-msg infers task id from the current task branch when env is unset", async () => {
    const taskId = "202601010101-ABCDEF";
    const root = await mkGitRepoRootWithBranch(`task/${taskId}/hooks-context`);
    await writeDefaultConfig(root);
    const messagePath = path.join(root, "COMMIT_EDITMSG");
    await writeFile(messagePath, "✨ ABCDEF task: add hooks\n", "utf8");
    const prev = process.env.AGENTPLANE_TASK_ID;
    delete process.env.AGENTPLANE_TASK_ID;

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "commit-msg", messagePath, "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_TASK_ID;
      else process.env.AGENTPLANE_TASK_ID = prev;
    }
  });

  it("hooks run commit-msg accepts DEV suffix when task env is unset", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const messagePath = path.join(root, "COMMIT_EDITMSG");
    await writeFile(messagePath, "✨ DEV ci: enforce full tests before push\n", "utf8");
    const prev = process.env.AGENTPLANE_TASK_ID;
    delete process.env.AGENTPLANE_TASK_ID;

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "commit-msg", messagePath, "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_TASK_ID;
      else process.env.AGENTPLANE_TASK_ID = prev;
    }
  });

  it("hooks run commit-msg accepts non-task subject without suffix when task env is unset", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const messagePath = path.join(root, "COMMIT_EDITMSG");
    await writeFile(messagePath, "✨ ci: enforce full tests before push\n", "utf8");
    const prev = process.env.AGENTPLANE_TASK_ID;
    delete process.env.AGENTPLANE_TASK_ID;

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "commit-msg", messagePath, "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_TASK_ID;
      else process.env.AGENTPLANE_TASK_ID = prev;
    }
  });

  it("hooks run commit-msg blocks mutating staged paths with a non-task subject", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await mkdir(path.join(root, "src"), { recursive: true });
    await writeFile(path.join(root, "src", "app.ts"), "export const value = 1;\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "src/app.ts"], { cwd: root });
    const messagePath = path.join(root, "COMMIT_EDITMSG");
    await writeFile(messagePath, "✨ code: connect managed API\n", "utf8");
    const prev = process.env.AGENTPLANE_TASK_ID;
    delete process.env.AGENTPLANE_TASK_ID;

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "commit-msg", messagePath, "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Mutating staged paths require an active AgentPlane task");
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_TASK_ID;
      else process.env.AGENTPLANE_TASK_ID = prev;
    }
  });

  it("hooks run commit-msg binds mutating staged paths from a valid task suffix", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202601010101-ABCDEF";
    await mkdir(path.join(root, ".agentplane", "tasks", taskId), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      [
        "---",
        `id: "${taskId}"`,
        'title: "Code task"',
        'status: "DOING"',
        'priority: "med"',
        'owner: "CODER"',
        "depends_on: []",
        'tags: ["code"]',
        'task_kind: "code"',
        'mutation_scope: "code"',
        "verify: []",
        "comments: []",
        "doc_version: 3",
        'doc_updated_at: "2026-01-01T00:00:00.000Z"',
        'doc_updated_by: "CODER"',
        'description: "Code task."',
        "---",
        "",
      ].join("\n"),
      "utf8",
    );
    await mkdir(path.join(root, "src"), { recursive: true });
    await writeFile(path.join(root, "src", "app.ts"), "export const value = 1;\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", ".agentplane/tasks", "src/app.ts"], { cwd: root });
    const messagePath = path.join(root, "COMMIT_EDITMSG");
    await writeFile(messagePath, "✨ ABCDEF code: connect managed API\n", "utf8");
    const prev = process.env.AGENTPLANE_TASK_ID;
    delete process.env.AGENTPLANE_TASK_ID;

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "commit-msg", messagePath, "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_TASK_ID;
      else process.env.AGENTPLANE_TASK_ID = prev;
    }
  });

  it("hooks run pre-commit succeeds when nothing is staged", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("hooks run pre-commit maps errors for non-git roots", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "config.json"), "{}", "utf8");
    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

  it("hooks run pre-commit blocks tasks.json without allow flag", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeFile(path.join(root, ".agentplane", "tasks.json"), "{}", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", ".agentplane/tasks.json"], { cwd: root });

    const prev = process.env.AGENTPLANE_ALLOW_TASKS;
    process.env.AGENTPLANE_ALLOW_TASKS = "0";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("protected by agentplane hooks");
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_ALLOW_TASKS;
      else process.env.AGENTPLANE_ALLOW_TASKS = prev;
    }
  });

  it("hooks run pre-push dispatches the real script", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeFile(
      path.join(root, "package.json"),
      JSON.stringify(
        {
          name: "hook-test",
          private: true,
          scripts: {
            "format:check": "node scripts/format-check.mjs",
            "ci:local:fast": "node scripts/ci-fast.mjs",
            "ci:local:full": "node scripts/ci-fast.mjs",
          },
        },
        null,
        2,
      ),
      "utf8",
    );
    await mkdir(path.join(root, "scripts"), { recursive: true });
    await mkdir(path.join(root, "src"), { recursive: true });
    await writeFile(path.join(root, "scripts", "format-check.mjs"), "process.exit(1);\n", "utf8");
    await writeFile(path.join(root, "scripts", "ci-fast.mjs"), "process.exit(0);\n", "utf8");
    await writeFile(path.join(root, "src", "example.ts"), "export const example = 1;\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "package.json", "scripts", "src/example.ts"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test fixture"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-push", "--root", root]);
      expect(code).toBe(1);
    } finally {
      io.restore();
    }
  });

  it("pre-push release mode reports polluted local git config before payload checks", async () => {
    const root = await mkGitRepoRoot();
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["config", "--local", "core.bare", "true"], {
      cwd: root,
      env: cleanGitEnv(),
    });

    let failure: (Error & { stderr?: string | Buffer; stdout?: string | Buffer }) | null = null;
    try {
      execFileSync("node", [PRE_PUSH_HOOK_SCRIPT], {
        cwd: root,
        stdio: "pipe",
        input: "",
        env: {
          ...process.env,
          AGENTPLANE_HOOKS_RELEASE: "1",
        },
      });
    } catch (error) {
      failure = error as Error & { stderr?: string | Buffer; stdout?: string | Buffer };
    }

    expect(failure).not.toBeNull();
    expect(String(failure?.stdout ?? "")).toContain("Running pre-push checks in release mode.");
    expect(String(failure?.stderr ?? "")).toContain(
      "pre-push blocked: release checks cannot run because local git config has core.bare=true.",
    );
    expect(String(failure?.stderr ?? "")).toContain(
      "This indicates repository config pollution, not a release payload failure.",
    );
    expect(String(failure?.stdout ?? "")).not.toContain("== Format (check) ==");
  });

  it("pre-push hook blocks outgoing mutating commits without task binding", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    await writeDefaultConfig(root);
    await writeFile(
      path.join(root, "package.json"),
      JSON.stringify(
        {
          name: "hook-test",
          private: true,
          scripts: {
            "format:check": 'node -e "process.exit(0)"',
            "ci:local:fast": 'node -e "process.exit(0)"',
          },
        },
        null,
        2,
      ),
      "utf8",
    );
    await commitAll(root, "chore: base");
    const baseSha = execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: root,
      encoding: "utf8",
    }).trim();

    await mkdir(path.join(root, "src"), { recursive: true });
    await writeFile(path.join(root, "src", "app.ts"), "export const value = 1;\n", "utf8");
    await commitAll(root, "✨ code: connect managed API");
    const headSha = execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: root,
      encoding: "utf8",
    }).trim();

    let failure: (Error & { stderr?: string | Buffer; stdout?: string | Buffer }) | null = null;
    try {
      execFileSync("node", [PRE_PUSH_HOOK_SCRIPT], {
        cwd: root,
        stdio: "pipe",
        input: `refs/heads/main ${headSha} refs/heads/main ${baseSha}\n`,
      });
    } catch (error) {
      failure = error as Error & { stderr?: string | Buffer; stdout?: string | Buffer };
    }

    expect(failure).not.toBeNull();
    expect(String(failure?.stderr ?? "")).toContain(
      "pre-push blocked: mutating commits require a valid task id",
    );
    expect(String(failure?.stderr ?? "")).toContain("src/app.ts");
  });

  it("pre-push hook includes merge commits in mutating commit audits", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    await writeDefaultConfig(root);
    await writeFile(
      path.join(root, "package.json"),
      JSON.stringify(
        {
          name: "hook-test",
          private: true,
          scripts: {
            "format:check": 'node -e "process.exit(0)"',
            "ci:local:fast": 'node -e "process.exit(0)"',
          },
        },
        null,
        2,
      ),
      "utf8",
    );
    await mkdir(path.join(root, ".agentplane", "tasks", "202601010101-ABCDEF"), {
      recursive: true,
    });
    await writeFile(
      path.join(root, ".agentplane", "tasks", "202601010101-ABCDEF", "README.md"),
      "task\n",
      "utf8",
    );
    await commitAll(root, "chore: base");
    const baseSha = execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: root,
      encoding: "utf8",
    }).trim();

    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["checkout", "-b", "feature"], { cwd: root });
    await mkdir(path.join(root, "src"), { recursive: true });
    await writeFile(path.join(root, "src", "app.ts"), "export const value = 1;\n", "utf8");
    await commitAll(root, "✨ ABCDEF code: connect managed API");
    await execFileAsync("git", ["checkout", "main"], { cwd: root });
    await execFileAsync("git", ["merge", "--no-ff", "feature", "-m", "Merge feature branch"], {
      cwd: root,
    });
    const headSha = execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: root,
      encoding: "utf8",
    }).trim();

    let failure: (Error & { stderr?: string | Buffer; stdout?: string | Buffer }) | null = null;
    try {
      execFileSync("node", [PRE_PUSH_HOOK_SCRIPT], {
        cwd: root,
        stdio: "pipe",
        input: `refs/heads/main ${headSha} refs/heads/main ${baseSha}\n`,
      });
    } catch (error) {
      failure = error as Error & { stderr?: string | Buffer; stdout?: string | Buffer };
    }

    expect(failure).not.toBeNull();
    expect(String(failure?.stderr ?? "")).toContain("Merge feature branch");
    expect(String(failure?.stderr ?? "")).toContain("src/app.ts");
  });

  it("pre-push hook accepts emergency hotfix commits with backfill evidence", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    await writeDefaultConfig(root);
    await writeFile(
      path.join(root, "package.json"),
      JSON.stringify(
        {
          name: "hook-test",
          private: true,
          scripts: {
            "format:check": 'node -e "process.exit(0)"',
            "ci:local:fast": 'node -e "process.exit(0)"',
          },
        },
        null,
        2,
      ),
      "utf8",
    );
    await commitAll(root, "chore: base");
    const baseSha = execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: root,
      encoding: "utf8",
    }).trim();

    await mkdir(path.join(root, "src"), { recursive: true });
    await writeFile(path.join(root, "src", "app.ts"), "export const value = 1;\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "src/app.ts"], { cwd: root });
    await execFileAsync(
      "git",
      [
        "commit",
        "-m",
        [
          "🚑 hotfix: restore managed API",
          "",
          "Emergency-Hotfix: true",
          "Backfill-Task: 202601010101-ABCDEF",
          "Backfill-Evidence: incident ticket and rollback note recorded",
        ].join("\n"),
      ],
      { cwd: root },
    );
    const headSha = execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: root,
      encoding: "utf8",
    }).trim();

    const result = execFileSync("node", [PRE_PUSH_HOOK_SCRIPT], {
      cwd: root,
      encoding: "utf8",
      input: `refs/heads/main ${headSha} refs/heads/main ${baseSha}\n`,
    });
    expect(result).toContain("Running pre-push checks in standard mode.");
  });

  it("hooks run post-merge prunes merged local task worktrees on the base branch", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await writeFile(path.join(root, ".gitignore"), TEST_WORKFLOW_GITIGNORE, "utf8");
    await commitAll(root, "chore base");
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Post-merge hook prune",
        "--description",
        "cleanup candidate",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }
    await commitAll(root, `chore ${taskId} scaffold`);

    const integratedRev = await promisify(execFile)("git", ["rev-parse", "HEAD"], { cwd: root });
    const integratedHash = integratedRev.stdout.trim();
    const task = await readTask({ cwd: root, taskId });
    const readmeText = await readFile(task.readmePath, "utf8");
    await writeFile(
      task.readmePath,
      markTaskDoneWithCommit(readmeText, integratedHash, "integrated on main"),
      "utf8",
    );
    await commitAll(root, `chore ${taskId} done`);

    const branch = `task/${taskId}/post-merge-prune`;
    const worktreePath = path.join(root, ".agentplane", "worktrees", `${taskId}-post-merge-prune`);
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["worktree", "add", "-b", branch, worktreePath, "main"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const prDir = path.join(worktreePath, ".agentplane", "tasks", taskId, "pr");
    await mkdir(prDir, { recursive: true });
    await writeFile(path.join(prDir, "review.md"), "stale task tail\n", "utf8");
    await commitAll(worktreePath, `chore ${taskId} stale pr tail`);

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "post-merge", "--root", root]);
      expect(code).toBe(0);
      expect(io.stderr).not.toContain("post-merge cleanup skipped");
    } finally {
      io.restore();
    }

    expect(await gitBranchExists(root, branch)).toBe(false);
    expect(await pathExists(worktreePath)).toBe(false);
  }, 120_000);

  it("hooks run post-merge skips unsafe outside-root worktrees while pruning safe merged tails", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await writeFile(path.join(root, ".gitignore"), TEST_WORKFLOW_GITIGNORE, "utf8");
    await commitAll(root, "chore base");
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const execFileAsync = promisify(execFile);

    let safeTaskId = "";
    const safeIo = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Post-merge hook safe prune",
        "--description",
        "cleanup candidate",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      safeTaskId = safeIo.stdout.trim();
    } finally {
      safeIo.restore();
    }
    await commitAll(root, `chore ${safeTaskId} scaffold`);
    const integratedRev = await promisify(execFile)("git", ["rev-parse", "HEAD"], { cwd: root });
    const integratedHash = integratedRev.stdout.trim();
    const safeTask = await readTask({ cwd: root, taskId: safeTaskId });
    const safeReadmeText = await readFile(safeTask.readmePath, "utf8");
    await writeFile(
      safeTask.readmePath,
      markTaskDoneWithCommit(safeReadmeText, integratedHash, "integrated on main"),
      "utf8",
    );
    await commitAll(root, `chore ${safeTaskId} done`);

    const safeBranch = `task/${safeTaskId}/post-merge-prune-safe`;
    const safeWorktreePath = path.join(
      root,
      ".agentplane",
      "worktrees",
      `${safeTaskId}-post-merge-prune-safe`,
    );
    await execFileAsync("git", ["worktree", "add", "-b", safeBranch, safeWorktreePath, "main"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const safePrDir = path.join(safeWorktreePath, ".agentplane", "tasks", safeTaskId, "pr");
    await mkdir(safePrDir, { recursive: true });
    await writeFile(path.join(safePrDir, "review.md"), "stale task tail\n", "utf8");
    await commitAll(safeWorktreePath, `chore ${safeTaskId} stale pr tail`);

    let outsideTaskId = "";
    const outsideIo = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Post-merge hook unsafe skip",
        "--description",
        "cleanup candidate",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      outsideTaskId = outsideIo.stdout.trim();
    } finally {
      outsideIo.restore();
    }
    await commitAll(root, `chore ${outsideTaskId} scaffold`);
    const outsideTask = await readTask({ cwd: root, taskId: outsideTaskId });
    const outsideReadmeText = await readFile(outsideTask.readmePath, "utf8");
    await writeFile(
      outsideTask.readmePath,
      markTaskDoneWithCommit(outsideReadmeText, integratedHash, "integrated on main"),
      "utf8",
    );
    await commitAll(root, `chore ${outsideTaskId} done`);

    const outsideBranch = `task/${outsideTaskId}/post-merge-prune-outside`;
    const outsideWorktreePath = await mkdtemp(path.join(os.tmpdir(), "agentplane-worktree-"));
    await execFileAsync(
      "git",
      ["worktree", "add", "-b", outsideBranch, outsideWorktreePath, "main"],
      {
        cwd: root,
        env: cleanGitEnv(),
      },
    );
    const outsidePrDir = path.join(
      outsideWorktreePath,
      ".agentplane",
      "tasks",
      outsideTaskId,
      "pr",
    );
    await mkdir(outsidePrDir, { recursive: true });
    await writeFile(path.join(outsidePrDir, "review.md"), "outside task tail\n", "utf8");
    await commitAll(outsideWorktreePath, `chore ${outsideTaskId} outside pr tail`);

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "post-merge", "--root", root]);
      expect(code).toBe(0);
      expect(io.stderr).not.toContain("post-merge cleanup skipped");
    } finally {
      io.restore();
    }

    expect(await gitBranchExists(root, safeBranch)).toBe(false);
    expect(await pathExists(safeWorktreePath)).toBe(false);
    expect(await gitBranchExists(root, outsideBranch)).toBe(true);
    expect(await pathExists(outsideWorktreePath)).toBe(true);

    await execFileAsync("git", ["worktree", "remove", "--force", outsideWorktreePath], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["branch", "-D", outsideBranch], {
      cwd: root,
      env: cleanGitEnv(),
    });
  }, 120_000);

  it("pre-push hook blocks formatting drift without mutating tracked files", async () => {
    const root = await mkGitRepoRoot();
    await writeFile(
      path.join(root, "package.json"),
      JSON.stringify(
        {
          name: "hook-test",
          private: true,
          scripts: {
            "format:check": "node scripts/format-check.mjs",
            "ci:local:fast": "node scripts/ci-fast.mjs",
            "ci:local:full": "node scripts/ci-fast.mjs",
          },
        },
        null,
        2,
      ),
      "utf8",
    );
    await mkdir(path.join(root, "scripts"), { recursive: true });
    await mkdir(path.join(root, "src"), { recursive: true });
    await writeFile(path.join(root, "scripts", "format-check.mjs"), "process.exit(1);\n", "utf8");
    await writeFile(path.join(root, "scripts", "ci-fast.mjs"), "process.exit(0);\n", "utf8");
    const trackedFile = path.join(root, "src", "example.ts");
    const original = "export const example={value:1}\n";
    await writeFile(trackedFile, original, "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "package.json", "scripts", "src/example.ts"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test fixture"], { cwd: root });

    let failure: (Error & { stderr?: string | Buffer; stdout?: string | Buffer }) | null = null;
    try {
      execFileSync("node", [PRE_PUSH_HOOK_SCRIPT], {
        cwd: root,
        stdio: "pipe",
        input: "",
      });
    } catch (error) {
      failure = error as Error & { stderr?: string | Buffer; stdout?: string | Buffer };
    }

    expect(failure).not.toBeNull();
    expect(String(failure?.stderr ?? "")).toContain(
      "pre-push blocked: formatting check failed. Run `bun run format`, review the diff, commit it, and push again.",
    );
    expect(String(failure?.stderr ?? "")).not.toContain(
      "format:check changed tracked files unexpectedly",
    );
    expect(await readFile(trackedFile, "utf8")).toBe(original);
    const status = await execFileAsync("git", ["status", "--short", "--untracked-files=no"], {
      cwd: root,
    });
    expect(status.stdout.trim()).toBe("");
  });

  it("pre-push hook resolves bun from NVM_BIN when PATH omits it", async () => {
    const root = await mkGitRepoRoot();
    await writeFile(
      path.join(root, "package.json"),
      JSON.stringify(
        {
          name: "hook-test",
          private: true,
          scripts: {
            "format:check": "node scripts/format-check.mjs",
            "ci:local:fast": "node scripts/ci-fast.mjs",
            "ci:local:full": "node scripts/ci-fast.mjs",
          },
        },
        null,
        2,
      ),
      "utf8",
    );
    await mkdir(path.join(root, "scripts"), { recursive: true });
    await writeFile(path.join(root, "scripts", "format-check.mjs"), "process.exit(0);\n", "utf8");
    await writeFile(path.join(root, "scripts", "ci-fast.mjs"), "process.exit(0);\n", "utf8");

    const fakeBinDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-bun-bin-"));
    const fakeBunPath = path.join(fakeBinDir, "bun");
    await writeFile(
      fakeBunPath,
      [
        "#!/bin/sh",
        'case "$2" in',
        `  format:check) exec "${process.execPath}" scripts/format-check.mjs ;;`,
        `  ci:local:fast|ci:local:full) exec "${process.execPath}" scripts/ci-fast.mjs ;;`,
        "  *) exit 64 ;;",
        "esac",
        "",
      ].join("\n"),
      "utf8",
    );
    await chmod(fakeBunPath, 0o755);

    const output = execFileSync(process.execPath, [PRE_PUSH_HOOK_SCRIPT], {
      cwd: root,
      stdio: "pipe",
      input: "",
      env: {
        ...process.env,
        PATH: "/usr/bin:/bin",
        NVM_BIN: fakeBinDir,
      },
      encoding: "utf8",
    });

    expect(output).toContain("Running pre-push checks in standard mode.");
  });

  it("pre-push hook reports tracked-file mutations even when local ci fails", async () => {
    const root = await mkGitRepoRoot();
    await writeFile(
      path.join(root, "package.json"),
      JSON.stringify(
        {
          name: "hook-test",
          private: true,
          scripts: {
            "format:check": "node scripts/format-check.mjs",
            "ci:local:fast": "node scripts/ci-fast.mjs",
            "ci:local:full": "node scripts/ci-fast.mjs",
          },
        },
        null,
        2,
      ),
      "utf8",
    );
    await mkdir(path.join(root, "scripts"), { recursive: true });
    await mkdir(path.join(root, "src"), { recursive: true });
    await writeFile(path.join(root, "scripts", "format-check.mjs"), "process.exit(0);\n", "utf8");
    await writeFile(
      path.join(root, "scripts", "ci-fast.mjs"),
      [
        'import { writeFileSync } from "node:fs";',
        String.raw`writeFileSync("src/example.ts", "export const example = 2;\n", "utf8");`,
        "process.exit(1);",
        "",
      ].join("\n"),
      "utf8",
    );
    const trackedFile = path.join(root, "src", "example.ts");
    await writeFile(trackedFile, "export const example = 1;\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "package.json", "scripts", "src/example.ts"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test fixture"], { cwd: root });

    let failure: (Error & { stderr?: string | Buffer; stdout?: string | Buffer }) | null = null;
    try {
      execFileSync("node", [PRE_PUSH_HOOK_SCRIPT], {
        cwd: root,
        stdio: "pipe",
        input: "",
      });
    } catch (error) {
      failure = error as Error & { stderr?: string | Buffer; stdout?: string | Buffer };
    }

    expect(failure).not.toBeNull();
    expect(String(failure?.stderr ?? "")).toContain(
      "pre-push blocked: ci:local:fast changed tracked files. Commit or revert those changes and push again.",
    );
    expect(String(failure?.stderr ?? "")).not.toContain("pre-push blocked: ci:local:fast failed.");
    expect(await readFile(trackedFile, "utf8")).toBe("export const example = 2;\n");
  });

  it(
    "pre-push hook derives task-only scope for a new branch publish from origin/main",
    { timeout: 120_000 },
    async () => {
      const root = await mkGitRepoRootWithBranch("main");
      await writeDefaultConfig(root);
      await mkdir(path.join(root, "scripts"), { recursive: true });
      await writeFile(
        path.join(root, "package.json"),
        JSON.stringify(
          {
            name: "hook-test",
            private: true,
            scripts: {
              "format:check": "node scripts/format-check.mjs",
              "ci:local:fast": "node scripts/ci-fast.mjs",
              "ci:local:full": "node scripts/ci-fast.mjs",
            },
          },
          null,
          2,
        ),
        "utf8",
      );
      await writeFile(path.join(root, "scripts", "format-check.mjs"), "process.exit(0);\n", "utf8");
      await writeFile(
        path.join(root, "scripts", "ci-fast.mjs"),
        [
          'import { writeFileSync } from "node:fs";',
          'writeFileSync("changed-files.txt", process.env.AGENTPLANE_FAST_CHANGED_FILES ?? "", "utf8");',
          "process.exit(0);",
          "",
        ].join("\n"),
        "utf8",
      );
      const execFileAsync = promisify(execFile);
      await execFileAsync("git", ["add", "package.json", "scripts", ".agentplane/WORKFLOW.md"], {
        cwd: root,
        env: cleanGitEnv(),
      });
      await execFileAsync("git", ["commit", "--no-verify", "-m", "seed hook scripts"], {
        cwd: root,
        env: cleanGitEnv(),
      });

      const remote = await mkdtemp(path.join(os.tmpdir(), "agentplane-hook-remote-"));
      await execFileAsync("git", ["init", "--bare", remote], {
        cwd: root,
        env: cleanGitEnv(),
      });
      await execFileAsync("git", ["remote", "add", "origin", remote], {
        cwd: root,
        env: cleanGitEnv(),
      });
      await execFileAsync("git", ["push", "--no-verify", "-u", "origin", "main"], {
        cwd: root,
        env: cleanGitEnv(),
      });
      await execFileAsync(
        "git",
        ["symbolic-ref", "refs/remotes/origin/HEAD", "refs/remotes/origin/main"],
        {
          cwd: root,
          env: cleanGitEnv(),
        },
      );

      await execFileAsync(
        "git",
        ["checkout", "-b", "task/202604071841-HWNRXM/pre-push-new-branch-scope"],
        {
          cwd: root,
          env: cleanGitEnv(),
        },
      );
      const taskReadme = path.join(
        root,
        ".agentplane",
        "tasks",
        "202604071841-HWNRXM",
        "README.md",
      );
      await mkdir(path.dirname(taskReadme), { recursive: true });
      await writeFile(taskReadme, "# task\n", "utf8");
      await execFileAsync("git", ["add", taskReadme], {
        cwd: root,
        env: cleanGitEnv(),
      });
      await execFileAsync("git", ["commit", "--no-verify", "-m", "task: add task artifact"], {
        cwd: root,
        env: cleanGitEnv(),
      });
      const { stdout: shaOut } = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: root,
        env: cleanGitEnv(),
      });
      const headSha = shaOut.trim();

      execFileSync("node", [PRE_PUSH_HOOK_SCRIPT], {
        cwd: root,
        stdio: "pipe",
        input: `refs/heads/task/202604071841-HWNRXM/pre-push-new-branch-scope ${headSha} refs/heads/task/202604071841-HWNRXM/pre-push-new-branch-scope 0000000000000000000000000000000000000000\n`,
      });

      const changedFiles = await readFile(path.join(root, "changed-files.txt"), "utf8");
      expect(changedFiles.trim()).toBe(".agentplane/tasks/202604071841-HWNRXM/README.md");
    },
  );

  it("pre-push hook skips format and local ci for delete-only remote branch cleanup", async () => {
    const root = await mkGitRepoRoot();
    await writeFile(
      path.join(root, "package.json"),
      JSON.stringify(
        {
          name: "hook-test",
          private: true,
          scripts: {
            "format:check": "node scripts/format-check.mjs",
            "ci:local:fast": "node scripts/ci-fast.mjs",
            "ci:local:full": "node scripts/ci-fast.mjs",
          },
        },
        null,
        2,
      ),
      "utf8",
    );
    await mkdir(path.join(root, "scripts"), { recursive: true });
    await writeFile(
      path.join(root, "scripts", "format-check.mjs"),
      'throw new Error("format should not run during delete-only cleanup");\n',
      "utf8",
    );
    await writeFile(
      path.join(root, "scripts", "ci-fast.mjs"),
      'throw new Error("ci should not run during delete-only cleanup");\n',
      "utf8",
    );

    const output = execFileSync("node", [PRE_PUSH_HOOK_SCRIPT], {
      cwd: root,
      stdio: "pipe",
      input:
        "(delete) 0000000000000000000000000000000000000000 refs/heads/task-close/202604180819-6P5PRC/base-head-sh abcdef1234567890abcdef1234567890abcdef12\n",
      encoding: "utf8",
    });

    expect(output).toContain("Skipping pre-push checks for delete-only remote branch cleanup.");
    expect(output).not.toContain("Running pre-push checks");
  });
});
