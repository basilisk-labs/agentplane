import { createHash } from "node:crypto";

import { canonicalizeJson } from "@agentplaneorg/core/tasks";

import { projectWorkflowOperationCommand } from "./workflow-operation-projection.js";
import {
  evaluateWorkflowOperationAuthority,
  workflowAuthorityStateScopeDigest,
  workflowOperationAuthorityDigest,
} from "./side-effect-authority.js";
import {
  authorityRef,
  commonExecution,
  routeBlockerSnapshot,
  selectedRouteBlocker,
} from "./workflow-step-common.js";
import type { RouteBlocker } from "./route-oracle.js";
import {
  WORKFLOW_OPERATION_REGISTRY,
  type WorkflowOperation,
  type WorkflowOperationId,
  type WorkflowOperationParams,
  type WorkflowRouteState,
  type WorkflowStep,
} from "./workflow-step.js";

function operationPayloadDigest(payload: {
  id: WorkflowOperationId;
  type: WorkflowOperation["type"];
  params: WorkflowOperation["params"];
}): string {
  return createHash("sha256")
    .update(JSON.stringify(canonicalizeJson(payload)), "utf8")
    .digest("hex");
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
