import type { CommandCtx } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { TaskNextParsed } from "./next.spec.js";
export declare function makeRunTaskNextHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: TaskNextParsed) => Promise<number>;
//# sourceMappingURL=next.run.d.ts.map