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

describe("runCli PR notes and verify flow", { timeout: PR_FLOW_LONG_TIMEOUT_MS }, () => {
  it("pr update prefers the base upstream ref for diffstat when local base lags", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);

    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await execFileAsync("git", ["remote", "add", "origin", "."], { cwd: root });
    await execFileAsync("git", ["config", "branch.main.remote", "origin"], { cwd: root });
    await execFileAsync("git", ["config", "branch.main.merge", "refs/heads/main"], {
      cwd: root,
    });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR update upstream diffstat task",
        "--description",
        "PR update should diff against the base upstream when local main lags",
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

    const branch = `task/${taskId}/pr-update-upstream-base`;
    await execFileAsync("git", ["branch", "upstream-main"], { cwd: root });
    await execFileAsync("git", ["checkout", "upstream-main"], { cwd: root });
    await writeFile(path.join(root, "upstream.txt"), "upstream", "utf8");
    await execFileAsync("git", ["add", "upstream.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "upstream"], { cwd: root });
    const { stdout: upstreamShaOut } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    await execFileAsync("git", ["checkout", "-b", branch, upstreamShaOut.trim()], { cwd: root });
    await execFileAsync("git", ["update-ref", "refs/remotes/origin/main", upstreamShaOut.trim()], {
      cwd: root,
    });

    await writeFile(path.join(root, "change.txt"), "change", "utf8");
    await execFileAsync("git", ["add", "change.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "change"], { cwd: root });

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
    await runCliSilent(["pr", "update", taskId, "--root", root]);

    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    const diffstat = await readFile(path.join(prDir, "diffstat.txt"), "utf8");
    const githubBody = await readFile(path.join(prDir, "github-body.md"), "utf8");
    expect(diffstat).toContain("change.txt");
    expect(diffstat).not.toContain("upstream.txt");
    expect(githubBody).toContain("change.txt");
    expect(githubBody).not.toContain("upstream.txt");
  });

  it("pr note appends to the note store and rerenders handoff notes", async () => {
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
        "PR note task",
        "--description",
        "PR note appends handoff notes",
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
      `task/${taskId}/pr-note`,
      "--root",
      root,
    ]);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "note",
        taskId,
        "--author",
        "DOCS",
        "--body",
        "Handoff: reviewed docs changes.",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const review = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "review.md"),
      "utf8",
    );
    const notesText = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "notes.jsonl"),
      "utf8",
    );
    const [record] = notesText
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line) as { author?: string; body?: string });
    expect(record?.author).toBe("DOCS");
    expect(record?.body).toBe("Handoff: reviewed docs changes.");
    expect(review).toContain("DOCS: Handoff: reviewed docs changes.");
    expect(
      await readFile(
        path.join(root, ".agentplane", "tasks", taskId, "pr", "github-body.md"),
        "utf8",
      ),
    ).toContain("DOCS: Handoff: reviewed docs changes.");
  });

  it("pr note regenerates the handoff section from append-only notes", async () => {
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
        "PR note render task",
        "--description",
        "PR note regenerates handoff section from the note store",
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
      `task/${taskId}/pr-note-render`,
      "--root",
      root,
    ]);

    const reviewPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "review.md");
    const original = await readFile(reviewPath, "utf8");
    await writeFile(
      reviewPath,
      original
        .replace("- ", "- Keep manual summary")
        .replace(
          "- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.",
          "- stale manual handoff",
        ),
      "utf8",
    );

    await runCliSilent([
      "pr",
      "note",
      taskId,
      "--author",
      "REVIEWER",
      "--body",
      "First handoff note.",
      "--root",
      root,
    ]);
    await runCliSilent([
      "pr",
      "note",
      taskId,
      "--author",
      "DOCS",
      "--body",
      "Second handoff note.",
      "--root",
      root,
    ]);

    const review = await readFile(reviewPath, "utf8");
    const githubBody = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "github-body.md"),
      "utf8",
    );
    const notesText = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "notes.jsonl"),
      "utf8",
    );
    expect(review).not.toContain("Keep manual summary");
    expect(review).not.toContain("stale manual handoff");
    expect(review).toContain("REVIEWER: First handoff note.");
    expect(review).toContain("DOCS: Second handoff note.");
    expect(githubBody).toContain("REVIEWER: First handoff note.");
    expect(githubBody).toContain("DOCS: Second handoff note.");
    expect(notesText.trim().split("\n")).toHaveLength(2);
  });

  it(
    "verify recreates PR artifacts without a manual pr open or pr update",
    { timeout: PR_FLOW_LONG_TIMEOUT_MS },
    async () => {
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
          "Verify PR auto sync",
          "--description",
          "Verify should restore PR artifacts automatically",
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
      await execFileAsync("git", ["checkout", "-b", `task/${taskId}/verify-auto-sync`], {
        cwd: root,
      });

      await runCliSilent([
        "task",
        "start-ready",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: create the initial PR artifact scaffold without manual PR commands.",
        "--root",
        root,
      ]);
      await setConcreteVerifySteps(root, taskId);

      const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
      await rm(path.join(prDir, "review.md"));

      const io = captureStdIO();
      try {
        const code = await runCli([
          "verify",
          taskId,
          "--ok",
          "--by",
          "REVIEWER",
          "--note",
          "Looks good",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }

      expect(await readFile(path.join(prDir, "review.md"), "utf8")).toContain("BEGIN AUTO SUMMARY");
      const meta = JSON.parse(await readFile(path.join(prDir, "meta.json"), "utf8")) as {
        branch?: string;
      };
      expect(meta.branch).toBe(`task/${taskId}/verify-auto-sync`);
    },
  );

  it("verify keeps incidents.md unchanged when syncing existing PR artifacts", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    config.agents.approvals.require_plan = false;
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
        "Verify leaves incident registry alone",
        "--description",
        "Verification should not mutate incidents policy",
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
    await execFileAsync("git", ["checkout", "-b", `task/${taskId}/verify-incidents`], {
      cwd: root,
    });

    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: keep incident policy unchanged while verification refreshes PR artifacts.",
      "--root",
      root,
    ]);
    await setConcreteVerifySteps(root, taskId);

    const incidentsBefore = await readFile(incidentsPath, "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "verify",
        taskId,
        "--ok",
        "--by",
        "REVIEWER",
        "--note",
        "Verification updated PR artifacts only",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    expect(await readFile(incidentsPath, "utf8")).toBe(incidentsBefore);
  });

  it("verify explains branch_pr incident locality when findings stay on the task worktree", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    config.agents.approvals.require_plan = false;
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
        "Verify explains branch_pr incident locality",
        "--description",
        "Verification should explain when incident candidates stay local to the task worktree",
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
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["checkout", "-b", `task/${taskId}/verify-incident-locality`], {
      cwd: root,
    });

    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: explain when branch_pr incident findings remain local to the current task branch.",
      "--root",
      root,
    ]);
    await setConcreteVerifySteps(root, taskId);

    const incidentsBefore = await readFile(incidentsPath, "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "verify",
        taskId,
        "--ok",
        "--by",
        "REVIEWER",
        "--note",
        "Verification captured a reusable incident candidate",
        "--observation",
        "Incident promotion still depends on an explicit base-branch step.",
        "--impact",
        "Operators can misread a task-branch verify as a shared incidents registry update.",
        "--resolution",
        "Emit an explicit branch_pr locality note during verify.",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(
        "incident registry unchanged (1 promotable external finding stayed task-local in the current task worktree; run verify --collect-incidents, agentplane incidents collect <task-id>, or finish on the base branch to update incidents.md)",
      );
      expect(io.stdout).toContain("finding=incident-candidate");
    } finally {
      io.restore();
    }

    expect(await readFile(incidentsPath, "utf8")).toBe(incidentsBefore);
  });

  it(
    "pr check fails when review metadata is stale relative to branch head",
    { timeout: PR_FLOW_LONG_TIMEOUT_MS },
    async () => {
      const root = await mkGitRepoRootWithBranch("main");
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      config.agents.approvals.require_plan = false;
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
          "PR stale review check",
          "--description",
          "PR check should reject stale rendered review metadata",
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
      await execFileAsync("git", ["checkout", "-b", `task/${taskId}/stale-review`], { cwd: root });
      await runCliSilent([
        "task",
        "start-ready",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: create initial PR artifacts before the first code change.",
        "--root",
        root,
      ]);

      await writeFile(path.join(root, "feature.txt"), "feature", "utf8");
      await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "feature"], { cwd: root });

      const io = captureStdIO();
      try {
        const code = await runCli(["pr", "check", taskId, "--root", root]);
        expect(code).toBe(3);
        expect(io.stderr).toContain("PR artifacts stale:");
      } finally {
        io.restore();
      }
    },
  );

  it(
    "pr check fails when verify metadata is stale relative to branch head",
    { timeout: PR_FLOW_LONG_TIMEOUT_MS },
    async () => {
      const root = await mkGitRepoRootWithBranch("main");
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      config.agents.approvals.require_plan = false;
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
          "PR stale verify check",
          "--description",
          "PR check should reject stale verify sha metadata",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--verify",
          "echo ok",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskId = ioTask.stdout.trim();
      } finally {
        ioTask.restore();
      }

      await runCliSilent(["branch", "base", "set", "main", "--root", root]);
      await execFileAsync("git", ["checkout", "-b", `task/${taskId}/stale-verify`], { cwd: root });
      await runCliSilent([
        "task",
        "start-ready",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: create PR artifacts before recording the first verification snapshot.",
        "--root",
        root,
      ]);
      await setConcreteVerifySteps(root, taskId);

      await writeFile(path.join(root, "feature-1.txt"), "feature-1", "utf8");
      await execFileAsync("git", ["add", "feature-1.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "feature-1"], { cwd: root });
      await runCliSilent([
        "verify",
        taskId,
        "--ok",
        "--by",
        "REVIEWER",
        "--note",
        "Looks good",
        "--root",
        root,
      ]);
      await runCliSilent(["pr", "check", taskId, "--root", root]);

      await writeFile(path.join(root, "feature-2.txt"), "feature-2", "utf8");
      await execFileAsync("git", ["add", "feature-2.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "feature-2"], { cwd: root });

      const ioUpdate = captureStdIO();
      try {
        const code = await runCli(["pr", "update", taskId, "--root", root]);
        expect(code).toBe(0);
        expect(ioUpdate.stderr).toContain("Verify state stale:");
      } finally {
        ioUpdate.restore();
      }

      const io = captureStdIO();
      try {
        const code = await runCli(["pr", "check", taskId, "--root", root]);
        expect(code).toBe(3);
        expect(io.stderr).toContain("Verify state stale:");
      } finally {
        io.restore();
      }
    },
  );

  it(
    "pr check accepts verify-log-backed verification when pr meta verify fields drift",
    { timeout: PR_FLOW_LONG_TIMEOUT_MS },
    async () => {
      const root = await mkGitRepoRootWithBranch("main");
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      config.agents.approvals.require_plan = false;
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
          "PR verify log fallback",
          "--description",
          "PR check should accept verify.log as authoritative when meta verify fields drift",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--verify",
          "echo ok",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskId = ioTask.stdout.trim();
      } finally {
        ioTask.restore();
      }

      await runCliSilent(["branch", "base", "set", "main", "--root", root]);
      await execFileAsync("git", ["checkout", "-b", `task/${taskId}/verify-log-fallback`], {
        cwd: root,
      });
      await runCliSilent([
        "task",
        "start-ready",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: verify first, then simulate stale PR verify metadata.",
        "--root",
        root,
      ]);
      await setConcreteVerifySteps(root, taskId);

      await writeFile(path.join(root, "feature.txt"), "feature", "utf8");
      await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "feature"], { cwd: root });
      await runCliSilent([
        "verify",
        taskId,
        "--ok",
        "--by",
        "REVIEWER",
        "--note",
        "Looks good",
        "--root",
        root,
      ]);

      const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
      const meta = JSON.parse(await readFile(metaPath, "utf8")) as Record<string, unknown>;
      meta.last_verified_sha = null;
      meta.last_verified_at = null;
      meta.verify = { status: "skipped" };
      await writeFile(metaPath, `${JSON.stringify(meta, null, 2)}\n`, "utf8");

      const io = captureStdIO();
      try {
        const code = await runCli(["pr", "check", taskId, "--root", root]);
        expect(code).toBe(0);
        expect(io.stderr).not.toContain("Verify metadata missing");
        expect(io.stderr).not.toContain("Verify state stale");
      } finally {
        io.restore();
      }
    },
  );
});
