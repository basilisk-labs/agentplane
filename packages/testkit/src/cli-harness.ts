import { execFile } from "node:child_process";
import { access, cp, mkdir, mkdtemp, readdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { afterAll, afterEach, beforeAll, beforeEach } from "vitest";

import { defaultConfig, saveConfig } from "@agentplaneorg/core/config";
import { readTask } from "@agentplaneorg/core/tasks";

import { runCli } from "./agentplane-internal.js";
import { resetRecipeArchiveCache } from "./cli-harness/recipe-archives.js";
import { captureStdIO, runCliSilent, silenceStdIO } from "./cli-harness/stdio.js";
import { removeTempRoot } from "./cli-harness/temp-root-cleanup.js";
import { installFakeGhPrLookup } from "./github-pr.js";
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
let harnessLifecycleRegistered = false;
const testEnvRestorations: (() => void | Promise<void>)[] = [];

function restoreEnvValue(name: string, value: string | undefined): void {
  if (value === undefined) {
    delete process.env[name];
  } else {
    process.env[name] = value;
  }
}

function registerTestTempPath(tempPath: string): void {
  testEnvRestorations.push(async () => {
    await removeTempRoot(tempPath);
  });
}

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

afterEach(async () => {
  const roots = [...testRoots];
  await Promise.all(
    roots.map(async (root) => {
      await removeTempRoot(root);
      testRoots.delete(root);
    }),
  );
});

afterAll(async () => {
  if (!gitTemplateRoot) return;
  await removeTempRoot(gitTemplateRoot);
  gitTemplateRoot = null;
  gitTemplatePromise = null;
});

export function registerAgentplaneHome(): void {
  harnessLifecycleRegistered = true;
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
      await removeTempRoot(agentplaneHome);
      agentplaneHome = null;
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
    for (const restore of testEnvRestorations.splice(0).toReversed()) await restore();
    await resetRecipeArchiveCache();
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
  await recordQualityReviewPass(root, taskId);
}

export async function recordQualityReviewPass(root: string, taskId: string): Promise<void> {
  const io = captureStdIO();
  let code: number;
  try {
    code = await runCli([
      "evaluator",
      "run",
      taskId,
      "--provenance",
      "evaluator_supplied",
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
  } finally {
    io.restore();
  }
  if (code !== 0) {
    throw new Error(
      `Failed to record quality review for ${taskId} (exit ${code}): ${io.stderr.trim()}`,
    );
  }
}

export async function prepareHostedIntegrateFixture(opts: {
  root: string;
  taskId: string;
  branch: string;
  scenarioName: string;
  protectedBase?: boolean;
  finalHeadSubject?: string;
}): Promise<{ headSha: string; logPath: string }> {
  if (!harnessLifecycleRegistered) {
    throw new Error(
      "prepareHostedIntegrateFixture requires installRunCliIntegrationHarness() lifecycle hooks",
    );
  }
  const env = cleanGitEnv();
  const { stdout: currentBranchRaw } = await execFileAsync("git", ["branch", "--show-current"], {
    cwd: opts.root,
    env,
  });
  const currentBranch = currentBranchRaw.trim();
  if (currentBranch !== opts.branch) {
    throw new Error(
      `prepareHostedIntegrateFixture must run on ${opts.branch} (current: ${currentBranch || "<detached>"})`,
    );
  }
  const { stdout: baselineStatusRaw } = await execFileAsync(
    "git",
    ["status", "--short", "--untracked-files=all"],
    { cwd: opts.root, env },
  );

  const runFixtureStep = async (label: string, args: string[]): Promise<void> => {
    const io = captureStdIO();
    let code: number;
    try {
      code = await runCli(args);
    } finally {
      io.restore();
    }
    if (code !== 0) {
      throw new Error(`${label} failed for ${opts.taskId} (exit ${code}): ${io.stderr.trim()}`);
    }
  };
  await runFixtureStep("Base branch pin", ["branch", "base", "set", "main", "--root", opts.root]);

  const publishRemote = await mkTempDir();
  registerTestTempPath(publishRemote);
  await execFileAsync("git", ["init", "--bare", "--quiet", publishRemote], {
    cwd: opts.root,
    env,
  });
  const remoteExists = await execFileAsync("git", ["remote", "get-url", "origin"], {
    cwd: opts.root,
    env,
  })
    .then(() => true)
    .catch(() => false);
  await execFileAsync(
    "git",
    remoteExists
      ? ["remote", "set-url", "origin", "https://github.com/example/repo.git"]
      : ["remote", "add", "origin", "https://github.com/example/repo.git"],
    { cwd: opts.root, env },
  );
  await execFileAsync("git", ["remote", "set-url", "--push", "origin", publishRemote], {
    cwd: opts.root,
    env,
  });

  const previousGhBin = process.env.AGENTPLANE_GH_BIN;
  const previousGhArgs = process.env.AGENTPLANE_GH_ARGS;
  const previousGhLog = process.env.AGENTPLANE_GH_LOG;
  const previousGhToken = process.env.GH_TOKEN;
  const previousGithubToken = process.env.GITHUB_TOKEN;
  testEnvRestorations.push(() => {
    restoreEnvValue("AGENTPLANE_GH_BIN", previousGhBin);
    restoreEnvValue("AGENTPLANE_GH_ARGS", previousGhArgs);
    restoreEnvValue("AGENTPLANE_GH_LOG", previousGhLog);
    restoreEnvValue("GH_TOKEN", previousGhToken);
    restoreEnvValue("GITHUB_TOKEN", previousGithubToken);
  });
  if (opts.protectedBase) {
    process.env.GH_TOKEN = "";
    process.env.GITHUB_TOKEN = "";
  }
  const activateFakeGh = (fakeGh: Awaited<ReturnType<typeof installFakeGhPrLookup>>): void => {
    process.env.AGENTPLANE_GH_BIN = process.execPath;
    process.env.AGENTPLANE_GH_ARGS = JSON.stringify([fakeGh.scriptPath]);
    process.env.AGENTPLANE_GH_LOG = fakeGh.logPath;
  };

  const { stdout: initialHeadRaw } = await execFileAsync("git", ["rev-parse", "HEAD"], {
    cwd: opts.root,
    env,
  });
  const initialFakeGh = await installFakeGhPrLookup({
    scenarioName: `${opts.scenarioName}-initial`,
    branch: opts.branch,
    headSha: initialHeadRaw.trim(),
  });
  registerTestTempPath(initialFakeGh.fakeBin);
  activateFakeGh(initialFakeGh);
  await runFixtureStep("Initial PR publication", [
    "pr",
    "open",
    opts.taskId,
    "--author",
    "CODER",
    "--branch",
    opts.branch,
    "--root",
    opts.root,
  ]);
  await commitPathsIfChanged(
    opts.root,
    [`.agentplane/tasks/${opts.taskId}`],
    `${opts.taskId} link hosted PR fixture`,
  );
  await runFixtureStep("Blueprint snapshot", [
    "blueprint",
    "snapshot",
    opts.taskId,
    "--root",
    opts.root,
  ]);
  await recordVerificationOk(opts.root, opts.taskId);
  await commitPathsIfChanged(
    opts.root,
    [`.agentplane/tasks/${opts.taskId}`],
    `${opts.taskId} refresh hosted verification fixture`,
  );

  const { stdout: implementationHeadRaw } = await execFileAsync("git", ["rev-parse", "HEAD"], {
    cwd: opts.root,
    env,
  });
  const implementationHead = implementationHeadRaw.trim();
  const reviewedSha = async (): Promise<string> => {
    const task = await readTask({ cwd: opts.root, rootOverride: opts.root, taskId: opts.taskId });
    const sha = task.frontmatter.quality_review?.evaluated_sha?.trim() ?? "";
    if (!sha) throw new Error(`Quality review SHA is missing for ${opts.taskId}`);
    return sha;
  };
  const closureArgs = (implementationCommit: string): string[] => [
    "finish",
    opts.taskId,
    "--author",
    "INTEGRATOR",
    "--body",
    "Verified: hosted integration fixture has exact upstream and provider evidence.",
    "--result",
    "pre-merge closure",
    "--commit",
    implementationHead,
    "--implementation-commit",
    implementationCommit,
    "--pre-merge-closure",
    "--base",
    "main",
    "--quiet",
    "--root",
    opts.root,
  ];
  await runFixtureStep("Pre-merge closure", closureArgs(await reviewedSha()));
  await runFixtureStep("Post-closure blueprint snapshot", [
    "blueprint",
    "snapshot",
    opts.taskId,
    "--root",
    opts.root,
  ]);
  await recordVerificationOk(opts.root, opts.taskId);
  const postClosurePaths = [`.agentplane/tasks/${opts.taskId}`];
  if (await pathExists(path.join(opts.root, ".agentplane", "policy", "incidents.md"))) {
    postClosurePaths.push(".agentplane/policy/incidents.md");
  }
  await commitPathsIfChanged(
    opts.root,
    postClosurePaths,
    `${opts.taskId} refresh post-closure quality fixture`,
  );
  await runFixtureStep("Fresh pre-merge closure", [
    ...closureArgs(await reviewedSha()),
    "--force",
    "--yes",
  ]);

  const { stdout: closureHeadRaw } = await execFileAsync("git", ["rev-parse", "HEAD"], {
    cwd: opts.root,
    env,
  });
  const publishFakeGh = await installFakeGhPrLookup({
    scenarioName: `${opts.scenarioName}-publish`,
    branch: opts.branch,
    headSha: closureHeadRaw.trim(),
  });
  registerTestTempPath(publishFakeGh.fakeBin);
  activateFakeGh(publishFakeGh);
  await runFixtureStep("Final PR publication", [
    "pr",
    "open",
    opts.taskId,
    "--author",
    "CODER",
    "--branch",
    opts.branch,
    "--root",
    opts.root,
  ]);
  await runFixtureStep("Final PR publication refresh", [
    "pr",
    "open",
    opts.taskId,
    "--author",
    "CODER",
    "--branch",
    opts.branch,
    "--root",
    opts.root,
  ]);
  if (opts.finalHeadSubject) {
    const finalSubjectFixturePath = `.agentplane/tasks/${opts.taskId}/pr/final-head-subject.fixture`;
    await writeFile(
      path.join(opts.root, finalSubjectFixturePath),
      `${opts.finalHeadSubject}\n`,
      "utf8",
    );
    await execFileAsync("git", ["add", "--", finalSubjectFixturePath], {
      cwd: opts.root,
      env,
    });
    await execFileAsync("git", ["commit", "--no-verify", "-m", opts.finalHeadSubject], {
      cwd: opts.root,
      env,
    });
    await execFileAsync(
      "git",
      ["push", "--no-verify", "origin", `HEAD:refs/heads/${opts.branch}`],
      {
        cwd: opts.root,
        env,
      },
    );
  }

  const { stdout: headRaw } = await execFileAsync("git", ["rev-parse", "HEAD"], {
    cwd: opts.root,
    env,
  });
  const headSha = headRaw.trim();
  const { stdout: upstreamRaw } = await execFileAsync(
    "git",
    ["rev-parse", `refs/remotes/origin/${opts.branch}`],
    { cwd: opts.root, env },
  );
  if (upstreamRaw.trim() !== headSha) {
    throw new Error(
      `Final hosted fixture head is unpublished for ${opts.taskId}: local=${headSha} upstream=${upstreamRaw.trim()}`,
    );
  }
  const { stdout: publishedRaw } = await execFileAsync(
    "git",
    ["ls-remote", "--heads", publishRemote, `refs/heads/${opts.branch}`],
    { cwd: opts.root, env },
  );
  const publishedHead = publishedRaw.trim().split(/\s+/, 1)[0] ?? "";
  if (publishedHead !== headSha) {
    throw new Error(
      `Final hosted fixture remote is stale for ${opts.taskId}: local=${headSha} remote=${publishedHead || "<missing>"}`,
    );
  }
  const { stdout: statusRaw } = await execFileAsync(
    "git",
    ["status", "--short", "--untracked-files=all"],
    { cwd: opts.root, env },
  );
  if (statusRaw.trim() !== baselineStatusRaw.trim()) {
    throw new Error(
      `Final hosted fixture changed unrelated status for ${opts.taskId}: before=${baselineStatusRaw.trim() || "<clean>"} after=${statusRaw.trim() || "<clean>"}`,
    );
  }

  const finalFakeGh = await installFakeGhPrLookup({
    scenarioName: `${opts.scenarioName}-final`,
    branch: opts.branch,
    headSha,
    ...(opts.protectedBase ? { protectedBranch: "main" } : {}),
  });
  registerTestTempPath(finalFakeGh.fakeBin);
  activateFakeGh(finalFakeGh);

  return { headSha, logPath: finalFakeGh.logPath };
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
