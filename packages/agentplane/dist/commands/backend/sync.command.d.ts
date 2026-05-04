import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { type GroupCommandParsed } from "../../cli/group-command.js";
import type { CommandContext } from "../shared/task-backend.js";
import { type BackendInspectParsed, type BackendMigrateCanonicalStateParsed, type BackendSyncParsed } from "../backend.js";
export declare const backendSpec: CommandSpec<GroupCommandParsed>;
export declare const backendSyncSpec: CommandSpec<BackendSyncParsed>;
export declare const backendMigrateCanonicalStateSpec: CommandSpec<BackendMigrateCanonicalStateParsed>;
export declare const backendInspectSpec: CommandSpec<BackendInspectParsed>;
declare function runBackendRootGroup(_ctx: CommandCtx, p: GroupCommandParsed): Promise<number>;
export declare function makeRunBackendHandler(_getCtx: (cmd: string) => Promise<CommandContext>): typeof runBackendRootGroup;
export declare function makeRunBackendSyncHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: BackendSyncParsed) => Promise<number>;
export declare function makeRunBackendInspectHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: BackendInspectParsed) => Promise<number>;
export declare function makeRunBackendMigrateCanonicalStateHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: BackendMigrateCanonicalStateParsed) => Promise<number>;
export {};
//# sourceMappingURL=sync.command.d.ts.map