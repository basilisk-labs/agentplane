import { execFileAsync } from "@agentplaneorg/core/process";
import {
  gitBranchExists,
  gitCurrentBranch,
  gitAddPaths,
  gitCommit,
  gitListBranches,
  gitEnv,
  gitStagedPaths,
  setPinnedBaseBranch,
} from "@agentplaneorg/core/git";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { selectPrompt, textPrompt } from "../../cli/prompts.js";
import { CliError } from "../../shared/errors.js";
import { emitTraceEvent } from "../../shared/trace-events.js";
export {
  gitBranchExists,
  gitBranchUpstream,
  gitCurrentBranch,
  gitIsAncestor,
  gitListBranches,
  gitRevParse,
  gitAddPaths,
  gitCommit,
  gitInitRepo,
  gitStagedPaths,
  resolveInitBaseBranch,
} from "@agentplaneorg/core/git";

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
    const raw = await textPrompt(`Enter new base branch name (default ${opts.fallback}): `);
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
  const choice = await selectPrompt(
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
  emitTraceEvent({
    component: "git-ops",
    event: "init_commit_started",
    details: { base_branch: opts.baseBranch, path_count: opts.installPaths.length },
  });
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
  if (staged.length === 0) {
    emitTraceEvent({
      component: "git-ops",
      event: "init_commit_skipped",
      details: { reason: "no_staged_changes" },
    });
    return;
  }

  const message = `chore: install agentplane ${opts.version}`;
  await gitCommit(opts.gitRoot, message, { skipHooks: opts.skipHooks });
  emitTraceEvent({
    component: "git-ops",
    event: "init_commit_completed",
    details: { staged_path_count: staged.length, skip_hooks: opts.skipHooks },
  });
}
