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

export type DispatchNeeds = {
  project: boolean;
  loadedConfig: boolean;
  taskContext: boolean;
};

export type CommandNeeds = "none" | "project" | "project+config" | "project+config+task";

export type CommandEntry = {
  spec: CommandSpec<unknown>;
  load: (deps: RunDeps) => Promise<CommandHandler<unknown>>;
  needs: CommandNeeds;
  dispatch: DispatchNeeds;
  invocation?: string;
};

type CommandMeta = {
  needs?: CommandNeeds;
  invocation?: string;
};

function normalizeDispatchNeeds(needs: CommandNeeds): DispatchNeeds {
  switch (needs) {
    case "none": {
      return { project: false, loadedConfig: false, taskContext: false };
    }
    case "project": {
      return { project: true, loadedConfig: false, taskContext: false };
    }
    case "project+config": {
      return { project: true, loadedConfig: true, taskContext: false };
    }
    case "project+config+task": {
      return { project: true, loadedConfig: true, taskContext: true };
    }
  }
}

export function declareCommand<TParsed>(
  spec: CommandSpec<TParsed>,
  load: (deps: RunDeps) => Promise<CommandHandler<TParsed>>,
  meta?: CommandMeta,
): CommandEntry {
  const needs = meta?.needs ?? "project+config+task";
  return {
    spec: spec as CommandSpec<unknown>,
    load: (deps) => load(deps) as Promise<CommandHandler<unknown>>,
    needs,
    dispatch: normalizeDispatchNeeds(needs),
    invocation: meta?.invocation,
  };
}

export function entry<TParsed>(
  spec: CommandSpec<TParsed>,
  load: (deps: RunDeps) => Promise<CommandHandler<TParsed>>,
  meta?: CommandMeta,
): CommandEntry {
  return declareCommand(spec, load, meta);
}
