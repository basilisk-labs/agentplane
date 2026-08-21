import { access } from "node:fs/promises";
import path from "node:path";

import { findWorktreeForBranch, gitEnv, gitRevParse } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";

async function exists(target: string): Promise<boolean> {
  return await access(target).then(
    () => true,
    () => false,
  );
}

function relocatableTail(registered: string): string | null {
  const normalized = registered.replaceAll("\\", "/");
  const marker = /\/(\.agentplane\/(?:worktrees|workspaces)\/.*)$/u.exec(normalized);
  return marker?.[1] ?? null;
}

/**
 * Git stores linked-worktree paths in the common directory. After the whole
 * repository is moved those registrations can still point at the old absolute
 * root. Rebuild the candidate from the logical AgentPlane-relative tail and let
 * `git worktree repair` update Git-owned metadata before returning it.
 */
export async function findRelocatableWorktreeForBranch(
  gitRoot: string,
  branch: string,
): Promise<string | null> {
  const registered = await findWorktreeForBranch(gitRoot, branch);
  if (registered && (await exists(registered))) return registered;
  if (!registered) return null;

  const tail = relocatableTail(registered);
  if (!tail) return null;
  const commonDir = await gitRevParse(gitRoot, ["--path-format=absolute", "--git-common-dir"]);
  const repositoryRoot = path.basename(commonDir) === ".git" ? path.dirname(commonDir) : gitRoot;
  const candidate = path.join(repositoryRoot, ...tail.split("/"));
  if (!(await exists(candidate))) return null;

  await execFileAsync("git", ["worktree", "repair", candidate], {
    cwd: repositoryRoot,
    env: gitEnv(),
  });
  const repaired = await findWorktreeForBranch(repositoryRoot, branch);
  return repaired && (await exists(repaired)) ? repaired : null;
}
