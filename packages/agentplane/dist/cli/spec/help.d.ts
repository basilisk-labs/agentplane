import type { CommandHandler, CommandSpec } from "./spec.js";
export type HelpParsed = {
    cmd: string[];
    compact: boolean;
    json: boolean;
};
export type HelpRegistryView = {
    list(): readonly {
        spec: CommandSpec;
    }[];
    match(tokens: readonly string[]): {
        spec: CommandSpec;
        consumed: number;
    } | null;
};
export declare const helpSpec: CommandSpec<HelpParsed>;
export declare function makeHelpHandler(registry: HelpRegistryView): CommandHandler<HelpParsed>;
//# sourceMappingURL=help.d.ts.map