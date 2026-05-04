import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
export type TaskFindingsAddParsed = {
    taskId: string;
    observation: string;
    impact: string;
    resolution: string;
    promote: boolean;
    external: boolean;
    fixability: "external" | "repo-fixable" | null;
    incidentScope?: string;
    incidentTags: string[];
    incidentMatch: string[];
    incidentAdvice?: string;
    incidentRule?: string;
    updatedBy?: string;
};
export declare const taskFindingsAddSpec: CommandSpec<TaskFindingsAddParsed>;
export declare function makeRunTaskFindingsAddHandler(getCtx: (cmd: string) => Promise<CommandContext>): (ctx: CommandCtx, p: TaskFindingsAddParsed) => Promise<number>;
//# sourceMappingURL=findings-add.command.d.ts.map