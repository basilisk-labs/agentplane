import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  findWorktreeForBranch,
  gitEnv,
  gitListTaskBranches,
  gitShowFile,
  parseTaskIdFromBranch,
  toGitPath,
} from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";
import type { TaskRecord } from "@agentplaneorg/core/tasks";
import { parseTaskReadme } from "@agentplaneorg/core/tasks";
import {
  validateTaskReadmeFrontmatter,
  withTaskReadmeFrontmatterDefaults,
} from "@agentplaneorg/core/schemas";

import { taskRecordToData, type TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "./task-backend.js";

function backendSupportsTaskBranchSnapshots(ctx: CommandContext): boolean {
  const capabilities = ctx.taskBackend?.capabilities;
  if (!capabilities) return ctx.backendId === "local";
  return capabilities.canonical_source === "local" && capabilities.writes_task_readmes === true;
}

async function loadTaskBranchInventory(ctx: CommandContext): Promise<{
  localBranches: string[];
  remoteBranches: string[];
}> {
  if (!ctx.memo.taskBranchInventory) {
    const prefix = ctx.config.branch.task_prefix;
    ctx.memo.taskBranchInventory = Promise.all([
      gitListTaskBranches(ctx.resolvedProject.gitRoot, prefix),
      listRemoteTaskBranches(ctx.resolvedProject.gitRoot, prefix),
    ]).then(([localBranches, remoteBranches]) => ({ localBranches, remoteBranches }));
  }
  return await ctx.memo.taskBranchInventory;
}

export async function resolveTaskBranchFromContext(opts: {
  ctx: CommandContext;
  taskId: string;
}): Promise<string | null> {
  if (!backendSupportsTaskBranchSnapshots(opts.ctx)) {
    return null;
  }

  const prefix = opts.ctx.config.branch.task_prefix;
  const { localBranches, remoteBranches } = await loadTaskBranchInventory(opts.ctx);
  const matches = uniqueBranchCandidates([...localBranches, ...remoteBranches]).filter(
    (branch) => parseTaskIdFromBranch(prefix, stripOriginPrefix(branch)) === opts.taskId,
  );
  if (matches.length === 1) return matches[0] ?? null;
  if (matches.length > 1) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Multiple task branches match ${opts.taskId}: ${matches.join(", ")}`,
    });
  }
  return null;
}

function stripOriginPrefix(branch: string): string {
  return branch.startsWith("origin/") ? branch.slice("origin/".length) : branch;
}

function normalizeBranchPrefix(prefix: string): string {
  let start = 0;
  let end = prefix.length;
  while (start < end && prefix[start] === "/") start += 1;
  while (end > start && prefix[end - 1] === "/") end -= 1;
  return prefix.slice(start, end);
}

async function listRemoteTaskBranches(cwd: string, prefix: string): Promise<string[]> {
  const normalized = normalizeBranchPrefix(prefix);
  if (!normalized) return [];
  const remotePrefix = `origin/${normalized}`;
  const { stdout } = await execFileAsync(
    "git",
    ["for-each-ref", "--format=%(refname:short)", "refs/remotes/origin"],
    { cwd, env: gitEnv() },
  );
  return String(stdout)
    .split("\n")
    .map((line) => line.trim())
    .filter(
      (line) =>
        (line === remotePrefix || line.startsWith(`${remotePrefix}/`)) && !line.endsWith("/HEAD"),
    );
}

function uniqueBranchCandidates(branches: string[]): string[] {
  const seen = new Set<string>();
  const candidates: string[] = [];
  for (const branch of branches) {
    const key = stripOriginPrefix(branch);
    if (seen.has(key)) continue;
    seen.add(key);
    candidates.push(key);
  }
  return candidates;
}

function taskDataFromReadmeText(opts: {
  taskId: string;
  readmePath: string;
  text: string;
}): TaskData {
  const parsed = parseTaskReadme(opts.text);
  const frontmatter = validateTaskReadmeFrontmatter(
    withTaskReadmeFrontmatterDefaults({
      ...parsed.frontmatter,
      id:
        typeof parsed.frontmatter.id === "string" && parsed.frontmatter.id.trim().length > 0
          ? parsed.frontmatter.id
          : opts.taskId,
    }),
  );
  return taskRecordToData({
    id: opts.taskId,
    frontmatter: frontmatter as unknown as TaskRecord["frontmatter"],
    body: parsed.body,
    readmePath: opts.readmePath,
  });
}

export async function loadTaskFromBranchSnapshot(opts: {
  ctx: CommandContext;
  taskId: string;
  readmePath: string;
  branch?: string | null;
}): Promise<TaskData | null> {
  if (!backendSupportsTaskBranchSnapshots(opts.ctx)) {
    return null;
  }

  const branch =
    typeof opts.branch === "string" && opts.branch.trim().length > 0
      ? opts.branch.trim()
      : await resolveTaskBranchFromContext({ ctx: opts.ctx, taskId: opts.taskId });
  if (!branch) return null;

  const liveWorktreePath = await findWorktreeForBranch(opts.ctx.resolvedProject.gitRoot, branch);
  if (liveWorktreePath) {
    const liveReadmePath = path.join(
      liveWorktreePath,
      path.relative(opts.ctx.resolvedProject.gitRoot, opts.readmePath),
    );
    try {
      const liveText = await readFile(liveReadmePath, "utf8");
      return taskDataFromReadmeText({
        taskId: opts.taskId,
        readmePath: opts.readmePath,
        text: liveText,
      });
    } catch {
      // Fall back to the committed branch snapshot when the live worktree lacks the README.
    }
  }

  const relReadmePath = toGitPath(path.relative(opts.ctx.resolvedProject.gitRoot, opts.readmePath));

  const refsToTry = [branch, branch.startsWith("origin/") ? null : `origin/${branch}`].filter(
    (ref): ref is string => Boolean(ref && ref.trim().length > 0),
  );

  for (const ref of refsToTry) {
    try {
      const text = await gitShowFile(opts.ctx.resolvedProject.gitRoot, ref, relReadmePath);
      return taskDataFromReadmeText({
        taskId: opts.taskId,
        readmePath: opts.readmePath,
        text,
      });
    } catch {
      // Try the next candidate ref.
    }
  }
  return null;
}
