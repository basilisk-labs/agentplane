import type { CommandSpec } from "../../../spec/spec.js";
import type { InitParsed } from "./model.js";
export declare function cmdInit(opts: {
    cwd: string;
    rootOverride?: string;
    flags: InitParsed;
    spec: CommandSpec<InitParsed>;
}): Promise<number>;
//# sourceMappingURL=orchestrate.d.ts.map