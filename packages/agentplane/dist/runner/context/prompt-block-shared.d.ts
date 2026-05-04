import { type BehaviorCandidate, type ResolvedBehavior } from "../../runtime/behavior/index.js";
import type { RunnerPromptBlock, RunnerPromptRole } from "../types.js";
export declare const FRAMEWORK_RUNNER_PROMPT_URL: URL;
export declare const BASE_PROMPT_PRIORITIES: {
    readonly framework_runner: 100;
    readonly policy_gateway: 200;
    readonly user_instructions: 210;
    readonly execution_profile: 250;
    readonly owner_profile: 300;
    readonly recipe_execution_context: 400;
    readonly recipe_agent_profile: 500;
    readonly recipe_skill_context: 600;
    readonly recipe_tools_context: 700;
};
export declare const OVERLAY_PROMPT_PRIORITIES: {
    readonly planning: 410;
    readonly execution: 420;
    readonly coding: 430;
    readonly debugging: 440;
    readonly review: 450;
    readonly verification: 460;
    readonly docs: 470;
    readonly finish: 480;
};
export declare function ensureTrailingNewline(text: string): string;
export declare function normalizeOwnerId(ownerIdRaw: string): string;
export declare function normalizeText(text: string): string;
export declare function validateJsonPrompt(source: string, text: string): string;
export declare function renderRecipePromptJson(value: Record<string, unknown> | Record<string, unknown>[]): string;
export declare function toPromptSource(gitRoot: string, absPath: string): string;
export declare function isRecord(value: unknown): value is Record<string, unknown>;
export declare function readOptionalStringArray(value: unknown): string[];
export type PromptSourcePayload = {
    source: string;
    title: string;
    content: string;
};
export type PromptSourceTraceMetadata = {
    title: string;
};
export type ResolvedPromptSource = ResolvedBehavior<PromptSourcePayload, PromptSourceTraceMetadata>;
export declare function promptCandidate(opts: {
    layer: BehaviorCandidate<PromptSourcePayload, PromptSourceTraceMetadata>["layer"];
    source: string;
    value: PromptSourcePayload;
    order?: number;
}): BehaviorCandidate<PromptSourcePayload, PromptSourceTraceMetadata>;
export declare function promptBlockFromResolved(opts: {
    id: string;
    role: RunnerPromptRole;
    priority: number;
    resolved: ResolvedPromptSource;
}): RunnerPromptBlock;
export declare function loadFrameworkRunnerPrompt(): Promise<RunnerPromptBlock>;
//# sourceMappingURL=prompt-block-shared.d.ts.map