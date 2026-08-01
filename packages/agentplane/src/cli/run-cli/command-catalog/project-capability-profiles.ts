import type { CommandCapability, CommandSession } from "./command-session.js";

export const NO_CONTEXT_REQUIREMENTS = [] as const satisfies readonly CommandCapability[];

export const PROJECT_REQUIREMENTS = ["project"] as const satisfies readonly CommandCapability[];

export const PROJECT_CONFIG_REQUIREMENTS = [
  ...PROJECT_REQUIREMENTS,
  "config",
] as const satisfies readonly CommandCapability[];

export const OUTPUT_REQUIREMENTS = ["output"] as const satisfies readonly CommandCapability[];

export type NoContextSession = CommandSession<never>;
export type ProjectSession = CommandSession<(typeof PROJECT_REQUIREMENTS)[number]>;
export type ProjectConfigSession = CommandSession<(typeof PROJECT_CONFIG_REQUIREMENTS)[number]>;
export type OutputSession = CommandSession<(typeof OUTPUT_REQUIREMENTS)[number]>;
