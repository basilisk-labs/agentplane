import type { LoadedConfig, ResolvedProject } from "@agentplaneorg/core";

import type { CommandContext } from "../../../commands/shared/task-backend.js";
import type { HelpJson } from "../../spec/help-render.js";
import type { CommandHandler, CommandSpec } from "../../spec/spec.js";

export type RunDeps = {
  getCtx: (commandForErrorContext: string) => Promise<CommandContext>;
  getResolvedProject: (commandForErrorContext: string) => Promise<ResolvedProject>;
  getLoadedConfig: (commandForErrorContext: string) => Promise<LoadedConfig>;
  getHelpJsonForDocs: () => readonly HelpJson[];
};

export type CommandEntry = {
  spec: CommandSpec<unknown>;
  load: (deps: RunDeps) => Promise<CommandHandler<unknown>>;
  needsProject: boolean;
  needsConfig: boolean;
  needsTaskContext: boolean;
};

export function entry<TParsed>(
  spec: CommandSpec<TParsed>,
  load: (deps: RunDeps) => Promise<CommandHandler<TParsed>>,
  meta?: Partial<Pick<CommandEntry, "needsProject" | "needsConfig" | "needsTaskContext">>,
): CommandEntry {
  return {
    spec: spec as CommandSpec<unknown>,
    load: (deps) => load(deps) as Promise<CommandHandler<unknown>>,
    needsProject: meta?.needsProject ?? true,
    needsConfig: meta?.needsConfig ?? meta?.needsProject ?? true,
    needsTaskContext: meta?.needsTaskContext ?? true,
  };
}
