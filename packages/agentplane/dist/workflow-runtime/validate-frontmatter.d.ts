import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import type { WorkflowDiagnostic, WorkflowFrontMatter } from "./types.js";
type WorkflowFrontMatterValidationOptions = {
    repoRoot?: string;
    knownAgentIds?: Set<string>;
    config?: AgentplaneConfig | null;
};
export declare function validateWorkflowFrontMatter(diags: WorkflowDiagnostic[], raw: Record<string, unknown>, opts?: WorkflowFrontMatterValidationOptions): WorkflowFrontMatter | undefined;
export {};
//# sourceMappingURL=validate-frontmatter.d.ts.map