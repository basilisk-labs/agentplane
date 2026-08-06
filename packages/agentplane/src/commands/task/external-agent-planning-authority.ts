import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";

import { cmdTaskComment } from "./comment.js";
import type {
  ExternalAgentExchange,
  ExternalAgentResultEnvelope,
} from "./external-agent-exchange.js";
import { setTaskPlan } from "./plan.js";

export async function applyExternalPlanningResult(opts: {
  command: CommandContext;
  exchange: ExternalAgentExchange;
  envelope: ExternalAgentResultEnvelope;
}): Promise<void> {
  if (opts.envelope.result.status !== "completed") {
    await cmdTaskComment({
      ctx: opts.command,
      cwd: opts.exchange.checkout,
      taskId: opts.exchange.task_id,
      author: "PLANNER",
      body: `Planning returned ${opts.envelope.result.status}: ${opts.envelope.result.summary}`,
      quiet: true,
    });
    return;
  }
  await setTaskPlan({
    ctx: opts.command,
    cwd: opts.exchange.checkout,
    taskId: opts.exchange.task_id,
    text: opts.envelope.result.summary,
    updatedBy: "PLANNER",
  });
}

export async function isExternalPlanningResultApplied(opts: {
  command: CommandContext;
  exchange: ExternalAgentExchange;
  decision: TaskRouteDecision;
  envelope: ExternalAgentResultEnvelope;
}): Promise<boolean> {
  if (opts.envelope.result.status !== "completed") return false;
  const task = await loadTaskFromContext({
    ctx: opts.command,
    taskId: opts.exchange.task_id,
  });
  if (task.sections?.Plan?.trim() !== opts.envelope.result.summary.trim()) return false;
  return (
    (opts.decision.workflowStep.kind === "approval" &&
      opts.decision.workflowStep.request.type === "plan_approval") ||
    task.plan_approval?.state === "approved"
  );
}
