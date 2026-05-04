import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import { type ResolvedProject } from "@agentplaneorg/core/project";
import { type TaskBackend } from "./shared.js";
export declare function loadTaskBackend(opts: {
    cwd: string;
    rootOverride?: string | null;
    resolvedProject?: ResolvedProject;
    config?: AgentplaneConfig;
}): Promise<{
    backend: TaskBackend;
    backendId: string;
    resolved: ResolvedProject;
    config: AgentplaneConfig;
    backendConfigPath: string;
}>;
//# sourceMappingURL=load.d.ts.map