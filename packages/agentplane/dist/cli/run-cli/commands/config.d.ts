import type { CommandHandler, CommandSpec } from "../../spec/spec.js";
import type { RunDeps } from "../command-catalog/kernel.js";
type ConfigShowParsed = Record<string, never>;
export declare const configShowSpec: CommandSpec<ConfigShowParsed>;
export declare function makeRunConfigShowHandler(deps: RunDeps): CommandHandler<ConfigShowParsed>;
type ConfigSetParsed = {
    key: string;
    value: string;
};
export declare const configSetSpec: CommandSpec<ConfigSetParsed>;
export declare function makeRunConfigSetHandler(deps: RunDeps): CommandHandler<ConfigSetParsed>;
type ModeGetParsed = Record<string, never>;
export declare const modeGetSpec: CommandSpec<ModeGetParsed>;
export declare function makeRunModeGetHandler(deps: RunDeps): CommandHandler<ModeGetParsed>;
type ModeSetParsed = {
    mode: string;
};
export declare const modeSetSpec: CommandSpec<ModeSetParsed>;
export declare function makeRunModeSetHandler(deps: RunDeps): CommandHandler<ModeSetParsed>;
type ProfileSetParsed = {
    profile: string;
};
export declare const profileSetSpec: CommandSpec<ProfileSetParsed>;
export declare function makeRunProfileSetHandler(deps: RunDeps): CommandHandler<ProfileSetParsed>;
export {};
//# sourceMappingURL=config.d.ts.map