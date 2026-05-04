import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import type { TaskData } from "../../../backends/task-backend.js";
export declare function nowIso(): string;
export declare const VERIFY_STEPS_PLACEHOLDER = "<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->";
export declare const VERIFICATION_RESULTS_BEGIN = "<!-- BEGIN VERIFICATION RESULTS -->";
export declare const VERIFICATION_RESULTS_END = "<!-- END VERIFICATION RESULTS -->";
export type TaskDocVersion = 2 | 3;
export declare function decodeEscapedTaskTextNewlines(text: string): string;
export declare function extractDocSection(doc: string, sectionName: string): string | null;
export declare function isVerifyStepsFilled(sectionText: string | null): boolean;
export declare function assertVerifyStepsFilled(opts: {
    taskId: string;
    sectionText: string | null;
    action: string;
    guidance?: string;
}): void;
export declare function normalizeTaskDocVersion(value: unknown, fallback?: TaskDocVersion): TaskDocVersion;
export declare function normalizeVerificationSectionLayout(sectionText: string | null, version: TaskDocVersion): string;
export declare function taskObservationSectionName(version: TaskDocVersion): "Notes" | "Findings";
export declare function extractTaskObservationSection(doc: string, version: TaskDocVersion): string | null;
export declare function resolveWritableDocSections(opts: {
    allowedSections: readonly string[];
    requiredSections: readonly string[];
    targetSection: string;
}): string[];
export declare function isDocSectionFilled(sectionText: string | null): boolean;
export declare function ensureAgentFilledRequiredDocSections(opts: {
    task: Pick<TaskData, "id">;
    config: AgentplaneConfig;
    doc: string;
    action: string;
}): void;
//# sourceMappingURL=docs.d.ts.map