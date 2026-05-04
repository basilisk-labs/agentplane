import type { CommandCtx } from "../cli/spec/spec.js";
import type { CommandContext } from "./shared/task-backend.js";
import type { CommitParsed } from "./commit.spec.js";
export { commitSpec } from "./commit.spec.js";
export declare function makeRunCommitHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: CommitParsed) => Promise<number>;
//# sourceMappingURL=commit.command.d.ts.map