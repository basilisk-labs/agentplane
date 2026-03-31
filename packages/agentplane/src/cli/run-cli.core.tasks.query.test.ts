/* eslint-disable @typescript-eslint/no-unused-vars */
import { execFile } from "node:child_process";
import { readFileSync } from "node:fs";
import {
  chmod,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  realpath,
  rm,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it, vi } from "vitest";

import {
  defaultConfig,
  extractTaskSuffix,
  readTask,
  renderTaskDocFromSections,
  renderTaskReadme,
  taskDocToSectionMap,
  type ResolvedProject,
} from "@agentplaneorg/core";

import { runCli } from "./run-cli.js";
import { BUNDLED_RECIPES_CATALOG } from "../recipes/bundled-recipes.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
} from "../agents/agents-template.js";
import type * as taskBackend from "../backends/task-backend.js";
import { loadCommandContext, loadTaskFromContext } from "../commands/shared/task-backend.js";
import {
  captureStdIO,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  createUpgradeBundle,
  getAgentplaneHome,
  gitBranchExists,
  installRunCliIntegrationHarness,
  runCliSilent,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  mkTempDir,
  pathExists,
  stageGitignoreIfPresent,
  stubTaskBackend,
  writeConfig,
  writeDefaultConfig,
} from "./run-cli.test-helpers.js";
import { evolveRunnerRunState, writeRunnerRunState } from "../runner/artifacts.js";
import { prepareTaskRunnerExecution } from "../runner/usecases/task-run.js";
import { resolveUpdateCheckCachePath } from "./update-check.js";
import * as prompts from "./prompts.js";

installRunCliIntegrationHarness();

const CYRILLIC_RE = /[\u0400-\u04FF]/u;
const RUSSIAN_TRACE_LINE = "Привет из raw trace";
const RUSSIAN_LAST_MESSAGE = "Привет из сообщения Codex";

function splitLines(text: string): string[] {
  return text
    .trim()
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter(Boolean);
}

function parseJsonEnvelope(stdout: string): {
  mode?: string;
  command?: string;
  ok?: boolean;
  exit_code?: number;
  stdout?: string;
  stderr?: string;
  data?: unknown;
} {
  return JSON.parse(stdout) as {
    mode?: string;
    command?: string;
    ok?: boolean;
    exit_code?: number;
    stdout?: string;
    stderr?: string;
    data?: unknown;
  };
}

async function waitForRunnerState(opts: {
  root: string;
  taskId: string;
  predicate: (state: Record<string, unknown>) => boolean;
  timeoutMs?: number;
}): Promise<{ runId: string; statePath: string; state: Record<string, unknown> }> {
  const timeoutMs = opts.timeoutMs ?? 5000;
  const started = Date.now();
  const runsRoot = path.join(opts.root, ".agentplane", "tasks", opts.taskId, "runs");
  while (Date.now() - started < timeoutMs) {
    if (await pathExists(runsRoot)) {
      const runEntries = await readdir(runsRoot);
      const sortedRunEntries = runEntries.toSorted();
      for (const runId of sortedRunEntries) {
        const statePath = path.join(runsRoot, runId, "run-state.json");
        if (!(await pathExists(statePath))) continue;
        const state = JSON.parse(await readFile(statePath, "utf8")) as Record<string, unknown>;
        if (opts.predicate(state)) return { runId, statePath, state };
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Timed out waiting for runner state in ${runsRoot}`);
}

async function seedTaskQueryFixture(root: string, tasks: taskBackend.TaskData[]): Promise<void> {
  await writeDefaultConfig(root);
  const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
  for (const task of tasks) {
    await ctx.taskBackend.writeTask(task);
  }
}

describe("runCli", () => {
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
        execution: {
          mode: string;
          adapter_id: string;
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
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Runner inspect task",
          "--description",
          "Inspect persisted runner artifacts via CLI",
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
        "cat >/dev/null",
        String.raw`printf "trace line one\n"`,
        String.raw`printf "trace line two\n"`,
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
      "Start: move the task into DOING before exercising runner inspection commands in the CLI test.",
      "--root",
      root,
    ]);

    const originalPath = process.env.PATH;
    try {
      process.env.PATH = `${fakeBinDir}${path.delimiter}${originalPath ?? ""}`;
      expect(await runCliSilent(["task", "run", taskId, "--root", root])).toBe(0);

      const runsRoot = path.join(root, ".agentplane", "tasks", taskId, "runs");
      const runEntries = await readdir(runsRoot);
      const runId = runEntries.toSorted()[0] ?? "";
      expect(runId).toBeTruthy();

      {
        const io = captureStdIO();
        try {
          const code = await runCli(["task", "run", "show", taskId, "--root", root]);
          expect(code).toBe(0);
          expect(io.stdout).toContain(`task run show: ${taskId}`);
          expect(io.stdout).toContain("selection: latest");
          expect(io.stdout).toContain(`run_id: ${runId}`);
          expect(io.stdout).toContain("status: success");
          expect(io.stdout).toContain("adapter: custom");
          expect(io.stdout).toContain("events_count:");
          expect(io.stdout).toContain('capabilities: {"adapter_id":"custom"');
          expect(io.stdout).toContain(
            'capability[sandbox]: level=advisory channel=env note=Configured via runner.custom.enforcement.mode="none" (platform="auto").',
          );
          expect(io.stdout).toContain("policy_requested: {}");
          expect(io.stdout).toContain("policy_effective: {}");
          expect(io.stdout).toContain(
            'policy_field[sandbox]: status=not_requested capability=advisory channel=env note=Configured via runner.custom.enforcement.mode="none" (platform="auto").',
          );
          expect(io.stdout).toContain("summary: Custom runner execution completed successfully.");
          expect(io.stdout).toContain("trace:");
        } finally {
          io.restore();
        }
      }

      {
        const io = captureStdIO();
        try {
          const code = await runCli(["task", "run", "show", taskId, "--json", "--root", root]);
          expect(code).toBe(0);
          const payload = JSON.parse(io.stdout) as {
            task_id: string;
            run_id: string;
            selection: string;
            paths: { trace_path: string };
            state: {
              status: string;
              adapter_id: string;
              policy_decision?: { requested?: Record<string, unknown> };
              result?: { summary?: string };
            };
            events_count: number;
            last_event?: { type?: string } | null;
          };
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
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Runner compressed trace task",
          "--description",
          "Inspect compressed runner trace artifacts via CLI",
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
        String.raw`printf "trace runner-token line\n"`,
        String.raw`printf "stderr runner-token\n" 1>&2`,
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
      "Start: move the task into DOING before exercising compressed runner trace inspection in the CLI test.",
      "--root",
      root,
    ]);

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
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Missing runner trace task",
          "--description",
          "Missing runner trace task",
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
      const code = await runCli(["task", "run", "trace", taskId, "missing-run", "--root", root]);
      expect(code).toBe(4);
      expect(io.stderr).toContain("error [E_IO]: Runner artifact not found");
      expect(io.stderr).toContain(`${taskId}:missing-run`);
    } finally {
      io.restore();
    }
  });

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
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
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
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
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
      expect(io.stdout).toContain(`task run cancelled: ${taskId}`);
      expect(io.stdout).toContain("previous_status: prepared");
      expect(io.stdout).toContain("status: cancelled");

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
        predicate: (state) => {
          const status = state.status;
          const supervision =
            state.supervision && typeof state.supervision === "object"
              ? (state.supervision as Record<string, unknown>)
              : null;
          return status === "running" && typeof supervision?.pid === "number";
        },
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
  });

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
      expect(io.stdout).toContain(`task run resumed: ${taskId}`);
      expect(io.stdout).toContain("previous_status: prepared");
      expect(io.stdout).toContain("status: success");
      expect(io.stdout).toContain("stdout: Raw execution trace was captured in agent-trace.jsonl.");

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
      expect(io.stdout).toContain(`task run retried: ${taskId}`);
      expect(io.stdout).toContain("source_run_id: run-retry-source-cli");
      expect(io.stdout).toContain("previous_status: failed");
      expect(io.stdout).toContain("status: success");
      expect(io.stdout).toContain("stdout: Raw execution trace was captured in agent-trace.jsonl.");

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
        predicate: (state) => {
          const status = state.status;
          const supervision =
            state.supervision && typeof state.supervision === "object"
              ? (state.supervision as Record<string, unknown>)
              : null;
          return status === "running" && typeof supervision?.pid === "number";
        },
      });
      expect(await runCli(["task", "run", "cancel", taskId, liveRun.runId, "--root", root])).toBe(
        0,
      );
      expect(await liveRunPromise).toBeGreaterThan(0);

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

  it("task next shows ready tasks only", async () => {
    const root = await mkGitRepoRoot();
    let taskA = "";
    let taskB = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Ready task",
          "--description",
          "No deps",
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
        taskA = io.stdout.trim();
      } finally {
        io.restore();
      }
    }
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Blocked task",
          "--description",
          "Depends on A",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--depends-on",
          taskA,
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskB = io.stdout.trim();
      } finally {
        io.restore();
      }
    }
    const io = captureStdIO();
    try {
      const code = await runCli(["task", "next", "--root", root]);
      expect(code).toBe(0);
      const lines = splitLines(io.stdout);
      expect(lines).toHaveLength(2);
      expect(lines[0]).toContain(taskA);
      expect(lines[0]).not.toContain(taskB);
      expect(lines[1]).toBe("Ready: 1 / 2");
    } finally {
      io.restore();
    }
  });

  it("task next exact readiness output stays stable", async () => {
    const root = await mkGitRepoRoot();
    const readyTaskId = "202603010100-AAAAAA";
    const blockedTaskId = "202603010101-BBBBBB";
    await seedTaskQueryFixture(root, [
      {
        id: blockedTaskId,
        title: "Beta blocked",
        description: "Depends on alpha",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [readyTaskId],
        tags: ["docs"],
        verify: [],
      },
      {
        id: readyTaskId,
        title: "Alpha ready",
        description: "Ready now",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: ["docs"],
        verify: [],
      },
    ]);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "next",
        "--status",
        "TODO",
        "--owner",
        "CODER",
        "--tag",
        "docs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toBe(
        `${readyTaskId} [TODO] Alpha ready (owner=CODER, prio=med, deps=none, tags=docs)\n` +
          "Ready: 1 / 2\n",
      );
      expect(io.stderr).toBe("");
    } finally {
      io.restore();
    }
  });

  it("task next supports limit and quiet flags", async () => {
    const root = await mkGitRepoRoot();
    const taskIds: string[] = [];
    for (const title of ["Ready task one", "Ready task two"]) {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          title,
          "--description",
          "Limit test",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskIds.push(io.stdout.trim());
      } finally {
        io.restore();
      }
    }

    const io = captureStdIO();
    try {
      const code = await runCli(["task", "next", "--limit", "1", "--quiet", "--root", root]);
      expect(code).toBe(0);
      const lines = splitLines(io.stdout);
      expect(lines).toHaveLength(1);
      expect(lines[0]).toEqual(expect.stringContaining("[TODO]"));
      const matchedIds = taskIds.filter((id) => lines[0]?.includes(id));
      expect(matchedIds).toHaveLength(1);
      expect(io.stdout).not.toContain("Ready:");
    } finally {
      io.restore();
    }
  });

  it("task next applies status, owner, and tag filters", async () => {
    const root = await mkGitRepoRoot();
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Filtered next",
          "--description",
          "Filter me",
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
      const code = await runCli([
        "task",
        "next",
        "--status",
        "todo",
        "--owner",
        "coder",
        "--tag",
        "docs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(taskId);
      expect(io.stdout).toContain("Ready: 1 / 1");
    } finally {
      io.restore();
    }
  });

  it("task next rejects invalid limit values", async () => {
    const root = await mkGitRepoRoot();
    const cases: { args: string[]; msg: string }[] = [
      { args: ["task", "next", "--limit"], msg: "Missing value after --limit" },
      {
        args: ["task", "next", "--limit", "nope"],
        msg: "Invalid value for --limit: nope (expected integer)",
      },
    ];

    for (const entry of cases) {
      const io = captureStdIO();
      try {
        const code = await runCli([...entry.args, "--root", root]);
        expect(code).toBe(2);
        expect(io.stderr).toContain(entry.msg);
      } finally {
        io.restore();
      }
    }
  });

  it("task search finds matching tasks", async () => {
    const root = await mkGitRepoRoot();
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Searchable task",
          "--description",
          "Find me",
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
        taskId = io.stdout.trim();
      } finally {
        io.restore();
      }
    }
    const io = captureStdIO();
    try {
      const code = await runCli(["task", "search", "searchable", "--root", root]);
      expect(code).toBe(0);
      const lines = splitLines(io.stdout);
      expect(lines).toHaveLength(1);
      expect(lines[0]).toContain(taskId);
      expect(lines[0]).toContain("Searchable task");
    } finally {
      io.restore();
    }
  });

  it("task search exact filtered limit output stays stable", async () => {
    const root = await mkGitRepoRoot();
    const firstTaskId = "202603010200-AAAAAA";
    const secondTaskId = "202603010201-BBBBBB";
    await seedTaskQueryFixture(root, [
      {
        id: secondTaskId,
        title: "Searchable beta",
        description: "Second searchable task",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: ["docs"],
        verify: [],
      },
      {
        id: firstTaskId,
        title: "Searchable alpha",
        description: "First searchable task",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: ["docs"],
        verify: [],
      },
    ]);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "search",
        "Searchable",
        "--limit",
        "1",
        "--status",
        "TODO",
        "--owner",
        "CODER",
        "--tag",
        "docs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toBe(
        `${firstTaskId} [TODO] Searchable alpha (owner=CODER, prio=med, deps=none, tags=docs)\n`,
      );
      expect(io.stderr).toBe("");
    } finally {
      io.restore();
    }
  });

  it("task search supports regex and limit filters", async () => {
    const root = await mkGitRepoRoot();
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Regex task",
          "--description",
          "Searchable content",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "search",
        "Regex.*",
        "--regex",
        "--limit",
        "1",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const lines = splitLines(io.stdout);
      expect(lines).toHaveLength(1);
      expect(lines[0]).toContain("Regex task");
    } finally {
      io.restore();
    }
  });

  it("task search applies status, owner, and tag filters", async () => {
    const root = await mkGitRepoRoot();
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Filtered search",
          "--description",
          "Search scope",
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
      const code = await runCli([
        "task",
        "search",
        "Filtered",
        "--status",
        "todo",
        "--owner",
        "coder",
        "--tag",
        "docs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(taskId);
      expect(io.stdout).toContain("Filtered search");
    } finally {
      io.restore();
    }
  });

  it("task search rejects empty queries and invalid limits", async () => {
    const root = await mkGitRepoRoot();
    const cases: { args: string[]; msg: string }[] = [
      { args: ["task", "search", "  "], msg: "Missing query (expected non-empty text)" },
      { args: ["task", "search", "query", "--limit"], msg: "Missing value after --limit" },
      {
        args: ["task", "search", "query", "--limit", "nope"],
        msg: "Invalid value for --limit: nope (expected integer)",
      },
    ];

    for (const entry of cases) {
      const io = captureStdIO();
      try {
        const code = await runCli([...entry.args, "--root", root]);
        expect(code).toBe(2);
        expect(io.stderr).toContain(entry.msg);
      } finally {
        io.restore();
      }
    }
  });

  it("task search rejects invalid regex", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["task", "search", "(", "--regex", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Invalid regex");
    } finally {
      io.restore();
    }
  });

  it("task doc show prints section content", async () => {
    const root = await mkGitRepoRoot();
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Doc task",
          "--description",
          "Has doc",
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
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "doc",
          "set",
          taskId,
          "--section",
          "Summary",
          "--text",
          "Doc section text",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }
    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "doc",
        "show",
        taskId,
        "--section",
        "Summary",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("Doc section text");
    } finally {
      io.restore();
    }
  });

  it("task verify-show prints Verify Steps", async () => {
    const root = await mkGitRepoRoot();
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Verify show",
          "--description",
          "Has verify steps",
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
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "doc",
          "set",
          taskId,
          "--section",
          "Verify Steps",
          "--text",
          "Verifier instructions",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }

    const io = captureStdIO();
    try {
      const code = await runCli(["task", "verify-show", taskId, "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("Verifier instructions");
    } finally {
      io.restore();
    }
  });

  it("task doc show supports quiet when section is missing", async () => {
    const root = await mkGitRepoRoot();
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Doc show quiet",
          "--description",
          "Missing section",
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
      const code = await runCli([
        "task",
        "doc",
        "show",
        taskId,
        "--section",
        "Findings",
        "--quiet",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("task doc show rejects missing values and unknown flags", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202602011330-DOC01";
    const cases: { args: string[]; msg: string }[] = [
      { args: ["task", "doc", "show", taskId, "--section"], msg: "Missing value after --section" },
      { args: ["task", "doc", "show", taskId, "--nope"], msg: "Unknown option: --nope." },
    ];

    for (const entry of cases) {
      const io = captureStdIO();
      try {
        const code = await runCli([...entry.args, "--root", root]);
        expect(code).toBe(2);
        expect(io.stderr).toContain(entry.msg);
      } finally {
        io.restore();
      }
    }
  });

  it("task comment and set-status update task metadata", async () => {
    const root = await mkGitRepoRoot();
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Status task",
          "--description",
          "Tracks status",
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

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "comment",
          taskId,
          "--author",
          "CODER",
          "--body",
          "Comment body",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "set-status",
          taskId,
          "DOING",
          "--author",
          "CODER",
          "--body",
          "Status update body",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.status).toBe("DOING");
    expect(task.frontmatter.comments.length).toBeGreaterThan(0);
  });

  it("task show prints task frontmatter json", async () => {
    const root = await mkGitRepoRoot();

    const io1 = captureStdIO();
    let id = "";
    try {
      const code1 = await runCli([
        "task",
        "new",
        "--title",
        "My task",
        "--description",
        "Why it matters",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code1).toBe(0);
      id = io1.stdout.trim();
    } finally {
      io1.restore();
    }

    const io2 = captureStdIO();
    try {
      const code2 = await runCli(["task", "show", id, "--root", root]);
      expect(code2).toBe(0);
      expect(io2.stdout).toContain(`"id": "${id}"`);
      expect(io2.stdout).toContain('"origin"');
      expect(io2.stdout).toContain('"system": "manual"');
      expect(io2.stdout).toContain('"status": "TODO"');
    } finally {
      io2.restore();
    }
  });

  it("task list prints tasks", async () => {
    const root = await mkGitRepoRoot();
    const ids: string[] = [];
    for (const title of ["Alpha task", "Beta task"]) {
      const io1 = captureStdIO();
      try {
        const code1 = await runCli([
          "task",
          "new",
          "--title",
          title,
          "--description",
          "Why it matters",
          "--owner",
          "CODER",
          "--tag",
          "nodejs",
          "--root",
          root,
        ]);
        expect(code1).toBe(0);
        ids.push(io1.stdout.trim());
      } finally {
        io1.restore();
      }
    }

    const io2 = captureStdIO();
    try {
      const code2 = await runCli(["task", "list", "--root", root]);
      expect(code2).toBe(0);
      const lines = splitLines(io2.stdout);
      expect(lines).toHaveLength(3);
      expect(lines[0] ?? "").toContain("[TODO]");
      expect(lines[1] ?? "").toContain("[TODO]");
      expect(lines[2]).toBe("Total: 2 (TODO=2)");
      expect(io2.stdout).toContain(ids[0] ?? "");
      expect(io2.stdout).toContain(ids[1] ?? "");
      expect(io2.stdout).toContain("Alpha task");
      expect(io2.stdout).toContain("Beta task");
    } finally {
      io2.restore();
    }
  });

  it("task list exact filtered quiet output stays stable", async () => {
    const root = await mkGitRepoRoot();
    const firstTaskId = "202603010300-AAAAAA";
    const secondTaskId = "202603010301-BBBBBB";
    await seedTaskQueryFixture(root, [
      {
        id: secondTaskId,
        title: "Beta blocked",
        description: "Waits on alpha",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [firstTaskId],
        tags: ["docs"],
        verify: [],
      },
      {
        id: firstTaskId,
        title: "Alpha ready",
        description: "Ready task",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: ["docs"],
        verify: [],
      },
    ]);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "list",
        "--status",
        "TODO",
        "--owner",
        "CODER",
        "--tag",
        "docs",
        "--quiet",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toBe(
        `${firstTaskId} [TODO] Alpha ready (owner=CODER, prio=med, deps=none, tags=docs)\n` +
          `${secondTaskId} [TODO] Beta blocked (owner=CODER, prio=med, deps=wait:${firstTaskId}, tags=docs)\n`,
      );
      expect(io.stderr).toBe("");
    } finally {
      io.restore();
    }
  });

  it("task list is empty when no tasks exist", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["task", "list", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("Total: 0");
    } finally {
      io.restore();
    }
  });

  it("task list supports filters and quiet mode", async () => {
    const root = await mkGitRepoRoot();
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Filter task",
          "--description",
          "Tagged task",
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
      const code = await runCli([
        "task",
        "list",
        "--status",
        "todo",
        "--owner",
        "coder",
        "--tag",
        "docs",
        "--quiet",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const lines = splitLines(io.stdout);
      expect(lines).toHaveLength(1);
      expect(lines[0]).toContain(taskId);
      expect(lines[0]).toContain("Filter task");
      expect(io.stdout).not.toContain("Total:");
    } finally {
      io.restore();
    }
  });

  it("task list, search, and next wrap text output in agent_json_v1 envelopes when --output json is set", async () => {
    const root = await mkGitRepoRoot();
    const taskIds: string[] = [];
    for (const title of ["Json list one", "Json list two"]) {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          title,
          "--description",
          "Json output contract",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskIds.push(io.stdout.trim());
      } finally {
        io.restore();
      }
    }

    const listIo = captureStdIO();
    try {
      const code = await runCli(["--output", "json", "task", "list", "--root", root]);
      expect(code).toBe(0);
      const payload = parseJsonEnvelope(listIo.stdout);
      expect(payload.mode).toBe("agent_json_v1");
      expect(payload.command).toBe("task list");
      expect(payload.ok).toBe(true);
      expect(payload.exit_code).toBe(0);
      expect(payload.stdout).toContain("Total: 2 (TODO=2)");
      expect(payload.stdout).toContain(taskIds[0] ?? "");
      expect(payload.stdout).toContain(taskIds[1] ?? "");
      expect(payload.stderr).toBe("");
      expect(payload.data).toBeUndefined();
    } finally {
      listIo.restore();
    }

    const searchIo = captureStdIO();
    try {
      const code = await runCli(["--output", "json", "task", "search", "json", "--root", root]);
      expect(code).toBe(0);
      const payload = parseJsonEnvelope(searchIo.stdout);
      expect(payload.mode).toBe("agent_json_v1");
      expect(payload.command).toBe("task search");
      expect(payload.ok).toBe(true);
      expect(payload.exit_code).toBe(0);
      expect(payload.stdout).toContain("Json list one");
      expect(payload.stdout).toContain("Json list two");
      expect(payload.stderr).toBe("");
      expect(payload.data).toBeUndefined();
    } finally {
      searchIo.restore();
    }

    const nextIo = captureStdIO();
    try {
      const code = await runCli([
        "--output",
        "json",
        "task",
        "next",
        "--limit",
        "1",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const payload = parseJsonEnvelope(nextIo.stdout);
      expect(payload.mode).toBe("agent_json_v1");
      expect(payload.command).toBe("task next");
      expect(payload.ok).toBe(true);
      expect(payload.exit_code).toBe(0);
      expect(payload.stdout).toContain("Ready: 1 / 2");
      expect(payload.stderr).toBe("");
      expect(payload.data).toBeUndefined();
    } finally {
      nextIo.restore();
    }
  });

  it("task list rejects missing filter values and unknown flags", async () => {
    const root = await mkGitRepoRoot();
    const cases: { args: string[]; msg: string }[] = [
      { args: ["task", "list", "--status"], msg: "Missing value after --status" },
      { args: ["task", "list", "--owner"], msg: "Missing value after --owner" },
      { args: ["task", "list", "--tag"], msg: "Missing value after --tag" },
      { args: ["task", "list", "--nope"], msg: "Unknown option: --nope" },
    ];

    for (const entry of cases) {
      const io = captureStdIO();
      try {
        const code = await runCli([...entry.args, "--root", root]);
        expect(code).toBe(2);
        expect(io.stderr).toContain(entry.msg);
      } finally {
        io.restore();
      }
    }
  });
});
