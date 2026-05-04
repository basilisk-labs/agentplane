import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import type { WorkflowDocument, WorkflowValidationResult } from "./types.js";
export declare function validateWorkflowDocument(document: WorkflowDocument, opts?: {
    repoRoot?: string;
    knownAgentIds?: Set<string>;
    config?: AgentplaneConfig | null;
}): WorkflowValidationResult;
//# sourceMappingURL=validate.d.ts.map