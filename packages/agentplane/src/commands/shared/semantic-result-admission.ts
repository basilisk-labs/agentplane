import {
  validateAgentSemanticResultForWorkOrder,
  validateAgentWorkOrderV2,
  type AgentSemanticResult,
  type AgentWorkOrderRole,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";

export type SemanticResultOwner = Readonly<{
  task_id: string;
  work_order_id: string;
  role: AgentWorkOrderRole;
}>;

export type SemanticResultAdmission = Readonly<{
  work_order: AgentWorkOrderV2;
  result: AgentSemanticResult;
  application_id: string;
}>;

/**
 * Shared transport-neutral admission for one issued semantic request. The owner is read from trusted
 * exchange state; model output can supply neither identity nor authority.
 */
export function admitSemanticResult(opts: {
  owner: SemanticResultOwner;
  work_order: unknown;
  result: unknown;
  format?: "semantic_payload_v1";
}): SemanticResultAdmission {
  const workOrder = validateAgentWorkOrderV2(opts.work_order);
  if (
    workOrder.task.id !== opts.owner.task_id ||
    workOrder.work_order_id !== opts.owner.work_order_id ||
    workOrder.role !== opts.owner.role
  ) {
    throw new Error("Issued semantic exchange owner does not match its AgentWorkOrder.");
  }
  const result = validateAgentSemanticResultForWorkOrder({
    work_order: workOrder,
    semantic_result: opts.result,
    ...(opts.format ? { format: opts.format } : {}),
  });
  return {
    work_order: workOrder,
    result,
    application_id: `result:${workOrder.work_order_id}`,
  };
}
