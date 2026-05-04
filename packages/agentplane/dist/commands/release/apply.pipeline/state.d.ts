import type { ReleaseCommandRouteResolver, ReleaseCommandState, ReleaseVersionPlan } from "../apply.types.js";
export declare function resolveReleasePlanInputs(opts: {
    gitRoot: string;
    planOverride?: string;
}): Promise<{
    planDir: string;
    plan: ReleaseVersionPlan;
    notesPath: string;
}>;
export declare function ensureReleasePlanMatchesRepoState(opts: {
    gitRoot: string;
    plan: ReleaseVersionPlan;
    corePkgPath: string;
    agentplanePkgPath: string;
    recipesPkgPath: string;
    testkitPkgPath: string;
    commandLabel: "release apply" | "release candidate";
}): Promise<void>;
export declare function buildReleaseCommandState(opts: {
    cwd: string;
    rootOverride?: string | null;
    planOverride?: string;
    routeResolver: ReleaseCommandRouteResolver;
}): Promise<ReleaseCommandState>;
//# sourceMappingURL=state.d.ts.map