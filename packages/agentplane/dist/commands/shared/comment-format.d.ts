import type { AgentplaneConfig } from "@agentplaneorg/core/config";
export declare function normalizeCommentBodyForCommit(body: string): string;
export declare function splitSummaryAndDetails(text: string): {
    summary: string;
    details: string[];
};
export declare function formatCommentBodyForCommit(body: string, config: AgentplaneConfig): string;
//# sourceMappingURL=comment-format.d.ts.map