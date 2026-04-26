/* eslint-disable unicorn/prefer-export-from */
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
import { expect, it, vi } from "vitest";
import type { ResolvedProject } from "@agentplaneorg/core/project";
import { defaultConfig } from "@agentplaneorg/core/config";
import { extractTaskSuffix, validateCommitSubject } from "@agentplaneorg/core/commit";
import { readTask, renderTaskReadme } from "@agentplaneorg/core/tasks";

import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
  prompts,
  resolveUpdateCheckCachePath,
  runCli,
} from "./agentplane-internal.js";
import {
  approveTaskPlan,
  captureStdIO,
  cleanGitEnv,
  commitPathsIfChanged,
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
  installFakeGhPrApi,
  installFakeGhPrApiRequiringPublishedPacketHead,
  installFakeGhPrLookup,
  stubTaskBackend,
  writeConfig,
  writeDefaultConfig,
  recordVerificationOk,
} from "@agentplane/testkit";

installRunCliIntegrationHarness();

const PR_FLOW_INTEGRATION_TIMEOUT_MS = 180_000;
const PR_FLOW_LONG_TIMEOUT_MS = 240_000;

async function setConcreteVerifySteps(root: string, taskId: string): Promise<void> {
  await runCliSilent([
    "task",
    "doc",
    "set",
    taskId,
    "--section",
    "Verify Steps",
    "--text",
    "Run verify for this task. Expected: verification records successfully and PR artifacts stay coherent.",
    "--root",
    root,
  ]);
}

async function configurePushableOrigin(root: string): Promise<string> {
  const execFileAsync = promisify(execFile);
  const publishRemotePath = await mkdtemp(
    path.join(os.tmpdir(), "agentplane-pr-open-origin-push-"),
  );
  await execFileAsync("git", ["init", "--bare", publishRemotePath], {
    cwd: root,
    env: cleanGitEnv(),
  });
  await execFileAsync("git", ["remote", "set-url", "--push", "origin", publishRemotePath], {
    cwd: root,
    env: cleanGitEnv(),
  });
  return publishRemotePath;
}

export {
  PR_FLOW_INTEGRATION_TIMEOUT_MS,
  PR_FLOW_LONG_TIMEOUT_MS,
  approveTaskPlan,
  captureStdIO,
  chmod,
  cleanGitEnv,
  commitAll,
  commitPathsIfChanged,
  configureGitUser,
  configurePushableOrigin,
  createUpgradeBundle,
  defaultConfig,
  execFile,
  expect,
  extractTaskSuffix,
  filterAgentsByWorkflow,
  getAgentplaneHome,
  gitBranchExists,
  it,
  loadAgentTemplates,
  loadAgentsTemplate,
  mkdir,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  mkTempDir,
  mkdtemp,
  os,
  path,
  pathExists,
  promisify,
  prompts,
  readFile,
  readFileSync,
  readTask,
  realpath,
  readdir,
  recordVerificationOk,
  renderTaskReadme,
  resolveUpdateCheckCachePath,
  rm,
  runCli,
  runCliSilent,
  setConcreteVerifySteps,
  stageGitignoreIfPresent,
  stubTaskBackend,
  validateCommitSubject,
  vi,
  writeConfig,
  writeDefaultConfig,
  writeFile,
  installFakeGhPrApi,
  installFakeGhPrApiRequiringPublishedPacketHead,
  installFakeGhPrLookup,
};
export type { ResolvedProject };
