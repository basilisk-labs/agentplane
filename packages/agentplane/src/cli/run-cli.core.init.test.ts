/* eslint-disable @typescript-eslint/no-unused-vars */
import { execFile } from "node:child_process";
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
import { promisify } from "node:util";
import { describe, expect, it, vi } from "vitest";
import {
  defaultConfig,
  loadConfig,
  extractTaskSuffix,
  type ResolvedProject,
} from "./core-imports.js";
import { readTask, renderTaskReadme } from "@agentplaneorg/core/tasks";

import { runCli } from "./run-cli.js";
import { getVersion } from "../meta/version.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
  loadPolicyTemplates,
} from "../agents/agents-template.js";
import { renderPolicyGatewayTemplateText } from "../shared/policy-gateway.js";
import {
  captureStdIO,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  createRecipeArchive,
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
import * as prompts from "./prompts.js";

function normalizeSlashes(value: string): string {
  return value.replaceAll("\\", "/");
}

installRunCliIntegrationHarness();

describe("runCli", () => {
  it("mode get prints workflow mode (default)", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["mode", "get", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("direct");
    } finally {
      io.restore();
    }
  });

  it("mode set persists workflow_mode and prints the new mode", async () => {
    const root = await mkGitRepoRoot();

    const io = captureStdIO();
    try {
      const code = await runCli(["mode", "set", "branch_pr", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("branch_pr");
    } finally {
      io.restore();
    }

    const workflowPath = path.join(root, ".agentplane", "WORKFLOW.md");
    const text = await readFile(workflowPath, "utf8");
    expect(text).toContain("mode: branch_pr");

    const io2 = captureStdIO();
    try {
      const code2 = await runCli(["mode", "get", "--root", root]);
      expect(code2).toBe(0);
      expect(io2.stdout.trim()).toBe("branch_pr");
    } finally {
      io2.restore();
    }
  });

  it("mode set syncs workflow artifacts when agent scaffolding exists", async () => {
    const root = await mkGitRepoRoot();
    await mkdir(path.join(root, ".agentplane", "agents"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "agents", "ORCHESTRATOR.json"), "{}\n", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["mode", "set", "branch_pr", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("branch_pr");
    } finally {
      io.restore();
    }

    const workflowText = await readFile(path.join(root, ".agentplane", "WORKFLOW.md"), "utf8");
    const lastKnownGoodText = await readFile(
      path.join(root, ".agentplane", "workflows", "last-known-good.md"),
      "utf8",
    );
    expect(workflowText).toContain("mode: branch_pr");
    expect(workflowText).toContain("Workflow mode: {{ workflow.mode }}");
    expect(lastKnownGoodText).toContain("mode: branch_pr");
  });

  it("mode set rejects invalid values", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["mode", "set", "nope", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Invalid value for mode");
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane mode set");
      expect(io.stderr).toContain("agentplane help mode set --compact");
    } finally {
      io.restore();
    }
  });

  it("ide sync writes Cursor and Windsurf rules from AGENTS.md", async () => {
    const root = await mkGitRepoRoot();
    await writeFile(path.join(root, "AGENTS.md"), "# Agents\n\nRules go here.\n", "utf8");
    await mkdir(path.join(root, ".agentplane", "agents"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "agents", "CODER.json"),
      JSON.stringify(
        {
          id: "CODER",
          role: "Implement approved task scope with the smallest coherent diff.",
          description: "Task-scoped implementation role.",
          inputs: ["Task id"],
          outputs: ["Scoped code changes"],
        },
        null,
        2,
      ) + "\n",
      "utf8",
    );

    const io = captureStdIO();
    try {
      const code = await runCli(["ide", "sync", "--root", root]);
      expect(code).toBe(0);
      const output = normalizeSlashes(io.stdout);
      expect(output).toContain(".cursor/rules/agentplane.mdc");
      expect(output).toContain(".windsurf/rules/agentplane.md");
    } finally {
      io.restore();
    }

    const cursorPath = path.join(root, ".cursor", "rules", "agentplane.mdc");
    const windsurfPath = path.join(root, ".windsurf", "rules", "agentplane.md");
    const cursorText = await readFile(cursorPath, "utf8");
    const windsurfText = await readFile(windsurfPath, "utf8");

    expect(cursorText).toContain("AUTOGENERATED by agentplane ide sync.");
    expect(cursorText).toContain("# Agents");
    expect(cursorText).toContain("## Synced Role Activation");
    expect(cursorText).toContain("### CODER");
    expect(cursorText).toContain(
      "Role: Implement approved task scope with the smallest coherent diff.",
    );
    expect(windsurfText).toBe(cursorText);
  });

  it("ide sync rejects unexpected args", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["ide", "sync", "extra", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Unexpected argument: extra");
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane ide sync");
      expect(io.stderr).toContain("agentplane help ide sync --compact");
    } finally {
      io.restore();
    }
  });

  it("init --yes creates baseline project files", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--yes", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const workflowPath = path.join(root, ".agentplane", "WORKFLOW.md");
    const backendPath = path.join(root, ".agentplane", "backends", "local", "backend.json");
    const redmineBackendPath = path.join(
      root,
      ".agentplane",
      "backends",
      "redmine",
      "backend.json",
    );
    const agentsPath = path.join(root, "AGENTS.md");
    const baselineAgentsPath = path.join(root, ".agentplane", ".upgrade", "baseline", "AGENTS.md");
    const baselineCoderPath = path.join(
      root,
      ".agentplane",
      ".upgrade",
      "baseline",
      "agents",
      "CODER.json",
    );
    const policyPath = path.join(root, ".agentplane", "policy", "workflow.md");
    const baselinePolicyPath = path.join(
      root,
      ".agentplane",
      ".upgrade",
      "baseline",
      "policy",
      "workflow.md",
    );
    expect(await pathExists(workflowPath)).toBe(true);
    expect(await pathExists(backendPath)).toBe(true);
    expect(await pathExists(redmineBackendPath)).toBe(false);
    expect(await pathExists(agentsPath)).toBe(true);
    expect(await pathExists(baselineAgentsPath)).toBe(true);
    expect(await pathExists(baselineCoderPath)).toBe(true);
    expect(await pathExists(policyPath)).toBe(true);
    expect(await pathExists(baselinePolicyPath)).toBe(true);
    expect(await readFile(baselineAgentsPath, "utf8")).toBe(await readFile(agentsPath, "utf8"));
    expect(await readFile(baselinePolicyPath, "utf8")).toBe(await readFile(policyPath, "utf8"));

    const { config } = await loadConfig(path.join(root, ".agentplane"));
    expect(config.workflow_mode).toBe("direct");
    expect(config.status_commit_policy).toBe("warn");
    expect(config.commit_automation).toBe("finish_only");
    expect(config.finish_auto_status_commit).toBe(false);
    expect(
      (config.close_commit as { direct_dirty_policy?: unknown } | undefined)?.direct_dirty_policy,
    ).toBe("allow_other_task_readmes");
    expect(
      normalizeSlashes(String((config.tasks_backend as Record<string, unknown>)?.config_path)),
    ).toBe(".agentplane/backends/local/backend.json");
    const execution = config.execution as Record<string, unknown>;
    expect(execution?.profile).toBe("balanced");
    expect(execution?.reasoning_effort).toBe("medium");

    const backendText = await readFile(backendPath, "utf8");
    const backend = JSON.parse(backendText) as Record<string, unknown>;
    expect(backend).toMatchObject({ id: "local", version: 1 });
    expect(backend).toHaveProperty("settings");
    expect(backend).not.toHaveProperty("module");
    expect(backend).not.toHaveProperty("class");

    const gitignorePath = path.join(root, ".gitignore");
    const gitignore = await readFile(gitignorePath, "utf8");
    expect(gitignore).toContain(".env");
    expect(gitignore).toContain(".agentplane/worktrees");
    expect(gitignore).toContain(".agentplane/cache");
    expect(gitignore).toContain(".agentplane/cache.sqlite");
    expect(gitignore).toContain(".agentplane/cache.sqlite-wal");
    expect(gitignore).toContain(".agentplane/cache.sqlite-shm");
    expect(gitignore).toContain(".agentplane/recipes-cache");
    expect(gitignore).toContain(".agentplane/.upgrade");
    expect(gitignore).toContain(".agentplane/.release");
    expect(gitignore).toContain(".agentplane/upgrade");
    expect(gitignore).toContain(".agentplane/tasks.json");

    const workflowText = await readFile(path.join(root, ".agentplane", "WORKFLOW.md"), "utf8");
    expect(workflowText).toContain('  - "**"');
    expect(workflowText).not.toContain("packages/**");
  });

  it("init --setup-profile vibecoder --yes applies compact autonomous defaults", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--yes", "--setup-profile", "vibecoder", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const workflowText = await readFile(path.join(root, ".agentplane", "WORKFLOW.md"), "utf8");
    expect(workflowText).toContain("require_plan: false");
    expect(workflowText).toContain("require_network: false");
    expect(workflowText).toContain("require_verify: false");
    expect(workflowText).toContain('profile: "aggressive"');

    const hookShimPath = path.join(root, ".agentplane", "bin", "agentplane");
    const commitMsgHookPath = path.join(root, ".git", "hooks", "commit-msg");
    expect(await pathExists(hookShimPath)).toBe(false);
    expect(await pathExists(commitMsgHookPath)).toBe(false);
  });

  it("init with cached recipes includes materialized recipe files in the install commit", async () => {
    const cacheRoot = await mkGitRepoRoot();
    await writeDefaultConfig(cacheRoot);
    const { archivePath, manifest } = await createRecipeArchive({
      id: "init-recipe",
      version: "0.4.0",
    });
    expect(
      await runCliSilent(["recipes", "install", "--path", archivePath, "--root", cacheRoot]),
    ).toBe(0);

    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const code = await runCli(["init", "--yes", "--recipes", String(manifest.id), "--root", root]);
    expect(code).toBe(0);

    const execFileAsync = promisify(execFile);
    const { stdout } = await execFileAsync("git", ["show", "--name-only", "--pretty=", "HEAD"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    expect(normalizeSlashes(stdout)).toContain(".agentplane/recipes/packages/init-recipe/");
  });

  it("init --gitignore-agents updates .gitignore and skips the install commit", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--yes", "--gitignore-agents", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const gitignorePath = path.join(root, ".gitignore");
    const gitignore = await readFile(gitignorePath, "utf8");
    expect(gitignore).toContain(".env");
    expect(gitignore).toContain(".agentplane/.upgrade");
    expect(gitignore).toContain(".agentplane/.release");
    expect(gitignore).toContain(".agentplane/tasks.json");
    expect(gitignore).toContain("AGENTS.md");
    expect(gitignore).toContain(".agentplane/agents/");
    expect(gitignore).toContain(".agentplane/policy/");

    const execFileAsync = promisify(execFile) as (
      file: string,
      args: readonly string[],
      opts: { cwd: string; env: NodeJS.ProcessEnv },
    ) => Promise<{ stdout: string; stderr: string }>;
    await expect(
      execFileAsync("git", ["rev-parse", "--verify", "HEAD"], { cwd: root, env: cleanGitEnv() }),
    ).rejects.toThrow();
  });

  it("init --yes leaves a clean tree in a fresh repository", async () => {
    const root = await mkTempDir();
    const originalEnv = {
      GIT_AUTHOR_NAME: process.env.GIT_AUTHOR_NAME,
      GIT_AUTHOR_EMAIL: process.env.GIT_AUTHOR_EMAIL,
      GIT_COMMITTER_NAME: process.env.GIT_COMMITTER_NAME,
      GIT_COMMITTER_EMAIL: process.env.GIT_COMMITTER_EMAIL,
    };
    process.env.GIT_AUTHOR_NAME = "Test User";
    process.env.GIT_AUTHOR_EMAIL = "test@example.com";
    process.env.GIT_COMMITTER_NAME = "Test User";
    process.env.GIT_COMMITTER_EMAIL = "test@example.com";

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--yes", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      process.env.GIT_AUTHOR_NAME = originalEnv.GIT_AUTHOR_NAME;
      process.env.GIT_AUTHOR_EMAIL = originalEnv.GIT_AUTHOR_EMAIL;
      process.env.GIT_COMMITTER_NAME = originalEnv.GIT_COMMITTER_NAME;
      process.env.GIT_COMMITTER_EMAIL = originalEnv.GIT_COMMITTER_EMAIL;
    }

    const execFileAsync = promisify(execFile);
    const { stdout } = await execFileAsync("git", ["status", "--short"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    expect(stdout.trim()).toBe("");
  });

  it("context init bootstraps AgentPlane in an empty directory", { timeout: 60_000 }, async () => {
    const root = await mkTempDir();
    const originalEnv = {
      GIT_AUTHOR_NAME: process.env.GIT_AUTHOR_NAME,
      GIT_AUTHOR_EMAIL: process.env.GIT_AUTHOR_EMAIL,
      GIT_COMMITTER_NAME: process.env.GIT_COMMITTER_NAME,
      GIT_COMMITTER_EMAIL: process.env.GIT_COMMITTER_EMAIL,
    };
    process.env.GIT_AUTHOR_NAME = "Test User";
    process.env.GIT_AUTHOR_EMAIL = "test@example.com";
    process.env.GIT_COMMITTER_NAME = "Test User";
    process.env.GIT_COMMITTER_EMAIL = "test@example.com";

    const io = captureStdIO();
    try {
      const code = await runCli(["context", "init", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("bootstrapping empty directory");
    } finally {
      io.restore();
      process.env.GIT_AUTHOR_NAME = originalEnv.GIT_AUTHOR_NAME;
      process.env.GIT_AUTHOR_EMAIL = originalEnv.GIT_AUTHOR_EMAIL;
      process.env.GIT_COMMITTER_NAME = originalEnv.GIT_COMMITTER_NAME;
      process.env.GIT_COMMITTER_EMAIL = originalEnv.GIT_COMMITTER_EMAIL;
    }

    expect(await pathExists(path.join(root, ".git"))).toBe(true);
    expect(await pathExists(path.join(root, ".agentplane", "WORKFLOW.md"))).toBe(true);
    expect(await pathExists(path.join(root, "AGENTS.md"))).toBe(true);
    expect(await pathExists(path.join(root, "context", "README.md"))).toBe(true);
    expect(
      await pathExists(path.join(root, ".agentplane", "context", "agentplane.context.yaml")),
    ).toBe(true);
  });

  it("context init remains idempotent in an initialized AgentPlane project", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    expect(await runCli(["init", "--yes", "--root", root])).toBe(0);
    expect(await runCli(["context", "init", "--root", root])).toBe(0);

    const io = captureStdIO();
    try {
      const code = await runCli(["context", "init", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("context already initialized");
      expect(io.stdout).not.toContain("bootstrapping empty directory");
    } finally {
      io.restore();
    }
  });

  it("context init rejects non-empty uninitialized directories", async () => {
    const root = await mkTempDir();
    await writeFile(path.join(root, "README.md"), "# Existing project\n", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["context", "init", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("only in an empty directory");
    } finally {
      io.restore();
    }

    expect(await pathExists(path.join(root, ".agentplane"))).toBe(false);
  });

  it("context init rejects empty nested directories inside a parent git repository", async () => {
    const parent = await mkTempDir();
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["init", "-b", "main"], { cwd: parent, env: cleanGitEnv() });
    const nested = path.join(parent, "packages", "api");
    await mkdir(nested, { recursive: true });

    const io = captureStdIO();
    try {
      const code = await runCli(["context", "init", "--root", nested]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("standalone empty directory");
      expect(io.stderr).toContain(await realpath(parent));
    } finally {
      io.restore();
    }

    expect(await pathExists(path.join(nested, ".git"))).toBe(false);
    expect(await pathExists(path.join(nested, ".agentplane"))).toBe(false);
  });

  it(
    "init --backend redmine leaves a clean tree in a fresh repository",
    { timeout: 60_000 },
    async () => {
      const root = await mkTempDir();
      const originalEnv = {
        GIT_AUTHOR_NAME: process.env.GIT_AUTHOR_NAME,
        GIT_AUTHOR_EMAIL: process.env.GIT_AUTHOR_EMAIL,
        GIT_COMMITTER_NAME: process.env.GIT_COMMITTER_NAME,
        GIT_COMMITTER_EMAIL: process.env.GIT_COMMITTER_EMAIL,
      };
      process.env.GIT_AUTHOR_NAME = "Test User";
      process.env.GIT_AUTHOR_EMAIL = "test@example.com";
      process.env.GIT_COMMITTER_NAME = "Test User";
      process.env.GIT_COMMITTER_EMAIL = "test@example.com";

      const io = captureStdIO();
      try {
        const code = await runCli(["init", "--yes", "--backend", "redmine", "--root", root]);
        expect(code).toBe(0);
      } finally {
        io.restore();
        process.env.GIT_AUTHOR_NAME = originalEnv.GIT_AUTHOR_NAME;
        process.env.GIT_AUTHOR_EMAIL = originalEnv.GIT_AUTHOR_EMAIL;
        process.env.GIT_COMMITTER_NAME = originalEnv.GIT_COMMITTER_NAME;
        process.env.GIT_COMMITTER_EMAIL = originalEnv.GIT_COMMITTER_EMAIL;
      }

      const execFileAsync = promisify(execFile);
      const { stdout } = await execFileAsync("git", ["status", "--short"], {
        cwd: root,
        env: cleanGitEnv(),
      });
      expect(stdout.trim()).toBe("");

      const { stdout: ignoredPath } = await execFileAsync("git", ["check-ignore", ".env"], {
        cwd: root,
        env: cleanGitEnv(),
      });
      expect(ignoredPath.trim()).toBe(".env");
    },
  );

  it("init --backend redmine sets backend config path", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--yes", "--backend", "redmine", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const localBackendPath = path.join(root, ".agentplane", "backends", "local", "backend.json");
    const redmineBackendPath = path.join(
      root,
      ".agentplane",
      "backends",
      "redmine",
      "backend.json",
    );
    const { config } = await loadConfig(path.join(root, ".agentplane"));
    expect(
      normalizeSlashes(String((config.tasks_backend as Record<string, unknown>)?.config_path)),
    ).toBe(".agentplane/backends/redmine/backend.json");
    expect(await pathExists(localBackendPath)).toBe(false);
    expect(await pathExists(redmineBackendPath)).toBe(true);
    const redmineText = await readFile(redmineBackendPath, "utf8");
    const redmine = JSON.parse(redmineText) as Record<string, unknown>;
    expect(redmine).toMatchObject({ id: "redmine", version: 1 });
    const settings = (redmine.settings ?? {}) as Record<string, unknown>;
    expect(settings.url).toBeUndefined();
    expect(settings.api_key).toBeUndefined();
    expect(settings.project_id).toBeUndefined();
    expect(settings.owner_agent).toBe("REDMINE");
    const dotEnvExamplePath = path.join(root, ".env.example");
    const dotEnvExampleText = await readFile(dotEnvExamplePath, "utf8");
    expect(dotEnvExampleText).toContain("AGENTPLANE_REDMINE_URL=https://redmine.example");
    expect(dotEnvExampleText).toContain("AGENTPLANE_REDMINE_API_KEY=replace-me");
    expect(dotEnvExampleText).toContain("AGENTPLANE_REDMINE_PROJECT_ID=replace-me");
    expect(dotEnvExampleText).toContain("AGENTPLANE_REDMINE_CUSTOM_FIELDS_TASK_ID=1");
    expect(dotEnvExampleText).toContain("AGENTPLANE_REDMINE_CUSTOM_FIELDS_CANONICAL_STATE=");
    expect(dotEnvExampleText).toContain("AGENTPLANE_REDMINE_OWNER_AGENT=REDMINE");
    const dotEnvPath = path.join(root, ".env");
    const dotEnvText = await readFile(dotEnvPath, "utf8");
    expect(dotEnvText).toContain("AGENTPLANE_REDMINE_URL=https://redmine.example");
  });

  it("init --backend redmine keeps existing .env untouched and writes .env.example", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    await writeFile(
      path.join(root, ".env"),
      "AGENTPLANE_REDMINE_URL=https://redmine.internal\nEXISTING=value\n",
      "utf8",
    );
    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--yes", "--backend", "redmine", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const dotEnvPath = path.join(root, ".env");
    const dotEnvText = await readFile(dotEnvPath, "utf8");
    expect(dotEnvText).toBe("AGENTPLANE_REDMINE_URL=https://redmine.internal\nEXISTING=value\n");
    const dotEnvExamplePath = path.join(root, ".env.example");
    const dotEnvExampleText = await readFile(dotEnvExamplePath, "utf8");
    expect(dotEnvExampleText).toContain("AGENTPLANE_REDMINE_URL=https://redmine.example");
    expect(dotEnvExampleText).toContain("AGENTPLANE_REDMINE_API_KEY=replace-me");
    expect(dotEnvExampleText).toContain("AGENTPLANE_REDMINE_PROJECT_ID=replace-me");
    expect(dotEnvExampleText).toContain("AGENTPLANE_REDMINE_CUSTOM_FIELDS_TASK_ID=1");
    expect(dotEnvExampleText).toContain("AGENTPLANE_REDMINE_CUSTOM_FIELDS_CANONICAL_STATE=");
  });

  it("init --backend cloud sets backend config path", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--yes", "--backend", "cloud", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const cloudBackendPath = path.join(root, ".agentplane", "backends", "cloud", "backend.json");
    const { config } = await loadConfig(path.join(root, ".agentplane"));
    expect(
      normalizeSlashes(String((config.tasks_backend as Record<string, unknown>)?.config_path)),
    ).toBe(".agentplane/backends/cloud/backend.json");
    expect(await pathExists(cloudBackendPath)).toBe(true);
    const cloudText = await readFile(cloudBackendPath, "utf8");
    const cloud = JSON.parse(cloudText) as Record<string, unknown>;
    expect(cloud).toMatchObject({ id: "cloud", version: 1 });
    const settings = (cloud.settings ?? {}) as Record<string, unknown>;
    expect(settings.cache_dir).toBe(".agentplane/tasks");
    expect(settings.stale_after_seconds).toBe(300);

    const dotEnvExampleText = await readFile(path.join(root, ".env.example"), "utf8");
    expect(dotEnvExampleText).toContain(
      "AGENTPLANE_CLOUD_ENDPOINT=https://agentplane-cloud.example",
    );
    expect(dotEnvExampleText).toContain("AGENTPLANE_CLOUD_TOKEN=replace-me");
    expect(dotEnvExampleText).toContain("AGENTPLANE_CLOUD_PROJECT_ID=replace-me");
    expect(dotEnvExampleText).toContain("AGENTPLANE_CLOUD_PROVIDER=");
  });

  it("init bootstraps git repo and commits install when git is missing", async () => {
    const root = await mkTempDir();
    const originalEnv = {
      GIT_AUTHOR_NAME: process.env.GIT_AUTHOR_NAME,
      GIT_AUTHOR_EMAIL: process.env.GIT_AUTHOR_EMAIL,
      GIT_COMMITTER_NAME: process.env.GIT_COMMITTER_NAME,
      GIT_COMMITTER_EMAIL: process.env.GIT_COMMITTER_EMAIL,
    };
    process.env.GIT_AUTHOR_NAME = "Test User";
    process.env.GIT_AUTHOR_EMAIL = "test@example.com";
    process.env.GIT_COMMITTER_NAME = "Test User";
    process.env.GIT_COMMITTER_EMAIL = "test@example.com";

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--yes", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      process.env.GIT_AUTHOR_NAME = originalEnv.GIT_AUTHOR_NAME;
      process.env.GIT_AUTHOR_EMAIL = originalEnv.GIT_AUTHOR_EMAIL;
      process.env.GIT_COMMITTER_NAME = originalEnv.GIT_COMMITTER_NAME;
      process.env.GIT_COMMITTER_EMAIL = originalEnv.GIT_COMMITTER_EMAIL;
    }

    const gitDir = path.join(root, ".git");
    expect(await pathExists(gitDir)).toBe(true);

    const execFileAsync = promisify(execFile);
    const { stdout: subject } = await execFileAsync("git", ["log", "-1", "--pretty=%s"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    expect(subject.trim()).toContain(`agentplane ${getVersion()}`);

    const { stdout: baseBranch } = await execFileAsync(
      "git",
      ["config", "--local", "--get", "agentplane.baseBranch"],
      { cwd: root, env: cleanGitEnv() },
    );
    expect(baseBranch.trim()).toBe("main");
  });

  it("init --dry-run --yes is pure for a fresh non-git directory", async () => {
    const root = await mkTempDir();
    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--dry-run", "--yes", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("AgentPlane init plan");
      expect(io.stdout).toContain("Git init: true");
    } finally {
      io.restore();
    }

    expect(await pathExists(path.join(root, ".git"))).toBe(false);
    expect(await pathExists(path.join(root, ".agentplane"))).toBe(false);
    expect(await pathExists(path.join(root, "AGENTS.md"))).toBe(false);
    expect(await pathExists(path.join(root, ".gitignore"))).toBe(false);
  });

  it("init --dry-run --backup does not create backups before apply", async () => {
    const root = await mkGitRepoRoot();
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    const configPath = path.join(root, ".agentplane", "config.json");
    await writeFile(configPath, '{"existing":true}\n', "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--dry-run", "--yes", "--backup", "--root", root]);
      expect(code).toBe(0);
      expect(normalizeSlashes(io.stdout)).toContain("backup_path .agentplane/config.json");
    } finally {
      io.restore();
    }

    expect(await readFile(configPath, "utf8")).toBe('{"existing":true}\n');
    const entries = await readdir(path.join(root, ".agentplane"));
    expect(entries.some((entry) => entry.includes(".bak"))).toBe(false);
  });

  it("init --dry-run reports conflicts without requiring a conflict strategy", async () => {
    const root = await mkGitRepoRoot();
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    const configPath = path.join(root, ".agentplane", "config.json");
    await writeFile(configPath, '{"existing":true}\n', "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--dry-run", "--yes", "--root", root, "--output", "json"]);
      expect(code).toBe(0);
      const envelope = JSON.parse(io.stdout) as {
        data?: { conflicts?: string[]; warnings?: string[]; effects?: { kind: string }[] };
      };
      expect(
        (envelope.data?.conflicts ?? []).map((conflict) => normalizeSlashes(conflict)),
      ).toContain(".agentplane/config.json");
      expect(envelope.data?.warnings).toContain(
        "Conflicts require --backup or --force before apply.",
      );
      expect(envelope.data?.effects?.some((effect) => effect.kind === "delete_path")).toBe(false);
      expect(envelope.data?.effects?.some((effect) => effect.kind === "backup_path")).toBe(false);
    } finally {
      io.restore();
    }

    expect(await readFile(configPath, "utf8")).toBe('{"existing":true}\n');
  });

  it("init --dry-run --yes --output json emits a stable plan envelope without writes", async () => {
    const root = await mkTempDir();
    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--dry-run", "--yes", "--root", root, "--output", "json"]);
      expect(code).toBe(0);
      const envelope = JSON.parse(io.stdout) as {
        data?: { schemaVersion?: string; effects?: { kind: string }[] };
      };
      expect(envelope.data?.schemaVersion).toBe("init-plan/v1");
      expect(envelope.data?.effects?.some((effect) => effect.kind === "git_init")).toBe(true);
    } finally {
      io.restore();
    }

    expect(await pathExists(path.join(root, ".git"))).toBe(false);
    expect(await pathExists(path.join(root, ".agentplane"))).toBe(false);
  });

  it("init --quick --tool cursor maps to guided plan fields and Cursor rules", async () => {
    const root = await mkTempDir();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "init",
        "--dry-run",
        "--yes",
        "--quick",
        "--tool",
        "cursor",
        "--root",
        root,
        "--output",
        "json",
      ]);
      expect(code).toBe(0);
      const envelope = JSON.parse(io.stdout) as {
        data?: {
          mode?: string;
          profile?: string;
          internalSetupProfile?: string;
          answers?: { policyGateway?: string; ide?: string };
        };
      };
      expect(envelope.data?.mode).toBe("quick");
      expect(envelope.data?.profile).toBe("team");
      expect(envelope.data?.internalSetupProfile).toBe("normal");
      expect(envelope.data?.answers).toMatchObject({ policyGateway: "codex", ide: "cursor" });
    } finally {
      io.restore();
    }

    expect(await pathExists(path.join(root, ".git"))).toBe(false);
    expect(await pathExists(path.join(root, ".agentplane"))).toBe(false);
  });

  it("init dry-run reports parent git context without writing nested state", async () => {
    const parent = await mkGitRepoRoot();
    const nested = path.join(parent, "packages", "api");
    await mkdir(nested, { recursive: true });
    const originalCwd = process.cwd();
    process.chdir(nested);
    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--dry-run", "--yes", "--output", "json"]);
      expect(code).toBe(0);
      const envelope = JSON.parse(io.stdout) as {
        data?: { context?: { parentGitRoot?: string | null } };
      };
      expect(envelope.data?.context?.parentGitRoot).toBe(await realpath(parent));
    } finally {
      io.restore();
      process.chdir(originalCwd);
    }

    expect(await pathExists(path.join(nested, ".git"))).toBe(false);
    expect(await pathExists(path.join(nested, ".agentplane"))).toBe(false);
  });

  it("init --no-input is an alias for --yes", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--no-input", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    expect(await pathExists(path.join(root, ".agentplane", "WORKFLOW.md"))).toBe(true);
  });
});
