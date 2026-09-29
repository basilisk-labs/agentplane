import path from "node:path";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import { isManagedTaskArtifact } from "../shared/quality-review-target.js";
import { readDirectRepositoryStatus } from "./direct-task-finalization.js";
import { cmdCommit } from "../guard/impl/commit.js";
import type { CommandContext } from "../shared/task-backend.js";

export function branchSupervisorArtifactCommitMessage(
  taskId: string,
  artifact: "verification_pass" | "verification_rework" | "evaluator_verdict",
): string {
  const suffix = taskId.split("-").at(-1) ?? taskId;
  if (artifact === "verification_pass") {
    return `✅ ${suffix} task: record branch verification`;
  }
  if (artifact === "verification_rework") {
    return `🧪 ${suffix} task: record verification rework`;
  }
  return `🧭 ${suffix} task: record evaluator verdict`;
}

export async function commitBranchSupervisorTaskArtifacts(opts: {
  command: CommandContext;
  cwd: string;
  task_id: string;
  message: string;
}): Promise<void> {
  // Verification and evaluator operations write task artifacts through the
  // backend after route construction may already have populated the Git status
  // cache. Refresh it before deciding whether there is anything to commit.
  opts.command.git.invalidateStatus();
  const exitCode = await cmdCommit({
    ctx: opts.command,
    cwd: opts.cwd,
    taskId: opts.task_id,
    message: opts.message,
    close: false,
    allow: [],
    autoAllow: false,
    allowTasks: true,
    allowBase: false,
    allowPolicy: false,
    allowConfig: false,
    allowHooks: false,
    allowCI: false,
    requireClean: false,
    quiet: true,
    closeUnstageOthers: false,
    closeCheckOnly: false,
  });
  if (exitCode !== 0) {
    throw new Error(`Task artifact commit exited with ${exitCode}.`);
  }
}

/** Passed checks are already durable. The next evaluator commit can include their artifacts. */
export async function canCoalesceVerificationArtifacts(opts: {
  command: CommandContext;
  cwd: string;
  task_id: string;
  next: TaskRouteDecision;
}): Promise<boolean> {
  const step = opts.next.workflowStep;
  if (
    step.kind !== "agent_episode" ||
    step.episode.purpose !== "quality_review" ||
    step.episode.taskId !== opts.task_id ||
    step.blockers.length > 0 ||
    !opts.next.executionPacket.mustRunFrom ||
    path.resolve(opts.next.executionPacket.mustRunFrom) !== path.resolve(opts.cwd)
  )
    return false;
  const status = await readDirectRepositoryStatus(opts.cwd);
  if (!status) return false;
  const prefix = `${opts.command.config.paths.workflow_dir.replaceAll("\\", "/").replace(/\/+$/u, "")}/${opts.task_id}/`;
  return status.lines.every((line) => {
    // Renames and quoted/ambiguous status paths are not eligible for deferred commits.
    const relative = line.slice(3).trim();
    return (
      !relative.includes(" -> ") &&
      !relative.startsWith('"') &&
      relative.startsWith(prefix) &&
      isManagedTaskArtifact(relative.slice(prefix.length))
    );
  });
}
