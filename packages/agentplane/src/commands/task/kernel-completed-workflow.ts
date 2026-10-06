import { advanceOrdinaryRoute } from "./ordinary-advance-step.js";
import type { AgentActionPacket } from "./agent-action-packet.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import {
  executeCanonicalCompletedAgentEpisode,
  executeCanonicalLocalWorkflowOperation,
} from "./kernel-provider-effect-coordinator.js";

export async function executeCanonicalCompletedWorkflowLocally(opts: {
  command: CommandContext;
  decision: TaskRouteDecision;
  task_id: string;
  replace_failed_operation?: boolean;
  transport: "host" | "managed";
  allow_provider_effects?: boolean;
}): Promise<"agent" | "local" | { packet: AgentActionPacket } | null> {
  const step = opts.decision.workflowStep;
  if (
    opts.transport === "host" &&
    opts.decision.workflowMode === "branch_pr" &&
    step.kind === "agent_episode" &&
    ["implementation_rework", "quality_review"].includes(step.episode.purpose)
  ) {
    // Re-resolve through the existing external owner after each native transition.
    // The new packet must bind the post-persistence task and repository state.
    const outcome = await advanceOrdinaryRoute({
      ctx: { cwd: opts.command.resolvedProject.gitRoot },
      command: opts.command,
      parsed: {
        taskId: opts.task_id,
        agentJson: true,
        remote: opts.allow_provider_effects === true,
        replacement: opts.replace_failed_operation === true,
      },
    });
    if ("action" in outcome.packet) return { packet: outcome.packet };
    throw new Error("Completed external dispatch unexpectedly returned an effect-recovery receipt");
  }
  if (await executeCanonicalCompletedAgentEpisode(opts)) return "agent";
  if (await executeCanonicalLocalWorkflowOperation(opts)) return "local";
  return null;
}
