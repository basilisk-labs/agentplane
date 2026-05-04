import type { CommandCtx } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { TaskSearchParsed } from "./search.spec.js";
export declare function makeRunTaskSearchHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: TaskSearchParsed) => Promise<number>;
//# sourceMappingURL=search.run.d.ts.map