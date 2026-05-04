import type { CommandCtx } from "../../cli/spec/spec.js";
import { type CommandContext } from "../shared/task-backend.js";
import type { TaskHostedCloseParsed } from "./hosted-close.spec.js";
export { taskHostedCloseSpec } from "./hosted-close.spec.js";
export declare function makeRunTaskHostedCloseHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, parsed: TaskHostedCloseParsed) => Promise<number>;
//# sourceMappingURL=hosted-close.command.d.ts.map