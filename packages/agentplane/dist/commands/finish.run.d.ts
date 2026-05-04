import type { CommandCtx } from "../cli/spec/spec.js";
import type { CommandContext } from "./shared/task-backend.js";
import type { FinishParsed } from "./finish.spec.shared.js";
export declare function makeRunFinishHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: FinishParsed) => Promise<number>;
//# sourceMappingURL=finish.run.d.ts.map