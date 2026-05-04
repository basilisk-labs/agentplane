import type { TaskData } from "../../../backends/task-backend.js";
import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import type { PrHandoffNote } from "./note-store.js";
export declare function buildGithubPrTitle(task: TaskData): string;
export declare function renderPrAutoSummary(opts: {
    updatedAt: string;
    branch: string;
    headSha: string | null;
    diffstat: string;
}): string;
export declare function updateAutoSummaryBlock(text: string, summary: string): string;
export declare function extractAutoSummaryBlock(text: string): string | null;
export declare function renderPrHandoffNotes(notes: PrHandoffNote[]): string[];
export declare function updateHandoffNotesBlock(text: string, notes: PrHandoffNote[]): string;
export declare function renderPrReviewDocument(opts: {
    task: TaskData;
    author?: string;
    createdAt: string;
    branch: string;
    relatedTaskIds?: string[];
    handoffNotes?: PrHandoffNote[];
    autoSummary: string;
}): string;
export declare function renderGithubPrBody(opts: {
    task: TaskData;
    relatedTaskIds?: string[];
    handoffNotes?: PrHandoffNote[];
    autoSummary: string;
}): string;
export declare function validateReviewContents(review: string, errors: string[]): void;
export declare function validateGithubPrBodyContents(body: string, errors: string[]): void;
export declare function validateGithubPrTitleContents(title: string, taskId: string, errors: string[]): void;
type PrArtifactTexts = {
    reviewText: string | null;
    githubTitleText: string | null;
    githubBodyText: string | null;
};
export declare function validateArtifactsLanguage(opts: {
    texts: PrArtifactTexts;
    relReviewPath: string;
    relGithubTitlePath: string;
    relGithubBodyPath: string;
    artifactsLanguage: AgentplaneConfig["artifacts_language"];
    errors: string[];
}): void;
export {};
//# sourceMappingURL=review-template.d.ts.map