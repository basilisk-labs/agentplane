import type { PromptModule, PromptModuleCompiledGraph } from "../../runtime/prompt-modules/index.js";
export type PromptGraphArtifactState = "unavailable" | "not_configured" | "missing" | "current" | "stale" | "invalid" | "compile_error";
export type PromptGraphModuleSummary = {
    address: string;
    title: string;
    ownerKind: PromptModule["owner"]["kind"];
    ownerLabel: string;
    sourceKind: PromptModule["provenance"]["source_kind"];
    sourceRef: string;
    fragmentId: string | null;
    recipeId: string | null;
};
export type PromptGraphSummary = {
    moduleCount: number;
    bindingCount: number;
    validatorCount: number;
    diagnosticCount: number;
    errorCount: number;
    warningCount: number;
    repoOverrideCount: number;
    ownerCounts: Record<string, number>;
    sourceKindCounts: Record<string, number>;
    contentHash: string;
};
export type PromptGraphInspection = {
    artifactPath: string | null;
    artifactState: PromptGraphArtifactState;
    activeRecipeIds: string[];
    summary: PromptGraphSummary | null;
    modules: PromptGraphModuleSummary[];
    diagnostics: PromptModuleCompiledGraph["diagnostics"];
    error: string | null;
};
export declare function inspectProjectPromptGraph(project: {
    agentplaneDir: string;
}): Promise<PromptGraphInspection>;
export declare function inspectPromptGraphForCwd(opts: {
    cwd: string;
    rootOverride?: string | null;
}): Promise<PromptGraphInspection>;
export declare function renderPromptGraphExplainText(inspection: PromptGraphInspection): string;
//# sourceMappingURL=prompt-graph-diagnostics.d.ts.map