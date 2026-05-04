import type { CommandSpec, ParsedRaw } from "./spec.js";
type ParsedCommand<TParsed> = {
    raw: ParsedRaw;
    parsed: TParsed;
};
export declare function parseCommandArgv<TParsed>(spec: CommandSpec<TParsed>, argv: readonly string[]): ParsedCommand<TParsed>;
export {};
//# sourceMappingURL=parse.d.ts.map