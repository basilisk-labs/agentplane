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

describe("runCli PR validation and hydration flow (pr update scenarios)", () => {
  it("pr update hydrates existing GitHub PR state into previously local-only artifacts", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR update hydrates existing PR",
        "--description",
        "PR update should discover an already-existing remote PR for the branch",
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

    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    const branch = `task/${taskId}/existing-pr-update`;
    await runCliSilent([
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

    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["remote", "add", "origin", "https://github.com/example/repo.git"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const { fakeBin, logPath } = await installFakeGhPrLookup({
      scenarioName: "update-existing",
      branch,
      state: "closed",
      mergedAt: "2026-04-07T22:00:00.000Z",
      mergeCommitSha: "1234567890abcdef1234567890abcdef12345678",
    });
    const originalPath = process.env.PATH;
    process.env.PATH = `${fakeBin}${path.delimiter}${originalPath ?? ""}`;
    process.env.AGENTPLANE_GH_LOG = logPath;

    try {
      const code = await runCli(["pr", "update", taskId, "--root", root]);
      expect(code).toBe(0);
    } finally {
      process.env.PATH = originalPath;
      delete process.env.AGENTPLANE_GH_LOG;
    }

    const meta = JSON.parse(
      await readFile(path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json"), "utf8"),
    ) as {
      pr_number?: number;
      pr_url?: string;
      status?: string;
      merged_at?: string;
      merge_commit?: string;
    };
    expect(meta.pr_number).toBe(321);
    expect(meta.pr_url).toBe("https://github.com/example/repo/pull/321");
    expect(meta.status).toBe("MERGED");
    expect(meta.merged_at).toBe("2026-04-07T22:00:00.000Z");
    expect(meta.merge_commit).toBe("1234567890abcdef1234567890abcdef12345678");

    const rawLog = await readFile(logPath, "utf8");
    expect(rawLog).toContain(`head=example%3Atask%2F${taskId}%2Fexisting-pr-update`);
  });

  it("pr update hydrates an existing open GitHub PR identity", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR update hydrates open PR",
        "--description",
        "PR update should persist an existing OPEN remote PR identity for the branch",
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

    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    const branch = `task/${taskId}/existing-open-pr-update`;
    await runCliSilent([
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

    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["remote", "add", "origin", "https://github.com/example/repo.git"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const { fakeBin, logPath } = await installFakeGhPrLookup({
      scenarioName: "update-existing-open",
      branch,
      state: "open",
    });
    const originalPath = process.env.PATH;
    process.env.PATH = `${fakeBin}${path.delimiter}${originalPath ?? ""}`;
    process.env.AGENTPLANE_GH_LOG = logPath;

    try {
      const code = await runCli(["pr", "update", taskId, "--root", root]);
      expect(code).toBe(0);
    } finally {
      process.env.PATH = originalPath;
      delete process.env.AGENTPLANE_GH_LOG;
    }

    const meta = JSON.parse(
      await readFile(path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json"), "utf8"),
    ) as {
      pr_number?: number;
      pr_url?: string;
      status?: string;
      head_sha?: string;
      merged_at?: string;
      merge_commit?: string;
      artifact_state?: string;
    };
    expect(meta.pr_number).toBe(321);
    expect(meta.pr_url).toBe("https://github.com/example/repo/pull/321");
    expect(meta.status).toBe("OPEN");
    expect(meta.head_sha).toBe("remote-head-sha");
    expect(meta.merged_at).toBeUndefined();
    expect(meta.merge_commit).toBeUndefined();
    expect(meta.artifact_state).not.toBe("merged");

    const rawLog = await readFile(logPath, "utf8");
    expect(rawLog).toContain(`head=example%3Atask%2F${taskId}%2Fexisting-open-pr-update`);
  });

  it("pr update rejects missing artifacts", async () => {
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
        "PR update missing artifacts",
        "--description",
        "PR update should error without pr open",
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
      const code = await runCli(["pr", "update", taskId, "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("PR artifacts missing");
    } finally {
      io.restore();
    }
  });

  it("pr update rejects extra arguments", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "update", "202601010101-ABCDEF", "--extra", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane pr update");
    } finally {
      io.restore();
    }
  });
});
