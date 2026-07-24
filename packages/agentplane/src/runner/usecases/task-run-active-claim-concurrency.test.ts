import { lstat, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import { installRunCliIntegrationHarness } from "@agentplane/testkit";

import { CustomRunnerAdapter } from "../adapters/custom.js";
import { resolveSupervisorTaskRunnerPaths } from "../task-run-paths.js";

import { resumeTaskRunnerExecution, retryTaskRunnerExecution } from "./task-run-lifecycle.js";
import { executeTaskRunnerExecution, type ExecutedTaskRunnerExecution } from "./task-run.js";
import {
  configureCustomRunner,
  createDoingTask,
  createFailedSource,
  expectClaimRejection,
  gateRunnerScript,
  mkGitRepoRoot,
  observeSettlement,
  waitForStartedRun,
  type SettledObservation,
} from "./task-run-active-claim.testkit.js";

installRunCliIntegrationHarness();
const originalPath = process.env.PATH;

afterEach(() => {
  process.env.PATH = originalPath;
  vi.restoreAllMocks();
});

describe("task-run supervisor active claim", () => {
  it("atomically rejects a concurrent generated retry while generated resume is executing", async () => {
    const root = await mkGitRepoRoot();
    const startedPath = path.join(root, "claim-started.log");
    const releasePath = path.join(root, "claim-release");
    await configureCustomRunner({
      root,
      script_lines: gateRunnerScript(),
      env: {
        TEST_CLAIM_STARTED: startedPath,
        TEST_CLAIM_RELEASE: releasePath,
      },
    });
    const taskId = await createDoingTask(root, "Concurrent generated replay claim");
    const { ctx, prepared: source } = await createFailedSource({
      root,
      task_id: taskId,
      run_id: "run-concurrent-replay-source",
    });

    const resumePromise = resumeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: source.invocation.run_id,
    });
    const startedRuns = await waitForStartedRun(startedPath);
    const firstStarted = startedRuns.trim();
    const retryPromise = retryTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: source.invocation.run_id,
    });
    let retryObservation: SettledObservation<ExecutedTaskRunnerExecution> = { kind: "timeout" };
    try {
      retryObservation = await observeSettlement(retryPromise);
    } finally {
      await writeFile(releasePath, "release\n", "utf8");
      await Promise.allSettled([resumePromise, retryPromise]);
    }

    const resumed = await resumePromise;
    expect(firstStarted).toBe(resumed.invocation.run_dir);
    const rejected = expectClaimRejection(retryObservation, {
      task_id: taskId,
      operation: "retry",
      competing_operation: "resume",
      competing_run_id: resumed.invocation.run_id,
    });
    const rejectedRunId = rejected.context?.run_id;
    expect(rejectedRunId).not.toBe(resumed.invocation.run_id);
    expect(typeof rejectedRunId).toBe("string");
    const rejectedPaths = await resolveSupervisorTaskRunnerPaths({
      git_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: taskId,
      run_id: String(rejectedRunId),
    });
    await expect(lstat(rejectedPaths.run_dir)).rejects.toMatchObject({
      code: "ENOENT",
    });
    const completedStarts = await readFile(startedPath, "utf8");
    expect(completedStarts.trim().split("\n")).toHaveLength(1);
  });

  it("makes an ordinary executing run authoritative against a concurrent replay", async () => {
    const root = await mkGitRepoRoot();
    const startedPath = path.join(root, "ordinary-claim-started.log");
    const releasePath = path.join(root, "ordinary-claim-release");
    await configureCustomRunner({
      root,
      script_lines: gateRunnerScript(),
      env: {
        TEST_CLAIM_STARTED: startedPath,
        TEST_CLAIM_RELEASE: releasePath,
      },
    });
    const taskId = await createDoingTask(root, "Ordinary run active claim");
    const { ctx, prepared: source } = await createFailedSource({
      root,
      task_id: taskId,
      run_id: "run-ordinary-claim-source",
    });

    const ordinaryPromise = executeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      include_route_runner_state: false,
    });
    const startedRuns = await waitForStartedRun(startedPath);
    const firstStarted = startedRuns.trim();
    const retryPromise = retryTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: source.invocation.run_id,
    });
    let retryObservation: SettledObservation<ExecutedTaskRunnerExecution> = { kind: "timeout" };
    try {
      retryObservation = await observeSettlement(retryPromise);
    } finally {
      await writeFile(releasePath, "release\n", "utf8");
      await Promise.allSettled([ordinaryPromise, retryPromise]);
    }

    const ordinary = await ordinaryPromise;
    expect(firstStarted).toBe(ordinary.invocation.run_dir);
    expectClaimRejection(retryObservation, {
      task_id: taskId,
      operation: "retry",
      competing_operation: "execute",
      competing_run_id: ordinary.invocation.run_id,
    });
    const completedStarts = await readFile(startedPath, "utf8");
    expect(completedStarts.trim().split("\n")).toHaveLength(1);
  });

  it("persists destination anchor and source provenance before adapter execution", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "Replay provenance before execution");
    const { ctx, prepared: source } = await createFailedSource({
      root,
      task_id: taskId,
      run_id: "run-pre-execution-provenance-source",
    });
    const destinationRunId = "run-pre-execution-provenance-destination";
    let observedTaskRunId: string | null = null;
    let observedTaskStatus: string | null = null;
    let observedEvents = "";
    vi.spyOn(CustomRunnerAdapter.prototype, "execute").mockImplementation(async (invocation) => {
      const taskAtExecution = await ctx.taskBackend.getTask(taskId);
      observedTaskRunId = taskAtExecution?.runner?.run_id ?? null;
      observedTaskStatus = taskAtExecution?.runner?.status ?? null;
      observedEvents = await readFile(invocation.events_path, "utf8");
      throw new Error("simulated provider crash at execution entry");
    });

    await expect(
      resumeTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: source.invocation.run_id,
        new_run_id: destinationRunId,
      }),
    ).rejects.toThrow("simulated provider crash at execution entry");

    expect(observedTaskRunId).toBe(destinationRunId);
    expect(observedTaskStatus).toBe("prepared");
    expect(observedEvents).toContain('"type":"runner_prepared"');
    expect(observedEvents).toContain('"type":"runner_resume_created"');
    expect(observedEvents).toContain(`"source_run_id":"${source.invocation.run_id}"`);
    expect(observedEvents).not.toContain('"type":"runner_execute_start"');
    const eventTypes = observedEvents
      .trim()
      .split("\n")
      .map((line) => (JSON.parse(line) as { type: string }).type);
    expect(eventTypes.indexOf("runner_prepared")).toBeLessThan(
      eventTypes.indexOf("runner_resume_created"),
    );
    const persistedTask = await ctx.taskBackend.getTask(taskId);
    expect(persistedTask?.runner).toMatchObject({
      run_id: destinationRunId,
      status: "prepared",
    });
    expect(persistedTask?.runner?.history).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          run_id: source.invocation.run_id,
          status: "failed",
        }),
      ]),
    );
  });
});
