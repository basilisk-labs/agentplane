import type { CommandId, CommandSpec, ParsedRaw } from "./spec/spec.js";
export type GroupCommandParsed = {
    cmd: string[];
};
export declare function parseGroupCommand(raw: ParsedRaw, argName?: string): GroupCommandParsed;
export declare function directSubcommandNames(prefix: CommandId, specs: readonly CommandSpec<unknown>[]): string[];
export declare function directSubcommandNamesFromIds(prefix: CommandId, ids: readonly CommandId[]): string[];
export declare function setDirectSubcommandNamesLoader(loader: (prefix: CommandId) => Promise<readonly string[]>): void;
export declare function loadDirectSubcommandNames(prefix: CommandId): Promise<readonly string[]>;
export declare function throwGroupCommandUsage(opts: {
    spec: CommandSpec<unknown>;
    cmd: readonly string[];
    subcommands: readonly string[];
    command?: string;
    contextCommand?: string;
    missingMessage?: string;
    unknownMessage?: (subcommand: string) => string;
}): never;
//# sourceMappingURL=group-command.d.ts.map