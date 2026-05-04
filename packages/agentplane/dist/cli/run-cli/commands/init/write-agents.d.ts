import type { WorkflowMode } from "../../../../agents/agents-template.js";
import { type PolicyGatewayFlavor } from "../../../../shared/policy-gateway.js";
export declare function ensureAgentsFiles(opts: {
    gitRoot: string;
    agentplaneDir: string;
    workflow: WorkflowMode;
    policyGateway: PolicyGatewayFlavor;
    workflowPathAbs: string;
    backendPathAbs: string;
}): Promise<{
    installPaths: string[];
}>;
//# sourceMappingURL=write-agents.d.ts.map