import { CliError } from "../../shared/errors.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import { loadCommandContext } from "../shared/task-backend.js";

export function externalAgentResultIdentity(raw: unknown): {
  task_id: string;
  transition_id: string;
  state_fingerprint: string;
} {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "External-agent result must be an object.",
    });
  }
  const value = raw as Record<string, unknown>;
  const taskId = typeof value.task_id === "string" ? value.task_id : "";
  const transitionId = typeof value.transition_id === "string" ? value.transition_id : "";
  const fingerprint = typeof value.state_fingerprint === "string" ? value.state_fingerprint : "";
  if (!taskId || !transitionId || !fingerprint) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "External-agent result is missing its task, transition, or fingerprint binding.",
    });
  }
  return { task_id: taskId, transition_id: transitionId, state_fingerprint: fingerprint };
}

export async function refreshExternalAgentRoute(opts: {
  cwd: string;
  task_id: string;
  include_remote: boolean;
}): Promise<TaskRouteDecision> {
  const command = await loadCommandContext({ cwd: opts.cwd, rootOverride: null });
  return await buildTaskRouteDecision({
    ctx: command,
    cwd: opts.cwd,
    rootOverride: null,
    taskId: opts.task_id,
    includeRemote: opts.include_remote,
  });
}
