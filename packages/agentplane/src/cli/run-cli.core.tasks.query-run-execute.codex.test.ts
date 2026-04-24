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

describe(
  "runCli task run Codex execution outcomes",
  { timeout: TASKS_QUERY_CLI_TIMEOUT_MS },
  () => {
    it("task run without --dry-run executes the prepared runner adapter and persists run-state", async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      const fakeBinDir = path.join(root, "bin");
      const fakeCodexPath = path.join(fakeBinDir, "codex");
      let taskId = "";
      {
        const io = captureStdIO();
        try {
          const code = await runCli([
            "task",
            "new",
            "--title",
            "Runner execute placeholder task",
            "--description",
            "Execution path lands in the next task",
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

      await mkdir(fakeBinDir, { recursive: true });
      await writeFile(
        fakeCodexPath,
        [
          "#!/bin/sh",
          'out=""',
          'while [ "$#" -gt 0 ]; do',
          '  case "$1" in',
          "    exec|--json|-|danger-full-access|never)",
          "      shift",
          "      ;;",
          "    --output-last-message|-C|-s|-a)",
          '      if [ "$1" = "--output-last-message" ]; then out="$2"; fi',
          "      shift 2",
          "      ;;",
          "    *)",
          "      shift",
          "      ;;",
          "  esac",
          "done",
          "cat >/dev/null",
          String.raw`printf '{"type":"session.started"}\n'`,
          String.raw`printf '%s\n' '${RUSSIAN_LAST_MESSAGE}' > "$out"`,
          String.raw`printf '%s\n' '${RUSSIAN_TRACE_LINE}'`,
          String.raw`printf '{"schema_version":1,"status":"success","summary":"cli codex success","capabilities_used":["codex.exec"]}\n' > "$AGENTPLANE_RUNNER_RESULT_PATH"`,
          "exit 0",
        ].join("\n"),
        "utf8",
      );
      await chmod(fakeCodexPath, 0o755);
      await runCliSilent([
        "task",
        "plan",
        "approve",
        taskId,
        "--by",
        "ORCHESTRATOR",
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
        "Start: move the task into DOING before executing the prepared runner adapter in the CLI test.",
        "--root",
        root,
      ]);

      const io = captureStdIO();
      const originalPath = process.env.PATH;
      try {
        process.env.PATH = `${fakeBinDir}${path.delimiter}${originalPath ?? ""}`;
        const code = await runCli(["task", "run", taskId, "--root", root]);
        expect(code).toBe(0);
        expect(io.stdout).toContain(`task run executed: ${taskId}`);
        expect(io.stdout).toContain("status: success");
        expect(io.stdout).toContain("runner_exit_code: 0");
        expect(io.stdout).toContain(
          "stdout: Assistant output was captured in codex-last-message.md; raw execution trace is in agent-trace.jsonl.",
        );
        expect(io.stdout).not.toMatch(CYRILLIC_RE);

        const runsRoot = path.join(root, ".agentplane", "tasks", taskId, "runs");
        const runEntries = await readdir(runsRoot);
        const sortedRunEntries = runEntries.toSorted();
        expect(sortedRunEntries).toHaveLength(1);
        const runDir = path.join(runsRoot, sortedRunEntries[0] ?? "");
        const statePath = path.join(runDir, "run-state.json");
        const tracePath = path.join(runDir, "agent-trace.jsonl");
        const lastMessagePath = path.join(runDir, "codex-last-message.md");
        const state = JSON.parse(await readFile(statePath, "utf8")) as {
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
        expect(state.result?.exit_code).toBe(0);
        expect(state.result?.summary).toBe("cli codex success");
        expect(state.result?.stdout_summary).toBe(
          "Assistant output was captured in codex-last-message.md; raw execution trace is in agent-trace.jsonl.",
        );
        expect(state.result?.summary).not.toMatch(CYRILLIC_RE);
        expect(state.result?.stdout_summary).not.toMatch(CYRILLIC_RE);

        const trace = await readFile(tracePath, "utf8");
        const lastMessage = await readFile(lastMessagePath, "utf8");
        expect(trace).toContain(RUSSIAN_TRACE_LINE);
        expect(lastMessage).toContain(RUSSIAN_LAST_MESSAGE);

        const task = await readTask({ cwd: root, rootOverride: root, taskId });
        expect(task.frontmatter.verification?.state).toBe("pending");
        expect(task.frontmatter.runner).toMatchObject({
          run_id: sortedRunEntries[0],
          status: "success",
          adapter_id: "codex",
          mode: "execute",
          exit_code: 0,
          target: { kind: "task", task_id: taskId },
        });
        expect(task.body).toContain("<!-- BEGIN RUNNER OUTCOME -->");
        expect(task.body).toContain("RUNNER — success");
        expect(task.body).toContain("Summary: Codex runner completed successfully.");
        expect(task.body).toContain("assistant-last-message=");
        expect(task.body).toContain("codex-last-message.md");
        expect(task.body).not.toMatch(CYRILLIC_RE);
        expect(task.body).toContain("VerificationHint: runner completed successfully");
      } finally {
        process.env.PATH = originalPath;
        io.restore();
      }
    });

    it("task run failure writes the failed outcome back into task state and findings", async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      const fakeBinDir = path.join(root, "bin");
      const fakeCodexPath = path.join(fakeBinDir, "codex");
      let taskId = "";
      {
        const io = captureStdIO();
        try {
          const code = await runCli([
            "task",
            "new",
            "--title",
            "Runner failed task",
            "--description",
            "Execution path captures a failed runner outcome",
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

      await mkdir(fakeBinDir, { recursive: true });
      await writeFile(
        fakeCodexPath,
        [
          "#!/bin/sh",
          "cat >/dev/null",
          String.raw`printf 'runner failed stderr\n' >&2`,
          "exit 17",
        ].join("\n"),
        "utf8",
      );
      await chmod(fakeCodexPath, 0o755);
      await runCliSilent([
        "task",
        "plan",
        "approve",
        taskId,
        "--by",
        "ORCHESTRATOR",
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
        "Start: move the task into DOING before exercising the failed task-run outcome path in the CLI test.",
        "--root",
        root,
      ]);

      const io = captureStdIO();
      const originalPath = process.env.PATH;
      try {
        process.env.PATH = `${fakeBinDir}${path.delimiter}${originalPath ?? ""}`;
        const code = await runCli(["task", "run", taskId, "--root", root]);
        expect(code).toBe(17);
        expect(io.stdout).toContain(`task run executed: ${taskId}`);
        expect(io.stdout).toContain("status: failed");
        expect(io.stdout).toContain("runner_exit_code: 17");
        expect(io.stderr).toContain(
          "stderr: Failure details were captured in stderr.log and agent-trace.jsonl.",
        );

        const task = await readTask({ cwd: root, rootOverride: root, taskId });
        expect(task.frontmatter.status).toBe("DOING");
        expect(task.frontmatter.verification?.state).toBe("pending");
        expect(task.frontmatter.runner).toMatchObject({
          status: "failed",
          adapter_id: "codex",
          mode: "execute",
          exit_code: 17,
          target: { kind: "task", task_id: taskId },
        });
        expect(task.body).toContain("RUNNER — failed");
        expect(task.body).toContain(
          "Summary: Codex runner failed; inspect run artifacts for details.",
        );
        expect(task.body).toContain("VerificationHint: runner failed");
      } finally {
        process.env.PATH = originalPath;
        io.restore();
      }
    });
  },
);
