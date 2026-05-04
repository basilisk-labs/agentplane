import type { AgentplaneConfig } from "@agentplaneorg/core/config";
export declare function dcoIsEnabled(config: AgentplaneConfig): boolean;
export declare function resolveDcoSignoff(config: AgentplaneConfig): string | null;
export declare function appendDcoSignoff(opts: {
    config: AgentplaneConfig;
    body?: string;
}): string | undefined;
export declare function hasDcoSignoff(message: string): boolean;
export declare function assertDcoSignoff(opts: {
    config: AgentplaneConfig;
    message: string;
}): void;
//# sourceMappingURL=dco.d.ts.map