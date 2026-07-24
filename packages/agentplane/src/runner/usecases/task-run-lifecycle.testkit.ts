import { createHash } from "node:crypto";

import { captureStdIO, runCliSilent } from "@agentplane/testkit";
import { expect } from "vitest";

import { runCli } from "../../cli/run-cli.js";
import type { CommandContext } from "../../commands/shared/task-backend.js";
import { loadCommandContext } from "../../commands/shared/task-backend.js";
import type { RunnerDangerFullAccessAuthority } from "../types.js";

import { runnerReplayDangerAuthoritySource } from "./task-run-lifecycle-shared.js";
import type { PreparedTaskRunnerExecution } from "./task-run.js";

export const INITIAL_DANGER_AUTHORITY = {
  danger_full_access_authorized: true,
  provenance: "explicit_operator",
  source: "task run --allow-danger-full-access",
} as const satisfies RunnerDangerFullAccessAuthority;

export function replayDangerAuthority(action: "resume" | "retry"): RunnerDangerFullAccessAuthority {
  return {
    danger_full_access_authorized: true,
    provenance: "explicit_operator",
    source: runnerReplayDangerAuthoritySource(action),
  };
}

export function sha256(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

export async function createDoingRunnerTask(opts: {
  root: string;
  title: string;
  plan_text: string;
}): Promise<string> {
  let taskId = "";
  {
    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        opts.title,
        "--description",
        opts.title,
        "--owner",
        "CODER",
        "--tag",
        "docs",
        "--root",
        opts.root,
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
    opts.plan_text,
    "--updated-by",
    "ORCHESTRATOR",
    "--root",
    opts.root,
  ]);
  await runCliSilent([
    "task",
    "plan",
    "approve",
    taskId,
    "--by",
    "ORCHESTRATOR",
    "--root",
    opts.root,
  ]);
  const commandCtx = await loadCommandContext({
    cwd: opts.root,
    rootOverride: opts.root,
  });
  const task = await commandCtx.taskBackend.getTask(taskId);
  expect(task).toBeTruthy();
  await commandCtx.taskBackend.writeTask({
    ...task,
    id: taskId,
    title: opts.title,
    description: opts.title,
    priority: task?.priority ?? "med",
    owner: task?.owner ?? "CODER",
    depends_on: task?.depends_on ?? [],
    tags: task?.tags ?? ["docs"],
    verify: task?.verify ?? [],
    status: "DOING",
  });
  return taskId;
}

export async function recordFailedExternalRunnerAnchor(opts: {
  ctx: CommandContext;
  taskId: string;
  prepared: PreparedTaskRunnerExecution;
  updatedAt: string;
}): Promise<void> {
  const task = await opts.ctx.taskBackend.getTask(opts.taskId);
  if (!task) throw new Error(`Task not found: ${opts.taskId}`);
  await opts.ctx.taskBackend.writeTask({
    ...task,
    runner: {
      run_id: opts.prepared.invocation.run_id,
      status: "failed",
      adapter_id: opts.prepared.invocation.adapter_id,
      mode: "execute",
      updated_at: opts.updatedAt,
      exit_code: 1,
      target: structuredClone(opts.prepared.bundle.target),
      summary: "Externally recorded failed runner source.",
    },
  });
}
