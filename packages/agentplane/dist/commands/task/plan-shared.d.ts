import type { TaskData } from "../../backends/task-backend.js";
import { type CommandContext } from "../shared/task-backend.js";
export type PlanBackend = CommandContext["taskBackend"] & {
    getTaskDoc: NonNullable<CommandContext["taskBackend"]["getTaskDoc"]>;
    writeTask: NonNullable<CommandContext["taskBackend"]["writeTask"]>;
};
export declare function loadPlanBackend(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
}): Promise<{
    ctx: CommandContext;
    backend: PlanBackend;
}>;
export declare function buildPlanDocUpdate(opts: {
    currentDocRaw: string;
    text: string;
    requiredSections: string[];
}): {
    currentPlan: string;
    nextPlan: string;
    planChanged: boolean;
    docChanged: boolean;
    nextDoc: string;
};
export declare function assertPlanSectionPresent(taskId: string, doc: string, action: "approve" | "reject"): void;
export declare function assertPlanCanBeApproved(opts: {
    task: TaskData;
    config: CommandContext["config"];
    doc: string;
}): void;
//# sourceMappingURL=plan-shared.d.ts.map