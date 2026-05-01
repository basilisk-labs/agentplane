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

describe("runCli task run preparation", { timeout: TASKS_QUERY_CLI_TIMEOUT_MS }, () => {
  it("task rebuild-index recreates the cache from tracked task artifacts when the cache file is missing", async () => {
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
          "Rebuild index task",
          "--description",
          "Exercise task rebuild-index on a missing cache file",
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

    const cachePath = path.join(root, ".agentplane", "cache", "tasks-index.v2.json");
    await rm(cachePath, { force: true });

    const io = captureStdIO();
    try {
      const code = await runCli(["task", "rebuild-index", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(await readFile(cachePath, "utf8")) as {
        schema_version: number;
        byId: Record<string, { task: { id: string } }>;
      };
      expect(parsed.schema_version).toBe(2);
      expect(parsed.byId[taskId]?.task.id).toBe(taskId);
    } finally {
      io.restore();
    }
  });

  it("task run rejects tasks that have not entered DOING yet", async () => {
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
          "Runner placeholder task",
          "--description",
          "Placeholder task run contract",
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

    const io = captureStdIO();
    try {
      const code = await runCli(["task", "run", taskId, "--dry-run", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain(`runner execution requires task status DOING`);
      expect(io.stderr).toContain(`agentplane task start-ready ${taskId}`);

      const runsRoot = path.join(root, ".agentplane", "tasks", taskId, "runs");
      expect(await pathExists(runsRoot)).toBe(false);
    } finally {
      io.restore();
    }
  });

  it("task run --dry-run materializes runner artifacts for a DOING task without executing a real runner", async () => {
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
          "Runner placeholder task",
          "--description",
          "Placeholder task run contract",
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
      "doc",
      "set",
      taskId,
      "--section",
      "Verify Steps",
      "--text",
      String.raw`1. Inspect the dry-run surface. Expected: the reported enforcement mode matches the custom wrapper configuration.\n2. Inspect the sandbox capability line. Expected: it shows wrapper enforcement and the supported sandbox values.\n3. Compare the task output against the dry-run contract. Expected: the task remains in scope with no unexpected errors.`,
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: move the task into DOING before preparing runner artifacts for the dry-run contract.",
      "--root",
      root,
    ]);

    const io = captureStdIO();
    try {
      const code = await runCli(["task", "run", taskId, "--dry-run", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(`task run dry-run prepared: ${taskId}`);
      expect(io.stdout).toContain("adapter: codex");
      expect(io.stdout).toContain("bundle:");
      expect(io.stdout).toContain('capabilities: {"adapter_id":"codex"');
      expect(io.stdout).toContain(
        "capability[sandbox]: level=native channel=argv supported=read-only,workspace-write,danger-full-access",
      );
      expect(io.stdout).toContain("policy_requested: {}");
      expect(io.stdout).toContain("policy_effective: {}");
      expect(io.stdout).toContain("policy_fields:");
      expect(io.stdout).toContain("policy_refusal: null");
      expect(io.stdout).toContain(
        "policy_field[sandbox]: status=not_requested capability=native channel=argv supported=read-only,workspace-write,danger-full-access",
      );
      expect(io.stdout).toContain("argv: codex -a never exec --json --output-last-message");

      const runsRoot = path.join(root, ".agentplane", "tasks", taskId, "runs");
      expect(await pathExists(runsRoot)).toBe(true);
      const runEntries = await readdir(runsRoot);
      const entries = runEntries.toSorted();
      expect(entries).toHaveLength(1);
      const runDir = path.join(runsRoot, entries[0] ?? "");
      const bundlePath = path.join(runDir, "bundle.json");
      const bootstrapPath = path.join(runDir, "bootstrap.md");
      const statePath = path.join(runDir, "run-state.json");
      expect(await pathExists(bundlePath)).toBe(true);
      expect(await pathExists(bootstrapPath)).toBe(true);
      expect(await pathExists(statePath)).toBe(true);

      const bundle = JSON.parse(await readFile(bundlePath, "utf8")) as {
        base_prompts?: { id?: string; title?: string; content?: string }[];
        framework_explain?: {
          schema_version?: number;
          policy?: {
            approvals?: {
              require_plan?: boolean;
              require_verify?: boolean;
              require_network?: boolean;
            };
          };
          runtime?: {
            task_intake?: {
              precedence?: {
                behavior_order?: string[];
                extension_layer?: string;
              };
            };
          };
          behavior_inputs?: { id?: string; category?: string; source?: string }[];
        };
        framework_protocol?: {
          explain?: {
            schema_version?: number;
            kind?: string;
            status?: string;
            compatibility?: {
              strategy?: string;
              breaking_changes_require_schema_version?: boolean;
              additive_fields_allowed?: boolean;
              new_result_kinds_allowed?: boolean;
            };
            data?: {
              runtime?: {
                task_intake?: {
                  precedence?: {
                    extension_layer?: string;
                  };
                };
              };
            };
          };
        };
        execution: {
          mode: string;
          adapter_id: string;
          approvals?: {
            require_plan?: boolean;
            require_verify?: boolean;
            require_network?: boolean;
          };
          profile_runtime?: {
            profile?: string;
            reasoning_effort?: string;
            text_verbosity?: string;
            budget?: {
              discovery?: { used?: number; remaining?: number };
              implementation?: { used?: number; remaining?: number };
            };
            stop_conditions?: string[];
            handoff_conditions?: string[];
          };
          trace_policy?: {
            mode?: string;
            max_tail_bytes?: number;
            capture_stderr?: boolean;
            retention?: string;
            compression?: string;
            redact_patterns?: string[];
          };
          timeout_policy?: {
            wall_clock_ms?: number;
            idle_ms?: number;
            terminate_grace_ms?: number;
          };
          adapter_capabilities?: { adapter_id: string };
          policy_decision?: {
            requested?: Record<string, unknown>;
            effective?: Record<string, unknown>;
            refusal_reason?: { policy_field?: string } | null;
          };
        };
        task: { task_id: string };
      };
      const bootstrap = await readFile(bootstrapPath, "utf8");
      expect(bundle.execution.mode).toBe("dry_run");
      expect(bundle.execution.adapter_id).toBe("codex");
      expect(bundle.execution.trace_policy).toEqual({
        mode: "raw",
        max_tail_bytes: 65_536,
        capture_stderr: true,
        retention: "keep",
        compression: "none",
        redact_patterns: [],
      });
      expect(bundle.execution.timeout_policy).toEqual({
        wall_clock_ms: 900_000,
        idle_ms: 180_000,
        terminate_grace_ms: 1500,
      });
      expect(bundle.execution.adapter_capabilities?.adapter_id).toBe("codex");
      expect(bundle.execution.policy_decision?.requested).toEqual({});
      expect(bundle.execution.policy_decision?.effective).toEqual({});
      expect(bundle.execution.policy_decision?.refusal_reason).toBeNull();
      expect(bundle.execution.profile_runtime).toMatchObject({
        profile: "balanced",
        reasoning_effort: "medium",
        text_verbosity: "medium",
        budget: {
          discovery: { used: 1, remaining: 5 },
          implementation: { used: 1, remaining: 9 },
        },
      });
      expect(bundle.execution.profile_runtime?.stop_conditions?.length).toBeGreaterThan(0);
      expect(bundle.execution.profile_runtime?.handoff_conditions?.length).toBeGreaterThan(0);
      expect(bundle.base_prompts?.map((prompt) => prompt.id)).toContain("base.execution_profile");
      expect(
        bundle.base_prompts?.find((prompt) => prompt.id === "base.execution_profile")?.content,
      ).toContain('"reasoning_effort": "medium"');
      expect(
        bundle.base_prompts?.find((prompt) => prompt.id === "base.execution_profile")?.content,
      ).toContain('"text_verbosity": "medium"');
      expect(bundle.framework_explain).toMatchObject({
        schema_version: 1,
        policy: {
          approvals: {
            require_plan: true,
            require_verify: true,
          },
        },
        runtime: {
          task_intake: {
            precedence: {
              behavior_order: ["harness", "extension", "user", "builtin"],
              extension_layer: "recipes",
            },
          },
        },
      });
      expect(bundle.framework_explain?.policy?.approvals?.require_network).toBe(
        bundle.execution.approvals?.require_network,
      );
      expect(bundle.framework_explain?.behavior_inputs).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: "base.policy_gateway",
            category: "prompt",
          }),
          expect.objectContaining({
            id: "base.execution_profile",
            category: "prompt",
          }),
        ]),
      );
      expect(bundle.framework_protocol).toMatchObject({
        explain: {
          schema_version: 1,
          kind: "framework.explain",
          status: "ok",
          compatibility: {
            strategy: "additive",
            breaking_changes_require_schema_version: true,
            additive_fields_allowed: true,
            new_result_kinds_allowed: true,
          },
          data: {
            runtime: {
              task_intake: {
                precedence: {
                  extension_layer: "recipes",
                },
              },
            },
          },
        },
      });
      expect(bundle.task.task_id).toBe(taskId);
      expect(bootstrap).toContain(
        "This invocation is already inside an approved runner execution.",
      );
      expect(bootstrap).toContain("Do not run repository startup commands");
      expect(bootstrap).toContain("Open bundle.json immediately");
    } finally {
      io.restore();
    }
  });

  it("task run --dry-run surfaces configured custom wrapper enforcement mode and supported sandbox semantics", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.runner.default_adapter = "custom";
    config.runner.custom = {
      command: ["custom-runner"],
      enforcement: {
        mode: "codex_sandbox_full_auto",
        platform: "auto",
      },
    };
    await writeConfig(root, config);

    const ioCreate = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Runner custom wrapper dry-run task",
        "--description",
        "Inspect dry-run reporting for the custom wrapper enforcement mode",
        "--owner",
        "CODER",
        "--tag",
        "code",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioCreate.stdout.trim();
    } finally {
      ioCreate.restore();
    }
    const verifyStepsPath = path.join(root, ".task-verify-steps.md");
    await writeFile(
      verifyStepsPath,
      [
        "1. Inspect the dry-run surface. Expected: the reported enforcement mode matches the custom wrapper configuration.",
        "2. Inspect the sandbox capability line. Expected: it shows wrapper enforcement and the supported sandbox values.",
        "3. Compare the task output against the dry-run contract. Expected: the task remains in scope with no unexpected errors.",
      ].join("\n"),
      "utf8",
    );
    await runCliSilent([
      "task",
      "doc",
      "set",
      taskId,
      "--section",
      "Verify Steps",
      "--file",
      verifyStepsPath,
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: move the task into DOING before inspecting custom wrapper dry-run reporting.",
      "--root",
      root,
    ]);

    const io = captureStdIO();
    try {
      const code = await runCli(["task", "run", taskId, "--dry-run", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(`task run dry-run prepared: ${taskId}`);
      expect(io.stdout).toContain("adapter: custom");
      expect(io.stdout).toContain('capabilities: {"adapter_id":"custom"');
      expect(io.stdout).toContain(
        'capability[sandbox]: level=wrapper channel=argv supported=workspace-write note=Configured via runner.custom.enforcement.mode="codex_sandbox_full_auto" (platform="auto").',
      );
      expect(io.stdout).toContain("policy_requested: {}");
      expect(io.stdout).toContain(
        'policy_field[sandbox]: status=not_requested capability=wrapper channel=argv supported=workspace-write note=Configured via runner.custom.enforcement.mode="codex_sandbox_full_auto" (platform="auto").',
      );
    } finally {
      io.restore();
    }
  });

  it("task run --dry-run writes bounded task context and truncation metadata for long-history tasks", async () => {
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
          "Runner compaction task",
          "--description",
          "Dry-run bundle should compact long task context history",
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
      "Start: move the task into DOING before preparing a bounded runner bundle for long task history.",
      "--root",
      root,
    ]);

    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const task = await loadTaskFromContext({ ctx, taskId });
    const currentSections = task.sections ?? {};
    const longSections = {
      ...currentSections,
      Findings: "Long findings ".repeat(900),
      Verification: "Long verification ".repeat(700),
    };
    const longDoc = renderTaskDocFromSections(longSections);
    await ctx.taskBackend.writeTask({
      ...task,
      status: "DOING",
      doc: longDoc,
      sections: taskDocToSectionMap(longDoc),
      comments: Array.from({ length: 26 }, (_, index) => ({
        author: "CODER",
        body: `${String(index).padStart(2, "0")} ${"Long comment payload ".repeat(180)}`,
      })),
      events: Array.from({ length: 48 }, (_, index) => ({
        type: "comment",
        at: `2026-03-23T14:${String(index % 60).padStart(2, "0")}:00.000Z`,
        author: "CODER",
        note: `${String(index).padStart(2, "0")} ${"Long event note ".repeat(120)}`,
      })),
    });

    const io = captureStdIO();
    try {
      const code = await runCli(["task", "run", taskId, "--dry-run", "--root", root]);
      expect(code).toBe(0);

      const runsRoot = path.join(root, ".agentplane", "tasks", taskId, "runs");
      const runEntries = await readdir(runsRoot);
      const runDir = path.join(runsRoot, runEntries.toSorted()[0] ?? "");
      const bundlePath = path.join(runDir, "bundle.json");
      const bundle = JSON.parse(await readFile(bundlePath, "utf8")) as {
        task: {
          doc: string;
          comments: { author: string; body: string }[];
          events: { note?: string }[];
          compaction?: {
            doc?: { truncated?: boolean };
            sections?: { truncated?: boolean };
            comments?: { truncated?: boolean; original_count?: number; emitted_count?: number };
            events?: { truncated?: boolean; original_count?: number; emitted_count?: number };
          };
        };
      };
      expect(bundle.task.compaction).toMatchObject({
        doc: { truncated: true },
        sections: { truncated: true },
        comments: { truncated: true, original_count: 26 },
        events: { truncated: true, original_count: 48 },
      });
      expect(bundle.task.comments.length).toBeLessThan(26);
      expect(bundle.task.events.length).toBeLessThan(48);
      expect(Buffer.byteLength(bundle.task.doc, "utf8")).toBeLessThanOrEqual(24_576);
      expect(bundle.task.comments.at(-1)?.body).toContain("Long comment payload");
      expect(bundle.task.events.at(-1)?.note).toContain("Long event note");
    } finally {
      io.restore();
    }
  });

  it("prepareTaskRunnerExecution writes refusal artifacts before spawn when declared policy is unenforceable", async () => {
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
          "Runner refusal task",
          "--description",
          "Prepare runner refusal artifacts before spawn",
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
      "Start: move the task into DOING before verifying runner refusal artifacts for unenforceable recipe policy.",
      "--root",
      root,
    ]);

    const commandCtx = await loadCommandContext({ cwd: root, rootOverride: root });
    await expect(
      prepareTaskRunnerExecution({
        ctx: commandCtx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        mode: "dry_run",
        run_id: "run-refused-cli",
        recipe: {
          recipe_id: "viewer",
          scenario_id: "RECIPE_SCENARIO",
          run_profile: {
            mode: "analysis",
            sandbox: "custom-sandbox",
          },
        },
        target: {
          kind: "recipe_scenario",
          recipe_id: "viewer",
          scenario_id: "RECIPE_SCENARIO",
          task_id: taskId,
        },
      }),
    ).rejects.toMatchObject({
      code: "E_RUNTIME",
      context: {
        policy_field: "sandbox",
      },
    });

    const runDir = path.join(root, ".agentplane", "tasks", taskId, "runs", "run-refused-cli");
    const state = JSON.parse(await readFile(path.join(runDir, "run-state.json"), "utf8")) as {
      status: string;
      policy_decision?: {
        requested?: Record<string, unknown>;
        effective?: Record<string, unknown>;
        refusal_reason?: { policy_field?: string; declared_value?: unknown } | null;
      };
      result?: { status?: string; stderr_summary?: string };
    };
    expect(state.status).toBe("failed");
    expect(state.result?.status).toBe("failed");
    expect(state.result?.stderr_summary).toContain("does not support recipe sandbox");
    expect(state.policy_decision?.requested).toEqual({
      sandbox: "custom-sandbox",
    });
    expect(state.policy_decision?.effective).toEqual({});
    expect(state.policy_decision?.refusal_reason).toMatchObject({
      policy_field: "sandbox",
      declared_value: "custom-sandbox",
    });

    const events = await readFile(path.join(runDir, "events.jsonl"), "utf8");
    expect(events).toContain('"type":"runner_prepared"');
    expect(events).toContain('"type":"runner_refused"');
    expect(events).not.toContain('"type":"runner_execute_start"');
  });
});
