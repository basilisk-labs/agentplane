import type { CommandHandler } from "../../cli/spec/spec.js";
import type { TaskNewParsed } from "./new.js";
import type { CommandContext } from "../shared/task-backend.js";
export { taskNewSpec } from "./new.spec.js";
export declare function makeRunTaskNewHandler(getCtx: (commandForErrorContext: string) => Promise<CommandContext>): CommandHandler<TaskNewParsed>;
//# sourceMappingURL=new.command.d.ts.map