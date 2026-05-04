import { type AgentplaneConfig } from "@agentplaneorg/core/config";
import type { ResolvedProject } from "@agentplaneorg/core/project";
import type { TaskBackendCapabilities } from "../../backends/task-backend.js";
import { type PolicyGatewayFlavor } from "../../shared/policy-gateway.js";
import type { ResolvedHarnessContract } from "./types.js";
export declare function resolveHarnessContract(opts: {
    project: ResolvedProject;
    config: AgentplaneConfig;
    backendId: string;
    backendConfigPath: string;
    backendCapabilities?: TaskBackendCapabilities | null;
    fallbackPolicyGatewayFlavor?: PolicyGatewayFlavor;
}): Promise<ResolvedHarnessContract>;
//# sourceMappingURL=resolve.d.ts.map