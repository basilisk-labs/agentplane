import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import type { TaskData } from "../../backends/task-backend.js";
import { type CommandContext } from "../shared/task-backend.js";
import { type TaskStoreIntent } from "../shared/task-store.js";
export declare function renderStructuredFindingBlock(opts: {
    observation: string;
    impact: string;
    resolution: string;
    promote: boolean;
    external: boolean;
    fixability?: "repo-fixable" | null;
    incidentScope?: string;
    incidentTags: readonly string[];
    incidentMatch: readonly string[];
    incidentAdvice?: string;
    incidentRule?: string;
}): string;
export type StructuredFindingMutationPlan = {
    targetSection: string;
    expectedCurrentText: string | null;
    intents: readonly TaskStoreIntent[];
};
export declare function buildStructuredFindingMutationPlan(opts: {
    current: TaskData;
    config: AgentplaneConfig;
    observation: string;
    impact: string;
    resolution: string;
    promote: boolean;
    external: boolean;
    fixability?: "repo-fixable" | null;
    incidentScope?: string;
    incidentTags: readonly string[];
    incidentMatch: readonly string[];
    incidentAdvice?: string;
    incidentRule?: string;
    updatedBy?: string;
}): StructuredFindingMutationPlan | null;
export declare function renderFindingsAddRegistryNote(opts: {
    promote: boolean;
    external: boolean;
    taskId: string;
    branchPr?: boolean;
}): string;
export declare function cmdTaskFindingsAdd(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskId: string;
    observation: string;
    impact: string;
    resolution: string;
    promote: boolean;
    external: boolean;
    fixability?: "repo-fixable" | null;
    incidentScope?: string;
    incidentTags: string[];
    incidentMatch: string[];
    incidentAdvice?: string;
    incidentRule?: string;
    updatedBy?: string;
}): Promise<number>;
//# sourceMappingURL=findings.d.ts.map