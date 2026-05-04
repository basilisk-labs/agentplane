import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { type GroupCommandParsed } from "../../cli/group-command.js";
type TaskGroupParsed = GroupCommandParsed;
export declare const taskSpec: CommandSpec<TaskGroupParsed>;
export declare const runTask: CommandHandler<GroupCommandParsed>;
export {};
//# sourceMappingURL=task.command.d.ts.map