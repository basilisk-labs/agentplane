import type { OverlayStrength, OverlaySurface } from "@agentplaneorg/recipes";
import type { BehaviorResolutionTrace } from "../../runtime/behavior/index.js";
export type RunnerPromptRole = "system" | "policy" | "profile" | "task" | "context";
export type RunnerPromptSurface = "base" | OverlaySurface;
export type RunnerPromptBlock = {
    id: string;
    role: RunnerPromptRole;
    content: string;
    title?: string;
    source?: string;
    priority: number;
    surface?: RunnerPromptSurface;
    strength?: OverlayStrength;
    resolution?: BehaviorResolutionTrace<Record<string, unknown>>;
};
//# sourceMappingURL=prompts.d.ts.map