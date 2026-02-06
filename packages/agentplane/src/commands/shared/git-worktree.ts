import { execFileAsync, gitEnv } from "./git.js";

export async function listWorktrees(
  cwd: string,
): Promise<{ path: string; branch: string | null }[]> {
  const { stdout } = await execFileAsync("git", ["worktree", "list", "--porcelain"], {
    cwd,
    env: gitEnv(),
  });
  const worktrees: { path: string; branch: string | null }[] = [];
  const lines = stdout.split("\n");
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

export function parseTaskIdFromBranch(prefix: string, branch: string): string | null {
  const normalized = stripBranchRef(branch);
  if (!normalized.startsWith(`${prefix}/`)) return null;
  const rest = normalized.slice(prefix.length + 1);
  const taskId = rest.split("/", 1)[0];
  return taskId ? taskId.trim() : null;
}

export async function gitListTaskBranches(cwd: string, prefix: string): Promise<string[]> {
  const { stdout } = await execFileAsync(
    "git",
    ["for-each-ref", "--format=%(refname:short)", `refs/heads/${prefix}`],
    { cwd, env: gitEnv() },
  );
  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}
