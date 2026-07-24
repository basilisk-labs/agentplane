import { access, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { defaultConfig } from "@agentplaneorg/core/config";
import {
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  waitForCondition,
  writeConfig,
} from "@agentplane/testkit";
import { makeRunnerContextBundle } from "@agentplane/testkit/runner";
import { afterEach, describe, expect, it, vi } from "vitest";

import { loadCommandContext } from "../../commands/shared/task-backend.js";
import {
  evolveRunnerRunState,
  readRunnerRunState,
  writePreparedRunnerArtifacts,
  writeRunnerRunState,
} from "../artifacts.js";
import {
  claimRunnerChildSpawn,
  claimRunnerPreSpawnDecision,
} from "../adapters/execution-control.js";
import * as executionReceiptRuntime from "../adapters/execution-receipt-runtime.js";
import { CustomRunnerAdapter } from "../adapters/custom.js";
import * as processSupervision from "../process-supervision/signals.js";
import * as taskState from "../task-state.js";
import { resolveTaskRunnerPaths } from "../task-run-paths.js";
import {
  acquireTaskRunnerActiveClaim,
  readTaskRunnerActiveClaim,
  releaseTaskRunnerActiveClaim,
} from "./task-run-active-claim.js";
import { cancelTaskRunnerExecution } from "./task-run-lifecycle.js";
import { inspectStartOwnerLease } from "./task-run-cancel-prepared.js";
import {
  configureCustomRunner,
  createDoingTask,
  resolveTestRunnerPaths,
  waitForState,
} from "./task-run-lifecycle-cancel.testkit.js";
import { executeTaskRunnerExecution, prepareTaskRunnerExecution } from "./task-run.js";

installRunCliIntegrationHarness();
const originalPath = process.env.PATH;

afterEach(() => {
  process.env.PATH = originalPath;
  vi.restoreAllMocks();
});

describe("task-run lifecycle cancellation", () => {
  it("does not orphan a live prepared owner when ps identity fields are unavailable", async () => {
    vi.spyOn(processSupervision, "readObservedProcessIdentity").mockResolvedValue({
      pid: process.pid,
      command: null,
      started_at: null,
    });

    await expect(
      inspectStartOwnerLease({
        owner_id: "live-owner",
        owner_pid: process.pid,
        owner_command: "agentplane task run",
        owner_started_at: "2026-07-24T00:00:00.000Z",
        heartbeat_at: "2026-07-24T00:00:00.000Z",
        lease_expires_at: "2026-07-24T00:00:01.000Z",
      }),
    ).resolves.toBe("unverified");
  });

  it("waits for the running-state publication before finalizing a fast successful child", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, [
      "#!/bin/sh",
      'touch "$AGENTPLANE_RUNNER_RUN_DIR/provider-exited"',
      "exit 0",
    ]);
    const taskId = await createDoingTask(root, "Serialize fast child finalization");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const runId = "run-running-state-barrier";
    const runnerPaths = await resolveTestRunnerPaths(root, taskId, runId);
    const originalReadIdentity = processSupervision.readObservedProcessIdentity;
    let childIdentityEntered!: () => void;
    let releaseChildIdentity!: () => void;
    const childIdentityEnteredPromise = new Promise<void>((resolve) => {
      childIdentityEntered = resolve;
    });
    const releaseChildIdentityPromise = new Promise<void>((resolve) => {
      releaseChildIdentity = resolve;
    });
    vi.spyOn(processSupervision, "readObservedProcessIdentity").mockImplementation(async (pid) => {
      if (pid === process.pid) return await originalReadIdentity(pid);
      childIdentityEntered();
      await releaseChildIdentityPromise;
      return await originalReadIdentity(pid);
    });

    const executionPromise = executeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: runId,
    });
    try {
      await childIdentityEnteredPromise;
      await waitForCondition({
        description: "fast provider exit marker",
        timeoutMs: 5000,
        read: async () =>
          await access(path.join(runnerPaths.run_dir, "provider-exited")).then(
            () => true,
            () => false,
          ),
        predicate: Boolean,
      });
      await new Promise((resolve) => setTimeout(resolve, 50));
      const stateBeforeBarrier = await readRunnerRunState(runnerPaths.state_path);
      expect(stateBeforeBarrier?.status).toBe("prepared");
      releaseChildIdentity();

      const executed = await executionPromise;
      const finalState = await readRunnerRunState(runnerPaths.state_path);
      expect(executed.result.status).toBe("success");
      expect(finalState?.status).toBe("success");
      expect(finalState?.result?.status).toBe("success");
    } finally {
      releaseChildIdentity();
      await executionPromise.catch(() => null);
    }
  });

  it("terminalizes a spawned child error instead of leaving running state wedged", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.runner.default_adapter = "custom";
    config.runner.custom = {
      command: [path.join(root, "bin", "missing-custom-runner")],
    };
    await writeConfig(root, config);
    const taskId = await createDoingTask(root, "Terminalize spawned child error");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const runId = "run-spawned-child-error";
    const runnerPaths = await resolveTestRunnerPaths(root, taskId, runId);

    const executed = await executeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: runId,
    });
    const finalState = await readRunnerRunState(runnerPaths.state_path);

    expect(executed.result.status).toBe("failed");
    expect(finalState?.status).toBe("failed");
    expect(finalState?.result?.status).toBe("failed");
  });

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
      (state) =>
        state?.status === "running" &&
        typeof state.supervision?.pid === "number" &&
        Boolean(state.supervision.process_identity),
    );
    expect(runningState?.status).toBe("running");
    expect(runningState?.supervision?.pid).toBeGreaterThan(0);
    expect(runningState?.supervision?.command).toContain("custom-runner");
    expect(runningState?.supervision?.started_at).toMatch(/T/);
    vi.spyOn(processSupervision, "readObservedProcessIdentity").mockResolvedValue({
      pid: runningState!.supervision!.pid!,
      command: runningState!.supervision!.process_identity!.command,
      started_at: runningState!.supervision!.process_identity!.started_at,
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
    expect(await readFile(runnerPaths.events_path, "utf8")).toContain("runner_cancel_signal_sent");
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
      (state) =>
        state?.status === "running" &&
        typeof state.supervision?.pid === "number" &&
        Boolean(state.supervision.process_identity),
    );
    expect(runningState?.status).toBe("running");
    vi.spyOn(processSupervision, "readObservedProcessIdentity").mockResolvedValue({
      pid: runningState!.supervision!.pid!,
      command: runningState!.supervision!.process_identity!.command,
      started_at: runningState!.supervision!.process_identity!.started_at,
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

  it("cooperatively cancels a supervisor run when process identity is unavailable", async () => {
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
    const executionPromise = executeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: runId,
    });

    const runningState = await waitForState(
      statePath,
      (state) =>
        state?.status === "running" &&
        typeof state.supervision?.pid === "number" &&
        Boolean(state.supervision.process_identity),
    );
    const pid = runningState?.supervision?.pid;
    expect(pid).toBeGreaterThan(0);
    vi.spyOn(processSupervision, "readObservedProcessIdentity").mockResolvedValue(null);
    await writeRunnerRunState({
      state_path: statePath,
      state: evolveRunnerRunState({
        state: runningState!,
        status: "running",
        updated_at: new Date().toISOString(),
        supervision: {
          ...runningState?.supervision,
          process_identity: undefined,
        },
      }),
    });

    const cancelled = await cancelTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: runId,
    });
    const executed = await executionPromise;
    expect(cancelled.state.status).toBe("cancelled");
    expect(executed.result.status).toBe("cancelled");
    expect(await readFile(runnerPaths.events_path, "utf8")).toContain("runner_cancel_signal_sent");
  });

  it("does not signal or overwrite success when the finalizer wins cancellation", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, [
      "#!/bin/sh",
      'while [ ! -f "$AGENTPLANE_RUNNER_RUN_DIR/release-finalizer" ]; do sleep 0.05; done',
      "exit 0",
    ]);
    const taskId = await createDoingTask(root, "Cancel finalizer race");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const runId = "run-cancel-finalizer-race";
    const runnerPaths = await resolveTestRunnerPaths(root, taskId, runId);
    const executionPromise = executeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: runId,
    });
    const runningState = await waitForState(
      runnerPaths.state_path,
      (state) =>
        state?.status === "running" &&
        typeof state.supervision?.pid === "number" &&
        Boolean(state.supervision.process_identity),
    );
    const pid = runningState!.supervision!.pid!;
    const processKillSpy = vi.spyOn(process, "kill");

    await writeFile(path.join(runnerPaths.run_dir, "release-finalizer"), "", "utf8");
    const executed = await executionPromise;
    expect(executed.result.status).toBe("success");

    await expect(
      cancelTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: runId,
      }),
    ).rejects.toMatchObject({
      code: "E_USAGE",
    });
    const finalState = await readRunnerRunState(runnerPaths.state_path);
    const directCancelSignals = processKillSpy.mock.calls.filter(
      ([signalPid, signal]) => signalPid === pid && (signal === "SIGTERM" || signal === "SIGKILL"),
    );
    expect(finalState?.status).toBe("success");
    expect(finalState?.result?.status).toBe("success");
    expect(directCancelSignals).toEqual([]);
    expect(await readFile(runnerPaths.events_path, "utf8")).not.toContain(
      "runner_cancel_requested",
    );
  });

  it("keeps a failed terminal state immutable when cancellation arrives later", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, ["#!/bin/sh", "cat >/dev/null", "exit 9"]);
    const taskId = await createDoingTask(root, "Keep failed terminal run immutable");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const runId = "run-failed-terminal-immutable";
    const runnerPaths = await resolveTestRunnerPaths(root, taskId, runId);
    const executed = await executeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: runId,
    });
    expect(executed.result.status).toBe("failed");

    await expect(
      cancelTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: runId,
      }),
    ).rejects.toMatchObject({
      code: "E_USAGE",
      context: {
        reason: "runner_terminal_state_immutable",
        current_status: "failed",
      },
    });
    const finalState = await readRunnerRunState(runnerPaths.state_path);
    const task = await ctx.taskBackend.getTask(taskId);
    expect(finalState?.status).toBe("failed");
    expect(finalState?.result?.status).toBe("failed");
    expect(task?.runner?.status).toBe("failed");
  });

  it("does not let a delayed terminal reconciliation override a newer active run", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, ["#!/bin/sh", "cat >/dev/null", "exit 0"]);
    const taskId = await createDoingTask(root, "Keep newer active run authoritative");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const runA = "run-delayed-terminal-projection";
    const claimA = await acquireTaskRunnerActiveClaim({
      git_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: taskId,
      run_id: runA,
      operation: "execute",
    });
    const preparedA = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: runA,
    });
    const terminalAt = new Date().toISOString();
    const terminalA = evolveRunnerRunState({
      state: preparedA.state,
      status: "failed",
      updated_at: terminalAt,
      result: {
        status: "failed",
        exit_code: 9,
        started_at: preparedA.state.created_at,
        ended_at: terminalAt,
        summary: "older terminal result",
      },
    });
    await writeRunnerRunState({
      state_path: preparedA.invocation.state_path,
      state: terminalA,
    });

    const originalPersist = taskState.persistRunnerOutcomeToTask;
    let projectionEntered!: () => void;
    let releaseProjection!: () => void;
    const projectionEnteredPromise = new Promise<void>((resolve) => {
      projectionEntered = resolve;
    });
    const releaseProjectionPromise = new Promise<void>((resolve) => {
      releaseProjection = resolve;
    });
    vi.spyOn(taskState, "persistRunnerOutcomeToTask")
      .mockImplementationOnce(async (input) => {
        projectionEntered();
        await releaseProjectionPromise;
        await originalPersist(input);
      })
      .mockImplementation(originalPersist);

    const cancellationPromise = cancelTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: runA,
    });
    await projectionEnteredPromise;
    await releaseTaskRunnerActiveClaim(claimA);

    const runB = "run-newer-active-projection";
    const claimB = await acquireTaskRunnerActiveClaim({
      git_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: taskId,
      run_id: runB,
      operation: "execute",
    });
    const preparedB = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: runB,
    });
    await originalPersist({
      ctx,
      task_id: taskId,
      bundle: preparedB.bundle,
      state: preparedB.state,
      ordering_authority: "current_active_claim",
    });
    releaseProjection();

    await expect(cancellationPromise).rejects.toMatchObject({
      code: "E_USAGE",
      context: {
        reason: "runner_terminal_state_immutable",
      },
    });
    const task = await ctx.taskBackend.getTask(taskId);
    expect(task?.runner?.run_id).toBe(runB);
    expect(task?.runner?.status).toBe("prepared");
    expect(task?.runner?.history).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          run_id: runA,
          status: "failed",
        }),
      ]),
    );
    await releaseTaskRunnerActiveClaim(claimB);
  });

  it("recovers a stale running claim only after its child is confirmed absent", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, ["#!/bin/sh", "exit 0"]);
    const taskId = await createDoingTask(root, "Recover dead running child");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-stale-running-child",
    });
    const expiredAt = "2000-01-01T00:00:00.000Z";
    await writeRunnerRunState({
      state_path: prepared.invocation.state_path,
      state: {
        ...prepared.state,
        status: "running",
        updated_at: expiredAt,
        supervision: {
          pid: 999_997,
          started_at: expiredAt,
          heartbeat_at: expiredAt,
        },
      },
    });
    const paths = await resolveTestRunnerPaths(root, taskId, prepared.invocation.run_id);
    const generation = "dead-running-generation";
    await writeFile(
      path.join(paths.task_dir, "active-run-claim.json"),
      `${JSON.stringify({
        schema_version: 1,
        claim_id: generation,
        generation,
        task_id: taskId,
        run_id: prepared.invocation.run_id,
        operation: "execute",
        claimed_at: expiredAt,
        owner_pid: 999_996,
        owner_command: "/definitely/missing/runner-owner",
        owner_started_at: expiredAt,
      })}\n`,
      "utf8",
    );
    const processKill = vi.spyOn(process, "kill");

    const cancelled = await cancelTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: prepared.invocation.run_id,
    });

    expect(cancelled.state.status).toBe("cancelled");
    expect(cancelled.changed).toBe(true);
    const projectedTask = await ctx.taskBackend.getTask(taskId);
    const persistedState = await readRunnerRunState(prepared.invocation.state_path);
    expect(projectedTask?.runner?.status).toBe("cancelled");
    expect(persistedState?.status).toBe("cancelled");
    expect(
      processKill.mock.calls.filter(([, signal]) => signal !== 0 && signal !== undefined),
    ).toEqual([]);
    await expect(access(path.join(paths.task_dir, "active-run-claim.json"))).rejects.toMatchObject({
      code: "ENOENT",
    });
    expect(await readFile(prepared.invocation.events_path, "utf8")).toContain(
      "runner_orphaned_running_cancelled",
    );
  });

  it("finalizes an orphaned prepared start after its owner lease expires", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, ["#!/bin/sh", "exit 0"]);
    const taskId = await createDoingTask(root, "Cancel orphaned prepared start");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-orphaned-prepared-start",
    });
    const expiredAt = "2000-01-01T00:00:00.000Z";
    await claimRunnerPreSpawnDecision({
      invocation: prepared.invocation,
      decision: "start",
      decided_at: expiredAt,
      start_owner_lease: {
        owner_id: "dead-executor",
        owner_pid: 999_999,
        owner_command: "/definitely/missing/agentplane-executor",
        owner_started_at: expiredAt,
        heartbeat_at: expiredAt,
        lease_expires_at: expiredAt,
      },
    });
    const orphanedPaths = await resolveTestRunnerPaths(root, taskId, prepared.invocation.run_id);
    const activeGeneration = "dead-orphaned-generation";
    await writeFile(
      path.join(orphanedPaths.task_dir, "active-run-claim.json"),
      `${JSON.stringify({
        schema_version: 1,
        claim_id: activeGeneration,
        generation: activeGeneration,
        task_id: taskId,
        run_id: prepared.invocation.run_id,
        operation: "execute",
        claimed_at: expiredAt,
        owner_pid: 999_999,
        owner_command: "/definitely/missing/agentplane-executor",
        owner_started_at: expiredAt,
      })}\n`,
      "utf8",
    );

    const cancelled = await cancelTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: prepared.invocation.run_id,
    });
    const finalState = await readRunnerRunState(prepared.invocation.state_path);
    const events = await readFile(prepared.invocation.events_path, "utf8");

    expect(cancelled.changed).toBe(true);
    expect(cancelled.previous_status).toBe("prepared");
    expect(cancelled.state.status).toBe("cancelled");
    expect(cancelled.state.result?.status).toBe("cancelled");
    expect(finalState?.status).toBe("cancelled");
    expect(finalState?.result?.summary).toContain("orphaned pre-spawn ownership");
    expect(events).toContain("runner_pre_spawn_owner_orphaned");
    expect(events).toContain("owner_lease_expires_at");
    expect(events).toContain("runner_cancelled");
    expect(events).not.toContain("runner_execute_start");
    await expect(
      access(path.join(orphanedPaths.task_dir, "active-run-claim.json")),
    ).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("fails closed when a dead start owner had already authorized child spawn", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, [
      "#!/bin/sh",
      'touch "$AGENTPLANE_RUNNER_RUN_DIR/provider-started"',
      "exit 0",
    ]);
    const taskId = await createDoingTask(root, "Refuse uncertain authorized spawn");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-authorized-spawn-unconfirmed",
    });
    const expiredAt = "2000-01-01T00:00:00.000Z";
    const startOwnerId = "dead-authorized-executor";
    await claimRunnerPreSpawnDecision({
      invocation: prepared.invocation,
      decision: "start",
      decided_at: expiredAt,
      start_owner_lease: {
        owner_id: startOwnerId,
        owner_pid: 999_998,
        owner_command: "/definitely/missing/authorized-executor",
        owner_started_at: expiredAt,
        heartbeat_at: expiredAt,
        lease_expires_at: expiredAt,
      },
    });
    await claimRunnerChildSpawn({
      invocation: prepared.invocation,
      start_owner_id: startOwnerId,
      claimed_at: expiredAt,
    });
    const claimedPaths = await resolveTestRunnerPaths(root, taskId, prepared.invocation.run_id);
    const activeGeneration = "dead-authorized-generation";
    await writeFile(
      path.join(claimedPaths.task_dir, "active-run-claim.json"),
      `${JSON.stringify({
        schema_version: 1,
        claim_id: activeGeneration,
        generation: activeGeneration,
        task_id: taskId,
        run_id: prepared.invocation.run_id,
        operation: "execute",
        claimed_at: expiredAt,
        owner_pid: 999_998,
        owner_command: "/definitely/missing/authorized-executor",
        owner_started_at: expiredAt,
      })}\n`,
      "utf8",
    );

    await expect(
      cancelTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: prepared.invocation.run_id,
      }),
    ).rejects.toMatchObject({
      code: "E_RUNTIME",
      context: {
        reason: "spawn_authorized_but_unconfirmed",
        run_id: prepared.invocation.run_id,
      },
    });
    await expect(
      executeTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: "run-after-authorized-spawn",
      }),
    ).rejects.toMatchObject({
      code: "E_USAGE",
      context: {
        competing_run_id: prepared.invocation.run_id,
        competing_run_authority: "spawn_authorized_but_unconfirmed",
      },
    });

    const finalState = await readRunnerRunState(prepared.invocation.state_path);
    const events = await readFile(prepared.invocation.events_path, "utf8");
    expect(finalState?.status).toBe("prepared");
    expect(events).toContain("spawn_authorized_but_unconfirmed");
    await expect(
      access(path.join(prepared.invocation.run_dir, "provider-started")),
    ).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("fails closed without signaling even when a historical run has exact process identity", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, ["#!/bin/sh", "cat >/dev/null", "exit 0"]);
    const taskId = await createDoingTask(root, "Refuse unsafe historical running cancel");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const runId = "run-legacy-running-no-identity";
    const bundle = makeRunnerContextBundle({
      adapterId: "custom",
      taskId,
      runId,
      gitRoot: root,
      workflowDir: ".agentplane/tasks",
      status: "DOING",
      mode: "execute",
    });
    delete (bundle.execution.artifact_paths as Partial<typeof bundle.execution.artifact_paths>)
      .receipt_path;
    delete bundle.execution.sandbox_policy;
    delete bundle.execution.write_scope;
    const prepared = await writePreparedRunnerArtifacts({
      bundle,
      bootstrap_markdown: "# historical running bootstrap\n",
      created_at: "2026-07-24T09:00:00.000Z",
    });
    const legacyPaths = resolveTaskRunnerPaths({
      git_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: taskId,
      run_id: runId,
    });
    const startedAt = "2026-07-24T09:00:01.000Z";
    await writeRunnerRunState({
      state_path: legacyPaths.state_path,
      state: evolveRunnerRunState({
        state: prepared,
        status: "running",
        updated_at: startedAt,
        supervision: {
          pid: process.pid,
          command: "historical-custom-runner",
          started_at: startedAt,
          process_identity: {
            pid: process.pid,
            command: "historical-custom-runner",
            started_at: startedAt,
            observed_at: startedAt,
          },
        },
      }),
    });
    vi.spyOn(processSupervision, "readObservedProcessIdentity").mockResolvedValue({
      pid: process.pid,
      command: "historical-custom-runner",
      started_at: startedAt,
    });
    const processKillSpy = vi.spyOn(process, "kill");

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
        reason: "legacy_running_cancellation_unsupported",
      },
    });
    expect(await readFile(legacyPaths.events_path, "utf8")).toContain("runner_cancel_refused");
    expect(
      processKillSpy.mock.calls.filter(
        ([signalPid, signal]) =>
          signalPid === process.pid && (signal === "SIGTERM" || signal === "SIGKILL"),
      ),
    ).toEqual([]);
    await expect(
      access(path.join(legacyPaths.run_dir, ".runner-cancellation-intent.json")),
    ).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("recovers a prepared run when the pre-spawn cancel publisher died after publication", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, [
      "#!/bin/sh",
      'touch "$AGENTPLANE_RUNNER_RUN_DIR/provider-started"',
      "exit 0",
    ]);
    const taskId = await createDoingTask(root, "Recover published pre-spawn cancellation");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-published-cancel-owner-died",
    });
    await claimRunnerPreSpawnDecision({
      invocation: prepared.invocation,
      decision: "cancel",
      decided_at: "2026-07-24T11:00:00.000Z",
    });

    const result = await new CustomRunnerAdapter(ctx.config.runner.custom).execute(
      prepared.invocation,
    );
    const finalState = await readRunnerRunState(prepared.invocation.state_path);

    expect(result.status).toBe("cancelled");
    expect(finalState?.status).toBe("cancelled");
    await expect(
      access(path.join(prepared.invocation.run_dir, "provider-started")),
    ).rejects.toMatchObject({ code: "ENOENT" });
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

    const cancellationPromise = cancelTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: runId,
    });
    await waitForCondition({
      description: "immutable pre-spawn cancellation decision",
      timeoutMs: 5000,
      read: async () =>
        await access(path.join(runnerPaths.run_dir, ".runner-pre-spawn-decision.json"))
          .then(() => true)
          .catch(() => false),
      predicate: (published) => published,
    });
    const cancelled = await cancellationPromise;
    expect(cancelled.changed).toBe(true);
    expect(cancelled.previous_status).toBe("prepared");
    expect(cancelled.state.status).toBe("cancelled");
    const claimLookup = {
      git_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: taskId,
      run_id: runId,
    };
    await expect(readTaskRunnerActiveClaim(claimLookup)).resolves.toMatchObject({
      task_id: taskId,
      run_id: runId,
    });
    await expect(
      access(path.join(runnerPaths.run_dir, ".runner-child-spawn-claim.json")),
    ).rejects.toMatchObject({ code: "ENOENT" });
    await expect(
      access(path.join(runnerPaths.run_dir, "executable-started")),
    ).rejects.toMatchObject({ code: "ENOENT" });

    releaseCapture();
    const executed = await executionPromise;
    const finalState = await readRunnerRunState(runnerPaths.state_path);
    const events = await readFile(runnerPaths.events_path, "utf8");

    expect(executed.result.status).toBe("cancelled");
    expect(finalState?.status).toBe("cancelled");
    expect(events).not.toContain("runner_execute_start");
    expect(events).toContain("runner_execute_cancelled_before_start");
    await expect(readTaskRunnerActiveClaim(claimLookup)).resolves.toBeNull();
  });
});
