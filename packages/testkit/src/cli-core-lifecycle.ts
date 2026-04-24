import { readFile } from "node:fs/promises";
import path from "node:path";

import { runCli } from "agentplane/internal/testing";

import { captureStdIO } from "./cli-harness/stdio.js";

export const START_COMMIT_PATH_HANDLING_TIMEOUT_MS = 120_000;

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
