import type { InitFlags, SetupProfilePreset } from "../model.js";
import type { InitPromptClack, SetupProfileStepAnswers } from "./contracts.js";
export declare function promptSetupProfileStep(opts: {
    clack: InitPromptClack;
    flags: Pick<InitFlags, "setupProfile">;
    defaultProfile?: SetupProfilePreset;
}): Promise<SetupProfileStepAnswers>;
//# sourceMappingURL=setup-profile.d.ts.map