/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe } from "vitest";

import {
  CYRILLIC_RE,
  RUSSIAN_LAST_MESSAGE,
  RUSSIAN_TRACE_LINE,
  TASKS_QUERY_CLI_TIMEOUT_MS,
  VERIFY_STEPS_PLACEHOLDER,
  captureStdIO,
  chmod,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  createUpgradeBundle,
  defaultConfig,
  evolveRunnerRunState,
  execFile,
  expect,
  expectAgentJsonEnvelope,
  extractTaskSuffix,
  filterAgentsByWorkflow,
  formatRunShowArtifacts,
  formatRunShowMetrics,
  formatRunShowTarget,
  formatRunnerCapabilitySummaryLines,
  formatRunnerPolicyFieldSummaryLines,
  getAgentplaneHome,
  gitBranchExists,
  infoMessage,
  it,
  loadAgentTemplates,
  loadAgentsTemplate,
  loadCommandContext,
  loadTaskFromContext,
  mkdir,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  mkTempDir,
  mkdtemp,
  os,
  parseAgentJsonEnvelope,
  path,
  pathExists,
  prepareTaskRunnerExecution,
  processSupervision,
  promisify,
  prompts,
  readFile,
  readFileSync,
  readTask,
  realpath,
  readdir,
  renderExpectedRunShowText,
  renderExpectedRunCancelText,
  renderExpectedRunResumeText,
  renderExpectedRunRetryText,
  renderTaskDocFromSections,
  resolveUpdateCheckCachePath,
  rm,
  runCli,
  runCliSilent,
  seedTaskQueryFixture,
  splitOutputLines,
  stageGitignoreIfPresent,
  stubTaskBackend,
  taskDocToSectionMap,
  useRunCliIntegrationHarness,
  vi,
  waitForRunnerState,
  writeConfig,
  writeDefaultConfig,
  writeFile,
  writeRunnerRunState,
  type ResolvedProject,
  type RunShowPayload,
  type taskBackend,
} from "@agentplane/testkit/cli-core-tasks-query";

useRunCliIntegrationHarness();

describe("runCli task run history rendering", { timeout: TASKS_QUERY_CLI_TIMEOUT_MS }, () => {
  it("task runner history stays ordered and bounded across execute, cancel, resume, and retry flows", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.runner.default_adapter = "custom";
    config.runner.custom = { command: ["custom-runner"] };
    await writeConfig(root, config);

    const fakeBinDir = path.join(root, "bin");
    const fakeRunnerPath = path.join(fakeBinDir, "custom-runner");
    const behaviorPath = path.join(root, "runner-behavior.txt");
    await mkdir(fakeBinDir, { recursive: true });
    await writeFile(
      fakeRunnerPath,
      [
        "#!/bin/sh",
        String.raw`behavior="$(tr -d '\r\n' < "${behaviorPath}")"`,
        'case "$behavior" in',
        "  sleep)",
        "    trap 'exit 0' TERM",
        "    cat >/dev/null",
        "    while :; do sleep 1; done",
        "    ;;",
        "  fail)",
        String.raw`    printf "history failure %s\n" "$AGENTPLANE_RUNNER_RUN_DIR" >&2`,
        "    cat >/dev/null",
        "    exit 17",
        "    ;;",
        "  success)",
        String.raw`    printf "history success %s\n" "$AGENTPLANE_RUNNER_RUN_DIR"`,
        "    cat >/dev/null",
        "    exit 0",
        "    ;;",
        "  *)",
        String.raw`    printf "unexpected behavior %s\n" "$behavior" >&2`,
        "    exit 3",
        "    ;;",
        "esac",
      ].join("\n"),
      "utf8",
    );
    await chmod(fakeRunnerPath, 0o755);
    await writeFile(behaviorPath, "success\n", "utf8");

    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Runner history task",
          "--description",
          "Runner history task",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskId = io.stdout.trim();
      } finally {
        io.restore();
      }
    }
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: move the task into DOING before exercising execute, cancel, resume, and retry runner history flows in the CLI test.",
      "--root",
      root,
    ]);

    const commandCtx = await loadCommandContext({ cwd: root, rootOverride: root });
    const originalPath = process.env.PATH;
    try {
      process.env.PATH = `${fakeBinDir}${path.delimiter}${originalPath ?? ""}`;

      await writeFile(behaviorPath, "sleep\n", "utf8");
      const liveRunPromise = runCli(["task", "run", taskId, "--root", root]);
      const liveRun = await waitForRunnerState({
        root,
        taskId,
        timeoutMs: 30_000,
        predicate: (state) => {
          const status = state.status;
          const supervision =
            state.supervision && typeof state.supervision === "object"
              ? (state.supervision as Record<string, unknown>)
              : null;
          return status === "running" && typeof supervision?.pid === "number";
        },
      });
      const supervision = liveRun.state.supervision as
        | { pid?: number; command?: string | null; started_at?: string | null }
        | undefined;
      vi.spyOn(processSupervision, "readObservedProcessIdentity").mockResolvedValue({
        pid: supervision?.pid ?? 0,
        command: supervision?.command ?? null,
        started_at: supervision?.started_at ?? null,
      });
      expect(await runCli(["task", "run", "cancel", taskId, liveRun.runId, "--root", root])).toBe(
        0,
      );
      const liveRunCode = await liveRunPromise;
      expect([0, 143]).toContain(liveRunCode);

      let task = await readTask({ cwd: root, rootOverride: root, taskId });
      expect(task.frontmatter.runner?.run_id).toBe(liveRun.runId);
      expect(task.frontmatter.runner?.history).toBeUndefined();

      await writeFile(behaviorPath, "success\n", "utf8");
      const resumePrepared = await prepareTaskRunnerExecution({
        ctx: commandCtx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        mode: "execute",
        run_id: "run-history-resume",
      });
      expect(
        await runCli([
          "task",
          "run",
          "resume",
          taskId,
          resumePrepared.invocation.run_id,
          "--root",
          root,
        ]),
      ).toBe(0);

      task = await readTask({ cwd: root, rootOverride: root, taskId });
      expect(task.frontmatter.runner?.run_id).toBe("run-history-resume");
      expect(task.frontmatter.runner?.history?.map((entry) => entry.run_id)).toEqual([
        "run-history-resume",
        liveRun.runId,
      ]);

      await writeFile(behaviorPath, "fail\n", "utf8");
      expect(await runCli(["task", "run", taskId, "--root", root])).toBe(17);
      task = await readTask({ cwd: root, rootOverride: root, taskId });
      const failedRunId = String(task.frontmatter.runner?.run_id ?? "");
      expect(failedRunId).toBeTruthy();

      await writeFile(behaviorPath, "success\n", "utf8");
      expect(await runCli(["task", "run", "retry", taskId, failedRunId, "--root", root])).toBe(0);
      task = await readTask({ cwd: root, rootOverride: root, taskId });
      const retryRunId = String(task.frontmatter.runner?.run_id ?? "");
      expect(retryRunId).toBeTruthy();
      expect(retryRunId).not.toBe(failedRunId);

      const preparedCancel = await prepareTaskRunnerExecution({
        ctx: commandCtx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        mode: "execute",
        run_id: "run-history-cancel-prepared",
      });
      expect(
        await runCli([
          "task",
          "run",
          "cancel",
          taskId,
          preparedCancel.invocation.run_id,
          "--root",
          root,
        ]),
      ).toBe(0);

      await writeFile(behaviorPath, "success\n", "utf8");
      expect(await runCli(["task", "run", taskId, "--root", root])).toBe(0);

      task = await readTask({ cwd: root, rootOverride: root, taskId });
      const finalRunner = task.frontmatter.runner;
      expect(finalRunner?.status).toBe("success");
      expect(finalRunner?.history).toHaveLength(5);
      const history = finalRunner?.history ?? [];
      const historyRunIds = history.map((entry) => entry.run_id);
      expect(historyRunIds).toEqual([
        finalRunner?.run_id,
        "run-history-cancel-prepared",
        retryRunId,
        failedRunId,
        "run-history-resume",
      ]);
      expect(history.map((entry) => entry.status)).toEqual([
        "success",
        "cancelled",
        "success",
        "failed",
        "success",
      ]);
      expect(historyRunIds).not.toContain(liveRun.runId);
      expect(new Set(historyRunIds).size).toBe(historyRunIds.length);

      expect(task.body).toContain("<!-- BEGIN RUNNER OUTCOME -->");
      expect(task.body).toContain(`RunId: ${finalRunner?.run_id}`);
      expect(task.body).toContain("RunId: run-history-cancel-prepared");
      expect(task.body).toContain(`RunId: ${retryRunId}`);
      expect(task.body).toContain(`RunId: ${failedRunId}`);
      expect(task.body).toContain("RunId: run-history-resume");
      expect(task.body).not.toContain(`RunId: ${liveRun.runId}`);
      expect(task.body).toContain(`.agentplane/tasks/${taskId}/runs/${finalRunner?.run_id}`);
      expect(task.body.match(/#### .* — RUNNER — /g) ?? []).toHaveLength(5);
    } finally {
      process.env.PATH = originalPath;
    }
  });
});
