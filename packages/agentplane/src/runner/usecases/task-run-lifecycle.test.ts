import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";

import { loadCommandContext } from "../../commands/shared/task-backend.js";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  waitForCondition,
  writeConfig,
} from "@agentplane/testkit";
import { runCli } from "../../cli/run-cli.js";
import { evolveRunnerRunState, readRunnerRunState, writeRunnerRunState } from "../artifacts.js";
import * as processSupervision from "../process-supervision/signals.js";

import {
  cancelTaskRunnerExecution,
  resumeTaskRunnerExecution,
  retryTaskRunnerExecution,
} from "./task-run-lifecycle.js";
import { executeTaskRunnerExecution, prepareTaskRunnerExecution } from "./task-run.js";
import { writeRunnerExecutable } from "@agentplane/testkit/runner";

installRunCliIntegrationHarness();
const originalPath = process.env.PATH;

afterEach(() => {
  process.env.PATH = originalPath;
  vi.restoreAllMocks();
});

async function createDoingTask(root: string, title: string): Promise<string> {
  let taskId = "";
  {
    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        title,
        "--description",
        title,
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
  const commandCtx = await loadCommandContext({ cwd: root, rootOverride: root });
  const task = await commandCtx.taskBackend.getTask(taskId);
  expect(task).toBeTruthy();
  await commandCtx.taskBackend.writeTask({
    ...task,
    id: taskId,
    title,
    description: title,
    priority: task?.priority ?? "med",
    owner: task?.owner ?? "CODER",
    depends_on: task?.depends_on ?? [],
    tags: task?.tags ?? ["docs"],
    verify: task?.verify ?? [],
    status: "DOING",
  });
  return taskId;
}

async function configureCustomRunner(root: string, scriptLines: string[]): Promise<void> {
  const config = defaultConfig();
  config.runner.default_adapter = "custom";
  config.runner.custom = {
    command: ["custom-runner"],
  };
  await writeConfig(root, config);

  const fakeBinDir = path.join(root, "bin");
  await writeRunnerExecutable(root, "custom-runner", scriptLines);
  process.env.PATH = `${fakeBinDir}${path.delimiter}${process.env.PATH ?? ""}`;
}

async function waitForState(
  statePath: string,
  predicate: (state: Awaited<ReturnType<typeof readRunnerRunState>>) => boolean,
  timeoutMs = 5000,
): Promise<Awaited<ReturnType<typeof readRunnerRunState>>> {
  return await waitForCondition({
    description: `runner state in ${statePath}`,
    timeoutMs,
    read: async () => await readRunnerRunState(statePath),
    predicate,
    onTimeout: (lastState) =>
      new Error(
        `Timed out waiting for runner state in ${statePath}: ${lastState?.status ?? "unknown"}`,
      ),
  });
}

describe("task-run lifecycle usecases", () => {
  it("cancel marks a prepared execute-mode run as cancelled and appends an event", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, ["#!/bin/sh", "cat >/dev/null", "exit 0"]);
    const taskId = await createDoingTask(root, "Cancel run");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-cancel",
    });

    const cancelled = await cancelTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: prepared.invocation.run_id,
    });

    expect(cancelled.previous_status).toBe("prepared");
    expect(cancelled.state.status).toBe("cancelled");
    const events = await readFile(cancelled.invocation.events_path, "utf8");
    expect(events).toContain("runner_prepared");
    expect(events).toContain("runner_cancelled");
    const task = await ctx.taskBackend.getTask(taskId);
    expect(task?.runner).toMatchObject({
      run_id: "run-cancel",
      status: "cancelled",
      adapter_id: "custom",
      mode: "execute",
      target: { kind: "task", task_id: taskId },
    });
    expect(task?.verification?.state).toBe("pending");
    expect(task?.doc).toContain("RUNNER — cancelled");
    expect(task?.doc).toContain("VerificationHint: runner was cancelled");
  });

  it("refuses runner preparation when project-local blueprint trust is invalid", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, ["#!/bin/sh", "exit 0"]);
    const configPath = path.join(root, ".agentplane", "blueprints", "config.json");
    await mkdir(path.dirname(configPath), { recursive: true });
    await writeFile(
      configPath,
      JSON.stringify({
        schema_version: 1,
        trust_model: "explicit_allowlist",
        enabled: true,
        allowed_ids: ["missing.local"],
        selection: "explicit_only",
      }),
      "utf8",
    );
    const taskId = await createDoingTask(root, "Invalid local blueprint trust");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });

    await expect(
      prepareTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        mode: "dry_run",
        run_id: "run-invalid-blueprint-trust",
      }),
    ).rejects.toThrow("Invalid project-local blueprint trust registry");
  });

  it("cancel terminates a running execute-mode run via persisted supervision metadata", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, [
      "#!/bin/sh",
      "trap 'exit 0' TERM",
      "cat >/dev/null",
      "while :; do sleep 1; done",
    ]);
    const taskId = await createDoingTask(root, "Cancel live run");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const runId = "run-live-cancel";
    const statePath = path.join(
      root,
      ".agentplane",
      "tasks",
      taskId,
      "runs",
      runId,
      "run-state.json",
    );
    const executionPromise = executeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: runId,
    });

    const runningState = await waitForState(
      statePath,
      (state) => state?.status === "running" && typeof state.supervision?.pid === "number",
    );
    expect(runningState?.status).toBe("running");
    expect(runningState?.supervision?.pid).toBeGreaterThan(0);
    expect(runningState?.supervision?.command).toContain("custom-runner");
    expect(runningState?.supervision?.started_at).toMatch(/T/);
    vi.spyOn(processSupervision, "readObservedProcessIdentity").mockResolvedValue({
      pid: runningState!.supervision!.pid!,
      command: runningState!.supervision!.command ?? null,
      started_at: runningState!.supervision!.started_at ?? null,
    });

    const cancelled = await cancelTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: runId,
    });

    const executed = await executionPromise;
    const finalState = await waitForState(
      statePath,
      (state) =>
        state?.status === "cancelled" &&
        Boolean(state.supervision?.cancel_signal) &&
        state.result?.status === "cancelled",
    );

    expect(cancelled.changed).toBe(true);
    expect(cancelled.state.status).toBe("cancelled");
    expect(cancelled.state.supervision?.cancel_requested_at).toBeTruthy();
    expect(cancelled.state.supervision?.cancel_signal).toBeTruthy();
    expect(executed.result.status).toBe("cancelled");
    expect(finalState?.status).toBe("cancelled");
    expect(finalState?.supervision?.cancel_signal).toBeTruthy();
  });

  it("cancel keeps cancel_signal and exit_signal semantics distinct during TERM cancellation", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, [
      "#!/bin/sh",
      "trap 'exit 0' TERM",
      "cat >/dev/null",
      "while :; do sleep 1; done",
    ]);
    const taskId = await createDoingTask(root, "Cancel graceful TERM run");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const runId = "run-graceful-term-cancel";
    const statePath = path.join(
      root,
      ".agentplane",
      "tasks",
      taskId,
      "runs",
      runId,
      "run-state.json",
    );
    const executionPromise = executeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: runId,
    });

    const runningState = await waitForState(
      statePath,
      (state) => state?.status === "running" && typeof state.supervision?.pid === "number",
    );
    expect(runningState?.status).toBe("running");
    vi.spyOn(processSupervision, "readObservedProcessIdentity").mockResolvedValue({
      pid: runningState!.supervision!.pid!,
      command: runningState!.supervision!.command ?? null,
      started_at: runningState!.supervision!.started_at ?? null,
    });

    const cancelled = await cancelTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: runId,
    });

    const executed = await executionPromise;
    const finalState = await waitForState(
      statePath,
      (state) =>
        state?.status === "cancelled" &&
        state.supervision?.cancel_signal === "SIGTERM" &&
        state.result?.status === "cancelled",
    );

    expect(cancelled.state.status).toBe("cancelled");
    expect(cancelled.state.supervision?.cancel_signal).toBe("SIGTERM");
    expect(executed.result.status).toBe("cancelled");
    expect(executed.result.exit_code).not.toBeNull();
    expect(finalState?.status).toBe("cancelled");
    expect(finalState?.supervision?.cancel_signal).toBe("SIGTERM");
    expect([null, "SIGTERM"]).toContain(finalState?.supervision?.exit_signal ?? null);
    expect(finalState?.result?.exit_code).toBe(executed.result.exit_code);
  });

  it("cancel refuses when the live process identity no longer matches persisted supervision metadata", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, [
      "#!/bin/sh",
      "trap 'exit 0' TERM",
      "cat >/dev/null",
      "while :; do sleep 1; done",
    ]);
    const taskId = await createDoingTask(root, "Cancel mismatched live run");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const runId = "run-live-mismatch";
    const statePath = path.join(
      root,
      ".agentplane",
      "tasks",
      taskId,
      "runs",
      runId,
      "run-state.json",
    );
    const eventsPath = path.join(
      root,
      ".agentplane",
      "tasks",
      taskId,
      "runs",
      runId,
      "events.jsonl",
    );
    const executionPromise = executeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: runId,
    });

    const runningState = await waitForState(
      statePath,
      (state) => state?.status === "running" && typeof state.supervision?.pid === "number",
    );
    const pid = runningState?.supervision?.pid;
    expect(pid).toBeGreaterThan(0);
    vi.spyOn(processSupervision, "readObservedProcessIdentity").mockResolvedValue({
      pid: pid!,
      command: runningState?.supervision?.command ?? null,
      started_at: runningState?.supervision?.started_at ?? null,
    });
    await writeRunnerRunState({
      state_path: statePath,
      state: evolveRunnerRunState({
        state: runningState!,
        status: "running",
        updated_at: new Date().toISOString(),
        supervision: {
          ...runningState?.supervision,
          command: "different-runner --bad-state",
          started_at: "2000-01-01T00:00:00.000Z",
        },
      }),
    });

    await expect(
      cancelTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: runId,
      }),
    ).rejects.toMatchObject({
      code: "E_RUNTIME",
      context: {
        task_id: taskId,
        run_id: runId,
        pid,
      },
    });

    expect(await readFile(eventsPath, "utf8")).toContain("runner_cancel_refused");

    process.kill(pid!, "SIGKILL");
    const executed = await executionPromise;
    expect(executed.result.status).toBe("failed");
  });

  it("resume re-executes an existing prepared execute-mode run in place", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, [
      "#!/bin/sh",
      String.raw`printf "resumed runner %s\n" "$AGENTPLANE_RUNNER_RUN_DIR"`,
      "cat >/dev/null",
      "exit 0",
    ]);
    const taskId = await createDoingTask(root, "Resume run");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-resume",
    });

    const resumed = await resumeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: prepared.invocation.run_id,
    });

    expect(resumed.previous_status).toBe("prepared");
    expect(resumed.result.status).toBe("success");
    expect(resumed.result.summary).toBe("Custom runner execution completed successfully.");
    expect(resumed.result.stdout_summary).toBe(
      "Raw execution trace was captured in agent-trace.jsonl.",
    );
    const state = await readRunnerRunState(resumed.invocation.state_path);
    expect(state?.status).toBe("success");
    const events = await readFile(resumed.invocation.events_path, "utf8");
    expect(events).toContain("runner_resume_requested");
    expect(events).toContain("runner_execute_finish");
    const task = await ctx.taskBackend.getTask(taskId);
    expect(task?.runner).toMatchObject({
      run_id: "run-resume",
      status: "success",
      adapter_id: "custom",
      mode: "execute",
    });
    expect(task?.doc).toContain("RUNNER — success");
  });

  it("retry creates a new run from a failed execute-mode run snapshot", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, [
      "#!/bin/sh",
      String.raw`printf "retried runner %s\n" "$AGENTPLANE_RUNNER_RUN_DIR"`,
      "cat >/dev/null",
      "exit 0",
    ]);
    const taskId = await createDoingTask(root, "Retry run");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-retry-source",
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
          stderr_summary: "simulated failure",
        },
      }),
    });

    const retried = await retryTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: prepared.invocation.run_id,
      new_run_id: "run-retry-dest",
    });

    expect(retried.source_run_id).toBe("run-retry-source");
    expect(retried.invocation.run_id).toBe("run-retry-dest");
    expect(retried.result.status).toBe("success");
    expect(retried.result.summary).toBe("Custom runner execution completed successfully.");
    expect(retried.result.stdout_summary).toBe(
      "Raw execution trace was captured in agent-trace.jsonl.",
    );
    const newState = await readRunnerRunState(retried.invocation.state_path);
    expect(newState?.status).toBe("success");
    const sourceEvents = await readFile(prepared.invocation.events_path, "utf8");
    expect(sourceEvents).toContain("runner_retry_requested");
    const retryEvents = await readFile(retried.invocation.events_path, "utf8");
    expect(retryEvents).toContain("runner_prepared");
    expect(retryEvents).toContain("runner_retry_created");
    const task = await ctx.taskBackend.getTask(taskId);
    expect(task?.runner).toMatchObject({
      run_id: "run-retry-dest",
      status: "success",
      adapter_id: "custom",
      mode: "execute",
    });
    expect(task?.doc).toContain("RunId: run-retry-dest");
  });
});
