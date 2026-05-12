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

describe("runCli branch_pr lifecycle flow", { timeout: PR_FLOW_INTEGRATION_TIMEOUT_MS }, () => {
  it("task start-ready auto-creates PR artifacts in branch_pr mode", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    config.agents.approvals.require_plan = false;
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Start ready PR auto init",
        "--description",
        "Start ready should create PR artifacts automatically",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "docs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["checkout", "-b", `task/${taskId}/start-ready-auto`], {
      cwd: root,
    });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "start-ready",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: auto-create PR artifacts from the start-ready lifecycle boundary.",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const pr = branchPrArtifactFixture(root, taskId);
    const meta = await pr.readMeta<{
      branch?: string;
    }>();
    expect(meta.branch).toBe(`task/${taskId}/start-ready-auto`);
    expect(await pr.readReview()).toContain("BEGIN AUTO SUMMARY");
    await readFile(pr.diffstatPath, "utf8");
    if (await pathExists(pr.notesPath)) {
      await readFile(pr.notesPath, "utf8");
    }
    if (await pathExists(pr.verifyLogPath)) {
      await readFile(pr.verifyLogPath, "utf8");
    }
    await readFile(pr.githubTitlePath, "utf8");
    const prGithubBody = await pr.readGithubBody();
    expect(prGithubBody).toContain("## Scope");
    expect(prGithubBody).toContain("## Verification");
  });

  it("task set-status --commit-from-comment refreshes branch_pr PR head_sha after the commit", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    config.agents.approvals.require_plan = false;
    await writeConfig(root, config);
    await configureGitUser(root);
    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Branch PR meta head sync",
        "--description",
        "Comment-driven task commits should keep pr/meta head_sha current",
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
    await execFileAsync("git", ["checkout", "-b", `task/${taskId}/status-sync`], { cwd: root });

    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/status-sync`,
      "--root",
      root,
    ]);

    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: move the task into DOING before the comment-driven status commit sync regression.",
      "--root",
      root,
    ]);

    const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    const before = JSON.parse(await readFile(metaPath, "utf8")) as { head_sha?: string | null };
    expect(before.head_sha).toMatch(/^[0-9a-f]{40}$/u);

    await writeFile(path.join(root, "blocker.txt"), "blocked\n", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "set-status",
        taskId,
        "BLOCKED",
        "--author",
        "CODER",
        "--body",
        "Blocked: waiting on a dependency while the branch_pr PR artifact refresh regression is under test.",
        "--commit-from-comment",
        "--commit-allow",
        "blocker.txt",
        "--confirm-status-commit",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const after = JSON.parse(await readFile(metaPath, "utf8")) as { head_sha?: string | null };
    const { stdout: headStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    const headSha = headStdout.trim();
    expect(after.head_sha).toBe(headSha);
    expect(after.head_sha).not.toBe(before.head_sha);
  });

  it("commit creates a clean artifact follow-up commit after a task-scoped branch_pr change", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);
    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Branch PR guard commit sync",
        "--description",
        "Commit should keep pr/meta head_sha current on task branches",
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
    await execFileAsync("git", ["checkout", "-b", `task/${taskId}/guard-sync`], { cwd: root });
    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/guard-sync`,
      "--root",
      root,
    ]);

    const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    const before = JSON.parse(await readFile(metaPath, "utf8")) as { head_sha?: string | null };
    expect(before.head_sha).toMatch(/^[0-9a-f]{40}$/u);
    const suffix = extractTaskSuffix(taskId);

    await writeFile(path.join(root, "src.ts"), "export const value = 1;\n", "utf8");
    await execFileAsync("git", ["add", "src.ts"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        taskId,
        "-m",
        `🧩 ${suffix} workflow: refresh branch_pr artifacts after guard commit`,
        "--allow",
        "src.ts",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const after = JSON.parse(await readFile(metaPath, "utf8")) as { head_sha?: string | null };
    const { stdout: headStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    const { stdout: parentStdout } = await execFileAsync("git", ["rev-parse", "HEAD^"], {
      cwd: root,
    });
    const headSha = headStdout.trim();
    const parentSha = parentStdout.trim();
    expect(headSha).toMatch(/^[0-9a-f]{40}$/u);
    expect(after.head_sha).toBe(parentSha);
    expect(after.head_sha).not.toBe(before.head_sha);

    const { stdout: subjectsStdout } = await execFileAsync("git", ["log", "-2", "--pretty=%s"], {
      cwd: root,
    });
    const subjects = subjectsStdout
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    expect(subjects[0]).toBe(`🧩 ${suffix} workflow: refresh task artifacts after commit`);
    expect(subjects[1]).toBe(
      `🧩 ${suffix} workflow: refresh branch_pr artifacts after guard commit`,
    );

    const { stdout: statusStdout } = await execFileAsync(
      "git",
      ["status", "--short", "--untracked-files=no"],
      { cwd: root },
    );
    expect(statusStdout.trim()).toBe("");

    const ioCheck = captureStdIO();
    try {
      const code = await runCli(["pr", "check", taskId, "--root", root]);
      expect(code).toBe(0);
    } finally {
      ioCheck.restore();
    }
  });

  it("task-only branch_pr commits skip PR self-refresh and leave the tree clean", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);
    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Task-only branch_pr commit stays clean",
        "--description",
        "Task-local branch_pr commits should not self-refresh PR artifacts into tracked dirt.",
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
    await execFileAsync("git", ["checkout", "-b", `task/${taskId}/task-artifacts-only`], {
      cwd: root,
    });
    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/task-artifacts-only`,
      "--root",
      root,
    ]);

    const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    const before = JSON.parse(await readFile(metaPath, "utf8")) as { head_sha?: string | null };
    expect(before.head_sha).toMatch(/^[0-9a-f]{40}$/u);

    await runCliSilent([
      "task",
      "doc",
      "set",
      taskId,
      "--section",
      "Findings",
      "--text",
      "- Command: manual task artifact commit\n- Result: pending\n- Evidence: task-local note only\n- Scope: task README and task registry only",
      "--root",
      root,
    ]);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        taskId,
        "-m",
        `🛠️ ${extractTaskSuffix(taskId)} task: task-only artifact refresh`,
        "--allow-tasks",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const after = JSON.parse(await readFile(metaPath, "utf8")) as { head_sha?: string | null };
    expect(after.head_sha).toBe(before.head_sha);

    const { stdout: taskStatus } = await execFileAsync(
      "git",
      ["status", "--short", "--untracked-files=no", "--", `.agentplane/tasks/${taskId}`],
      { cwd: root, encoding: "utf8" },
    );
    expect(taskStatus.trim()).toBe("");

    const checkIo = captureStdIO();
    try {
      const code = await runCli(["pr", "check", taskId, "--root", root]);
      expect(code).toBe(0);
      expect(checkIo.stdout).toContain("✅ pr check");
    } finally {
      checkIo.restore();
    }
  });

  it(
    "pr update refreshes diffstat and auto summary",
    { timeout: PR_FLOW_LONG_TIMEOUT_MS },
    async () => {
      const root = await mkGitRepoRootWithBranch("main");
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);
      await configureGitUser(root);

      await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
      const execFileAsync = promisify(execFile);
      await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

      let taskId = "";
      const ioTask = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "PR update task",
          "--description",
          "PR update writes diffstat",
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

      await runCliSilent([
        "pr",
        "open",
        taskId,
        "--author",
        "CODER",
        "--branch",
        `task/${taskId}/pr-update`,
        "--root",
        root,
      ]);

      await execFileAsync("git", ["checkout", "-b", `task/${taskId}/pr-update`], { cwd: root });
      await writeFile(path.join(root, "change.txt"), "change", "utf8");
      await execFileAsync("git", ["add", "change.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "change"], { cwd: root });

      const io = captureStdIO();
      try {
        const code = await runCli(["pr", "update", taskId, "--root", root]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }

      const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
      const diffstat = await readFile(path.join(prDir, "diffstat.txt"), "utf8");
      expect(diffstat).toContain("change.txt");
      const review = await readFile(path.join(prDir, "review.md"), "utf8");
      expect(review).toContain("BEGIN AUTO SUMMARY");
      expect(review).toContain("change.txt");
      const githubTitle = await readFile(path.join(prDir, "github-title.txt"), "utf8");
      const githubBody = await readFile(path.join(prDir, "github-body.md"), "utf8");
      expect(githubTitle.trim()).toContain(`[${taskId}]`);
      expect(githubTitle).not.toContain(`task/${taskId}/pr-update`);
      expect(githubBody).toContain("## Summary");
      expect(githubBody).toContain("## Scope");
      expect(githubBody).toContain("## Verification");
      if (await pathExists(path.join(prDir, "notes.jsonl"))) {
        expect(githubBody).toContain("## Handoff Notes");
      } else {
        expect(githubBody).not.toContain("## Handoff Notes");
      }
      expect(githubBody).toContain("<details>");
      expect(githubBody).toContain("change.txt");
      expect(githubBody).not.toContain("## Risks");
      expect(githubBody).not.toContain("### Plan");
    },
  );

  it(
    "pr update is idempotent when HEAD and diff are unchanged",
    { timeout: PR_FLOW_LONG_TIMEOUT_MS },
    async () => {
      const root = await mkGitRepoRootWithBranch("main");
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);
      await configureGitUser(root);

      await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
      const execFileAsync = promisify(execFile);
      await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

      let taskId = "";
      const ioTask = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "PR update idempotent task",
          "--description",
          "PR update stays byte-stable when nothing changed",
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
      await runCliSilent([
        "pr",
        "open",
        taskId,
        "--author",
        "CODER",
        "--branch",
        `task/${taskId}/pr-update-idempotent`,
        "--root",
        root,
      ]);

      await execFileAsync("git", ["checkout", "-b", `task/${taskId}/pr-update-idempotent`], {
        cwd: root,
      });
      await writeFile(path.join(root, "change.txt"), "change", "utf8");
      await execFileAsync("git", ["add", "change.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "change"], { cwd: root });

      await runCliSilent(["pr", "update", taskId, "--root", root]);

      const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
      const firstMeta = await readFile(path.join(prDir, "meta.json"), "utf8");
      const firstDiffstat = await readFile(path.join(prDir, "diffstat.txt"), "utf8");
      const firstReview = await readFile(path.join(prDir, "review.md"), "utf8");
      const firstGithubTitle = await readFile(path.join(prDir, "github-title.txt"), "utf8");
      const firstGithubBody = await readFile(path.join(prDir, "github-body.md"), "utf8");

      await runCliSilent(["pr", "update", taskId, "--root", root]);

      expect(await readFile(path.join(prDir, "meta.json"), "utf8")).toBe(firstMeta);
      expect(await readFile(path.join(prDir, "diffstat.txt"), "utf8")).toBe(firstDiffstat);
      expect(await readFile(path.join(prDir, "review.md"), "utf8")).toBe(firstReview);
      expect(await readFile(path.join(prDir, "github-title.txt"), "utf8")).toBe(firstGithubTitle);
      expect(await readFile(path.join(prDir, "github-body.md"), "utf8")).toBe(firstGithubBody);
    },
  );

  it("pr open auto-commits the task README and PR artifacts on the task branch", async () => {
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
        "PR open auto-commits artifacts",
        "--description",
        "Opening PR artifacts on the task branch should not leave tracked dirt behind.",
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
    const branch = `task/${taskId}/open-auto-commit`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });

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

    const { stdout: subjectOut } = await execFileAsync("git", ["log", "-1", "--pretty=%s"], {
      cwd: root,
    });
    expect(subjectOut.trim()).toBe(
      `🧩 ${extractTaskSuffix(taskId)} task: refresh task artifacts after commit`,
    );

    const { stdout: readmeTrackedOut } = await execFileAsync(
      "git",
      ["ls-files", "--error-unmatch", `.agentplane/tasks/${taskId}/README.md`],
      { cwd: root },
    );
    expect(readmeTrackedOut.trim()).toBe(`.agentplane/tasks/${taskId}/README.md`);

    const { stdout: statusOut } = await execFileAsync(
      "git",
      ["status", "--short", "--untracked-files=all", "--", `.agentplane/tasks/${taskId}`],
      { cwd: root },
    );
    expect(statusOut.trim()).toBe("");
  });

  it("pr update auto-commits the task README and refreshed PR artifacts on the task branch", async () => {
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
        "PR update auto-commits artifacts",
        "--description",
        "Refreshing PR artifacts after a code commit should not require a manual artifact-only commit.",
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
    const branch = `task/${taskId}/update-auto-commit`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await runCliSilent([
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

    await writeFile(path.join(root, "change.txt"), "change", "utf8");
    await execFileAsync("git", ["add", "change.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "change"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "update", taskId, "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const { stdout: headOut } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    const { stdout: parentOut } = await execFileAsync("git", ["rev-parse", "HEAD^"], {
      cwd: root,
    });
    const { stdout: subjectOut } = await execFileAsync("git", ["log", "-2", "--pretty=%s"], {
      cwd: root,
    });
    const subjects = subjectOut
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    expect(subjects[0]).toBe(
      `🧩 ${extractTaskSuffix(taskId)} task: refresh task artifacts after commit`,
    );
    expect(subjects[1]).toBe("change");

    const meta = JSON.parse(
      await readFile(path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json"), "utf8"),
    ) as { head_sha?: string | null };
    expect(meta.head_sha).toBe(parentOut.trim());
    expect(meta.head_sha).not.toBe(headOut.trim());

    const { stdout: readmeTrackedOut } = await execFileAsync(
      "git",
      ["ls-files", "--error-unmatch", `.agentplane/tasks/${taskId}/README.md`],
      { cwd: root },
    );
    expect(readmeTrackedOut.trim()).toBe(`.agentplane/tasks/${taskId}/README.md`);

    const { stdout: statusOut } = await execFileAsync(
      "git",
      ["status", "--short", "--untracked-files=all", "--", `.agentplane/tasks/${taskId}`],
      { cwd: root },
    );
    expect(statusOut.trim()).toBe("");
  });
});
