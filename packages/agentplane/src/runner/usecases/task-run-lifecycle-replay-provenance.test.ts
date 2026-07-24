import { readFile } from "node:fs/promises";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";
import { writeRunnerExecutable } from "@agentplane/testkit/runner";

import { runCli } from "../../cli/run-cli.js";
import { loadCommandContext } from "../../commands/shared/task-backend.js";
import { evolveRunnerRunState, readRunnerRunState, writeRunnerRunState } from "../artifacts.js";

import { resumeTaskRunnerExecution, retryTaskRunnerExecution } from "./task-run-lifecycle.js";
import { prepareTaskRunnerExecution } from "./task-run.js";
import { recordFailedExternalRunnerAnchor } from "./task-run-lifecycle.testkit.js";

installRunCliIntegrationHarness();
const originalPath = process.env.PATH;

afterEach(() => {
  process.env.PATH = originalPath;
});

async function createDoingRunnerTask(root: string, title: string): Promise<string> {
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

async function configureCustomRunnerFixture(root: string, scriptLines: string[]): Promise<void> {
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

describe("task-run lifecycle replay provenance", () => {
  it("resume creates a fresh run from current task/config and external source provenance", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunnerFixture(root, [
      "#!/bin/sh",
      String.raw`printf "resumed runner %s\n" "$AGENTPLANE_RUNNER_RUN_DIR"`,
      "cat >/dev/null",
      "exit 0",
    ]);
    const taskId = await createDoingRunnerTask(root, "Resume run");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-resume-source",
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
    await recordFailedExternalRunnerAnchor({
      ctx,
      taskId,
      prepared,
      updatedAt: failedAt,
    });
    const sourceEventsBefore = await readFile(prepared.invocation.events_path, "utf8");

    const resumed = await resumeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: prepared.invocation.run_id,
      new_run_id: "run-resume-dest",
    });

    expect(resumed.source_run_id).toBe("run-resume-source");
    expect(resumed.source_status).toBe("failed");
    expect(resumed.previous_status).toBe("failed");
    expect(resumed.invocation.run_id).toBe("run-resume-dest");
    expect(resumed.result.status).toBe("success");
    expect(resumed.result.summary).toBe("Custom runner execution completed successfully.");
    expect(resumed.result.stdout_summary).toBe(
      "Raw execution trace was captured in agent-trace.jsonl.",
    );
    const state = await readRunnerRunState(resumed.invocation.state_path);
    expect(state?.status).toBe("success");
    const events = await readFile(resumed.invocation.events_path, "utf8");
    expect(events).toContain("runner_resume_created");
    expect(events).toContain("runner_execute_finish");
    expect(events).toContain('"source_trust":"external_task_anchor_only"');
    expect(events).toContain('"source_artifacts_reused":false');
    expect(await readFile(prepared.invocation.events_path, "utf8")).toBe(sourceEventsBefore);
    const task = await ctx.taskBackend.getTask(taskId);
    expect(task?.runner).toMatchObject({
      run_id: "run-resume-dest",
      status: "success",
      adapter_id: "custom",
      mode: "execute",
    });
    expect(task?.doc).toContain("RUNNER — success");
    expect(task?.doc).toContain("RunId: run-resume-dest");
  });

  it("retry creates a fresh run from current task/config and external source provenance", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunnerFixture(root, [
      "#!/bin/sh",
      String.raw`printf "retried runner %s\n" "$AGENTPLANE_RUNNER_RUN_DIR"`,
      "cat >/dev/null",
      "exit 0",
    ]);
    const taskId = await createDoingRunnerTask(root, "Retry run");
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
    await recordFailedExternalRunnerAnchor({
      ctx,
      taskId,
      prepared,
      updatedAt: failedAt,
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
    expect(sourceEvents).not.toContain("runner_retry_requested");
    const retryEvents = await readFile(retried.invocation.events_path, "utf8");
    expect(retryEvents).toContain("runner_prepared");
    expect(retryEvents).toContain("runner_retry_created");
    expect(retryEvents).toContain('"source_trust":"external_task_anchor_only"');
    expect(retryEvents).toContain('"source_artifacts_reused":false');
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
