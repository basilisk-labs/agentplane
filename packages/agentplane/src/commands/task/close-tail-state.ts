import path from "node:path";

import { extractTaskSuffix, parseTaskSubjectTemplate } from "@agentplaneorg/core/commit";
import { normalizeTaskStatus, parseTaskReadme } from "@agentplaneorg/core/tasks";

import { execFileAsync } from "@agentplaneorg/core/process";
import { gitProofEnv } from "@agentplaneorg/core/git";
import { gitCommitObjectExists, isCanonicalFullCommitOid } from "../shared/git-ops.js";
import { parsePrMeta, readPreMergeClosureMarker } from "../shared/pr-meta.js";

async function gitShowText(opts: {
  gitRoot: string;
  baseBranch: string;
  repoPath: string;
}): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync("git", ["show", `${opts.baseBranch}:${opts.repoPath}`], {
      cwd: opts.gitRoot,
      env: gitProofEnv(),
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
    const taskCommitHash = (commit as { hash: string }).hash.trim();
    if (!isCanonicalFullCommitOid(taskCommitHash)) return false;

    const meta = parsePrMeta(metaRaw, opts.taskId);
    const marker = readPreMergeClosureMarker(meta);
    if (!marker || !isCanonicalFullCommitOid(marker.basisCommit)) return false;
    const [taskCommitExists, closureBasisExists] = await Promise.all([
      gitCommitObjectExists(opts.gitRoot, taskCommitHash),
      gitCommitObjectExists(opts.gitRoot, marker.basisCommit),
    ]);
    if (!taskCommitExists || !closureBasisExists) return false;
    return (
      marker.branch === opts.branch &&
      (marker.prNumber === undefined || marker.prNumber === opts.prNumber) &&
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
  const readmePath = path.posix.join(
    opts.workflowDir.replaceAll("\\", "/"),
    opts.taskId,
    "README.md",
  );
  const { stdout } = await execFileAsync(
    "git",
    ["log", opts.baseBranch, "--format=%H%x00%s%x00%b%x00", "--", readmePath],
    {
      cwd: opts.gitRoot,
      env: gitProofEnv(),
      maxBuffer: 10 * 1024 * 1024,
    },
  );
  const suffix = extractTaskSuffix(opts.taskId);
  const closeNeedle = `${suffix} close:`;
  const taskNeedle = `(${opts.taskId})`;
  const legacyCloseRecorded = stdout
    .split("\n")
    .map((line) => line.trim())
    .some((line) => line.includes(closeNeedle) && line.includes(taskNeedle));
  if (legacyCloseRecorded) return true;

  const fields = stdout.split("\0");
  for (let index = 0; index + 2 < fields.length; index += 3) {
    const commit = fields[index]?.trim() ?? "";
    const subject = fields[index + 1]?.trim() ?? "";
    const body = fields[index + 2] ?? "";
    if (!isCanonicalFullCommitOid(commit)) continue;

    const parsed = parseTaskSubjectTemplate(subject);
    if (parsed?.suffix.toLowerCase() !== suffix.toLowerCase()) continue;
    if (!new Set(["task", "close", "integrate", "formatting"]).has(parsed.scope.toLowerCase())) {
      continue;
    }
    const hasExactRunReference = body
      .split("\n")
      .some((line) => line.trim() === `- Agentplane run: ${opts.taskId}`);
    if (!hasExactRunReference) continue;

    const taskRaw = await gitShowText({
      gitRoot: opts.gitRoot,
      baseBranch: commit,
      repoPath: readmePath,
    });
    if (!taskRaw) continue;
    try {
      const task = parseTaskReadme(taskRaw).frontmatter;
      if (task.id === opts.taskId && normalizeTaskStatus(task.status) === "DONE") return true;
    } catch {
      // Continue scanning older task-history entries when one candidate is malformed.
    }
  }
  return false;
}
