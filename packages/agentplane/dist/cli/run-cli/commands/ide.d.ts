import type { CommandHandler, CommandSpec } from "../../spec/spec.js";
import type { RunDeps } from "../command-catalog/kernel.js";
type IdeSyncParsed = {
    ide?: "cursor" | "windsurf";
};
export declare const ideSyncSpec: CommandSpec<IdeSyncParsed>;
export declare function cmdIdeSync(opts: {
    cwd: string;
    rootOverride?: string;
    ide?: "cursor" | "windsurf";
    deps: RunDeps;
}): Promise<number>;
export declare function makeRunIdeSyncHandler(deps: RunDeps): CommandHandler<IdeSyncParsed>;
export {};
//# sourceMappingURL=ide.d.ts.map