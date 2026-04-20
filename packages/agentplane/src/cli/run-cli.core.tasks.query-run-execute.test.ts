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
  vi,
  waitForRunnerState,
  writeConfig,
  writeDefaultConfig,
  writeFile,
  writeRunnerRunState,
  type ResolvedProject,
  type RunShowPayload,
  type taskBackend,
} from "./run-cli.core.tasks.query-support.js";

describe(
  "runCli task run execution lifecycle queries",
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

    it("task run executes the configured custom runner adapter", async () => {
      const root = await mkGitRepoRoot();
      const config = defaultConfig();
      config.runner.default_adapter = "custom";
      config.runner.custom = {
        command: ["custom-runner", "--bundle-from-env"],
        env: {
          CUSTOM_TOKEN: "runner-token",
        },
      };
      await writeConfig(root, config);

      const fakeBinDir = path.join(root, "bin");
      const fakeRunnerPath = path.join(fakeBinDir, "custom-runner");
      let taskId = "";
      {
        const io = captureStdIO();
        try {
          const code = await runCli([
            "task",
            "new",
            "--title",
            "Custom runner execute task",
            "--description",
            "Execution path uses the custom adapter",
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
        fakeRunnerPath,
        [
          "#!/bin/sh",
          String.raw`bootstrap_line="$(sed -n '1p' "$AGENTPLANE_RUNNER_BOOTSTRAP_PATH")"`,
          String.raw`printf '%s\n' '{"schema_version":1,"summary":"Привет из custom manifest","artifacts":[{"path":"reports/custom.txt","label":"report"}],"findings":["русский finding"],"verification_hints":["русский hint"],"capabilities_used":["custom.report"],"evidence":{"evidence_paths":["reports/custom.txt","logs/custom.log"],"changed_paths":["src/runner/task-state.ts","src/runner/result-manifest.ts"],"files_changed_count":2,"tests_run":["bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts"],"verification_candidates":["inspect reports/custom.txt","inspect logs/custom.log"]}}' > "$AGENTPLANE_RUNNER_RESULT_PATH"`,
          String.raw`printf "custom runner ok %s %s %s\n" "$CUSTOM_TOKEN" "$AGENTPLANE_RUNNER_TARGET" "$bootstrap_line"`,
          "cat >/dev/null",
          "exit 0",
        ].join("\n"),
        "utf8",
      );
      await chmod(fakeRunnerPath, 0o755);
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
        "Start: move the task into DOING before executing the custom runner adapter in the CLI test.",
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
        expect(io.stdout).toContain("adapter: custom");
        expect(io.stdout).toContain("status: success");
        expect(io.stdout).toContain("runner_exit_code: 0");
        expect(io.stdout).toContain(
          "stdout: Raw execution trace was captured in agent-trace.jsonl.",
        );

        const runsRoot = path.join(root, ".agentplane", "tasks", taskId, "runs");
        const runEntries = await readdir(runsRoot);
        const sortedRunEntries = runEntries.toSorted();
        expect(sortedRunEntries).toHaveLength(1);
        const runDir = path.join(runsRoot, sortedRunEntries[0] ?? "");
        const statePath = path.join(runDir, "run-state.json");
        const bundlePath = path.join(runDir, "bundle.json");
        const resultPath = path.join(runDir, "result.json");
        const sourceResultPath = path.join(runDir, "result.source.json");
        const state = JSON.parse(await readFile(statePath, "utf8")) as {
          adapter_id: string;
          status: string;
          result?: {
            status: string;
            exit_code: number | null;
            summary?: string;
            stdout_summary?: string;
            findings?: string[];
            verification_hints?: string[];
            evidence?: {
              evidence_paths?: string[];
              changed_paths?: string[];
              files_changed_count?: number;
              tests_run?: string[];
              verification_candidates?: string[];
            };
          };
        };
        const bundle = JSON.parse(await readFile(bundlePath, "utf8")) as {
          execution: { adapter_id: string; mode: string };
        };
        const manifest = JSON.parse(await readFile(resultPath, "utf8")) as {
          summary?: string;
          artifacts?: { path: string; label?: string }[];
          findings?: string[];
          verification_hints?: string[];
          capabilities_used?: string[];
          evidence?: {
            evidence_paths?: string[];
            changed_paths?: string[];
            files_changed_count?: number;
            tests_run?: string[];
            verification_candidates?: string[];
          };
        };
        expect(bundle.execution.adapter_id).toBe("custom");
        expect(bundle.execution.mode).toBe("execute");
        expect(state.adapter_id).toBe("custom");
        expect(state.status).toBe("success");
        expect(state.result?.status).toBe("success");
        expect(state.result?.exit_code).toBe(0);
        expect(state.result?.summary).toBe("Custom runner execution completed successfully.");
        expect(state.result?.stdout_summary).toBe(
          "Raw execution trace was captured in agent-trace.jsonl.",
        );
        expect(state.result?.findings).toBeUndefined();
        expect(state.result?.verification_hints).toBeUndefined();
        expect(state.result?.evidence).toEqual({
          evidence_paths: ["reports/custom.txt", "logs/custom.log"],
          changed_paths: ["src/runner/task-state.ts", "src/runner/result-manifest.ts"],
          files_changed_count: 2,
          tests_run: ["bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts"],
          verification_candidates: ["inspect reports/custom.txt", "inspect logs/custom.log"],
        });
        expect(manifest.summary).toBe("Custom runner execution completed successfully.");
        expect(manifest.artifacts).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ path: "reports/custom.txt", label: "report" }),
          ]),
        );
        expect(manifest.findings).toBeUndefined();
        expect(manifest.verification_hints).toBeUndefined();
        expect(manifest.capabilities_used).toEqual(["custom.report"]);
        expect(manifest.evidence).toEqual({
          evidence_paths: ["reports/custom.txt", "logs/custom.log"],
          changed_paths: ["src/runner/task-state.ts", "src/runner/result-manifest.ts"],
          files_changed_count: 2,
          tests_run: ["bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts"],
          verification_candidates: ["inspect reports/custom.txt", "inspect logs/custom.log"],
        });
        expect(await pathExists(sourceResultPath)).toBe(true);
        expect(await readFile(sourceResultPath, "utf8")).toContain("Привет из custom manifest");
        expect(await readFile(sourceResultPath, "utf8")).toContain("русский finding");
        expect(await readFile(sourceResultPath, "utf8")).toContain("русский hint");
        expect(await readFile(sourceResultPath, "utf8")).toContain('"files_changed_count":2');

        const task = await readTask({ cwd: root, rootOverride: root, taskId });
        expect(task.frontmatter.runner).toMatchObject({
          status: "success",
          evidence: {
            evidence_paths: ["reports/custom.txt", "logs/custom.log"],
            changed_paths: ["src/runner/task-state.ts", "src/runner/result-manifest.ts"],
            files_changed_count: 2,
            tests_run: ["bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts"],
            verification_candidates: ["inspect reports/custom.txt", "inspect logs/custom.log"],
          },
        });
        expect(task.body).toContain("Summary: Custom runner completed successfully.");
        expect(task.body).not.toContain("русский finding");
        expect(task.body).toContain("source-result-manifest=");
        expect(task.body).toContain("result.source.json");
        expect(task.body).toContain("VerificationHint: runner completed successfully");
        expect(task.body).toContain("Capabilities: custom.report");
        expect(task.body).toContain("EvidencePaths: reports/custom.txt, logs/custom.log");
        expect(task.body).toContain(
          "ChangedPaths: src/runner/task-state.ts, src/runner/result-manifest.ts",
        );
        expect(task.body).toContain("FilesChangedCount: 2");
        expect(task.body).toContain(
          "TestsRun: bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts",
        );
        expect(task.body).toContain(
          "VerificationCandidates: inspect reports/custom.txt | inspect logs/custom.log",
        );
      } finally {
        process.env.PATH = originalPath;
        io.restore();
      }
    });

    it("task run classifies idle timeouts and persists timeout metadata", async () => {
      const root = await mkGitRepoRoot();
      const config = defaultConfig();
      config.runner.default_adapter = "custom";
      config.runner.custom = {
        command: ["custom-runner"],
      };
      config.runner.timeouts = {
        wall_clock_ms: 5000,
        idle_ms: 150,
        terminate_grace_ms: 50,
      };
      await writeConfig(root, config);

      const fakeBinDir = path.join(root, "bin");
      const fakeRunnerPath = path.join(fakeBinDir, "custom-runner");
      let taskId = "";
      {
        const io = captureStdIO();
        try {
          const code = await runCli([
            "task",
            "new",
            "--title",
            "Custom runner timeout task",
            "--description",
            "Execution path classifies idle timeout",
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
        fakeRunnerPath,
        ["#!/bin/sh", "cat >/dev/null", "while :; do sleep 1; done"].join("\n"),
        "utf8",
      );
      await chmod(fakeRunnerPath, 0o755);
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
        "Start: move the task into DOING before exercising idle timeout classification in the custom runner CLI test.",
        "--root",
        root,
      ]);

      const io = captureStdIO();
      const originalPath = process.env.PATH;
      try {
        process.env.PATH = `${fakeBinDir}${path.delimiter}${originalPath ?? ""}`;
        const code = await runCli(["task", "run", taskId, "--root", root]);
        expect(code).toBe(124);
        expect(io.stdout).toContain(`task run executed: ${taskId}`);
        expect(io.stdout).toContain("adapter: custom");
        expect(io.stdout).toContain("status: failed");
        expect(io.stdout).toContain("runner_exit_code: 124");
        expect(io.stderr).toContain(
          "stderr: Timeout details were captured in stderr.log and agent-trace.jsonl.",
        );

        const runsRoot = path.join(root, ".agentplane", "tasks", taskId, "runs");
        const runEntries = await readdir(runsRoot);
        const runDir = path.join(runsRoot, runEntries.toSorted()[0] ?? "");
        const statePath = path.join(runDir, "run-state.json");
        const eventsPath = path.join(runDir, "events.jsonl");
        const state = JSON.parse(await readFile(statePath, "utf8")) as {
          status: string;
          supervision?: {
            timeout_reason?: string | null;
            timeout_requested_at?: string | null;
            terminate_sent_at?: string | null;
            kill_sent_at?: string | null;
          };
          result?: {
            status?: string;
            exit_code?: number | null;
            summary?: string;
            timeout_reason?: string | null;
          };
        };
        expect(state.status).toBe("failed");
        expect(state.result?.status).toBe("failed");
        expect(state.result?.exit_code).toBe(124);
        expect(state.result?.summary).toBe("Custom runner execution timed out (idle).");
        expect(state.result?.timeout_reason).toBe("idle");
        expect(state.supervision?.timeout_reason).toBe("idle");
        expect(state.supervision?.timeout_requested_at).toBeTruthy();
        expect(state.supervision?.terminate_sent_at).toBeTruthy();

        const events = await readFile(eventsPath, "utf8");
        expect(events).toContain('"type":"runner_timeout_requested"');
        expect(events).toContain('"reason":"idle"');

        const task = await readTask({ cwd: root, rootOverride: root, taskId });
        expect(task.frontmatter.runner).toMatchObject({
          status: "failed",
          adapter_id: "custom",
          exit_code: 124,
          target: { kind: "task", task_id: taskId },
        });
        expect(task.body).toContain("RUNNER — failed");
        expect(task.body).toContain(
          "Summary: Custom runner failed; inspect run artifacts for details.",
        );
      } finally {
        process.env.PATH = originalPath;
        io.restore();
      }
    });

    it("task run surfaces malformed runner manifests as deterministic failures", async () => {
      const root = await mkGitRepoRoot();
      const config = defaultConfig();
      config.runner.default_adapter = "custom";
      config.runner.custom = {
        command: ["custom-runner"],
      };
      await writeConfig(root, config);

      const fakeBinDir = path.join(root, "bin");
      const fakeRunnerPath = path.join(fakeBinDir, "custom-runner");
      let taskId = "";
      {
        const io = captureStdIO();
        try {
          const code = await runCli([
            "task",
            "new",
            "--title",
            "Custom runner invalid manifest task",
            "--description",
            "Execution path writes an invalid result manifest",
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
        fakeRunnerPath,
        [
          "#!/bin/sh",
          String.raw`printf '{"schema_version":1,"artifacts":[{"path":"reports/out.txt","label":"Bad Label"}],"capabilities_used":["custom report"]}\n' > "$AGENTPLANE_RUNNER_RESULT_PATH"`,
          "cat >/dev/null",
          String.raw`printf "custom runner wrote invalid manifest\n"`,
          "exit 0",
        ].join("\n"),
        "utf8",
      );
      await chmod(fakeRunnerPath, 0o755);
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
        "Start: move the task into DOING before exercising the invalid runner result manifest path in the CLI test.",
        "--root",
        root,
      ]);

      const io = captureStdIO();
      const originalPath = process.env.PATH;
      try {
        process.env.PATH = `${fakeBinDir}${path.delimiter}${originalPath ?? ""}`;
        const code = await runCli(["task", "run", taskId, "--root", root]);
        expect(code).toBe(1);
        expect(io.stdout).toContain(`task run executed: ${taskId}`);
        expect(io.stdout).toContain("status: failed");
        expect(io.stderr).toContain("Invalid runner result manifest");

        const task = await readTask({ cwd: root, rootOverride: root, taskId });
        expect(task.frontmatter.runner).toMatchObject({
          status: "failed",
          adapter_id: "custom",
          mode: "execute",
          target: { kind: "task", task_id: taskId },
        });
        expect(task.body).toContain("RUNNER — failed");
        expect(task.body).toContain(
          "Summary: Custom runner failed; inspect run artifacts for details.",
        );

        const runsRoot = path.join(root, ".agentplane", "tasks", taskId, "runs");
        const runEntries = await readdir(runsRoot);
        const runDir = path.join(runsRoot, runEntries.toSorted()[0] ?? "");
        const sourceManifestPath = path.join(runDir, "result.source.json");
        const preservedManifestPath = path.join(runDir, "result.invalid.json");
        expect(await pathExists(sourceManifestPath)).toBe(true);
        expect(await pathExists(preservedManifestPath)).toBe(true);
        expect(await readFile(sourceManifestPath, "utf8")).toContain('"label":"Bad Label"');
        expect(await readFile(sourceManifestPath, "utf8")).toContain(
          '"capabilities_used":["custom report"]',
        );
        expect(await readFile(preservedManifestPath, "utf8")).toContain('"label":"Bad Label"');
        expect(await readFile(preservedManifestPath, "utf8")).toContain(
          '"capabilities_used":["custom report"]',
        );
      } finally {
        process.env.PATH = originalPath;
        io.restore();
      }
    });

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
  },
);
