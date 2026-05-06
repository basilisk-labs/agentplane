import type { LoadedConfig } from "@agentplaneorg/core/config";
import type { ResolvedProject } from "@agentplaneorg/core/project";

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
export type CommandSurface = "user" | "advanced" | "framework" | "internal";

export type CommandEntry = {
  spec: CommandSpec<unknown>;
  load: (deps: RunDeps) => Promise<CommandHandler<unknown>>;
  needs: CommandNeeds;
  dispatch: DispatchNeeds;
  surface: CommandSurface;
  helpGroup?: string;
  invocation?: string;
};

export type CommandMeta = {
  needs?: CommandNeeds;
  surface?: CommandSurface;
  helpGroup?: string;
  invocation?: string;
};

export type CommandModule = object;

type LoadedCommandDeclaration<TParsed> = CommandMeta & {
  load: (deps: RunDeps) => Promise<CommandHandler<TParsed>>;
  module?: never;
  runExport?: never;
};

type ExportedCommandDeclaration = CommandMeta & {
  module: () => Promise<CommandModule>;
  runExport: string;
  load?: never;
};

type CommandDeclaration<TParsed> = LoadedCommandDeclaration<TParsed> | ExportedCommandDeclaration;

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
  declaration: CommandDeclaration<TParsed>,
): CommandEntry {
  const needs = declaration.needs ?? "project+config+task";
  return {
    spec: spec as CommandSpec<unknown>,
    load: (deps) => loadDeclaredCommand(declaration, deps) as Promise<CommandHandler<unknown>>,
    needs,
    dispatch: normalizeDispatchNeeds(needs),
    surface: declaration.surface ?? "user",
    helpGroup: declaration.helpGroup,
    invocation: declaration.invocation,
  };
}

export function commandModule<TModule extends CommandModule>(module: () => Promise<TModule>) {
  return function declareModuleCommand<TParsed>(
    spec: CommandSpec<TParsed>,
    runExport: Extract<keyof TModule, string>,
    meta?: CommandMeta,
  ): CommandEntry {
    return declareCommand(spec, { module, runExport, ...meta });
  };
}

async function loadDeclaredCommand<TParsed>(
  declaration: CommandDeclaration<TParsed>,
  deps: RunDeps,
): Promise<CommandHandler<TParsed>> {
  if (typeof declaration.load === "function") {
    return declaration.load(deps);
  }

  const module = await declaration.module();
  const handler = (module as Record<string, unknown>)[declaration.runExport];
  if (typeof handler !== "function") {
    throw new Error(`Command module does not export handler "${declaration.runExport}"`);
  }
  return handler as CommandHandler<TParsed>;
}
