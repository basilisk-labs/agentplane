import {
  deriveRouteOperatorGuidance,
  type RouteOperatorGuidance,
} from "../shared/route-guidance.js";
import { buildRouteSourceConfidenceBase } from "../shared/source-confidence.js";
import type { WorkflowStep } from "../shared/workflow-step.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import {
  prepareAgentWorkOrder,
  requirePreparedAgentWorkOrder,
  type AgentWorkOrderLegacyBriefProjection,
  type AgentWorkOrderPreparationView,
  type PreparedAgentWorkOrder,
} from "../../runner/usecases/agent-work-order.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import {
  agentWorkContextContract,
  type AgentWorkContextContract,
  type AgentWorkContextSourceConfidence,
} from "./agent-work-context-contract.js";
import { extractDocSection, isVerifyStepsFilled, VERIFY_STEPS_PLACEHOLDER } from "./shared.js";

export type TaskBriefParsed = {
  taskId: string;
  json: boolean;
  remote: boolean;
};

type TaskBriefRoute = {
  workflow_mode: string;
  phase: string;
  authoritative_checkout: string;
  authoritative_checkout_path: string | null;
  mutation_path_hint: string | null;
  checkout_role: string;
  branch: string | null;
  base_branch: string | null;
  head_sha: string | null;
  pr_branch: string | null;
  next_action_code: string;
  blockers: { code: string; summary: string }[];
  ambiguities: { code: string; summary: string; resolution: string }[];
  repair_plan: { code: string; command: string | null; summary: string; mutates: boolean }[];
};

type TaskBriefBatchOwnership =
  | { role: "none" }
  | {
      role: "primary" | "included";
      primary_task_id: string;
      included_task_ids: string[];
      all_task_ids: string[];
      branch: string | null;
      task_states: {
        id: string;
        status: string;
        owner: string | null;
        verification: string | null;
      }[];
      next_owner_action: {
        code: string;
        summary: string;
        command: string | null;
        requires_approval: boolean;
      };
    };

type TaskBriefVerifySteps = {
  filled: boolean;
  quality: "missing" | "fallback" | "specific";
  text: string;
};

type TaskBriefLegacyProjection = {
  contract: AgentWorkContextContract;
  /** Canonical V2, snake_case work order; legacy fields below remain V1 projections. */
  work_order: AgentWorkOrderV2;
  work_order_preparation: AgentWorkOrderPreparationView;
  task: {
    id: string;
    title: string;
    status: string;
    owner: string;
    plan: string | null;
    verification: string | null;
  };
  workflow: {
    mode: string;
    checkout_role: string;
    branch: string | null;
    base_branch: string | null;
    pr_branch: string | null;
  };
  route: TaskBriefRoute;
  batch_ownership: TaskBriefBatchOwnership;
  next_action: {
    code: string;
    summary: string;
    command: string | null;
    requires_approval: boolean;
  };
  blockers: { code: string; summary: string }[];
  execution_packet: {
    schema_version: number;
    action_kind: string;
    safe_to_mutate: boolean;
    requires_provider_action: boolean;
    recommended_role: string;
    authoritative_checkout: string;
    authoritative_checkout_path: string | null;
    mutation_path_hint: string | null;
    must_run_from: string | null;
    exact_argv: string[] | null;
    must_not: string[];
    return_control_when: string;
    human_provider_action: string | null;
    stale_state_check: string;
    evidence_missing: string[];
    verification_candidate: string | null;
    stop_reason: string | null;
  };
  decision_context: RouteOperatorGuidance;
  verify_steps: TaskBriefVerifySteps;
  blueprint: AgentWorkOrderLegacyBriefProjection["blueprint"];
  policy_modules: string[];
  evidence_required: string[];
  snapshot: AgentWorkOrderLegacyBriefProjection["snapshot"];
  stop_rules: string[];
  remote: {
    enabled: boolean;
    note: string;
  };
  source_confidence: Record<string, AgentWorkContextSourceConfidence>;
};

/**
 * The named durable contract is intentionally only the shared V2 bridge.
 * Existing V1 fields are composed at the rendering edge below.
 */
export type TaskBrief = AgentWorkContextContract;

export type TaskBriefWithWorkflowStep = TaskBriefLegacyProjection & {
  workflow_step: WorkflowStep;
};

function buildSourceConfidence(opts: {
  blueprintError?: string;
  remoteEnabled: boolean;
  remoteResolved: boolean;
  snapshotState: string;
  verifyStepsQuality: TaskBriefVerifySteps["quality"];
}): TaskBriefLegacyProjection["source_confidence"] {
  const routeSourceConfidence = buildRouteSourceConfidenceBase({
    batchOwnershipSource: "local_git",
    remoteEnabled: opts.remoteEnabled,
    remoteResolved: opts.remoteResolved,
  });
  const snapshotConfidence =
    opts.snapshotState === "current" ? "high" : opts.snapshotState === "invalid" ? "low" : "medium";
  const snapshotFreshness = opts.snapshotState === "missing" ? "computed_local" : "cached_artifact";
  const snapshotNote =
    opts.snapshotState === "current"
      ? undefined
      : opts.snapshotState === "missing"
        ? "resolved snapshot artifact is missing"
        : `resolved snapshot artifact is ${opts.snapshotState}`;
  const verifyStepsConfidence =
    opts.verifyStepsQuality === "specific"
      ? "high"
      : opts.verifyStepsQuality === "fallback"
        ? "medium"
        : "low";
  const verifyStepsNote =
    opts.verifyStepsQuality === "specific"
      ? undefined
      : opts.verifyStepsQuality === "fallback"
        ? "Verify Steps are a PLANNER fallback scaffold; replace with task-specific checks when scope is known"
        : "Verify Steps are missing or still placeholder-only";
  return {
    contract: { source: "static", freshness: "static", confidence: "high" },
    ...routeSourceConfidence,
    verify_steps: {
      source: "task_doc",
      freshness: "live_local",
      confidence: verifyStepsConfidence,
      ...(verifyStepsNote ? { note: verifyStepsNote } : {}),
    },
    blueprint: {
      source: "blueprint_resolver",
      freshness: "computed_local",
      confidence: opts.blueprintError ? "low" : "high",
      ...(opts.blueprintError ? { note: opts.blueprintError } : {}),
    },
    policy_modules: {
      source: "blueprint_resolver",
      freshness: "computed_local",
      confidence: opts.blueprintError ? "low" : "high",
    },
    evidence_required: {
      source: "blueprint_resolver",
      freshness: "computed_local",
      confidence: opts.blueprintError ? "low" : "high",
    },
    snapshot: {
      source: "snapshot_digest",
      freshness: snapshotFreshness,
      confidence: snapshotConfidence,
      ...(snapshotNote ? { note: snapshotNote } : {}),
    },
    stop_rules: {
      source: "blueprint_resolver",
      freshness: "computed_local",
      confidence: opts.blueprintError ? "low" : "high",
    },
    remote: { ...routeSourceConfidence.remote },
  };
}

function verifyStepsQuality(verifySteps: string): TaskBriefVerifySteps["quality"] {
  if (!isVerifyStepsFilled(verifySteps)) return "missing";
  if (verifySteps.includes(VERIFY_STEPS_PLACEHOLDER)) return "missing";
  if (/PLANNER fallback scaffold/i.test(verifySteps)) return "fallback";
  return "specific";
}

function hasRemoteProviderEvidence(route: TaskRouteDecision): boolean {
  const prFlow = route.prFlow;
  if (!prFlow) return false;
  return (
    prFlow.pr.source === "lookup" ||
    "provider" in prFlow.closeTail ||
    prFlow.hostedChecks.checked ||
    prFlow.reviewThreads.checked
  );
}

export function projectTaskBriefFromPreparedWorkOrder(
  preparedWorkOrder: PreparedAgentWorkOrder,
): TaskBriefWithWorkflowStep {
  const task = preparedWorkOrder.task_envelope.task.data;
  const doc = preparedWorkOrder.task_envelope.task.doc;
  const verifySteps = (extractDocSection(doc, "Verify Steps") ?? "").trim();
  const verifyQuality = verifyStepsQuality(verifySteps);
  const route = preparedWorkOrder.route_decision;
  const decisionContext = deriveRouteOperatorGuidance(route);
  const legacy = preparedWorkOrder.brief_projection;
  const blueprint = legacy.blueprint;
  const snapshot = legacy.snapshot;
  const batchOwnership =
    route.batchOwnership.role === "none"
      ? ({ role: "none" } as const)
      : ({
          role: route.batchOwnership.role,
          primary_task_id: route.batchOwnership.primaryTaskId,
          included_task_ids: route.batchOwnership.includedTaskIds,
          all_task_ids: route.batchOwnership.allTaskIds,
          branch: route.batchOwnership.branch,
          task_states: route.batchOwnership.taskStates,
          next_owner_action: {
            code: route.batchOwnership.nextOwnerAction.code,
            summary: route.batchOwnership.nextOwnerAction.summary,
            command: route.batchOwnership.nextOwnerAction.command,
            requires_approval: route.batchOwnership.nextOwnerAction.requiresApproval,
          },
        } as const);

  return {
    contract: agentWorkContextContract(),
    work_order: preparedWorkOrder.work_order,
    work_order_preparation: preparedWorkOrder.preparation,
    task: {
      id: task.id,
      title: task.title,
      status: task.status,
      owner: task.owner,
      plan: task.plan_approval?.state ?? null,
      verification: task.verification?.state ?? null,
    },
    workflow: {
      mode: route.workflowMode,
      checkout_role: route.workspace.checkoutRole,
      branch: route.workspace.branch,
      base_branch: route.workspace.baseBranch,
      pr_branch: route.workspace.prBranch,
    },
    route: {
      workflow_mode: route.workflowMode,
      phase: route.oracle.phase,
      authoritative_checkout: route.oracle.authoritativeCheckout,
      authoritative_checkout_path: route.oracle.authoritativeCheckoutPath,
      mutation_path_hint: route.oracle.mutationPathHint,
      checkout_role: route.workspace.checkoutRole,
      branch: route.workspace.branch,
      base_branch: route.workspace.baseBranch,
      head_sha: route.workspace.headSha,
      pr_branch: route.workspace.prBranch,
      next_action_code: route.nextAction.code,
      blockers: route.blockers.map((blocker) => ({ ...blocker })),
      ambiguities: route.ambiguities.map((ambiguity) => ({ ...ambiguity })),
      repair_plan: route.repairPlan.map((step) => ({ ...step })),
    },
    workflow_step: route.workflowStep,
    batch_ownership: batchOwnership,
    next_action: {
      code: route.nextAction.code,
      summary: route.nextAction.summary,
      command: route.nextAction.command,
      requires_approval: route.nextAction.requiresApproval,
    },
    blockers: route.blockers.map((blocker) => ({ ...blocker })),
    execution_packet: {
      schema_version: route.executionPacket.schemaVersion,
      action_kind: route.executionPacket.actionKind,
      safe_to_mutate: route.executionPacket.safeToMutate,
      requires_provider_action: route.executionPacket.requiresProviderAction,
      recommended_role: route.executionPacket.recommendedRole,
      authoritative_checkout: route.executionPacket.authoritativeCheckout,
      authoritative_checkout_path: route.executionPacket.authoritativeCheckoutPath,
      mutation_path_hint: route.executionPacket.mutationPathHint,
      must_run_from: route.executionPacket.mustRunFrom,
      exact_argv: route.executionPacket.exactArgv,
      must_not: route.executionPacket.mustNot,
      return_control_when: route.executionPacket.returnControlWhen,
      human_provider_action: route.executionPacket.humanProviderAction,
      stale_state_check: route.executionPacket.staleStateCheck,
      evidence_missing: route.executionPacket.evidenceMissing,
      verification_candidate: route.executionPacket.verificationCandidate,
      stop_reason: route.executionPacket.stopReason,
    },
    decision_context: decisionContext,
    verify_steps: {
      filled: isVerifyStepsFilled(verifySteps),
      quality: verifyQuality,
      text: verifySteps,
    },
    blueprint,
    policy_modules: blueprint.policy_modules ?? [],
    evidence_required: blueprint.required_evidence ?? [],
    snapshot,
    stop_rules: blueprint.stop_reasons ?? [],
    remote: {
      enabled: preparedWorkOrder.preparation.remote_policy.requested,
      note: preparedWorkOrder.preparation.remote_policy.requested
        ? "remote lookup explicitly enabled"
        : "remote lookup skipped; pass --remote for hosted PR/check/review truth",
    },
    source_confidence: buildSourceConfidence({
      blueprintError: blueprint.error,
      remoteEnabled: preparedWorkOrder.preparation.remote_policy.requested,
      remoteResolved: hasRemoteProviderEvidence(route),
      snapshotState: snapshot.state,
      verifyStepsQuality: verifyQuality,
    }),
  };
}

export async function buildTaskBrief(opts: {
  commandCtx: CommandContext;
  cwd: string;
  parsed: TaskBriefParsed;
  rootOverride?: string | null;
}): Promise<TaskBriefWithWorkflowStep> {
  return projectTaskBriefFromPreparedWorkOrder(
    requirePreparedAgentWorkOrder(
      await prepareAgentWorkOrder({
        command_ctx: opts.commandCtx,
        cwd: opts.cwd,
        root_override: opts.rootOverride ?? null,
        task_id: opts.parsed.taskId,
        include_remote: opts.parsed.remote,
      }),
    ),
  );
}
