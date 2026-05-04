import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import type { ApprovalRequest, ApprovalRequirement, ApprovalRuntimeOptions, ApprovalResolveOptions, EffectiveApprovalSettings } from "./model.js";
export declare function resolveEffectiveApprovalSettings(config: AgentplaneConfig): EffectiveApprovalSettings;
export declare class ApprovalRuntime {
    private readonly config;
    private readonly policy;
    constructor(opts: ApprovalRuntimeOptions);
    resolve(opts: ApprovalResolveOptions): ApprovalRequirement;
    ensure(opts: ApprovalRequest): Promise<ApprovalRequirement>;
}
export declare function createApprovalRuntime(opts: ApprovalRuntimeOptions): ApprovalRuntime;
//# sourceMappingURL=runtime.d.ts.map