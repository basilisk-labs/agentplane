import type { CommandCtx } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { TaskShowParsed } from "./show.spec.js";
export declare function makeRunTaskShowHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: TaskShowParsed) => Promise<number>;
//# sourceMappingURL=show.run.d.ts.map