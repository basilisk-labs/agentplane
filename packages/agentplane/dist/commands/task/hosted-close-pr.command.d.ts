import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { TaskHostedClosePrParsed } from "./hosted-close-pr.types.js";
/**
 * Retained public command boundary: this module owns the CLI spec and handler
 * wiring; hosted-close-pr.* phase modules own execution details.
 */
export declare const taskHostedClosePrSpec: CommandSpec<TaskHostedClosePrParsed>;
export declare function makeRunTaskHostedClosePrHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: TaskHostedClosePrParsed) => Promise<number>;
//# sourceMappingURL=hosted-close-pr.command.d.ts.map