import { realpath } from "node:fs/promises";
import path from "node:path";

import { findWorktreeForBranch } from "@agentplaneorg/core/git";

import { CliError } from "../../shared/errors.js";
import {
  readTaskHandoffLatest,
  resolveTaskHandoffPaths,
  type TaskHandoffArtifact,
} from "./task-handoff.js";

function invalidHandoff(taskId: string, reason: string): never {
  throw new CliError({
    code: "E_VALIDATION",
    message: `Cannot resolve task handoff for ${taskId}: ${reason}`,
  });
}

function protectedIdentity(handoff: TaskHandoffArtifact): string {
  return JSON.stringify([
    handoff.task_id,
    handoff.from_role,
    handoff.branch,
    handoff.pr_branch,
    handoff.base_branch,
    handoff.head_sha,
    handoff.route?.pr_number,
    handoff.route?.provider,
    Object.hasOwn(handoff.route ?? {}, "provider_base_sha"),
    handoff.route?.provider_base_sha,
  ]);
}

/** Read the protected integration owner's artifact without copying it into the task worktree. */
export async function readTaskHandoffForTask(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
  workflowMode: "direct" | "branch_pr";
  baseBranch: string | null;
}): Promise<TaskHandoffArtifact | null> {
  const read = async (gitRoot: string): Promise<TaskHandoffArtifact | null> => {
    const handoff = await readTaskHandoffLatest(
      resolveTaskHandoffPaths({
        git_root: gitRoot,
        workflow_dir: opts.workflowDir,
        task_id: opts.taskId,
      }),
    );
    if (handoff && handoff.task_id !== opts.taskId) {
      invalidHandoff(opts.taskId, "persisted task identity does not match the requested task");
    }
    return handoff;
  };

  const local = await read(opts.gitRoot);
  if (opts.workflowMode !== "branch_pr" || !opts.baseBranch) return local;

  const baseRoot = await findWorktreeForBranch(opts.gitRoot, opts.baseBranch);
  if (!baseRoot) return local;
  const [currentPath, basePath] = await Promise.all([realpath(opts.gitRoot), realpath(baseRoot)]);
  if (path.resolve(currentPath) === path.resolve(basePath)) return local;

  const base = await read(baseRoot);
  if (base?.route?.kind !== "protected_base_integrate") return local;
  if (base.from_role !== "INTEGRATOR" || base.base_branch !== opts.baseBranch) {
    invalidHandoff(opts.taskId, "protected handoff does not match its integration owner");
  }
  if (
    local?.route?.kind === "protected_base_integrate" &&
    protectedIdentity(local) !== protectedIdentity(base)
  ) {
    invalidHandoff(opts.taskId, "ambiguous protected handoff identities across checkouts");
  }

  return base;
}
