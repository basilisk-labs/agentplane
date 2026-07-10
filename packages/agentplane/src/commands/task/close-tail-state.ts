import path from "node:path";

import { extractTaskSuffix } from "@agentplaneorg/core/commit";
import { normalizeTaskStatus, parseTaskReadme } from "@agentplaneorg/core/tasks";

import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";
import { parsePrMeta, readPreMergeClosureMarker } from "../shared/pr-meta.js";

async function gitShowText(opts: {
  gitRoot: string;
  baseBranch: string;
  repoPath: string;
}): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync("git", ["show", `${opts.baseBranch}:${opts.repoPath}`], {
      cwd: opts.gitRoot,
      env: gitEnv(),
      maxBuffer: 10 * 1024 * 1024,
    });
    return stdout;
  } catch {
    return null;
  }
}

export async function taskPreMergeClosureRecordedOnBase(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
  baseBranch: string;
  branch: string;
  prNumber: number;
}): Promise<boolean> {
  const taskPath = path.posix.join(opts.workflowDir, opts.taskId, "README.md");
  const metaPath = path.posix.join(opts.workflowDir, opts.taskId, "pr", "meta.json");
  const [taskRaw, metaRaw] = await Promise.all([
    gitShowText({ ...opts, repoPath: taskPath }),
    gitShowText({ ...opts, repoPath: metaPath }),
  ]);
  if (!taskRaw || !metaRaw) return false;

  try {
    const task = parseTaskReadme(taskRaw).frontmatter;
    if (task.id !== opts.taskId) return false;
    const status = typeof task.status === "string" ? task.status : "";
    if (normalizeTaskStatus(status) !== "DONE") return false;
    const commit = task.commit;
    if (!commit || typeof commit !== "object" || Array.isArray(commit)) return false;
    if (typeof (commit as { hash?: unknown }).hash !== "string") return false;
    if ((commit as { hash: string }).hash.trim().length === 0) return false;

    const meta = parsePrMeta(metaRaw, opts.taskId);
    const marker = readPreMergeClosureMarker(meta);
    return (
      marker?.branch === opts.branch &&
      marker.prNumber === opts.prNumber &&
      meta.branch?.trim() === opts.branch &&
      meta.pr_number === opts.prNumber
    );
  } catch {
    return false;
  }
}

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
