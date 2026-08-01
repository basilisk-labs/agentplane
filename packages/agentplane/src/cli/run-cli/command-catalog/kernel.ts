import { CliError } from "../../../shared/errors.js";
import { exitCodeForError } from "../../exit-codes.js";
import type { CommandHandler, CommandSpec } from "../../spec/spec.js";
import {
  isCommandContextCapability,
  preparationNodeForCapability,
  validateCommandRequirements,
  type CommandCapability,
  type CommandPreparationNode,
  type CommandSession,
  type CommandSessionResolvers,
} from "./command-session.js";

export { createCommandSession } from "./command-session.js";
export type {
  CommandCapability,
  CommandPreparationTrace,
  CommandSession,
  CommandSessionResolvers,
} from "./command-session.js";

export type RunDeps = Pick<
  CommandSessionResolvers,
  "getCtx" | "getResolvedProject" | "getLoadedConfig" | "getHelpJsonForDocs"
>;

export type DispatchNeeds = {
  project: boolean;
  loadedConfig: boolean;
  taskContext: boolean;
};

export type CommandNeeds = "none" | "project" | "project+config" | "project+config+task";
export type CommandSurface = "user" | "advanced" | "framework" | "internal";

export type CommandEntry = {
  spec: CommandSpec<unknown>;
  load: (session: CommandSession<CommandCapability>) => Promise<CommandHandler<unknown>>;
  selectSession?: (parsed: unknown) => CommandSessionSelection;
  needs: CommandNeeds;
  requirements: readonly CommandCapability[];
  preparationNodes: readonly CommandPreparationNode[];
  compatibility: { mode: "legacy-command-needs"; needs: CommandNeeds } | null;
  dispatch: DispatchNeeds;
  surface: CommandSurface;
  helpGroup?: string;
  invocation?: string;
};

type CommandSessionSelection = {
  requirements: readonly CommandCapability[];
  load: (session: CommandSession<CommandCapability>) => Promise<CommandHandler<unknown>>;
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

const LEGACY_CONTEXT_REQUIREMENTS = [
  "project",
  "config",
  "backend.read",
  "backend.write",
  "task.read",
  "task.write",
  "git.head",
  "git.diff",
  "git.mutate",
  "route.local",
  "route.remote",
  "policy",
  "approvals",
  "context.search",
  "provider",
] as const satisfies readonly CommandCapability[];

function legacyRequirements(needs: CommandNeeds): readonly CommandCapability[] {
  switch (needs) {
    case "none": {
      return [];
    }
    case "project": {
      return ["project"];
    }
    case "project+config": {
      return ["project", "config"];
    }
    case "project+config+task": {
      return LEGACY_CONTEXT_REQUIREMENTS;
    }
  }
}

function preparationNodesForRequirements(
  requirements: readonly CommandCapability[],
): readonly CommandPreparationNode[] {
  return [...new Set(requirements.map((capability) => preparationNodeForCapability(capability)))];
}

function normalizeDispatchRequirements(requirements: readonly CommandCapability[]): DispatchNeeds {
  const taskContext = requirements.some((capability) => isCommandContextCapability(capability));
  const loadedConfig = taskContext || requirements.includes("config");
  const project = loadedConfig || requirements.includes("project");
  return { project, loadedConfig, taskContext };
}

function coarseNeedsForDispatch(dispatch: DispatchNeeds): CommandNeeds {
  if (dispatch.taskContext) return "project+config+task";
  if (dispatch.loadedConfig) return "project+config";
  if (dispatch.project) return "project";
  return "none";
}

function legacyRunDeps(session: CommandSession<CommandCapability>, needs: CommandNeeds): RunDeps {
  const getCtx = async (command: string) => {
    if (needs !== "project+config+task") denyLegacyAccess(command, "task context", needs);
    return await session.require("task.read", command);
  };
  const getResolvedProject = async (command: string) => {
    if (needs === "none") denyLegacyAccess(command, "project", needs);
    return await session.require("project", command);
  };
  const getLoadedConfig = async (command: string) => {
    if (needs === "none" || needs === "project") denyLegacyAccess(command, "config", needs);
    return await session.require("config", command);
  };
  return {
    getCtx,
    getResolvedProject,
    getLoadedConfig,
    getHelpJsonForDocs: () => session.getHelpJsonForDocs(),
  };
}

function denyLegacyAccess(command: string, capability: string, needs: CommandNeeds): never {
  throw new CliError({
    exitCode: exitCodeForError("E_INTERNAL"),
    code: "E_INTERNAL",
    message: `Internal error: legacy command "${command}" declared needs="${needs}" but attempted ${capability}`,
  });
}

export function declareCommand<TParsed>(
  spec: CommandSpec<TParsed>,
  declaration: CommandDeclaration<TParsed>,
): CommandEntry {
  const needs = declaration.needs ?? "project+config+task";
  const requirements = legacyRequirements(needs);
  const dispatch = normalizeDispatchRequirements(requirements);
  return {
    spec: spec as CommandSpec<unknown>,
    load: (session) =>
      loadDeclaredCommand(declaration, legacyRunDeps(session, needs)) as Promise<
        CommandHandler<unknown>
      >,
    needs,
    requirements,
    preparationNodes: preparationNodesForRequirements(requirements),
    compatibility: { mode: "legacy-command-needs", needs },
    dispatch,
    surface: declaration.surface ?? "user",
    helpGroup: declaration.helpGroup,
    invocation: declaration.invocation,
  };
}

export function declareSessionCommand<
  TParsed,
  const TRequirements extends readonly CommandCapability[],
>(
  spec: CommandSpec<TParsed>,
  declaration: Omit<CommandMeta, "needs"> & {
    requirements: TRequirements;
    load: (session: CommandSession<TRequirements[number]>) => Promise<CommandHandler<TParsed>>;
  },
): CommandEntry {
  validateCommandRequirements(declaration.requirements);
  const dispatch = normalizeDispatchRequirements(declaration.requirements);
  return {
    spec: spec as CommandSpec<unknown>,
    load: (session) =>
      declaration.load(session as CommandSession<TRequirements[number]>) as Promise<
        CommandHandler<unknown>
      >,
    needs: coarseNeedsForDispatch(dispatch),
    requirements: [...declaration.requirements],
    preparationNodes: preparationNodesForRequirements(declaration.requirements),
    compatibility: null,
    dispatch,
    surface: declaration.surface ?? "user",
    helpGroup: declaration.helpGroup,
    invocation: declaration.invocation,
  };
}

export function declareConditionalSessionCommand<
  TParsed,
  const TDefaultRequirements extends readonly CommandCapability[],
  const TSelectedRequirements extends readonly CommandCapability[],
>(
  spec: CommandSpec<TParsed>,
  declaration: Omit<CommandMeta, "needs"> & {
    default: {
      requirements: TDefaultRequirements;
      load: (
        session: CommandSession<TDefaultRequirements[number]>,
      ) => Promise<CommandHandler<TParsed>>;
    };
    selected: {
      when: (parsed: TParsed) => boolean;
      requirements: TSelectedRequirements;
      load: (
        session: CommandSession<TSelectedRequirements[number]>,
      ) => Promise<CommandHandler<TParsed>>;
    };
  },
): CommandEntry {
  validateCommandRequirements(declaration.default.requirements);
  validateCommandRequirements(declaration.selected.requirements);
  const dispatchRequirements = [
    ...new Set([...declaration.default.requirements, ...declaration.selected.requirements]),
  ];
  const dispatch = normalizeDispatchRequirements(dispatchRequirements);
  const defaultSelection: CommandSessionSelection = {
    requirements: [...declaration.default.requirements],
    load: (session) =>
      declaration.default.load(session as CommandSession<TDefaultRequirements[number]>) as Promise<
        CommandHandler<unknown>
      >,
  };
  const selectedSelection: CommandSessionSelection = {
    requirements: [...declaration.selected.requirements],
    load: (session) =>
      declaration.selected.load(
        session as CommandSession<TSelectedRequirements[number]>,
      ) as Promise<CommandHandler<unknown>>,
  };
  return {
    spec: spec as CommandSpec<unknown>,
    load: defaultSelection.load,
    selectSession: (parsed) =>
      declaration.selected.when(parsed as TParsed) ? selectedSelection : defaultSelection,
    needs: coarseNeedsForDispatch(dispatch),
    requirements: [...declaration.default.requirements],
    preparationNodes: preparationNodesForRequirements(declaration.default.requirements),
    compatibility: null,
    dispatch,
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
