import type { WorkflowStep } from "../shared/workflow-step.js";
import type { UserApprovalReceiptRequest } from "../../adapters/authority/user-approval-receipt.js";

export {
  canonicalUserApprovalReceiptPayload,
  verifyUserApprovalReceipt,
} from "../../adapters/authority/user-approval-receipt.js";
export type {
  UserApprovalReceipt,
  UserApprovalReceiptRequest,
} from "../../adapters/authority/user-approval-receipt.js";

export function userApprovalReceiptRequestForStep(
  step: Extract<WorkflowStep, { kind: "approval" }>,
): UserApprovalReceiptRequest {
  if (step.request.type === "side_effect") {
    return {
      approvalType: "side_effect",
      taskId: step.request.taskId,
      authorityReference: step.request.authorityRef,
      stateFingerprint: step.request.stateFingerprintDigest,
      operationId: step.request.operationId,
      operationDigest: step.request.operationDigest,
      stateScopeDigest: step.request.stateScopeDigest,
    };
  }
  return {
    approvalType: step.request.type,
    taskId: step.request.taskId,
    authorityReference: step.request.authorityRef,
    stateFingerprint: step.preconditionFingerprint.digest,
  };
}
