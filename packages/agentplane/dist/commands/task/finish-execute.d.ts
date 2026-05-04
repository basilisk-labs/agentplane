import type { CommandContext } from "../shared/task-backend.js";
import type { FinishExecutionPlan, FinishOptions } from "./finish-types.js";
export declare function executeFinishPlan(opts: {
    ctx: CommandContext;
    options: FinishOptions;
    plan: FinishExecutionPlan;
}): Promise<number>;
//# sourceMappingURL=finish-execute.d.ts.map