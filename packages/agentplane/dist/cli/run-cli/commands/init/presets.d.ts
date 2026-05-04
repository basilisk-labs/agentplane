import type { InitDefaults, SetupProfilePreset } from "./model.js";
export declare const INIT_DEFAULTS: InitDefaults;
export declare const setupProfilePresets: Record<SetupProfilePreset, {
    mode: "compact" | "full";
    description: string;
    defaultHooks: boolean;
    defaultStrictUnsafeConfirm: boolean;
    defaultRequirePlanApproval: boolean;
    defaultRequireNetworkApproval: boolean;
    defaultRequireVerifyApproval: boolean;
    defaultExecutionProfile: InitDefaults["executionProfile"];
    defaultRecipes: string[];
}>;
export declare function normalizeSetupProfile(raw: string | undefined): SetupProfilePreset | undefined;
//# sourceMappingURL=presets.d.ts.map