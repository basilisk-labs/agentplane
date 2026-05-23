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

describe(
  "runCli PR validation and hydration flow (pr open hydration scenarios)",
  { timeout: PR_FLOW_LONG_TIMEOUT_MS },
  () => {
    it("pr open reports linked GitHub PR identity when pr metadata already has one", async () => {
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
          "PR open linked identity",
          "--description",
          "PR open should report a linked remote PR when metadata already knows it",
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

      const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
      const meta = JSON.parse(await readFile(metaPath, "utf8")) as {
        pr_number?: number;
        pr_url?: string;
      };
      meta.pr_number = 321;
      meta.pr_url = "https://github.com/example/repo/pull/321";
      await writeFile(metaPath, `${JSON.stringify(meta, null, 2)}\n`, "utf8");

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
        expect(io.stdout).toContain("linked to GitHub PR #321");
        expect(io.stdout).toContain("https://github.com/example/repo/pull/321");
      } finally {
        io.restore();
      }
    });

    it("pr open reports an existing GitHub PR by branch without tracking open identity", async () => {
      const root = await mkGitRepoRootWithBranch("main");
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);
      await configureGitUser(root);
      const execFileAsync = promisify(execFile);
      await execFileAsync(
        "git",
        ["remote", "add", "origin", "https://github.com/example/repo.git"],
        {
          cwd: root,
          env: cleanGitEnv(),
        },
      );
      await configurePushableOrigin(root);
      await runCliSilent(["branch", "base", "set", "main", "--root", root]);

      let taskId = "";
      const ioTask = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "PR open hydrates existing PR",
          "--description",
          "PR open should discover an already-existing remote PR for the branch",
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

      const branch = `task/${taskId}/existing-pr`;
      const { fakeBin, logPath } = await installFakeGhPrLookup({
        scenarioName: "open-existing",
        branch,
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
        expect(io.stdout).toContain("linked to GitHub PR #321");
        expect(io.stdout).not.toContain("GitHub PR not created");
      } finally {
        io.restore();
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
      };
      expect(meta.pr_number).toBeUndefined();
      expect(meta.pr_url).toBeUndefined();
      expect(meta.status).toBeUndefined();
      expect(meta.head_sha).toBeUndefined();

      const rawLog = await readFile(logPath, "utf8");
      expect(rawLog).toContain(`head=example%3Atask%2F${taskId}%2Fexisting-pr`);
    });

    it("pr open keeps review/body stable when a second run creates the remote PR", async () => {
      const root = await mkGitRepoRootWithBranch("main");
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);
      await configureGitUser(root);
      const execFileAsync = promisify(execFile);
      await execFileAsync(
        "git",
        ["remote", "add", "origin", "https://github.com/example/repo.git"],
        {
          cwd: root,
          env: cleanGitEnv(),
        },
      );
      await configurePushableOrigin(root);
      await runCliSilent(["branch", "base", "set", "main", "--root", root]);

      let taskId = "";
      const ioTask = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "PR open preserves rendered packet on remote create",
          "--description",
          "A second pr open should avoid rewriting review/body when only PR linkage changes",
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

      const branch = `task/${taskId}/remote-create-second-pass`;
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

      const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
      const reviewBefore = await readFile(path.join(prDir, "review.md"), "utf8");
      const githubBodyBefore = await readFile(path.join(prDir, "github-body.md"), "utf8");

      const { fakeBin, logPath } = await installFakeGhPrApi({
        scenarioName: "open-create-second-pass",
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
      } finally {
        io.restore();
        process.env.PATH = originalPath;
        delete process.env.AGENTPLANE_GH_LOG;
      }

      expect(await readFile(path.join(prDir, "review.md"), "utf8")).toBe(reviewBefore);
      expect(await readFile(path.join(prDir, "github-body.md"), "utf8")).toBe(githubBodyBefore);
    });

    it("pr open stays commit-stable when a rerun only links a newly created remote PR", async () => {
      const root = await mkGitRepoRootWithBranch("main");
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);
      await configureGitUser(root);
      const execFileAsync = promisify(execFile);
      await execFileAsync(
        "git",
        ["remote", "add", "origin", "https://github.com/example/repo.git"],
        {
          cwd: root,
          env: cleanGitEnv(),
        },
      );
      await configurePushableOrigin(root);
      await runCliSilent(["branch", "base", "set", "main", "--root", root]);

      let taskId = "";
      const ioTask = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "PR open rerun stays commit-stable",
          "--description",
          "Rerunning pr open after remote PR creation should not require a new artifact-only commit.",
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

      const branch = `task/${taskId}/rerun-stable`;
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

      const { stdout: beforeHeadStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: root,
      });
      const beforeHead = beforeHeadStdout.trim();
      const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
      const firstReview = await readFile(path.join(prDir, "review.md"), "utf8");
      const firstGithubBody = await readFile(path.join(prDir, "github-body.md"), "utf8");

      const { fakeBin, logPath } = await installFakeGhPrApi({
        scenarioName: "open-rerun-stable",
        branch,
        createResponse: {
          number: 777,
          html_url: "https://github.com/example/repo/pull/777",
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
        expect(io.stdout).toContain("created GitHub PR #777");
      } finally {
        io.restore();
        process.env.PATH = originalPath;
        delete process.env.AGENTPLANE_GH_LOG;
      }

      const { stdout: afterHeadStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: root,
      });
      expect(afterHeadStdout.trim()).toBe(beforeHead);
      expect(await readFile(path.join(prDir, "review.md"), "utf8")).toBe(firstReview);
      expect(await readFile(path.join(prDir, "github-body.md"), "utf8")).toBe(firstGithubBody);

      const meta = JSON.parse(await readFile(path.join(prDir, "meta.json"), "utf8")) as {
        pr_number?: number;
        pr_url?: string;
        status?: string;
        head_sha?: string;
      };
      expect(meta.pr_number).toBeUndefined();
      expect(meta.pr_url).toBeUndefined();
      expect(meta.status).toBeUndefined();
      expect(meta.head_sha).toBeUndefined();

      const { stdout: statusOut } = await execFileAsync(
        "git",
        ["status", "--short", "--untracked-files=no"],
        { cwd: root },
      );
      expect(statusOut.trim()).toBe("");
    });

    it("pr open keeps review/body stable when a second run only observes an existing remote PR", async () => {
      const root = await mkGitRepoRootWithBranch("main");
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);
      await configureGitUser(root);
      const execFileAsync = promisify(execFile);
      await execFileAsync(
        "git",
        ["remote", "add", "origin", "https://github.com/example/repo.git"],
        {
          cwd: root,
          env: cleanGitEnv(),
        },
      );
      await runCliSilent(["branch", "base", "set", "main", "--root", root]);

      let taskId = "";
      const ioTask = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "PR open preserves rendered packet on existing PR hydration",
          "--description",
          "A second pr open should avoid rewriting review/body when it only links an existing PR",
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

      const branch = `task/${taskId}/existing-pr-second-pass`;
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

      const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
      const reviewBefore = await readFile(path.join(prDir, "review.md"), "utf8");
      const githubBodyBefore = await readFile(path.join(prDir, "github-body.md"), "utf8");

      const { fakeBin, logPath } = await installFakeGhPrLookup({
        scenarioName: "open-existing-second-pass",
        branch,
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
        expect(io.stdout).toContain("linked to GitHub PR #321");
      } finally {
        io.restore();
        process.env.PATH = originalPath;
        delete process.env.AGENTPLANE_GH_LOG;
      }

      const reviewAfter = await readFile(path.join(prDir, "review.md"), "utf8");
      const githubBodyAfter = await readFile(path.join(prDir, "github-body.md"), "utf8");
      expect(reviewAfter).toBe(reviewBefore);
      expect(githubBodyAfter).toBe(githubBodyBefore);
      expect(reviewAfter).toContain("Head: computed live by");
      expect(githubBodyAfter).toContain("Head: computed live by");
    });
  },
);
