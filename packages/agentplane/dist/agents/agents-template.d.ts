import { type PolicyGatewayFlavor } from "../shared/policy-gateway.js";
import { type PromptJsonTextFragment, type PromptMarkdownFragment, type PromptMarkdownSegment } from "../runtime/prompt-fragments/index.js";
export type WorkflowMode = "direct" | "branch_pr";
export type AgentTemplate = {
    fileName: string;
    contents: string;
    sourceContents: string;
    fragments: PromptJsonTextFragment[];
};
export type MarkdownPromptTemplate = {
    contents: string;
    sourceContents: string;
    fragments: PromptMarkdownFragment[];
    segments: PromptMarkdownSegment[];
};
type PolicyTemplate = {
    relativePath: string;
    contents: string;
    sourceContents: string;
    fragments: PromptMarkdownFragment[];
    segments: PromptMarkdownSegment[];
};
export declare function renderMarkdownPromptTemplate(sourceContents: string, opts: {
    source_ref: string;
    fallback_id?: string;
}): MarkdownPromptTemplate;
export declare function loadAgentsTemplate(): Promise<string>;
export declare function loadAgentTemplates(): Promise<AgentTemplate[]>;
export declare function loadPolicyTemplates(): Promise<PolicyTemplate[]>;
export declare function filterAgentsByWorkflow(template: string, workflow: WorkflowMode): string;
export declare function loadPolicyGatewayMarkdownTemplate(flavor: PolicyGatewayFlavor): Promise<MarkdownPromptTemplate>;
export declare function loadPolicyGatewayTemplate(flavor: PolicyGatewayFlavor): Promise<string>;
export {};
//# sourceMappingURL=agents-template.d.ts.map