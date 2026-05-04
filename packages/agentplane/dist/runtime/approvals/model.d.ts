import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import type { PolicyEngine } from "../../policy/engine.js";
import type { PolicyActionDescriptor, PolicyActionId } from "../../policy/taxonomy.js";
export type EffectiveApprovalSettings = {
    require_plan: boolean;
    require_network: boolean;
    require_verify: boolean;
    require_force: boolean;
};
export type ApprovalDecisionSource = "none" | "config" | "execution_profile" | "builtin";
export type ApprovalRequirement = {
    action: PolicyActionDescriptor;
    required: boolean;
    reason: string;
    source: ApprovalDecisionSource;
    approvals: EffectiveApprovalSettings;
};
export type ApprovalResolveOptions = {
    action: PolicyActionId;
    taskId?: string;
};
export type ApprovalRequest = ApprovalResolveOptions & {
    yes: boolean;
    reason: string;
    interactive?: boolean;
};
export type ApprovalRuntimeOptions = {
    config: AgentplaneConfig;
    policy?: PolicyEngine;
};
//# sourceMappingURL=model.d.ts.map