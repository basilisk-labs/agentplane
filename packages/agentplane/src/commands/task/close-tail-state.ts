import path from "node:path";

import { extractTaskSuffix } from "@agentplaneorg/core";

import { execFileAsync, gitEnv } from "../shared/git.js";

export async function taskCloseAlreadyRecordedOnBase(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
  baseBranch: string;
}): Promise<boolean> {
  const readmePath = path.join(opts.gitRoot, opts.workflowDir, opts.taskId, "README.md");
  const { stdout } = await execFileAsync(
    "git",
    ["log", opts.baseBranch, "--format=%s", "--", readmePath],
    {
      cwd: opts.gitRoot,
      env: gitEnv(),
      maxBuffer: 10 * 1024 * 1024,
    },
  );
  const suffix = extractTaskSuffix(opts.taskId);
  const closeNeedle = `${suffix} close:`;
  const taskNeedle = `(${opts.taskId})`;
  return stdout
    .split("\n")
    .map((line) => line.trim())
    .some((line) => line.includes(closeNeedle) && line.includes(taskNeedle));
}
