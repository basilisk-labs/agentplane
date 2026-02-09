import { execFileAsync, gitEnv } from "./git.js";
import { setPinnedBaseBranch } from "@agentplaneorg/core";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { promptChoice, promptInput } from "../../cli/prompts.js";
import { CliError } from "../../shared/errors.js";

export async function gitRevParse(cwd: string, args: string[]): Promise<string> {
  const { stdout } = await execFileAsync("git", ["rev-parse", ...args], { cwd, env: gitEnv() });
  const trimmed = stdout.trim();
  if (!trimmed) throw new Error("Failed to resolve git path");
  return trimmed;
}

export async function gitCurrentBranch(cwd: string): Promise<string> {
  try {
    const { stdout } = await execFileAsync("git", ["symbolic-ref", "--short", "HEAD"], {
      cwd,
      env: gitEnv(),
    });
    const trimmed = stdout.trim();
    if (trimmed) return trimmed;
  } catch {
    // fall through
  }
  const { stdout } = await execFileAsync("git", ["rev-parse", "--abbrev-ref", "HEAD"], {
    cwd,
    env: gitEnv(),
  });
  const trimmed = stdout.trim();
  if (!trimmed || trimmed === "HEAD") throw new Error("Failed to resolve git branch");
  return trimmed;
}

export async function gitBranchExists(cwd: string, branch: string): Promise<boolean> {
  try {
    await execFileAsync("git", ["show-ref", "--verify", "--quiet", `refs/heads/${branch}`], {
      cwd,
      env: gitEnv(),
    });
    return true;
  } catch (err) {
    const code = (err as { code?: number | string } | null)?.code;
    if (code === 1) return false;
    throw err;
  }
}

export async function gitListBranches(cwd: string): Promise<string[]> {
  const { stdout } = await execFileAsync("git", ["branch", "--format=%(refname:short)"], {
    cwd,
    env: gitEnv(),
  });
  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

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
