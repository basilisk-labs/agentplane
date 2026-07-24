import { access, readFile } from "node:fs/promises";
import path from "node:path";

import { defaultConfig } from "@agentplaneorg/core/config";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  runCliSilent,
  waitForCondition,
  writeConfig,
} from "@agentplane/testkit";
import { writeRunnerExecutable } from "@agentplane/testkit/runner";
import { afterEach, describe, expect, it, vi } from "vitest";

import { runCli } from "../../cli/run-cli.js";
import { loadCommandContext } from "../../commands/shared/task-backend.js";
import { evolveRunnerRunState, readRunnerRunState, writeRunnerRunState } from "../artifacts.js";
import * as executionReceiptRuntime from "../adapters/execution-receipt-runtime.js";
import * as processSupervision from "../process-supervision/signals.js";
import { resolveSupervisorTaskRunnerPaths } from "../task-run-paths.js";
import { cancelTaskRunnerExecution } from "./task-run-lifecycle.js";
import { executeTaskRunnerExecution } from "./task-run.js";

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
  await runCliSilent([
    "task",
    "plan",
    "set",
    taskId,
    "--text",
    `Execute lifecycle test task: ${title}.`,
    "--updated-by",
    "ORCHESTRATOR",
    "--root",
    root,
  ]);
  await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
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

async function resolveTestRunnerPaths(root: string, taskId: string, runId: string) {
  return await resolveSupervisorTaskRunnerPaths({
    git_root: root,
    workflow_dir: ".agentplane/tasks",
    task_id: taskId,
    run_id: runId,
  });
}

describe("task-run lifecycle cancellation", () => {
  it("terminates a running execute-mode run via persisted supervision metadata", async () => {
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
    const runnerPaths = await resolveTestRunnerPaths(root, taskId, runId);
    const statePath = runnerPaths.state_path;
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

  it("keeps cancel_signal and exit_signal semantics distinct during TERM cancellation", async () => {
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
    const runnerPaths = await resolveTestRunnerPaths(root, taskId, runId);
    const statePath = runnerPaths.state_path;
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

  it("refuses when the live process identity no longer matches persisted metadata", async () => {
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
    const runnerPaths = await resolveTestRunnerPaths(root, taskId, runId);
    const statePath = runnerPaths.state_path;
    const eventsPath = runnerPaths.events_path;
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

  it("does not spawn after cancellation wins while pre-spawn observation is delayed", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, [
      "#!/bin/sh",
      'touch "$AGENTPLANE_RUNNER_RUN_DIR/executable-started"',
      "exit 0",
    ]);
    const taskId = await createDoingTask(root, "Cancel before process spawn");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const runId = "run-cancel-before-spawn";
    const runnerPaths = await resolveTestRunnerPaths(root, taskId, runId);
    const originalCapture = executionReceiptRuntime.captureRunnerExecutionBefore;
    let captureEntered!: () => void;
    let releaseCapture!: () => void;
    const captureEnteredPromise = new Promise<void>((resolve) => {
      captureEntered = resolve;
    });
    const releaseCapturePromise = new Promise<void>((resolve) => {
      releaseCapture = resolve;
    });
    vi.spyOn(executionReceiptRuntime, "captureRunnerExecutionBefore").mockImplementationOnce(
      async (input) => {
        const observation = await originalCapture(input);
        captureEntered();
        await releaseCapturePromise;
        return observation;
      },
    );

    const executionPromise = executeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: runId,
    });
    await captureEnteredPromise;

    const cancelled = await cancelTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: runId,
    });
    releaseCapture();

    const executed = await executionPromise;
    const finalState = await readRunnerRunState(runnerPaths.state_path);
    const events = await readFile(runnerPaths.events_path, "utf8");

    expect(cancelled.changed).toBe(true);
    expect(cancelled.previous_status).toBe("prepared");
    expect(cancelled.state.status).toBe("cancelled");
    expect(executed.result.status).toBe("cancelled");
    expect(finalState?.status).toBe("cancelled");
    expect(events).not.toContain("runner_execute_start");
    expect(events).toContain("runner_execute_cancelled_before_start");
    await expect(
      access(path.join(runnerPaths.run_dir, "executable-started")),
    ).rejects.toMatchObject({
      code: "ENOENT",
    });
  });
});
