import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { type HelpJson } from "../../cli/spec/help-render.js";
export type DocsCliParsed = {
    out: string;
};
export declare const docsCliSpec: CommandSpec<DocsCliParsed>;
export declare function makeRunDocsCliHandler(getHelpJson: () => readonly HelpJson[]): (ctx: CommandCtx, p: DocsCliParsed) => Promise<number>;
export declare function makeHelpJsonFromSpecs(specs: readonly CommandSpec<unknown>[]): HelpJson[];
//# sourceMappingURL=cli.command.d.ts.map