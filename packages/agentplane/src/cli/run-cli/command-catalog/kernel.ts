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

export type CommandSurface = "user" | "advanced" | "framework" | "internal";

export type CommandEntry = {
  spec: CommandSpec<unknown>;
  load: (session: CommandSession<CommandCapability>) => Promise<CommandHandler<unknown>>;
  selectSession?: (parsed: unknown) => CommandSessionSelection;
  requirements: readonly CommandCapability[];
  preparationNodes: readonly CommandPreparationNode[];
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
  surface?: CommandSurface;
  helpGroup?: string;
  invocation?: string;
};

export type CommandModule = object;

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

export function declareCommand<TParsed, const TRequirements extends readonly CommandCapability[]>(
  spec: CommandSpec<TParsed>,
  declaration: CommandMeta & {
    requirements: TRequirements;
    load: (session: CommandSession<TRequirements[number]>) => Promise<CommandHandler<TParsed>>;
  },
): CommandEntry {
  return declareSessionCommand(spec, declaration);
}

export function declareSessionCommand<
  TParsed,
  const TRequirements extends readonly CommandCapability[],
>(
  spec: CommandSpec<TParsed>,
  declaration: CommandMeta & {
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
    requirements: [...declaration.requirements],
    preparationNodes: preparationNodesForRequirements(declaration.requirements),
    dispatch,
    surface: declaration.surface ?? "user",
    helpGroup: declaration.helpGroup,
    invocation: declaration.invocation,
  };
}

export type DeclaredCommandSessionSelection<TParsed> = {
  requirements: readonly CommandCapability[];
  load: (session: CommandSession<CommandCapability>) => Promise<CommandHandler<TParsed>>;
};

export function defineCommandSessionSelection<
  TParsed,
  const TRequirements extends readonly CommandCapability[],
>(selection: {
  requirements: TRequirements;
  load: (session: CommandSession<TRequirements[number]>) => Promise<CommandHandler<TParsed>>;
}): DeclaredCommandSessionSelection<TParsed> {
  validateCommandRequirements(selection.requirements);
  return {
    requirements: [...selection.requirements],
    load: (session) => selection.load(session as CommandSession<TRequirements[number]>),
  };
}

export function declareMultiSessionCommand<TParsed>(
  spec: CommandSpec<TParsed>,
  declaration: CommandMeta & {
    default: DeclaredCommandSessionSelection<TParsed>;
    variants: readonly {
      when: (parsed: TParsed) => boolean;
      selection: DeclaredCommandSessionSelection<TParsed>;
    }[];
  },
): CommandEntry {
  const selections = [
    declaration.default,
    ...declaration.variants.map((variant) => variant.selection),
  ];
  for (const selection of selections) validateCommandRequirements(selection.requirements);
  const dispatchRequirements = [
    ...new Set(selections.flatMap((selection) => selection.requirements)),
  ];
  const dispatch = normalizeDispatchRequirements(dispatchRequirements);
  return {
    spec: spec as CommandSpec<unknown>,
    load: (session) => declaration.default.load(session) as Promise<CommandHandler<unknown>>,
    selectSession: (parsed) => {
      const selected =
        declaration.variants.find((variant) => variant.when(parsed as TParsed))?.selection ??
        declaration.default;
      return {
        requirements: selected.requirements,
        load: (session) => selected.load(session) as Promise<CommandHandler<unknown>>,
      };
    },
    requirements: [...declaration.default.requirements],
    preparationNodes: preparationNodesForRequirements(declaration.default.requirements),
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
  declaration: CommandMeta & {
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
    requirements: [...declaration.default.requirements],
    preparationNodes: preparationNodesForRequirements(declaration.default.requirements),
    dispatch,
    surface: declaration.surface ?? "user",
    helpGroup: declaration.helpGroup,
    invocation: declaration.invocation,
  };
}

export function commandModule<TModule extends CommandModule>(module: () => Promise<TModule>) {
  return function declareModuleCommand<
    TParsed,
    const TRequirements extends readonly CommandCapability[],
  >(
    spec: CommandSpec<TParsed>,
    runExport: Extract<keyof TModule, string>,
    declaration: CommandMeta & { requirements: TRequirements },
  ): CommandEntry {
    return declareSessionCommand(spec, {
      ...declaration,
      load: async (_session) => await loadDeclaredCommand(module, runExport),
    });
  };
}

async function loadDeclaredCommand<TParsed>(
  module: () => Promise<CommandModule>,
  runExport: string,
): Promise<CommandHandler<TParsed>> {
  const loaded = await module();
  const handler = (loaded as Record<string, unknown>)[runExport];
  if (typeof handler !== "function") {
    throw new Error(`Command module does not export handler "${runExport}"`);
  }
  return handler as CommandHandler<TParsed>;
}
