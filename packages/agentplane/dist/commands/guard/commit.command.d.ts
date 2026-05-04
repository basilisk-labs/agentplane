import type { CommandCtx } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { GuardCommitParsed } from "./commit.spec.js";
export { guardCommitSpec } from "./commit.spec.js";
export declare function makeRunGuardCommitHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: GuardCommitParsed) => Promise<number>;
//# sourceMappingURL=commit.command.d.ts.map