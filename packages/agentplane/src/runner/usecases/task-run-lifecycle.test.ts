import { chmod, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core";

import { loadCommandContext } from "../../commands/shared/task-backend.js";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  writeConfig,
} from "../../cli/run-cli.test-helpers.js";
import { runCli } from "../../cli/run-cli.js";
import { evolveRunnerRunState, readRunnerRunState, writeRunnerRunState } from "../artifacts.js";

import {
  cancelTaskRunnerExecution,
  resumeTaskRunnerExecution,
  retryTaskRunnerExecution,
} from "./task-run-lifecycle.js";
import { prepareTaskRunnerExecution } from "./task-run.js";

installRunCliIntegrationHarness();
const originalPath = process.env.PATH;

afterEach(() => {
  process.env.PATH = originalPath;
});

async function makeTaskRoot(): Promise<string> {
  return await mkGitRepoRoot();
}

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
  const fakeRunnerPath = path.join(fakeBinDir, "custom-runner");
  await mkdir(fakeBinDir, { recursive: true });
  await writeFile(fakeRunnerPath, scriptLines.join("\n"), "utf8");
  await chmod(fakeRunnerPath, 0o755);
  process.env.PATH = `${fakeBinDir}${path.delimiter}${process.env.PATH ?? ""}`;
}

describe("task-run lifecycle usecases", () => {
  it("cancel marks a prepared execute-mode run as cancelled and appends an event", async () => {
    const root = await makeTaskRoot();
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
  });

  it("resume re-executes an existing prepared execute-mode run in place", async () => {
    const root = await makeTaskRoot();
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
    expect(resumed.result.stdout_summary).toContain("resumed runner");
    const state = await readRunnerRunState(resumed.invocation.state_path);
    expect(state?.status).toBe("success");
    const events = await readFile(resumed.invocation.events_path, "utf8");
    expect(events).toContain("runner_resume_requested");
    expect(events).toContain("runner_execute_finish");
  });

  it("retry creates a new run from a failed execute-mode run snapshot", async () => {
    const root = await makeTaskRoot();
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
    expect(retried.result.stdout_summary).toContain("retried runner");
    const newState = await readRunnerRunState(retried.invocation.state_path);
    expect(newState?.status).toBe("success");
    const sourceEvents = await readFile(prepared.invocation.events_path, "utf8");
    expect(sourceEvents).toContain("runner_retry_requested");
    const retryEvents = await readFile(retried.invocation.events_path, "utf8");
    expect(retryEvents).toContain("runner_prepared");
    expect(retryEvents).toContain("runner_retry_created");
  });
});
