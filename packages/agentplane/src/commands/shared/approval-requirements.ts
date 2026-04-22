import type { AgentplaneConfig } from "@agentplaneorg/core/config";

import type { PolicyActionId, PolicyApprovalKind } from "../../policy/taxonomy.js";
import { createApprovalRuntime, type ApprovalRequirement } from "../../runtime/approvals/index.js";

export type ApprovalAction = PolicyApprovalKind;

export function getApprovalRequirements(opts: {
  config: AgentplaneConfig;
  action: PolicyActionId;
}): ApprovalRequirement {
  return createApprovalRuntime({ config: opts.config }).resolve({ action: opts.action });
}

export async function ensureActionApproved(opts: {
  action: PolicyActionId;
  config: AgentplaneConfig;
  yes: boolean;
  reason: string;
  interactive?: boolean;
}): Promise<void> {
  await createApprovalRuntime({ config: opts.config }).ensure(opts);
}
