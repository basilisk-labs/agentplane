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

describe("runCli pr open flow", { timeout: PR_FLOW_INTEGRATION_TIMEOUT_MS }, () => {
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

    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    const metaRaw = await readFile(path.join(prDir, "meta.json"), "utf8");
    const meta = JSON.parse(metaRaw) as {
      task_id?: string;
      branch?: string;
      artifact_state?: string;
      artifact_state_reason?: string;
    };
    expect(meta.task_id).toBe(taskId);
    expect(meta.branch).toBe(`task/${taskId}/pr-open`);
    expect(meta.artifact_state).toBe("remote_staged");
    expect(meta.artifact_state_reason).toBe("GitHub origin repo unavailable");
    expect(await readFile(path.join(prDir, "review.md"), "utf8")).toContain("## Scope");
    await readFile(path.join(prDir, "diffstat.txt"), "utf8");
    expect(await readFile(path.join(prDir, "notes.jsonl"), "utf8")).toBe("");
    await readFile(path.join(prDir, "verify.log"), "utf8");
    expect(await readFile(path.join(prDir, "github-title.txt"), "utf8")).toContain(
      `(${extractTaskSuffix(taskId)})`,
    );
    expect(await readFile(path.join(prDir, "github-body.md"), "utf8")).toContain("## Verification");
    expect(await readFile(path.join(prDir, "github-body.md"), "utf8")).not.toContain("## Risks");
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

    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    const diffstat = await readFile(path.join(prDir, "diffstat.txt"), "utf8");
    const review = await readFile(path.join(prDir, "review.md"), "utf8");
    const githubBody = await readFile(path.join(prDir, "github-body.md"), "utf8");

    expect(diffstat).toContain("change.txt");
    expect(review).toContain("change.txt");
    expect(githubBody).toContain("change.txt");
    expect(review).not.toContain("No changes detected.");
    expect(githubBody).not.toContain("No changes detected.");
  });

  it("pr open creates a remote GitHub PR when origin and gh are available", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);
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

    const branch = `task/${taskId}/remote-create`;
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
    expect(meta.pr_number).toBeUndefined();
    expect(meta.pr_url).toBeUndefined();
    expect(meta.status).toBeUndefined();
    expect(meta.head_sha).toBeUndefined();

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
  });

  it("pr open marks remote creation failures explicitly in pr metadata", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);
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
      expect(io.stdout).toContain("remote PR creation failed");
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

  it("pr open marks push failures explicitly before returning an error", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["remote", "add", "origin", "https://github.com/example/repo.git"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const publishRemotePath = await mkdtemp(
      path.join(os.tmpdir(), "agentplane-pr-open-push-fail-remote-"),
    );
    await execFileAsync("git", ["init", "--bare", publishRemotePath], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["remote", "set-url", "--push", "origin", publishRemotePath], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open push failure",
        "--description",
        "PR open should mark remote failure when publishing the task branch fails.",
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

    const branch = `task/${taskId}/push-failure`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root, env: cleanGitEnv() });

    const fakeGitBin = await mkdtemp(path.join(os.tmpdir(), "agentplane-pr-open-push-fail-"));
    const { stdout: realGitStdout } = await execFileAsync("which", ["git"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const fakeGitPath = path.join(fakeGitBin, "git");
    await writeFile(
      fakeGitPath,
      [
        "#!/usr/bin/env node",
        "const { spawnSync } = require('node:child_process');",
        `const realGit = ${JSON.stringify(realGitStdout.trim())};`,
        "const args = process.argv.slice(2);",
        "if (args[0] === 'push' && args.includes('--no-verify')) {",
        "  console.error('simulated task branch publish failure');",
        "  process.exit(1);",
        "}",
        "const result = spawnSync(realGit, args, { stdio: 'inherit', env: process.env });",
        "if (result.error) throw result.error;",
        "process.exit(result.status ?? 1);",
        "",
      ].join("\n"),
      "utf8",
    );
    await chmod(fakeGitPath, 0o755);
    const originalPath = process.env.PATH;
    process.env.PATH = `${fakeGitBin}${path.delimiter}${originalPath ?? ""}`;

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
      expect(code).toBe(5);
    } finally {
      process.env.PATH = originalPath;
    }

    const meta = JSON.parse(
      await readFile(path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json"), "utf8"),
    ) as { artifact_state?: string; artifact_state_reason?: string };
    expect(meta.artifact_state).toBe("remote_failed");
    expect(meta.artifact_state_reason).toContain("simulated task branch publish failure");
  });

  it("pr open creates a remote GitHub PR on the first pass after packet materialization", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);
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
        "PR open first pass final head",
        "--description",
        "The first pr open pass should materialize the packet commit before remote PR creation.",
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

    const branch = `task/${taskId}/first-pass-final-head`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root, env: cleanGitEnv() });
    await execFileAsync("git", ["commit", "--allow-empty", "-m", "chore branch publish seed"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const publishRemotePath = await mkdtemp(path.join(os.tmpdir(), "agentplane-pr-open-publish-"));
    await execFileAsync("git", ["init", "--bare", publishRemotePath], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["remote", "add", "publish", publishRemotePath], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["push", "-u", "publish", `HEAD:refs/heads/${branch}`], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const packetCommitSubject = `🧩 ${extractTaskSuffix(taskId)} task: refresh task artifacts after commit`;
    const { fakeBin, logPath } = await installFakeGhPrApiRequiringPublishedPacketHead({
      scenarioName: "open-first-pass-final-head",
      branch,
      packetCommitSubject,
      publishRemote: "publish",
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
      expect(io.stdout).toContain("created GitHub PR #888");
      expect(io.stdout).not.toContain("remote PR creation staged");
    } finally {
      io.restore();
      process.env.PATH = originalPath;
      delete process.env.AGENTPLANE_GH_LOG;
    }

    const { stdout: headSubjectStdout } = await execFileAsync("git", ["log", "-1", "--pretty=%s"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    expect(headSubjectStdout.trim()).toBe(packetCommitSubject);

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
  });

  it("pr open auto-publishes an unpublished task branch to origin before creating the GitHub PR", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);
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
        "PR open unpublished branch",
        "--description",
        "PR open should explain when the task branch has not been pushed yet",
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

    const branch = `task/${taskId}/unpushed-head`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root, env: cleanGitEnv() });
    await execFileAsync("git", ["commit", "--allow-empty", "-m", "chore branch publish seed"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const publishRemotePath = await mkdtemp(path.join(os.tmpdir(), "agentplane-pr-open-origin-"));
    await execFileAsync("git", ["init", "--bare", publishRemotePath], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["remote", "set-url", "--push", "origin", publishRemotePath], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const { fakeBin } = await installFakeGhPrApi({
      scenarioName: "open-unpublished-branch",
      branch,
      createResponse: {
        number: 912,
        html_url: "https://github.com/example/repo/pull/912",
        state: "open",
        merged_at: null,
        merge_commit_sha: null,
        head: { sha: "remote-head-sha" },
        base: { ref: "main" },
      },
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
      expect(io.stdout).toContain("created GitHub PR #912");
      expect(io.stdout).not.toContain("remote PR creation staged");
      expect(io.stdout).not.toContain("not yet published on origin");
    } finally {
      io.restore();
      process.env.PATH = originalPath;
    }

    const { stdout: upstreamStdout } = await execFileAsync(
      "git",
      ["for-each-ref", "--format=%(upstream:short)", `refs/heads/${branch}`],
      {
        cwd: root,
        env: cleanGitEnv(),
      },
    );
    expect(upstreamStdout.trim()).toBe(`origin/${branch}`);

    const { stdout: remoteHeadStdout } = await execFileAsync(
      "git",
      ["ls-remote", "--heads", publishRemotePath, `refs/heads/${branch}`],
      {
        cwd: root,
        env: cleanGitEnv(),
      },
    );
    expect(remoteHeadStdout.trim()).not.toBe("");
  });

  it("pr open auto-publishes an unpublished branch even when PR artifacts were already committed locally", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);
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
        "PR open unpublished committed artifacts",
        "--description",
        "PR open should publish the branch even when task PR artifacts were already committed locally",
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

    const branch = `task/${taskId}/unpushed-committed-artifacts`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root, env: cleanGitEnv() });
    await execFileAsync("git", ["commit", "--allow-empty", "-m", "chore branch publish seed"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const publishRemotePath = await mkdtemp(
      path.join(os.tmpdir(), "agentplane-pr-open-origin-committed-"),
    );
    await execFileAsync("git", ["init", "--bare", publishRemotePath], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["remote", "set-url", "--push", "origin", publishRemotePath], {
      cwd: root,
      env: cleanGitEnv(),
    });

    const syncOnlyIo = captureStdIO();
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
      syncOnlyIo.restore();
    }

    const { fakeBin } = await installFakeGhPrApi({
      scenarioName: "open-unpublished-committed-artifacts",
      branch,
      createResponse: {
        number: 913,
        html_url: "https://github.com/example/repo/pull/913",
        state: "open",
        merged_at: null,
        merge_commit_sha: null,
        head: { sha: "remote-head-sha" },
        base: { ref: "main" },
      },
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
      expect(io.stdout).toContain("created GitHub PR #913");
      expect(io.stdout).not.toContain("remote PR creation staged");
      expect(io.stdout).not.toContain("not yet published on origin");
    } finally {
      io.restore();
      process.env.PATH = originalPath;
    }

    const { stdout: upstreamStdout } = await execFileAsync(
      "git",
      ["for-each-ref", "--format=%(upstream:short)", `refs/heads/${branch}`],
      {
        cwd: root,
        env: cleanGitEnv(),
      },
    );
    expect(upstreamStdout.trim()).toBe(`origin/${branch}`);
  });

  it("pr open skips a redundant push when origin already has the matching branch head", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);
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
        "PR open existing remote branch",
        "--description",
        "PR open should continue when origin already has the matching task branch head",
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

    const branch = `task/${taskId}/published-head`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root, env: cleanGitEnv() });
    await execFileAsync("git", ["commit", "--allow-empty", "-m", "chore branch publish seed"], {
      cwd: root,
      env: cleanGitEnv(),
    });

    const publishRemotePath = await mkdtemp(
      path.join(os.tmpdir(), "agentplane-pr-open-existing-head-"),
    );
    await execFileAsync("git", ["init", "--bare", publishRemotePath], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["remote", "set-url", "--push", "origin", publishRemotePath], {
      cwd: root,
      env: cleanGitEnv(),
    });

    const syncOnlyIo = captureStdIO();
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
      syncOnlyIo.restore();
    }

    await execFileAsync("git", ["push", "-u", "origin", `HEAD:refs/heads/${branch}`], {
      cwd: root,
      env: cleanGitEnv(),
    });

    const { fakeBin } = await installFakeGhPrApi({
      scenarioName: "open-existing-published-head",
      branch,
      createResponse: {
        number: 914,
        html_url: "https://github.com/example/repo/pull/914",
        state: "open",
        merged_at: null,
        merge_commit_sha: null,
        head: { sha: "remote-head-sha" },
        base: { ref: "main" },
      },
    });
    const fakeGitBin = await mkdtemp(path.join(os.tmpdir(), "agentplane-fake-git-"));
    const { stdout: realGitStdout } = await execFileAsync("which", ["git"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const realGit = realGitStdout.trim();
    const fakeGitPath = path.join(fakeGitBin, "git");
    await writeFile(
      fakeGitPath,
      [
        "#!/usr/bin/env node",
        "const { spawnSync } = require('node:child_process');",
        `const realGit = ${JSON.stringify(realGit)};`,
        `const publishRemote = ${JSON.stringify(publishRemotePath)};`,
        "const args = process.argv.slice(2);",
        "if (args[0] === 'remote' && args[1] === 'get-url' && args[2] === '--push' && args[3] === 'origin') {",
        "  console.log(publishRemote);",
        "  process.exit(0);",
        "}",
        "if (args[0] === 'push' && args.includes('--no-verify')) {",
        "  console.error('simulated push failure for published-branch regression');",
        "  process.exit(1);",
        "}",
        "const result = spawnSync(realGit, args, { stdio: 'inherit', env: process.env });",
        "if (result.error) throw result.error;",
        "process.exit(result.status ?? 1);",
        "",
      ].join("\n"),
      "utf8",
    );
    await chmod(fakeGitPath, 0o755);
    const originalPath = process.env.PATH;
    process.env.PATH = `${fakeGitBin}${path.delimiter}${fakeBin}${path.delimiter}${originalPath ?? ""}`;

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
      expect(io.stdout).toContain("created GitHub PR #914");
      expect(io.stdout).not.toContain("remote PR creation staged");
    } finally {
      io.restore();
      process.env.PATH = originalPath;
    }
  });

  it("pr open ignores dotenv-injected GitHub tokens when gh auth is otherwise available", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);
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
    expect(meta.pr_number).toBeUndefined();
    expect(meta.pr_url).toBeUndefined();
    expect(meta.status).toBeUndefined();
    expect(meta.head_sha).toBeUndefined();
  });

  it("pr open respects --sync-only and skips remote GitHub PR creation", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);
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
        "PR open sync only",
        "--description",
        "PR open should allow local-only artifact sync without remote creation",
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

    const branch = `task/${taskId}/sync-only`;
    const { fakeBin, logPath } = await installFakeGhPrApi({
      scenarioName: "open-sync-only",
      branch,
      createResponse: {
        number: 987,
        html_url: "https://github.com/example/repo/pull/987",
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
        "--sync-only",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toMatch(
        /remote PR creation (skipped \(--sync-only\)|staged \(GitHub PR creation failed\))/,
      );
    } finally {
      io.restore();
      process.env.PATH = originalPath;
      delete process.env.AGENTPLANE_GH_LOG;
    }

    const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    const meta = JSON.parse(await readFile(metaPath, "utf8")) as {
      pr_number?: number;
    };
    expect(meta.pr_number).toBeUndefined();

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
    ).toBe(false);
  });
});
