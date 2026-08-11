import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import { resolveTaskExecutionRoute } from "../../runtime/task-routing/index.js";
import { CliError } from "../../shared/errors.js";

import { cmdTaskComment } from "./comment.js";
import type {
  ExternalAgentExchange,
  ExternalAgentResultEnvelope,
} from "./external-agent-exchange.js";
import { setTaskPlan } from "./plan.js";

function sameValue(left: unknown, right: unknown): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}

function planningTaskFields(opts: {
  command: CommandContext;
  task: Awaited<ReturnType<typeof loadTaskFromContext>>;
  envelope: ExternalAgentResultEnvelope;
}) {
  const intent = opts.envelope.result.task_intent;
  const requiresIntent = opts.task.mutation_scope === "unknown";
  if (requiresIntent && !intent) {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "PLANNER result must include task_intent before a neutral intake task can advance. Return task_kind, mutation_scope, risk_flags, and tags in result.task_intent; mutation_scope must be resolved rather than unknown.",
    });
  }
  if (!intent) return;

  const explicitIntent =
    opts.task.mutation_scope !== "unknown" && opts.task.task_kind !== undefined;
  if (
    explicitIntent &&
    (!sameValue(opts.task.task_kind, intent.task_kind) ||
      !sameValue(opts.task.mutation_scope, intent.mutation_scope) ||
      !sameValue(opts.task.risk_flags ?? [], intent.risk_flags) ||
      !sameValue(opts.task.tags ?? [], intent.tags) ||
      !sameValue(opts.task.blueprint_request, intent.blueprint_request))
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "PLANNER result cannot override caller-supplied structured task intent. Return the existing structured intent unchanged or omit result.task_intent.",
    });
  }

  const route = resolveTaskExecutionRoute({
    config: opts.command.config,
    requestedMode: opts.task.execution_route?.requested_mode,
    task: {
      task_kind: intent.task_kind,
      mutation_scope: intent.mutation_scope,
      risk_flags: intent.risk_flags,
      blueprint_request: intent.blueprint_request,
    },
  });
  return {
    task_kind: intent.task_kind,
    mutation_scope: intent.mutation_scope,
    risk_flags: intent.risk_flags,
    tags: intent.tags,
    blueprint_request: intent.blueprint_request,
    execution_route: route,
  };
}

export async function assertExternalPlanningResultApplicable(opts: {
  command: CommandContext;
  exchange: ExternalAgentExchange;
  envelope: ExternalAgentResultEnvelope;
}): Promise<void> {
  if (opts.envelope.result.status !== "completed") return;
  const task = await loadTaskFromContext({
    ctx: opts.command,
    taskId: opts.exchange.task_id,
  });
  planningTaskFields({ command: opts.command, task, envelope: opts.envelope });
}

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
  const task = await loadTaskFromContext({
    ctx: opts.command,
    taskId: opts.exchange.task_id,
  });
  await setTaskPlan({
    ctx: opts.command,
    cwd: opts.exchange.checkout,
    taskId: opts.exchange.task_id,
    text: opts.envelope.result.summary,
    updatedBy: "PLANNER",
    taskFields: planningTaskFields({ command: opts.command, task, envelope: opts.envelope }),
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
  const intent = opts.envelope.result.task_intent;
  if (
    intent &&
    (!sameValue(task.task_kind, intent.task_kind) ||
      !sameValue(task.mutation_scope, intent.mutation_scope) ||
      !sameValue(task.risk_flags ?? [], intent.risk_flags) ||
      !sameValue(task.tags ?? [], intent.tags) ||
      !sameValue(task.blueprint_request, intent.blueprint_request))
  ) {
    return false;
  }
  return (
    (opts.decision.workflowStep.kind === "approval" &&
      opts.decision.workflowStep.request.type === "plan_approval") ||
    task.plan_approval?.state === "approved"
  );
}
