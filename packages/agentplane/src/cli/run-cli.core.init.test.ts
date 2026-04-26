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
import { defaultConfig, extractTaskSuffix, type ResolvedProject } from "./core-imports.js";
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

    const configPath = path.join(root, ".agentplane", "config.json");
    const text = await readFile(configPath, "utf8");
    expect(text).toContain('"workflow_mode": "branch_pr"');

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
    expect(workflowText).toContain('mode: "branch_pr"');
    expect(workflowText).toContain("Workflow mode: branch_pr");
    expect(lastKnownGoodText).toContain('mode: "branch_pr"');
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

    const configPath = path.join(root, ".agentplane", "config.json");
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
    expect(await pathExists(configPath)).toBe(true);
    expect(await pathExists(backendPath)).toBe(true);
    expect(await pathExists(redmineBackendPath)).toBe(false);
    expect(await pathExists(agentsPath)).toBe(true);
    expect(await pathExists(baselineAgentsPath)).toBe(true);
    expect(await pathExists(baselineCoderPath)).toBe(true);
    expect(await pathExists(policyPath)).toBe(true);
    expect(await pathExists(baselinePolicyPath)).toBe(true);
    expect(await readFile(baselineAgentsPath, "utf8")).toBe(await readFile(agentsPath, "utf8"));
    expect(await readFile(baselinePolicyPath, "utf8")).toBe(await readFile(policyPath, "utf8"));

    const configText = await readFile(configPath, "utf8");
    const config = JSON.parse(configText) as Record<string, unknown>;
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

    const configPath = path.join(root, ".agentplane", "config.json");
    const configText = await readFile(configPath, "utf8");
    expect(configText).toContain('"require_plan": false');
    expect(configText).toContain('"require_network": false');
    expect(configText).toContain('"require_verify": false');
    expect(configText).toContain('"profile": "aggressive"');

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

    const configPath = path.join(root, ".agentplane", "config.json");
    const localBackendPath = path.join(root, ".agentplane", "backends", "local", "backend.json");
    const redmineBackendPath = path.join(
      root,
      ".agentplane",
      "backends",
      "redmine",
      "backend.json",
    );
    const configText = await readFile(configPath, "utf8");
    const config = JSON.parse(configText) as Record<string, unknown>;
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
});
