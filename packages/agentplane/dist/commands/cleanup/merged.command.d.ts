import type { CommandCtx, CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { type GroupCommandParsed } from "../../cli/group-command.js";
import type { CommandContext } from "../shared/task-backend.js";
type CleanupGroupParsed = GroupCommandParsed;
export declare const cleanupSpec: CommandSpec<CleanupGroupParsed>;
export type CleanupMergedParsed = {
    base: string | null;
    yes: boolean;
    archive: boolean;
    deleteRemoteBranches: boolean;
    fetch: boolean;
    quiet: boolean;
};
export declare const cleanupMergedSpec: CommandSpec<CleanupMergedParsed>;
export declare const runCleanup: CommandHandler<CleanupGroupParsed>;
export declare function makeRunCleanupMergedHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: CleanupMergedParsed) => Promise<number>;
export {};
//# sourceMappingURL=merged.command.d.ts.map