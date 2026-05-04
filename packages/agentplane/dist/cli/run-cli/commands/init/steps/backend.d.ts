import type { InitDefaults, InitFlags } from "../model.js";
import type { BackendStepAnswers, InitPromptClack } from "./contracts.js";
export declare function promptBackendStep(opts: {
    clack: InitPromptClack;
    flags: Pick<InitFlags, "backend">;
    defaults?: Pick<InitDefaults, "backend">;
}): Promise<BackendStepAnswers>;
//# sourceMappingURL=backend.d.ts.map