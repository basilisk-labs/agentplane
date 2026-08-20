import {
  AgentWorkOrderPreparationError,
  assertAgentWorkOrderReadyForInvocation,
  type AgentWorkOrderV2,
  type AgentWorkOrderRole,
  type StateFingerprint,
  type StateFingerprintPreconditionDiagnostic,
} from "@agentplaneorg/core/schemas";

import type { BlueprintPlanArtifact } from "../../blueprints/index.js";
import { buildTaskRouteDecision } from "../../commands/shared/route-decision.js";
import type { TaskRouteDecision } from "../../commands/shared/route-decision-types.js";
import type { CommandContext } from "../../commands/shared/task-backend.js";
import type { TaskExecutionContext } from "../../runtime/task-execution-context/index.js";
import {
  makeReadOnlyExecutionContext,
  type ReadOnlyExecutionContext,
} from "../../runtime/execution-context.js";
import {
  consumeExecutionProfileBudget,
  type ResolvedExecutionProfileRuntime,
} from "../../runtime/execution-profile/index.js";
import { CliError } from "../../shared/errors.js";
import { measurePreparationNode } from "../../shared/preparation-trace.js";
import {
  collectSemanticPolicyModulePrompts,
  collectRunnerBasePrompts,
  projectRunnerPromptsForSemanticEpisode,
  RunnerPromptModuleCompilationError,
} from "../context/base-prompts.js";
import {
  assembleRunnerTaskContext,
  type RunnerTaskContextEnvelope,
} from "../context/task-context.js";
import type { RunnerPromptBlock, RunnerRecipeContext } from "../types.js";

import {
  buildAgentWorkOrderLegacyBriefProjection,
  buildAgentWorkOrderSourceManifest,
  buildCanonicalAgentWorkOrder,
} from "./agent-work-order-build.js";
import {
  buildAgentWorkOrderRemotePolicy,
  projectAgentWorkOrderRoute,
  type AgentWorkOrderLegacyBriefProjection,
  type AgentWorkOrderPreparationView,
} from "./agent-work-order-projection.js";
import { resolveRunnerBlueprintPlan } from "./task-run-blueprint-plan.js";
import {
  prepareTaskKnowledgeRetrieval,
  type SemanticRetrievalSelector,
} from "./task-knowledge-retrieval.js";

export {
  type AgentWorkOrderLegacyBriefProjection,
  type AgentWorkOrderPreparationView,
} from "./agent-work-order-projection.js";

export type PreparedAgentWorkOrder = {
  work_order: AgentWorkOrderV2;
  preparation: AgentWorkOrderPreparationView;
  /** Internal typed source for the runner only; it is never rendered as the v2 transport view. */
  route_decision: TaskRouteDecision;
  task_envelope: RunnerTaskContextEnvelope;
  /** Full internal prompt graph used for policy and state-fingerprint resolution. */
  base_prompts: RunnerPromptBlock[];
  /** Bounded projection serialized into the provider-facing runner bundle. */
  provider_prompts: RunnerPromptBlock[];
  blueprint: BlueprintPlanArtifact;
  brief_projection: AgentWorkOrderLegacyBriefProjection;
  execution_context: ReadOnlyExecutionContext;
  execution_profile: ResolvedExecutionProfileRuntime;
  route_inputs: {
    include_remote: boolean;
    include_runner_state?: boolean;
  };
};

type AgentWorkOrderPreparationRejection = {
  code: "prompt_compile_failed" | "work_order_invalid" | "work_order_stale";
  message: string;
  precondition?: StateFingerprintPreconditionDiagnostic;
  diagnostics?: {
    code: string;
    message: string;
    module_address?: string;
  }[];
};

export type AgentWorkOrderPreparationResult =
  | { status: "prepared"; value: PreparedAgentWorkOrder }
  | { status: "rejected"; rejection: AgentWorkOrderPreparationRejection };

export type AgentWorkOrderInvocationReadiness =
  | { status: "ready"; current_state_fingerprint: StateFingerprint }
  | { status: "rejected"; rejection: AgentWorkOrderPreparationRejection };

/**
 * One central remote-policy derivation for every AgentWorkOrder projection.
 * `undefined` intentionally means that a surface supplied no explicit remote
 * opt-in, so preparation remains local even in `branch_pr` mode. A remote
 * probe can happen only when a surface explicitly supplies `true`.
 */
function resolveAgentWorkOrderRemotePreparation(opts: {
  workflow_mode: "direct" | "branch_pr";
  include_remote: boolean | undefined;
}): { include_remote: boolean; remote_enabled: boolean } {
  const includeRemote = opts.include_remote === true;
  return {
    include_remote: includeRemote,
    remote_enabled: opts.workflow_mode === "branch_pr" && includeRemote,
  };
}

export function requirePreparedAgentWorkOrder(
  result: AgentWorkOrderPreparationResult,
): PreparedAgentWorkOrder {
  if (result.status === "prepared") return result.value;
  throw new CliError({
    code: "E_VALIDATION",
    message: result.rejection.message,
    context: {
      work_order_preparation: result.rejection,
    },
  });
}

export async function prepareAgentWorkOrder(opts: {
  command_ctx: CommandContext;
  cwd: string;
  root_override?: string | null;
  task_id: string;
  include_remote?: boolean;
  include_runner_state?: boolean;
  recipe?: RunnerRecipeContext;
  runner_command?: string;
  execution_context?: ReadOnlyExecutionContext;
  execution_profile?: ResolvedExecutionProfileRuntime;
  semantic_selector?: SemanticRetrievalSelector;
  prepared_route_decision?: TaskRouteDecision;
  semantic_role?: AgentWorkOrderRole;
  task_execution?: TaskExecutionContext;
}): Promise<AgentWorkOrderPreparationResult> {
  const includeRunnerState = opts.include_runner_state;
  const executionContext =
    opts.execution_context ?? (await makeReadOnlyExecutionContext(opts.command_ctx));
  const remotePreparation = resolveAgentWorkOrderRemotePreparation({
    workflow_mode: opts.task_execution?.selected_mode ?? executionContext.config.workflow_mode,
    include_remote: opts.include_remote,
  });
  const executionProfile = consumeExecutionProfileBudget({
    runtime: opts.execution_profile ?? executionContext.executionProfile,
    phase: "discovery",
  });
  try {
    const traceScope = `task:${opts.task_id}:work_order`;
    const taskEnvelope = await measurePreparationNode({
      recorder: executionContext.command.preparationTrace,
      node: "task_context_assembly",
      scope: traceScope,
      dependencies: ["task_backend_read", "command_context"],
      cacheability: "exact",
      cachePolicyReason:
        "The task envelope is bound to the complete source task and repository context.",
      operation: async () =>
        await assembleRunnerTaskContext({
          ctx: executionContext.command,
          cwd: opts.cwd,
          rootOverride: opts.root_override ?? null,
          task_id: opts.task_id,
          workflow_mode: opts.task_execution?.selected_mode,
        }),
      fingerprintInputs: (envelope) => ({
        task_id: opts.task_id,
        source_task: envelope.source_task,
        task_projection: envelope.task,
      }),
      output: (envelope) => envelope,
    });
    const basePrompts = await measurePreparationNode({
      recorder: executionContext.command.preparationTrace,
      node: "prompt_compilation",
      scope: traceScope,
      dependencies: ["task_context_assembly", "policy_evaluation"],
      cacheability: "exact",
      cachePolicyReason:
        "Formal prompt modules, task projection, harness, recipe, and execution profile are fingerprinted.",
      operation: async () =>
        await collectRunnerBasePrompts({
          git_root: executionContext.repo.git_root,
          owner_id: taskEnvelope.source_task.owner,
          agents_dir: executionContext.harness.workflow.paths.agents_dir,
          task: taskEnvelope.task,
          command: opts.runner_command ?? "task run",
          recipe: opts.recipe,
          harness: executionContext.harness,
          execution_profile: executionProfile,
        }),
      fingerprintInputs: (prompts) => ({
        task: taskEnvelope.task,
        harness: executionContext.harness,
        recipe: opts.recipe ?? null,
        execution_profile: executionProfile,
        compiled_prompts: prompts,
      }),
      output: (prompts) => prompts,
    });
    const blueprint = await measurePreparationNode({
      recorder: executionContext.command.preparationTrace,
      node: "blueprint_resolution",
      scope: traceScope,
      dependencies: ["task_context_assembly", "prompt_compilation"],
      cacheability: "exact",
      cachePolicyReason: "Blueprint inputs and the resolved plan are fingerprinted.",
      operation: async () =>
        await resolveRunnerBlueprintPlan({
          taskEnvelope,
          config: executionContext.config,
          projectRoot: executionContext.repo.git_root,
          recipe: opts.recipe,
          basePrompts,
        }),
      fingerprintInputs: (resolved) => ({
        task: taskEnvelope.task,
        config: executionContext.config,
        recipe: opts.recipe ?? null,
        prompts: basePrompts,
        resolved_blueprint: resolved,
      }),
      output: (resolved) => resolved,
    });
    if (!blueprint) {
      return {
        status: "rejected",
        rejection: {
          code: "work_order_invalid",
          message: "AgentWorkOrder preparation could not resolve a blueprint context.",
        },
      };
    }
    const sourceManifest = buildAgentWorkOrderSourceManifest({
      prepared: {
        task_envelope: taskEnvelope,
        base_prompts: basePrompts,
        blueprint,
        execution_context: executionContext,
      },
    });
    const [knowledgeRetrieval, briefProjection] = await Promise.all([
      measurePreparationNode({
        recorder: executionContext.command.preparationTrace,
        node: "knowledge_retrieval",
        scope: traceScope,
        dependencies: ["task_context_assembly", "blueprint_resolution"],
        cacheability: "exact",
        cachePolicyReason:
          "Knowledge references are digest-bound to the task, blueprint, and manifest inputs.",
        operation: async () =>
          await prepareTaskKnowledgeRetrieval({
            command_ctx: executionContext.command,
            task_envelope: taskEnvelope,
            blueprint,
            repository_root: executionContext.repo.git_root,
            semantic_selector: opts.semantic_selector,
          }),
        fingerprintInputs: (retrieval) => ({
          task: taskEnvelope.task,
          blueprint,
          retrieval_receipt: retrieval.receipt,
          knowledge_refs: retrieval.knowledge_refs,
        }),
        output: (retrieval) => retrieval,
      }),
      measurePreparationNode({
        recorder: executionContext.command.preparationTrace,
        node: "rendering",
        scope: traceScope,
        dependencies: ["task_context_assembly", "blueprint_resolution"],
        cacheability: "exact",
        cachePolicyReason:
          "The compatibility projection is a deterministic rendering of typed inputs.",
        operation: async () =>
          await buildAgentWorkOrderLegacyBriefProjection({
            command_ctx: executionContext.command,
            task_envelope: taskEnvelope,
            blueprint,
          }),
        fingerprintInputs: (projection) => ({
          task: taskEnvelope.task,
          blueprint,
          rendered_projection: projection,
        }),
        output: (projection) => projection,
      }),
    ]);
    const routeDecision =
      opts.prepared_route_decision ??
      (await buildTaskRouteDecision({
        ctx: executionContext.command,
        cwd: opts.cwd,
        rootOverride: opts.root_override ?? null,
        includeRemote: remotePreparation.include_remote,
        includeRunnerState,
        preobservedBranch: taskEnvelope.repository.branch,
        taskId: opts.task_id,
      }));
    if (routeDecision.task.id !== opts.task_id) {
      throw new AgentWorkOrderPreparationError({
        code: "invalid_work_order",
        message: "Prepared route belongs to another task.",
      });
    }
    const canonicalWorkOrder = buildCanonicalAgentWorkOrder({
      prepared: {
        task_envelope: taskEnvelope,
        execution_context: executionContext,
        route_decision: routeDecision,
        ...(opts.semantic_role ? { semantic_role: opts.semantic_role } : {}),
      },
      source_manifest: sourceManifest,
      knowledge_retrieval: knowledgeRetrieval,
    });
    const semanticBasePrompts = [
      ...projectRunnerPromptsForSemanticEpisode({
        prompts: basePrompts,
        role: canonicalWorkOrder.role,
      }),
      ...(await collectSemanticPolicyModulePrompts({
        git_root: executionContext.repo.git_root,
        policy_modules: blueprint.policyModules,
      })),
    ].toSorted((left, right) => left.priority - right.priority || left.id.localeCompare(right.id));
    const preparation: AgentWorkOrderPreparationView = {
      schema_version: 2,
      kind: "agent_work_order_preparation",
      work_order_id: canonicalWorkOrder.work_order_id,
      state_fingerprint: structuredClone(canonicalWorkOrder.state_fingerprint),
      remote_policy: buildAgentWorkOrderRemotePolicy({
        remote_enabled: remotePreparation.remote_enabled,
        decision: routeDecision,
      }),
      route: projectAgentWorkOrderRoute(routeDecision),
      source_manifest: sourceManifest,
      knowledge_retrieval: knowledgeRetrieval.receipt,
      verification_intent: structuredClone(canonicalWorkOrder.verification_intent),
    };
    return {
      status: "prepared",
      value: {
        work_order: canonicalWorkOrder,
        preparation,
        route_decision: routeDecision,
        task_envelope: taskEnvelope,
        base_prompts: basePrompts,
        provider_prompts: semanticBasePrompts,
        blueprint,
        brief_projection: briefProjection,
        execution_context: executionContext,
        execution_profile: executionProfile,
        route_inputs: {
          include_remote: remotePreparation.include_remote,
          include_runner_state: includeRunnerState,
        },
      },
    };
  } catch (error) {
    if (error instanceof RunnerPromptModuleCompilationError) {
      return {
        status: "rejected",
        rejection: {
          code: "prompt_compile_failed",
          message: error.message,
          diagnostics: error.diagnostics.map((diagnostic) => ({
            code: diagnostic.code,
            message: diagnostic.message,
            ...(diagnostic.module_address ? { module_address: diagnostic.module_address } : {}),
          })),
        },
      };
    }
    if (error instanceof AgentWorkOrderPreparationError) {
      return {
        status: "rejected",
        rejection: {
          code: "work_order_invalid",
          message: error.message,
          ...("precondition" in error.diagnostic
            ? { precondition: error.diagnostic.precondition }
            : {}),
        },
      };
    }
    throw error;
  }
}

/**
 * Recompute exactly the route fingerprint inputs used during preparation.
 * Prompt/blueprint context remains bundle-bound; invocation is refused before
 * adapter preparation if lifecycle, task, Git, policy, or route state changed.
 */
export async function evaluatePreparedAgentWorkOrderReadiness(opts: {
  command_ctx: CommandContext;
  cwd: string;
  root_override?: string | null;
  prepared: PreparedAgentWorkOrder;
}): Promise<AgentWorkOrderInvocationReadiness> {
  const decision = await buildTaskRouteDecision({
    ctx: opts.command_ctx,
    cwd: opts.cwd,
    rootOverride: opts.root_override ?? null,
    includeRemote: opts.prepared.route_inputs.include_remote,
    includeRunnerState: opts.prepared.route_inputs.include_runner_state,
    taskId: opts.prepared.work_order.task.id,
  });
  const current = decision.workflowStep.preconditionFingerprint;
  try {
    assertAgentWorkOrderReadyForInvocation({
      work_order: opts.prepared.work_order,
      current_state_fingerprint: current,
    });
    return { status: "ready", current_state_fingerprint: current };
  } catch (error) {
    if (error instanceof AgentWorkOrderPreparationError) {
      return {
        status: "rejected",
        rejection: {
          code: "work_order_stale",
          message: error.message,
          ...("precondition" in error.diagnostic
            ? { precondition: error.diagnostic.precondition }
            : {}),
        },
      };
    }
    throw error;
  }
}
