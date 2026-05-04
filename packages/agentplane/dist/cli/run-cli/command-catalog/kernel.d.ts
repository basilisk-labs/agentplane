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
export type CommandEntry = {
    spec: CommandSpec<unknown>;
    load: (deps: RunDeps) => Promise<CommandHandler<unknown>>;
    needs: CommandNeeds;
    dispatch: DispatchNeeds;
    invocation?: string;
};
export type CommandMeta = {
    needs?: CommandNeeds;
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
export declare function declareCommand<TParsed>(spec: CommandSpec<TParsed>, declaration: CommandDeclaration<TParsed>): CommandEntry;
export declare function commandModule<TModule extends CommandModule>(module: () => Promise<TModule>): <TParsed>(spec: CommandSpec<TParsed>, runExport: Extract<keyof TModule, string>, meta?: CommandMeta) => CommandEntry;
export {};
//# sourceMappingURL=kernel.d.ts.map