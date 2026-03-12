/* eslint-disable @typescript-eslint/no-unused-vars */
import { execFile } from "node:child_process";
import { readFileSync } from "node:fs";
import {
  chmod,
  copyFile,
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
  readTask,
  renderTaskReadme,
  type ResolvedProject,
} from "@agentplaneorg/core";

import { runCli } from "./run-cli.js";
import { BUNDLED_RECIPES_CATALOG } from "../recipes/bundled-recipes.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
} from "../agents/agents-template.js";
import * as taskBackend from "../backends/task-backend.js";
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
} from "./run-cli.test-helpers.js";
import { resolveUpdateCheckCachePath } from "./update-check.js";
import * as prompts from "./prompts.js";

installRunCliIntegrationHarness();

describe("runCli", () => {
  it("branch base get fails when base branch is not pinned", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["branch", "base", "get", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Base branch is not pinned");
    } finally {
      io.restore();
    }
  });

  it("branch base get maps errors for non-git roots", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "config.json"), "{}", "utf8");
    const io = captureStdIO();
    try {
      const code = await runCli(["branch", "base", "get", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

  it("branch base set writes git config and returns value", async () => {
    const root = await mkGitRepoRoot();
    const io1 = captureStdIO();
    try {
      const code1 = await runCli(["branch", "base", "set", "develop", "--root", root]);
      expect(code1).toBe(0);
      expect(io1.stdout.trim()).toBe("develop");
    } finally {
      io1.restore();
    }

    const io2 = captureStdIO();
    try {
      const code2 = await runCli(["branch", "base", "get", "--root", root]);
      expect(code2).toBe(0);
      expect(io2.stdout.trim()).toBe("develop");
    } finally {
      io2.restore();
    }
  });

  it("branch base set --current pins the current branch", async () => {
    const root = await mkGitRepoRootWithBranch("feature");
    const io1 = captureStdIO();
    try {
      const code1 = await runCli(["branch", "base", "set", "--current", "--root", root]);
      expect(code1).toBe(0);
      expect(io1.stdout.trim()).toBe("feature");
    } finally {
      io1.restore();
    }

    const io2 = captureStdIO();
    try {
      const code2 = await runCli(["branch", "base", "get", "--root", root]);
      expect(code2).toBe(0);
      expect(io2.stdout.trim()).toBe("feature");
    } finally {
      io2.restore();
    }
  });

  it("branch base clear removes pinned base", async () => {
    const root = await mkGitRepoRoot();
    await runCliSilent(["branch", "base", "set", "develop", "--root", root]);

    const io1 = captureStdIO();
    try {
      const code1 = await runCli(["branch", "base", "clear", "--root", root]);
      expect(code1).toBe(0);
      expect(io1.stdout.trim()).toBe("cleared");
    } finally {
      io1.restore();
    }

    const io2 = captureStdIO();
    try {
      const code2 = await runCli(["branch", "base", "get", "--root", root]);
      expect(code2).toBe(2);
      expect(io2.stderr).toContain("Base branch is not pinned");
    } finally {
      io2.restore();
    }
  });

  it("branch base explain prints current, pinned, and effective base", async () => {
    const root = await mkGitRepoRootWithBranch("feature");
    const execFileAsync = promisify(execFile);
    await configureGitUser(root);
    await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });
    await execFileAsync("git", ["branch", "main"], { cwd: root }).catch(() => null);
    await execFileAsync("git", ["config", "--local", "--unset-all", "agentplane.baseBranch"], {
      cwd: root,
    }).catch(() => null);
    await execFileAsync("git", ["config", "--local", "agentplane.baseBranch", "main"], {
      cwd: root,
    });

    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const io = captureStdIO();
    try {
      const code = await runCli(["branch", "base", "explain", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("current_branch=feature");
      expect(io.stdout).toContain("pinned_base=main");
      expect(io.stdout).toContain("effective_base=main");
    } finally {
      io.restore();
    }
  }, 60_000);

  it("branch base set maps errors for non-git roots", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "config.json"), "{}", "utf8");
    const io = captureStdIO();
    try {
      const code = await runCli(["branch", "base", "set", "main", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

  it("branch base set rejects blank values", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["branch", "base", "set", "   ", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane branch base");
    } finally {
      io.restore();
    }
  });

  it("branch base set requires a value", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["branch", "base", "set", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane branch base");
    } finally {
      io.restore();
    }
  });

  it("branch base rejects unknown subcommands", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["branch", "base", "nope", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane branch base");
    } finally {
      io.restore();
    }
  });
});
