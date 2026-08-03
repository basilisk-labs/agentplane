import type { CommandCtx } from "../../cli/spec/spec.js";
import { CliError } from "../../shared/errors.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import { openSupervisorExecutionEpisode } from "../shared/supervisor-execution-episode.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";

import { executeProductionBranchEpisode } from "./branch-task-supervisor-episodes.js";
import { verifyDirectTask } from "./direct-task-supervisor-closeout.js";

export async function executeExternalAgentVerification(opts: {
  ctx: CommandCtx;
  command: CommandContext;
  decision: TaskRouteDecision;
  decide: () => Promise<TaskRouteDecision>;
}): Promise<TaskRouteDecision> {
  const step = opts.decision.workflowStep;
  if (step.kind !== "agent_episode" || step.episode.purpose !== "verification") {
    throw new CliError({
      code: "E_INTERNAL",
      message: "External-agent verification executor received a non-verification route.",
    });
  }
  if (opts.decision.workflowMode === "branch_pr") {
    const outcome = await executeProductionBranchEpisode({
      input: {
        ctx: opts.ctx,
        command: opts.command,
        task_id: opts.decision.task.id,
      },
      decision: opts.decision,
      decide: opts.decide,
    });
    if (outcome.status === "stopped") {
      throw new CliError({ code: "E_RUNTIME", message: outcome.stop.reason });
    }
    return outcome.decision;
  }
  const task = await loadTaskFromContext({ ctx: opts.command, taskId: opts.decision.task.id });
  const opened = await openSupervisorExecutionEpisode({
    git_root: opts.command.resolvedProject.gitRoot,
    task_id: opts.decision.task.id,
    task_revision: task.revision ?? null,
    state_fingerprint_digest: step.preconditionFingerprint.digest,
    recover_intent: false,
  });
  const outcome = await verifyDirectTask({
    ctx: opts.ctx,
    command: opts.command,
    task_id: opts.decision.task.id,
    task,
    decision: opts.decide,
    journal: { journal: opened.journal, journal_path: opened.journal_path },
  });
  if (outcome.status === "stopped") {
    throw new CliError({ code: "E_RUNTIME", message: outcome.stop.reason });
  }
  return outcome.decision;
}
