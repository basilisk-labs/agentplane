import type { CommandCtx } from "../cli/spec/spec.js";
import type { CommandContext } from "./shared/task-backend.js";
import type { StartParsed } from "./start.spec.js";
export declare function makeRunStartHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: StartParsed) => Promise<number>;
//# sourceMappingURL=start.run.d.ts.map