import type { CommandCtx, CommandSpec } from "../cli/spec/spec.js";
import type { CommandContext } from "./shared/task-backend.js";
import { type SyncParsed } from "./backend.js";
export declare const syncSpec: CommandSpec<SyncParsed>;
export declare function makeRunSyncHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: SyncParsed) => Promise<number>;
//# sourceMappingURL=sync.command.d.ts.map