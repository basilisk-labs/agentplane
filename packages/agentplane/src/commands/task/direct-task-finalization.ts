import { runProcess } from "@agentplaneorg/core/process";

import type { CommandCtx } from "../../cli/spec/spec.js";
import { cmdFinish } from "./finish-command.js";
import type { CommandContext } from "../shared/task-backend.js";

export type DirectImplementationCommit =
  | { status: "ready"; commit: string }
  | { status: "missing"; reason: string };

export async function readDirectTaskHead(cwd: string): Promise<string | null> {
  const result = await runProcess({
    command: "git",
    args: ["rev-parse", "HEAD"],
    cwd,
    reject: false,
  });
  const commit = result.exitCode === 0 ? result.stdout.trim() : "";
  return commit || null;
}

function statusPaths(output: string): string[] {
  return output
    .split("\n")
    .filter(Boolean)
    .flatMap((line) => {
      const candidate = line.slice(3).trim();
      return candidate.includes(" -> ") ? candidate.split(" -> ") : [candidate];
    });
}

export async function resolveDirectImplementationCommit(opts: {
  command: CommandContext;
  cwd: string;
  task_id: string;
  execution_base_commit: string | null;
}): Promise<DirectImplementationCommit> {
  if (!opts.execution_base_commit) {
    return {
      status: "missing",
      reason: "The direct supervisor could not observe the pre-execution commit.",
    };
  }
  const status = await runProcess({
    command: "git",
    args: ["status", "--porcelain=v1", "--untracked-files=all"],
    cwd: opts.cwd,
    reject: false,
  });
  if (status.exitCode !== 0) {
    return {
      status: "missing",
      reason: "The direct supervisor could not inspect the checkout state.",
    };
  }
  const taskPrefix = `${opts.command.config.paths.workflow_dir}/${opts.task_id}/`;
  const outsideTaskArtifacts = statusPaths(status.stdout).filter(
    (entry) => !entry.startsWith(taskPrefix),
  );
  if (outsideTaskArtifacts.length > 0) {
    return {
      status: "missing",
      reason: `The EXECUTOR left uncommitted non-task paths: ${outsideTaskArtifacts.join(", ")}.`,
    };
  }
  const commit = await readDirectTaskHead(opts.cwd);
  if (!commit || commit === opts.execution_base_commit) {
    return {
      status: "missing",
      reason:
        "The EXECUTOR did not leave a distinct committed implementation for direct finalization.",
    };
  }
  return { status: "ready", commit };
}

export async function finishDirectTask(opts: {
  ctx: CommandCtx;
  command: CommandContext;
  task_id: string;
  implementation_commit: string;
}): Promise<number> {
  return await cmdFinish({
    ctx: opts.command,
    cwd: opts.ctx.cwd,
    rootOverride: opts.ctx.rootOverride,
    taskIds: [opts.task_id],
    author: "SUPERVISOR",
    body: "Verified: direct CLI supervision observed the EXECUTOR receipt, ran every declared check, and recorded an independent EVALUATOR pass before finalization.",
    result:
      "Direct CLI supervision completed with observed EXECUTOR, check, and EVALUATOR evidence.",
    commit: opts.implementation_commit,
    implementationCommit: opts.implementation_commit,
    breaking: false,
    force: false,
    commitFromComment: false,
    commitAllow: [],
    commitAutoAllow: false,
    commitAllowTasks: true,
    commitRequireClean: false,
    statusCommit: false,
    statusCommitAllow: [],
    statusCommitAutoAllow: false,
    statusCommitRequireClean: false,
    confirmStatusCommit: false,
    quiet: true,
  });
}
