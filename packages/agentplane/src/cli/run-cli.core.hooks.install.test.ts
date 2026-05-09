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

describe("runCli hooks install", { timeout: HOOKS_SUITE_TIMEOUT_MS }, () => {
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
    expect(shim).toContain("AGENTPLANE_HOOK_ALLOW_GLOBAL");
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
});
