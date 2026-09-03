import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import {
  canonicalizeJson,
  createLegacyTaskAggregate,
  createTaskPlanRevision,
  reconcileReplacementPlanWorkItems,
  taskCentricAggregateFromExtensions,
  TASK_CENTRIC_EXTENSION_KEY,
  validateTaskPlanProposal,
  withTaskCentricAggregate,
} from "@agentplaneorg/core/tasks";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import {
  resolveTaskExecutionContract,
  resolveTaskExecutionRoute,
} from "../../runtime/task-routing/index.js";
import { CliError } from "../../shared/errors.js";
import { TASK_CENTRIC_EXECUTION_CAPABILITIES } from "./task-centric-external-result.js";

import { cmdTaskComment } from "./comment.js";
import type {
  ExternalAgentExchange,
  ExternalAgentResultEnvelope,
} from "./external-agent-exchange.js";
import { setTaskPlan } from "./plan.js";

function sameValue(left: unknown, right: unknown): boolean {
  // Persistence can reorder object members without changing the planning value.
  return JSON.stringify(canonicalizeJson(left)) === JSON.stringify(canonicalizeJson(right));
}

function sameStringSet(left: readonly string[] | undefined, right: readonly string[]): boolean {
  return sameValue([...(left ?? [])].toSorted(), [...right].toSorted());
}

function planningTaskFields(opts: {
  command: CommandContext;
  task: Awaited<ReturnType<typeof loadTaskFromContext>>;
  envelope: ExternalAgentResultEnvelope;
  work_order: AgentWorkOrderV2;
}) {
  const intent = opts.envelope.result.task_intent;
  const structuredProposal = opts.envelope.result.task_plan_proposal;
  const requiresIntent = opts.task.mutation_scope === "unknown";
  if (requiresIntent && !intent) {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "PLANNER result must include task_intent before a neutral intake task can advance. Return task_kind, mutation_scope, risk_flags, tags, and execution in result.task_intent; mutation_scope must be resolved rather than unknown.",
    });
  }
  let structuredExtensions: Record<string, unknown> | undefined;
  if (structuredProposal) {
    if (structuredProposal.task_id !== opts.task.id) {
      throw new CliError({
        code: "E_VALIDATION",
        message: "TaskPlanProposal task_id does not match the planned task.",
      });
    }
    const currentGitHead = opts.work_order.state_fingerprint.git_head;
    const issuedRepository = opts.work_order.planning_context?.repository_snapshot;
    const issues = [
      ...validateTaskPlanProposal({
        proposal: structuredProposal,
        expected_task_id: opts.task.id,
        current_repository_digest:
          issuedRepository?.digest ?? structuredProposal.planning_baseline.digest,
        supported_capabilities: TASK_CENTRIC_EXECUTION_CAPABILITIES,
      }),
    ];
    if (
      issuedRepository &&
      structuredProposal.planning_baseline.digest !== issuedRepository.digest
    ) {
      issues.push({
        code: "stale_baseline",
        path: "planning_baseline.digest",
        message: "TaskPlanProposal repository baseline does not match the issued planning context.",
      });
    }
    if (
      currentGitHead !== null &&
      (structuredProposal.planning_baseline.git.kind !== "commit" ||
        structuredProposal.planning_baseline.git.sha !== currentGitHead)
    ) {
      issues.push({
        code: "stale_baseline",
        path: "planning_baseline.git",
        message: "TaskPlanProposal Git baseline does not match the issued work order.",
      });
    }
    if (issues.length > 0) {
      throw new CliError({
        code: "E_VALIDATION",
        message: `TaskPlanProposal is not executable: ${issues
          .map((issue) => `${issue.code}@${issue.path}`)
          .join(", ")}.`,
      });
    }
    const createdAt = new Date().toISOString();
    const existing = taskCentricAggregateFromExtensions(opts.task.extensions);
    const aggregate =
      existing ??
      createLegacyTaskAggregate({
        id: opts.task.id,
        revision: opts.task.revision ?? 1,
        title: opts.task.title,
        description: opts.task.description,
        status: opts.task.status,
        acceptance_criteria: opts.task.verify,
        captured_at: opts.task.doc_updated_at ?? createdAt,
        updated_at: createdAt,
      });
    const plan = createTaskPlanRevision({
      proposal: structuredProposal,
      revision: (existing?.current_plan?.revision ?? 0) + 1,
      created_at: createdAt,
    });
    structuredExtensions = withTaskCentricAggregate(opts.task.extensions, {
      ...aggregate,
      revision: (opts.task.revision ?? aggregate.revision) + 1,
      lifecycle: "AWAITING_PLAN_APPROVAL",
      current_plan: plan,
      plan_history: existing?.current_plan
        ? [
            ...(existing.plan_history ?? []),
            ...(existing.plan_history?.some(
              (revision) => revision.digest === existing.current_plan!.digest,
            )
              ? []
              : [existing.current_plan]),
          ]
        : (existing?.plan_history ?? []),
      plan_amendments: [],
      work_items: reconcileReplacementPlanWorkItems({
        task: aggregate,
        proposal: structuredProposal,
      }),
      final_validation: null,
      updated_at: createdAt,
    });
  }
  if (!intent) {
    return structuredExtensions ? { extensions: structuredExtensions } : undefined;
  }
  if (requiresIntent && !intent.execution) {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "PLANNER result must include task_intent.execution so the agent selects a preferred workflow and declares scope, repository effects, external effects, requirements uncertainty, implementation uncertainty, reversibility, and rationale.",
    });
  }

  const explicitIntent =
    opts.task.mutation_scope !== "unknown" && opts.task.task_kind !== undefined;
  if (
    explicitIntent &&
    (!sameValue(opts.task.task_kind, intent.task_kind) ||
      !sameValue(opts.task.mutation_scope, intent.mutation_scope) ||
      !sameStringSet(opts.task.risk_flags, intent.risk_flags) ||
      !sameStringSet(opts.task.tags, intent.tags) ||
      !sameValue(opts.task.blueprint_request, intent.blueprint_request))
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "PLANNER result cannot override caller-supplied structured classification fields. " +
        "Keep task_kind, mutation_scope, risk_flags, tags, and blueprint_request unchanged; " +
        "result.task_intent.execution may refine the execution contract.",
    });
  }

  const executionContract = resolveTaskExecutionContract({
    config: opts.command.config,
    requestedMode: opts.task.execution_route?.requested_mode,
    task: {
      task_kind: intent.task_kind,
      mutation_scope: intent.mutation_scope,
      risk_flags: intent.risk_flags,
      blueprint_request: intent.blueprint_request,
    },
    ...(intent.execution ? { declaration: intent.execution } : {}),
  });
  const route = resolveTaskExecutionRoute({
    config: opts.command.config,
    requestedMode: opts.task.execution_route?.requested_mode,
    task: {
      task_kind: intent.task_kind,
      mutation_scope: intent.mutation_scope,
      risk_flags: intent.risk_flags,
      blueprint_request: intent.blueprint_request,
    },
    ...(intent.execution ? { declaration: intent.execution } : {}),
  });
  return {
    task_kind: intent.task_kind,
    mutation_scope: intent.mutation_scope,
    risk_flags: intent.risk_flags,
    tags: intent.tags,
    blueprint_request: intent.blueprint_request,
    execution_route: route,
    execution_contract: executionContract,
    ...(structuredExtensions ? { extensions: structuredExtensions } : {}),
  };
}

export async function assertExternalPlanningResultApplicable(opts: {
  command: CommandContext;
  exchange: ExternalAgentExchange;
  envelope: ExternalAgentResultEnvelope;
  work_order: AgentWorkOrderV2;
}): Promise<void> {
  if (opts.envelope.result.status !== "completed") return;
  const task = await loadTaskFromContext({
    ctx: opts.command,
    taskId: opts.exchange.task_id,
  });
  planningTaskFields({
    command: opts.command,
    task,
    envelope: opts.envelope,
    work_order: opts.work_order,
  });
}

export async function applyExternalPlanningResult(opts: {
  command: CommandContext;
  exchange: ExternalAgentExchange;
  envelope: ExternalAgentResultEnvelope;
  work_order: AgentWorkOrderV2;
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
    taskFields: planningTaskFields({
      command: opts.command,
      task,
      envelope: opts.envelope,
      work_order: opts.work_order,
    }),
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
      !sameStringSet(task.risk_flags, intent.risk_flags) ||
      !sameStringSet(task.tags, intent.tags) ||
      !sameValue(task.blueprint_request, intent.blueprint_request))
  ) {
    return false;
  }
  if (intent?.execution) {
    const expectedContract = resolveTaskExecutionContract({
      config: opts.command.config,
      requestedMode: task.execution_route?.requested_mode,
      task: {
        task_kind: intent.task_kind,
        mutation_scope: intent.mutation_scope,
        risk_flags: intent.risk_flags,
        blueprint_request: intent.blueprint_request,
      },
      declaration: intent.execution,
    });
    if (!sameValue(task.execution_contract?.declaration, expectedContract.declaration))
      return false;
  }
  if (opts.envelope.result.task_plan_proposal) {
    const projection = task.extensions?.[TASK_CENTRIC_EXTENSION_KEY] as
      | { current_plan?: { proposal?: unknown } }
      | undefined;
    if (!sameValue(projection?.current_plan?.proposal, opts.envelope.result.task_plan_proposal)) {
      return false;
    }
  }
  return (
    (opts.decision.workflowStep.kind === "approval" &&
      opts.decision.workflowStep.request.type === "plan_approval") ||
    task.plan_approval?.state === "approved"
  );
}
