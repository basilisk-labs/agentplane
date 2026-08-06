import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import type {
  TaskExecutionRoute,
  TaskExecutionRouteMode,
  TaskExecutionRouteRequest,
} from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "../../commands/shared/task-backend.js";

type RouteTaskInput = Pick<
  TaskData,
  "task_kind" | "mutation_scope" | "risk_flags" | "blueprint_request"
>;

const BRANCH_PR_RISK_FLAGS = new Set([
  "credentials",
  "deploy",
  "publish",
  "merge",
  "security",
  "external_system",
]);

function repositoryMode(config: AgentplaneConfig): TaskExecutionRouteMode {
  return config.workflow_mode === "branch_pr" ? "branch_pr" : "direct";
}

function autoRouteReasons(task: RouteTaskInput): string[] {
  const reasons: string[] = [];
  if (task.blueprint_request === "code.branch_pr" || task.blueprint_request === "release.strict") {
    reasons.push("blueprint_requires_branch_pr");
  }
  if (
    task.task_kind === "release" ||
    task.task_kind === "ops" ||
    task.mutation_scope === "release" ||
    task.mutation_scope === "ops"
  ) {
    reasons.push("mutation_requires_isolation");
  }
  if (task.mutation_scope === "unknown") reasons.push("mutation_scope_unknown");
  for (const risk of task.risk_flags ?? []) {
    if (BRANCH_PR_RISK_FLAGS.has(risk)) reasons.push(`risk_${risk}`);
  }
  return [...new Set(reasons)].toSorted();
}

export function resolveTaskExecutionRoute(opts: {
  config: AgentplaneConfig;
  task: RouteTaskInput;
  requestedMode?: TaskExecutionRouteRequest;
}): TaskExecutionRoute {
  const repoMode = repositoryMode(opts.config);
  const requestedMode = opts.requestedMode ?? "repository";
  const reasons: string[] = [];
  let selectedMode: TaskExecutionRouteMode;

  if (repoMode === "branch_pr") {
    selectedMode = "branch_pr";
    reasons.push("repository_branch_pr_floor");
    if (requestedMode === "direct") reasons.push("direct_request_overridden");
  } else {
    switch (requestedMode) {
      case "repository": {
        selectedMode = "direct";
        reasons.push("repository_mode_selected");
        break;
      }
      case "branch_pr": {
        selectedMode = "branch_pr";
        reasons.push("explicit_branch_pr");
        break;
      }
      case "direct": {
        const forcedReasons = autoRouteReasons(opts.task);
        selectedMode = forcedReasons.length > 0 ? "branch_pr" : "direct";
        reasons.push(
          ...(forcedReasons.length > 0
            ? ["direct_request_overridden", ...forcedReasons]
            : ["explicit_direct"]),
        );
        break;
      }
      case "auto": {
        const forcedReasons = autoRouteReasons(opts.task);
        selectedMode = forcedReasons.length > 0 ? "branch_pr" : "direct";
        reasons.push(...(forcedReasons.length > 0 ? forcedReasons : ["automatic_safe_direct"]));
        break;
      }
    }
  }

  return {
    schema_version: 1,
    requested_mode: requestedMode,
    selected_mode: selectedMode,
    repository_mode: repoMode,
    reason_codes: [...new Set(reasons)].toSorted(),
    frozen: true,
  };
}

export function resolveEffectiveTaskWorkflowMode(
  task: Pick<TaskData, "execution_route">,
  config: AgentplaneConfig,
): TaskExecutionRouteMode {
  const repoMode = repositoryMode(config);
  if (repoMode === "branch_pr") return "branch_pr";
  return task.execution_route?.selected_mode ?? repoMode;
}

export function withEffectiveTaskWorkflowMode(
  ctx: CommandContext,
  task: Pick<TaskData, "execution_route">,
): CommandContext {
  const workflowMode = resolveEffectiveTaskWorkflowMode(task, ctx.config);
  if (workflowMode === ctx.config.workflow_mode) return ctx;
  return {
    ...ctx,
    config: {
      ...ctx.config,
      workflow_mode: workflowMode,
    },
  };
}
