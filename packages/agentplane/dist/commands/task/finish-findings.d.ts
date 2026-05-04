import type { CommandContext } from "../shared/task-backend.js";
export type FinishStructuredFindingInput = {
    observation: string;
    impact: string;
    resolution: string;
    localOnly: boolean;
    repoFixable: boolean;
    incidentScope?: string;
    incidentTags: string[];
    incidentMatch: string[];
    incidentAdvice?: string;
    incidentRule?: string;
};
export declare function appendFinishStructuredFinding(opts: {
    ctx: CommandContext;
    taskId: string;
    author: string;
    finding: FinishStructuredFindingInput;
}): Promise<void>;
//# sourceMappingURL=finish-findings.d.ts.map