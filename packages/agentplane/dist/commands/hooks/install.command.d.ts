import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
export type HooksInstallParsed = {
    quiet: boolean;
};
export declare const hooksInstallSpec: CommandSpec<HooksInstallParsed>;
export declare const runHooksInstall: CommandHandler<HooksInstallParsed>;
//# sourceMappingURL=install.command.d.ts.map