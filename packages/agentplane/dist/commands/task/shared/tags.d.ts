import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import type { CommandContext } from "../../shared/task-backend.js";
export declare function normalizeDependsOnInput(value: string): string[];
export declare function normalizeTaskStatus(value: string): string;
export declare function toStringArray(value: unknown): string[];
export declare function requiresVerify(tags: string[], requiredTags: string[]): boolean;
export type PrimaryTagResolution = {
    primary: string;
    matched: string[];
    usedFallback: boolean;
};
export type TaskTagPolicy = {
    primaryAllowlist: string[];
    strictPrimary: boolean;
    fallbackPrimary: string;
    lockPrimaryOnUpdate: boolean;
};
export declare function readTaskTagPolicy(input: CommandContext | AgentplaneConfig): TaskTagPolicy;
export declare function resolvePrimaryTagFromConfig(tags: string[], config: AgentplaneConfig): PrimaryTagResolution;
export declare function requiresVerifyStepsByPrimary(tags: string[], config: AgentplaneConfig): boolean;
export declare function requiresVerificationByPrimary(tags: string[], config: AgentplaneConfig): boolean;
export declare function resolvePrimaryTag(tags: string[], ctx: CommandContext): PrimaryTagResolution;
export declare function warnIfUnknownOwner(ctx: CommandContext, owner: string): Promise<void>;
//# sourceMappingURL=tags.d.ts.map