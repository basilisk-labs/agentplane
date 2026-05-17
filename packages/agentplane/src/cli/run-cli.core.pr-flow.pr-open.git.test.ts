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

describe("runCli pr open flow git publishing", { timeout: PR_FLOW_INTEGRATION_TIMEOUT_MS }, () => {
  it("pr open leaves committed PR artifacts unchanged when task branch publish fails", async () => {
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
      expect(code, io.stderr).toBe(5);
    } finally {
      io.restore();
      process.env.PATH = originalPath;
    }

    const { stdout: statusStdout } = await execFileAsync(
      "git",
      ["status", "--short", "--untracked-files=no"],
      {
        cwd: root,
        env: cleanGitEnv(),
      },
    );
    const meta = JSON.parse(
      await readFile(path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json"), "utf8"),
    ) as { artifact_state?: string; artifact_state_reason?: string };
    expect(meta.artifact_state).not.toBe("remote_failed");
    expect(meta.artifact_state_reason ?? "").not.toContain("simulated task branch publish failure");
    expect(statusStdout.trim()).toBe("");
  }, PR_FLOW_INTEGRATION_TIMEOUT_MS);

  it("pr open publishes HEAD to the task branch ref when the local branch tracks origin/main", async () => {
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
    const publishRemotePath = await configurePushableOrigin(root);
    await execFileAsync("git", ["commit", "--allow-empty", "-m", "chore initial main"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["push", "-u", "origin", "HEAD:refs/heads/main"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const { stdout: remoteMainBeforeStdout } = await execFileAsync(
      "git",
      ["ls-remote", "--heads", publishRemotePath, "refs/heads/main"],
      {
        cwd: root,
        env: cleanGitEnv(),
      },
    );
    const remoteMainBefore = remoteMainBeforeStdout.trim().split(/\s+/, 1)[0] ?? "";
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open inherited upstream",
        "--description",
        "PR open should not publish task branch HEAD to origin/main when upstream metadata is wrong.",
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

    const branch = `task/${taskId}/inherited-main-upstream`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root, env: cleanGitEnv() });
    await execFileAsync("git", ["commit", "--allow-empty", "-m", "chore branch publish seed"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["config", `branch.${branch}.remote`, "origin"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["config", `branch.${branch}.merge`, "refs/heads/main"], {
      cwd: root,
      env: cleanGitEnv(),
    });

    const { fakeBin } = await installFakeGhPrApi({
      scenarioName: "open-inherited-main-upstream",
      branch,
      createResponse: {
        number: 916,
        html_url: "https://github.com/example/repo/pull/916",
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
      expect(io.stdout).toContain("created GitHub PR #916");
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

    const { stdout: remoteTaskStdout } = await execFileAsync(
      "git",
      ["ls-remote", "--heads", publishRemotePath, `refs/heads/${branch}`],
      {
        cwd: root,
        env: cleanGitEnv(),
      },
    );
    expect(remoteTaskStdout.trim()).not.toBe("");

    const { stdout: remoteMainAfterStdout } = await execFileAsync(
      "git",
      ["ls-remote", "--heads", publishRemotePath, "refs/heads/main"],
      {
        cwd: root,
        env: cleanGitEnv(),
      },
    );
    const remoteMainAfter = remoteMainAfterStdout.trim().split(/\s+/, 1)[0] ?? "";
    expect(remoteMainAfter).toBe(remoteMainBefore);
  }, PR_FLOW_INTEGRATION_TIMEOUT_MS);

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
  }, PR_FLOW_INTEGRATION_TIMEOUT_MS);
});
