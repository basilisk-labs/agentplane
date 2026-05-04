import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { HOOK_NAMES } from "./index.js";
export type HooksRunParsed = {
    hook: (typeof HOOK_NAMES)[number];
    args: string[];
};
export declare const hooksRunSpec: CommandSpec<HooksRunParsed>;
export declare const runHooksRun: CommandHandler<HooksRunParsed>;
//# sourceMappingURL=run.command.d.ts.map