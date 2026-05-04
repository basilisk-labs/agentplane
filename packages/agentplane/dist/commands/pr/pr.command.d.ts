import type { CommandCtx, CommandHandler } from "../../cli/spec/spec.js";
import { type GroupCommandParsed } from "../../cli/group-command.js";
import type { CommandContext } from "../shared/task-backend.js";
import { type PrCheckParsed, type PrCloseParsed, type PrCloseSupersededParsed, type PrNoteParsed, type PrOpenParsed, type PrUpdateParsed } from "./pr.spec.js";
export { prCheckSpec, prCloseSpec, prCloseSupersededSpec, prNoteSpec, prOpenSpec, prSpec, prUpdateSpec, } from "./pr.spec.js";
export declare function makeRunPrHandler(_getCtx: (cmd: string) => Promise<CommandContext>): CommandHandler<GroupCommandParsed>;
export declare function makeRunPrOpenHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: PrOpenParsed) => Promise<number>;
export declare function makeRunPrUpdateHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: PrUpdateParsed) => Promise<number>;
export declare function makeRunPrCheckHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: PrCheckParsed) => Promise<number>;
export declare function makeRunPrNoteHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: PrNoteParsed) => Promise<number>;
export declare function makeRunPrCloseHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: PrCloseParsed) => Promise<number>;
export declare function makeRunPrCloseSupersededHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: PrCloseSupersededParsed) => Promise<number>;
//# sourceMappingURL=pr.command.d.ts.map