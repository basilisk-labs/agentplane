/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe } from "vitest";

import {
  CYRILLIC_RE,
  RUSSIAN_LAST_MESSAGE,
  RUSSIAN_TRACE_LINE,
  TASKS_QUERY_CLI_TIMEOUT_MS,
  VERIFY_STEPS_PLACEHOLDER,
  approveAndStartTaskQueryCliTask,
  captureStdIO,
  chmod,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  createTaskQueryCliTask,
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

describe("runCli task run inspection queries", { timeout: TASKS_QUERY_CLI_TIMEOUT_MS }, () => {
  it("task run show, trace, and tail inspect the latest persisted run without manual file reads", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.runner.default_adapter = "custom";
    config.runner.custom = {
      command: ["custom-runner"],
    };
    await writeConfig(root, config);

    const fakeBinDir = path.join(root, "bin");
    const fakeRunnerPath = path.join(fakeBinDir, "custom-runner");
    const taskId = await createTaskQueryCliTask(root, {
      title: "Runner inspect task",
      description: "Inspect persisted runner artifacts via CLI",
    });

    await mkdir(fakeBinDir, { recursive: true });
    await writeFile(
      fakeRunnerPath,
      [
        "#!/bin/sh",
        "cat >/dev/null",
        String.raw`printf "trace line one\n"`,
        String.raw`printf "trace line two\n"`,
        "exit 0",
      ].join("\n"),
      "utf8",
    );
    await chmod(fakeRunnerPath, 0o755);
    await approveAndStartTaskQueryCliTask(
      root,
      taskId,
      "Start: move the task into DOING before exercising runner inspection commands in the CLI test.",
    );

    const originalPath = process.env.PATH;
    try {
      process.env.PATH = `${fakeBinDir}${path.delimiter}${originalPath ?? ""}`;
      expect(await runCliSilent(["task", "run", taskId, "--root", root])).toBe(0);

      const runsRoot = path.join(root, ".agentplane", "tasks", taskId, "runs");
      const runEntries = await readdir(runsRoot);
      const runId = runEntries.toSorted()[0] ?? "";
      expect(runId).toBeTruthy();
      let jsonPayload: RunShowPayload | null = null;
      {
        const io = captureStdIO();
        try {
          const code = await runCli(["task", "run", "show", taskId, "--json", "--root", root]);
          expect(code).toBe(0);
          const payload = JSON.parse(io.stdout) as RunShowPayload;
          expect(payload.task_id).toBe(taskId);
          expect(payload.run_id).toBe(runId);
          expect(payload.selection).toBe("latest");
          expect(payload.state.status).toBe("success");
          expect(payload.state.adapter_id).toBe("custom");
          expect(payload.state.policy_decision?.requested).toEqual({});
          expect(payload.state.result?.summary).toBe(
            "Custom runner execution completed successfully.",
          );
          expect(payload.events_count).toBeGreaterThan(0);
          expect(payload.last_event?.type).toBeTruthy();
          expect(payload.paths.trace_path).toContain(
            path.join(taskId, "runs", runId, "agent-trace.jsonl"),
          );
          expect(io.stdout).toBe(`${JSON.stringify(payload, null, 2)}\n`);
          jsonPayload = payload;
        } finally {
          io.restore();
        }
      }

      {
        const io = captureStdIO();
        try {
          const code = await runCli(["task", "run", "show", taskId, "--root", root]);
          expect(code).toBe(0);
          expect(jsonPayload).toBeTruthy();
          if (!jsonPayload) throw new Error("Expected JSON payload before plain-text run show");
          expect(io.stdout).toBe(renderExpectedRunShowText(taskId, jsonPayload));
        } finally {
          io.restore();
        }
      }

      {
        const io = captureStdIO();
        try {
          const code = await runCli(["task", "run", "trace", taskId, "--root", root]);
          expect(code).toBe(0);
          expect(io.stdout).toContain('"stream":"stdout"');
          expect(io.stdout).toContain('"raw":"trace line one"');
          expect(io.stdout).toContain('"raw":"trace line two"');
          expect(io.stdout).not.toContain("task run trace:");
        } finally {
          io.restore();
        }
      }

      {
        const io = captureStdIO();
        try {
          const code = await runCli([
            "task",
            "run",
            "tail",
            taskId,
            runId,
            "--lines",
            "1",
            "--root",
            root,
          ]);
          expect(code).toBe(0);
          expect(io.stdout).toContain('"raw":"trace line two"');
          expect(io.stdout).not.toContain('"raw":"trace line one"');
        } finally {
          io.restore();
        }
      }
    } finally {
      process.env.PATH = originalPath;
    }
  });

  it("task run trace reads gzipped trace artifacts and redacts configured patterns", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.runner.default_adapter = "custom";
    config.runner.custom = {
      command: ["custom-runner"],
      env: {
        CUSTOM_TOKEN: "runner-token",
      },
    };
    config.runner.trace = {
      ...config.runner.trace,
      retention: "remove_on_success",
      compression: "gzip",
      redact_patterns: ["runner-token"],
    };
    await writeConfig(root, config);

    const fakeBinDir = path.join(root, "bin");
    const fakeRunnerPath = path.join(fakeBinDir, "custom-runner");
    const taskId = await createTaskQueryCliTask(root, {
      title: "Runner compressed trace task",
      description: "Inspect compressed runner trace artifacts via CLI",
    });

    await mkdir(fakeBinDir, { recursive: true });
    await writeFile(
      fakeRunnerPath,
      [
        "#!/bin/sh",
        String.raw`printf "trace runner-token line\n"`,
        String.raw`printf "stderr runner-token\n" 1>&2`,
        "cat >/dev/null",
        "exit 0",
      ].join("\n"),
      "utf8",
    );
    await chmod(fakeRunnerPath, 0o755);
    await approveAndStartTaskQueryCliTask(
      root,
      taskId,
      "Start: move the task into DOING before exercising compressed runner trace inspection in the CLI test.",
    );

    const originalPath = process.env.PATH;
    try {
      process.env.PATH = `${fakeBinDir}${path.delimiter}${originalPath ?? ""}`;
      expect(await runCliSilent(["task", "run", taskId, "--root", root])).toBe(0);

      const runsRoot = path.join(root, ".agentplane", "tasks", taskId, "runs");
      const runEntries = await readdir(runsRoot);
      const runDir = path.join(runsRoot, runEntries.toSorted()[0] ?? "");
      expect(await pathExists(path.join(runDir, "agent-trace.jsonl"))).toBe(false);
      expect(await pathExists(path.join(runDir, "stderr.log"))).toBe(false);
      expect(await pathExists(path.join(runDir, "agent-trace.jsonl.gz"))).toBe(true);
      expect(await pathExists(path.join(runDir, "stderr.log.gz"))).toBe(true);

      const io = captureStdIO();
      try {
        const code = await runCli(["task", "run", "trace", taskId, "--root", root]);
        expect(code).toBe(0);
        expect(io.stdout).toContain('"raw":"trace [REDACTED] line"');
        expect(io.stdout).not.toContain("runner-token");
      } finally {
        io.restore();
      }
    } finally {
      process.env.PATH = originalPath;
    }
  });

  it("task run trace fails with a typed error when the requested run is missing", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = await createTaskQueryCliTask(root, {
      title: "Missing runner trace task",
      description: "Missing runner trace task",
    });

    const io = captureStdIO();
    try {
      const code = await runCli(["task", "run", "trace", taskId, "missing-run", "--root", root]);
      expect(code).toBe(4);
      expect(io.stderr).toContain("error [E_IO]: Runner artifact not found");
      expect(io.stderr).toContain(`${taskId}:missing-run`);
    } finally {
      io.restore();
    }
  });
});
