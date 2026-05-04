import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import type { PolicyActionId } from "../../policy/taxonomy.js";
export declare function ensureNetworkApproved(opts: {
    action?: PolicyActionId;
    config: AgentplaneConfig;
    yes: boolean;
    reason: string;
    interactive?: boolean;
}): Promise<void>;
//# sourceMappingURL=network-approval.d.ts.map