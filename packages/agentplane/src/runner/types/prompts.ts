import type { OverlayStrength, OverlaySurface } from "@agentplaneorg/recipes";

import type { BehaviorResolutionTrace } from "../../runtime/behavior/index.js";
import type { PromptMarkdownFragment } from "../../runtime/prompt-fragments/index.js";

export type RunnerPromptRole = "system" | "policy" | "profile" | "task" | "context";

type RunnerPromptSurface = "base" | OverlaySurface;

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
  /** Structured source fragments retained until the provider-phase projection is compiled. */
  fragments?: PromptMarkdownFragment[];
};
