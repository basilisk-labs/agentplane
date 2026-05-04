import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
export type TaskRebuildIndexParsed = Record<string, never>;
export declare const taskRebuildIndexSpec: CommandSpec<TaskRebuildIndexParsed>;
export declare function makeRunTaskRebuildIndexHandler(getCtx: (commandForErrorContext: string) => Promise<CommandContext>): CommandHandler<TaskRebuildIndexParsed>;
//# sourceMappingURL=rebuild-index.command.d.ts.map