/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe } from "vitest";

import {
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
  type ResolvedProject,
} from "@agentplane/testkit/cli-core-pr-flow";

async function seedGitBase(root: string): Promise<void> {
  await configureGitUser(root);
  const execFileAsync = promisify(execFile);
  await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
  await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });
}

describe("runCli pr open flow network gates", { timeout: PR_FLOW_INTEGRATION_TIMEOUT_MS }, () => {
  it("pr open resolves an exact-SHA Task base to main for the remote GitHub PR", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await seedGitBase(root);
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["remote", "add", "origin", "https://github.com/example/repo.git"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await configurePushableOrigin(root);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await execFileAsync("git", ["commit", "--allow-empty", "-m", "chore test setup"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["push", "origin", "main"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const { stdout: baseStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const baseSha = baseStdout.trim();

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open remote create",
        "--description",
        "PR open should create a remote PR when GitHub is available",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "github",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const frozenTask = await readTask({ cwd: root, rootOverride: root, taskId });
    const executionContext = frozenTask.frontmatter.extensions?.task_execution_context as
      | Record<string, unknown>
      | undefined;
    await writeFile(
      frozenTask.readmePath,
      renderTaskReadme(
        {
          ...frozenTask.frontmatter,
          extensions: {
            ...frozenTask.frontmatter.extensions,
            task_execution_context: {
              ...executionContext,
              schema_version: 1,
              base_ref: baseSha,
              base_sha: baseSha,
            },
          },
        },
        frozenTask.body,
      ),
      "utf8",
    );

    const branch = `task/${taskId}/remote-create`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root, env: cleanGitEnv() });
    await execFileAsync("git", ["commit", "--allow-empty", "-m", "chore branch publish seed"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const { fakeBin, logPath } = await installFakeGhPrApi({
      scenarioName: "open-create",
      branch,
      createResponse: {
        number: 654,
        html_url: "https://github.com/example/repo/pull/654",
        state: "open",
        merged_at: null,
        merge_commit_sha: null,
        head: { sha: "remote-head-sha" },
        base: { ref: "main" },
      },
    });
    const originalPath = process.env.PATH;
    process.env.PATH = `${fakeBin}${path.delimiter}${originalPath ?? ""}`;
    process.env.AGENTPLANE_GH_LOG = logPath;

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "open",
        taskId,
        "--author",
        "CODER",
        "--branch",
        branch,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("created GitHub PR #654");
      expect(io.stdout).toContain("https://github.com/example/repo/pull/654");
    } finally {
      io.restore();
      process.env.PATH = originalPath;
      delete process.env.AGENTPLANE_GH_LOG;
    }

    const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    const meta = JSON.parse(await readFile(metaPath, "utf8")) as {
      pr_number?: number;
      pr_url?: string;
      status?: string;
      head_sha?: string;
    };
    expect(meta.pr_number).toBe(654);
    expect(meta.pr_url).toBe("https://github.com/example/repo/pull/654");
    expect(meta.status).toBe("OPEN");
    expect(meta.head_sha).toBeUndefined();

    const taskAfterOpen = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(taskAfterOpen.frontmatter.extensions?.task_execution_context).toMatchObject({
      base_ref: baseSha,
      base_sha: baseSha,
    });

    const logText = await readFile(logPath, "utf8");
    const log = logText
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line) as string[]);
    expect(
      log.some(
        (args) =>
          args[0] === "api" &&
          args[1] === "repos/example/repo/pulls" &&
          args.includes("-X") &&
          args.includes("POST"),
      ),
    ).toBe(true);
    expect(
      log.some(
        (args) =>
          args[0] === "api" &&
          args[1]?.startsWith("repos/example/repo/pulls?") === true &&
          new URL(`https://example.invalid/${args[1]}`).searchParams.get("base") === "main",
      ),
    ).toBe(true);
    expect(log.some((args) => args.some((arg) => arg.includes(`base=${baseSha}`)))).toBe(false);
  });

  it("pr open marks remote creation failures explicitly in pr metadata", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await seedGitBase(root);
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["remote", "add", "origin", "https://github.com/example/repo.git"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await configurePushableOrigin(root);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open remote creation failure",
        "--description",
        "PR open should persist a failed remote creation state when GitHub rejects PR creation.",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "github",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const branch = `task/${taskId}/remote-create-failure`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root, env: cleanGitEnv() });
    await execFileAsync("git", ["commit", "--allow-empty", "-m", "chore branch publish seed"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const { fakeBin } = await installFakeGhPrApi({
      scenarioName: "open-create-failure",
      branch,
      createResponse: {},
      createError: "HTTP 403: GitHub auth unavailable",
    });
    const originalPath = process.env.PATH;
    process.env.PATH = `${fakeBin}${path.delimiter}${originalPath ?? ""}`;

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "open",
        taskId,
        "--author",
        "CODER",
        "--branch",
        branch,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("remote change-request creation failed");
    } finally {
      io.restore();
      process.env.PATH = originalPath;
    }

    const meta = JSON.parse(
      await readFile(path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json"), "utf8"),
    ) as { artifact_state?: string; artifact_state_reason?: string };
    expect(meta.artifact_state).toBe("remote_failed");
    expect(meta.artifact_state_reason).toBe("GitHub auth or permissions unavailable");
  });

  it("pr open ignores dotenv-injected GitHub tokens when gh auth is otherwise available", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await seedGitBase(root);
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["remote", "add", "origin", "https://github.com/example/repo.git"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await configurePushableOrigin(root);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open dotenv auth drift",
        "--description",
        "PR open should ignore dotenv-injected GitHub auth that would override gh login",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "github",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const branch = `task/${taskId}/dotenv-auth`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root, env: cleanGitEnv() });
    await execFileAsync("git", ["commit", "--allow-empty", "-m", "chore branch publish seed"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const { fakeBin, logPath } = await installFakeGhPrApi({
      scenarioName: "open-dotenv-auth",
      branch,
      rejectEnvKey: "GITHUB_TOKEN",
      rejectEnvValue: "dotenv-bad-token",
      createResponse: {
        number: 655,
        html_url: "https://github.com/example/repo/pull/655",
        state: "open",
        merged_at: null,
        merge_commit_sha: null,
        head: { sha: "remote-head-sha" },
        base: { ref: "main" },
      },
    });
    const originalPath = process.env.PATH;
    const originalGithubToken = process.env.GITHUB_TOKEN;
    const originalDotenvKeys = process.env.AGENTPLANE_DOTENV_LOADED_KEYS;
    process.env.PATH = `${fakeBin}${path.delimiter}${originalPath ?? ""}`;
    process.env.AGENTPLANE_GH_LOG = logPath;
    process.env.GITHUB_TOKEN = "dotenv-bad-token";
    process.env.AGENTPLANE_DOTENV_LOADED_KEYS = "GITHUB_TOKEN";

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "open",
        taskId,
        "--author",
        "CODER",
        "--branch",
        branch,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("created GitHub PR #655");
      expect(io.stdout).not.toContain("remote PR creation staged");
    } finally {
      io.restore();
      process.env.PATH = originalPath;
      delete process.env.AGENTPLANE_GH_LOG;
      if (originalGithubToken === undefined) delete process.env.GITHUB_TOKEN;
      else process.env.GITHUB_TOKEN = originalGithubToken;
      if (originalDotenvKeys === undefined) delete process.env.AGENTPLANE_DOTENV_LOADED_KEYS;
      else process.env.AGENTPLANE_DOTENV_LOADED_KEYS = originalDotenvKeys;
    }

    const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    const meta = JSON.parse(await readFile(metaPath, "utf8")) as {
      pr_number?: number;
      pr_url?: string;
      status?: string;
      head_sha?: string;
    };
    expect(meta.pr_number).toBe(655);
    expect(meta.pr_url).toBe("https://github.com/example/repo/pull/655");
    expect(meta.status).toBe("OPEN");
    expect(meta.head_sha).toBeUndefined();
  });
});
