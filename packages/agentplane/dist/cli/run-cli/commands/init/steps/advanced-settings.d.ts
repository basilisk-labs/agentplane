import type { InitFlags, SetupProfilePreset } from "../model.js";
import type { AdvancedSettingsStepAnswers, InitSetupProfileMode, InitPromptClack } from "./contracts.js";
export declare function promptAdvancedSettingsStep(opts: {
    clack: InitPromptClack;
    flags: Pick<InitFlags, "hooks" | "requirePlanApproval" | "requireNetworkApproval" | "requireVerifyApproval" | "executionProfile" | "strictUnsafeConfirm">;
    setupProfilePreset: SetupProfilePreset;
    setupProfileMode: InitSetupProfileMode;
}): Promise<AdvancedSettingsStepAnswers>;
//# sourceMappingURL=advanced-settings.d.ts.map