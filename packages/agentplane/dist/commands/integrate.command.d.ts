import type { CommandCtx } from "../cli/spec/spec.js";
import type { CommandContext } from "./shared/task-backend.js";
import type { IntegrateParsed } from "./integrate.spec.js";
export declare function makeRunIntegrateHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: IntegrateParsed) => Promise<number>;
//# sourceMappingURL=integrate.command.d.ts.map