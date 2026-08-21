import { readFile } from "node:fs/promises";

import { afterEach, describe, expect, it, vi } from "vitest";

import { installRunCliIntegrationHarness } from "@agentplane/testkit";

import { CustomRunnerAdapter } from "../adapters/custom.js";

import { resumeTaskRunnerExecution } from "./task-run-lifecycle.js";
import {
  configureCustomRunner,
  createDoingTask,
  createFailedSource,
  mkGitRepoRoot,
} from "./task-run-active-claim.testkit.js";

installRunCliIntegrationHarness();
const originalPath = process.env.PATH;

afterEach(() => {
  process.env.PATH = originalPath;
  vi.restoreAllMocks();
});

describe("task-run replay pre-execution persistence", () => {
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
