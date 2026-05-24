import { execFile } from "node:child_process";
import { access, cp, mkdir, mkdtemp, readdir, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { afterAll, afterEach, beforeAll, beforeEach } from "vitest";

import { defaultConfig, saveConfig } from "@agentplaneorg/core/config";

import { resetRecipeArchiveCache } from "./cli-harness/recipe-archives.js";
import { runCliSilent, silenceStdIO } from "./cli-harness/stdio.js";
import { makeTaskBackendDouble } from "./task.js";

export * from "./cli-harness/recipe-archives.js";
export * from "./cli-harness/stdio.js";
export * from "./runtime-env.js";

const execFileAsync = promisify(execFile);

let agentplaneHome: string | null = null;
const testRoots = new Set<string>();
const originalAgentplaneHome = process.env.AGENTPLANE_HOME;
const originalNoUpdateCheck = process.env.AGENTPLANE_NO_UPDATE_CHECK;
const originalGitAuthorName = process.env.GIT_AUTHOR_NAME;
const originalGitAuthorEmail = process.env.GIT_AUTHOR_EMAIL;
const originalGitCommitterName = process.env.GIT_COMMITTER_NAME;
const originalGitCommitterEmail = process.env.GIT_COMMITTER_EMAIL;
const originalHookRunner = process.env.AGENTPLANE_HOOK_RUNNER;
let gitTemplateRoot: string | null = null;
let gitTemplatePromise: Promise<string> | null = null;

async function ensureGitTemplateRoot(): Promise<string> {
  if (gitTemplateRoot) return gitTemplateRoot;
  gitTemplatePromise ??= (async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-git-template-"));
    await execFileAsync("git", ["init", "-q"], { cwd: root, env: cleanGitEnv() });
    await execFileAsync("git", ["config", "user.email", "agentplane-test@example.com"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["config", "user.name", "agentplane-test"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    return root;
  })();
  gitTemplateRoot = await gitTemplatePromise;
  return gitTemplateRoot;
}

async function copyDirContents(src: string, dest: string): Promise<void> {
  const entries = await readdir(src, { withFileTypes: true });
  await Promise.all(
    entries.map((entry) =>
      cp(path.join(src, entry.name), path.join(dest, entry.name), { recursive: true }),
    ),
  );
}

export function registerAgentplaneHome(): void {
  beforeAll(async () => {
    agentplaneHome = await mkdtemp(path.join(os.tmpdir(), "agentplane-home-"));
    process.env.AGENTPLANE_HOME = agentplaneHome;
    process.env.AGENTPLANE_NO_UPDATE_CHECK = "1";
    process.env.AGENTPLANE_HOOK_RUNNER ??= path.join(
      process.cwd(),
      "packages",
      "agentplane",
      "bin",
      "agentplane.js",
    );
    process.env.GIT_AUTHOR_NAME ??= "agentplane-test";
    process.env.GIT_AUTHOR_EMAIL ??= "agentplane-test@example.com";
    process.env.GIT_COMMITTER_NAME ??= "agentplane-test";
    process.env.GIT_COMMITTER_EMAIL ??= "agentplane-test@example.com";
  });

  afterAll(async () => {
    if (agentplaneHome) {
      await rm(agentplaneHome, { recursive: true, force: true });
    }
    if (originalAgentplaneHome === undefined) {
      delete process.env.AGENTPLANE_HOME;
    } else {
      process.env.AGENTPLANE_HOME = originalAgentplaneHome;
    }
    if (originalNoUpdateCheck === undefined) {
      delete process.env.AGENTPLANE_NO_UPDATE_CHECK;
    } else {
      process.env.AGENTPLANE_NO_UPDATE_CHECK = originalNoUpdateCheck;
    }
    if (originalGitAuthorName === undefined) delete process.env.GIT_AUTHOR_NAME;
    else process.env.GIT_AUTHOR_NAME = originalGitAuthorName;
    if (originalGitAuthorEmail === undefined) delete process.env.GIT_AUTHOR_EMAIL;
    else process.env.GIT_AUTHOR_EMAIL = originalGitAuthorEmail;
    if (originalGitCommitterName === undefined) delete process.env.GIT_COMMITTER_NAME;
    else process.env.GIT_COMMITTER_NAME = originalGitCommitterName;
    if (originalGitCommitterEmail === undefined) delete process.env.GIT_COMMITTER_EMAIL;
    else process.env.GIT_COMMITTER_EMAIL = originalGitCommitterEmail;
    if (originalHookRunner === undefined) delete process.env.AGENTPLANE_HOOK_RUNNER;
    else process.env.AGENTPLANE_HOOK_RUNNER = originalHookRunner;
  });

  afterEach(async () => {
    await resetRecipeArchiveCache();
    const roots = [...testRoots];
    testRoots.clear();
    await Promise.all(
      roots.map(async (root) => {
        await rm(path.join(root, ".agentplane", ".upgrade"), { recursive: true, force: true });
        await rm(path.join(root, ".agentplane", ".release"), { recursive: true, force: true });
      }),
    );
  });
}

export function installRunCliIntegrationHarness(): void {
  registerAgentplaneHome();
  let restoreStdIO: (() => void) | null = null;

  beforeEach(() => {
    restoreStdIO = silenceStdIO();
  });

  afterEach(() => {
    restoreStdIO?.();
    restoreStdIO = null;
  });
}

export function getAgentplaneHome(): string | null {
  return agentplaneHome;
}

export function stubTaskBackend(
  overrides: Parameters<typeof makeTaskBackendDouble>[0] = {},
): ReturnType<typeof makeTaskBackendDouble> {
  return makeTaskBackendDouble({
    id: "local",
    ...overrides,
  });
}

export async function mkGitRepoRoot(): Promise<string> {
  const template = await ensureGitTemplateRoot();
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
  await copyDirContents(template, root);
  testRoots.add(root);
  return root;
}

export async function mkTempDir(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
  testRoots.add(root);
  return root;
}

export async function writeDefaultConfig(root: string): Promise<void> {
  const agentplaneDir = path.join(root, ".agentplane");
  await mkdir(agentplaneDir, { recursive: true });
  await saveConfig(agentplaneDir, defaultConfig() as unknown as Record<string, unknown>);
}

export async function writeAndConfigureRoot(): Promise<string> {
  const root = await mkGitRepoRoot();
  await writeDefaultConfig(root);
  return root;
}

export async function approveTaskPlan(root: string, taskId: string): Promise<void> {
  await runCliSilent([
    "task",
    "plan",
    "set",
    taskId,
    "--text",
    "1) Do the work\n2) Verify the work",
    "--updated-by",
    "ORCHESTRATOR",
    "--root",
    root,
  ]);
  await runCliSilent([
    "task",
    "plan",
    "approve",
    taskId,
    "--by",
    "USER",
    "--note",
    "OK",
    "--root",
    root,
  ]);
}

export async function recordVerificationOk(root: string, taskId: string): Promise<void> {
  await runCliSilent([
    "task",
    "doc",
    "set",
    taskId,
    "--section",
    "Verify Steps",
    "--text",
    "Run verify for this task. Expected: verification records successfully.",
    "--root",
    root,
  ]);
  await runCliSilent([
    "verify",
    taskId,
    "--ok",
    "--by",
    "EVALUATOR",
    "--note",
    "Ok to integrate",
    "--quiet",
    "--root",
    root,
  ]);
  await runCliSilent([
    "evaluator",
    "run",
    taskId,
    "--verdict",
    "pass",
    "--summary",
    "Test harness quality review passed.",
    "--finding",
    "Harness fixture reviewed scope, verification state, and integration readiness.",
    "--evidence",
    `.agentplane/tasks/${taskId}/README.md`,
    "--root",
    root,
  ]);
}

export async function writeConfig(
  root: string,
  config: ReturnType<typeof defaultConfig>,
): Promise<void> {
  const agentplaneDir = path.join(root, ".agentplane");
  await mkdir(agentplaneDir, { recursive: true });
  await saveConfig(agentplaneDir, config as unknown as Record<string, unknown>);
}

export async function resetAgentplaneHomeRecipes(): Promise<void> {
  if (!agentplaneHome) return;
  await rm(path.join(agentplaneHome, "recipes-store"), { recursive: true, force: true });
  await rm(path.join(agentplaneHome, "recipes.json"), { force: true });
  await rm(path.join(agentplaneHome, "recipes-index.json"), { force: true });
}

export async function mkGitRepoRootWithBranch(branch: string): Promise<string> {
  const root = await mkGitRepoRoot();
  await execFileAsync("git", ["checkout", "-b", branch], { cwd: root, env: cleanGitEnv() });
  return root;
}

export async function configureGitUser(root: string): Promise<void> {
  await execFileAsync("git", ["config", "user.email", "test@example.com"], {
    cwd: root,
    env: cleanGitEnv(),
  });
  await execFileAsync("git", ["config", "user.name", "Test User"], {
    cwd: root,
    env: cleanGitEnv(),
  });
}

export function cleanGitEnv(): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = { ...process.env };
  delete env.GIT_DIR;
  delete env.GIT_WORK_TREE;
  delete env.GIT_COMMON_DIR;
  delete env.GIT_INDEX_FILE;
  delete env.GIT_OBJECT_DIRECTORY;
  delete env.GIT_ALTERNATE_OBJECT_DIRECTORIES;
  env.GIT_CONFIG_GLOBAL = "/dev/null";
  env.GIT_CONFIG_SYSTEM = "/dev/null";
  env.GIT_TERMINAL_PROMPT = "0";
  env.GIT_AUTHOR_NAME = env.GIT_AUTHOR_NAME ?? "Agentplane Test";
  env.GIT_AUTHOR_EMAIL = env.GIT_AUTHOR_EMAIL ?? "agentplane-test@example.com";
  env.GIT_COMMITTER_NAME = env.GIT_COMMITTER_NAME ?? "Agentplane Test";
  env.GIT_COMMITTER_EMAIL = env.GIT_COMMITTER_EMAIL ?? "agentplane-test@example.com";
  return env;
}

export async function pathExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function gitBranchExists(root: string, branch: string): Promise<boolean> {
  try {
    await execFileAsync("git", ["show-ref", "--verify", "--quiet", `refs/heads/${branch}`], {
      cwd: root,
      env: cleanGitEnv(),
    });
    return true;
  } catch (err) {
    const code = (err as { code?: number | string } | null)?.code;
    if (code === 1) return false;
    throw err;
  }
}

export async function commitAll(root: string, message: string): Promise<void> {
  await execFileAsync("git", ["add", "."], { cwd: root, env: cleanGitEnv() });
  await execFileAsync("git", ["commit", "--no-verify", "-m", message], {
    cwd: root,
    env: cleanGitEnv(),
  });
}

export async function commitPathsIfChanged(
  root: string,
  paths: string[],
  message: string,
): Promise<boolean> {
  await execFileAsync("git", ["add", "--", ...paths], { cwd: root, env: cleanGitEnv() });
  const { stdout } = await execFileAsync(
    "git",
    ["diff", "--cached", "--name-only", "--", ...paths],
    {
      cwd: root,
      env: cleanGitEnv(),
    },
  );
  if (!stdout.trim()) return false;
  await execFileAsync("git", ["commit", "--no-verify", "-m", message], {
    cwd: root,
    env: cleanGitEnv(),
  });
  return true;
}

export async function stageGitignoreIfPresent(root: string): Promise<void> {
  const gitignorePath = path.join(root, ".gitignore");
  if (!(await pathExists(gitignorePath))) return;
  await execFileAsync("git", ["add", ".gitignore"], { cwd: root, env: cleanGitEnv() });
}
