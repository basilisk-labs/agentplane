import { createHash } from "node:crypto";

import type { StateFingerprint } from "@agentplaneorg/core/schemas";
import { canonicalizeJson } from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import { isRecord } from "../../shared/guards.js";
import { projectWorkflowOperationCommand } from "./workflow-operation-projection.js";
import type { RouteBlocker, RouteExecutionPacket } from "./route-oracle.js";
import {
  evaluateWorkflowOperationAuthority,
  workflowAuthorityStateScopeDigest,
  workflowOperationAuthorityDigest,
} from "./side-effect-authority.js";
import {
  WORKFLOW_OPERATION_REGISTRY,
  type WorkflowOperation,
  type WorkflowCheckout,
  type WorkflowOperationId,
  type WorkflowOperationParams,
  type WorkflowRole,
  type WorkflowRouteState,
  type WorkflowStep,
} from "./workflow-step.js";

export function routeBlockerSnapshot(state: WorkflowRouteState): readonly RouteBlocker[] {
  return state.blockers.map((blocker) => ({ ...blocker }));
}

export function routeBlockerFor(
  state: WorkflowRouteState,
  ...codes: readonly RouteBlocker["code"][]
): RouteBlocker | null {
  return state.blockers.find((blocker) => codes.includes(blocker.code)) ?? null;
}

function selectedRouteBlocker(
  _state: WorkflowRouteState,
  selected: RouteBlocker | null | undefined,
): RouteBlocker | null {
  return selected ? { ...selected } : null;
}

function authorityRef(fingerprint: StateFingerprint): string {
  return `route:${fingerprint.task_id}:${fingerprint.digest}`;
}

function operationPayloadDigest(payload: {
  id: WorkflowOperationId;
  type: WorkflowOperation["type"];
  params: WorkflowOperation["params"];
}): string {
  return createHash("sha256")
    .update(JSON.stringify(canonicalizeJson(payload)), "utf8")
    .digest("hex");
}

export function workSlug(task: Pick<TaskData, "id" | "title">): string {
  const fromTitle = task.title
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "")
    .replaceAll(/-{2,}/g, "-")
    .slice(0, 48)
    .replaceAll(/-+$/g, "");
  if (fromTitle) return fromTitle;
  const suffix =
    task.id
      .split("-")
      .pop()
      ?.toLowerCase()
      .replaceAll(/[^a-z0-9]+/g, "-") ?? "";
  return suffix || "work";
}

export function commonExecution(opts: {
  actionKind: RouteExecutionPacket["actionKind"];
  role: WorkflowRole;
  semanticMutationAllowed?: boolean;
  mustNot?: readonly string[];
  returnControlWhen?: string;
  verificationCandidate?: string | null;
  evidenceMissing?: readonly string[];
  needsVerificationRecord?: boolean;
}): WorkflowStep["execution"] {
  return {
    actionKind: opts.actionKind,
    recommendedRole: opts.role,
    semanticMutationAllowed: opts.semanticMutationAllowed === true,
    mustNot: opts.mustNot ?? [],
    returnControlWhen:
      opts.returnControlWhen ??
      (opts.actionKind === "local_command"
        ? "after the exact command exits; recompute task next-action before any further step"
        : opts.actionKind === "provider_action"
          ? "after the provider or human action completes; recompute task next-action with remote truth when relevant"
          : opts.actionKind === "wait"
            ? "after the waited condition changes or the parent supervisor grants reclaim/escalation"
            : "recompute task next-action after the blocking condition changes"),
    verificationCandidate: opts.verificationCandidate ?? null,
    evidenceMissing: opts.evidenceMissing ?? [],
    needsVerificationRecord: opts.needsVerificationRecord === true,
  };
}

export function cliOperationStep<Id extends WorkflowOperationId>(opts: {
  state: WorkflowRouteState;
  operationId: Id;
  params: WorkflowOperationParams[Id];
  code: string;
  summary: string;
  selectedBlocker?: RouteBlocker | null;
}): WorkflowStep {
  const fingerprint = opts.state.preconditionFingerprint;
  const spec = WORKFLOW_OPERATION_REGISTRY[opts.operationId];
  const payload = {
    id: opts.operationId,
    type: spec.type,
    params: opts.params,
  } as const;
  const operation = {
    ...payload,
    preconditionFingerprint: fingerprint,
    authorityRef: authorityRef(fingerprint),
    idempotencyKey: `${opts.operationId}:${opts.state.task.id}:${fingerprint.digest}:${operationPayloadDigest(
      payload as Pick<WorkflowOperation, "id" | "type" | "params">,
    )}`,
    expectedPostconditions: spec.expectedPostconditions,
    triggersGitHooks: spec.triggersGitHooks,
  } as WorkflowOperation;
  const authority = evaluateWorkflowOperationAuthority({
    task: opts.state.task,
    operation,
    fingerprint,
  });
  if (authority.state !== "allowed") {
    return sideEffectApprovalStep({
      state: opts.state,
      operation,
      code: opts.code,
      summary: opts.summary,
      reason: authority.reason,
      policyRule: authority.requirement.policyRule,
      selectedBlocker: opts.selectedBlocker,
    });
  }
  operation.authorityRef = authority.authorityRef;
  return {
    schemaVersion: 1,
    id: opts.operationId,
    kind: "cli_operation",
    phase: spec.phase,
    authoritativeCheckout: spec.checkout,
    summary: opts.summary,
    blockers: routeBlockerSnapshot(opts.state),
    selectedBlocker: selectedRouteBlocker(opts.state, opts.selectedBlocker),
    compatibility: {
      code: opts.code,
      command: projectWorkflowOperationCommand(operation),
      summary: opts.summary,
      requiresApproval: false,
    },
    preconditionFingerprint: fingerprint,
    operation,
    execution: commonExecution({
      actionKind: "local_command",
      role: spec.role,
      mustNot: spec.mustNot,
      verificationCandidate: spec.verificationCandidate,
      needsVerificationRecord: spec.needsVerificationRecord,
    }),
  };
}

export function agentEpisodeStep(opts: {
  state: WorkflowRouteState;
  id: string;
  code: string;
  phase: string;
  checkout: WorkflowCheckout;
  role: WorkflowRole;
  purpose: Extract<WorkflowStep, { kind: "agent_episode" }>["episode"]["purpose"];
  summary: string;
  objective: string;
  semanticMutationAllowed?: boolean;
  mustNot?: readonly string[];
  returnControlWhen?: string;
  verificationCandidate?: string | null;
  evidenceMissing?: readonly string[];
  compatibilityCommand?: string | null;
  selectedBlocker?: RouteBlocker | null;
}): WorkflowStep {
  const fingerprint = opts.state.preconditionFingerprint;
  return {
    schemaVersion: 1,
    id: opts.id,
    kind: "agent_episode",
    phase: opts.phase,
    authoritativeCheckout: opts.checkout,
    summary: opts.summary,
    blockers: routeBlockerSnapshot(opts.state),
    selectedBlocker: selectedRouteBlocker(opts.state, opts.selectedBlocker),
    compatibility: {
      code: opts.code,
      command: opts.compatibilityCommand ?? null,
      summary: opts.summary,
      requiresApproval: false,
    },
    preconditionFingerprint: fingerprint,
    episode: {
      purpose: opts.purpose,
      role: opts.role,
      taskId: opts.state.task.id,
      objective: opts.objective,
    },
    execution: commonExecution({
      actionKind: "stop",
      role: opts.role,
      semanticMutationAllowed: opts.semanticMutationAllowed,
      mustNot: opts.mustNot,
      returnControlWhen: opts.returnControlWhen,
      verificationCandidate: opts.verificationCandidate,
      evidenceMissing: opts.evidenceMissing,
      needsVerificationRecord: opts.purpose === "verification",
    }),
  };
}

export function terminalStep(opts: {
  state: WorkflowRouteState;
  id: string;
  code: string;
  phase: string;
  checkout: WorkflowCheckout;
  role: WorkflowRole;
  outcome: Extract<WorkflowStep, { kind: "terminal" }>["outcome"]["type"];
  summary: string;
  command?: string | null;
  requiresApproval?: boolean;
  mustNot?: readonly string[];
  verificationCandidate?: string | null;
  evidenceMissing?: readonly string[];
  selectedBlocker?: RouteBlocker | null;
}): WorkflowStep {
  const fingerprint = opts.state.preconditionFingerprint;
  return {
    schemaVersion: 1,
    id: opts.id,
    kind: "terminal",
    phase: opts.phase,
    authoritativeCheckout: opts.checkout,
    summary: opts.summary,
    blockers: routeBlockerSnapshot(opts.state),
    selectedBlocker: selectedRouteBlocker(opts.state, opts.selectedBlocker),
    compatibility: {
      code: opts.code,
      command: opts.command ?? null,
      summary: opts.summary,
      requiresApproval: opts.requiresApproval === true,
    },
    preconditionFingerprint: fingerprint,
    outcome: { type: opts.outcome, taskId: opts.state.task.id },
    execution: commonExecution({
      actionKind: "stop",
      role: opts.role,
      mustNot: opts.mustNot,
      verificationCandidate: opts.verificationCandidate,
      evidenceMissing: opts.evidenceMissing,
    }),
  };
}

export function approvalStep(opts: {
  state: WorkflowRouteState;
  id: string;
  code: string;
  phase: string;
  checkout: WorkflowCheckout;
  type: "plan_approval" | "provider_merge";
  summary: string;
  command: string | null;
  selectedBlocker?: RouteBlocker | null;
}): WorkflowStep {
  const fingerprint = opts.state.preconditionFingerprint;
  return {
    schemaVersion: 1,
    id: opts.id,
    kind: "approval",
    phase: opts.phase,
    authoritativeCheckout: opts.checkout,
    summary: opts.summary,
    blockers: routeBlockerSnapshot(opts.state),
    selectedBlocker: selectedRouteBlocker(opts.state, opts.selectedBlocker),
    compatibility: {
      code: opts.code,
      command: opts.command,
      summary: opts.summary,
      requiresApproval: true,
    },
    preconditionFingerprint: fingerprint,
    request: {
      type: opts.type,
      taskId: opts.state.task.id,
      authorityRef: authorityRef(fingerprint),
    },
    execution: commonExecution({ actionKind: "provider_action", role: "USER" }),
  };
}

function sideEffectApprovalStep(opts: {
  state: WorkflowRouteState;
  operation: WorkflowOperation;
  code: string;
  summary: string;
  reason: string;
  policyRule: string;
  selectedBlocker?: RouteBlocker | null;
}): WorkflowStep {
  const fingerprint = opts.operation.preconditionFingerprint;
  const operationDigest = workflowOperationAuthorityDigest(opts.operation);
  const stateScopeDigest = workflowAuthorityStateScopeDigest(fingerprint);
  const command = [
    "agentplane",
    "task",
    "authority",
    "grant",
    opts.state.task.id,
    ...(opts.state.remoteEnabled ? ["--remote"] : []),
    "--operation",
    opts.operation.id,
    "--operation-digest",
    operationDigest,
    "--state-fingerprint",
    fingerprint.digest,
    "--state-scope-digest",
    stateScopeDigest,
    "--by",
    "USER",
  ].join(" ");
  return {
    schemaVersion: 1,
    id: `approval.${opts.operation.id}`,
    kind: "approval",
    phase: "side_effect_authority_required",
    authoritativeCheckout:
      opts.state.workflowMode === "branch_pr" ? "task_worktree" : "current_checkout",
    summary: `${opts.summary}; approval required: ${opts.reason}`,
    blockers: routeBlockerSnapshot(opts.state),
    selectedBlocker: selectedRouteBlocker(opts.state, opts.selectedBlocker),
    compatibility: {
      code: opts.code,
      command,
      summary: opts.summary,
      requiresApproval: true,
    },
    preconditionFingerprint: fingerprint,
    request: {
      type: "side_effect",
      taskId: opts.state.task.id,
      authorityRef: authorityRef(fingerprint),
      operationId: opts.operation.id,
      operation: {
        id: opts.operation.id,
        type: opts.operation.type,
        params: opts.operation.params,
      },
      operationDigest,
      stateFingerprintDigest: fingerprint.digest,
      stateScopeDigest,
      policyRule: opts.policyRule,
    },
    execution: commonExecution({
      actionKind: "provider_action",
      role: "USER",
      mustNot: [
        "do not execute the protected operation before a matching authority record is persisted",
      ],
      returnControlWhen:
        "after the authority record is persisted; recompute task next-action before any side effect",
    }),
  };
}

function runnerParams(state: WorkflowRouteState): WorkflowOperationParams["runner.follow"] {
  const id = state.task.id;
  const action = state.resume.runner.next_action;
  if (action === "cancel_then_resume") {
    return {
      mode: "reclaim",
      taskId: id,
      author: state.task.owner,
      reason: "stale runner pid is no longer alive",
    };
  }
  if (action === "wait") {
    return { mode: "status", taskId: id, runId: state.resume.runner.run_id ?? null };
  }
  if (action === "none") return { mode: "verify", taskId: id };
  return { mode: "run", taskId: id };
}

export function directStep(state: WorkflowRouteState): WorkflowStep {
  const id = state.task.id;
  if (
    state.task.verification?.state === "ok" &&
    String(state.task.status).toUpperCase() === "DOING"
  ) {
    return terminalStep({
      state,
      id: "task.complete.input",
      code: "complete_direct",
      phase: "direct_verified_pending_closeout",
      checkout: "current_checkout",
      role: "CODER",
      outcome: "input_required",
      command: `agentplane task complete ${id} --result "<result>" --commit <hash>`,
      summary:
        "task is already verified in direct workflow; close it with task complete instead of rerunning execution",
    });
  }
  if (state.resume.runner.run_id || state.resume.runner.status) {
    const code = state.resume.runner.next_action ?? "continue_direct";
    return cliOperationStep({
      state,
      operationId: "runner.follow",
      params: runnerParams(state),
      code,
      summary: "continue the direct-mode task from the current checkout",
      selectedBlocker: routeBlockerFor(state, "runner_alive"),
    });
  }
  if (String(state.task.status).toUpperCase() !== "DOING") {
    const body = "Start: continue direct-mode task in current checkout.";
    return cliOperationStep({
      state,
      operationId: "task.start",
      params: { taskId: id, author: state.task.owner, body },
      code: "start_direct",
      summary: "continue the direct-mode task from the current checkout",
      selectedBlocker: null,
    });
  }
  return agentEpisodeStep({
    state,
    id: "agent.direct_implementation",
    code: "continue_direct",
    phase: "direct_execution",
    checkout: "current_checkout",
    role: "CODER",
    purpose: "implementation",
    summary:
      "hand the direct-mode task to CODER for semantic implementation in the current checkout",
    objective:
      "Complete the task's semantic implementation in the current checkout, then record evidence-based verification before direct closeout.",
    semanticMutationAllowed: true,
    mustNot: [
      "do not complete or close the task before semantic implementation is verified with recorded evidence",
      "do not treat a missing runner artifact as a reason to replace the CODER semantic episode with a read-only CLI command",
    ],
    returnControlWhen:
      "after the CODER completes semantic implementation and records evidence-based verification; recompute task next-action before direct closeout",
    selectedBlocker: null,
  });
}

export function verifiedIncludedClosureCandidate(task: TaskData): boolean {
  if (task.verification?.state !== "ok") return false;
  if (String(task.status).toUpperCase() !== "DOING") return false;
  if (task.commit?.hash) return false;
  const batch = isRecord(task.extensions?.branch_pr_batch) ? task.extensions.branch_pr_batch : null;
  if (batch?.role !== "included") return false;
  const primaryTaskId =
    typeof batch.primary_task_id === "string" ? batch.primary_task_id.trim() : "";
  const branch = typeof batch.branch === "string" ? batch.branch.trim() : "";
  const base = typeof batch.base === "string" ? batch.base.trim() : "";
  return Boolean(primaryTaskId && branch && base);
}

export function taskWorktreeBlocker(state: WorkflowRouteState): RouteBlocker | null {
  if (state.workflowMode !== "branch_pr") return null;
  return (
    state.blockers.find(
      (blocker) =>
        blocker.code === "task_worktree_dirty" ||
        blocker.code === "task_worktree_state_unavailable",
    ) ?? null
  );
}

export function implementationReworkStep(state: WorkflowRouteState): WorkflowStep {
  return agentEpisodeStep({
    state,
    id: "agent.implementation_rework",
    code: "implementation_rework_required",
    phase: "implementation_rework_required",
    checkout: "task_worktree",
    role: "CODER",
    purpose: "implementation_rework",
    summary:
      "return control to the CODER for implementation rework in the task worktree, then verify again",
    objective: "Complete semantic implementation rework while preserving evaluator evidence.",
    semanticMutationAllowed: true,
    mustNot: [
      "do not update, open, publish, queue, or integrate the PR until implementation rework is complete and verified again",
      "do not overwrite or synthesize the persisted EVALUATOR verdict, summary, or findings",
      "do not mutate task lifecycle or PR state while control belongs to implementation rework",
    ],
    returnControlWhen:
      "after the CODER completes implementation rework and records verification; recompute task next-action before PR handling",
    selectedBlocker: routeBlockerFor(state, "implementation_rework_required"),
  });
}

export function worktreeResolutionStep(
  state: WorkflowRouteState,
  blocker: RouteBlocker,
): WorkflowStep {
  const checkout =
    state.batchOwnership.role === "included" ? "primary_task_worktree" : "task_worktree";
  const summary =
    `${blocker.summary}; inspect the task worktree, commit intended changes or ` +
    "restore unintended changes, then repeat verification and recompute the route";
  return agentEpisodeStep({
    state,
    id: "agent.task_worktree_resolution",
    code: "resolve_task_worktree_state",
    phase: "task_worktree_blocked",
    checkout,
    role: "CODER",
    purpose: "task_worktree_resolution",
    summary,
    objective: "Classify and resolve the task worktree changes without guessing intent.",
    semanticMutationAllowed:
      blocker.code === "task_worktree_dirty" && String(state.task.status).toUpperCase() === "DOING",
    mustNot: [
      "do not publish, enqueue, claim, reserve, verify, or integrate while the actual task worktree has uncommitted changes or cannot be inspected",
      "do not infer whether uncommitted changes are intended; return that semantic decision to the CODER",
    ],
    returnControlWhen:
      "after the CODER makes the task worktree clean and records fresh verification; recompute task next-action before PR handling",
    selectedBlocker: blocker,
  });
}

export function verificationStep(state: WorkflowRouteState): WorkflowStep {
  const checkout =
    state.batchOwnership.role === "included" ? "primary_task_worktree" : "task_worktree";
  return agentEpisodeStep({
    state,
    id: "agent.verification",
    code: "verification_required",
    phase: "verification_required",
    checkout,
    role: "TESTER",
    purpose: "verification",
    summary:
      "hand the committed task implementation to TESTER for evidence-based verification; record the verification outcome before closure, hosted checks, or integration",
    objective: "Execute the declared verification contract and record an evidence-based verdict.",
    mustNot: [
      "do not close, enqueue, claim, reserve, or integrate before TESTER records an evidence-based verification outcome",
      "do not synthesize a verification outcome or executable verification command from route state",
    ],
    returnControlWhen:
      "after TESTER records the evidence-based verification outcome; recompute task next-action before PR handling",
    verificationCandidate: "agentplane task verify-show <task-id>",
    evidenceMissing: ["verification_record"],
    selectedBlocker: routeBlockerFor(state, "verification_required"),
  });
}

export function qualityReviewStep(state: WorkflowRouteState): WorkflowStep {
  return agentEpisodeStep({
    state,
    id: "agent.quality_review",
    code: "quality_review_required",
    phase: "quality_review_needed",
    checkout: "task_worktree",
    role: "EVALUATOR",
    purpose: "quality_review",
    summary:
      "semantic quality review is required; run an EVALUATOR episode or explicitly record a human-supplied review",
    objective:
      "Evaluate implementation quality from task intent, diff, and evidence without synthesizing mechanical checks.",
    mustNot: [
      "do not publish or queue the PR before quality_review is recorded for the current implementation head",
      "do not synthesize verdict, summary, or findings from lint, tests, route state, or other mechanical checks",
    ],
    evidenceMissing: ["evaluator_quality_review"],
    selectedBlocker: routeBlockerFor(state, "quality_review_missing", "quality_review_stale"),
  });
}

export function includedBatchStep(state: WorkflowRouteState): WorkflowStep {
  if (state.batchOwnership.role !== "included") {
    throw new Error("includedBatchStep requires included batch ownership");
  }
  const current = state.batchOwnership.taskStates.find((task) => task.id === state.task.id);
  if (current?.verification !== "ok") {
    const command =
      `agentplane verify ${state.task.id} --ok|--rework --by ${state.task.owner} ` + '--note "..."';
    return agentEpisodeStep({
      state,
      id: "agent.included_task_verification",
      code: "verify_included_task",
      phase: "batch_delegate",
      checkout: "primary_task_worktree",
      role: "EVALUATOR",
      purpose: "verification",
      summary:
        "this task is included in a primary batch PR; verify this task instead of opening a separate PR",
      objective: "Verify the included task against its own declared contract.",
      compatibilityCommand: command,
      verificationCandidate: command,
      evidenceMissing: ["verification_record"],
      selectedBlocker: routeBlockerFor(state, "verification_required"),
    });
  }
  const primaryId = state.batchOwnership.primaryTaskId;
  return cliOperationStep({
    state,
    operationId: "batch.follow_primary",
    params: { taskId: primaryId },
    code: "follow_primary_batch",
    summary:
      "this included task is verified; continue through the primary batch task and shared PR branch",
    selectedBlocker: null,
  });
}
