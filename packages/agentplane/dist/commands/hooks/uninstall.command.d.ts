import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
export type HooksUninstallParsed = {
    quiet: boolean;
};
export declare const hooksUninstallSpec: CommandSpec<HooksUninstallParsed>;
export declare const runHooksUninstall: CommandHandler<HooksUninstallParsed>;
//# sourceMappingURL=uninstall.command.d.ts.map