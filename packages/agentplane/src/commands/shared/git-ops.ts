import { setPinnedBaseBranch } from "@agentplaneorg/core";
import {
  execFileAsync,
  gitBranchExists,
  gitBranchUpstream,
  gitCurrentBranch,
  gitEnv,
  gitIsAncestor,
  gitListBranches,
  gitRevParse,
} from "@agentplaneorg/core";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { promptChoice, promptInput } from "../../cli/prompts.js";
import { CliError } from "../../shared/errors.js";

export {
  gitBranchExists,
  gitBranchUpstream,
  gitCurrentBranch,
  gitIsAncestor,
  gitListBranches,
  gitRevParse,
};

export async function gitStagedPaths(cwd: string): Promise<string[]> {
  const { stdout } = await execFileAsync("git", ["diff", "--cached", "--name-only"], {
    cwd,
    env: gitEnv(),
  });
  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

export async function gitAddPaths(cwd: string, paths: string[]): Promise<void> {
  if (paths.length === 0) return;
  await execFileAsync("git", ["add", "--", ...paths], { cwd, env: gitEnv() });
}

export async function gitCommit(
  cwd: string,
  message: string,
  opts?: { env?: NodeJS.ProcessEnv; skipHooks?: boolean },
): Promise<void> {
  const args = ["commit", "-m", message];
  if (opts?.skipHooks) args.push("--no-verify");
  const env = opts?.env ? { ...gitEnv(), ...opts.env } : gitEnv();
  await execFileAsync("git", args, { cwd, env });
}

export async function gitInitRepo(cwd: string, branch: string): Promise<void> {
  try {
    await execFileAsync("git", ["init", "-q", "-b", branch], { cwd, env: gitEnv() });
    return;
  } catch {
    await execFileAsync("git", ["init", "-q"], { cwd, env: gitEnv() });
  }

  try {
    const current = await gitCurrentBranch(cwd);
    if (current !== branch) {
      await execFileAsync("git", ["checkout", "-q", "-b", branch], { cwd, env: gitEnv() });
    }
  } catch {
    await execFileAsync("git", ["checkout", "-q", "-b", branch], { cwd, env: gitEnv() });
  }
}

export async function resolveInitBaseBranch(gitRoot: string, fallback: string): Promise<string> {
  let current: string | null = null;
  try {
    current = await gitCurrentBranch(gitRoot);
  } catch {
    current = null;
  }
  const branches = await gitListBranches(gitRoot);
  if (current) return current;
  if (branches.includes(fallback)) return fallback;
  if (branches.length > 0) {
    const first = branches[0];
    if (first) return first;
  }
  return fallback;
}

export async function promptInitBaseBranch(opts: {
  gitRoot: string;
  fallback: string;
}): Promise<string> {
  const branches = await gitListBranches(opts.gitRoot);
  let current: string | null = null;
  try {
    current = await gitCurrentBranch(opts.gitRoot);
  } catch {
    current = null;
  }

  const promptNewBranch = async (hasBranches: boolean): Promise<string> => {
    const raw = await promptInput(`Enter new base branch name (default ${opts.fallback}): `);
    const candidate = raw.trim() || opts.fallback;
    if (!candidate) {
      throw new CliError({
        exitCode: exitCodeForError("E_USAGE"),
        code: "E_USAGE",
        message: "Base branch name cannot be empty",
      });
    }
    if (await gitBranchExists(opts.gitRoot, candidate)) return candidate;
    try {
      await execFileAsync(
        "git",
        hasBranches ? ["branch", candidate] : ["checkout", "-q", "-b", candidate],
        { cwd: opts.gitRoot, env: gitEnv() },
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : `Failed to create branch ${candidate}`;
      throw new CliError({ exitCode: exitCodeForError("E_GIT"), code: "E_GIT", message });
    }
    return candidate;
  };

  if (branches.length === 0) {
    return await promptNewBranch(false);
  }

  const createLabel = "Create new branch";
  const defaultChoice =
    current && branches.includes(current) ? current : (branches[0] ?? opts.fallback);
  const choice = await promptChoice(
    "Select base branch",
    [...branches, createLabel],
    defaultChoice,
  );
  if (choice === createLabel) {
    return await promptNewBranch(true);
  }
  return choice;
}

export async function ensureInitCommit(opts: {
  gitRoot: string;
  baseBranch: string;
  installPaths: string[];
  version: string;
  skipHooks: boolean;
}): Promise<void> {
  const stagedBefore = await gitStagedPaths(opts.gitRoot);
  if (stagedBefore.length > 0) {
    throw new CliError({
      exitCode: exitCodeForError("E_GIT"),
      code: "E_GIT",
      message:
        "Git index has staged changes; commit or unstage them before running agentplane init.",
    });
  }

  await setPinnedBaseBranch({
    cwd: opts.gitRoot,
    rootOverride: opts.gitRoot,
    value: opts.baseBranch,
  });

  const dedupedPaths = [...new Set(opts.installPaths)].filter((entry) => entry.length > 0);
  await gitAddPaths(opts.gitRoot, dedupedPaths);
  const staged = await gitStagedPaths(opts.gitRoot);
  if (staged.length === 0) return;

  const message = `chore: install agentplane ${opts.version}`;
  await gitCommit(opts.gitRoot, message, { skipHooks: opts.skipHooks });
}
