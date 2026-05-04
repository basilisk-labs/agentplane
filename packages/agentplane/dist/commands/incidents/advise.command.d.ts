import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { type CommandContext } from "../shared/task-backend.js";
type IncidentsAdviseParsed = {
    taskId: string | null;
    scope: string | null;
    title: string | null;
    description: string | null;
    tags: string[];
    limit: number;
    json: boolean;
};
export declare const incidentsAdviseSpec: CommandSpec<IncidentsAdviseParsed>;
export declare function makeRunIncidentsAdviseHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: IncidentsAdviseParsed) => Promise<number>;
export {};
//# sourceMappingURL=advise.command.d.ts.map