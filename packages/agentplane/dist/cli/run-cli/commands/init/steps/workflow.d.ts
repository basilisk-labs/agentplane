import type { InitDefaults, InitFlags } from "../model.js";
import type { InitSetupProfileMode, InitPromptClack, WorkflowStepAnswers } from "./contracts.js";
export declare function promptWorkflowStep(opts: {
    clack: InitPromptClack;
    flags: Pick<InitFlags, "workflow" | "directCloseDirtyPolicy">;
    setupProfileMode: InitSetupProfileMode;
    defaults?: Pick<InitDefaults, "workflow" | "directCloseDirtyPolicy">;
}): Promise<WorkflowStepAnswers>;
//# sourceMappingURL=workflow.d.ts.map