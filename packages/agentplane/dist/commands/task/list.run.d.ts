import type { CommandCtx } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { TaskListParsed } from "./list.spec.js";
export declare function makeRunTaskListHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: TaskListParsed) => Promise<number>;
//# sourceMappingURL=list.run.d.ts.map