import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import type { TaskWorktreeCleanliness } from "../shared/task-worktree-cleanliness.js";
import type { PrFlowStatusReport } from "./flow-status.js";
import { isSettledGithubPrConflict } from "./internal/sync-github.js";

const GIT_OBJECT_ID = /^[0-9a-f]{40}(?:[0-9a-f]{24})?$/iu;
const ZERO_OBJECT_ID = "0".repeat(40);

export type DivergedConflictHeadRecovery = {
  task_id: string;
  branch: string;
  archived_local_head: string;
  archive_ref: string;
  adopted_provider_head: string;
  provider_tracking_ref: string;
  next_command: string;
};

export type DivergedConflictHeadRecoveryGitOps = {
  currentBranch: (cwd: string) => Promise<string>;
  fetchBranch: (gitRoot: string, branch: string, trackingRef: string) => Promise<void>;
  refExists: (gitRoot: string, ref: string) => Promise<boolean>;
  resolveRef: (cwd: string, ref: string) => Promise<string>;
  resetHard: (worktreePath: string, ref: string) => Promise<void>;
  setUpstream: (worktreePath: string, branch: string) => Promise<void>;
  updateRef: (gitRoot: string, ref: string, sha: string) => Promise<void>;
};

function recoveryError(message: string, code: "E_VALIDATION" | "E_GIT" = "E_VALIDATION"): CliError {
  return new CliError({ exitCode: exitCodeForError(code), code, message });
}

async function gitStdout(cwd: string, args: string[]): Promise<string> {
  const { stdout } = await execFileAsync("git", args, { cwd, env: gitEnv() });
  return stdout.trim();
}

const defaultGitOps: DivergedConflictHeadRecoveryGitOps = {
  currentBranch: (cwd) => gitStdout(cwd, ["branch", "--show-current"]),
  fetchBranch: async (gitRoot, branch, trackingRef) => {
    await execFileAsync(
      "git",
      ["fetch", "--no-tags", "origin", `refs/heads/${branch}:${trackingRef}`],
      { cwd: gitRoot, env: gitEnv() },
    );
  },
  refExists: async (gitRoot, ref) => {
    try {
      await execFileAsync("git", ["show-ref", "--verify", "--quiet", ref], {
        cwd: gitRoot,
        env: gitEnv(),
      });
      return true;
    } catch {
      return false;
    }
  },
  resolveRef: (cwd, ref) => gitStdout(cwd, ["rev-parse", ref]),
  resetHard: async (worktreePath, ref) => {
    await execFileAsync("git", ["reset", "--hard", ref], { cwd: worktreePath, env: gitEnv() });
  },
  setUpstream: async (worktreePath, branch) => {
    await execFileAsync("git", ["config", `branch.${branch}.remote`, "origin"], {
      cwd: worktreePath,
      env: gitEnv(),
    });
    await execFileAsync("git", ["config", `branch.${branch}.merge`, `refs/heads/${branch}`], {
      cwd: worktreePath,
      env: gitEnv(),
    });
  },
  updateRef: async (gitRoot, ref, sha) => {
    await execFileAsync("git", ["update-ref", ref, sha, ZERO_OBJECT_ID], {
      cwd: gitRoot,
      env: gitEnv(),
    });
  },
};

function normalizedSha(value: string, label: string): string {
  const sha = value.trim();
  if (!GIT_OBJECT_ID.test(sha)) {
    throw recoveryError(`${label} must be a full Git object id`);
  }
  return sha;
}

function providerIdentity(report: PrFlowStatusReport): {
  branch: string;
  localHead: string;
  providerHead: string;
} {
  const branch = report.branch.name?.trim() ?? "";
  const localHead = report.branch.headSha?.trim() ?? "";
  const observation = report.providerObservation;
  if (
    report.pr.state !== "OPEN" ||
    observation?.state !== "found" ||
    observation.pr.status !== "OPEN" ||
    !isSettledGithubPrConflict(observation.pr.mergeability)
  ) {
    throw recoveryError(
      "Diverged-head recovery requires an OPEN provider PR with settled merge conflicts",
    );
  }
  const providerHead = observation.pr.headSha?.trim() ?? "";
  if (!branch || !localHead || !providerHead || observation.pr.headRef?.trim() !== branch) {
    throw recoveryError("Provider conflict identity is incomplete or bound to another task branch");
  }
  if (localHead === providerHead) {
    throw recoveryError("Local and provider task heads already match; recovery is not required");
  }
  return { branch, localHead, providerHead };
}

export async function recoverDivergedConflictHead(opts: {
  gitRoot: string;
  taskId: string;
  report: PrFlowStatusReport;
  taskWorktree: TaskWorktreeCleanliness;
  expectedLocalHead: string;
  expectedProviderHead: string;
  gitOps?: DivergedConflictHeadRecoveryGitOps;
}): Promise<DivergedConflictHeadRecovery> {
  const git = opts.gitOps ?? defaultGitOps;
  const { branch, localHead, providerHead } = providerIdentity(opts.report);
  const expectedLocalHead = normalizedSha(opts.expectedLocalHead, "Expected local head");
  const expectedProviderHead = normalizedSha(opts.expectedProviderHead, "Expected provider head");
  if (localHead !== expectedLocalHead || providerHead !== expectedProviderHead) {
    throw recoveryError(
      `Observed task heads changed: local=${localHead} provider=${providerHead}. Recompute before recovery.`,
    );
  }
  if (opts.taskWorktree.state !== "clean" || !opts.taskWorktree.worktreePath) {
    throw recoveryError("Diverged-head recovery requires a clean dedicated task worktree");
  }
  if (opts.taskWorktree.branch !== branch) {
    throw recoveryError("Dedicated task worktree branch does not match the provider task branch");
  }
  const worktreePath = opts.taskWorktree.worktreePath;
  const [currentBranch, currentHead] = await Promise.all([
    git.currentBranch(worktreePath),
    git.resolveRef(worktreePath, "HEAD"),
  ]);
  if (currentBranch !== branch || currentHead !== expectedLocalHead) {
    throw recoveryError(
      `Task worktree changed: branch=${currentBranch || "<detached>"} head=${currentHead}. Recompute before recovery.`,
    );
  }

  const archiveRef = `refs/agentplane/recovery/${opts.taskId}/${expectedLocalHead}`;
  if (await git.refExists(opts.gitRoot, archiveRef)) {
    const archived = await git.resolveRef(opts.gitRoot, archiveRef);
    if (archived !== expectedLocalHead) {
      throw recoveryError(`Recovery archive collision at ${archiveRef}`);
    }
  }

  const providerTrackingRef = `refs/remotes/origin/${branch}`;
  try {
    await git.fetchBranch(opts.gitRoot, branch, providerTrackingRef);
    const fetchedHead = await git.resolveRef(opts.gitRoot, providerTrackingRef);
    if (fetchedHead !== expectedProviderHead) {
      throw recoveryError(
        `Provider task head changed during fetch: expected=${expectedProviderHead} fetched=${fetchedHead}.`,
      );
    }
    if (!(await git.refExists(opts.gitRoot, archiveRef))) {
      await git.updateRef(opts.gitRoot, archiveRef, expectedLocalHead);
    }
    await git.setUpstream(worktreePath, branch);
    await git.resetHard(worktreePath, providerTrackingRef);
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw recoveryError(
      `Diverged-head recovery stopped before semantic resolution: ${err instanceof Error ? err.message : String(err)}`,
      "E_GIT",
    );
  }

  return {
    task_id: opts.taskId,
    branch,
    archived_local_head: expectedLocalHead,
    archive_ref: archiveRef,
    adopted_provider_head: expectedProviderHead,
    provider_tracking_ref: providerTrackingRef,
    next_command: `agentplane pr conflict-rework ${opts.taskId} --json`,
  };
}
