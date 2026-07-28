import type { TaskRouteDecision } from "./route-decision-types.js";
import { projectWorkflowOperationArgv } from "./workflow-operation-projection.js";
import { WORKFLOW_OPERATION_REGISTRY, type WorkflowOperation } from "./workflow-step.js";

export const WORKFLOW_SUPERVISOR_AUDIT_SCHEMA = "agentplane.workflow-supervisor-audit.v1" as const;

export type WorkflowSupervisorAuditEntry = {
  schema: typeof WORKFLOW_SUPERVISOR_AUDIT_SCHEMA;
  sequence: number;
  event:
    | "decision_observed"
    | "execution_rejected"
    | "operation_executed"
    | "operation_failed"
    | "postcondition_rejected"
    | "route_refreshed"
    | "refresh_failed";
  task_id: string;
  step_id: string;
  state_fingerprint: string;
  operation_id: string | null;
  idempotency_key: string | null;
  detail: string;
};

export type WorkflowSupervisorOperationResult = {
  status: "succeeded" | "failed";
  observed_postconditions: readonly string[];
  detail: string;
  exit_code: number | null;
};

export type WorkflowSupervisorExecution = {
  decision: TaskRouteDecision;
  operation: WorkflowOperation | null;
  executable: boolean;
  stop_reason: string | null;
  audit: readonly WorkflowSupervisorAuditEntry[];
  result: WorkflowSupervisorOperationResult | null;
  refreshed_decision: TaskRouteDecision | null;
};

export type WorkflowSupervisorExecutor = (opts: {
  operation: WorkflowOperation;
}) => Promise<WorkflowSupervisorOperationResult>;

function appendAudit(
  audit: WorkflowSupervisorAuditEntry[],
  entry: Omit<WorkflowSupervisorAuditEntry, "schema" | "sequence">,
): void {
  audit.push({
    schema: WORKFLOW_SUPERVISOR_AUDIT_SCHEMA,
    sequence: audit.length + 1,
    ...entry,
  });
}

function stopReason(decision: TaskRouteDecision): string {
  const step = decision.workflowStep;
  if (step.kind === "approval") {
    return "workflow supervisor cannot synthesize plan, provider, or side-effect approval";
  }
  if (step.kind === "agent_episode") {
    return "workflow supervisor returns control for the semantic agent episode";
  }
  if (step.kind === "human_input") {
    return "workflow supervisor requires the requested human input";
  }
  if (step.kind === "wait") {
    return "workflow supervisor waits for the observed condition instead of polling a mutation";
  }
  if (step.kind === "terminal") return "workflow supervisor reached a terminal route state";
  if (step.execution.actionKind !== "local_command") {
    return "workflow supervisor may execute only local typed operations";
  }
  if (!decision.executionPacket.safeToMutate) {
    return "workflow supervisor refuses an operation outside the current mutation authority";
  }
  if (step.operation.preconditionFingerprint.digest !== step.preconditionFingerprint.digest) {
    return "workflow supervisor rejected an operation with a stale precondition fingerprint";
  }
  if (!(step.operation.id in WORKFLOW_OPERATION_REGISTRY)) {
    return "workflow supervisor rejected an unregistered operation";
  }
  const registered = WORKFLOW_OPERATION_REGISTRY[step.operation.id];
  if (registered.type !== step.operation.type) {
    return "workflow supervisor rejected an operation whose type does not match its registry entry";
  }
  if (step.operation.params.taskId !== decision.task.id) {
    return "workflow supervisor rejected an operation for a different task";
  }
  const expectedPostconditionIds = registered.expectedPostconditions.map(
    (postcondition) => postcondition.id,
  );
  const operationPostconditionIds = step.operation.expectedPostconditions.map(
    (postcondition) => postcondition.id,
  );
  if (
    expectedPostconditionIds.length !== operationPostconditionIds.length ||
    expectedPostconditionIds.some((id, index) => id !== operationPostconditionIds[index])
  ) {
    return "workflow supervisor rejected an operation whose postconditions do not match its registry entry";
  }
  const expectedArgv = projectWorkflowOperationArgv(step.operation);
  const actualArgv = decision.executionPacket.exactArgv;
  if (
    expectedArgv.length !== actualArgv?.length ||
    expectedArgv.some((value, index) => value !== actualArgv?.[index])
  ) {
    return "workflow supervisor rejected a route whose rendered argv does not match its typed operation";
  }
  if (!step.operation.idempotencyKey.trim()) {
    return "workflow supervisor rejected an operation without an idempotency key";
  }
  return "workflow supervisor rejected the current operation";
}

function requiredPostconditionIds(operation: WorkflowOperation): string[] {
  return operation.expectedPostconditions
    .filter((postcondition) => postcondition.id !== "route_state_recomputed")
    .map((postcondition) => postcondition.id);
}

function missingPostconditions(
  operation: WorkflowOperation,
  observed: readonly string[],
): string[] {
  const observedSet = new Set(observed);
  return requiredPostconditionIds(operation).filter((id) => !observedSet.has(id));
}

async function refreshAfterOperation(opts: {
  decision: TaskRouteDecision;
  operation: WorkflowOperation;
  audit: WorkflowSupervisorAuditEntry[];
  result: WorkflowSupervisorOperationResult;
  stopReason: string | null;
  refresh: () => Promise<TaskRouteDecision>;
}): Promise<WorkflowSupervisorExecution> {
  try {
    const refreshed = await opts.refresh();
    appendAudit(opts.audit, {
      event: "route_refreshed",
      task_id: refreshed.task.id,
      step_id: refreshed.workflowStep.id,
      state_fingerprint: refreshed.workflowStep.preconditionFingerprint.digest,
      operation_id: opts.operation.id,
      idempotency_key: opts.operation.idempotencyKey,
      detail: refreshed.workflowStep.summary,
    });
    return {
      decision: opts.decision,
      operation: opts.operation,
      executable: true,
      stop_reason: opts.stopReason,
      audit: opts.audit,
      result: opts.result,
      refreshed_decision: refreshed,
    };
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    appendAudit(opts.audit, {
      event: "refresh_failed",
      task_id: opts.decision.task.id,
      step_id: opts.decision.workflowStep.id,
      state_fingerprint: opts.decision.workflowStep.preconditionFingerprint.digest,
      operation_id: opts.operation.id,
      idempotency_key: opts.operation.idempotencyKey,
      detail,
    });
    return {
      decision: opts.decision,
      operation: opts.operation,
      executable: true,
      stop_reason: opts.stopReason
        ? `${opts.stopReason}; workflow supervisor could not refresh route state`
        : "workflow supervisor could not refresh route state after the operation",
      audit: opts.audit,
      result: opts.result,
      refreshed_decision: null,
    };
  }
}

/**
 * Execute at most one registry-backed operation, then force a fresh route read.
 * Semantic episodes, approvals, waits, and terminal states are explicit stops;
 * callers cannot smuggle shell text into this boundary.
 */
export async function superviseWorkflowStep(opts: {
  decision: TaskRouteDecision;
  /** Inspect shares the same classification and audit surface without executing. */
  mode?: "inspect" | "execute";
  execute?: WorkflowSupervisorExecutor;
  refresh?: () => Promise<TaskRouteDecision>;
  completed_idempotency_keys?: ReadonlySet<string>;
}): Promise<WorkflowSupervisorExecution> {
  const audit: WorkflowSupervisorAuditEntry[] = [];
  const { decision } = opts;
  const step = decision.workflowStep;
  const operation = step.kind === "cli_operation" ? step.operation : null;
  appendAudit(audit, {
    event: "decision_observed",
    task_id: decision.task.id,
    step_id: step.id,
    state_fingerprint: step.preconditionFingerprint.digest,
    operation_id: operation?.id ?? null,
    idempotency_key: operation?.idempotencyKey ?? null,
    detail: step.summary,
  });

  if (!operation) {
    const reason = stopReason(decision);
    appendAudit(audit, {
      event: "execution_rejected",
      task_id: decision.task.id,
      step_id: step.id,
      state_fingerprint: step.preconditionFingerprint.digest,
      operation_id: null,
      idempotency_key: null,
      detail: reason,
    });
    return {
      decision,
      operation: null,
      executable: false,
      stop_reason: reason,
      audit,
      result: null,
      refreshed_decision: null,
    };
  }

  const reason = stopReason(decision);
  if (reason !== "workflow supervisor rejected the current operation") {
    appendAudit(audit, {
      event: "execution_rejected",
      task_id: decision.task.id,
      step_id: step.id,
      state_fingerprint: step.preconditionFingerprint.digest,
      operation_id: operation.id,
      idempotency_key: operation.idempotencyKey,
      detail: reason,
    });
    return {
      decision,
      operation,
      executable: false,
      stop_reason: reason,
      audit,
      result: null,
      refreshed_decision: null,
    };
  }
  if (opts.completed_idempotency_keys?.has(operation.idempotencyKey)) {
    const duplicateReason = "workflow supervisor refused a repeated idempotency key";
    appendAudit(audit, {
      event: "execution_rejected",
      task_id: decision.task.id,
      step_id: step.id,
      state_fingerprint: step.preconditionFingerprint.digest,
      operation_id: operation.id,
      idempotency_key: operation.idempotencyKey,
      detail: duplicateReason,
    });
    return {
      decision,
      operation,
      executable: false,
      stop_reason: duplicateReason,
      audit,
      result: null,
      refreshed_decision: null,
    };
  }

  if (opts.mode === "inspect") {
    return {
      decision,
      operation,
      executable: true,
      stop_reason: null,
      audit,
      result: null,
      refreshed_decision: null,
    };
  }

  if (!opts.execute || !opts.refresh) {
    throw new Error("workflow supervisor execution requires executor and refresh callbacks");
  }

  let result: WorkflowSupervisorOperationResult;
  try {
    result = await opts.execute({ operation });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    appendAudit(audit, {
      event: "operation_failed",
      task_id: decision.task.id,
      step_id: step.id,
      state_fingerprint: step.preconditionFingerprint.digest,
      operation_id: operation.id,
      idempotency_key: operation.idempotencyKey,
      detail,
    });
    return await refreshAfterOperation({
      decision,
      operation,
      audit,
      result: {
        status: "failed",
        observed_postconditions: [],
        detail,
        exit_code: 1,
      },
      stopReason: "workflow supervisor executor crashed",
      refresh: opts.refresh,
    });
  }

  appendAudit(audit, {
    event: result.status === "succeeded" ? "operation_executed" : "operation_failed",
    task_id: decision.task.id,
    step_id: step.id,
    state_fingerprint: step.preconditionFingerprint.digest,
    operation_id: operation.id,
    idempotency_key: operation.idempotencyKey,
    detail: result.detail,
  });
  if (result.status !== "succeeded") {
    return await refreshAfterOperation({
      decision,
      operation,
      audit,
      result,
      stopReason: "workflow supervisor executor reported a failed operation",
      refresh: opts.refresh,
    });
  }

  const missing = missingPostconditions(operation, result.observed_postconditions);
  if (missing.length > 0) {
    const detail = `missing observed postconditions: ${missing.join(", ")}`;
    appendAudit(audit, {
      event: "postcondition_rejected",
      task_id: decision.task.id,
      step_id: step.id,
      state_fingerprint: step.preconditionFingerprint.digest,
      operation_id: operation.id,
      idempotency_key: operation.idempotencyKey,
      detail,
    });
    return await refreshAfterOperation({
      decision,
      operation,
      audit,
      result,
      stopReason: detail,
      refresh: opts.refresh,
    });
  }
  return await refreshAfterOperation({
    decision,
    operation,
    audit,
    result,
    stopReason: null,
    refresh: opts.refresh,
  });
}
