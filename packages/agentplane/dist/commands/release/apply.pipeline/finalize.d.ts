import type { ReleaseApplyParsed, ReleaseCommandMutation, ReleaseCommandState, ReleaseVersionPlan } from "../apply.types.js";
export declare function finalizeReleaseApply(opts: {
    gitRoot: string;
    planDir: string;
    notesPath: string;
    plan: ReleaseVersionPlan;
    npmVersionChecked: boolean;
    releaseCommit: {
        hash: string;
        subject: string;
    } | null;
    route: ReleaseCommandState["route"];
    push: boolean;
    remote: string;
}): Promise<number>;
export declare function runReleaseCommandFinalize(opts: {
    state: ReleaseCommandState;
    mutation: ReleaseCommandMutation;
    flags: ReleaseApplyParsed;
}): Promise<number>;
//# sourceMappingURL=finalize.d.ts.map