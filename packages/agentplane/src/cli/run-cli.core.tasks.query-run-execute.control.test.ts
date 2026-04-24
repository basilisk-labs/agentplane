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

describe("runCli task run control operations", { timeout: TASKS_QUERY_CLI_TIMEOUT_MS }, () => {
  it("task run cancel marks an existing prepared execute-mode run as cancelled", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Cancel prepared run task",
          "--description",
          "Cancel prepared run task",
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
      "Start: move the task into DOING before cancelling a prepared execute-mode runner run in the CLI test.",
      "--root",
      root,
    ]);
    const commandCtx = await loadCommandContext({ cwd: root, rootOverride: root });
    const prepared = await prepareTaskRunnerExecution({
      ctx: commandCtx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-cancel-cli",
    });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "run",
        "cancel",
        taskId,
        prepared.invocation.run_id,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toBe(
        renderExpectedRunCancelText({
          taskId,
          runId: prepared.invocation.run_id,
          previousStatus: "prepared",
          statePath: prepared.invocation.state_path,
          eventsPath: prepared.invocation.events_path,
          status: "cancelled",
        }),
      );

      const state = JSON.parse(await readFile(prepared.invocation.state_path, "utf8")) as {
        status: string;
      };
      expect(state.status).toBe("cancelled");
    } finally {
      io.restore();
    }
  });

  it("task run cancel sends a real termination signal to a running supervised run", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.runner.default_adapter = "custom";
    config.runner.custom = { command: ["custom-runner"] };
    await writeConfig(root, config);

    const fakeBinDir = path.join(root, "bin");
    const fakeRunnerPath = path.join(fakeBinDir, "custom-runner");
    await mkdir(fakeBinDir, { recursive: true });
    await writeFile(
      fakeRunnerPath,
      ["#!/bin/sh", "trap 'exit 143' TERM", "cat >/dev/null", "while :; do sleep 1; done"].join(
        "\n",
      ),
      "utf8",
    );
    await chmod(fakeRunnerPath, 0o755);

    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Cancel live supervised run task",
          "--description",
          "Cancel live supervised run task",
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
      "Start: move the task into DOING before cancelling a live supervised runner run in the CLI test.",
      "--root",
      root,
    ]);

    const io = captureStdIO();
    const originalPath = process.env.PATH;
    try {
      process.env.PATH = `${fakeBinDir}${path.delimiter}${originalPath ?? ""}`;
      const runPromise = runCli(["task", "run", taskId, "--root", root]);
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
      const cancelCode = await runCli([
        "task",
        "run",
        "cancel",
        taskId,
        liveRun.runId,
        "--root",
        root,
      ]);
      const runCode = await runPromise;

      expect(cancelCode).toBe(0);
      expect(runCode).toBeGreaterThan(0);
      expect(io.stdout).toContain(`task run cancelled: ${taskId}`);
      expect(io.stdout).toContain("status: cancelled");
      expect(io.stdout).toContain(`task run executed: ${taskId}`);
      expect(io.stdout).toContain("runner_exit_code:");

      const finalState = JSON.parse(await readFile(liveRun.statePath, "utf8")) as {
        status: string;
        supervision?: {
          cancel_requested_at?: string | null;
          cancel_signal?: string | null;
          exit_signal?: string | null;
        };
        result?: { status?: string };
      };
      expect(finalState.status).toBe("cancelled");
      expect(finalState.result?.status).toBe("cancelled");
      expect(finalState.supervision?.cancel_requested_at).toBeTruthy();
      expect(finalState.supervision?.cancel_signal).toBeTruthy();
      expect([null, "SIGTERM"]).toContain(finalState.supervision?.exit_signal ?? null);
    } finally {
      process.env.PATH = originalPath;
      io.restore();
    }
  }, 60_000);

  it("task run resume executes an existing prepared run in place", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.runner.default_adapter = "custom";
    config.runner.custom = { command: ["custom-runner"] };
    await writeConfig(root, config);

    const fakeBinDir = path.join(root, "bin");
    const fakeRunnerPath = path.join(fakeBinDir, "custom-runner");
    await mkdir(fakeBinDir, { recursive: true });
    await writeFile(
      fakeRunnerPath,
      [
        "#!/bin/sh",
        String.raw`printf "resume cli runner %s\n" "$AGENTPLANE_RUNNER_RUN_DIR"`,
        "cat >/dev/null",
        "exit 0",
      ].join("\n"),
      "utf8",
    );
    await chmod(fakeRunnerPath, 0o755);

    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Resume prepared run task",
          "--description",
          "Resume prepared run task",
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
      "Start: move the task into DOING before resuming a prepared execute-mode runner run in the CLI test.",
      "--root",
      root,
    ]);
    const commandCtx = await loadCommandContext({ cwd: root, rootOverride: root });
    const prepared = await prepareTaskRunnerExecution({
      ctx: commandCtx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-resume-cli",
    });

    const io = captureStdIO();
    const originalPath = process.env.PATH;
    try {
      process.env.PATH = `${fakeBinDir}${path.delimiter}${originalPath ?? ""}`;
      const code = await runCli([
        "task",
        "run",
        "resume",
        taskId,
        prepared.invocation.run_id,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toBe(
        renderExpectedRunResumeText({
          taskId,
          runId: prepared.invocation.run_id,
          previousStatus: "prepared",
          adapter: prepared.invocation.adapter_id,
          statePath: prepared.invocation.state_path,
          eventsPath: prepared.invocation.events_path,
          status: "success",
          runnerExitCode: 0,
          stdoutSummary: "Raw execution trace was captured in agent-trace.jsonl.",
        }),
      );

      const state = JSON.parse(await readFile(prepared.invocation.state_path, "utf8")) as {
        status: string;
        result?: {
          status: string;
          exit_code: number | null;
          summary?: string;
          stdout_summary?: string;
        };
      };
      expect(state.status).toBe("success");
      expect(state.result?.status).toBe("success");
      expect(state.result?.summary).toBe("Custom runner execution completed successfully.");
      expect(state.result?.stdout_summary).toBe(
        "Raw execution trace was captured in agent-trace.jsonl.",
      );
    } finally {
      process.env.PATH = originalPath;
      io.restore();
    }
  });

  it("task run retry creates a fresh run from a failed run snapshot", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.runner.default_adapter = "custom";
    config.runner.custom = { command: ["custom-runner"] };
    await writeConfig(root, config);

    const fakeBinDir = path.join(root, "bin");
    const fakeRunnerPath = path.join(fakeBinDir, "custom-runner");
    await mkdir(fakeBinDir, { recursive: true });
    await writeFile(
      fakeRunnerPath,
      [
        "#!/bin/sh",
        String.raw`printf "retry cli runner %s\n" "$AGENTPLANE_RUNNER_RUN_DIR"`,
        "cat >/dev/null",
        "exit 0",
      ].join("\n"),
      "utf8",
    );
    await chmod(fakeRunnerPath, 0o755);

    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Retry failed run task",
          "--description",
          "Retry failed run task",
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
      "Start: move the task into DOING before retrying a failed runner run from persisted artifacts in the CLI test.",
      "--root",
      root,
    ]);
    const commandCtx = await loadCommandContext({ cwd: root, rootOverride: root });
    const prepared = await prepareTaskRunnerExecution({
      ctx: commandCtx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-retry-source-cli",
    });
    const failedAt = new Date().toISOString();
    await writeRunnerRunState({
      state_path: prepared.invocation.state_path,
      state: evolveRunnerRunState({
        state: prepared.state,
        status: "failed",
        updated_at: failedAt,
        result: {
          status: "failed",
          exit_code: 1,
          started_at: failedAt,
          ended_at: failedAt,
          stderr_summary: "synthetic failure",
        },
      }),
    });

    const io = captureStdIO();
    const originalPath = process.env.PATH;
    try {
      process.env.PATH = `${fakeBinDir}${path.delimiter}${originalPath ?? ""}`;
      const code = await runCli([
        "task",
        "run",
        "retry",
        taskId,
        prepared.invocation.run_id,
        "--root",
        root,
      ]);
      expect(code).toBe(0);

      const newRunId = /^run_id: (.+)$/m.exec(io.stdout)?.[1] ?? "";
      expect(newRunId).toBeTruthy();
      expect(newRunId).not.toBe(prepared.invocation.run_id);
      const newStatePath = path.join(
        root,
        ".agentplane",
        "tasks",
        taskId,
        "runs",
        newRunId,
        "run-state.json",
      );
      const newEventsPath = path.join(
        root,
        ".agentplane",
        "tasks",
        taskId,
        "runs",
        newRunId,
        "events.jsonl",
      );
      expect(io.stdout).toBe(
        renderExpectedRunRetryText({
          taskId,
          sourceRunId: prepared.invocation.run_id,
          previousStatus: "failed",
          runId: newRunId,
          adapter: "custom",
          statePath: newStatePath,
          eventsPath: newEventsPath,
          status: "success",
          runnerExitCode: 0,
          stdoutSummary: "Raw execution trace was captured in agent-trace.jsonl.",
        }),
      );
      const state = JSON.parse(await readFile(newStatePath, "utf8")) as {
        status: string;
        result?: { status: string; summary?: string; stdout_summary?: string };
      };
      expect(state.status).toBe("success");
      expect(state.result?.status).toBe("success");
      expect(state.result?.summary).toBe("Custom runner execution completed successfully.");
      expect(state.result?.stdout_summary).toBe(
        "Raw execution trace was captured in agent-trace.jsonl.",
      );
    } finally {
      process.env.PATH = originalPath;
      io.restore();
    }
  });
});
