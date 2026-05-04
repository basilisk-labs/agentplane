import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import type { PolicyActionId, PolicyApprovalKind } from "../../policy/taxonomy.js";
import { type ApprovalRequirement } from "../../runtime/approvals/index.js";
export type ApprovalAction = PolicyApprovalKind;
export declare function getApprovalRequirements(opts: {
    config: AgentplaneConfig;
    action: PolicyActionId;
}): ApprovalRequirement;
export declare function ensureActionApproved(opts: {
    action: PolicyActionId;
    config: AgentplaneConfig;
    yes: boolean;
    reason: string;
    interactive?: boolean;
}): Promise<void>;
//# sourceMappingURL=approval-requirements.d.ts.map