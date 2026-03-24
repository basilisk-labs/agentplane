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
  renderTaskReadme,
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
import { loadCommandContext } from "../commands/shared/task-backend.js";
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

describe("runCli", () => {
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
      expect(io.stdout).toContain("argv: codex -a never exec --json --output-last-message");

      const runsRoot = path.join(root, ".agentplane", "tasks", taskId, "runs");
      expect(await pathExists(runsRoot)).toBe(true);
      const runEntries = await readdir(runsRoot);
      const entries = runEntries.toSorted();
      expect(entries).toHaveLength(1);
      const runDir = path.join(runsRoot, entries[0] ?? "");
      const bundlePath = path.join(runDir, "bundle.json");
      const statePath = path.join(runDir, "run-state.json");
      expect(await pathExists(bundlePath)).toBe(true);
      expect(await pathExists(statePath)).toBe(true);

      const bundle = JSON.parse(await readFile(bundlePath, "utf8")) as {
        execution: {
          mode: string;
          adapter_id: string;
          adapter_capabilities?: { adapter_id: string };
        };
        task: { task_id: string };
      };
      expect(bundle.execution.mode).toBe("dry_run");
      expect(bundle.execution.adapter_id).toBe("codex");
      expect(bundle.execution.adapter_capabilities?.adapter_id).toBe("codex");
      expect(bundle.task.task_id).toBe(taskId);
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
        String.raw`printf 'CLI fake Codex message\n' > "$out"`,
        String.raw`printf 'cli fake stdout\n'`,
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
      expect(io.stdout).toContain("stdout: CLI fake Codex message");

      const runsRoot = path.join(root, ".agentplane", "tasks", taskId, "runs");
      const runEntries = await readdir(runsRoot);
      const sortedRunEntries = runEntries.toSorted();
      expect(sortedRunEntries).toHaveLength(1);
      const runDir = path.join(runsRoot, sortedRunEntries[0] ?? "");
      const statePath = path.join(runDir, "run-state.json");
      const state = JSON.parse(await readFile(statePath, "utf8")) as {
        status: string;
        result?: { status: string; exit_code: number | null; stdout_summary?: string };
      };
      expect(state.status).toBe("success");
      expect(state.result?.status).toBe("success");
      expect(state.result?.exit_code).toBe(0);
      expect(state.result?.stdout_summary).toContain("CLI fake Codex message");

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
      expect(io.stderr).toContain("stderr: runner failed stderr");

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
      expect(task.body).toContain("Stderr: runner failed stderr");
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
        String.raw`printf '%s\n' '{"schema_version":1,"summary":"custom manifest summary","artifacts":[{"path":"reports/custom.txt","label":"report"}],"findings":["custom finding"],"verification_hints":["custom verification hint"],"capabilities_used":["custom.report"]}' > "$AGENTPLANE_RUNNER_RESULT_PATH"`,
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
      expect(io.stdout).toContain("stdout: custom runner ok runner-token task");

      const runsRoot = path.join(root, ".agentplane", "tasks", taskId, "runs");
      const runEntries = await readdir(runsRoot);
      const sortedRunEntries = runEntries.toSorted();
      expect(sortedRunEntries).toHaveLength(1);
      const runDir = path.join(runsRoot, sortedRunEntries[0] ?? "");
      const statePath = path.join(runDir, "run-state.json");
      const bundlePath = path.join(runDir, "bundle.json");
      const resultPath = path.join(runDir, "result.json");
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
        };
      };
      const bundle = JSON.parse(await readFile(bundlePath, "utf8")) as {
        execution: { adapter_id: string; mode: string };
      };
      const manifest = JSON.parse(await readFile(resultPath, "utf8")) as {
        summary?: string;
        findings?: string[];
        verification_hints?: string[];
        capabilities_used?: string[];
      };
      expect(bundle.execution.adapter_id).toBe("custom");
      expect(bundle.execution.mode).toBe("execute");
      expect(state.adapter_id).toBe("custom");
      expect(state.status).toBe("success");
      expect(state.result?.status).toBe("success");
      expect(state.result?.exit_code).toBe(0);
      expect(state.result?.summary).toBe("custom manifest summary");
      expect(state.result?.stdout_summary).toContain("custom runner ok runner-token task");
      expect(state.result?.findings).toEqual(["custom finding"]);
      expect(state.result?.verification_hints).toEqual(["custom verification hint"]);
      expect(manifest.summary).toBe("custom manifest summary");
      expect(manifest.findings).toEqual(["custom finding"]);
      expect(manifest.verification_hints).toEqual(["custom verification hint"]);
      expect(manifest.capabilities_used).toEqual(["custom.report"]);

      const task = await readTask({ cwd: root, rootOverride: root, taskId });
      expect(task.body).toContain("Summary: custom manifest summary");
      expect(task.body).toContain("Findings: custom finding");
      expect(task.body).toContain("VerificationHint: custom verification hint");
      expect(task.body).toContain("Capabilities: custom.report");
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
        String.raw`printf '{"schema_version":1,"findings":[42]}\n' > "$AGENTPLANE_RUNNER_RESULT_PATH"`,
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
      expect(task.body).toContain("Invalid runner result manifest");

      const runsRoot = path.join(root, ".agentplane", "tasks", taskId, "runs");
      const runEntries = await readdir(runsRoot);
      const runDir = path.join(runsRoot, runEntries.toSorted()[0] ?? "");
      const preservedManifestPath = path.join(runDir, "result.invalid.json");
      expect(await pathExists(preservedManifestPath)).toBe(true);
      expect(await readFile(preservedManifestPath, "utf8")).toContain('"findings":[42]');
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
      ["#!/bin/sh", "trap 'exit 0' TERM", "cat >/dev/null", "while :; do sleep 1; done"].join("\n"),
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
        supervision?: { cancel_requested_at?: string | null; exit_signal?: string | null };
        result?: { status?: string };
      };
      expect(finalState.status).toBe("cancelled");
      expect(finalState.result?.status).toBe("cancelled");
      expect(finalState.supervision?.cancel_requested_at).toBeTruthy();
      expect(finalState.supervision?.exit_signal).toBeTruthy();
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
      expect(io.stdout).toContain("stdout: resume cli runner");

      const state = JSON.parse(await readFile(prepared.invocation.state_path, "utf8")) as {
        status: string;
        result?: { status: string; exit_code: number | null; stdout_summary?: string };
      };
      expect(state.status).toBe("success");
      expect(state.result?.status).toBe("success");
      expect(state.result?.stdout_summary).toContain("resume cli runner");
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
      expect(io.stdout).toContain("stdout: retry cli runner");

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
        result?: { status: string; stdout_summary?: string };
      };
      expect(state.status).toBe("success");
      expect(state.result?.status).toBe("success");
      expect(state.result?.stdout_summary).toContain("retry cli runner");
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
      expect(io.stdout).toContain(taskA);
      expect(io.stdout).not.toContain(taskB);
    } finally {
      io.restore();
    }
  });

  it("task next supports limit and quiet flags", async () => {
    const root = await mkGitRepoRoot();
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Ready task",
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
      } finally {
        io.restore();
      }
    }

    const io = captureStdIO();
    try {
      const code = await runCli(["task", "next", "--limit", "1", "--quiet", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("task next applies status, owner, and tag filters", async () => {
    const root = await mkGitRepoRoot();
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
        "TODO",
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
      const code = await runCli(["task", "search", "Searchable", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(taskId);
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
    } finally {
      io.restore();
    }
  });

  it("task search applies status, owner, and tag filters", async () => {
    const root = await mkGitRepoRoot();
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
        "TODO",
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
      const code2 = await runCli(["task", "list", "--root", root]);
      expect(code2).toBe(0);
      expect(io2.stdout).toContain(id);
      expect(io2.stdout).toContain("[TODO]");
      expect(io2.stdout).toContain("My task");
    } finally {
      io2.restore();
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
    } finally {
      io.restore();
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
