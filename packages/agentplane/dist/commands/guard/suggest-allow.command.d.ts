import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
export type GuardSuggestAllowParsed = {
    format: "lines" | "args";
};
export declare const guardSuggestAllowSpec: CommandSpec<GuardSuggestAllowParsed>;
export declare const runGuardSuggestAllow: CommandHandler<GuardSuggestAllowParsed>;
//# sourceMappingURL=suggest-allow.command.d.ts.map