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
  mkTempDir,
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
const TEST_WORKFLOW_GITIGNORE = ".agentplane/worktrees\n.agentplane/cache\n";
const HOOKS_SUITE_TIMEOUT_MS = 180_000;
const ACTIVE_BIN_ENV = "AGENTPLANE_RUNTIME_ACTIVE_BIN";

function markTaskDoneWithCommit(readmeText: string, hash: string, message: string): string {
  const commitBlock = `commit:\n  hash: "${hash}"\n  message: "${message}"`;
  const withDoneStatus = readmeText.replace('status: "TODO"', 'status: "DONE"');
  if (withDoneStatus.includes("commit: null")) {
    return withDoneStatus.replace("commit: null", commitBlock);
  }
  return withDoneStatus.replace("comments:", `${commitBlock}\ncomments:`);
}

async function withInstalledAgentplaneRuntime<T>(fn: () => T | Promise<T>): Promise<T> {
  const previousActiveBin = process.env[ACTIVE_BIN_ENV];
  const packageRoot = await mkTempDir("agentplane-installed-runtime-");
  const activeBin = path.join(packageRoot, "bin", "agentplane.js");
  await mkdir(path.dirname(activeBin), { recursive: true });
  await writeFile(path.join(packageRoot, "package.json"), '{"name":"agentplane"}\n', "utf8");
  await writeFile(activeBin, "process.exit(0);\n", "utf8");
  process.env[ACTIVE_BIN_ENV] = activeBin;
  try {
    return await fn();
  } finally {
    if (previousActiveBin === undefined) delete process.env[ACTIVE_BIN_ENV];
    else process.env[ACTIVE_BIN_ENV] = previousActiveBin;
  }
}

describe("runCli", { timeout: HOOKS_SUITE_TIMEOUT_MS }, () => {
  it("hooks install writes managed hooks and shim", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const activeBin = path.join(root, "installed agentplane", "bin", "agentplane.js");
    const previousActiveBin = process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN;
    await mkdir(path.dirname(activeBin), { recursive: true });
    await writeFile(activeBin, "process.exit(0);\n", "utf8");
    process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN = activeBin;

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "install", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      if (previousActiveBin === undefined) delete process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN;
      else process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN = previousActiveBin;
    }

    const hooksDir = path.join(root, ".git", "hooks");
    const commitMsg = await readFile(path.join(hooksDir, "commit-msg"), "utf8");
    const preCommit = await readFile(path.join(hooksDir, "pre-commit"), "utf8");
    const postMerge = await readFile(path.join(hooksDir, "post-merge"), "utf8");
    const shim = await readFile(path.join(root, ".agentplane", "bin", "agentplane"), "utf8");

    expect(commitMsg).toContain("agentplane-hook");
    expect(preCommit).toContain("agentplane-hook");
    expect(postMerge).toContain("agentplane-hook");
    expect(postMerge).toContain("hooks run post-merge");
    expect(shim).toContain("agentplane-hook-shim");
    expect(shim).toContain(`INSTALL_BIN='${activeBin}'`);
    expect(shim).toContain("AGENTPLANE_HOOK_RUNNER");
    expect(shim).toContain("AGENTPLANE_HOOK_ALLOW_NPX");
  });

  it("hooks install refuses to overwrite unmanaged hook", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await mkdir(path.join(root, ".git", "hooks"), { recursive: true });
    await writeFile(path.join(root, ".git", "hooks", "commit-msg"), "custom", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "install", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Refusing to overwrite existing hook");
    } finally {
      io.restore();
    }
  });

  it("hooks install is idempotent for managed hooks", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await runCliSilent(["hooks", "install", "--root", root]);

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "install", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("hooks install supports --quiet", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "install", "--quiet", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toBe("");
    } finally {
      io.restore();
    }
  }, 15_000);

  it("hooks install maps errors for non-git roots", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "config.json"), "{}", "utf8");
    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "install", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

  it("hooks rejects unknown subcommands", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "nope", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane hooks <command>");
    } finally {
      io.restore();
    }
  });

  it("hooks uninstall removes managed hooks", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await runCliSilent(["hooks", "install", "--root", root]);

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "uninstall", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const hookPath = path.join(root, ".git", "hooks", "commit-msg");
    await expect(readFile(hookPath, "utf8")).rejects.toThrow();
  });

  it("hooks uninstall reports when no hooks are present", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "uninstall", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("no agentplane hooks found");
    } finally {
      io.restore();
    }
  });

  it("hooks uninstall maps errors for non-git roots", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "config.json"), "{}", "utf8");
    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "uninstall", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

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

  it("hooks run pre-push resolves the repository-local script before bundled fallbacks", async () => {
    const root = await mkGitRepoRoot();
    await mkdir(path.join(root, "scripts"), { recursive: true });
    const repoScript = path.join(root, "scripts", "run-pre-push-hook.mjs");
    await writeFile(repoScript, "process.exit(0);\n", "utf8");

    await expect(resolvePrePushHookScriptPath(root)).resolves.toBe(repoScript);
  });

  it("hooks run pre-push treats missing global-install fallbacks as unresolved", async () => {
    const root = await mkGitRepoRoot();
    const missingGlobalFallback = path.join(
      root,
      "simulated-global-prefix",
      "lib",
      "scripts",
      "run-pre-push-hook.mjs",
    );

    await expect(
      resolvePrePushHookScriptPath(root, { bundledScriptPath: missingGlobalFallback }),
    ).resolves.toBeNull();
  });

  it("hooks run pre-push uses installed CLI fallback when repository script is absent", async () => {
    await withInstalledAgentplaneRuntime(async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      await writeFile(
        path.join(root, "package.json"),
        JSON.stringify(
          {
            name: "installed-hook-fallback",
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
      await writeFile(
        path.join(root, "scripts", "ci-fast.mjs"),
        "import { writeFileSync } from 'node:fs';\nwriteFileSync('.agentplane/cache/pre-push-fallback.marker', 'ok\\n');\n",
        "utf8",
      );
      await mkdir(path.join(root, ".agentplane", "cache"), { recursive: true });

      const io = captureStdIO();
      try {
        const code = await runCli(["hooks", "run", "pre-push", "--root", root]);
        expect(code).toBe(0);
        expect(io.stderr).not.toContain("Missing pre-push hook script");
        await expect(
          pathExists(path.join(root, ".agentplane/cache/pre-push-fallback.marker")),
        ).resolves.toBe(true);
      } finally {
        io.restore();
      }
    });
  });

  it("hooks run pre-push skips missing project scripts in clean initialized repositories", async () => {
    await withInstalledAgentplaneRuntime(async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);

      const io = captureStdIO();
      try {
        const code = await runCli(["hooks", "run", "pre-push", "--root", root]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("Running pre-push checks in standard mode.");
        expect(io.stdout).toContain("Skipping format:check: package.json script is not defined.");
        expect(io.stdout).toContain("Skipping ci:local:fast: package.json script is not defined.");
        expect(io.stderr).not.toContain("Missing pre-push hook script");
      } finally {
        io.restore();
      }
    });
  });

  it("hooks run pre-push skips framework release scripts in clean initialized repositories", async () => {
    await withInstalledAgentplaneRuntime(async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      const previousRelease = process.env.AGENTPLANE_HOOKS_RELEASE;
      process.env.AGENTPLANE_HOOKS_RELEASE = "1";

      const io = captureStdIO();
      try {
        const code = await runCli(["hooks", "run", "pre-push", "--root", root]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("Running pre-push checks in release mode.");
        expect(io.stdout).toContain(
          "Skipping release notes check: scripts/check-release-notes.mjs is not defined.",
        );
        expect(io.stdout).toContain(
          "Skipping release:prepublish: package.json script is not defined.",
        );
        expect(io.stderr).not.toContain("Missing pre-push hook script");
      } finally {
        io.restore();
        if (previousRelease === undefined) delete process.env.AGENTPLANE_HOOKS_RELEASE;
        else process.env.AGENTPLANE_HOOKS_RELEASE = previousRelease;
      }
    });
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
      await execFileAsync("git", ["add", "package.json", "scripts", ".agentplane/config.json"], {
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

  it("hooks run pre-commit allows tasks.json with env override", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeFile(path.join(root, ".agentplane", "tasks.json"), "{}", "utf8");
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
      if (prev === undefined) delete process.env.AGENTPLANE_ALLOW_TASKS;
      else process.env.AGENTPLANE_ALLOW_TASKS = prev;
    }
  });

  it("hooks run pre-commit blocks AGENTS.md without env override", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeFile(path.join(root, "AGENTS.md"), "# policy\n", "utf8");
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
      if (prev === undefined) delete process.env.AGENTPLANE_ALLOW_POLICY;
      else process.env.AGENTPLANE_ALLOW_POLICY = prev;
    }
  });

  it("hooks run pre-commit allows AGENTS.md with env override", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeFile(path.join(root, "AGENTS.md"), "# policy\n", "utf8");
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
      if (prev === undefined) delete process.env.AGENTPLANE_ALLOW_POLICY;
      else process.env.AGENTPLANE_ALLOW_POLICY = prev;
    }
  });

  it("hooks run pre-commit allows base branch with allowBase", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await mkdir(path.join(root, "src"), { recursive: true });
    await writeFile(path.join(root, "src", "app.ts"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "src/app.ts"], { cwd: root });

    const prev = process.env.AGENTPLANE_ALLOW_BASE;
    process.env.AGENTPLANE_ALLOW_BASE = "1";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_ALLOW_BASE;
      else process.env.AGENTPLANE_ALLOW_BASE = prev;
    }
  });

  it("hooks run pre-commit enforces branch_pr base restrictions", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await mkdir(path.join(root, "src"), { recursive: true });
    await writeFile(path.join(root, "src", "app.ts"), "x", "utf8");
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
      if (prev === undefined) delete process.env.AGENTPLANE_ALLOW_BASE;
      else process.env.AGENTPLANE_ALLOW_BASE = prev;
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
    await writeFile(path.join(root, ".agentplane", "tasks.json"), "{}", "utf8");
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
      if (prev === undefined) delete process.env.AGENTPLANE_ALLOW_TASKS;
      else process.env.AGENTPLANE_ALLOW_TASKS = prev;
    }
  });
});
