import type { CommandCtx } from "../cli/spec/spec.js";
import type { CommandContext } from "./shared/task-backend.js";
import type { BlockParsed } from "./block.spec.js";
export declare function makeRunBlockHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: BlockParsed) => Promise<number>;
//# sourceMappingURL=block.run.d.ts.map