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
}): Promise<"agent" | "local" | null> {
  if (await executeCanonicalCompletedAgentEpisode(opts)) return "agent";
  if (await executeCanonicalLocalWorkflowOperation(opts)) return "local";
  return null;
}
