import { execFileAsync } from "../process/run-process.js";
import { gitEnv } from "./git-client.js";

export const DEFAULT_TASK_BRANCH_PREFIX = "task";
export const DEFAULT_TASK_CLOSE_BRANCH_PREFIX = "task-close";

export async function listWorktrees(
  cwd: string,
): Promise<{ path: string; branch: string | null }[]> {
  const { stdout } = await execFileAsync("git", ["worktree", "list", "--porcelain"], {
    cwd,
    env: gitEnv(),
  });
  const worktrees: { path: string; branch: string | null }[] = [];
  const lines = String(stdout).split("\n");
  let current: { path: string; branch: string | null } | null = null;
  for (const line of lines) {
    if (line.startsWith("worktree ")) {
      if (current) worktrees.push(current);
      current = { path: line.slice("worktree ".length).trim(), branch: null };
      continue;
    }
    if (line.startsWith("branch ") && current) {
      current.branch = line.slice("branch ".length).trim();
    }
  }
  if (current) worktrees.push(current);
  return worktrees;
}

export async function findWorktreeForBranch(cwd: string, branch: string): Promise<string | null> {
  const target = branch.startsWith("refs/heads/") ? branch : `refs/heads/${branch}`;
  const worktrees = await listWorktrees(cwd);
  const match = worktrees.find(
    (entry) =>
      entry.branch === branch || entry.branch === target || entry.branch === `refs/heads/${branch}`,
  );
  return match ? match.path : null;
}

function stripBranchRef(branch: string): string {
  return branch.startsWith("refs/heads/") ? branch.slice("refs/heads/".length) : branch;
}

function normalizedBranchPrefix(prefix: string): string {
  return prefix.replaceAll(/^\/+|\/+$/g, "");
}

export function taskBranchName(opts: { taskPrefix: string; taskId: string; slug: string }): string {
  return `${normalizedBranchPrefix(opts.taskPrefix)}/${opts.taskId}/${opts.slug}`;
}

export function taskCloseBranchName(opts: {
  taskClosePrefix?: string;
  taskId: string;
  commit: string;
}): string {
  return `${normalizedBranchPrefix(opts.taskClosePrefix ?? DEFAULT_TASK_CLOSE_BRANCH_PREFIX)}/${opts.taskId}/${opts.commit.slice(0, 12)}`;
}

export function parseTaskIdFromBranch(prefix: string, branch: string): string | null {
  const normalized = stripBranchRef(branch);
  const taskPrefix = normalizedBranchPrefix(prefix);
  if (!normalized.startsWith(`${taskPrefix}/`)) return null;
  const rest = normalized.slice(taskPrefix.length + 1);
  const taskId = rest.split("/", 1)[0];
  return taskId ? taskId.trim() : null;
}

export function parseTaskIdFromCloseBranch(
  branch: string,
  prefix = DEFAULT_TASK_CLOSE_BRANCH_PREFIX,
): string | null {
  const normalized = stripBranchRef(branch);
  const taskClosePrefix = normalizedBranchPrefix(prefix);
  if (!normalized.startsWith(`${taskClosePrefix}/`)) return null;
  const rest = normalized.slice(taskClosePrefix.length + 1);
  const taskId = rest.split("/", 1)[0];
  return taskId ? taskId.trim() : null;
}

export async function gitListBranchesByPrefixes(
  cwd: string,
  prefixes: string[],
): Promise<string[]> {
  const patterns = prefixes
    .map((prefix) => prefix.trim())
    .filter((prefix) => prefix.length > 0)
    .flatMap((prefix) => [`refs/heads/${prefix}`, `refs/heads/${prefix}/`]);
  if (patterns.length === 0) return [];
  const { stdout } = await execFileAsync(
    "git",
    ["for-each-ref", "--format=%(refname:short)", ...patterns],
    {
      cwd,
      env: gitEnv(),
    },
  );
  return String(stdout)
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .filter((line, index, list) => list.indexOf(line) === index);
}

export async function gitListTaskBranches(cwd: string, prefix: string): Promise<string[]> {
  return await gitListBranchesByPrefixes(cwd, [prefix]);
}
