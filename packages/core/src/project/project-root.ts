import { access } from "node:fs/promises";
import path from "node:path";

async function exists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function isGitRoot(dir: string): Promise<boolean> {
  const dotGit = path.join(dir, ".git");
  return exists(dotGit);
}

export async function findGitRoot(startDir: string): Promise<string | null> {
  let current = path.resolve(startDir);

  // Walk upwards until filesystem root.
  while (true) {
    if (await isGitRoot(current)) return current;
    const parent = path.dirname(current);
    if (parent === current) return null;
    current = parent;
  }
}

export type ResolveProjectOptions = {
  cwd: string;
  rootOverride?: string | null;
};

export type ResolvedProject = {
  gitRoot: string;
  agentplaneDir: string;
};

export async function resolveProject(opts: ResolveProjectOptions): Promise<ResolvedProject> {
  const start = opts.rootOverride ? path.resolve(opts.rootOverride) : path.resolve(opts.cwd);
  // Intentionally do not search parent directories. agentplane is scoped to the
  // explicit rootOverride, or to the current working directory.
  if (!(await isGitRoot(start))) {
    throw new Error(`Not a git repository (start: ${start})`);
  }
  return {
    gitRoot: start,
    agentplaneDir: path.join(start, ".agentplane"),
  };
}
