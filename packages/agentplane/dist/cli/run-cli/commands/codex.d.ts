import { type GroupCommandParsed } from "../../group-command.js";
import type { CommandHandler, CommandSpec } from "../../spec/spec.js";
import { type CodexPluginInstallScope } from "../../../commands/codex/plugin-install.js";
import type { RunDeps } from "../command-catalog/kernel.js";
export type CodexPluginInstallParsed = {
    scope: CodexPluginInstallScope;
};
export declare const codexSpec: CommandSpec<GroupCommandParsed>;
export declare const codexPluginSpec: CommandSpec<GroupCommandParsed>;
export declare const codexPluginInstallSpec: CommandSpec<CodexPluginInstallParsed>;
export declare const runCodex: CommandHandler<GroupCommandParsed>;
export declare const runCodexPlugin: CommandHandler<GroupCommandParsed>;
export declare function makeRunCodexPluginInstallHandler(deps: RunDeps): CommandHandler<CodexPluginInstallParsed>;
//# sourceMappingURL=codex.d.ts.map