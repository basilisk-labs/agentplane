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
  extractTaskSuffix,
  loadConfig,
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
  it("init branch_pr defaults base branch to main in empty repo", { timeout: 60_000 }, async () => {
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
      const code = await runCli(["init", "--yes", "--workflow", "branch_pr", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      process.env.GIT_AUTHOR_NAME = originalEnv.GIT_AUTHOR_NAME;
      process.env.GIT_AUTHOR_EMAIL = originalEnv.GIT_AUTHOR_EMAIL;
      process.env.GIT_COMMITTER_NAME = originalEnv.GIT_COMMITTER_NAME;
      process.env.GIT_COMMITTER_EMAIL = originalEnv.GIT_COMMITTER_EMAIL;
    }

    const loaded = await loadConfig(path.join(root, ".agentplane"));
    expect(loaded.config.workflow_mode).toBe("branch_pr");

    const execFileAsync = promisify(execFile);
    const { stdout: baseBranch } = await execFileAsync(
      "git",
      ["config", "--local", "--get", "agentplane.baseBranch"],
      { cwd: root, env: cleanGitEnv() },
    );
    expect(baseBranch.trim()).toBe("main");
  });

  it("init in branch_pr skips hook enforcement for install commit", async () => {
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

    const cliPath = path.resolve(process.cwd(), "packages", "agentplane", "bin", "agentplane.js");
    const stubPath = path.join(root, "agentplane");
    const stubBody = ["#!/usr/bin/env sh", `exec node "${cliPath}" "$@"`, ""].join("\n");
    await writeFile(stubPath, stubBody, "utf8");
    await chmod(stubPath, 0o755);

    const originalPath = process.env.PATH;
    process.env.PATH = `${root}${path.delimiter}${originalPath ?? ""}`;

    const io = captureStdIO();
    try {
      const code = await runCli([
        "init",
        "--yes",
        "--workflow",
        "branch_pr",
        "--hooks",
        "yes",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      process.env.PATH = originalPath;
      process.env.GIT_AUTHOR_NAME = originalEnv.GIT_AUTHOR_NAME;
      process.env.GIT_AUTHOR_EMAIL = originalEnv.GIT_AUTHOR_EMAIL;
      process.env.GIT_COMMITTER_NAME = originalEnv.GIT_COMMITTER_NAME;
      process.env.GIT_COMMITTER_EMAIL = originalEnv.GIT_COMMITTER_EMAIL;
    }

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

  it("init branch_pr keeps current branch as base in existing repo when non-interactive", async () => {
    const root = await mkGitRepoRootWithBranch("trunk");
    await configureGitUser(root);

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--yes", "--workflow", "branch_pr", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const loaded = await loadConfig(path.join(root, ".agentplane"));
    expect(loaded.config.workflow_mode).toBe("branch_pr");

    const execFileAsync = promisify(execFile);
    const { stdout: baseBranch } = await execFileAsync(
      "git",
      ["config", "--local", "--get", "agentplane.baseBranch"],
      { cwd: root, env: cleanGitEnv() },
    );
    expect(baseBranch.trim()).toBe("trunk");
  });

  it("init pins base branch to current branch in existing repo", async () => {
    const root = await mkGitRepoRootWithBranch("trunk");
    await configureGitUser(root);

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--yes", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const loaded = await loadConfig(path.join(root, ".agentplane"));
    expect(loaded.config.workflow_mode).toBe("direct");

    const execFileAsync = promisify(execFile);
    const { stdout: baseBranch } = await execFileAsync(
      "git",
      ["config", "--local", "--get", "agentplane.baseBranch"],
      { cwd: root, env: cleanGitEnv() },
    );
    expect(baseBranch.trim()).toBe("trunk");
  });

  it("init writes AGENTS.md and agent templates for direct mode", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const template = await loadAgentsTemplate();
    const expectedAgents = filterAgentsByWorkflow(template, "direct");
    const templates = await loadAgentTemplates();
    const policyTemplates = await loadPolicyTemplates();

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--yes", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const agentsPath = path.join(root, "AGENTS.md");
    const agentsText = await readFile(agentsPath, "utf8");
    expect(agentsText).toBe(expectedAgents);
    expect(agentsText).toContain(
      "The guarded route is determined by `workflow.mode` in `.agentplane/WORKFLOW.md`;",
    );
    expect(agentsText).not.toContain("In this repository, `workflow_mode=branch_pr`");

    const agentsDir = path.join(root, ".agentplane", "agents");
    const entries = await readdir(agentsDir);
    const jsonEntries = entries.filter((entry) => entry.endsWith(".json"));
    expect(jsonEntries.toSorted()).toEqual(templates.map((entry) => entry.fileName).toSorted());

    for (const agent of templates) {
      const target = path.join(agentsDir, agent.fileName);
      const contents = await readFile(target, "utf8");
      expect(contents).toBe(renderPolicyGatewayTemplateText(agent.contents, "AGENTS.md"));
    }

    const policyDir = path.join(root, ".agentplane", "policy");
    for (const policy of policyTemplates) {
      const target = path.join(policyDir, policy.relativePath);
      const contents = await readFile(target, "utf8");
      const expected = policy.relativePath.endsWith(".md")
        ? renderPolicyGatewayTemplateText(policy.contents, "AGENTS.md")
        : policy.contents;
      expect(contents).toBe(expected);
    }
  });

  it("init --policy-gateway claude installs CLAUDE.md and rewrites gateway references", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const template = await loadAgentsTemplate();
    const expectedGateway = filterAgentsByWorkflow(
      renderPolicyGatewayTemplateText(template, "CLAUDE.md"),
      "direct",
    );

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--yes", "--policy-gateway", "claude", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const agentsPath = path.join(root, "AGENTS.md");
    const claudePath = path.join(root, "CLAUDE.md");
    const baselineClaudePath = path.join(root, ".agentplane", ".upgrade", "baseline", "CLAUDE.md");
    expect(await pathExists(agentsPath)).toBe(false);
    expect(await pathExists(claudePath)).toBe(true);
    expect(await pathExists(baselineClaudePath)).toBe(true);
    expect(await readFile(claudePath, "utf8")).toBe(expectedGateway);

    const orchestratorPath = path.join(root, ".agentplane", "agents", "ORCHESTRATOR.json");
    const orchestrator = await readFile(orchestratorPath, "utf8");
    expect(orchestrator).toContain("CLAUDE.md");
    expect(orchestrator).not.toContain("AGENTS.md");

    const workflowPath = path.join(root, ".agentplane", "policy", "workflow.md");
    const workflowText = await readFile(workflowPath, "utf8");
    expect(workflowText).toContain("Use `CLAUDE.md` load rules");
    expect(workflowText).not.toContain("AGENTS.md");

    const governancePath = path.join(root, ".agentplane", "policy", "governance.md");
    const governanceText = await readFile(governancePath, "utf8");
    expect(governanceText).toContain("`CLAUDE.md`");
    expect(governanceText).not.toContain("AGENTS.md or CLAUDE.md");

    const agentTemplates = await loadAgentTemplates();
    for (const agent of agentTemplates) {
      const agentText = await readFile(
        path.join(root, ".agentplane", "agents", agent.fileName),
        "utf8",
      );
      expect(agentText).not.toContain("AGENTS.md");
    }

    const policyTemplates = await loadPolicyTemplates();
    for (const policy of policyTemplates) {
      if (!policy.relativePath.endsWith(".md")) continue;
      const policyText = await readFile(
        path.join(root, ".agentplane", "policy", policy.relativePath),
        "utf8",
      );
      expect(policyText).not.toContain("AGENTS.md");
    }
  });

  it("init filters AGENTS.md for branch_pr mode", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const template = await loadAgentsTemplate();
    const expectedAgents = filterAgentsByWorkflow(template, "branch_pr");

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--yes", "--workflow", "branch_pr", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const agentsPath = path.join(root, "AGENTS.md");
    const agentsText = await readFile(agentsPath, "utf8");
    expect(agentsText).toBe(expectedAgents);
  });

  it("init applies workflow, installs hooks, and runs ide sync", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const stubPath = path.join(root, "agentplane");
    const stubBody = [
      "#!/usr/bin/env sh",
      'if [ "$1" = "hooks" ]; then',
      "  exit 0",
      "fi",
      "exit 0",
      "",
    ].join("\n");
    await writeFile(stubPath, stubBody, "utf8");
    await chmod(stubPath, 0o755);
    const originalPath = process.env.PATH;
    process.env.PATH = `${root}${path.delimiter}${originalPath ?? ""}`;
    const io = captureStdIO();
    try {
      const code = await runCli([
        "init",
        "--workflow",
        "branch_pr",
        "--ide",
        "cursor",
        "--hooks",
        "yes",
        "--require-plan-approval",
        "yes",
        "--require-network-approval",
        "no",
        "--require-verify-approval",
        "yes",
        "--execution-profile",
        "conservative",
        "--strict-unsafe-confirm",
        "true",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      process.env.PATH = originalPath;
      io.restore();
    }

    const { config } = await loadConfig(path.join(root, ".agentplane"));
    expect(config.workflow_mode).toBe("branch_pr");
    expect(config.status_commit_policy).toBe("confirm");
    expect(config.commit_automation).toBe("finish_only");
    expect(config.finish_auto_status_commit).toBe(false);
    expect(config.close_commit.direct_dirty_policy).toBe("allow_other_task_readmes");
    expect(config.agents.approvals.require_plan).toBe(true);
    expect(config.agents.approvals.require_network).toBe(false);
    expect(config.agents.approvals.require_verify).toBe(true);
    expect(config.execution.profile).toBe("conservative");
    expect(config.execution.reasoning_effort).toBe("high");
    expect(config.execution.unsafe_actions_requiring_explicit_user_ok).toContain(
      "Network actions when approvals are disabled.",
    );

    const cursorPath = path.join(root, ".cursor", "rules", "agentplane.mdc");
    const windsurfPath = path.join(root, ".windsurf", "rules", "agentplane.md");
    expect(await pathExists(cursorPath)).toBe(true);
    expect(await pathExists(windsurfPath)).toBe(false);

    const hooksDir = path.join(root, ".git", "hooks");
    const commitMsgPath = path.join(hooksDir, "commit-msg");
    const commitMsg = await readFile(commitMsgPath, "utf8");
    expect(commitMsg).toContain("agentplane-hook");

    const execFileAsync = promisify(execFile);
    const { stdout: stagedAfterInit } = await execFileAsync(
      "git",
      ["status", "--short", "--untracked-files=no"],
      {
        cwd: root,
        env: cleanGitEnv(),
      },
    );
    expect(stagedAfterInit.trim()).toBe("");

    const { stdout: commitFiles } = await execFileAsync(
      "git",
      ["show", "--name-only", "--pretty="],
      {
        cwd: root,
        env: cleanGitEnv(),
      },
    );
    expect(commitFiles).toContain(".agentplane/bin/agentplane");
  });

  it("init writes strict direct close dirt policy when requested", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "init",
        "--workflow",
        "direct",
        "--direct-close-dirty-policy",
        "strict",
        "--yes",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const { config } = await loadConfig(path.join(root, ".agentplane"));
    expect(config.close_commit.direct_dirty_policy).toBe("strict");
  });
});
