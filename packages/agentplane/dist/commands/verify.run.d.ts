import type { CommandCtx } from "../cli/spec/spec.js";
import type { CommandContext } from "./shared/task-backend.js";
import type { VerifyParsed } from "./verify.spec.js";
export declare function makeRunVerifyHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: VerifyParsed) => Promise<number>;
//# sourceMappingURL=verify.run.d.ts.map