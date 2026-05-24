/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe } from "vitest";

import {
  PR_FLOW_INTEGRATION_TIMEOUT_MS,
  PR_FLOW_LONG_TIMEOUT_MS,
  approveTaskPlan,
  branchPrArtifactFixture,
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

describe("runCli pr open flow artifacts", { timeout: PR_FLOW_INTEGRATION_TIMEOUT_MS }, () => {
  it("pr open creates PR artifacts", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open task",
        "--description",
        "PR open creates artifacts",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "open",
        taskId,
        "--author",
        "CODER",
        "--branch",
        `task/${taskId}/pr-open`,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ pr open");
      expect(io.stdout).toContain(
        "local PR artifacts synced; remote PR creation staged (GitHub origin repo unavailable)",
      );
    } finally {
      io.restore();
    }

    const prArtifacts = branchPrArtifactFixture(root, taskId);
    const meta = await prArtifacts.readMeta<{
      task_id?: string;
      branch?: string;
      artifact_state?: string;
      artifact_state_reason?: string;
    }>();
    expect(meta.task_id).toBe(taskId);
    expect(meta.branch).toBe(`task/${taskId}/pr-open`);
    expect(meta.artifact_state).toBe("remote_staged");
    expect(meta.artifact_state_reason).toBe("GitHub origin repo unavailable");
    const review = await prArtifacts.readReview();
    const notesExists = await pathExists(prArtifacts.notesPath);
    const verifyLogExists = await pathExists(prArtifacts.verifyLogPath);
    expect(review).toContain("## Task");
    expect(review).toContain("## Verification");
    if (notesExists) {
      expect(review).toContain("## Handoff Notes");
      expect(await readFile(prArtifacts.notesPath, "utf8")).toBe("");
    }
    await readFile(prArtifacts.diffstatPath, "utf8");
    if (verifyLogExists) {
      await readFile(prArtifacts.verifyLogPath, "utf8");
    }
    expect(await readFile(prArtifacts.githubTitlePath, "utf8")).toContain(`[${taskId}]`);
    expect(await prArtifacts.readGithubBody()).toContain("## Verification");
    expect(await prArtifacts.readGithubBody()).not.toContain("## Risks");
  });

  it("pr open does not amend refreshed artifacts into an existing task-only commit", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);

    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open keeps task commits separate",
        "--description",
        "Opening PR artifacts after a task-only commit should add a separate artifact commit.",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    const branch = `task/${taskId}/open-task-only-artifacts`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    const suffix = extractTaskSuffix(taskId);

    await runCliSilent([
      "task",
      "doc",
      "set",
      taskId,
      "--section",
      "Findings",
      "--text",
      "- task-only note",
      "--root",
      root,
    ]);
    await runCliSilent([
      "commit",
      taskId,
      "-m",
      `🛠️ ${suffix} task: task-only artifact refresh`,
      "--allow-tasks",
      "--root",
      root,
    ]);

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
        "--sync-only",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const { stdout: subjectsOut } = await execFileAsync("git", ["log", "-2", "--pretty=%s"], {
      cwd: root,
    });
    const subjects = subjectsOut
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    expect(subjects[0]).toBe(`🧩 ${suffix} task: refresh task artifacts after commit`);
    expect(subjects[1]).toBe(`🛠️ ${suffix} task: task-only artifact refresh`);

    const { stdout: commitCountOut } = await execFileAsync(
      "git",
      ["rev-list", "--count", "main..HEAD"],
      { cwd: root },
    );
    expect(commitCountOut.trim()).toBe("2");
  });

  it("pr open renders diffstat immediately when the task branch already has changes", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);
    const execFileAsync = promisify(execFile);

    await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open existing branch diffstat",
        "--description",
        "PR open should render the current branch diffstat without waiting for pr update",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const branch = `task/${taskId}/pr-open-existing-diffstat`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await writeFile(path.join(root, "change.txt"), "change", "utf8");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "task branch change"], { cwd: root });

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
      expect(io.stdout).toContain("✅ pr open");
    } finally {
      io.restore();
    }

    const prArtifacts = branchPrArtifactFixture(root, taskId);
    const diffstat = await readFile(prArtifacts.diffstatPath, "utf8");
    const review = await prArtifacts.readReview();
    const githubBody = await prArtifacts.readGithubBody();

    expect(diffstat).toContain("change.txt");
    expect(review).toContain("change.txt");
    expect(githubBody).toContain("change.txt");
    expect(review).not.toContain("No changes detected.");
    expect(githubBody).not.toContain("No changes detected.");
  });
});
