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
  "runCli pr open flow validation gates",
  { timeout: PR_FLOW_INTEGRATION_TIMEOUT_MS },
  () => {
    it("pr open respects --sync-only and skips remote GitHub PR creation", async () => {
      const root = await mkGitRepoRootWithBranch("main");
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);
      await configureGitUser(root);
      const execFileAsync = promisify(execFile);
      await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
      await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });
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
      await execFileAsync("git", ["checkout", "-b", branch], { cwd: root, env: cleanGitEnv() });
      await execFileAsync("git", ["commit", "--allow-empty", "-m", "chore branch sync seed"], {
        cwd: root,
        env: cleanGitEnv(),
      });
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
  },
);
