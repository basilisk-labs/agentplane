import type { CommandSpec } from "../../../cli/spec/spec.js";
import type { ReleaseApplyParsed, ReleaseApplyRoute, ReleaseCommandState, ReleaseVersionPlan } from "../apply.types.js";
export declare function runPushPreflight(opts: {
    agentplaneDir: string;
    gitRoot: string;
    remote: string;
    nextTag: string;
    nextVersion: string;
    route: ReleaseApplyRoute;
    yes: boolean;
    commandLabel: string;
}): Promise<boolean>;
export declare function assertReleaseBumpApproved(opts: {
    flags: ReleaseApplyParsed;
    plan: ReleaseVersionPlan;
    spec: CommandSpec<ReleaseApplyParsed>;
    commandLabel: string;
}): void;
export declare function runReleaseCommandPreflight(opts: {
    state: ReleaseCommandState;
    flags: ReleaseApplyParsed;
    spec: CommandSpec<ReleaseApplyParsed>;
    commandLabel: string;
}): Promise<void>;
//# sourceMappingURL=preflight.d.ts.map