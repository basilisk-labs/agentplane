import type { WorkflowMode } from "../../../../agents/agents-template.js";
import { resolveInitBaseBranch } from "../../../../commands/workflow.js";
import { execFileAsync } from "@agentplaneorg/core/process";
import {
  gitBranchExists,
  gitCurrentBranch,
  gitEnv,
  gitListBranches,
} from "@agentplaneorg/core/git";
import { exitCodeForError } from "../../../exit-codes.js";
import { selectPrompt, textPrompt } from "../../../prompts.js";
import { CliError } from "../../../../shared/errors.js";

export type InitBaseBranchSelection = {
  baseBranch: string;
  createBranch?: {
    name: string;
    mode: "branch" | "checkout";
  };
};

async function promptInitBaseBranchSelection(opts: {
  gitRoot: string;
  fallback: string;
}): Promise<InitBaseBranchSelection> {
  const branches = await gitListBranches(opts.gitRoot);
  let current: string | null = null;
  try {
    current = await gitCurrentBranch(opts.gitRoot);
  } catch {
    current = null;
  }

  const promptNewBranch = async (hasBranches: boolean): Promise<InitBaseBranchSelection> => {
    const raw = await textPrompt(`Enter new base branch name (default ${opts.fallback}): `);
    const candidate = raw.trim() || opts.fallback;
    if (!candidate) {
      throw new CliError({
        exitCode: exitCodeForError("E_USAGE"),
        code: "E_USAGE",
        message: "Base branch name cannot be empty",
      });
    }
    if (await gitBranchExists(opts.gitRoot, candidate)) return { baseBranch: candidate };
    return {
      baseBranch: candidate,
      createBranch: {
        name: candidate,
        mode: hasBranches ? "branch" : "checkout",
      },
    };
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
  return { baseBranch: choice };
}

export async function resolveInitBaseBranchForInit(opts: {
  gitRoot: string;
  baseBranchFallback: string;
  isInteractive: boolean;
  workflow: WorkflowMode;
  gitRootExisted: boolean;
}): Promise<InitBaseBranchSelection> {
  if (!opts.gitRootExisted) {
    return { baseBranch: opts.baseBranchFallback };
  }
  const initBaseBranch = await resolveInitBaseBranch(opts.gitRoot, opts.baseBranchFallback);
  if (opts.isInteractive && opts.workflow === "branch_pr" && opts.gitRootExisted) {
    return await promptInitBaseBranchSelection({
      gitRoot: opts.gitRoot,
      fallback: initBaseBranch,
    });
  }
  return { baseBranch: initBaseBranch };
}

export async function applyInitBaseBranchSelection(opts: {
  gitRoot: string;
  selection: InitBaseBranchSelection;
}): Promise<void> {
  const createBranch = opts.selection.createBranch;
  if (!createBranch) return;
  if (await gitBranchExists(opts.gitRoot, createBranch.name)) return;
  try {
    await execFileAsync(
      "git",
      createBranch.mode === "branch"
        ? ["branch", createBranch.name]
        : ["checkout", "-q", "-b", createBranch.name],
      { cwd: opts.gitRoot, env: gitEnv() },
    );
  } catch (err) {
    const message =
      err instanceof Error ? err.message : `Failed to create branch ${createBranch.name}`;
    throw new CliError({ exitCode: exitCodeForError("E_GIT"), code: "E_GIT", message });
  }
}
