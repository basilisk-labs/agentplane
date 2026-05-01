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

describe("runCli hooks uninstall", { timeout: HOOKS_SUITE_TIMEOUT_MS }, () => {
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
});
