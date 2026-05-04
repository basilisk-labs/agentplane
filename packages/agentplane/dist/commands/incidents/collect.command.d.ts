import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { type CommandContext } from "../shared/task-backend.js";
type IncidentsCollectParsed = {
    taskId: string;
    check: boolean;
    json: boolean;
};
export declare const incidentsCollectSpec: CommandSpec<IncidentsCollectParsed>;
export declare function makeRunIncidentsCollectHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: IncidentsCollectParsed) => Promise<number>;
export {};
//# sourceMappingURL=collect.command.d.ts.map