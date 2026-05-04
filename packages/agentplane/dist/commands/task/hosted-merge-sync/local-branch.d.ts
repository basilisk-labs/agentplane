import type { TaskData } from "../../../backends/task-backend.js";
import type { CommandContext } from "../../shared/task-backend.js";
import type { LocalBranchPrSyncCandidate, LocalDoneBranchPrDrift } from "./model.js";
export declare function findLocallyShippedBranchPrTasks(opts: {
    ctx: CommandContext;
    tasks: TaskData[];
}): Promise<LocalBranchPrSyncCandidate[]>;
export declare function findDoneBranchPrTasksWithOpenPrArtifacts(opts: {
    ctx: CommandContext;
    tasks: TaskData[];
}): Promise<LocalDoneBranchPrDrift[]>;
//# sourceMappingURL=local-branch.d.ts.map