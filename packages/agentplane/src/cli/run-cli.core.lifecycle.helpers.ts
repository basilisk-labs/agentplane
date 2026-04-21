import { readFile } from "node:fs/promises";
import path from "node:path";
import { expect } from "vitest";

import { runCli } from "./run-cli.js";
import { captureStdIO } from "@agentplane/testkit";

export const START_COMMIT_PATH_HANDLING_TIMEOUT_MS = 120_000;

export async function approveTaskPlan(root: string, taskId: string): Promise<void> {
  const codeSet = await runCli([
    "task",
    "plan",
    "set",
    taskId,
    "--text",
    "1) Do the work\n2) Verify the work",
    "--updated-by",
    "ORCHESTRATOR",
    "--root",
    root,
  ]);
  expect(codeSet).toBe(0);

  const codeApprove = await runCli([
    "task",
    "plan",
    "approve",
    taskId,
    "--by",
    "USER",
    "--note",
    "OK",
    "--root",
    root,
  ]);
  expect(codeApprove).toBe(0);
}

export async function startDirectWork(
  root: string,
  taskId: string,
  agentId = "CODER",
): Promise<void> {
  const io = captureStdIO();
  try {
    const code = await runCli([
      "work",
      "start",
      taskId,
      "--agent",
      agentId,
      "--slug",
      "cli",
      "--root",
      root,
    ]);
    if (code !== 0) {
      throw new Error(`work start failed (code=${code})\n${io.stderr}`);
    }

    const lockPath = path.join(root, ".agentplane", "cache", "direct-work.json");
    const raw = await readFile(lockPath, "utf8");
    const parsed = JSON.parse(raw) as {
      task_id?: unknown;
      agent?: unknown;
      slug?: unknown;
      branch?: unknown;
      started_at?: unknown;
    } | null;
    if (
      !parsed ||
      typeof parsed.task_id !== "string" ||
      typeof parsed.agent !== "string" ||
      typeof parsed.slug !== "string" ||
      typeof parsed.branch !== "string" ||
      typeof parsed.started_at !== "string"
    ) {
      throw new Error(`work start wrote an invalid lock json: ${lockPath}\n${raw}`);
    }
    if (parsed.task_id !== taskId) {
      throw new Error(`work start did not write the expected lock: ${lockPath}\n${raw}`);
    }
    if (typeof parsed.agent !== "string" || parsed.agent.trim() !== agentId) {
      throw new Error(`work start wrote an unexpected agent id in the lock: ${lockPath}`);
    }
  } finally {
    io.restore();
  }
}
