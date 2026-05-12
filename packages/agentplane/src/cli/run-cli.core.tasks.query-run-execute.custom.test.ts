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

describe("runCli task run custom adapter outcomes", { timeout: TASKS_QUERY_CLI_TIMEOUT_MS }, () => {
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
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
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
      expect(io.stdout).toContain("stdout: Raw execution trace was captured in agent-trace.jsonl.");

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
      const sourceResultRaw = await readFile(sourceResultPath, "utf8");
      const sourceResult = JSON.parse(sourceResultRaw) as {
        summary?: string;
        findings?: unknown;
        verification_hints?: unknown;
        evidence?: {
          files_changed_count?: number;
        };
      };
      expect(sourceResult.summary).toBe("Привет из custom manifest");
      const hasCyrillicFinding =
        typeof sourceResult.findings === "string"
          ? sourceResult.findings.includes("русский finding")
          : Array.isArray(sourceResult.findings) &&
            sourceResult.findings.includes("русский finding");
      const hasCyrillicHint =
        typeof sourceResult.verification_hints === "string"
          ? sourceResult.verification_hints.includes("русский hint")
          : Array.isArray(sourceResult.verification_hints) &&
            sourceResult.verification_hints.includes("русский hint");
      expect(hasCyrillicFinding).toBe(true);
      expect(hasCyrillicHint).toBe(true);
      expect(sourceResult.evidence?.files_changed_count).toBe(2);

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
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
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
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
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
});
