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

describe("runCli PR validation and hydration flow", { timeout: PR_FLOW_LONG_TIMEOUT_MS }, () => {
  it("pr note requires branch_pr workflow", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioTask = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR note direct",
        "--description",
        "Branch_pr required",
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
        "note",
        taskId,
        "--author",
        "DOCS",
        "--body",
        "Handoff: should fail in direct mode.",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Invalid workflow_mode: direct (expected branch_pr)");
    } finally {
      io.restore();
    }
  });

  it("pr note maps errors for non-git roots", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "config.json"), "{}", "utf8");
    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "note",
        "202601010101-ABCDEF",
        "--author",
        "DOCS",
        "--body",
        "Handoff: should fail without git repo.",
        "--root",
        root,
      ]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

  it("pr note rejects empty author or body", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "note",
        "202601010101-ABCDEF",
        "--author",
        "   ",
        "--body",
        "Handoff: should fail on empty author.",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane pr note");
    } finally {
      io.restore();
    }
  });

  it("pr check passes when artifacts exist", async () => {
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
        "PR check task",
        "--description",
        "PR check validates artifacts",
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

    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-check`,
      "--root",
      root,
    ]);

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", taskId, "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ pr check");
    } finally {
      io.restore();
    }
  });

  it(
    "pr check reports missing local artifacts when branch fallback is stale",
    { timeout: PR_FLOW_LONG_TIMEOUT_MS },
    async () => {
      const root = await mkGitRepoRootWithBranch("main");
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);
      await configureGitUser(root);

      const execFileAsync = promisify(execFile);

      let taskId = "";
      const ioTask = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "PR check branch fallback",
          "--description",
          "Base checkout should validate PR artifacts from branch history",
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

      await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", `chore ${taskId} scaffold`], { cwd: root });

      const branch = `task/${taskId}/pr-check-branch-fallback`;
      await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
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
      await commitPathsIfChanged(
        root,
        [`.agentplane/tasks/${taskId}`],
        `${taskId} add pr artifacts`,
      );

      await execFileAsync("git", ["checkout", "main"], { cwd: root });
      await rm(path.join(root, ".agentplane", "tasks", taskId), { recursive: true, force: true });
      await execFileAsync("git", ["add", "-A", `.agentplane/tasks/${taskId}`], { cwd: root });
      await execFileAsync("git", ["commit", "-m", `${taskId} remove base task snapshot`], {
        cwd: root,
      });
      expect(await pathExists(path.join(root, ".agentplane", "tasks", taskId, "README.md"))).toBe(
        false,
      );
      expect(
        await pathExists(path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json")),
      ).toBe(false);

      const io = captureStdIO();
      try {
        const code = await runCli(["pr", "check", taskId, "--root", root]);
        expect(code).toBe(3);
        expect(io.stderr).toContain("Missing PR directory:");
      } finally {
        io.restore();
      }
    },
  );

  it("pr check prefers local PR artifacts when multiple task branches match", async () => {
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
        "PR check local artifact preference",
        "--description",
        "Local PR artifacts should beat ambiguous branch fallback",
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

    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-check-primary`,
      "--root",
      root,
    ]);
    await execFileAsync("git", ["branch", `task/${taskId}/pr-check-secondary`], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", taskId, "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ pr check");
    } finally {
      io.restore();
    }
  }, 120_000);

  it(
    "pr check prefers a fresher branch snapshot when local base PR artifacts are stale",
    { timeout: PR_FLOW_LONG_TIMEOUT_MS },
    async () => {
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
          "PR check stale local snapshot fallback",
          "--description",
          "Base checkout should prefer fresher branch PR artifacts when local copies drift",
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

      await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", `chore ${taskId} scaffold`], { cwd: root });
      await runCliSilent(["branch", "base", "set", "main", "--root", root]);

      const branch = `task/${taskId}/fresh-branch-snapshot`;
      await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
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
      await commitPathsIfChanged(
        root,
        [`.agentplane/tasks/${taskId}`],
        `${taskId} add initial pr artifacts`,
      );

      const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
      const staleMeta = await readFile(path.join(prDir, "meta.json"), "utf8");
      const staleDiffstat = await readFile(path.join(prDir, "diffstat.txt"), "utf8");
      const staleVerifyLogPath = path.join(prDir, "verify.log");
      const staleVerifyLog = (await pathExists(staleVerifyLogPath))
        ? await readFile(staleVerifyLogPath, "utf8")
        : "";
      const staleReview = await readFile(path.join(prDir, "review.md"), "utf8");
      const staleGithubTitle = await readFile(path.join(prDir, "github-title.txt"), "utf8");
      const staleGithubBody = await readFile(path.join(prDir, "github-body.md"), "utf8");
      await writeFile(path.join(root, "feature.txt"), "feature", "utf8");
      await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "feature"], { cwd: root });
      await runCliSilent(["pr", "update", taskId, "--root", root]);
      await commitPathsIfChanged(
        root,
        [`.agentplane/tasks/${taskId}`],
        `${taskId} refresh pr artifacts`,
      );
      await execFileAsync("git", ["checkout", "main"], { cwd: root });
      await mkdir(prDir, { recursive: true });
      await writeFile(path.join(prDir, "meta.json"), staleMeta, "utf8");
      await writeFile(path.join(prDir, "diffstat.txt"), staleDiffstat, "utf8");
      await writeFile(staleVerifyLogPath, staleVerifyLog, "utf8");
      await writeFile(path.join(prDir, "review.md"), staleReview, "utf8");
      await writeFile(path.join(prDir, "github-title.txt"), staleGithubTitle, "utf8");
      await writeFile(path.join(prDir, "github-body.md"), staleGithubBody, "utf8");
      const io = captureStdIO();
      try {
        const code = await runCli(["pr", "check", taskId, "--root", root]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("✅ pr check");
      } finally {
        io.restore();
      }
    },
  );

  it("pr check still reports multiple task branches when fallback is required", async () => {
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
        "PR check ambiguous fallback",
        "--description",
        "Fallback should stay strict when multiple task branches match",
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

    await execFileAsync("git", ["branch", `task/${taskId}/pr-check-primary`], { cwd: root });
    await execFileAsync("git", ["branch", `task/${taskId}/pr-check-secondary`], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", taskId, "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("Multiple task branches match");
    } finally {
      io.restore();
    }
  }, 120_000);

  it("pr open requires --author", async () => {
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
        "PR open requires author",
        "--description",
        "PR open must have author flag",
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
      const code = await runCli(["pr", "open", taskId, "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane pr open");
    } finally {
      io.restore();
    }
  });

  it("pr open rejects unknown flags", async () => {
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
        "PR open unknown flag",
        "--description",
        "PR open should reject unknown flags",
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
        "--nope",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane pr open");
    } finally {
      io.restore();
    }
  });

  it("pr open uses current branch when --branch is omitted", async () => {
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
        "PR open branch default",
        "--description",
        "PR open uses current branch",
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

    await runCliSilent(["pr", "open", taskId, "--author", "CODER", "--root", root]);

    const metaRaw = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json"),
      "utf8",
    );
    const meta = JSON.parse(metaRaw) as { branch?: string; head_sha?: string | null };
    expect(meta.branch).toBe("main");
    expect(meta.head_sha).toBeUndefined();
  });

  it("pr open keeps incidents.md unchanged while creating PR artifacts", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);

    const incidentsPath = path.join(root, ".agentplane", "policy", "incidents.md");
    const baselineIncidents = [
      "# Policy Incidents Log",
      "",
      "## Entry contract",
      "",
      "- Add entries append-only.",
      "",
      "## Entries",
      "",
      "- id: INC-20260406-00",
      "  date: 2026-04-06",
      "  scope: baseline",
      "  failure: baseline",
      "  rule: Baseline rule MUST stay unchanged.",
      "  evidence: test fixture",
      "  enforcement: test",
      "  state: open",
      "",
    ].join("\n");
    await mkdir(path.dirname(incidentsPath), { recursive: true });
    await writeFile(incidentsPath, baselineIncidents, "utf8");

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open leaves incident registry alone",
        "--description",
        "PR artifact sync should not mutate incidents policy",
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

    const incidentsBefore = await readFile(incidentsPath, "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "open",
        taskId,
        "--author",
        "CODER",
        "--branch",
        `task/${taskId}/pr-open-incidents`,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    expect(await readFile(incidentsPath, "utf8")).toBe(incidentsBefore);
  });

  it("pr open is idempotent when artifacts exist", async () => {
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
        "PR open idempotent task",
        "--description",
        "PR open can be re-run safely",
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

    await runCliSilent([
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

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "open",
        taskId,
        "--author",
        "REVIEWER",
        "--branch",
        `task/${taskId}/pr-open`,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("pr note rejects missing review", async () => {
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
        "PR note missing review",
        "--description",
        "PR note requires review",
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
        "note",
        taskId,
        "--author",
        "DOCS",
        "--body",
        "Handoff: missing review should fail.",
        "--root",
        root,
      ]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("Missing .agentplane/tasks");
    } finally {
      io.restore();
    }
  });

  it("pr check fails when verify requirements are unmet", async () => {
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
        "PR check verify task",
        "--description",
        "PR check should fail until verify passes",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--verify",
        "bun run ci",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-check`,
      "--root",
      root,
    ]);

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", taskId, "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("Verify requirements not satisfied");
    } finally {
      io.restore();
    }
  });

  it("pr check reports missing auto summary markers", async () => {
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
        "PR check markers",
        "--description",
        "Missing auto summary markers",
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

    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-check-markers`,
      "--root",
      root,
    ]);

    const reviewPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "review.md");
    const review = await readFile(reviewPath, "utf8");
    const stripped = review
      .replace("<!-- BEGIN AUTO SUMMARY -->", "")
      .replace("<!-- END AUTO SUMMARY -->", "");
    await writeFile(reviewPath, stripped, "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", taskId, "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("Missing auto summary start marker");
      expect(io.stderr).toContain("Missing auto summary end marker");
    } finally {
      io.restore();
    }
  });

  it("pr check reports invalid meta.json", async () => {
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
        "PR check invalid meta",
        "--description",
        "Invalid meta.json",
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

    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-check-meta`,
      "--root",
      root,
    ]);

    const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    await writeFile(metaPath, "{ not-json", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", taskId, "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("JSON Parse error:");
    } finally {
      io.restore();
    }
  });

  it("pr check rejects extra arguments", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", "202601010101-ABCDEF", "--extra", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane pr check");
    } finally {
      io.restore();
    }
  });

  it("pr check maps errors for non-git roots", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "config.json"), "{}", "utf8");
    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", "202601010101-ABCDEF", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

  it("pr note rejects unknown flags", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "note",
        "202601010101-ABCDEF",
        "--author",
        "DOCS",
        "--body",
        "Handoff: unknown flag check.",
        "--nope",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane pr note");
    } finally {
      io.restore();
    }
  });

  it("pr note requires --author and --body", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "note", "202601010101-ABCDEF", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane pr note");
    } finally {
      io.restore();
    }
  });
  it("pr commands require a task id", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "open", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane pr open");
    } finally {
      io.restore();
    }
  });
  it("pr rejects unknown subcommands", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "nope", "202601010101-ABCDEF", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain(
        "agentplane pr <open|update|check|flow status|note|close|close-superseded>",
      );
    } finally {
      io.restore();
    }
  });
});
